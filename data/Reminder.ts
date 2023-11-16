export class Reminder {

    text: string;
    date: Date;
    repeat: number;
    prior: number;

    constructor(text: string, date: Date, repeat: number, prior: number) {
        this.text = text;
        this.date = date;
        this.repeat = repeat;
        this.prior = prior;
    }

    isTriggered(): boolean {
        let now = new Date();
        let check = new Date(now.getFullYear(), now.getMonth(), now.getDate()-this.prior);
        if (this.date.getTime() - check.getTime() >= 0 
            && this.date.getTime() - check.getTime() <= (this.prior * 86400000)) {
            return true;
        }
        return false;
    }

    reset() {
        let now = new Date();
        let newdate = new Date(now.getFullYear(), now.getMonth(), now.getDate()+this.repeat);
        this.date = newdate;
    }

    toString(): string {
        return this.text + " | " + this.date.toString() + " | " + this.repeat.toString() + " | " + this.prior.toString();
    }

}
