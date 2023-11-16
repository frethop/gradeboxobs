import { Score } from "./Score";
import { Student } from "./Student";

export class Category {
    
    static ScoringMethod = {
		TOTAL_POINTS: 0, 
        TOTAL_SCORE_PERCENTAGE: 1, 
        INDIVIDUAL_SCORE_PERCENTAGE: 2, 
        PERCENTAGE_OF_TOTAL_POSSIBLE: 3
	}
    
    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    private _weight: number;
    public get weight(): number {
        return this._weight;
    }
    public set weight(value: number) {
        this._weight = value;
    }
    scoringMethod: number;
    dropLowest: number;
	dropHighest: number;
	percentOfScores: number;
    scoreSet: Score[];

    constructor(obj: any) {
        if (obj !=  null) {
            this.name = (typeof obj.name == 'undefined')?"no name":obj.name;
            this.weight = (typeof obj.weight == 'undefined')?1.0:obj.weight;
            this.scoringMethod = (typeof obj.scoringMethod == 'undefined')?Category.ScoringMethod.INDIVIDUAL_SCORE_PERCENTAGE:obj.scoringMethod;
            this.dropLowest = (typeof obj.dropLowest == 'undefined')?0:obj.dropLowest;
            this.dropHighest = (typeof obj.dropHighest == 'undefined')?0:obj.dropHighest;
            this.percentOfScores = (typeof obj.percentOfScores == 'undefined')?1:obj.percentOfScores;
            this.scoreSet = [];
            console.log(obj.scores);
            if (typeof obj.scores !== 'undefined') {
                let arr = Array.from(obj.scores);
                arr.forEach((data: any) => {
                    console.log(data);
                    let score = new Score(data['name'], data['value'], data['extraCredit']);
                    console.log(score);
                    this.scoreSet.push(score);
                });
            }
        }
    }

    addScore(score: Score) {
        if (this.scoreSet === undefined) 
            this.scoreSet = [];
        this.scoreSet.push(score);
    }

    getScore(criterion: any): Score {
        var score: Score;

        if (criterion.name !== undefined) {
            score = this.scoreSet.find( (sc) => sc.name === criterion.name);
        } 

        return score;
    }

    getScoreSet() {
        return this.scoreSet;
    }

    setScoringMethod(method: number) {
        this.scoringMethod = method;
    }

    possible(): number {
        let total = 0;
        if (this.scoreSet !== undefined) 
            this.scoreSet.forEach( (set) => { 
                total = total + set.getValue() 
            });
        return total*this.weight;
    }

    studentTotalPointsScore(student: Student): number {
        let total = 0;
        if (this.scoreSet !== undefined) 
            this.scoreSet.forEach( (set) => { 
                total = total + student.get(this, set.getName()) 
            });
        return total;
    }

    studentTotalScorePercentageScore(student: Student): number {
        let total = 0;
        let possible = 0;
        if (this.scoreSet !== undefined) 
            this.scoreSet.forEach( (set) => { 
                total = total + student.get(this, set.getName());
                if (! set.extraCredit) possible += set.getValue(); 
            });
        return (total / possible)*100.0;
    }

    studentIndividualScorePercentage(student: Student): number {
        let total = 0;
        let extraTotal = 0;
        if (this.scoreSet !== undefined) {
            // Figure out without extra credit
            this.scoreSet.forEach( (set) => { 
                if (! set.extraCredit)
                   total = total + ( student.get(this, set.getName()) / set.getValue());
            });

            // Figure out with extra credit
            this.scoreSet.forEach( (set) => { 
                extraTotal = extraTotal + ( student.get(this, set.getName()) / set.getValue());
            });
            
            // If there is extra credit, then use that
            if (extraTotal > total) total = extraTotal;
            total = total / this.scoreSet.length;
        }
        return total*100;
    }

    studentPercentageOfTotalPossible(student: Student): number {
        return 0;
    }

    studentScore(student: Student): number {
        let studscore = 0;
        switch (this.scoringMethod) {
            case Category.ScoringMethod.TOTAL_POINTS:
                studscore = this.studentTotalPointsScore(student);
                break;
            case Category.ScoringMethod.TOTAL_SCORE_PERCENTAGE:
                studscore = this.studentTotalScorePercentageScore(student);
                break;
            case Category.ScoringMethod.INDIVIDUAL_SCORE_PERCENTAGE:
                studscore = this.studentIndividualScorePercentage(student);
                break;
            case Category.ScoringMethod.PERCENTAGE_OF_TOTAL_POSSIBLE:
                studscore = this.studentPercentageOfTotalPossible(student);
                break;
        }

        return studscore*this.weight;
    }

    generateXML(): string {

        let xml = 
           '<category name="' + this.name 
            + '" weight="' + this.weight 
            + '" method="2' 
                // (this.scoringMethod == Category.ScoringMethod.TOTAL_POINTS) ? "0" :
                //    (this.scoringMethod == Category.ScoringMethod.TOTAL_SCORE_PERCENTAGE) ? "1" :
                //       (this.scoringMethod == Category.ScoringMethod.INDIVIDUAL_SCORE_PERCENTAGE) ? "2" :
                //          (this.scoringMethod == Category.ScoringMethod.PERCENTAGE_OF_TOTAL_POSSIBLE) ? "3" : "0"
            + '" dropLowest="0'  //this.dropLowest 
            + '" dropHighest="0'  //this.dropHighest 
            + '" percentOfScores="' + (this.percentOfScores*100) 
           + '">\n';
        if (this.scoreSet !== undefined && this.scoreSet !== null) {
            this.scoreSet.forEach( (set) => { 
                xml += '<score name="' + set.getName() + '" possible="' + set.getValue() + '" />\n';
            });
        }
        xml += "</category>\n";

        return xml;
    }

}