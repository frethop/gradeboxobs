// Stolen from https://github.com/helloitsian/custom-modals-obsidian/blob/main/src/modal/CustomModal.ts

import { App, Modal, Notice, Plugin, Setting } from 'obsidian';

import { Alert } from './alert';

export class Progress extends Modal {
	plugin: Plugin;
	title: string;
	label: string;
	bar: HTMLProgressElement;
	closingMessage: string;
	max: number;
  
	constructor(
		plugin: Plugin,
		title: string,
		label: string,
		closingMessage: string,
		max: number
	) {
		super(plugin.app);

		this.plugin = plugin;
		this.title = title;
		this.label = label;
		this.closingMessage = closingMessage;
		this.max = max;

	}

	async onOpen() {
		new Notice(this.label);

		let {contentEl} = this;
		
		contentEl.createEl("form", {}, (form) => {

			let titleDiv = form.createDiv();
			titleDiv.createEl("h2", { text: this.title });
			titleDiv.createEl("hr");
			
			this.bar = titleDiv.createEl("progress", { attr: {value: 1, max: ""+this.max, width: "100%"} });

		});
	}

    update() {
        let intvalue = parseInt(this.bar.getAttribute("value"));
		intvalue += 1;
		this.bar.setAttribute("value", intvalue.toString());
		if (intvalue >= this.max) {
			this.close();
		}
    }

	onClose() {
		let {contentEl} = this;
		contentEl.empty();
		if (this.closingMessage.length > 0) {
			new Alert(this.plugin, "Done!", this.closingMessage).open();
		}	
	}


}

