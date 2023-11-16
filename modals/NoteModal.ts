import { App, ButtonComponent, Editor, ItemView, MarkdownFileInfo, Menu, Modal, Notice, Setting, TFile, TextAreaComponent, TextComponent, TextFileView, ToggleComponent, WorkspaceLeaf } from "obsidian";

export class NoteModal extends Modal {
	note: string;
	onSubmit: (note: string) => void;
	
	constructor(app: App, 
                note: string,
		        onSubmit: (note: string) => void) {
		super(app);

		this.note = note;
		this.onSubmit = onSubmit;
	}

	onOpen() {
		const {contentEl} = this;

		contentEl.createEl("h2", { text: 'Type your note:' });

		let messageDiv = contentEl.createDiv();
		messageDiv.style.marginTop = "10px";
		messageDiv.style.padding = "10px";
		messageDiv.style.border = "1px solid #ccc";
		let tarea = new TextAreaComponent(messageDiv)
					.setValue(this.note)
					.onChange( (value) => {
						this.note = value;
					})
		//	})
		tarea.inputEl.style.height = "200px";
		tarea.inputEl.style.width = "100%";

		let buttonContainer2 = contentEl.createDiv();
		
		new Setting(buttonContainer2)
      		.addButton((btn) =>
        		btn
		//new ButtonComponent(buttonContainer)
          		.setButtonText("OK")
          		.setCta()
          		.onClick(() => {
            		this.close();
            		this.onSubmit(this.note);
          }));
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}

	
}

