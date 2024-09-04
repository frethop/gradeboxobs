import { ButtonComponent, TFile, TextComponent } from "obsidian"

import { Category } from "./Category";
import { Counter } from "./Counter";
import { GradeSet } from "./GradeSet";
import { Score } from "./Score";
import Utilities from "../utilities/Utilities";

export class Student {

    name: string;
    id: string;
    emailaddress: string;
    nickname: string;
    mobilePhoneNumber: string;
    notes: string;
	grading_scheme: number;
    flags: number;
    scores: Map<string, number>;
	absences: Date[];
    counters: Counter[];
	image: string;
    
    dataModified: boolean;
    imageModified: boolean;
    notesModified: boolean;

    data: Map<string, string>;

    studentDiv: HTMLElement;
    studentImage: HTMLImageElement;

    sourceFile: TFile;
    noteData: string;
    displayedFinalScore: number;

    scrolltextIcon: string = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scroll-text"><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M15 8h-5"/><path d="M15 12h-5"/></svg>';

    constructor(obj: any) {
        this.data = new Map<string, string>();
        if (obj != null) {
            let oobj = obj as Object;
            Object.keys(oobj).forEach( (key: string) => {
                this.data.set(key, obj[key]);
            })
        }

        this.data.set("dataModified", "false");
        this.data.set("imageModified", "false");
        this.data.set("notesModified", "false");

        this.scores = new Map<string, number>();
        if (obj != null && obj.scores !== undefined) {
            let arr = Array.from(obj.scores);
            arr.forEach( (pair: any) =>{
                this.scores.set(pair.name, pair.value);
            })
        }

        this.noteData = "";
        this.absences = [];
        this.counters = [];
        this.notes = "";
        this.sourceFile = undefined;
    }

    configureFromData(data: string) {
        var scores: any[];
        var tag: string;
        var definition: string;

        this.noteData = data;

        let lines = data.split("\n");

        scores = [];
        this.absences = [];
        this.counters = [];
        this.notes = "";

        lines.forEach( (line: string) => {
            if (line.charAt(0) === '#' && line.charAt(1) !== ' ') {
                let tag = line.substring(0, line.indexOf(" "));
                let definition = line.substring(line.indexOf(" "));
                definition = definition.trim();

                console.log("CONFIGURING STUDENT with "+tag+' as '+definition);

                if (tag === "#note") {
                    console.log("ADDING NOTE to "+this.notes);
                    this.notes += definition + "\n";
                    console.log(this.notes);
                } else if (tag === "#score") {
                    let props = definition.split("|");
                    this.set(props[0].trim(), props[1].trim(), parseFloat(props[2]));
                } else if (tag === "#counter") {
                    let props = definition.split("|");
                    let counter = new Counter(props[0].trim()); 
                    counter.value = parseInt(props[1]);
                    this.counters.push(counter);                   
                } else if (tag === "#absence") {
                    var date = new Date(definition);
                    console.log(date)
                    if (this.absences == undefined || this.absences == null) this.absences  = [];
                    this.absences.push(date);
                } else {
                    let vname = tag.substring(1);
                    this.data.set(vname, definition); 
                }

            }
        })
    
    }

    setSourceFile(file: TFile) {
        this.sourceFile = file;
    }

    display(div: HTMLDivElement, style: string, finalScore: number, finalWithWeights: number = -1) {
        this.displayedFinalScore = finalScore;
        this.studentDiv = div.createEl("div");//, {cls: "student-style"});

        let table = this.studentDiv.createEl("table", { cls: "student-table-style" });
        let tbody = table.createEl("tbody");
        let row = tbody.createEl("tr");
        
        this.studentImage = null;
        let cell = row.createEl("td", { cls: style });
        let hei: HTMLImageElement = cell.createEl("img"); 
        if (this.data.get("image") == undefined) {
            hei.src = "https://rizzo.hope.edu/~jipping/noimage.png";
            this.data.set("image", "https://rizzo.hope.edu/~jipping/noimage.png");
        } else {
            hei.src = this.data.get("image");
        }
        hei.onerror = function() { 
            hei.src = "https://rizzo.hope.edu/~jipping/noimage.png"; 
            this.data.set("image", "https://rizzo.hope.edu/~jipping/noimage.png");
            this.data.set("imageModified", "true");
            this.data.set("dataModified", "true");
        }
        hei.height = 100;
        this.studentImage = hei;

        if (this.notes !== undefined && this.notes !== null && this.notes.length > 0) {
            cell.createEl("br");
            cell.innerHTML += this.scrolltextIcon;
        }

        let fscore = Utilities.fixToPlaces(finalScore);

        cell = row.createEl("td", { cls: style });
        cell.createEl("h3", {text: this.data.get("name"), cls: style});
        if (finalWithWeights == -1) 
            cell.createEl("h4", {text: ""+fscore, cls: style});
        else 
            cell.createEl("h4", {text: ""+fscore+" ("+Utilities.fixToPlaces(finalWithWeights)+"%)", cls: style});
        //console.log(this.counters);
        if (this.counters !== undefined && this.counters !== null && this.counters.length > 0) {
            let counterP = cell.createEl("p");
            this.counters.forEach( (counter: Counter) => {
                counterP.createEl("span", {text: counter.name + ": " + counter.value});
                counterP.createEl("br");
            })
        }
        if (this.absences !== undefined && this.absences !== null && this.absences.length > 0) {
            let abs = cell.createEl("p", {text: ""+this.absences.length+" absenses"});
            abs.style.color = "red";
        }
        
    }

    displayRow(row: HTMLDivElement, gradeSet: GradeSet) {
        this.studentDiv = row;
        
        let namebox = row.createEl("td", { cls: "student-list-cell-style", attr: { align: "left" } });
        namebox.createEl("h3", {text: this.data.get("name")});
        let idbox = row.createEl("td", { cls: "student-list-cell-style" });
        idbox.createEl("h3", {text: this.data.get("id")});
        let finalbox = row.createEl("td", { cls: "student-list-finalscore-style" });
        finalbox.createEl("h3", {text: ""+Utilities.fixToPlaces(this.displayedFinalScore)});
        
        gradeSet.categories.forEach( (cat: Category) => { 
            if (cat.scoreSet !== undefined) {
                cat.scoreSet.forEach( (score: Score) => {
                    let studentScore = this.get(cat, score.name);
                    if (typeof studentScore == 'undefined') studentScore = 0;
                    let cell = row.createEl("td", { cls: "student-list-cell-style" });
                    cell.createEl("h3", {text: ""+studentScore});
                });
            }
        });
    }

    getDiv() {
        return this.studentDiv;
    }

    getHEI() {
        return this.studentImage;
    }   

    get(cat: any, name: string): number {
        var key: string;

        if (typeof cat == 'string') {
            key = cat + "|" + name;
        } else {
            key = (cat as Category).name + "|" + name;
        }
        //console.log("GETTINGSCORE "+key);
        //console.log(this.scores.keys());
        return this.scores.get(key);
    }

    set(cat: any, sname: string, value: number) {
        var key: string;

        if (typeof cat === 'string') {
            key = cat + "|" + sname;
        } else {
            key = (cat as Category).name + "|" + sname;
        }
        if (this.scores.get(key) === undefined) {
            this.noteData += "\n#score "+key+"|"+value;
        }
        console.log("SETTING "+key+" to "+value)
        this.scores.set(key, value);
    }

    renameCategory(oldName: string, newName: string) {
        console.log("RENAMING "+oldName+" to "+newName);
        let newScores = new Map<string, number>();
        this.scores.forEach( (value: number, key: string) => {
            let parts = key.split("|");
            if (parts[0] === oldName) {
                newScores.set(newName+"|"+parts[1], value);
                console.log("REPLACING "+key+" with "+newName+"|"+parts[1]);
                this.dataModified = true;
            } else {
                newScores.set(key, value);
            }
        })
        this.scores = newScores;
    }

    renameScore(oldName: string, newName: string) {
        console.log("RENAMING "+oldName+" to "+newName);
        //let newScores = new Map<string, number>();
        this.scores.forEach( (value: number, key: string) => {
            if (key === oldName) {
                this.scores.set(newName, value);
                this.scores.delete(oldName);
                console.log("REPLACING "+key+" with "+newName);
                this.dataModified = true;
            }
        })
    }

    setFromPair({ name, value}: {name: string, value: number}, addToData=true) {
        if (this.scores.get(name) === undefined && addToData) {
            this.noteData += "\n#score "+name+"|"+value;
        }
        this.scores.set(name, value);
    }

    addAbsence(date: Date, addToData=true) {
        if (this.absences == undefined || this.absences == null) this.absences  = [];
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        
        if (addToData) {
            this.noteData += "\n#absence "+mm+"/"+dd+"/"+yyyy;
            console.log(this.noteData);
        }
        this.absences.push(date);
    }

    addCounter(counter: Counter, addToData=true) {
        if (addToData) {
            this.noteData += "\n#counter "+counter.name+"|"+counter.value;
            console.log(this.noteData);
        }
        this.counters.push(counter);
    }

    deleteCounter(counter: Counter) {
        for (let i=0; i < this.counters.length; i++) {
            if (this.counters[i].name === counter.name) {
                this.counters.splice(i, 1);
            }
        }
    }

    findCounter(name: string): boolean {
        var found: boolean = false;
        this.counters.forEach( (counter: Counter) => {
            if (counter.name === name) found = true;
        })
        return found;
    }

    getCounter(name: string): Counter {
        let c : Counter = null;
        this.counters.forEach( (counter: Counter) => {
            console.log("COMPARING '"+counter.name+"' to '"+name+"'")
            if (counter.name.localeCompare(name) === 0) c = counter;
        })
        return c;
    }

    updateCounter(counter: Counter) {
        this.counters.forEach( (c: Counter) => {
            if (c.name === counter.name) {
                c.value = counter.value;
            }
        })
    }

    updateCounterName(name: string, counter: Counter) {
        this.counters.forEach( (c: Counter) => {
            if (c.name === name) {
                c.name = counter.name;
            }
        })
    }

    setNotes(notes: string) {
        this.notes = notes;
    }

    imageExists(image_url: string) {

        var http = new XMLHttpRequest();
    
        try {
            http.open('HEAD', image_url, false);
            http.send();
            console.log(http);
            return http.status != 404;
        } catch (e) {
            console.log("Error in imageExists: "+e);
            return false;
        }

    }

    generateMarkdown(gradeSet: GradeSet) {
        var studentNote: string = "";
    
        // Title 
        studentNote += "----\n# "+this.data.get("name")+'\n';

        // Image
        let im = this.data.get("image");
        if (this.data.get("image") == undefined) {
            this.data.set("image", "https://rizzo.hope.edu/~jipping/noimage.png");
            im = "https://rizzo.hope.edu/~jipping/noimage.png";
        } 
        studentNote += "<img src=\""+im+"\" width=75 >\n\n";
  
        studentNote += " - ID: "+this.data.get("id")+'\n';
        studentNote += " - Email: "+this.data.get("emailaddress")+"\n";
        studentNote += "\n----\n"; 
    
        if (this.absences.length > 0) {
            studentNote += "### Absences: \n";
            for (let i=0; i < this.absences.length; i++) {
               studentNote += " - " + this.absences[i].toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) + "\n";
            }
            studentNote += "\n----\n"
          }
      
        if (this.counters.length > 0) {
            studentNote += "### Counters: \n";
            for (let i=0; i < this.counters.length; i++) {
                studentNote += " - " + this.counters[i].name + ": " + this.counters[i].value + "\n";
            }
            studentNote += "\n----\n"
        }

        if (this.notes.length > 0) {
            studentNote += "### Notes: \n";
            studentNote += this.notes;
            studentNote += "\n----\n"
        }
      
        if (gradeSet.categories != null) {
           console.log("StudentView Category listing");
           studentNote += "### Scores: \n";
           gradeSet.categories.forEach((cat: Category) => {
            studentNote += "> [!note] "+ cat.name + "\n";
            if (cat.scoreSet !== undefined && cat.scoreSet.length > 0) {
              cat.scoreSet.forEach( (score: Score) => {
                studentNote += "> - **"+score.name+"**: ";
                 let studentScore = this.get(cat, score.name);
                 console.log("STUDENTSCORE: "+studentScore);
                 if (typeof studentScore == 'undefined') studentScore = 0;
                 studentNote += "" + studentScore + " / " + score.value + "\n";
             })
           } else {
                studentNote += "> NO SCORES\n";
           }
           studentNote += "\n";
          });
        } 
    
        let final = gradeSet.finalScore(this);
        studentNote += "## TOTAL = "+Utilities.fixToPlaces(final); 
        if (! gradeSet.allCategoriesHaveScores()) {
            studentNote += " (" + Utilities.fixToPlaces(final/gradeSet.weightTotal()) + "%)";
        }
    
        return studentNote;
    
      }

      generateFirstXML() : string {
        var xml = '<student name="'+this.data.get("name")+'" id="'+this.data.get("id")+'" email="'+this.data.get("emailaddress")+'">\n';

        if (this.absences !== undefined && this.absences !== null && this.absences.length > 0) {
            this.absences.forEach( (date: Date) => {
                xml += '<absense date="'+date.toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})+'"/>\n';
            })
        }
        return xml;
      }

      generateScoreXML(cat: Category) : string {
        var xml = "";

        if (this.scores !== undefined && this.scores !== null && this.scores.size > 0) {
            cat.scoreSet.forEach( (score: Score) => {
                let studentScore = this.get(cat, score.name);
                if (studentScore !== undefined) {
                    xml += '<score name="'+score.name+'" points="'+studentScore+'"></score>\n';
                }
            });
        }
        return xml;
      }
    
      generateEditHTML(container: Element, gradeSet: GradeSet) {
  
        //container.empty();
  
        let infoContainer = container.createDiv();
        infoContainer.createEl("hr");
        
        // Student info
        infoContainer.createEl("h2", { text: "Student Information" });
        let infoTable = infoContainer.createEl("table");  
        let infoRow = infoTable.createEl("tr");
        let infoCell = infoRow.createEl("td", { text: "Name:"});
        infoCell = infoRow.createEl("td");
        let editName = new TextComponent(infoCell);
        editName.setValue(this.data.get("name"));
        editName.onChange( (value) => {
            this.data.set("name", value);
        });
        infoRow = infoTable.createEl("tr");
        infoCell = infoRow.createEl("td", { text: "ID:"});
        infoCell = infoRow.createEl("td");
        let editID = new TextComponent(infoCell);
        editID.setValue(this.data.get("id"));
        editID.onChange( (value) => {
            this.data.set("id", value);
        });
        infoRow = infoTable.createEl("tr");
        infoCell = infoRow.createEl("td", { text: "Email Address:"});
        infoCell = infoRow.createEl("td");
        let editAddr = new TextComponent(infoCell);
        editAddr.setValue(this.data.get("emailaddress"));
        editAddr.onChange( (value) => {
            this.data.set("emailaddress", value);
        });
        infoRow = infoTable.createEl("tr");
        infoCell = infoRow.createEl("td", { text: "Image:"});
        infoCell = infoRow.createEl("td");
        let imageAddr = new TextComponent(infoCell);
        imageAddr.inputEl.setAttribute("style", "width: 300%;");
        imageAddr.setValue(this.data.get("image"));
        imageAddr.onChange( (value) => {
            this.data.set("image", value);
        });

        infoContainer.createEl("hr");

        // Absences
        if (this.absences.length > 0) {
          let abContainer = container.createDiv();
          abContainer.createEl("h2", { text: "Absences" });
          let abTable = abContainer.createEl("table");  
          this.absences.forEach( (abs) => {
            let abRow = abTable.createEl("tr");
            let abCell = abRow.createEl("td");
            let editAddr = new TextComponent(abCell);
            editAddr.setValue(abs.toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}));
            editAddr.onChange( (value) => {
                let orig = abs;
                abs = new Date(value);
                this.absences[this.absences.indexOf(orig)] = abs;
            });
            abCell = abRow.createEl("td");
            let delButton = new ButtonComponent(abCell);
            delButton.setButtonText("Delete");
            delButton.onClick( () => {
                this.absences.splice(this.absences.indexOf(abs), 1);
                abRow.remove();
            });
          });
          abContainer.createEl("hr");
        }


        // Counters
        if (this.counters.length > 0) {
          let coContainer = container.createDiv();
          coContainer.createEl("h2", { text: "Counters" });
          let coTable = coContainer.createEl("table");  
          this.counters.forEach( (cnt) => {
            let coRow = coTable.createEl("tr");
            let coCell = coRow.createEl("td", { text: cnt.name});
            coCell = coRow.createEl("td");
            let editCounter = new TextComponent(coCell);
            editCounter.setValue(""+cnt.value);
            editCounter.onChange( (value) => {
              cnt.value = Number(value);
            });
          });
          coContainer.createEl("hr");
        }

        // Scores
        let scoreContainer = container.createDiv();
        if (this.scores.size > 0) {
          scoreContainer.createEl("h2", { text: "Scores" });
    
          gradeSet.categories.forEach( (cat: Category) => {
            scoreContainer.createEl("h3", { text: cat.name });

            if (cat.scoreSet != undefined) {
                let scTable = scoreContainer.createEl("table");    
                cat.scoreSet.forEach( (sc: Score) => {  
                    let scRow = scTable.createEl("tr");  
                    scRow.createEl("td", { attr: {width: "25px" }});
                    let scCell = scRow.createEl("td", { text: sc.name });  
                    scCell = scRow.createEl("td");
                    let editScoreValue = new TextComponent(scCell);
                    let score = this.get(cat, sc.name);
                    editScoreValue.setValue(""+score);
                    editScoreValue.onChange( (value) => {
                        this.set(cat, sc.name, Number(value));
                    });
                });
            } else {
                scoreContainer.createEl("p", { text: "No Scores"});
            }
        });
    }
}
        

}