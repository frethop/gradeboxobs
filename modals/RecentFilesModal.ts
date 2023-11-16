import { App, ButtonComponent, DropdownComponent, Modal, Setting, TFile, TextFileView, ToggleComponent, WorkspaceLeaf } from "obsidian";

import { Category } from "data/Category";
import { Counter } from "data/Counter";
import { GradeSet } from "data/GradeSet";
import { Score } from "data/Score";
import { Student } from "data/Student";

export class RecentFilesModal extends Modal {

    callbackOnClose;
    file1: string;
    file2: string;
    file3: string;
    gradeSet: string;

    constructor(app: App, 
                file1: string, file2: string, file3: string, 
                callbackOnClose: (filePath: string) => void) {
		super(app);
        
        this.file1 = file1;
        this.file2 = file2;
        this.file3 = file3;
        this.callbackOnClose = callbackOnClose;

        this.gradeSet = this.file1;
	}

	onOpen() {
		let {contentEl} = this;
		
        contentEl.createEl("form", {}, (form) => {

        form.createEl("h2", { text: 'Choose a GradeSet' });
        form.createEl("hr");

        let filesDropdown = new DropdownComponent(form)
            .addOption(this.file1, this.file1)
            .addOption(this.file2, this.file2)
            .addOption(this.file3, this.file3)
            .onChange((value) => {
                this.gradeSet = value;
            });
        

        form.createEl("hr");

        new ButtonComponent(form)
            .setButtonText("Open")
            .setCta()
            .onClick( () => {
                this.close();
                this.callbackOnClose(this.gradeSet);
            });
        })	

    }

    onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}

}