import { App, DropdownComponent, KeymapEventHandler, Modal, Setting, TFile, TextComponent, TextFileView, WorkspaceLeaf } from "obsidian";

import { Category } from "data/Category";
import { Counter } from "data/Counter";
import { GradeSet } from "data/GradeSet";
import GradeboxPlugin from "main";
import { Score } from "data/Score";
import { Student } from "data/Student";

export class NewCounterModal extends Modal {

    callbackOnClose;
	name: string;
	initial: number;
	fields: TextComponent[];	
	initialField: Setting;
	gradeSet: GradeSet;
	ec: boolean;
	enterhandler: KeymapEventHandler;
	field: number;

	constructor(app: App, gradeSet: GradeSet, callbackOnClose: (counter: Counter) => void) {
		super(app);
		this.gradeSet = gradeSet;
        this.callbackOnClose = callbackOnClose;
		this.name = "";	}

	onOpen() {
		let {contentEl} = this;
		
		contentEl.createEl("h2", { text: 'New Counter' });

		new Setting(contentEl)
		    .setName("Name")
            .addText((text) => text
                .setValue("")
                .onChange((value) => {	
                    this.name = value;
                }
            ));

		this.initialField = new Setting(contentEl)
			.setName("Initial Value")
			.addText( (text) => 
			  	text
			  		.setValue("")
					.onChange( (value) => {
						this.initial = value as unknown as number;
					})
			);


		new Setting(contentEl)
		.addButton((btn) =>
		  btn
			.setButtonText("OK")
			.setCta()
			.onClick(() => {
                let counter = new Counter(this.name);
                counter.set(this.initial);
			  	this.close();
				this.callbackOnClose(counter);
			}
		));

	}

	onClose() {
		this.scope.unregister(this.enterhandler);
	}
}

