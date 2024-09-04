export class Counter {

    name: string;
    value: number;

    constructor(name: string) {
        this.name = name;
        this.value = 0;
    }

    set(value: number) {
        this.value = value;
    }

    increment() {
        this.value++;
    }

    decrement() {
        this.value--;
    }

    reset() {
        this.value = 0;
    }


}