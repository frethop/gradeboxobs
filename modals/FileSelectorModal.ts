import { App, Modal, Notice, Setting } from "obsidian";

import { GradeSet } from "../data/GradeSet";
import  GradeboxView  from "../";

class FileSelectorModal extends Modal {
	
	callbackOnClose;
  
	title: string;
	description: string;
	button: string;
	caller: Object;
	handler: Function;
	gradeSet: GradeSet;
	view: GradeboxView;
  
  constructor(app: App, title: string, description: string, button: string, gs: GradeSet, callbackOnClose: (view: GradeboxView, gs: GradeSet, file: string) => void) {
	super(app);
  
		this.callbackOnClose = callbackOnClose;
		this.title = title;
		this.description = description;
		this.button = button;
		this.gradeSet = gs;
  }
  
  onOpen() {
	  const setting1 = new Setting(this.contentEl).setName(this.title).setDesc(this.description);
	  const inputDataFile = setting1.controlEl.createEl("input", {
		  attr: {
			type: "file",
			multiple: false,
			//accept: ".json,.csv,.tsv"
		  }
	  });
  
	  const setting5 = new Setting(this.contentEl).setName("Import").setDesc("Press to start the Import Process");
	  const input5 = setting5.controlEl.createEl("button");
	  input5.textContent = this.button;
  
	  input5.onclick = async () => {
		console.log(inputDataFile.files[0]);
		this.callbackOnClose(this.view, this.gradeSet, inputDataFile.files[0].path);
	  
		new Notice("Import Finished");
		this.close();
		//this.view.display();
	  }
	}
  
	onClose() {
	  let {contentEl} = this;
	  contentEl.empty();
	}
  
  }