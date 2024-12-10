import { App, DropdownComponent, Editor, FileSystemAdapter, ItemView, MarkdownFileInfo, MarkdownRenderer, MarkdownView, Menu, MenuItem, Modal, Notice, Platform, Setting, TFile, TFolder, TextFileView, WorkspaceLeaf } from "obsidian";
import { StudentView, VIEW_TYPE_STUDENT } from "StudentView";

import { AddAbsenceModal } from "modals/AddAbsenceModal";
import { Alert } from "./utilities/alert";
import { Category } from "data/Category";
import { Counter } from "data/Counter";
import { Emailer } from "./email";
import { EmailerModal } from "modals/EmailerModal";
import { GradeSet } from "data/GradeSet";
import GradeboxPlugin from "main";
import { NewCategoryModal } from "modals/NewCategoryModal";
import { NewCounterModal } from "modals/NewCounterModal";
import { NewReminderModal } from "modals/NewReminderModal";
import { NewScoreModal } from "modals/NewScoreModal";
import { NewStudentModal } from "modals/NewStudentModal";
import { Progress } from "utilities/Progress";
import { Reminder } from "data/Reminder";
import { ReminderPopup } from "modals/ReminderPopup";
import { Score } from "data/Score";
import Semaphore from "utilities/Semaphore";
import { Student } from "data/Student";
import { Template } from "utilities/Template";
import Utilities from "utilities/Utilities";
import { VIEW_TYPE_GRADESET_SUMMARY } from "GradeSetSummaryView";
import { markdown } from "utilities/drawdown";
import {TRMNL} from "TRMNL";

export const VIEW_TYPE_GRADEBOX = "gradebox-view";

export class GradeboxView extends ItemView {

  plugin: GradeboxPlugin;
  gradeSetPath: string;
  gradeSetFile: TFile;
  frontmatter : string;
  gradeSetData: string;
  gradeSet: GradeSet;
  container: Element;
  workspaceleaf: WorkspaceLeaf;

  statusbarElement: HTMLElement;

  displayText: string;
  width: number;
  filetypes: string[];
  colorized: boolean;

  listview: boolean;

  constructor(leaf: WorkspaceLeaf, plugin: GradeboxPlugin) {
    super(leaf);

    this.navigation = true;
    this.workspaceleaf = leaf;
    this.plugin = plugin;

    this.displayText = (this.plugin == undefined || this.plugin.gradeSet == undefined || this.plugin.gradeSet == null) 
                          ? this.plugin.version 
                          : this.plugin.gradeSet.properties.get("title");
    this.filetypes = [ "pdf", "docx", "txt", "xlsx" ];

    this.colorized = false;
    this.listview = false;

    this.register(
      this.containerEl.onWindowMigrated(() => {
        console.log("windowMigrated");
      })
    )
  }

  getViewType() {
    return VIEW_TYPE_GRADEBOX;
  }

  getDisplayText() {
    return this.displayText;  
  }

  endsWith(str: string, suffixes: string[]): boolean {
      for (let i=0; i<suffixes.length; i++) 
        if (str.endsWith(suffixes[i])) return true;
      
      return false;
  }

  // 1. Open the view
  async onOpen() {
    console.log("Opening GradeBoxView");
    console.log(this);

    this.plugin.gradeBoxView = this;

    this.container = this.containerEl.children[1];
    this.container.empty();
    this.container.addClass("class-style");
 
      if (new Emailer().emailWorks) {
    this.addAction("lucide-mail", "mail", async () => {
      new EmailerModal(this.app, this.plugin.settings, 
                       async (message: string, from: string, address: string, subject: string, includeScores: boolean, filesDir: FileList) => {
                          if (address == "#class") {
                            let ogMessage = message;
                            let progress = new Progress(this.plugin, `Sending email`, "GradeBox is a plugin for Obsidian Buddy", "All email messages sent.", this.gradeSet.getStudents());
                            progress.open();
                            const sendingDelay = parseInt(this.plugin.settings.delay)*1000;
                            const semaphore = new Semaphore(1);
                            this.gradeSet.students.forEach( (stud: Student) => {
                              semaphore.callFunction( async () => {
                                message = ogMessage;
                                let email = new Emailer();
                                if (filesDir !== undefined) {
                                  // get the last name
                                  let lname = stud.data.get("name");
                                  if (lname.contains(',')) lname = lname.substring(0, lname.indexOf(','));
                                  if (lname.contains(' ')) lname = lname.substring(lname.indexOf(' ')+1);
                                  lname = lname.toLowerCase();
                                  console.log("lname = "+lname);

                                  for (let i=0; i < filesDir.length; i++) {
                                    if (this.endsWith(filesDir.item(i).name, this.filetypes)  && 
                                             filesDir.item(i).name.startsWith(lname)) {
                                      email.addAttachment(filesDir.item(i).path, filesDir.item(i).name, "application/pdf");
                                    }
                                  }
                                }
                                message = (new Template(this.gradeSet)).process(message, stud);
                                await email.sendmail(stud.data.get("emailaddress"), from, subject, message, this.plugin.settings, console.log);
                                await Utilities.sleep(sendingDelay);
                                progress.update();
                              });
                            });

                          } else {
                            let email = new Emailer();
                            console.log(filesDir);
                            if (filesDir !== undefined) {
                              for (let i=0; i < filesDir.length; i++) {
                                  if (this.endsWith(filesDir.item(i).name, this.filetypes)) {
                                      email.addAttachment(filesDir.item(i).path, filesDir.item(i).name, "application/pdf");
                                  }
                              }
                            }
                            let stud = this.gradeSet.getStudent({emailaddress: address});
                            if (stud !== undefined) message = (new Template(this.gradeSet)).process(message, stud);
                            email.sendmail(address, from, subject, message, this.plugin.settings, console.log);
                          }
                       }
      ).open();
    })
    }
    this.addAction("lucide-signal", "sort", (e: MouseEvent) => {
      let sortMenu = new Menu();
      sortMenu.addItem( (item) => {
        item.setTitle("Name Ascending")
          .setIcon("lucide-sort-ascending")
          .onClick( () => {
            this.gradeSet.setSortMethod(this.gradeSet.studentNamesAscending);
            this.display();
          });
        });
      sortMenu.addItem( (item) => {
        item.setTitle("Name Descending")
          .setIcon("lucide-sort-ascending")
          .onClick( () => {
            this.gradeSet.setSortMethod(this.gradeSet.studentNamesDescending);
            this.display();
          });
        });
      sortMenu.addItem( (item) => {
        item.setTitle("Score Ascending")
          .setIcon("lucide-sort-ascending")
          .onClick( () => {
            this.gradeSet.setSortMethod(this.gradeSet.studentScoresAscending);
            this.display();
          });
        });
      sortMenu.addItem( (item) => {
        item.setTitle("Score Descending")
          .setIcon("lucide-sort-ascending")
          .onClick( () => {
            this.gradeSet.setSortMethod(this.gradeSet.studentScoresDescending);
            this.display();
          });
        });
        sortMenu.showAtMouseEvent(e);
    });
    this.addAction("lucide-palette", "colorize", async () => {
      this.colorized = !this.colorized;
      this.display();
    })
    this.addAction("lucide-plus-circle", "Add a score", () => {
      if (this.gradeSet.categories.length == 0) {
        new Alert(this.plugin, "No Categories", "You must first create a category before adding a score.").open();
        return;
      }
		  new NewScoreModal(this.app, this.gradeSet, () => {
        this.gradeSet.writeGradeSet();
        this.display();
      }).open();
    });
    this.addAction("lucide-calendar-plus", "Add an absence", () => {
		  new AddAbsenceModal(this.app, this.gradeSet, (absences: Date[]) => {
          this.gradeSet.addAbsences(absences);
          this.gradeSet.writeGradeSet();
          this.display();
      }).open();
    });
    this.addAction("lucide-calculator", "Add a counter", () => {
		  new NewCounterModal(this.app, this.gradeSet, (counter: Counter) => {
          this.gradeSet.addCounter(counter);
          this.gradeSet.writeGradeSet();
          this.display();
      }).open();
    });

    this.gradeSet = (this.plugin !== undefined) ? this.plugin.gradeSet : null;
    if (this.gradeSet == undefined || this.gradeSet == null) {
        console.log("ERROR: GradeSet is undefined, closing GBV");
        console.log(this.plugin);
        this.onClose();  
    } else {
      this.displayText = this.gradeSet.properties.get("title");

      this.plugin.registerEvent(
        this.app.workspace.on("resize", () => {
           let newwidth = this.containerEl.win.innerWidth;
           //console.log("RESIZE EVENT: "+newwidth+" & "+width);
           if (Math.abs(newwidth-width) > 300) {
            this.container.empty();
            const div = this.container.createEl("div", { cls: "view-style" });
            newwidth = this.containerEl.win.innerWidth;
            this.gradeSet.display(div, newwidth);
            width = newwidth;
          }
        }));
        
      this.plugin.registerEvent(
        this.app.workspace.on("active-leaf-change", () => {
          if (this.gradeSet !== undefined && this.gradeSet.modified) this.display();
        }));

        const div = this.container.createEl("div", { cls: "view-style" });

        let width = this.containerEl.win.innerWidth;    
        this.statusbarElement = this.plugin.addStatusBarItem()

        if (this.gradeSet != null) {
          this.displayText = this.gradeSet.title;
          this.display();
          this.statusbarElement.setText(""+this.gradeSet.getStudents()+" students");    
        }
      }

      if (this.plugin.settings.whenToGenerate == "open") {
        console.log("Generating web server XML");
        let filename = this.plugin.settings.XMLfilename;
        if (filename.length == 0) {
            //new Alert(this.plugin, "No Filename", "No XML filename specified in settings").open();
            return;
        }
        let ogfilename = filename;
        let pos = filename.lastIndexOf("/");
        let path = null;
        if (pos >= 0) {
          path = this.app.vault.getAbstractFileByPath(filename.substring(0, pos));
          filename = filename.substring(pos+1);
        } else {
          path = this.app.vault.getRoot();
        }
        if (Utilities.fileExists(filename, path as TFolder)) { 
          let taf = this.app.vault.getAbstractFileByPath(ogfilename) as TFile;
          console.log("Trying to delete "+taf.path)
          if (taf !== undefined) await this.app.vault.delete(taf);
        }
        let xml = this.gradeSet.generateXMLForWebServer();
        const xmlFile: TFile = await (
          app.fileManager as any
          ).createNewMarkdownFile(app.workspace.getActiveFile()?.path, ogfilename);
        this.app.vault.modify(xmlFile, xml);
      }

      // Reminders
      if (this.gradeSet != null) {
        this.gradeSet.reminders.forEach( (reminder: Reminder) => {
          console.log("Checking reminder: "+reminder.text);
          if (reminder.isTriggered()) {
            console.log("Reminder triggered: "+reminder.text);
            new ReminderPopup(this.plugin, reminder, (rem: Reminder) => {
              this.gradeSet.deleteReminder(rem);
              if (rem.repeat > 0) {
                rem.reset();
                this.gradeSet.addReminder(rem);
              } 
            }).open();
          }
        });
      }
    
  }

  async onClose() {
    console.log("Closing GradeBoxView");
    if (this.gradeSet !== undefined) {
      console.log("MODIFIED: "+this.gradeSet.modified);
      if (this.gradeSet.modified) this.gradeSet.writeGradeSet();
      this.statusbarElement.setText("");
    }
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_STUDENT);
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_GRADESET_SUMMARY);
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_GRADEBOX);

    if (this.gradeSet == undefined) return;

    console.log("WHEN TO GENERATE: "+this.plugin.settings.whenToGenerate);
    if (this.plugin.settings.whenToGenerate == "close") {
      console.log("Generating web server XML");
      let filename = this.gradeSet.properties.get("webfile");
      if (filename == undefined || filename.length == 0) {
          //new Alert(this.plugin, "No Filename", "No Web filename specified in settings").open();
          return;
      }
      let ogfilename = filename;
      let pos = filename.lastIndexOf("/");
      let path = null;
      if (pos >= 0) {
        path = this.app.vault.getAbstractFileByPath(filename.substring(0, pos));
        filename = filename.substring(pos+1);
      } else {
        path = this.app.vault.getRoot();
      }
      if (Utilities.fileExists(filename, path as TFolder)) { 
        let taf = this.app.vault.getAbstractFileByPath(ogfilename) as TFile;
        console.log("Trying to delete "+taf.path)
        if (taf !== undefined) await this.app.vault.delete(taf);
      }
      let xml = this.gradeSet.generateXMLForWebServer();
      const xmlFile: TFile = await (
        app.fileManager as any
        ).createNewMarkdownFile(app.workspace.getActiveFile()?.path, ogfilename);
      this.app.vault.modify(xmlFile, xml);
    }

    // TRMNL updates when closing the GradeboxView
    console.log("Setting TRMNL");
    if (this.plugin.settings.useTRMNL) {
      let trmnl = new TRMNL(this.plugin.settings.TRMNLpluginID);
      
      // Create HTML to be published to TRMNL
      let first = '[{"name": "'+this.gradeSet.getTitle()+'", "students": '+this.gradeSet.getStudents()+'}]';
      let html = this.gradeSet.generateTRMNLHTML();
      
      trmnl.setHTML(JSON.parse(html));
      let result = trmnl.publish(JSON.parse(first));
    
      if (! result) {
        //   DO SOMETHING
      }
    }

  }

  async CSVimport(rent: GradeboxView, gs: GradeSet, file: string) {
    console.log("USING "+file+" FOR IMPORT, Comparing to "+this.app.vault.adapter.basePath);
    // Process
    let pos = file.indexOf(this.app.vault.adapter.basePath);
    if (pos < 0) {
      new Alert(rent.plugin, "Error", "You must choose a file in the vault").open();
      return;
    } else {
      file = file.replace(this.app.vault.adapter.basePath+"\\", "");
    }
    file = file.replace(/\\/g, "/");
    console.log(file);
    let tfile = this.app.vault.getAbstractFileByPath(file) as TFile;
    console.log(tfile);
    let csvdata = await app.vault.read( tfile );
    console.log(csvdata);
    // let csvdata = 
    //     '"jipping, Mike", "01010101", "jipping@hope.edu", 24, 42, 5.1, Hello\n' +
    //     '"Shatner, William", "000111001", "kirk@enterprise.org", 22,22,6.0, Go';
    const objPattern = new RegExp(("(\\,|\\r?\\n|\\r|^)(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|([^\\,\\r\\n]*))"),"gi");
    let arrMatches = null, arrData: string[][] = [[]];
    while (arrMatches = objPattern.exec(csvdata)){
        if (arrMatches[1].length && arrMatches[1] !== ",")arrData.push([]);
        arrData[arrData.length - 1].push(arrMatches[2] ? 
            arrMatches[2].replace(new RegExp( "\"\"", "g" ), "\"") :
            arrMatches[3]);
    }

    // Choose fields
    // Build a modal, 
    let fieldModal = new Modal(this.app);
    let {contentEl} = fieldModal;
		
		contentEl.createEl("h2", { text: 'Choose fields to import' });

    let setting: Setting[] = [];
    let positions = {};
    let column = 0;
    arrData[0].forEach( (line: string) => {
      setting[column] = 
      new Setting(contentEl) 
			.setName(line)
			.addDropdown(text => text
				.onChange(async (value) => {
            positions[value] = column;
				})
				.addOption("ignored", "ignored")
				.addOption("first name", "first name")
				.addOption("last name", "last name")
				.addOption("full name", "full name")
				.addOption("ID", "ID")
				.addOption("email address", "email address")
				.setValue("ignored")
        );
        column ++;
      });

      new Setting(contentEl)
        .addButton((btn) =>
        btn
          .setButtonText("Import")
          .setCta()
          .onClick(() => {
            fieldModal.close();
            // set up positions
            for (let i = 0; i < setting.length; i++) {
              let val: string = setting[i].components[0].getValue();
              if (val !== "ignored") positions[val] = i;
            }
            //// parse / import the file
            //console.log(positions);
            arrData.forEach( async (line: string[]) => {
              let stud = new Student(null);
              let sname = line[positions["full name"]];
              if (sname == undefined) {
                sname = line[positions["last name"]] + ", " + line[positions["first name"]];
              }
              stud.data.set("name", sname.replaceAll('"', '').trim());
              stud.data.set("id", line[positions["ID"]].replaceAll('"', '').trim());
              if (line[positions["email address"]] != undefined) {
                stud.data.set("emailaddress", stud.data.get("emailaddress").replaceAll('"', '').trim());
              }
              stud.data.set("image", "https://plus.hope.edu/Photos/000"+line[positions["ID"]].replaceAll('"', '').trim()+'.jpg');
              console.log(stud);

              console.log(gs.sourceFolder);
              const studentFile: TFile = await (
                app.fileManager as any
                ).createNewMarkdownFile(gs.sourceFolder, stud.data.get("id"));
              var datastr = "#name "+stud.data.get("name")+"\n"+
                 "#id "+stud.data.get("id")+"\n";
              if (stud.data.get("nickname") !== undefined) 
                 datastr += "#nickname "+stud.data.get("nickname")+"\n";
              if (stud.data.get("emailaddress") !== undefined) 
                 datastr += "#emailaddress "+stud.data.get("emailaddress")+"\n";
              if (stud.data.get("mobilePhoneNumber") !== undefined) 
                 datastr += "#mobilePhoneNumber "+stud.data.get("mobilePhoneNumber")+"\n";  
              if (stud.data.get("image") !== undefined) 
                 datastr += "#image "+stud.data.get("image")+"\n";  
              console.log(datastr)      
              app.vault.append(studentFile, datastr);
              stud.setSourceFile(studentFile);
              gs.addStudent(stud);
            } );
            this.display();
      }));

    fieldModal.open();

  }

  onPaneMenu(menu: Menu, source: string, callSuper: boolean = true) {
		if (source !== 'more-options') {
		  super.onPaneMenu(menu, source);
		  return;
		}
		// Add a menu item to force the board to markdown view
    if (new Emailer().emailWorks) {
      menu
    .addItem((item) => {
    item
      .setTitle('Email student scores')
      .setIcon('lucide-file-text')
      .setSection('pane')
      .onClick( async () => {
          let template = this.plugin.settings.template;
          if (template !== undefined && template.length > 0) {
            let pos = template.indexOf(this.app.vault.adapter.basePath);
            if (pos >= 0) template = template.replace(this.app.vault.adapter.basePath+"\\", "");
            template = template.replace(/\\/g, "/");
            console.log(template);
            let tfile = this.app.vault.getAbstractFileByPath(template) as TFile;
            console.log(tfile);
            if (template !== null) 
               template =  await app.vault.read( tfile );
            else
                template = "";
          } else {
            template = "";
          }
          // Here we email the student note
          const semaphore = new Semaphore(1);
          this.gradeSet.students.forEach( (stud: Student) => {
            const sendingDelay = parseInt(this.plugin.settings.delay)*1000;
            semaphore.callFunction( async () => {
              let email = new Emailer();
              let studentNote = "";
              if (template.length > 0) {
                studentNote = (new Template(this.gradeSet)).process(template, stud);
              } else {
                studentNote = stud.generateMarkdown(this.gradeSet);
              }
              console.log(studentNote);
              let html = markdown(studentNote);
              console.log(html);
              email.setMessageHTML(html); 
              let dt = new Date().toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"});
              let subject = "Your scores in "+this.gradeSet.properties.get("title")+" as of "+dt;           
              email.sendmail(stud.data.get("emailaddress"), this.plugin.settings.from, subject, "", this.plugin.settings, console.log);
              await Utilities.sleep(sendingDelay);
            });
          })
       });
    });
  }
    menu
    .addItem((item) => {
    item
      .setTitle('Generate score sheet')
      .setIcon('lucide-file-text')
      .setSection('pane')
      .onClick( async () => {
          // Open a file and generate markdown for a score sheet
          //let file = await this.app.vault.getAbstractFileByPath(this.gradeSet.sourceFolder+"/"+this.gradeSet.properties.get("title")+"sheet.md");
          const file: TFile = await (
            app.fileManager as any
            ).createNewMarkdownFile(app.workspace.getActiveFile()?.path, /*this.gradeSet.properties.get("title")*/"scoresheet.md");
      
          console.log(file as TFile);
          
          let sheet = "# Score Sheet for "+this.gradeSet.properties.get("title")+"\n\n";
          
          let first = false;
          sheet += `|  | `;
          for (let i=0; i<7; i++) sheet += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp; |";
          sheet += "\n";
          sheet += `|:---|:---|:---|:---|:---|:---|:---|:---|\n`;
          this.gradeSet.students.forEach( (stud: Student) => {
             sheet += `| ${stud.data.get("name")} | `;
             for (let i=0; i<7; i++) sheet += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp; |";
             sheet += "\n";
             if (first) {
                sheet += `|:---|:---|:---|:---|:---|:---|:---|:---|\n`;
                first = false;
              }
          });
          this.app.vault.modify(file, sheet);
       });
    });
    menu
    .addItem((item) => {
      item
      .setTitle('Grid view')
      .setIcon('lucide-grip')
      .setSection('pane')
      .onClick( async () => {
        this.listview = false;
        this.display();
      }
    )});
    menu
    .addItem((item) => {
     item
      .setTitle('List view')
      .setIcon('lucide-layout-list')
      .setSection('pane')
      .onClick( async () => {
        this.listview = true;
        this.displayList();
      }
    )});
    menu
    .addItem((item) => {
     item
      .setTitle('Add a reminder')
      .setIcon('lucide-layout-list')
      .setSection('pane')
      .onClick( async () => {
        new NewReminderModal(this.app, (reminder: Reminder) => {
          if (reminder !== undefined) this.gradeSet.addReminder(reminder);
          console.log(this.gradeSet.reminders);
          this.display();
        }).open();
      }
    )});
    menu
    .addItem((item) => {
     item
      .setTitle('Add a category')
      .setIcon('lucide-layout-list')
      .setSection('pane')
      .onClick( async () => {
        new NewCategoryModal(this.app, (category: Category) => {
          if (category !== undefined) this.gradeSet.addCategory(category);
          console.log(this.gradeSet.reminders);
          this.display();
        }).open();
      }
    )});
    menu
    .addItem((item) => {
     item
      .setTitle('Generate class list')
      .setIcon('lucide-layout-list')
      .setSection('pane')
      .onClick( async () => {
          // Here we email the student note
          const file: TFile = await (
            app.fileManager as any
            ).createNewMarkdownFile(app.workspace.getActiveFile()?.path, /*this.gradeSet.properties.get("title")*/"classlist.md"); 
          
          let liststring = "# Class List for "+this.gradeSet.properties.get("title")+"\n\n";
          liststring += '| Name | ID | Email |\n'
          liststring += `|:---|:---:|:---|\n`;
          this.gradeSet.students.forEach( (stud: Student) => {
            liststring += `| ${stud.data.get("name")} `;
            liststring += `| ${stud.data.get("id")} `;
            liststring += `| ${stud.data.get("emailaddress")} `;
            liststring += '|\n';
            
          });
          this.plugin.app.vault.append(file, liststring);
        });

        });

    menu
    .addItem((item) => {
     item
      .setTitle('Generate printables')
      .setIcon('lucide-layout-list')
      .setSection('pane')
      .onClick( async () => {
         let template = this.plugin.settings.template;
          if (template !== undefined && template.length > 0) {
            let pos = template.indexOf(this.app.vault.adapter.basePath);
            if (pos >= 0) template = template.replace(this.app.vault.adapter.basePath+"\\", "");
            template = template.replace(/\\/g, "/");
            console.log(template);
            let tfile = this.app.vault.getAbstractFileByPath(template) as TFile;
            console.log(tfile);
            if (template !== null) 
               template =  await app.vault.read( tfile );
            else
                template = "";
          } else {
            template = "";
          }

          // Here we email the student note
          const file: TFile = await (
            app.fileManager as any
            ).createNewMarkdownFile(app.workspace.getActiveFile()?.path, /*this.gradeSet.properties.get("title")*/"studentpages.md");  
          const semaphore = new Semaphore(1);
          this.gradeSet.students.forEach( (stud: Student) => {
            semaphore.callFunction( async () => {
              let studentNote = "";
              if (template.length > 0) {
                studentNote = (new Template(this.gradeSet)).process(template, stud);
              } else {
                studentNote = stud.generateMarkdown(this.gradeSet);
              }
              this.plugin.app.vault.append(file, '\n\n<div style="page-break-after: always;"></div>\n\n');
              this.plugin.app.vault.append(file, studentNote);
            });
          })

        });
      }
    );
    menu
		  .addItem((item) => {
			item
			  .setTitle('Add a student')
			  .setIcon('lucide-smile-plus')
			  .setSection('pane')
			  .onClick( () => {
          new NewStudentModal(this.app, async (student: Student) => {
            const studentFile: TFile = await (
              app.fileManager as any
              ).createNewMarkdownFile(this.gradeSet.sourceFolder, student.data.get("id"));
            var datastr = "#name "+student.data.get("name")+"\n"+
               "#id "+student.data.get("id")+"\n";
            if (student.data.get("nickname") !== undefined) 
               datastr += "#nickname "+student.data.get("nickname")+"\n";
            if (student.data.get("emailaddress") !== undefined) 
               datastr += "#emailaddress "+student.data.get("emailaddress")+"\n";
            if (student.data.get("mobilePhoneNumber") !== undefined) 
               datastr += "#mobilePhoneNumber "+student.data.get("mobilePhoneNumber")+"\n";  
            let imageurl = this.plugin.settings.url;
            imageurl = imageurl.replace("%id%", "000"+student.data.get("id"));
            datastr += "#image "+imageurl+"\n";
            console.log(datastr)      
            this.plugin.app.vault.append(studentFile, datastr);
            student.setSourceFile(studentFile);
            this.gradeSet.addStudent(student);
            this.display();
            this.statusbarElement.setText(""+this.gradeSet.getStudents()+" students");    
          }).open();
    
 			  });
		  });
      menu
		  .addItem((item) => {
			item
			  .setTitle('Import data')
			  .setIcon('lucide-file-text')
			  .setSection('pane')
			  .onClick( () => {
          // Choose a file
            const modal = new FileSelectorModal(this.app, this.gradeSet, this.CSVimport);
            modal.open();

 			  });
		  });
      menu
		  .addItem((item) => {
			item
			  .setTitle('About')
			  .setIcon('lucide-file-text')
			  .setSection('pane')
			  .onClick( () => {
          // Choose a file
          new Alert(this.plugin, `About ${this.plugin.version}`, "GradeBox is a plugin for Obsidian Buddy").open();
 			  });
		  });

    // Add a "Close" if we are on a mobile device
    if (Platform.isMobile) {
      menu
        .addItem((item) => {
          item
            .setTitle('Close')
            .setIcon('cross')
            .onClick(() => {
              this.close();
            });
        });
    }


      

      if (callSuper) {
        super.onPaneMenu(menu, source);
      }
  
    }

  display() {
    if (this.listview) {
      this.displayList();
    } else {
        console.log("DISPLAYING...colorized = "+this.colorized);
        this.container.empty();
        this.displayText = this.plugin.version;
        const div = this.container.createEl("div", { cls: "view-style" });
        let width = this.containerEl.win.innerWidth;
        if (this.gradeSet != null) {
          this.displayText = this.gradeSet.properties.get("title");
          if (this.colorized) {
            this.gradeSet.display(div, width, 
                                  this.plugin.settings.colorDivider1,
                                  this.plugin.settings.colorDivider2);
          } else {
            this.gradeSet.display(div, width);
          }
          this.statusbarElement.setText(""+this.gradeSet.getStudents()+" students");
        }
      }
    }

  displayList() {
    this.container.empty();
    this.displayText = this.plugin.version;
    const div = this.container.createEl("div", { cls: "view-style" });
    let width = this.containerEl.win.innerWidth;
    if (this.gradeSet != null) {
      this.displayText = this.gradeSet.properties.get("title");
      this.gradeSet.displayList(div, width);
      this.statusbarElement.setText(""+this.gradeSet.getStudents()+" students");
    }
  }

  clear() {

  }


}

class FileSelectorModal extends Modal {
	
  callbackOnClose;

  caller: Object;
  handler: Function;
  gradeSet: GradeSet;
  view: GradeboxView;

constructor(app: App, gs: GradeSet, callbackOnClose: (view: GradeboxView, gs: GradeSet, file: string) => void) {
  super(app);

      this.callbackOnClose = callbackOnClose;
      this.gradeSet = gs;
}

onOpen() {
    new Setting(this.contentEl).setName("Importing is very picky!").
       setDesc("The file to be imported must be in the vault.  The file will be imported as a CSV file.");
    const setting1 = new Setting(this.contentEl).setName("Choose CSV File").setDesc("Choose CSV data file to import");
    const inputDataFile = setting1.controlEl.createEl("input", {
        attr: {
          type: "file",
          multiple: false,
          //accept: ".json,.csv,.tsv"
        }
    });

    const setting5 = new Setting(this.contentEl).setName("Import").setDesc("Press to start the Import Process");
    const input5 = setting5.controlEl.createEl("button");
    input5.textContent = "Import";

    input5.onclick = async () => {
      console.log(inputDataFile.files[0]);
      this.callbackOnClose(this.view, this.gradeSet, inputDataFile.files[0].path);
    
      new Notice("Import Finished");
      this.close();
      this.view.display();
    }
  }

  onClose() {
    let {contentEl} = this;
    contentEl.empty();
  }

}