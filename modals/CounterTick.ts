import { App, ButtonComponent, DropdownComponent, Modal, Setting, TFile, TextFileView, ToggleComponent, WorkspaceLeaf } from "obsidian";

import { Category } from "data/Category";
import { Counter } from "data/Counter";
import { GradeSet } from "data/GradeSet";
import { Score } from "data/Score";
import { Student } from "data/Student";

var plusicon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-circle"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>';

var minusicon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus-circle"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg>';

export class CounterTick extends Modal {

    callbackOnClose;
    gradeSet: GradeSet;
    student: Student;
    fields: ToggleComponent[];

    constructor(app: App, student:Student, callbackOnClose: (counter: Counter) => void) {
		super(app);
		this.student = student;
        this.callbackOnClose = callbackOnClose;

        this.fields = [];
	}

	onOpen() {
		let {contentEl} = this;
		
        contentEl.createEl("form", {}, (form) => {

        let titleDiv = form.createDiv();
        titleDiv.createEl("h2", { text: 'Tick a Counter' });
        titleDiv.createEl("hr");
        
        let counterContainer = form.createDiv();
        let counterTable = counterContainer.createEl("table", { cls: "counter-table" });
        this.student.counters.forEach( (counter: Counter) => {
            let counterRow = counterTable.createEl("tr");
            let counterCell = counterRow.createEl("td");
            let but = new ButtonComponent(counterCell)
                .setButtonText("-")
                .setIcon("minus-circle")
                .onClick( () => {
                    counter.decrement();
                    this.callbackOnClose(counter);
                    this.close();
                })
            if (counter.value == 0) {
                but.setDisabled(true);
            }
            counterCell = counterRow.createEl("td", { attr: { "text-align": "center" } });
            counterCell.appendText(counter.name);
            counterCell = counterRow.createEl("td");
            but = new ButtonComponent(counterRow).setButtonText("+").setIcon("plus-circle")
                .onClick( () => {
                    counter.increment();
                    this.callbackOnClose(counter);
                    this.close();
                })
            // form.createDiv("counter-button-container", container => {
			// 	container
			// 		.createEl("button", { attr: { type: "button" }, text: "Close" })
			// 		.addEventListener("click", () => {
			// 			this.close();
			// 		});
			// });
        })

        
        });
    
        // new Setting(contentEl)
        // .addButton((btn) =>
        //     btn
        //     .setButtonText("OK")
        //     .setCta()
        //     .onClick(() => {
                
        //         this.close();
        //     }
        // ));
	

    }

}