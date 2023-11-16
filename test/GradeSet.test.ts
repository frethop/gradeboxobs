import { GradeSet } from "../data/GradeSet";
import { Student } from "../data/Student";
import { Category } from "../data/Category"

var simplegs: GradeSet = null;
var gs1: GradeSet = null;
var gs2: GradeSet = null;
var newformat1: string = null;

beforeEach(() => {
    let data = `
#title Simple
`;
    simplegs = new GradeSet(null);
    simplegs.defineGradeSet(data, null, null);
    
    let data2 = `
#title New Format 1 Test

# This is a new format 1

#category Participation | 0.5 | 1
#score 3/14 | 10
#score 3/24 | 10

#category Exams | 0.25 | 1
#score Test #1 | 100

END!
`;  
    gs1 = new GradeSet(null);
    gs1.defineGradeSet(data2, null, null);

    let studData1 = `
#name George Washington
#id 000123456
#emailaddress jipping@hope.edu

#score Participation | 3/14 | 4
#score Participation | 3/24 | 10

#absence 3/1/2023

#score Exams | Test #1 | 42

#image https://myworldweb.com/wp-content/uploads/2020/07/George-Washington-857x1024.jpg

#reminder Birthday is 4/10

#score Homework | 4/1 | 10

#absence 4/1/2023

%category: Homework%
%category: Participation%
%category: Exams%

TOTAL = %finalscore%

`;
    let stud1 = new Student(null);
    stud1.configureFromData(studData1);
    gs1.addStudent(stud1);
    
});
  
// afterEach(() => {
//     clearCityDatabase();
// });
  

test("GradeSet init", () => {
    let g = new GradeSet(null);
    expect(g).not.toBeNull();
});

test("GradeSet data, no categories, no students", () => {
    expect(simplegs.getTitle()).toEqual("Simple");
    expect(simplegs.getStudents()).toEqual(0);
});

test("Small GradeSet data", () => {
    expect(gs1).not.toBeNull();

    //expect(gs1.getStudents()).toEqual(4);
    expect(gs1.categories.length).toEqual(2);
});

test ("New format test", () => {
    expect(gs1.getTitle()).toEqual("New Format 1 Test");
    expect(gs1.categories.length).toBe(2);
    console.log(gs1.categories);
    expect(gs1.getCategory( {name: "Participation"} ).weight).toBe(0.5);
    expect(gs1.getCategory( {name: "Participation"} ).scoreSet.length).toBe(2);
    expect(gs1.getCategory( {name: "Participation"} ).
                        getScore({name: "3/14"}).getValue()).toBe(10);
    expect(gs1.getCategory( {name: "Exams"} ).weight).toBe(0.25);
    expect(gs1.getCategory( {name: "Exams"} ).scoreSet.length).toBe(1);
    let student = gs1.getStudent({ name: "George Washington"});
    expect(student).toBeDefined;
    expect(student.absences.length).toEqual(2);
});

test("Adding students to GradeSet data", () => {
    let obj = {
        name: "Category One",
        scores: {"one": 25, "two": 100}
    }
    let cat = new Category(obj);

    let studobj = {
        name: "Mike Jipping",
        id: "000123456",
        email_address: "jipping@hope.edu"
    }
    let student = new Student(studobj);
    gs1.addStudent(student);
    expect(gs1.getStudents()).toEqual(2);
    student = gs1.getStudent( { name: "George Washington"});
    expect(student).toBeDefined();
    expect(student.data.get("id")).toEqual("000123456");
    let number = student.get("Participation", "3/14");
    expect(number).toEqual(4);
    student = gs1.getStudent({ name: "Mike Jipping"});
    expect(student.data.get("id")).toEqual("000123456");
    cat = gs1.getCategory( { name: "Participation" });
    expect(cat).toBeDefined;
    number = student.get(cat, "3/14");
    expect(number).toEqual(0);

    studobj = {
        name: "Spike Mipping",
        id: "000123456",
        email_address: "mipping@hope.edu"
    }
    student = new Student(studobj);
    gs1.addStudent(student);
    expect(gs1.getStudents()).toEqual(3);
    student = gs1.getStudent({ name: "Spike Mipping"});
    expect(student.data.get("id")).toEqual("000123456");
    number = student.get(cat, "3/14");
    expect(number).toEqual(0);

})

test("Searching GradeSet data", () => {
    let obj = {
        name: "Category One",
        scores: {"one": 25, "two": 100}
    }
    let cat = new Category(obj);

    let studobj = {
        name: "Mike Jipping",
        id: "000123456",
        email_address: "jipping@hope.edu"
    }
    let student = new Student(studobj);
    gs1.addStudent(student);
    expect(gs1.getStudents()).toEqual(2);

    student = gs1.getStudent({ name: "Mike Jipping"});
    expect(student.data.get("id")).toEqual("000123456");
    student = gs1.getStudent( { name: "George Carlin"} );
    expect(student).toBeUndefined();
    student = gs1.getStudent({ id: "000123456"});
    expect(student.data.get("name")).toEqual("George Washington");
});

test("Computing final scores", () => {
    var cat1 = gs1.getCategory( { name: "Participation" });
    expect(cat1.scoringMethod).toEqual(Category.ScoringMethod.INDIVIDUAL_SCORE_PERCENTAGE);

    // Total points
    cat1.setScoringMethod(Category.ScoringMethod.TOTAL_POINTS);
    expect(cat1.scoringMethod).toEqual(Category.ScoringMethod.TOTAL_POINTS);
    var cat2 = gs1.getCategory( { name: "Exams" });
    cat2.setScoringMethod(Category.ScoringMethod.TOTAL_POINTS);
    expect(cat2.scoringMethod).toEqual(Category.ScoringMethod.TOTAL_POINTS);
    let student = gs1.getStudent( { name: "George Washington"});
    expect(gs1.finalScore(student)).toEqual(17.5);

    // Total Score Percentage
    cat1 = gs1.getCategory( { name: "Participation" });
    cat1.setScoringMethod(Category.ScoringMethod.TOTAL_SCORE_PERCENTAGE);
    expect(cat1.scoringMethod).toEqual(Category.ScoringMethod.TOTAL_SCORE_PERCENTAGE);
    var cat2 = gs1.getCategory( { name: "Exams" });
    cat2.setScoringMethod(Category.ScoringMethod.TOTAL_SCORE_PERCENTAGE);
    expect(cat2.scoringMethod).toEqual(Category.ScoringMethod.TOTAL_SCORE_PERCENTAGE);
    student = gs1.getStudent( { name: "George Washington"});
    let fscore = gs1.finalScore(student);
    fscore = (Math.trunc(fscore*100))/100;
    expect(fscore).toEqual(45.5);

    // Individual Score Percentage
    cat1 = gs1.getCategory( { name: "Participation" });
    cat1.setScoringMethod(Category.ScoringMethod.INDIVIDUAL_SCORE_PERCENTAGE);
    expect(cat1.scoringMethod).toEqual(Category.ScoringMethod.INDIVIDUAL_SCORE_PERCENTAGE);
    var cat2 = gs1.getCategory( { name: "Exams" });
    cat2.setScoringMethod(Category.ScoringMethod.INDIVIDUAL_SCORE_PERCENTAGE);
    expect(cat2.scoringMethod).toEqual(Category.ScoringMethod.INDIVIDUAL_SCORE_PERCENTAGE);
    student = gs1.getStudent( { name: "George Washington"});
    fscore = gs1.finalScore(student);
    fscore = (Math.trunc(fscore*100))/100;
    expect(fscore).toEqual(80.5);

    

});