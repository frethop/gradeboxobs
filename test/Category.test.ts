import { Student} from "../data/Student";
import { Category } from "../data/Category";

test ("Tests on null input data", () => {
    let obj = {
        name: "Simple",
        scores: {},
    }

    let cat = new Category(obj);
    expect(cat).not.toBeNull();
});

test ("Test simple category", () => {
    let obj = {
        name: "Simple",
        scores: {},
    }
    let cat = new Category(obj);

    expect(cat.name).toMatch(/Simple/);
    expect(cat.weight).toBe(1);
    expect(cat.dropHighest).toBe(0);
    expect(cat.dropLowest).toBe(0);
    expect(cat.scoringMethod).toBe(Category.ScoringMethod.INDIVIDUAL_SCORE_PERCENTAGE);
    expect(cat.percentOfScores).toBe(1);
});

test ("Test simple category with final score", () => {
    let obj = {
        name: "Category One",
        scores: [ {"name": "one", "value": 25}, {"name": "two", "value": 100}]
    }
    let cat = new Category(obj);

    expect(cat.name).toMatch(/Category One/);
    expect(cat.weight).toBe(1);
    expect(cat.dropHighest).toBe(0);
    expect(cat.dropLowest).toBe(0);
    expect(cat.scoringMethod).toBe(Category.ScoringMethod.INDIVIDUAL_SCORE_PERCENTAGE);
    expect(cat.percentOfScores).toBe(1);

    let student = new Student(null);
    student.set(cat, "one", 22);
    student.set(cat, "two", 99);

    let finalscore = cat.studentScore(student);
    console.log(finalscore);
})

test ("Test toJSON", () => {
    let obj = {
        name: "Category One",
        scores: [ {"name": "one", "value": 25}, {"name": "two", "value": 100}]
    }
    let cat = new Category(obj);

    let json = cat.toJSON();
    console.log(json);
    let parsed = JSON.parse(json);
})

