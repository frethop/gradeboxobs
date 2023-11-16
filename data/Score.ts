export class Score {
    name: string = "";
    value: number = 0.0;
    extraCredit = false;

    constructor(name: string, value: number, extraCred?: boolean) {
        this.name = name;
        this.value = value;
        if (typeof extraCred == 'undefined') {
            this.extraCredit = false;
        } else {
            this.extraCredit = extraCred;
        }
    }

    getName() {return this.name}
    getValue() {return this.value}
    getExtraCredit() {return this.extraCredit}

    setName(name: string) {this.name = name;}
    setValue(value: number) {this.value = value;}
    setExtraCredit(extraCred: boolean) {this.extraCredit = extraCred;}

    toJSON() {
        return `{ \"name\": \"${this.name}\", ` +
                 `\"value\": \"${this.value}\", ` +
                 `\"extraCredit\": "${this.extraCredit}" }`;
    }
}