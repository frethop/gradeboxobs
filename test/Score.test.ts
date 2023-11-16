import { Score } from "../data/Score";
import { Category } from "../data/Category";

test ("Tests on constructor", () => {
    let score = new Score("Test #1", 25, false);
    expect(score).not.toBeNull();
})

test ("Test on setting score data", () => {
    let score = new Score("Test #1", 25, false);
    expect(score).not.toBeNull();
    
    expect(score.getName()).toEqual("Test #1");
    expect(score.getValue()).toEqual(25);
    expect(score.getExtraCredit()).not.toBeTruthy();

    score.setName("Test #2");
    expect(score.getName()).toBe("Test #2");
    score.setValue(4.2);
    expect(score.getValue()).toEqual(4.2);
    score.setExtraCredit(true);
    expect(score.getExtraCredit()).toEqual(true);

});

test ("Test toJSON", () => {
    let score = new Score("Test #1", 25, false);
    let output = '{ "name": "Test #1", "value": "25", "extraCredit": "false" }';
    expect(score.toJSON()).toEqual(output);

    let json = score.toJSON();
    let parsed = JSON.parse(json);
    expect(parsed).not.toBeNull();
    expect(parsed['name']).toEqual("Test #1");
    expect(parsed['value']).toEqual("25");
    expect(parsed['extraCredit']).toEqual("false");
});