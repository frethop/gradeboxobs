//--------------------------------------------------------------------------------------------
//
//  Functionality associate with a template, mostly message template
// 
//  Pattern replacement in messages
//      %firstname% --> student first name
//      %lastname%  --> student last name
//      %id%        --> student id

import { Category } from 'data/Category';
import { GradeSet } from 'data/GradeSet';
import { Score } from 'data/Score';
import { Student } from 'data/Student';
import Utilities from 'utilities/Utilities';

export class Template {

    gradeSet: GradeSet;
    processPatterns: {pattern: string, process: (old: string, stud: Student) => string}[];

    constructor(gradeSet: GradeSet) {
        this.gradeSet = gradeSet;

        this.processPatterns = [
            {pattern: "%id%", 
             process: (old: string, stud: Student) => {
                return old.replace("%id%", stud.data.get("id"));
             }
            },
            {pattern: "%name%",
             process: (old: string, stud: Student) => {
                return old.replace("%name%", stud.data.get("name"));
             }
            },
            {pattern: "%firstname%",
             process: (old: string, stud: Student) => {
                let fname = stud.data.get("fname");
                if (fname == undefined) {
                    fname = stud.data.get("name");
                    if (fname.contains(",")) {
                        fname = fname.split(",")[1];
                    } else {
                        fname = fname.split(" ")[0];
                    }
                }
               return old.replace("%firstname%", fname);
            }
           },
           {pattern: "%lastname%",
             process: (old: string, stud: Student) => {
                let lname = stud.data.get("lname");
                if (lname == undefined) {
                    lname = stud.data.get("name");
                    if (lname.contains(",")) {
                        lname = lname.split(",")[0];
                    } else {
                        lname = lname.split(" ")[1];
                    }
                }
               return old.replace("%lastname%", lname);
            }
           },
            {pattern: "%emailaddress%",
             process: (old: string, stud: Student) => {
                return old.replace("%emailaddress%", stud.data.get("emailaddress"));
             }
            },
            {pattern: "%title%",
             process: (old: string, stud: Student) => {
                return old.replace("%title%", gradeSet.properties.get("title"));
             }
            },
            {pattern: "%absencenumber%",
             process: (old: string, stud: Student) => {
                return old.replace("%absencenumber%", stud.absences.length.toString());
            }
            },
            {pattern: "%absencelist%",
             process: (old: string, stud: Student) => {
                let abNote = "";
                if (stud.absences.length > 0) {
                    for (let i=0; i < stud.absences.length; i++) {
                        abNote += " - " + stud.absences[i].toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) + "\n";
                    }
                } else {
                    abNote = "No absences";
                }
                return old.replace("%absencelist%", abNote);;
             }
            },
            {pattern: "%absencelistifnonzero%",
             process: (old: string, stud: Student) => {
                let abNote = "";
                if (stud.absences.length > 0) {
                    for (let i=0; i < stud.absences.length; i++) {
                        abNote += " - " + stud.absences[i].toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) + "\n";
                    }
                } else {
                    abNote = "";
                }
                return old.replace("%absencelistifnonzero%", abNote);
             }
            },
            {pattern: "%counter:",
             process: (old: string, stud: Student) => {
                const regex = /%counter:(.*?)%/g;
                let matches = old.match(regex);
                if (matches == null) return old;
                matches.forEach( (match) => {
                    let sides = match.split(":");
                    console.log("Counter: "+sides[1]);
                    let cname = sides[1].replace("%", "");
                    let value = stud.getCounter(cname.trim());
                    if (value == null) 
                        old = old.replace("%counter:"+sides[1], "ERROR");
                    else
                        old = old.replace("%counter:"+sides[1], value.value.toString());
                })
                return old;
             }
            },
            {pattern: "%categorylist%",
             process: (old: string, stud: Student) => {
                let catNote = "";     
                if (gradeSet.categories != null) {
                    gradeSet.categories.forEach((cat: Category) => {
                     catNote += "### "+ cat.name + " (weight is "+(cat.weight*100)+"%)\n";
                     if (cat.scoreSet !== undefined && cat.scoreSet.length > 0) {
                       cat.scoreSet.forEach( (score: Score) => {
                          catNote += "- **"+score.name+"**: ";
                          let studentScore = stud.get(cat, score.name);
                          if (typeof studentScore == 'undefined') studentScore = 0;
                          catNote += "" + studentScore + " / " + score.value + "\n";
                      })
                     } else {
                         catNote += "> NO SCORES\n";
                     }
                     catNote += "\n";
                   });
                }
                return old.replace("%categorylist%", catNote);
             }
            },
            {pattern: "%category:",
             process: (old: string, stud: Student) => {
                const regex = /%category:(.*?)%/g;
                let matches = old.match(regex);
                if (matches == null) return old;
                matches.forEach( (match) => {
                    let sides = match.split(":");
                    let cname = sides[1].replace("%", "");
                    let cat = gradeSet.getCategory({name: cname});
                    let markdown = "";
                    if (cat == null) {
                        let markdown = "** "+cname+" **\n";
                        if (cat.scoreSet !== undefined && cat.scoreSet.length > 0) {
                            cat.scoreSet.forEach( (score: Score) => {
                                markdown += "> - **"+score.name+"**: ";
                                let studentScore = this.get(cat, score.name);
                                if (typeof studentScore == 'undefined') studentScore = 0;
                                markdown += "" + studentScore + " / " + score.value + "\n";
                        })
                        } else {
                            markdown += "> NO SCORES\n";
                        }
                    }
                    if (cat == null) 
                        old = old.replace("%category:"+sides[1], "ERROR");
                    else
                        old = old.replace("%category:"+sides[1], markdown);
                })
                return old;
             }
            },
            {pattern: "%scorelist%",
                process: (old: string, stud: Student) => {
                    return "title"
                }
            },
            {pattern: "%score:",
                process: (old: string, stud: Student) => {
                    const regex = /%score:(.*?)%/g;
                    let matches = old.match(regex);
                    if (matches == null) return old;
                    matches.forEach( (match) => {
                       // WHAT??? 
                    })
                }
            },
            {pattern: "%finalscore%",
             process: (old: string, stud: Student) => {
                let final = gradeSet.finalScore(stud);
                let gra = Utilities.fixToPlaces(final);
                if (! gradeSet.allCategoriesHaveScores()) {
                    gra += " (" + Utilities.fixToPlaces(final/gradeSet.weightTotal()) + "%)";
                }
                return old.replace("%finalscore%", gra);
             }
            },
            {pattern: "%image%",
             process: (old: string, stud: Student) => {
                return old.replace("%image%", stud.data.get("image"));
             }
            },
            {pattern: "%date%",
             process: (old: string, stud: Student) => {
                let dt = new Date().toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"});
                return old.replace("%date%", dt);
            }
            },


        ]
    }

    process(message: string, student: Student): string {

        if (message == undefined) return "";

        this.processPatterns.map( (pattern) => {
            //console.log("Checking "+pattern.pattern);
            if (message.contains(pattern.pattern)) {
                message = pattern.process(message, student);
            }
            //console.log("Message is now "+message);
        })

        console.log(message);
        return message;
    }



}