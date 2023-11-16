import { App, DropdownComponent, Modal, Setting, TFile, TextFileView, ToggleComponent, WorkspaceLeaf } from "obsidian";

import { Category } from "data/Category";
import { GradeSet } from "data/GradeSet";
import { Score } from "data/Score";
import { Student } from "data/Student";

export class AddAbsenceModal extends Modal {

    callbackOnClose;
    gradeSet: GradeSet;
    absences: Date[];
    fields: ToggleComponent[];
    present: ToggleComponent;

    constructor(app: App, gradeSet: GradeSet, callbackOnClose: (absences: Date[]) => void) {
		super(app);
		this.gradeSet = gradeSet;
        this.callbackOnClose = callbackOnClose;

        this.absences = [];
        this.fields = [];
	}

	onOpen() {
		let {contentEl} = this;
		
		contentEl.createEl("h2", { text: 'New Absence' });
        let presentSetting = new Setting(contentEl)
            .setName("Count present")
            .addToggle( (toggle) => {
              toggle
                .setValue(false)
                .onChange( (value) => {
                    this.fields.forEach( (toggle) => {
                        toggle.setValue(!toggle.getValue());
                    });
                });
                this.present = toggle;
        });
        presentSetting.nameEl.style.fontWeight = "bold";
        presentSetting.nameEl.style.fontStyle = "italic";

        this.gradeSet.students.forEach( (stud: Student) => {
            let docfragment = (stud.data.get("image") !== undefined) 
                                  ? "<img src="+stud.data.get("image")+" width=40> "+stud.data.get("name")
                                  : stud.data.get("name");
			let setting = new Setting(contentEl)
			.setName("NAME")
			.addToggle( (toggle) => {
			  	toggle
			  		.setValue(false)
					.onChange( (value) => {

                    });
				this.fields.push(toggle);
			}
			);
            setting.nameEl.innerHTML = docfragment;
        });
    
        new Setting(contentEl)
        .addButton((btn) =>
            btn
            .setButtonText("OK")
            .setCta()
            .onClick(() => {
                const now = new Date();
                this.fields.forEach( (toggle) => {
                    if (this.present.getValue()) {
                        if (toggle.getValue()) 
                            this.absences.push(undefined);
                        else
                            this.absences.push(now);
                    } else {
                        if (toggle.getValue()) 
                            this.absences.push(now);
                        else
                            this.absences.push(undefined);
                    }
                });
                this.callbackOnClose(this.absences);
                this.close();
            }
        ));

    }

}