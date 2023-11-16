import { App, Modal, Notice, Plugin, Setting } from 'obsidian';

import { Reminder } from 'data/Reminder';

export class ReminderPopup extends Modal {
	plugin: Plugin;
	title: string;
	reminder: Reminder;
	dismissCallback: (reminder: Reminder) => void;
  
	constructor(plugin: Plugin, reminder: Reminder, dismiss: (reminder: Reminder) => void) {
		super(plugin.app);

		this.plugin = plugin;
		this.reminder = reminder;
        this.dismissCallback = dismiss;
	}

	async onOpen() {
		let {contentEl} = this;
		
		contentEl.createEl("form", {}, (form) => {

			let titleDiv = form.createDiv();
			titleDiv.createEl("h2", { text: "Reminder" });
			titleDiv.createEl("hr");
			
			titleDiv.createEl("h3", { text: this.reminder.text});

			form.createDiv("alert-button-container", container => {
				container
					.createEl("button", { attr: { type: "button" }, text: "Dismiss" })
					.addEventListener("click", () => {
						this.close();
                        this.dismissCallback(this.reminder);
					});
                container
					.createEl("button", { attr: { type: "button", margin: "10px" }, text: "Close" })
					.addEventListener("click", () => {
						this.close();
					});

			});

		});
	}

	onClose() {
		let {contentEl} = this;
		contentEl.empty();
	}


}

