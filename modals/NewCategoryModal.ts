import { App, DropdownComponent, Modal, Setting, TFile, TextComponent, TextFileView, WorkspaceLeaf } from "obsidian";

import { Category } from "data/Category";
import { GradeSet } from "data/GradeSet";
import GradeboxPlugin from "main";
import { Score } from "data/Score";

export class NewCategoryModal extends Modal {

    callbackOnClose;
	category: Category;
	gradeSet: GradeSet;
    name: string;
    weight: number
    scoringMethod: number;
    dropLowest: number;
	dropHighest: number;
	percentOfScores: number;

	constructor(app: App, callbackOnClose: (category: Category) => void) {
		super(app);
        this.callbackOnClose = callbackOnClose;
		this.category = null;
        this.weight = 1.0;
        this.scoringMethod = Category.ScoringMethod.INDIVIDUAL_SCORE_PERCENTAGE;
        this.dropLowest = 0;
        this.dropHighest = 0;
        this.percentOfScores = 1;
	}

    onOpen() {
		let {contentEl} = this;
		
		contentEl.createEl("h2", { text: 'New Category' });

		new Setting(contentEl)
		.setName("Name")
		.addText((name) =>
		  name
			  .setValue("")
			  .onChange((value) => {	
				  this.name = value;
			  }
    	));

        new Setting(contentEl)
        .setName("Weight of category")
        .addText((text) =>
            text
                .setValue(""+this.weight)
                .onChange((value) => {
                    this.weight = value as number;
                }
        ));

        new Setting(contentEl)
        .setName("Drop # of lowest scores")
        .addText((text) =>
            text
                .setValue(""+this.dropLowest)
                .onChange((value) => {
                    this.dropLowest = value as number;
                }
        ));

        new Setting(contentEl)
        .setName("DropHighest")
        .addText((text) =>
            text
                .setValue(""+this.dropHighest)
                .onChange((value) => {
                    this.dropHighest = value as number;
                }
        ));

        new Setting(contentEl)
        .setName("%age of scores used")
        .addText((text) =>
            text
                .setValue(""+this.percentOfScores)
                .onChange((value) => {
                    this.percentOfScores = value as number;
                }
        ));

        new Setting(contentEl)
		.addButton((btn) =>
		  btn
			.setButtonText("OK")
			.setCta()
			.onClick(() => {
			  	this.close();
                let cat = new Category(null);
                cat.name = this.name;
                cat.weight = this.weight;   
                cat.scoringMethod = this.scoringMethod;
                cat.dropLowest = this.dropLowest;
                cat.dropHighest = this.dropHighest;
                cat.percentOfScores = this.percentOfScores;
                this.callbackOnClose(cat);                
			}
		));

    }
}