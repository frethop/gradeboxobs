import { App, ButtonComponent, Editor, ItemView, MarkdownFileInfo, Menu, Modal, Notice, Setting, TFile, TextAreaComponent, TextComponent, TextFileView, ToggleComponent, WorkspaceLeaf } from "obsidian";

export class EmailerModal extends Modal {
	address: string;
	subject: string;
	from: string;
	attachScores: boolean;
	message: string;
	onSubmit: (message: string, from: string, address: string, subject: string, attachScores: boolean, filesDir: FileList) => void;
	settings: GradeBoxPluginSettings;
	
	constructor(app: App, 
				settings: GradeBoxPluginSettings,
		        onSubmit: (message: string, from: string, address: string, subject: string, attachScores: boolean, filesDir: FileList) => void) {
		super(app);

		this.settings = settings;
		this.onSubmit = onSubmit;
		this.attachScores = false;
	}

	onOpen() {
		const {contentEl} = this;

		contentEl.createEl("h2", { text: 'Enter email message info' });

		this.address = (this.settings.defaultto !== undefined)?this.settings.defaultto:"";
		this.from = (this.settings.from !== undefined)?this.settings.from:"";
		this.subject = (this.settings.subject)?this.settings.subject:"";

		new Setting(contentEl)
      		.setName("Sent From:")
      		.addText((text) =>
        		text
					.setValue(this.from)
				   	.onChange((value) => {
          				this.from = value
					}
		));

		new Setting(contentEl)
      		.setName("Destination:")
      		.addText((text) =>
        		text
					.setValue(this.address)
				   	.onChange((value) => {
          				this.address = value
					}
		));

		new Setting(contentEl)
      		.setName("Subject:")
      		.addText((text) =>
        		text
					.setValue(this.subject)
					.onChange((value) => {
          				this.subject = value
			        }
		));

		let includesContainer1 = contentEl.createDiv();
		includesContainer1.style.marginTop = "10px";
		includesContainer1.style.alignItems = "center";
		includesContainer1.style.display = "grid";
		includesContainer1.style.gridTemplateColumns = "calc(25% - 10px) 30px";
		includesContainer1.createEl("p", { text: 'Attach scores?' });
		new ToggleComponent(includesContainer1)
					.onChange( (value) => {
						this.attachScores = value;
					});
		includesContainer1.createEl("p", { text: 'Attach Files?' });
		new ToggleComponent(includesContainer1)
					.onChange( (value) => {
						//this.attachScores = value;
						attachdiv.style.display = (value)?"block":"none";
					})
		let attachdiv = contentEl.createDiv();
		attachdiv.style.display = "grid";
		attachdiv.style.gridTemplateColumns = "calc(33% - 10px) calc(50% - 10px)"
		attachdiv.createEl("p", { text: 'Attachments directory: ' });
		const inputDataFile = attachdiv.createEl("input", {
					attr: {
					  type: "file",
					  multiple: false,
					  //accept: ".json,.csv,.tsv",
					  webkitdirectory: true,
					}
				});
		attachdiv.style.display = "none";

		let messageDiv = contentEl.createDiv();
		messageDiv.style.marginTop = "10px";
		messageDiv.style.padding = "10px";
		messageDiv.style.border = "1px solid #ccc";
		messageDiv.createEl("h4", { text: 'Type your message:' });
		let tarea = new TextAreaComponent(messageDiv)
		// let tarea = new Setting(messageDiv)
		// 	.setName("Type your message")
		// 	.addTextArea( (area) => {
		// 		area
					.onChange( (value) => {
						this.message = value;
					})
		//	})
		tarea.inputEl.style.height = "200px";
		tarea.inputEl.style.width = "100%";
		//nameEl.innerHTML = "<font color=red>Type your message:</font>";

		let buttonContainer2 = contentEl.createDiv();
		
		new Setting(buttonContainer2)
      		.addButton((btn) =>
        		btn
		//new ButtonComponent(buttonContainer)
          		.setButtonText("OK")
          		.setCta()
          		.onClick(() => {
					console.log(inputDataFile.files);
            		this.close();
            		this.onSubmit(this.message, this.from, this.address, this.subject, this.attachScores, inputDataFile.files);
          }));
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}

	
}

