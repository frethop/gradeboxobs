import { Student} from "../data/Student";
import { Category } from "../data/Category";

var student1: Student;
var student2: Student;

beforeEach(() => {
    let data = `
#name Simple Ton
`;
    student1 = new Student(null);
    student1.configureFromData(data);
    
 
    let data2 = `
#name George Washington
#id 000123456
#emailaddress jipping@hope.edu

#score Participation | 3/14 | 4
#score Participation | 3/24 | 10

#score Exams | Test #1 | 42

#absence 3/1/2023

#image https://myworldweb.com/wp-content/uploads/2020/07/George-Washington-857x1024.jpg

#reminder Birthday is 4/10

#absence 4/1/2023

#score Homework | 4/1 | 10

%category: Homework%
%category: Participation%
%category: Exams%

TOTAL = %finalscore%

`;
    student2 = new Student(null);
    student2.configureFromData(data2);
    
});

test ("Tests on null input data", () => {
    let student = new Student(null);
    expect(student).not.toBeNull();
})

test ("Test on simple student", () => {
    expect(student1.data.get("name")).toBe("Simple Ton");
    expect(student1.sourceFile).toBeUndefined;
    expect(student1.absences.length).toEqual(0);
    expect(student1.get("cat one", "score one")).toBeUndefined;
})

test ("Test on adding scores", () => {
    let student = new Student(null);
    let obj = {
        name: "Category One",
        scores: {"one": 25, "two": 100}
    }
    let cat = new Category(obj);
    
    student.set(cat, "one", 22);
    expect(student.scores).not.toBeNull();

    let val = student.get(cat, "one");
    expect(val).toBe(22);

    student.set(cat, "two", 99);
    val = student.get(cat, "two");
    expect(val).toBe(99);

    val = student.get(cat, "three");
    expect(val).toBeUndefined();
});

test ("Absences", () => {
    expect(student1.absences.length).toEqual(0);
    expect(student2.absences.length).toEqual(2);
})




