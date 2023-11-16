import { ItemView, MarkdownEditView, MarkdownRenderer, TFile, TextFileView, WorkspaceLeaf } from "obsidian";

import { Category } from "data/Category";
import { Counter } from "data/Counter";
import { GradeSet } from "data/GradeSet";
import GradeboxPlugin from "main";
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

    this.codeMirror = CodeMirror(this.extContentEl, {
      theme: "obsidian"
    });
                        
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


    // Record the "state" of the gradeset so we can detect changes
    this.numCounters = (this.gradeSet.counters == undefined)?0:this.gradeSet.counters.length;
    this.gradeSet.counters.forEach( (counter) => { this.counters.push(counter); });

    this.codeMirror.setValue(this.gradeSetData);
    this.modified = this.gradeSet.modified;
    //console.log("STARTING MODE: modified = "+this.modified);

    this.setPreviewMode();
  }

  setPreviewMode() {
    if (this.mode == PREVIEW_MODE) return;

    this.mode = PREVIEW_MODE;

    this.modified = this.modified || (this.codeMirror.getValue() !== this.plugin.gradeSet.gradeSetData);

    this.gradeSetData = this.codeMirror.getValue();
    this.gradeSet.defineGradeSet(this.gradeSetData, this.gradeSet.sourceFolder, this.gradeSet.sourceFile, true);

    this.container = this.containerEl.children[1];
    this.container.empty();
    const div = this.container.createEl("div", { cls: "view-style" });
    let gradeSetNote = this.generateMarkdownFromGradeSet();
    let markdown = MarkdownRenderer.renderMarkdown(gradeSetNote, div, null, null);

    // this.editElement.toggleVisibility(true);
    // this.previewElement.toggleVisibility(false);
    this.editElement.show();
    this.previewElement.hide();

    console.log("PREVIEW MODE: modified = "+this.modified);
  }

  async setEditingMode() {
    if (this.mode == EDITING_MODE) return;

    this.mode = EDITING_MODE;

    this.container.empty();
    this.codeMirror = CodeMirror(this.extContentEl, {
      theme: "obsidian"
    });

    this.codeMirror.setValue(this.gradeSetData);

    this.editElement.hide(); 
    this.previewElement.show();

    console.log("EDIT MODE: modified = "+this.modified);
  }

  // set the file contents
  setViewData = (data: string, clear: boolean) => {
    if (clear) {
      this.codeMirror.swapDoc(CodeMirror.Doc(data, "text/x-grd"))
    }
    else {
      this.codeMirror.setValue(data);
    }
  }
  
  async onClose() {
    this.modified = this.modified || (this.codeMirror.getValue() !== this.plugin.gradeSet.gradeSetData);

    if (this.modified) {

      // Find the differences: counters, scores, categories
      let gsdata = this.codeMirror.getValue();
      let newgs = new GradeSet(this.plugin);
      newgs.defineGradeSet(gsdata, this.gradeSet.sourceFolder, this.gradeSet.sourceFile, true);

      // check categories
      let catAdded: Category[] = [];
      newgs.categories.filter( (cat) => { 
        var found = false;
        this.gradeSet.categories.forEach( (c) => { if (c.name == cat.name) found = true; }); 
        return !found;
      }).forEach( (cat) => { catAdded.push(cat); });
      var catDeleted: Category[] = [];
      this.gradeSet.categories.filter( (cat) => { 
        var found = false;
        newgs.categories.forEach( (c) => { if (c.name == cat.name) found = true; }); 
        return !found;
      }).forEach( (cat) => { catDeleted.push(cat); });

      this.gradeSet.defineGradeSet(this.codeMirror.getValue(), this.gradeSet.sourceFolder, this.gradeSet.sourceFile, true);    
        
      // Check counters / adjust students if necessary
      var added: Counter[] = [];
      this.gradeSet.counters.filter( (counter) => { 
        var found = false;
        this.counters.forEach( (c) => { if (c.name == counter.name) found = true; }); 
        return !found;
      }).forEach( (counter) => { added.push(counter); });
      var deleted: Counter[] = [];
      this.counters.filter( (counter) => { 
        var found = false;
        this.gradeSet.counters.forEach( (c) => { if (c.name == counter.name) found = true; }); 
        return !found;
      }).forEach( (counter) => { deleted.push(counter); });
      console.log(deleted);

      if (added.length > 0)
        added.forEach( (counter) => {
          if (this.gradeSet.students.length > 0) {
              this.gradeSet.students.forEach( (student) => {
                  student.addCounter(counter)
              });
            }
          });

      if (deleted.length > 0)
        deleted.forEach( (counter) => {
          if (this.gradeSet.students.length > 0) {
              this.gradeSet.students.forEach( (student) => {
                  student.deleteCounter(counter)
              });
            }
          });
    }

    //this.plugin.gradeSet.modified = this.modified;
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

        if (cat.scoreSet == undefined) {
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

}