import { App, DropdownComponent, Modal, Setting, TFile, TextComponent, TextFileView, WorkspaceLeaf } from "obsidian";

import { Category } from "data/Category";
import { GradeSet } from "data/GradeSet";
import GradeboxPlugin from "main";
import { Reminder } from "data/Reminder";
import { Score } from "data/Score";
import { Student } from "data/Student";

export class NewReminderModal extends Modal {

    callbackOnClose;
	reminder: Reminder;
	gradeSet: GradeSet;
    text: string;
    date: string;
    repeat: string;
    prior: string;

	constructor(app: App, callbackOnClose: (reminder: Reminder) => void) {
		super(app);
        this.callbackOnClose = callbackOnClose;
		this.reminder = null;
        this.text = "";
        this.date = "";
        this.repeat = "0";
        this.prior = "0";
	}

    onOpen() {
		let {contentEl} = this;
		
		contentEl.createEl("h2", { text: 'New Reminder' });

		new Setting(contentEl)
		.setName("Text")
		.addText((text) =>
		  text
			  .setValue("")
			  .onChange((value) => {	
				  this.text = value;
			  }
    	));

        let now = new Date();
        let today = now.toLocaleDateString('en-us', { year:"numeric", month:"numeric", day:"numeric"});
        this.date = today;
        new Setting(contentEl)
        .setName("Starting Date")
        .addText((text) =>
            text
                .setValue(today)
                .onChange((value) => {
                    this.date = value;
                }
        ));

        new Setting(contentEl)
        .setName("Repeat in Days")
        .addText((text) =>
            text
                .setValue(this.repeat)
                .onChange((value) => {
                    this.repeat = value;
                }
        ));

        new Setting(contentEl)
        .setName("Reminder Days Before")
        .addText((text) =>
            text
                .setValue(this.prior)
                .onChange((value) => {
                    this.prior = value;
                }
        ));

        new Setting(contentEl)
		.addButton((btn) =>
		  btn
			.setButtonText("OK")
			.setCta()
			.onClick(() => {
			  	this.close();
                let rem = new Reminder(this.text, new Date(this.date), parseInt(this.repeat), parseInt(this.prior));
                console.log(rem);
				this.callbackOnClose(rem);
                
			}
		));

    }
}