// Stolen from https://github.com/helloitsian/custom-modals-obsidian/blob/main/src/modal/CustomModal.ts

import { App, Modal, Notice, Plugin, Setting } from 'obsidian';

export class Progress extends Modal {
	plugin: Plugin;
	title: string;
	label: string;
	bar: HTMLProgressElement;
	increment: string;
  
	constructor(
		plugin: Plugin,
		title: string,
		label: string,
		increment: string
	) {
		super(plugin.app);

		this.plugin = plugin;
		this.title = title;
		this.label = label;
		this.increment = increment;
	}

	async onOpen() {
		new Notice(this.label);

		let {contentEl} = this;
		
		contentEl.createEl("form", {}, (form) => {

			let titleDiv = form.createDiv();
			titleDiv.createEl("h2", { text: this.title });
			titleDiv.createEl("hr");
			
			this.bar = titleDiv.createEl("progress", { attr: {value: this.increment, max: "100", width: "100%"} });

		});
	}

    update() {
        let intvalue = parseInt(this.bar.getAttribute("value"));
		intvalue += parseInt(this.increment);
		this.bar.setAttribute("value", intvalue.toString());
    }

	onClose() {
		let {contentEl} = this;
		contentEl.empty();
	}


}

