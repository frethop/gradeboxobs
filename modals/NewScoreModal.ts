import { App, DropdownComponent, KeymapEventHandler, Modal, Setting, TFile, TextComponent, TextFileView, WorkspaceLeaf } from "obsidian";

import { GradeSet } from "data/GradeSet";
import { Category } from "data/Category";
import { Student } from "data/Student";
import { Score } from "data/Score";
import GradeboxPlugin from "main";

export class NewScoreModal extends Modal {

    callbackOnClose;
	name: string;
	possible: number;
	catname: string;
	scores: Map<string, number>;
	fields: TextComponent[];	
	possibleField: Setting;
	gradeSet: GradeSet;
	ec: boolean;
	enterhandler: KeymapEventHandler;
	field: number;

	constructor(app: App, gradeSet: GradeSet, callbackOnClose: () => void) {
		super(app);
		this.gradeSet = gradeSet;
        this.callbackOnClose = callbackOnClose;
		this.scores = new Map<string, number>;
		this.name = "";
		this.possible = 0;
		this.catname = (gradeSet.categories == undefined || gradeSet.categories == null || gradeSet.categories.length == 0)
							?"no categories"
							:gradeSet.categories[0].name;
	}

	onOpen() {
		let {contentEl} = this;
		
		contentEl.createEl("h2", { text: 'New Score' });

		this.field = 0;
		this.enterhandler = this.scope.register([], "Enter", () => {
			this.fields[this.field].inputEl.focus();
			this.fields[this.field].inputEl.select();
			this.field++;
		})

		new Setting(contentEl)
		.setName("Name")
		.addText((text) =>
		  text
			  .setValue("")
			  .onChange((value) => {	
				  this.name = value;
			  }
    	));

		this.possibleField = new Setting(contentEl)
			.setName("Total Possible")
			.addText( (text) => 
			  	text
			  		.setValue("")
					.onChange( (value) => {
						this.possible = value as unknown as number;
					})
			);

		let catDropdown = new Setting(contentEl) 
		    .setName("Category")
			.addDropdown(drop => drop
				.onChange(async (value) => {
					this.catname = value;
				})
			);
		this.gradeSet.categories.forEach( (cat: Category) => {
			(catDropdown.components[0] as DropdownComponent).addOption(cat.name, cat.name);			
			(catDropdown.components[0] as DropdownComponent).setValue(cat.name);
		});
		(catDropdown.components[0] as DropdownComponent).setValue(this.gradeSet.categories[0].name);

		// Utility buttons
		this.ec = false;
		var ect = new Setting(contentEl)
		   .addToggle((cb) => 
		       cb
			   .onChange((value) => {
				   this.ec = value;
			   })
		   );	
		   ect.nameEl.innerHTML = "Extra Credit?";  	
	    new Setting(contentEl)
		.addButton((btn) =>
		  btn
			.setButtonText("Fill Down")
			.setCta()
			.onClick(() => {
				this.fields.forEach( (field: TextComponent) => {
					field.setValue(""+this.possible);
				})
				console.log(Object.keys(this.scores));
				this.scores.forEach( (value, key) => {
					this.scores.set(key, this.possible);
				})
				console.log(this.scores);
			}
		));

		

		// Students
		this.fields = [];
		this.gradeSet.students.forEach( (stud: Student) => {
			this.scores.set(stud.data.get("name"), 0);
			new Setting(contentEl)
			.setName(stud.data.get("name"))
			.addText( (text) => {
			  	text
			  		.setValue("0")
					.onChange( (value) => {
						let num = value as unknown as number;
						this.scores.set(stud.data.get("name"), num);
						console.log("SETTING "+stud.data.get("name")+" to "+num);
					});
				this.fields.push(text);
			}
			)});

		new Setting(contentEl)
		.addButton((btn) =>
		  btn
			.setButtonText("OK")
			.setCta()
			.onClick(() => {
				console.log(this.scores)
				this.gradeSet.addScore(this.name, this.possible, this.ec, this.catname, this.scores);
			  	this.close();
				this.callbackOnClose();
			}
		));

	}

	onClose() {
		this.scope.unregister(this.enterhandler);
	}
}

