import { App, Modal, Setting, TFile } from 'obsidian';

import { GradeboxView, VIEW_TYPE_GRADEBOX } from "../GradeboxView";
import { GradeSetSummaryView, VIEW_TYPE_GRADESET_SUMMARY } from "../GradeSetSummaryView";
   
export class NewGradeSetModal0 extends Modal {
	gname: string;
	gradesFile: TFile;

	constructor(app: App, grades: TFile) {
		super(app);
		this.gradesFile = grades;
	}

	onOpen() {
		let {contentEl} = this;
		
		contentEl.createEl("h2", { text: 'New Gradeset' });

		new Setting(contentEl)
		.setName("Gradeset Name")
		.addText((text) =>
		  text
			  .setValue("")
			  .onChange((value) => {	
				this.gname = value;
			  }
            ));

		new Setting(contentEl)
			.addButton((btn) =>
			  btn
				.setButtonText("OK")
				.setCta()
				.onClick(() => {
				  app.vault.append(this.gradesFile, "#title "+this.gname+'\n');
				  this.close();
				
		}));
	}

	onClose() {
		let {contentEl} = this;
		contentEl.empty();
	}
}