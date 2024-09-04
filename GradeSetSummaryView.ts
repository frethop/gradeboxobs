import { ButtonComponent, ItemView, MarkdownEditView, MarkdownRenderer, TFile, TextComponent, TextFileView, WorkspaceLeaf } from "obsidian";

import { Category } from "data/Category";
import { Counter } from "data/Counter";
import { GradeSet } from "data/GradeSet";
import GradeboxPlugin from "main";
import { NewCounterModal } from "modals/NewCounterModal";
import { Score } from "data/Score";
import Utilities from "utilities/Utilities";

export const VIEW_TYPE_GRADESET_SUMMARY = "gradeset-summary-view";
export const PREVIEW_MODE = 2;
export const EDITING_MODE = 1;

export class GradeSetSummaryView extends ItemView {

  plugin: GradeboxPlugin;
  gradeSetPath: string;
  frontmatter : string;
  gradeSetData: string;
  gradeSet: GradeSet;
  container: Element;

  statusbarElement: HTMLElement;
  previewElement: HTMLElement;
  editElement: HTMLElement;
  saveElement: HTMLElement;

  // internal code mirror instance
  codeMirror: CodeMirror.Editor;

  mode: number;
  modified: boolean;
  numCounters: number;
  counters: Counter[];

  countersChanged: string[];
  remindersChanged: string[];
  catsChanged: string[];
  scoresChanged: string[];

  // this.contentEl is not exposed, so cheat a bit.
  public get extContentEl(): HTMLElement {
    // @ts-ignore
    return this.contentEl;
  }  
  
  constructor(leaf: WorkspaceLeaf, plugin: GradeboxPlugin) {
    super(leaf);

    this.navigation = true;
    this.plugin = plugin;
    // Make copies of these
    this.gradeSetData = plugin.gradeSet.gradeSetData;
    this.gradeSet = plugin.gradeSet;
    //console.log("CONSTRUCTOR: modified = "+this.gradeSet.modified);
                      
    this.mode = EDITING_MODE;
    this.counters = [];
  }

  getViewType() {
    return VIEW_TYPE_GRADESET_SUMMARY;
  }

  getDisplayText() {
    return this.gradeSet.properties.get("title") + " Summary";
  }

  // Open the view
  // Generate Markdown into a string, write the string into a note

  async onOpen() {
    console.log("Summary Opening");

    this.previewElement = this.addAction("lucide-book-open", "preview mode", () => {
      this.setPreviewMode();
    });
    this.editElement = this.addAction("lucide-edit-3", "edit mode", () => {
      this.setEditingMode();
    });
    this.addAction("lucide-calculator", "Add a counter", () => {
		  new NewCounterModal(this.app, this.gradeSet, (counter: Counter) => {
          this.gradeSet.addCounter(counter);
          this.gradeSet.modified = true;
          //this.gradeSet.writeGradeSet();
          //this.display();
          if (this.mode == EDITING_MODE) this.setEditingMode(true);
          if (this.mode == PREVIEW_MODE) this.setPreviewMode(true);
      }).open();
    });



    // Record the "state" of the gradeset so we can detect changes
    this.numCounters = (this.gradeSet.counters == undefined)?0:this.gradeSet.counters.length;
    this.gradeSet.counters.forEach( (counter) => { this.counters.push(counter); });

    this.modified = this.gradeSet.modified;

    this.setPreviewMode();
  }

  setPreviewMode(force: boolean = false) {
    if (this.mode == PREVIEW_MODE && !force) return;

    this.mode = PREVIEW_MODE;

    this.container = this.containerEl.children[1];
    this.container.empty();
    const div = this.container.createEl("div", { cls: "view-style" });
    let gradeSetNote = this.generateMarkdownFromGradeSet();
    let markdown = MarkdownRenderer.renderMarkdown(gradeSetNote, div, null, null);

    this.editElement.show();
    this.previewElement.hide();

    console.log("PREVIEW MODE: modified = "+this.modified);
  }

  async setEditingMode(force: boolean = false) {
    if (this.mode == EDITING_MODE && !force) return;

    this.mode = EDITING_MODE;

    this.container.empty();

    this.generateEditHTML(this.container);

    this.editElement.hide(); 
    this.previewElement.show();

    console.log("EDIT MODE 2: modified = "+this.modified);
  }

  // set the file contents
  setViewData = (data: string, clear: boolean) => {
  }
  
  async onClose() {
    this.modified = this.modified || (this.catsChanged.length > 0) || (this.countersChanged.length > 0) || (this.scoresChanged.length > 0);
    if (this.modified) {

      // Check categories
      this.catsChanged.forEach( (cat) => {
        let oldName = cat.split("~~>")[0];
        let newName = cat.split("~~>")[1];
        this.gradeSet.renameCategory(oldName, newName);
        this.gradeSet.students.forEach( (student) => {
          student.renameCategory(oldName, newName);
        })
        this.gradeSet.modified = true;
      })

      // Check counters / adjust students if necessary
      console.log(this.countersChanged);
      this.countersChanged.forEach( (counter) => {
        let name = counter.split("~~>")[0];
        let value = counter.split("~~>")[1];
        console.log("COUNTER CHANGED: "+name+ " to " + value);

        this.gradeSet.students.forEach( (student) => {
          let sc = student.getCounter(name);
          if (sc != undefined) {
            console.log("Changing "+name+ " to " + value + " for " + sc.name + " = " + sc.value);
            if (value === "-1") {
              student.deleteCounter(sc);
            } else {
              let numericValue = Number(value);
              console.log("Numeric value = "+numericValue);
              if (!Number.isNaN(numericValue)) {
                sc.name = value;
                student.updateCounterName(name, sc);
              } else {
                let diff = numericValue - sc.value;
                sc.value = sc.value;
              }
            }
          }
        })
        this.gradeSet.modified = true;
      })

      // Check scores that have changed
      this.scoresChanged.forEach( (score) => {
        let oldName = score.split("~~>")[0];
        let newName = score.split("~~>")[1];
        console.log("SCORE CHANGED: "+oldName+ " to " + newName);
        this.gradeSet.students.forEach( (student) => {
          student.renameScore(oldName, newName);
        })
      })
      this.gradeSet.modified = true;
    }

    this.plugin.gradeSet.modified = this.modified;
    this.plugin.gradeBoxView.display();
    console.log("GSETSUMMARY, GS.MODIFIED = "+this.modified);
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_GRADESET_SUMMARY);

  }

  clear() {

  }

  generateMarkdownFromGradeSet() {
    var gradeSetNote: string = "";

    // Title 
    gradeSetNote += "----\n# "+this.gradeSet.properties.get('title');
    gradeSetNote += "\n----\n"; 

    // Class data
    gradeSetNote += "\n### "+this.gradeSet.getStudents()+" students.\n";
    if (this.gradeSet.lastModified != undefined) {
      gradeSetNote += "### Last modified: "+this.gradeSet.lastModified.toLocaleString()+"\n";
    }
    if (this.gradeSet.counters.length > 0) {
      gradeSetNote += "### Counters\n";
      this.gradeSet.counters.forEach( (counter) => {
        gradeSetNote += " - "+counter.name+', initial = '+counter.value+'\n';
      });
    }
    if (this.gradeSet.reminders.length > 0) {
      gradeSetNote += "### Reminders\n";
      this.gradeSet.reminders.forEach( (reminder) => {
        gradeSetNote += ' - "'+reminder.text+'" on '+reminder.date.toLocaleString();
        if (reminder.repeat > 0) gradeSetNote += ', repeats every '+reminder.repeat+' days';
        if (reminder.prior > 0) gradeSetNote += ', prior = '+reminder.prior+' days';
        gradeSetNote += '\n';
      });
    }
    if (this.gradeSet.getStudents() > 0) {
      gradeSetNote += "### Class average = "+Utilities.fixToPlaces(this.gradeSet.classAverage());
      if (! this.gradeSet.allCategoriesHaveScores()) {
        let extrap = this.gradeSet.classAverage() / this.gradeSet.weightTotal()
        gradeSetNote += " (" + Utilities.fixToPlaces(extrap) + "%)";
      }
    }
    gradeSetNote += "\n----\n";

    // Category listings with data and scores
    if (this.gradeSet.categories.length > 0) {
      gradeSetNote += "## Categories\n";
      this.gradeSet.categories.forEach( (cat: Category) => {
        gradeSetNote += "> [!note] "+cat.name+'\n';
        gradeSetNote += "> - Weight: "+cat.weight+'\n';
        gradeSetNote += "> - "+(cat.percentOfScores*100)+'% of scores used\n'
        gradeSetNote += "> > [!example] Scores\n";
        gradeSetNote += "> > \n";

        if (cat.scoreSet == undefined || cat.scoreSet.length == 0) {
          gradeSetNote += "No scores\n"
        } else {
          gradeSetNote += "> > | Name | Possible | Average |\n";
          gradeSetNote += "> > |------|:--------:|:-------:|\n";
          cat.scoreSet.forEach( (sc: Score) => {
            let value = Math.round(sc.getValue()*100)/100;
            let classAve = Math.round(this.gradeSet.classScoreAverage(cat, sc.name)*100)/100;
            let percent = Math.round(classAve/sc.getValue()*10000)/100;
            gradeSetNote += "> > | "+sc.getName()+' | '+value+" | "+percent+"% ("+classAve+") |\n";
          })
        }
        gradeSetNote += "\n";
      })
    } else {
      gradeSetNote += "## No categories\n";
    }
    
    return gradeSetNote;

  }

  generateEditHTML(container: Element) {
    this.countersChanged = [];
    this.remindersChanged = [];
    this.catsChanged = [];
    this.scoresChanged = [];

    container.empty();

    let titleContainer = container.createDiv();
    titleContainer.createEl("hr");

    // Title
    titleContainer.createEl("h2", { text: "Class Title" });
    let editTitle = new TextComponent(titleContainer);
    editTitle.inputEl.setAttribute("style", "width: 30%;");
    editTitle.setValue(this.gradeSet.properties.get('title'));
    editTitle.onChange( (value) => {
      this.gradeSet.properties.set('title', value);
      this.modified = true;
    });
    titleContainer.createEl("hr");

    // Counters
    let counterContainer = container.createDiv();
    if (this.gradeSet.counters.length > 0) {
      counterContainer.createEl("h2", { text: "Counters" });
      let counterTable = counterContainer.createEl("table");

      let headerRow = counterTable.createEl("tr");
      headerRow.createEl("th", { text: "Name" });
      headerRow.createEl("th", { text: "Initial Value" });

      this.gradeSet.counters.forEach( (counter) => {
        let row = counterTable.createEl("tr");
        let cell = row.createEl("td");
        let editCounter = new TextComponent(cell);
        editCounter.setValue(counter.name);
        editCounter.onChange( (value) => {
          console.log("COUNTER CHANGED: "+counter.name+"~~>"+value);
          this.countersChanged.push(counter.name+"~~>"+value);
          counter.name = value;
          this.modified = true;
        });
        cell = row.createEl("td");
        let editCounterValue = new TextComponent(cell);
        editCounterValue.setValue(""+counter.value);
        editCounterValue.onChange( (value) => {
          counter.value = Number(value);
          this.countersChanged.push(counter.name+"~~>"+value);
          this.modified = true;
        });
        cell = row.createEl("td");
        let delButton = new ButtonComponent(cell);
        delButton.setButtonText("X");
        delButton.onClick( () => {
            this.gradeSet.counters.splice(this.gradeSet.counters.indexOf(counter), 1);
            this.countersChanged.push(counter.name+"~~>"+(-1));
            row.remove();
        });


      });
      counterContainer.createEl("hr");
    }

    // Reminders
    let reminderContainer = container.createDiv();
    if (this.gradeSet.reminders.length > 0) {
      reminderContainer.createEl("h2", { text: "Reminders" });
      let remTable = reminderContainer.createEl("table");

      let headerRow = remTable.createEl("tr");
      headerRow.createEl("th", { text: "Text" });
      headerRow.createEl("th", { text: "Date" });
      headerRow.createEl("th", { text: "Repeat" });
      headerRow.createEl("th", { text: "Prior" });

      this.gradeSet.reminders.forEach( (reminder) => {
        // gradeSetNote += ' - "'+reminder.text+'" on '+reminder.date.toLocaleString();
        let row = remTable.createEl("tr");
        let cell = row.createEl("td");
          let editReminder = new TextComponent(cell);
          editReminder.setValue(reminder.text);
          editReminder.onChange( (value) => {
            reminder.text = value;
            this.modified = true;
          });
          cell = row.createEl("td");
          let editReminderDate = new TextComponent(cell);
          editReminderDate.setValue(reminder.date.toLocaleString());
          editReminderDate.onChange( (value) => {
            reminder.date = new Date(value);
            this.modified = true;
          });

          // if (reminder.repeat > 0) gradeSetNote += ', repeats every '+reminder.repeat+' days';
          cell = row.createEl("td");
          let editReminderRepeat = new TextComponent(cell);
          editReminderRepeat.setValue(reminder.repeat.toString());
          editReminderRepeat.onChange( (value) => {
            reminder.repeat = Number(value);
            this.modified = true;
          });

          // if (reminder.prior > 0) gradeSetNote += ', prior = '+reminder.prior+' days';
          cell = row.createEl("td");
          let editReminderPrior = new TextComponent(cell);
          editReminderPrior.setValue(reminder.prior.toString());
          editReminderPrior.onChange( (value) => {
            reminder.prior = Number(value);
            this.modified = true;
          });

          cell = row.createEl("td");
          let delButton = new ButtonComponent(cell);
          delButton.setButtonText("X");
          delButton.onClick( () => {
              this.gradeSet.deleteReminder(reminder);
              row.remove();
              if (this.gradeSet.reminders.length == 0) reminderContainer.innerHTML = "";
          });
  
        });
        reminderContainer.createEl("hr");
      };
    

    // Categories + scores
    let categoryContainer = container.createDiv();
    if (this.gradeSet.categories.length > 0) {
      let conTable = categoryContainer.createEl("table");
      let conRow = conTable.createEl("tr");
      let conCell = conRow.createEl("td");
      conCell.createEl("h2", { text: "Categories" });
      conCell = conRow.createEl("td");
      let addCategoryButton = new ButtonComponent(conCell);
      addCategoryButton.setButtonText("+");
      addCategoryButton.onClick( () => {
        let newCat = new Category({name: "New Category", weight: 1.0, percentOfScores: 1.0});
        this.gradeSet.addCategory(newCat);
        this.modified = true;
      });

      this.gradeSet.categories.forEach( (cat: Category) => {
        let catTable = categoryContainer.createEl("table");
        let catRowT = catTable.createEl("tr");
        catRowT.createEl("th", { text: "Category Name" });
        catRowT.createEl("th", { text: "Weight" });
        catRowT.createEl("th", { text: "% of Scores Used" });

        let catRow = catTable.createEl("tr");  
        let catCell = catRow.createEl("td");  
        let editCategory = new TextComponent(catCell);
        editCategory.setValue(cat.name);
        editCategory.onChange( (value) => {
          this.catsChanged.push(cat.name+"~~>"+value);
          cat.name = value;
          this.modified = true;
        });
        catCell = catRow.createEl("td");
        let editCategoryWeight = new TextComponent(catCell);
        editCategoryWeight.setValue(""+cat.weight);
        editCategoryWeight.onChange( (value) => {
          cat.weight = Number(value);
          this.modified = true;
        });
        catCell = catRow.createEl("td");
        let editCategoryPercent = new TextComponent(catCell);
        editCategoryPercent.setValue(""+cat.percentOfScores);
        editCategoryPercent.onChange( (value) => {
          cat.percentOfScores = Number(value);
          this.modified = true;
        });
        catCell = catRow.createEl("td");
        let delButton = new ButtonComponent(catCell);
        delButton.setButtonText("X");
        delButton.onClick( () => {
            this.gradeSet.deleteCategory(cat);
            catRowT.remove();
            catRow.remove();
            this.setEditingMode(true);
            this.modified = true;
        });


        if (cat.scoreSet != undefined && cat.scoreSet.length > 0) {
          let catTable = categoryContainer.createEl("table");
          let catRow = catTable.createEl("tr");
          catRow.createEl("th", { text: "Score Name" });
          catRow.createEl("th", { text: "Possible" });  
      
          cat.scoreSet.forEach( (sc: Score) => {
            catRow = catTable.createEl("tr");
            let catCell = catRow.createEl("td");  
            let value = Math.round(sc.getValue()*100)/100;
            let classAve = Math.round(this.gradeSet.classScoreAverage(cat, sc.name)*100)/100;
            let percent = Math.round(classAve/sc.getValue()*10000)/100;
            let editScore = new TextComponent(catCell);
            editScore.setValue(sc.name);
            editScore.onChange( (value) => {
              this.scoresChanged.push(sc.name+"~~>"+value);
              sc.name = value;
              this.modified = true;
            });
            catCell = catRow.createEl("td");
            let editScoreValue = new TextComponent(catCell);
            editScoreValue.setValue(""+value);
            editScoreValue.onChange( (value) => {
              sc.setValue(Number(value));
              this.gradeSet.modified = true;
            }); 
            catCell = catRow.createEl("td");
            let delButton = new ButtonComponent(catCell);
            delButton.setButtonText("X");
            delButton.onClick( () => {
                cat.removeScore(sc);
                catRow.remove();
            });
               
          })
        }
        categoryContainer.createEl("br");

      }
    )}
  }

}