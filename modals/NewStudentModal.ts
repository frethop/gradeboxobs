import { App, Modal, Notice, Setting, TFile, TextFileView, WorkspaceLeaf } from "obsidian";

import { GradeSet } from "data/GradeSet";
import { Student } from "data/Student";
import GradeboxPlugin from "main";

export class NewStudentModal extends Modal {
  name: string;
  id: string;
  emailaddress: string;
  nickname: string;
  mobilePhoneNumber: string;

  newStudent: Student;

  callbackOnClose;

	constructor(app: App, callbackOnClose: (student: Student) => void) {
		super(app);
    	this.newStudent = null;
    	this.callbackOnClose = callbackOnClose;
	}

	onOpen() {
		let {contentEl} = this;
		
		contentEl.createEl("h2", { text: 'New Student' });

		new Setting(contentEl)
		.setName("Name")
		.addText((text) =>
		  text
			  .setValue("")
			  .onChange((value) => {	
				  this.name = value;
			  }
    ));

    new Setting(contentEl)
		.setName("ID")
		.addText((text) =>
		  text
			  .setValue("")
			  .onChange((value) => {	
				  this.id = value;
			  }
    ));
    
		new Setting(contentEl)
		.setName("Nickname")
		.addText((text) =>
		  text
			  .setValue("")
			  .onChange((value) => {	
				  this.nickname = value;
			  }
    ));

    new Setting(contentEl)
		.setName("Email address")
		.addText((text) =>
		  text
			  .setValue("")
			  .onChange((value) => {	
				  this.emailaddress = value;
			  }
    ));

    new Setting(contentEl)
		.setName("Mobile phone number")
		.addText((text) =>
		  text
			  .setValue("")
			  .onChange((value) => {	
				  this.mobilePhoneNumber = value;
			  }
    ));

		new Setting(contentEl)
			.addButton((btn) =>
			  btn
				.setButtonText("OK")
				.setCta()
				.onClick(() => {
					if (this.name === undefined) {
						new Notice("You must enter a student name.", 5000);
					} else if (this.id === undefined) {
						new Notice("You must enter a student ID.", 5000);
					} else {
						this.close();
					}
				
		}));
	}

	onClose() {
		if (this.name === undefined || this.id === undefined) return;
		console.log(this);
		var obj: Object = {
			name: this.name,
			id: this.id,
			emailaddress: this.emailaddress,
			nickname: this.nickname,
			mobilephonenumber: this.mobilePhoneNumber
		}
    	this.newStudent = new Student(obj);
		console.log(this.newStudent);
		if (this.newStudent === undefined) return;
    	this.callbackOnClose(this.newStudent);
	}

  getStudent() {
    return this.newStudent;
  }
}
