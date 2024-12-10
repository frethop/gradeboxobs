import { TFile, TFolder } from "obsidian"

import { Alert } from "utilities/alert"
import { Category } from "./Category"
import { Counter } from "./Counter"
import { CounterTick } from "modals/CounterTick"
import  GradeboxPlugin  from "../main"
import { Reminder } from "./Reminder"
import { Score } from "./Score"
import { Student } from "./Student"
import  Utilities  from "../utilities/Utilities"

//import { Reminder } from "./Reminder"

export class GradeSet {
    title: string;
    shortTitle: string;
    gradeSetData: any = null;
    plugin: GradeboxPlugin;
    modified: boolean;
    lastModified: Date;

    students: Student[];
    categories: Category[];
    tasks: String[];
    reminders: Reminder[];
    counters: Counter[];
    properties: Map<string, string>;

    sourceFolder: TFolder;
    sourceFile: TFile;

    longestName: number;

    sortMethod: any;

    constructor(plugin: GradeboxPlugin) {
        this.plugin = plugin;
        this.modified = false;
        this.categories = [];
        this.students = [];
        this.properties = new Map<string, string>();
        this.reminders = [];
        this.tasks = [];
        this.sourceFolder = undefined;
        this.counters = [];
        this.gradeSetData = "";
        this.longestName = 0;
        
        this.sortMethod = this.studentNamesAscending;

    }

    setsourceFolder(folder: TFolder) {
        this.sourceFolder = folder;
    }

    setSourceFile(file: TFile) {
        this.sourceFile = file;
    }

    async defineGradeSet(data: string, source: TFolder, file: TFile, redefine: boolean = false) {
        this.sourceFolder = source;
        this.sourceFile = file;
        let cat: Category = null;
        this.gradeSetData = data;

        if (redefine) {
            this.categories = [];
            this.properties = new Map<string, string>();
            this.reminders = [];
            this.tasks = [];
            this.counters = [];
            this.modified = true;
        }

        let lines = data.split("\n");

        lines.forEach( (line: string) => {
            if (line.charAt(0) === '#') {
                let tag = line.substring(0, line.indexOf(" "));
                let definition = line.substring(line.indexOf(" "));
                definition = definition.trim();

                // properties of the class
                console.log("DEFINING GS with "+tag+' as '+definition);
                // Score setup
                if (tag === "#category") {
                    let props = definition.split("|");
                    cat = new Category(null);
                    cat.name = props[0].trim();
                    cat.weight = 
                          (props.length > 1) ? parseFloat(props[1]) : 1;
                    cat.percentOfScores = 
                          (props.length > 2) ? parseFloat(props[2]) : 1;         
                    cat.scoringMethod = 
                          (props.length > 3) ? parseInt(props[3]) 
                                             : Category.ScoringMethod.INDIVIDUAL_SCORE_PERCENTAGE;
                    this.categories.push(cat);
                } else if (tag === "#score") {
                    let props = definition.split("|");
                    if (props.length == 3) {
                        let ec = props[2].trim() == "true"
                        let sc = new Score(props[0].trim(), parseFloat(props[1]), ec);
                        cat.addScore(sc);
                    } else if (props.length == 2) {
                        let sc = new Score(props[0].trim(), parseFloat(props[1]));
                        cat.addScore(sc);
                    } else {
                        cat = this.getCategory({ name: props[0].trim() });
                        console.log("Adding score to "+cat.name+" with value "+props[2])
                        if (cat != null) {
                            let sc = new Score(props[1].trim(), parseFloat(props[2]));
                            cat.addScore(sc);
                        }
                    }
                } else if (tag === "#counter") {
                    let props = definition.split("|");
                    let counter = new Counter(props[0].trim()); 
                    counter.value = parseInt(props[1]);
                    this.counters.push(counter);                   
                } else if (tag === "#lastmodified") {
                    this.lastModified = new Date(parseInt(definition));
                } else if (tag === "#reminder") {
                    let props = definition.split("|");
                    let date  = new Date(props[1]);
                    let reminder = new Reminder(props[0].trim(), date, parseInt(props[2]), parseInt(props[3]));
                    this.reminders.push(reminder);
                } else {
                    let vname = tag.substring(1);
                    this.properties.set(vname, definition);
                    console.log("Setting "+vname+" to "+this.properties.get(vname));
                }

            }
        })
        //if (cat !== null) this.categories.push(cat);
        console.log(this);
    }

    async defineStudent(data: string, source: TFile, redefine: boolean = false) {
        var sObj: Object = new Object();
        var scores: any[];
        var tag: string;
        var definition: string;
        var abs: Date[];
        var cnter: Counter;
        var cnters: Counter[];
        var notes: string;

        console.log("DEFINE START: " + data  );
        
        let lines = data.split("\n");

        scores = [];
        abs = [];
        cnters = [];
        notes = "";
        
        try {
            lines.forEach( (line: string) => {
                if (line.charAt(0) === '#' && line.charAt(1) !== ' ') {
                    let tag = line.substring(0, line.indexOf(" "));
                    let definition = line.substring(line.indexOf(" "));
                    definition = definition.trim();

                    //console.log("DEFINING STUDENT with "+tag+' as '+definition);

                    if (tag === "#note") {
                        notes += definition + "\n";
                    } else if (tag === "#score") {
                        let props = definition.split("|");
                        let sc = { "name": props[0].trim()+"|"+props[1].trim(), "value": parseFloat(props[2]) };
                        scores.push(sc);
                    } else if (tag === "#counter") {
                        let props = definition.split("|");
                        let counter = new Counter(props[0].trim()); 
                        counter.value = parseInt(props[1]);
                        cnters.push(counter);                   
                    } else if (tag === "#absence") {
                        var date = new Date(definition);
                        console.log(date)
                        abs.push(date);
                    } else {
                        let vname = tag.substring(1);
                        eval("sObj."+vname+' = "'+definition+'"');
                    }

                }
            });
        } catch (e) {
            return;
        }

        if (sObj.name !== undefined && sObj.name.length > this.longestName) {
            //console.log("Setting longest name to "+sObj.name.length+" for "+sObj.name);
    
            this.longestName = sObj.name.length;
        }
        let student: Student = null;
        if (redefine) {
            student = this.plugin.currentStudent;
        } else {
            student = new Student(sObj);
            // Check if this is real student data
            if (student.data.get("name") === undefined) {
                console.log("Not a student, skipping");
                return;
            }
        }
        student.noteData = data;
        student.setSourceFile(source);
        cnters.forEach( (cnter) => {
            student.addCounter(cnter, false);
        });
        abs.forEach( (date) => {
            student.addAbsence(date, false);
        })
        scores.forEach( (pair) => {
            student.setFromPair(pair, false);
        } )
        if (notes.length > 0) student.setNotes(notes);
        this.students.push(student);
        this.students.sort(this.sortMethod);
    }

    async writeGradeSet(gradeSetOnly: boolean = false) {
        // Write the class definition
        console.log("WRITING GRADESET CLASS");
        console.log(this.categories);
        this.plugin.app.vault.process(this.sourceFile, (data: string) => {
            let lines = data.split("\n");
            let newData: string = "";

            lines.forEach( (line: string) => {
                console.log(line);
                if (line.charAt(0) === '#' && line.charAt(1) !== ' ') {
                    let tag = line.substring(0, line.indexOf(" "));
                    let definition = line.substring(line.indexOf(" "));
                    definition = definition.trim();

                    if (tag === "#title") 
                        newData += tag + " " + this.properties.get("title")+'\n';
                    
                    else if (tag === "#shorttitle") 
                        newData += tag + " " + this.properties.get("shortTitle")+'\n';            

                }
            })

            // FIX THIS
            if (this.properties.get("webfile") !== undefined) {
                newData += "#webfile "+this.properties.get("webfile")+'\n';
            }
            newData += "#lastmodified " + (new Date().getTime())+'\n';

            // Counters
            this.counters.forEach( (counter: Counter) => {
                newData += "#counter "+counter.name+" | "+counter.value+"\n";
            })

            // Reminders
            this.reminders.forEach( (reminder: Reminder) => {
                newData += "#reminder "+reminder.toString()+"\n";
            });

            // Categories
            console.log("WRITING CATEGORIES");
            console.log(this.categories)
            this.categories.forEach( (cat: Category) => {
                newData += "#category "+cat.name+' | '+cat.weight+' | '+cat.percentOfScores+'\n';
                if (cat.scoreSet !== undefined)
                    cat.scoreSet.forEach( (sc: Score) => {
                        newData += "#score "+sc.name+" | "+sc.value+" | "+sc.extraCredit+"\n";
                    })
            })
            console.log("NEW DATA\n"+newData);

            this.gradeSetData = newData;
            return newData;
        } );

        this.modified = false;
        if (gradeSetOnly) return;

        // Write each student note
        this.students.forEach( (student: Student) => {
            console.log(student);
            console.log("WRITING STUDENT "+student.data.get("name")+" at "+student.sourceFile.name)
            this.plugin.app.vault.process( student.sourceFile, (data: string) => {
                let lines = data.split("\n");
                let newData: string = "";
    
                lines.forEach( (line: string) => {
                    if (line.charAt(0) === '#' && line.charAt(1) !== ' ') {
                        let tag = line.substring(0, line.indexOf(" "));
                        let tagname = tag.substring(1);
                        let definition = line.substring(line.indexOf(" "));
                        definition = definition.trim();

                        if (tag === "#score") {
                            // Nothing, see below
                        } else if (tag === "#counter") {
                            // Nothing, see below
                        } else if (tag === "#absence") {
                            // Nothing, see below
                        } else if (tag === "#note") {
                            // Nothing, see below
                        } else {
                            newData += tag+" "+student.data.get(tagname)+"\n";
                        }
                    } else {
                        if (! line.startsWith("\n")) newData += line + "\n";
                    }
                });

                // Dump counters
                student.counters.forEach( (counter: Counter) => {
                    newData += "#counter "+counter.name+" | "+counter.value+"\n";
                });

                // Dump the absences to include any changes
                student.absences.forEach( (date) => {
                    if (date.toLocaleDateString('en-US') !== 'Invalid date') 
                        newData += "#absence "+date.toLocaleDateString('en-US')+'\n';
                });

                // Dump the scores so that we include any changes or new 
                student.scores.forEach( (value, key) => {
                    newData += "#score "+key+" | "+value+'\n';
                });

                if (student.notes.length > 0) {
                    var notesArray = student.notes.split("\n");
                    notesArray.forEach( (note) => {
                        newData += "#note "+note+"\n";
                    });
                }

                // if new student without template
                console.log("WRITING student "+student.data.get("name")+"\nLength="+newData.length);
                if (newData.length == 1) {
                    student.data.forEach( (value, key) => {
                        console.log("writing key = "+key)
                        let val = student.data.get(key);
                        if (val !== "undefined") newData += "#"+key+" "+val+"\n";
                    })
                    if (student.scores.size > 0) {
                        student.scores.forEach( (value, key) =>{
                            let score = student.scores.get(key);
                            newData += "#score " + key + " | " + student.scores.get(key) + "\n";
                        })
                    }
                }

                return newData;
            })
        })
    }

    getTitle() {
        return this.properties.get("title");
    }

    getStudents() {
        return (this.students==null)?0:this.students.length;
    }

    renameCategory(oldName: string, newName: string) {
        console.log("Renaming category "+oldName+" to "+newName);
        this.categories.forEach( (cat) => {
            if (cat.name === oldName) {
                cat.name = newName;
                this.modified = true;
            }
        });
    }

    display(div: HTMLDivElement, width: number,
            divider1 = null, divider2 = null) {
        let titleDiv = div.createEl("div", { cls: "title-style"});
        let studentDiv = div.createEl("div", { cls: "scores-style"});

        // Title 
        let table = titleDiv.createEl("table", { cls: "title-table-style" });
        let tbody = table.createEl("tbody");
        let titlerow = tbody.createEl("tr");
        let titlecell = titlerow.createEl("td");
        titlecell.createEl("h1", { text: this.properties.get("title") });
        this.plugin.registerDomEvent(titleDiv, "click", (e: MouseEvent) => {
            console.log("CLICK on "+this.properties.get("title"));
            this.plugin.displayGradeSetView();
        });

        if (this.reminders.length + this.tasks.length > 0) {
            titlerow = tbody.createEl("tr", { cls: "title-info-style"});
            if (this.reminders.length) 
                titlerow.createEl("td", { text: "reminders" });
            if (this.tasks.length) 
                titlerow.createEl("td", { text: "tasks" });
        }

        // Student list 
        // 0. Do all categories have scores in them?
        let allCategoriesHaveScores = this.allCategoriesHaveScores();

        // 1. Start by computing the number of columns we need
        let row: HTMLElement = null;
        
        // 2. Generate a table with students
        table = studentDiv.createEl("table", { cls: "student-table-style" });
        let columnWidth = parseInt(table.getCssPropertyValue("--column-width"));
        let nameFontSize = parseInt(table.getCssPropertyValue("--name-font-size"));
        let nameWidth = this.longestName * nameFontSize + 100 /*image*/;
        if (nameWidth > columnWidth) columnWidth = nameWidth;
        let columns = Math.round(width / columnWidth);
        console.log("For width "+width+" we need "+columns+" columns of width "+columnWidth);
        let count = 0;
        
        tbody = table.createEl("tbody");
        this.students.forEach((stud: Student) => {
            if (count == 0) {
                row = tbody.createEl("tr");
            }
            let style = "student-cell-style";
            if (divider1 !== null) {
                let check = allCategoriesHaveScores ? this.finalScore(stud) : this.finalScore(stud)/this.weightTotal();
                if (check >= divider1) {
                    style = "student-colorized-cell-style-1";
                } else if (check >= divider2) {
                    style = "student-colorized-cell-style-2";
                } else {
                    style = "student-colorized-cell-style-3";
                }
            }
            let cell = row.createEl("td", { cls: style });
            cell.width = ""+columnWidth;
            if (allCategoriesHaveScores) 
                stud.display(cell, style, this.finalScore(stud));
            else {
                stud.display(cell, style, this.finalScore(stud), this.finalScore(stud)/this.weightTotal());
            }
            this.plugin.registerDomEvent(stud.getDiv(), "click", (e: MouseEvent) => {
                console.log("CLICK on "+stud.data.get("name"));
                console.log(stud.noteData);
                this.plugin.displayStudent(stud);
            });
            // this.plugin.registerDomEvent(stud.getHEI(), "click", (e: MouseEvent) => {
            //     console.log("CLICK on "+stud.data.get("name")+" image");
            //     console.log(stud.noteData);
            // });
            count++;
            count = count % columns;
        });        
    }

    displayList(div: HTMLDivElement, width: number) {
        let titleDiv = div.createEl("div", { cls: "title-list-style"});
        let studentDiv = div.createEl("div", { cls: "scores-list-style"});

        // Title 
        let table = titleDiv.createEl("table", { cls: "title-list-table-style" });
        let tbody = table.createEl("tbody");
        let titlerow = tbody.createEl("tr");
        let titlecell = titlerow.createEl("td");
        titlecell.createEl("h1", { text: this.properties.get("title") });
        this.plugin.registerDomEvent(titleDiv, "click", (e: MouseEvent) => {
            console.log("CLICK on "+this.properties.get("title"));
            this.plugin.displayGradeSetView();
        });

        // Table setup
        table = studentDiv.createEl("table", { cls: "student-list-table-style" });
        let nameFontSize = parseInt(table.getCssPropertyValue("--name-font-size"));

        tbody = table.createEl("tbody");
        let catrow = tbody.createEl("tr");
        catrow.createEl("td"); //, { cls: "student-list-cell-style" });
        catrow.createEl("td"); //, { cls: "student-list-cell-style" });
        catrow.createEl("td");
        this.categories.forEach( (cat) => {
            if (cat.scoreSet !== undefined) {
                let catname = catrow.createEl("td", { cls: "student-list-category-style", attr: {colspan: cat.scoreSet.length} });
                catname.createEl("h4", { text: cat.name });
            }
        });
        let scorerow = tbody.createEl("tr");
        scorerow.createEl("td"); //, { cls: "student-list-cell-style" });
        scorerow.createEl("td"); //, { cls: "student-list-cell-style" });
        let fs = scorerow.createEl("td", { cls: "student-list-finalscore-style" });
        fs.createEl("h4", { text: "Final Score" });
        this.categories.forEach( (cat) => {
            if (cat.scoreSet !== undefined) {
                cat.scoreSet.forEach( (score) => {
                    let scorename = scorerow.createEl("th", { cls: "student-list-scoretitle-style" });
                    scorename.createEl("h5", { text: score.name });
                })
            }
        });

        let count = 0;
        this.students.forEach((stud: Student) => {
            let row = tbody.createEl("tr", { cls: "student-list-cell-style" });
            stud.displayRow(row, this);
            let color = row.getCssPropertyValue("background-color");
            if (count % 2 == 0)
                color = Utilities.pSBC(0.75, color, false, true);
            else
                color = Utilities.pSBC(-0.75, color, false, true);
            row.style.backgroundColor = color;
            count++;
            this.plugin.registerDomEvent(stud.getDiv(), "click", (e: MouseEvent) => {
                console.log("CLICK on "+stud.data.get("name"));
                console.log(stud.noteData);
                this.plugin.displayStudent(stud);
            });
        });
    }

    setSortMethod(method: any) {
        this.sortMethod = method;
        this.students.sort(method);
    }      

    addStudent(student: Student) {
        console.log("Adding student "+student.data.get("name")+" to "+this.properties.get("title"));
        // Set up the stdent with the approproiate data
         if (this.categories !== undefined && this.categories !== null) {
            this.categories.forEach( (cat) => {
                if (cat.getScoreSet() !== undefined && cat.getScoreSet() !== null)
                    cat.getScoreSet().forEach( (score: Score) => {
                        if (student.get(cat, score.name) === undefined) 
                            student.set(cat, score.name, 0);
                    })
            })
        }
        if (this.counters.length > 0) {
            this.counters.forEach( (counter) => {
                student.addCounter(counter);
            });
        }
       
        // Add
        this.students.push(student);
        this.students.sort(this.sortMethod);

        this.modified = true;
    }

    getStudent(criterion: any): Student {
        var student: Student;

        if (criterion.name !== undefined) {
            student = this.students.find( (stud) => stud.data.get("name") === criterion.name);
        } else if (criterion.id !== undefined) {
            student = this.students.find( (stud) => stud.data.get("id") === criterion.id);
        } else if (criterion.emailaddress !== undefined) {
            student = this.students.find( (stud) => stud.data.get("emailaddress") === criterion.emailaddress);
        } 

        return student;
    }

    deleteStudent(student: Student) {
        this.students = this.students.filter( (stud) => stud.data.get("name") !== student.data.get("name"));
        this.modified = true;
    }

    addScore(name: string, possible: number, extraCredit: boolean, catname: string, scores: Map<string, number>) {
        console.log("Adding SCORE = "+name+'/'+possible+" in "+catname)
        var category: Category;

        // Find the category
        category = null;
        if (this.categories !== undefined && this.categories !== null) {
            this.categories.forEach( (cat) => {
                if (cat.name === catname) {
                    category = cat;
                    let score = new Score(name, possible, extraCredit);
                    cat.addScore(score);
                    console.log("ADDING: ");
                    console.log(cat.scoreSet);
                }
            });
        }
        if (category === null) return;
  
        // add the score to each student
        if (this.students !== undefined && this.students !== null) {
            this.students.forEach( (stud: Student) => {
                stud.set(category, name, scores.get(stud.data.get("name")));
            });
        }

        // Set the gradeset to write when closed
        this.gradeSetData = this.writeGradeSet(true);
        this.modified = true;
    }

    addAbsences(absences: Date[]) {
        if (this.students !== undefined && this.students !== null) {
            for (let i=0; i < this.students.length; i++) {
                if (absences[i] !== undefined) {
                   this.students[i].addAbsence(absences[i]);
                   console.log("Adding absence "+absences[i]+" to "+this.students[i].data.get("name"));
                }
            }
            this.modified = true;
        } 
    }

    addCounter(counter: Counter) {
        this.counters.push(counter);
        if (this.students !== undefined && this.students !== null) {
            for (let i=0; i < this.students.length; i++) {
                this.students[i].addCounter(counter);
            }
            this.modified = true;
        } 
    }

    addReminder(reminder: Reminder) {
        console.log("Adding reminder "+reminder.text);
        this.reminders.push(reminder);
        this.gradeSetData = this.writeGradeSet(true);
        this.modified = true;
    }

    deleteReminder(reminder: Reminder) {
        this.reminders = this.reminders.filter( (rem) => rem.text !== reminder.text);
        this.gradeSetData = this.writeGradeSet(true);
        this.modified = true;
    }

    getCategory(criterion: any): Category {
        var cat: Category;

        if (criterion.name !== undefined) {
            cat = this.categories.find( (c) => c.name === criterion.name);
        } 

        return cat;
    }

    addCategory( cat: Category ) {
        this.categories.push(cat);
        this.modified = true;
    }

    deleteCategory(cat: Category) {
        this.categories = this.categories.filter( (c) => c.name !== cat.name);
        this.modified = true;
    }

    //-----------------------------------------------------------------------
    // Sorting

    studentNamesAscending(student1: Student, student2: Student) {
        let name1 = student1.data.get("name");
        if (name1 === undefined) name1 = "";
        let name2 = student2.data.get("name");
        if (name2 === undefined) name2 = "";
        return name1.localeCompare(name2);
    }

    studentNamesDescending(student1: Student, student2: Student) {
        let name1 = student1.data.get("name");
        if (name1 === undefined) name1 = "";
        let name2 = student2.data.get("name");
        if (name2 === undefined) name2 = "";
        return name2.localeCompare(name1);
    }

    studentScoresAscending(student1: Student, student2: Student) {
        if (student1 === undefined && student2 === undefined) return 0;
        if (student1 === undefined) return -1;
        if (student2 === undefined) return 1;
        return student1.displayedFinalScore-student2.displayedFinalScore;
    }

    studentScoresDescending(student1: Student, student2: Student) {
        if (student1 === undefined && student2 === undefined) return 0;
        if (student1 === undefined) return -1;
        if (student2 === undefined) return 1;
        return student2.displayedFinalScore-student1.displayedFinalScore;
    }

    //-----------------------------------------------------------------------
    // Statistics

    classScoreAverage(cat: Category, score: string): number {
        var total: number = 0;

        this.students.forEach( (stud) => {
            total += stud.get(cat, score);
        });
        total = total / this.students.length;

        return total;
    }
    
    classAverage(): number {
        var total: number = 0;
        this.students.forEach( (stud) => {
            total += this.finalScore(stud);
        });
        total = total / this.students.length;
        return total;
    }

    finalScore(student: Student): number {
        // For every category, get the student points and add the categories
        if (this.categories == null || this.categories.length == 0) {
            return 0;
        } else {
            let total = 0;
            this.categories.forEach( (cat) => {
                total += cat.studentScore(student);
                //console.log("Counting "+total+" for "+student.data.get("name"));
            });
            return total;
        }
    }

    finalPossible(): number {
        // For every category, get the student points and add the categories
        if (this.categories == null || this.categories.length == 0) {
            return 0;
        } else {
            let total = 0;
            this.categories.forEach( (cat) => {
                total += cat.possible();
                //console.log("Counting "+total+" for "+student.data.get("name"));
            });
            return total;
        }
    }

    weightTotal(): number {
        if (this.categories == null || this.categories.length == 0) {
            return 0;
        } else {
            let total = 0;
            this.categories.forEach( (cat) => {
                if (cat.scoreSet !== undefined && cat.scoreSet !== null && cat.scoreSet.length > 0)
                    total += cat.weight;
            });
            return total;
        }
    }

    allCategoriesHaveScores(): boolean {
        let allCategoriesHaveScores = true;
        if (this.categories !== undefined && this.categories !== null) {
            this.categories.forEach( (cat) => {
                allCategoriesHaveScores = allCategoriesHaveScores && 
                   (cat.getScoreSet() !== undefined && cat.getScoreSet() !== null && cat.getScoreSet().length > 0);
            })  
        }
        return allCategoriesHaveScores;
    }


    //------------------------------------------------------------------------
    // Web server data generation
    //
    // Idea: Generate the XML file at a certain time (spec'd in settings).  

    generateXMLForWebServer() { 
        console.log("Generating XML for web server");            

        let xml = '<class';
        let title = this.properties.get("title");
        if (title !== undefined) xml += ` name="${title}" `;
        let shortTitle = this.properties.get("shortTitle");
        if (shortTitle !== undefined) xml += ` nickname="${shortTitle}" `;
        xml += '>\n';

        if (this.categories !== undefined && this.categories !== null) {
            this.categories.forEach( (category) => {
                xml += category.generateXML();
            })
        }

        if (this.students !== undefined && this.students !== null) {
            this.students.forEach( (student) => {
                xml += student.generateFirstXML();
                if (this.categories !== undefined && this.categories !== null) {
                    this.categories.forEach( (category) => {
                        if (category.scoreSet !== undefined && category.scoreSet !== null && category.scoreSet.length > 0 ) 
                            xml += student.generateScoreXML(category);
                    })
                }            
                xml += "</student>\n";
            })
        }

        xml += '</class>\n';

        return xml;
    }

    generateTRMNLHTML() { 
        console.log("Generating HTML for TRMNL");            

        let html = '';

        if (this.categories !== undefined && this.categories !== null) {
            this.categories.forEach( (category) => {
                html += '<div class="label">'+category.name+'</div>';
            })
        }

        if (this.students !== undefined && this.students !== null) {
            this.students.forEach( (student) => {
                //html += student.generateFirstXML();
                if (this.categories !== undefined && this.categories !== null) {
                    this.categories.forEach( (category) => {
                        if (category.scoreSet !== undefined && category.scoreSet !== null && category.scoreSet.length > 0 ) 
                            //html += student.generateScoreXML(category);
                    })
                }            
                //html += "</student>\n";
            })
        }

        return html;
    }
 


}