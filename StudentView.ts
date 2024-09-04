import './utilities/codemirror'

import { Editor, ItemView, MarkdownRenderer, MarkdownView, Menu, Platform, TFile, TextComponent, TextFileView, ViewState, WorkspaceLeaf } from "obsidian";

import { Alert } from "utilities/alert";
import { Category } from "data/Category";
import { Counter } from "data/Counter";
import { CounterTick } from "modals/CounterTick";
import { Dialog } from 'utilities/Dialog';
import { Emailer } from "email";
import { EmailerModal } from "modals/EmailerModal";
import { GradeSet } from "data/GradeSet";
import GradeboxPlugin from "main";
import {NoteModal} from "modals/NoteModal";
import { Score } from "data/Score";
import { Student } from "data/Student";
import { Template } from "utilities/Template";
import  Utilities  from "utilities/Utilities";
import { markdown } from "utilities/drawdown";

export const VIEW_TYPE_STUDENT = "student-view";
export const PREVIEW_MODE = 2;
export const EDITING_MODE = 1;

export class StudentView extends ItemView {

  plugin: GradeboxPlugin;
  gradeSetPath: string;
  gradeSetFile: TFile;
  frontmatter : string;
  gradeSetData: string;
  gradeSet: GradeSet;
  student: Student;
  container: Element;

  statusbarElement: HTMLElement;
  previewElement: HTMLElement;
  editElement: HTMLElement;
  saveElement: HTMLElement;

  // internal code mirror instance
  editor: Editor;

  mode: number;
  studentData: string;
  backupData: string;
  dataChanged: boolean;

  whatifmode: boolean;

    // this.contentEl is not exposed, so cheat a bit.
    public get extContentEl(): HTMLElement {
      // @ts-ignore
      return this.contentEl;
    }  

  constructor(leaf: WorkspaceLeaf, plugin: GradeboxPlugin, gradeSet: GradeSet) {
    super(leaf);

    this.navigation = true;
    this.plugin = plugin;
    this.gradeSet = gradeSet;
      
    this.mode = EDITING_MODE;
    this.dataChanged = false;
    this.whatifmode = false;
  }

  getViewType() {
    return VIEW_TYPE_STUDENT;
  }

  getDisplayText() {
    return this.student==undefined?"":this.student.data.get("name");
  }

  async onOpen() {
    console.log("StudentView onOpen");
    this.gradeSet = this.plugin.gradeSet;
    this.student = this.plugin.currentStudent;
    console.log(this.student.noteData);
    this.studentData = this.student.noteData; //await this.app.vault.read(this.student.sourceFile);
    console.log("StudentView data: "+this.studentData);

    this.previewElement = this.addAction("lucide-book-open", "preview", () => {
      this.setPreviewMode();
    });
    this.editElement = this.addAction("lucide-edit-3", "edit", () => {
      this.setEditingMode();
    });
    this.addAction("file-text", "add note", () => {
      new NoteModal(this.app, this.student.notes, (note: string) => {
        this.student.setNotes(note);
        this.studentData = this.studentData.replace(/#note.*/g, "");
        console.log(this.studentData);
        var notesArray = note.split("\n");
        notesArray.forEach( (nte) => {
              this.studentData += "#note "+nte+"\n";
        });
        //this.studentData += "#note "+note+"\n";
        console.log(this.studentData);
        this.plugin.gradeSet.modified = true;
        this.dataChanged = true;  
        this.redisplay();
      }).open();
    });
    if (new Emailer().emailWorks) {
    this.addAction("lucide-mail", "email", async () => {
      if (this.student.data.get("emailaddress") == undefined) {
        new Alert(this.plugin, "No Address", "There is no email address defined for this student.").open();
        return;
      } else {
        let fields = this.plugin.settings;
        fields.defaultto = this.student.data.get("emailaddress");
        new EmailerModal(this.app, fields, 
                        (message: string, from: string, address: string, subject: string) => {
                              new Emailer().sendmail(this.student.data.get("emailaddress"), 
                                    from, subject, message, this.plugin.settings, console.log);
                        }
        ).open();
      }
    });
  }
    if (this.gradeSet.counters.length > 0) 
      this.addAction("lucide-calculator", "counters", () => {
        if (this.gradeSet.counters.length==0) {
          new Alert(this.plugin, "No Counters", "There are no counters defined in this grade set.").open();
          return;
        } else {
          new CounterTick(this.plugin.app, this.student, (counter: Counter) => {
            this.student.updateCounter(counter);
            this.gradeSet.modified = true;
            this.redisplay();
          }).open();
        }
      });
    this.addAction("lucide-bed", "new absence", () => {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; 
      var yyyy = today.getFullYear();
      
      this.student.addAbsence(today);
      this.plugin.gradeSet.modified = true;
      this.dataChanged = true;
      this.redisplay();
    });
    
    this.mode = EDITING_MODE;  // force view to generate preview first
    this.dataChanged = false;
    this.setPreviewMode();
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
          // // Here we email the student note
          //   let email = new Emailer();
          //   let studentNote = this.student.generateMarkdown(this.gradeSet);
          //   let emailDiv = this.container.createDiv();
          //   MarkdownRenderer.renderMarkdown(studentNote, emailDiv, null, null);
          //   let html = emailDiv.innerHTML;
          //   email.setMessageHTML(html); 
          //   emailDiv.empty(); emailDiv.detach();
          //   let subject = "Scores in "+this.gradeSet.title+" as of "+Date();           
          //   email.sendmail(this.student.data.get("emailaddress"), this.plugin.settings.from, subject, "", this.plugin.settings, console.log);
          let template = this.plugin.settings.template;
          if (template !== undefined && template.length > 0) {
            let pos = template.indexOf(this.app.vault.adapter.basePath);
            if (pos >= 0) template = template.replace(this.app.vault.adapter.basePath+"\\", "");
            template = template.replace(/\\/g, "/");
            console.log(template);
            let tfile = this.app.vault.getAbstractFileByPath(template) as TFile;
            console.log(tfile);
            template =  await app.vault.read( tfile );
          } else {
            template = "";
          }
          // Here we email the student note
            let email = new Emailer();
            let studentNote = "";
            if (template.length > 0) {
              studentNote = (new Template(this.gradeSet)).process(template, this.student);
            } else {
              studentNote = this.student.generateMarkdown(this.gradeSet);
            }
            console.log(studentNote);
            let html = markdown(studentNote);
            console.log(html);
            email.setMessageHTML(html); 
            let dt = new Date().toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"});
            let subject = "Your scores in "+this.gradeSet.properties.get("title")+" as of "+dt;           
            email.sendmail(this.student.data.get("emailaddress"), this.plugin.settings.from, subject, "", this.plugin.settings, console.log);
          
       });
    });
  }

    menu
    .addItem((item) => {
    item
      .setTitle('Delete student')
      .setIcon('file-x')
      .setSection('pane')
      .onClick( () => {
          new Dialog(this.plugin, "Delete Student", "Type DELETE if you want to delete this student.", "Delete", "Cancel", (str: string) => {
            if (str == "DELETE") {
              this.plugin.gradeSet.deleteStudent(this.student);
              this.plugin.gradeSet.modified = true;
              // change the file name
              let newName = this.student.sourceFile.path.replace(".md", ".del");
              try {
                this.plugin.app.vault.rename(this.student.sourceFile, newName);
              } catch (e) {
                let file = new TFile();
                file.path = newName;
                this.plugin.app.vault.delete(file);
                this.plugin.app.vault.rename(this.student.sourceFile, newName);
              }
              //close();
            }
          }).open();
       });
    });

    menu
    .addItem((item) => {
    item
      .setTitle('What if mode')
      .setIcon('shield-question')
      .setSection('pane')
      .onClick( () => {
        console.log("What if mode---------------------------------------------------");
        this.whatifmode = !this.whatifmode;
        if (this.whatifmode) {
          this.backupData = this.studentData;
        } else {
          this.studentData = this.backupData;
        }
        this.redisplay(); 
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
  }

  redisplay() {
    if (this.mode == PREVIEW_MODE) {
      this.container = this.containerEl.children[1];
      this.container.empty();
      const div = this.container.createEl("div", { cls: "view-style" });
      let studentNote = this.student.generateMarkdown(this.gradeSet);
      if (this.whatifmode) studentNote = "# What if mode is on\n" + studentNote;
      let markdown = MarkdownRenderer.render(this.app, studentNote, div, null, null);
    } else {
      //this.codeMirror.setValue(this.studentData);
    }  
  }

  setPreviewMode() {
    if (this.mode == PREVIEW_MODE) return;

    this.mode = PREVIEW_MODE;

    //this.studentData = this.codeMirror.getValue();
    if (typeof this.student == 'undefined') this.student = new Student(null);
    //this.student.configureFromData(this.studentData);

    this.container = this.containerEl.children[1];
    this.container.empty();
    const div = this.container.createEl("div", { cls: "view-style" });
    let studentNote = this.student.generateMarkdown(this.gradeSet);
    if (this.whatifmode) studentNote = "# What if mode is on\n" + studentNote;
    console.log(studentNote);
    let markdown = MarkdownRenderer.render(this.app, studentNote, div, null, null);

    this.editElement.show();
    this.previewElement.hide();
  }

  async setEditingMode() {
    if (this.mode == EDITING_MODE) return;

    this.mode = EDITING_MODE;

    this.container = this.containerEl.children[1];
    this.container.empty();

    if (this.whatifmode) this.container.createEl("h1", { text: "What if mode is on" });
    this.student.generateEditHTML(this.container, this.gradeSet);

    //this.setViewData(this.studentData, true);
    this.plugin.gradeSet.modified = ! this.whatifmode;
    this.dataChanged = ! this.whatifmode;

    this.editElement.hide();
    this.previewElement.show();
  }

  async onClose() {
    console.log("StudentView Closing");
    console.log(this.whatifmode);
    if (this.whatifmode) {
      this.studentData = this.backupData;
    } else if (this.dataChanged) {
        if (this.mode == EDITING_MODE) {
          console.log("StudentView Data Changed");
          //this.studentData = this.getViewData();
          console.log(this.studentData);
          //this.student.configureFromData(this.studentData);
        }
        this.gradeSet.writeGradeSet();
      }
  
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_STUDENT);
    this.plugin.gradeBoxView.display()
  }

  setViewState(viewstate: ViewState, data?: any) {
    console.log("STUDENTVIEW SetViewstate");
    console.log(viewstate);
  }

    // when the view is resized, refresh CodeMirror (thanks Licat!)
    onResize() {
    }
  
    // called on code mirror changes
    changed(instance: CodeMirror.Editor) {
      console.log("DATA CHANGED");
      this.dataChanged = true;
      this.studentData = this.getViewData();
    }
  
    // get the new file contents
    getViewData = () => {
      return "";
    }

    // set the file contents
    setViewData = (data: string, clear: boolean) => {
      console.log("SETVIEWDATA, clear: "+clear);
      console.log(data);
    }
  
    // clear the view content
    clear = () => {
    }


  
  
}