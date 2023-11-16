// Stolen from https://github.com/helloitsian/custom-modals-obsidian/blob/main/src/modal/CustomModal.ts

import { App, Modal, Notice, Plugin, Setting } from 'obsidian';

export class Dialog extends Modal {
	plugin: Plugin;
	title: string;
	content: string;
	okText: string;
	cancelText: string;
	continueCallback: (str: string) => void;

    value: string;
  
	constructor(
		plugin: Plugin,
		title: string,
		content: string,
		okText: string,
        cancelText: string,
		callback: (str: string) => void,
	) {
		super(plugin.app);

		this.plugin = plugin;
		this.title = title;
		this.content = content;
		this.okText = okText;
		this.cancelText = cancelText;
		this.continueCallback = callback;
	}

	async onOpen() {
		let {contentEl} = this;
		
		contentEl.createEl("h2", { text: this.title });

		new Setting(contentEl)
			.setName(this.content)
			.addText(text => 
                text
				.setValue("")
				.onChange( (value) => {
					this.value = value;
				}));

		
        new Setting(contentEl)
      		.addButton((btn) =>
        		btn
          		.setButtonText(this.cancelText)
          		.setCta()
          		.onClick(() => {
            		this.close();
          }));

          new Setting(contentEl)
          .addButton((btn) =>
            btn
              .setButtonText(this.okText)
              .setCta()
              .onClick(() => {
                this.close();
                this.continueCallback(this.value);
      }));


	}

	onClose() {
		let {contentEl} = this;
		contentEl.empty();
	}


}

