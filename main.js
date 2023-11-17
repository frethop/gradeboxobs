'use strict';

var obsidian = require('obsidian');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var Score = /** @class */ (function () {
    function Score(name, value, extraCred) {
        this.name = "";
        this.value = 0.0;
        this.extraCredit = false;
        this.name = name;
        this.value = value;
        if (typeof extraCred == 'undefined') {
            this.extraCredit = false;
        }
        else {
            this.extraCredit = extraCred;
        }
    }
    Score.prototype.getName = function () { return this.name; };
    Score.prototype.getValue = function () { return this.value; };
    Score.prototype.getExtraCredit = function () { return this.extraCredit; };
    Score.prototype.setName = function (name) { this.name = name; };
    Score.prototype.setValue = function (value) { this.value = value; };
    Score.prototype.setExtraCredit = function (extraCred) { this.extraCredit = extraCred; };
    Score.prototype.toJSON = function () {
        return "{ \"name\": \"".concat(this.name, "\", ") +
            "\"value\": \"".concat(this.value, "\", ") +
            "\"extraCredit\": \"".concat(this.extraCredit, "\" }");
    };
    return Score;
}());

var Category = /** @class */ (function () {
    function Category(obj) {
        var _this = this;
        if (obj != null) {
            this.name = (typeof obj.name == 'undefined') ? "no name" : obj.name;
            this.weight = (typeof obj.weight == 'undefined') ? 1.0 : obj.weight;
            this.scoringMethod = (typeof obj.scoringMethod == 'undefined') ? Category.ScoringMethod.INDIVIDUAL_SCORE_PERCENTAGE : obj.scoringMethod;
            this.dropLowest = (typeof obj.dropLowest == 'undefined') ? 0 : obj.dropLowest;
            this.dropHighest = (typeof obj.dropHighest == 'undefined') ? 0 : obj.dropHighest;
            this.percentOfScores = (typeof obj.percentOfScores == 'undefined') ? 1 : obj.percentOfScores;
            this.scoreSet = [];
            console.log(obj.scores);
            if (typeof obj.scores !== 'undefined') {
                var arr = Array.from(obj.scores);
                arr.forEach(function (data) {
                    console.log(data);
                    var score = new Score(data['name'], data['value'], data['extraCredit']);
                    console.log(score);
                    _this.scoreSet.push(score);
                });
            }
        }
    }
    Object.defineProperty(Category.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Category.prototype, "weight", {
        get: function () {
            return this._weight;
        },
        set: function (value) {
            this._weight = value;
        },
        enumerable: false,
        configurable: true
    });
    Category.prototype.addScore = function (score) {
        if (this.scoreSet === undefined)
            this.scoreSet = [];
        this.scoreSet.push(score);
    };
    Category.prototype.getScore = function (criterion) {
        var score;
        if (criterion.name !== undefined) {
            score = this.scoreSet.find(function (sc) { return sc.name === criterion.name; });
        }
        return score;
    };
    Category.prototype.getScoreSet = function () {
        return this.scoreSet;
    };
    Category.prototype.setScoringMethod = function (method) {
        this.scoringMethod = method;
    };
    Category.prototype.possible = function () {
        var total = 0;
        if (this.scoreSet !== undefined)
            this.scoreSet.forEach(function (set) {
                total = total + set.getValue();
            });
        return total * this.weight;
    };
    Category.prototype.studentTotalPointsScore = function (student) {
        var _this = this;
        var total = 0;
        if (this.scoreSet !== undefined)
            this.scoreSet.forEach(function (set) {
                total = total + student.get(_this, set.getName());
            });
        return total;
    };
    Category.prototype.studentTotalScorePercentageScore = function (student) {
        var _this = this;
        var total = 0;
        var possible = 0;
        if (this.scoreSet !== undefined)
            this.scoreSet.forEach(function (set) {
                total = total + student.get(_this, set.getName());
                if (!set.extraCredit)
                    possible += set.getValue();
            });
        return (total / possible) * 100.0;
    };
    Category.prototype.studentIndividualScorePercentage = function (student) {
        var _this = this;
        var total = 0;
        var extraTotal = 0;
        if (this.scoreSet !== undefined) {
            // Figure out without extra credit
            this.scoreSet.forEach(function (set) {
                if (!set.extraCredit)
                    total = total + (student.get(_this, set.getName()) / set.getValue());
            });
            // Figure out with extra credit
            this.scoreSet.forEach(function (set) {
                extraTotal = extraTotal + (student.get(_this, set.getName()) / set.getValue());
            });
            // If there is extra credit, then use that
            if (extraTotal > total)
                total = extraTotal;
            total = total / this.scoreSet.length;
        }
        return total * 100;
    };
    Category.prototype.studentPercentageOfTotalPossible = function (student) {
        return 0;
    };
    Category.prototype.studentScore = function (student) {
        var studscore = 0;
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
        return studscore * this.weight;
    };
    Category.prototype.generateXML = function () {
        var xml = '<category name="' + this.name
            + '" weight="' + this.weight
            + '" method="2'
            // (this.scoringMethod == Category.ScoringMethod.TOTAL_POINTS) ? "0" :
            //    (this.scoringMethod == Category.ScoringMethod.TOTAL_SCORE_PERCENTAGE) ? "1" :
            //       (this.scoringMethod == Category.ScoringMethod.INDIVIDUAL_SCORE_PERCENTAGE) ? "2" :
            //          (this.scoringMethod == Category.ScoringMethod.PERCENTAGE_OF_TOTAL_POSSIBLE) ? "3" : "0"
            + '" dropLowest="0' //this.dropLowest 
            + '" dropHighest="0' //this.dropHighest 
            + '" percentOfScores="' + (this.percentOfScores * 100)
            + '">\n';
        if (this.scoreSet !== undefined && this.scoreSet !== null) {
            this.scoreSet.forEach(function (set) {
                xml += '<score name="' + set.getName() + '" possible="' + set.getValue() + '" />\n';
            });
        }
        xml += "</category>\n";
        return xml;
    };
    Category.ScoringMethod = {
        TOTAL_POINTS: 0,
        TOTAL_SCORE_PERCENTAGE: 1,
        INDIVIDUAL_SCORE_PERCENTAGE: 2,
        PERCENTAGE_OF_TOTAL_POSSIBLE: 3
    };
    return Category;
}());

var Counter = /** @class */ (function () {
    function Counter(name) {
        this.name = name;
        this.value = 0;
    }
    Counter.prototype.increment = function () {
        this.value++;
    };
    Counter.prototype.decrement = function () {
        this.value--;
    };
    Counter.prototype.reset = function () {
        this.value = 0;
    };
    return Counter;
}());

var Reminder = /** @class */ (function () {
    function Reminder(text, date, repeat, prior) {
        this.text = text;
        this.date = date;
        this.repeat = repeat;
        this.prior = prior;
    }
    Reminder.prototype.isTriggered = function () {
        var now = new Date();
        var check = new Date(now.getFullYear(), now.getMonth(), now.getDate() - this.prior);
        if (this.date.getTime() - check.getTime() >= 0
            && this.date.getTime() - check.getTime() <= (this.prior * 86400000)) {
            return true;
        }
        return false;
    };
    Reminder.prototype.reset = function () {
        var now = new Date();
        var newdate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + this.repeat);
        this.date = newdate;
    };
    Reminder.prototype.toString = function () {
        return this.text + " | " + this.date.toString() + " | " + this.repeat.toString() + " | " + this.prior.toString();
    };
    return Reminder;
}());

var Utilities = /** @class */ (function () {
    function Utilities() {
        this.TAGS = "tags";
        this.MARKDOWN = "markdown";
    }
    Utilities.extractTags = function (data) {
        var lines = data.split("\n");
        var extraction = "";
        lines.forEach(function (line) {
            if (line.charAt(0) === '#' && line.charAt(1) !== ' ') {
                var tag_1 = line.substring(0, line.indexOf(" "));
                var definition_1 = line.substring(line.indexOf(" "));
                definition_1 = definition_1.trim();
                extraction += tag_1 + " " + definition_1 + "\n";
            }
        });
        return extraction;
    };
    Utilities.extract = function (data, what) {
        if (what === this.TAGS) {
            return this.extractTags(data);
        }
    };
    Utilities.fileExists = function (fileName, folder) {
        var file = folder.children.find(function (afile) { return afile.name === fileName; });
        return (file !== undefined);
    };
    Utilities.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    Utilities.sleep2 = function (millis) {
        var date = new Date().getTime();
        var curDate = 0;
        while (curDate - date < millis) {
            console.log("sleeping: " + (curDate - date) + " " + millis + " " + (curDate - date < millis));
            curDate = new Date().getTime();
        }
    };
    Utilities.fixToPlaces = function (number, places) {
        if (places === void 0) { places = 2; }
        return (Math.round(number * 100) / 100).toFixed(places);
    };
    var _a;
    _a = Utilities;
    // From https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
    Utilities.pSBC = function (p, c0, c1, l) {
        var r, g, b, P, f, t, h, i = parseInt, m = Math.round, a = typeof (c1) == "string";
        if (typeof (p) != "number" || p < -1 || p > 1 || typeof (c0) != "string" || (c0[0] != 'r' && c0[0] != '#') || (c1 && !a))
            return null;
        if (!_a.pSBCr)
            _a.pSBCr = function (d) {
                var _b;
                var n = d.length, x = {};
                if (n > 9) {
                    _b = d = d.split(","), r = _b[0], g = _b[1], b = _b[2], a = _b[3], n = d.length;
                    if (n < 3 || n > 4)
                        return null;
                    x.r = i(r[3] == "a" ? r.slice(5) : r.slice(4)), x.g = i(g), x.b = i(b), x.a = a ? parseFloat(a) : -1;
                }
                else {
                    if (n == 8 || n == 6 || n < 4)
                        return null;
                    if (n < 6)
                        d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : "");
                    d = i(d.slice(1), 16);
                    if (n == 9 || n == 5)
                        x.r = d >> 24 & 255, x.g = d >> 16 & 255, x.b = d >> 8 & 255, x.a = m((d & 255) / 0.255) / 1000;
                    else
                        x.r = d >> 16, x.g = d >> 8 & 255, x.b = d & 255, x.a = -1;
                }
                return x;
            };
        h = c0.length > 9, h = a ? c1.length > 9 ? true : c1 == "c" ? !h : false : h, f = _a.pSBCr(c0), P = p < 0, t = c1 && c1 != "c" ? _a.pSBCr(c1) : P ? { r: 0, g: 0, b: 0, a: -1 } : { r: 255, g: 255, b: 255, a: -1 }, p = P ? p * -1 : p, P = 1 - p;
        if (!f || !t)
            return null;
        if (l)
            r = m(P * f.r + p * t.r), g = m(P * f.g + p * t.g), b = m(P * f.b + p * t.b);
        else
            r = m(Math.pow((P * Math.pow(f.r, 2) + p * Math.pow(t.r, 2)), 0.5)), g = m(Math.pow((P * Math.pow(f.g, 2) + p * Math.pow(t.g, 2)), 0.5)), b = m(Math.pow((P * Math.pow(f.b, 2) + p * Math.pow(t.b, 2)), 0.5));
        a = f.a, t = t.a, f = a >= 0 || t >= 0, a = f ? a < 0 ? t : t < 0 ? a : a * P + t * p : 0;
        if (h)
            return "rgb" + (f ? "a(" : "(") + r + "," + g + "," + b + (f ? "," + m(a * 1000) / 1000 : "") + ")";
        else
            return "#" + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2);
    };
    return Utilities;
}());

var Student = /** @class */ (function () {
    function Student(obj) {
        var _this = this;
        this.scrolltextIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scroll-text"><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M15 8h-5"/><path d="M15 12h-5"/></svg>';
        this.data = new Map();
        if (obj != null) {
            var oobj = obj;
            Object.keys(oobj).forEach(function (key) {
                _this.data.set(key, obj[key]);
            });
        }
        this.data.set("dataModified", "false");
        this.data.set("imageModified", "false");
        this.data.set("notesModified", "false");
        this.scores = new Map();
        if (obj != null && obj.scores !== undefined) {
            var arr = Array.from(obj.scores);
            arr.forEach(function (pair) {
                _this.scores.set(pair.name, pair.value);
            });
        }
        this.noteData = "";
        this.absences = [];
        this.counters = [];
        this.notes = "";
        this.sourceFile = undefined;
    }
    Student.prototype.configureFromData = function (data) {
        var _this = this;
        this.noteData = data;
        var lines = data.split("\n");
        this.absences = [];
        this.counters = [];
        this.notes = "";
        lines.forEach(function (line) {
            if (line.charAt(0) === '#' && line.charAt(1) !== ' ') {
                var tag_1 = line.substring(0, line.indexOf(" "));
                var definition_1 = line.substring(line.indexOf(" "));
                definition_1 = definition_1.trim();
                console.log("CONFIGURING STUDENT with " + tag_1 + ' as ' + definition_1);
                if (tag_1 === "#note") {
                    console.log("ADDING NOTE to " + _this.notes);
                    _this.notes += definition_1 + "\n";
                    console.log(_this.notes);
                }
                else if (tag_1 === "#score") {
                    var props = definition_1.split("|");
                    _this.set(props[0].trim(), props[1].trim(), parseFloat(props[2]));
                }
                else if (tag_1 === "#counter") {
                    var props = definition_1.split("|");
                    var counter = new Counter(props[0].trim());
                    counter.value = parseInt(props[1]);
                    _this.counters.push(counter);
                }
                else if (tag_1 === "#absence") {
                    var date = new Date(definition_1);
                    console.log(date);
                    if (_this.absences == undefined || _this.absences == null)
                        _this.absences = [];
                    _this.absences.push(date);
                }
                else {
                    var vname = tag_1.substring(1);
                    _this.data.set(vname, definition_1);
                }
            }
        });
    };
    Student.prototype.setSourceFile = function (file) {
        this.sourceFile = file;
    };
    Student.prototype.display = function (div, style, finalScore, finalWithWeights) {
        if (finalWithWeights === void 0) { finalWithWeights = -1; }
        this.displayedFinalScore = finalScore;
        this.studentDiv = div.createEl("div"); //, {cls: "student-style"});
        var table = this.studentDiv.createEl("table", { cls: "student-table-style" });
        var tbody = table.createEl("tbody");
        var row = tbody.createEl("tr");
        this.studentImage = null;
        if (this.data.get("image") !== undefined) {
            var cell_1 = row.createEl("td", { cls: style });
            var hei = cell_1.createEl("img");
            hei.src = this.data.get("image");
            hei.height = 100;
            this.studentImage = hei;
            if (this.notes !== undefined && this.notes !== null && this.notes.length > 0) {
                cell_1.createEl("br");
                cell_1.innerHTML += this.scrolltextIcon;
            }
        }
        var fscore = Utilities.fixToPlaces(finalScore);
        var cell = row.createEl("td", { cls: style });
        cell.createEl("h3", { text: this.data.get("name"), cls: style });
        if (finalWithWeights == -1)
            cell.createEl("h4", { text: "" + fscore, cls: style });
        else
            cell.createEl("h4", { text: "" + fscore + " (" + Utilities.fixToPlaces(finalWithWeights) + "%)", cls: style });
        //console.log(this.counters);
        if (this.counters !== undefined && this.counters !== null && this.counters.length > 0) {
            var counterP_1 = cell.createEl("p");
            this.counters.forEach(function (counter) {
                counterP_1.createEl("span", { text: counter.name + ": " + counter.value });
                counterP_1.createEl("br");
            });
        }
        if (this.absences !== undefined && this.absences !== null && this.absences.length > 0) {
            var abs = cell.createEl("p", { text: "" + this.absences.length + " absenses" });
            abs.style.color = "red";
        }
    };
    Student.prototype.displayRow = function (row, gradeSet) {
        var _this = this;
        this.studentDiv = row;
        var namebox = row.createEl("td", { cls: "student-list-cell-style", attr: { align: "left" } });
        namebox.createEl("h3", { text: this.data.get("name") });
        var idbox = row.createEl("td", { cls: "student-list-cell-style" });
        idbox.createEl("h3", { text: this.data.get("id") });
        var finalbox = row.createEl("td", { cls: "student-list-finalscore-style" });
        finalbox.createEl("h3", { text: "" + Utilities.fixToPlaces(this.displayedFinalScore) });
        gradeSet.categories.forEach(function (cat) {
            if (cat.scoreSet !== undefined) {
                cat.scoreSet.forEach(function (score) {
                    var studentScore = _this.get(cat, score.name);
                    if (typeof studentScore == 'undefined')
                        studentScore = 0;
                    var cell = row.createEl("td", { cls: "student-list-cell-style" });
                    cell.createEl("h3", { text: "" + studentScore });
                });
            }
        });
    };
    Student.prototype.getDiv = function () {
        return this.studentDiv;
    };
    Student.prototype.getHEI = function () {
        return this.studentImage;
    };
    Student.prototype.get = function (cat, name) {
        var key;
        if (typeof cat == 'string') {
            key = cat + "|" + name;
        }
        else {
            key = cat.name + "|" + name;
        }
        //console.log("GETTINGSCORE "+key);
        //console.log(this.scores.keys());
        return this.scores.get(key);
    };
    Student.prototype.set = function (cat, sname, value) {
        var key;
        if (typeof cat === 'string') {
            key = cat + "|" + sname;
        }
        else {
            key = cat.name + "|" + sname;
        }
        if (this.scores.get(key) === undefined) {
            this.noteData += "\n#score " + key + "|" + value;
        }
        console.log("SETTING " + key + " to " + value);
        this.scores.set(key, value);
    };
    Student.prototype.setFromPair = function (_a, addToData) {
        var name = _a.name, value = _a.value;
        if (addToData === void 0) { addToData = true; }
        if (this.scores.get(name) === undefined && addToData) {
            this.noteData += "\n#score " + name + "|" + value;
        }
        this.scores.set(name, value);
    };
    Student.prototype.addAbsence = function (date, addToData) {
        if (addToData === void 0) { addToData = true; }
        if (this.absences == undefined || this.absences == null)
            this.absences = [];
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (addToData) {
            this.noteData += "\n#absence " + mm + "/" + dd + "/" + yyyy;
            console.log(this.noteData);
        }
        this.absences.push(date);
    };
    Student.prototype.addCounter = function (counter, addToData) {
        if (addToData === void 0) { addToData = true; }
        if (addToData) {
            this.noteData += "\n#counter " + counter.name + "|" + counter.value;
            console.log(this.noteData);
        }
        this.counters.push(counter);
    };
    Student.prototype.deleteCounter = function (counter) {
        for (var i = 0; i < this.counters.length; i++) {
            if (this.counters[i].name === counter.name) {
                this.counters.splice(i, 1);
            }
        }
    };
    Student.prototype.findCounter = function (name) {
        var found = false;
        this.counters.forEach(function (counter) {
            if (counter.name === name)
                found = true;
        });
        return found;
    };
    Student.prototype.getCounter = function (name) {
        var c = null;
        this.counters.forEach(function (counter) {
            console.log("COMPARING '" + counter.name + "' to '" + name + "'");
            if (counter.name.localeCompare(name) === 0)
                c = counter;
        });
        return c;
    };
    Student.prototype.updateCounter = function (counter) {
        this.counters.forEach(function (c) {
            if (c.name === counter.name) {
                c.value = counter.value;
            }
        });
    };
    Student.prototype.setNotes = function (notes) {
        this.notes = notes;
    };
    Student.prototype.generateMarkdown = function (gradeSet) {
        var _this = this;
        var studentNote = "";
        // Title 
        studentNote += "----\n# " + this.data.get("name") + '\n';
        studentNote += "![image|100](" + this.data.get("image") + ')\n';
        studentNote += " - ID: " + this.data.get("id") + '\n';
        studentNote += " - Email: " + this.data.get("emailaddress") + "\n";
        studentNote += "\n----\n";
        if (this.absences.length > 0) {
            studentNote += "### Absences: \n";
            for (var i = 0; i < this.absences.length; i++) {
                studentNote += " - " + this.absences[i].toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" }) + "\n";
            }
            studentNote += "\n----\n";
        }
        if (this.counters.length > 0) {
            studentNote += "### Counters: \n";
            for (var i = 0; i < this.counters.length; i++) {
                studentNote += " - " + this.counters[i].name + ": " + this.counters[i].value + "\n";
            }
            studentNote += "\n----\n";
        }
        if (this.notes.length > 0) {
            studentNote += "### Notes: \n";
            studentNote += this.notes;
            studentNote += "\n----\n";
        }
        if (gradeSet.categories != null) {
            console.log("StudentView Category listing");
            studentNote += "### Scores: \n";
            gradeSet.categories.forEach(function (cat) {
                studentNote += "> [!note] " + cat.name + "\n";
                if (cat.scoreSet !== undefined && cat.scoreSet.length > 0) {
                    cat.scoreSet.forEach(function (score) {
                        studentNote += "> - **" + score.name + "**: ";
                        var studentScore = _this.get(cat, score.name);
                        console.log("STUDENTSCORE: " + studentScore);
                        if (typeof studentScore == 'undefined')
                            studentScore = 0;
                        studentNote += "" + studentScore + " / " + score.value + "\n";
                    });
                }
                else {
                    studentNote += "> NO SCORES\n";
                }
                studentNote += "\n";
            });
        }
        var final = gradeSet.finalScore(this);
        studentNote += "## TOTAL = " + Utilities.fixToPlaces(final);
        if (!gradeSet.allCategoriesHaveScores()) {
            studentNote += " (" + Utilities.fixToPlaces(final / gradeSet.weightTotal()) + "%)";
        }
        return studentNote;
    };
    Student.prototype.generateFirstXML = function () {
        var xml = '<student name="' + this.data.get("name") + '" id="' + this.data.get("id") + '" email="' + this.data.get("emailaddress") + '">\n';
        if (this.absences !== undefined && this.absences !== null && this.absences.length > 0) {
            this.absences.forEach(function (date) {
                xml += '<absense date="' + date.toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" }) + '"/>\n';
            });
        }
        return xml;
    };
    Student.prototype.generateScoreXML = function (cat) {
        var _this = this;
        var xml = "";
        if (this.scores !== undefined && this.scores !== null && this.scores.size > 0) {
            cat.scoreSet.forEach(function (score) {
                var studentScore = _this.get(cat, score.name);
                if (studentScore !== undefined) {
                    xml += '<score name="' + score.name + '" points="' + studentScore + '"></score>\n';
                }
            });
        }
        return xml;
    };
    return Student;
}());

//import { Reminder } from "./Reminder"
var GradeSet = /** @class */ (function () {
    function GradeSet(plugin) {
        this.gradeSetData = null;
        this.plugin = plugin;
        this.modified = false;
        this.categories = [];
        this.students = [];
        this.properties = new Map();
        this.reminders = [];
        this.tasks = [];
        this.sourceFolder = undefined;
        this.counters = [];
        this.gradeSetData = "";
        this.longestName = 0;
        this.sortMethod = this.studentNamesAscending;
    }
    GradeSet.prototype.setsourceFolder = function (folder) {
        this.sourceFolder = folder;
    };
    GradeSet.prototype.setSourceFile = function (file) {
        this.sourceFile = file;
    };
    GradeSet.prototype.defineGradeSet = function (data, source, file, redefine) {
        if (redefine === void 0) { redefine = false; }
        return __awaiter(this, void 0, void 0, function () {
            var cat, lines;
            var _this = this;
            return __generator(this, function (_a) {
                this.sourceFolder = source;
                this.sourceFile = file;
                cat = null;
                this.gradeSetData = data;
                if (redefine) {
                    this.categories = [];
                    this.properties = new Map();
                    this.reminders = [];
                    this.tasks = [];
                    this.counters = [];
                    this.modified = true;
                }
                lines = data.split("\n");
                lines.forEach(function (line) {
                    if (line.charAt(0) === '#') {
                        var tag = line.substring(0, line.indexOf(" "));
                        var definition = line.substring(line.indexOf(" "));
                        definition = definition.trim();
                        // properties of the class
                        console.log("DEFINING GS with " + tag + ' as ' + definition);
                        // Score setup
                        if (tag === "#category") {
                            if (cat !== null) {
                                _this.categories.push(cat);
                            }
                            var props = definition.split("|");
                            cat = new Category(null);
                            cat.name = props[0].trim();
                            cat.weight =
                                (props.length > 1) ? parseFloat(props[1]) : 1;
                            cat.percentOfScores =
                                (props.length > 2) ? parseFloat(props[2]) : 1;
                            cat.scoringMethod =
                                (props.length > 3) ? parseInt(props[3])
                                    : Category.ScoringMethod.INDIVIDUAL_SCORE_PERCENTAGE;
                        }
                        else if (tag === "#score") {
                            var props = definition.split("|");
                            var sc = new Score(props[0].trim(), parseFloat(props[1]));
                            cat.addScore(sc);
                        }
                        else if (tag === "#counter") {
                            var props = definition.split("|");
                            var counter = new Counter(props[0].trim());
                            counter.value = parseInt(props[1]);
                            _this.counters.push(counter);
                        }
                        else if (tag === "#lastmodified") {
                            _this.lastModified = new Date(parseInt(definition));
                        }
                        else if (tag === "#reminder") {
                            var props = definition.split("|");
                            var date = new Date(props[1]);
                            var reminder = new Reminder(props[0].trim(), date, parseInt(props[2]), parseInt(props[3]));
                            _this.reminders.push(reminder);
                        }
                        else {
                            var vname = tag.substring(1);
                            _this.properties.set(vname, definition);
                            console.log("Setting " + vname + " to " + _this.properties.get(vname));
                        }
                    }
                });
                if (cat !== null)
                    this.categories.push(cat);
                console.log(this);
                return [2 /*return*/];
            });
        });
    };
    GradeSet.prototype.defineStudent = function (data, source, redefine) {
        if (redefine === void 0) { redefine = false; }
        return __awaiter(this, void 0, void 0, function () {
            var sObj, scores, abs, cnters, notes, lines, student;
            return __generator(this, function (_a) {
                sObj = new Object();
                console.log("DEFINE START: " + data);
                lines = data.split("\n");
                scores = [];
                abs = [];
                cnters = [];
                notes = "";
                try {
                    lines.forEach(function (line) {
                        if (line.charAt(0) === '#' && line.charAt(1) !== ' ') {
                            var tag_1 = line.substring(0, line.indexOf(" "));
                            var definition_1 = line.substring(line.indexOf(" "));
                            definition_1 = definition_1.trim();
                            //console.log("DEFINING STUDENT with "+tag+' as '+definition);
                            if (tag_1 === "#note") {
                                notes += definition_1 + "\n";
                            }
                            else if (tag_1 === "#score") {
                                var props = definition_1.split("|");
                                var sc = { "name": props[0].trim() + "|" + props[1].trim(), "value": parseFloat(props[2]) };
                                scores.push(sc);
                            }
                            else if (tag_1 === "#counter") {
                                var props = definition_1.split("|");
                                var counter = new Counter(props[0].trim());
                                counter.value = parseInt(props[1]);
                                cnters.push(counter);
                            }
                            else if (tag_1 === "#absence") {
                                var date = new Date(definition_1);
                                console.log(date);
                                abs.push(date);
                            }
                            else {
                                var vname = tag_1.substring(1);
                                eval("sObj." + vname + ' = "' + definition_1 + '"');
                            }
                        }
                    });
                }
                catch (e) {
                    return [2 /*return*/];
                }
                if (sObj.name !== undefined && sObj.name.length > this.longestName) {
                    //console.log("Setting longest name to "+sObj.name.length+" for "+sObj.name);
                    this.longestName = sObj.name.length;
                }
                student = null;
                if (redefine) {
                    student = this.plugin.currentStudent;
                }
                else {
                    student = new Student(sObj);
                    // Check if this is real student data
                    if (student.data.get("name") === undefined) {
                        console.log("Not a student, skipping");
                        return [2 /*return*/];
                    }
                }
                student.noteData = data;
                student.setSourceFile(source);
                cnters.forEach(function (cnter) {
                    student.addCounter(cnter, false);
                });
                abs.forEach(function (date) {
                    student.addAbsence(date, false);
                });
                scores.forEach(function (pair) {
                    student.setFromPair(pair, false);
                });
                if (notes.length > 0)
                    student.setNotes(notes);
                this.students.push(student);
                this.students.sort(this.sortMethod);
                return [2 /*return*/];
            });
        });
    };
    GradeSet.prototype.writeGradeSet = function (gradeSetOnly) {
        if (gradeSetOnly === void 0) { gradeSetOnly = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // Write the class definition
                console.log("WRITING GRADESET CLASS");
                console.log(this.categories);
                this.plugin.app.vault.process(this.sourceFile, function (data) {
                    var lines = data.split("\n");
                    var newData = "";
                    lines.forEach(function (line) {
                        console.log(line);
                        if (line.charAt(0) === '#' && line.charAt(1) !== ' ') {
                            var tag = line.substring(0, line.indexOf(" "));
                            var definition = line.substring(line.indexOf(" "));
                            definition = definition.trim();
                            if (tag === "#title")
                                newData += tag + " " + _this.properties.get("title") + '\n';
                            else if (tag === "#shorttitle")
                                newData += tag + " " + _this.properties.get("shortTitle") + '\n';
                        }
                    });
                    // FIX THIS
                    if (_this.properties.get("webfile") !== undefined) {
                        newData += "#webfile " + _this.properties.get("webfile") + '\n';
                    }
                    newData += "#lastmodified " + (new Date().getTime()) + '\n';
                    // Counters
                    _this.counters.forEach(function (counter) {
                        newData += "#counter " + counter.name + " | " + counter.value + "\n";
                    });
                    // Reminders
                    _this.reminders.forEach(function (reminder) {
                        newData += "#reminder " + reminder.toString() + "\n";
                    });
                    // Categories
                    console.log("WRITING CATEGORIES");
                    console.log(_this.categories);
                    _this.categories.forEach(function (cat) {
                        newData += "#category " + cat.name + ' | ' + cat.weight + ' | ' + cat.percentOfScores + '\n';
                        if (cat.scoreSet !== undefined)
                            cat.scoreSet.forEach(function (sc) {
                                newData += "#score " + sc.name + " | " + sc.value + "\n";
                            });
                    });
                    console.log("NEW DATA\n" + newData);
                    _this.gradeSetData = newData;
                    return newData;
                });
                this.modified = false;
                if (gradeSetOnly)
                    return [2 /*return*/];
                // Write each student note
                this.students.forEach(function (student) {
                    console.log(student);
                    console.log("WRITING STUDENT " + student.data.get("name") + " at " + student.sourceFile.name);
                    _this.plugin.app.vault.process(student.sourceFile, function (data) {
                        var lines = data.split("\n");
                        var newData = "";
                        lines.forEach(function (line) {
                            if (line.charAt(0) === '#' && line.charAt(1) !== ' ') {
                                var tag = line.substring(0, line.indexOf(" "));
                                var tagname = tag.substring(1);
                                var definition = line.substring(line.indexOf(" "));
                                definition = definition.trim();
                                if (tag === "#score") ;
                                else if (tag === "#counter") ;
                                else if (tag === "#absence") ;
                                else if (tag === "#note") ;
                                else {
                                    newData += tag + " " + student.data.get(tagname) + "\n";
                                }
                            }
                            else {
                                if (!line.startsWith("\n"))
                                    newData += line + "\n";
                            }
                        });
                        // Dump counters
                        student.counters.forEach(function (counter) {
                            newData += "#counter " + counter.name + " | " + counter.value + "\n";
                        });
                        // Dump the absences to include any changes
                        student.absences.forEach(function (date) {
                            if (date.toLocaleDateString('en-US') !== 'Invalid date')
                                newData += "#absence " + date.toLocaleDateString('en-US') + '\n';
                        });
                        // Dump the scores so that we include any changes or new 
                        student.scores.forEach(function (value, key) {
                            newData += "#score " + key + " | " + value + '\n';
                        });
                        if (student.notes.length > 0) {
                            var notesArray = student.notes.split("\n");
                            notesArray.forEach(function (note) {
                                newData += "#note " + note + "\n";
                            });
                        }
                        // if new student without template
                        console.log("WRITING student " + student.data.get("name") + "\nLength=" + newData.length);
                        if (newData.length == 1) {
                            student.data.forEach(function (value, key) {
                                console.log("writing key = " + key);
                                var val = student.data.get(key);
                                if (val !== "undefined")
                                    newData += "#" + key + " " + val + "\n";
                            });
                            if (student.scores.size > 0) {
                                student.scores.forEach(function (value, key) {
                                    student.scores.get(key);
                                    newData += "#score " + key + " | " + student.scores.get(key) + "\n";
                                });
                            }
                        }
                        return newData;
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    GradeSet.prototype.getTitle = function () {
        return this.properties.get("title");
    };
    GradeSet.prototype.getStudents = function () {
        return (this.students == null) ? 0 : this.students.length;
    };
    GradeSet.prototype.display = function (div, width, divider1, divider2) {
        var _this = this;
        if (divider1 === void 0) { divider1 = null; }
        if (divider2 === void 0) { divider2 = null; }
        var titleDiv = div.createEl("div", { cls: "title-style" });
        var studentDiv = div.createEl("div", { cls: "scores-style" });
        // Title 
        var table = titleDiv.createEl("table", { cls: "title-table-style" });
        var tbody = table.createEl("tbody");
        var titlerow = tbody.createEl("tr");
        var titlecell = titlerow.createEl("td");
        titlecell.createEl("h1", { text: this.properties.get("title") });
        this.plugin.registerDomEvent(titleDiv, "click", function (e) {
            console.log("CLICK on " + _this.properties.get("title"));
            _this.plugin.displayGradeSetView();
        });
        if (this.reminders.length + this.tasks.length > 0) {
            titlerow = tbody.createEl("tr", { cls: "title-info-style" });
            if (this.reminders.length)
                titlerow.createEl("td", { text: "reminders" });
            if (this.tasks.length)
                titlerow.createEl("td", { text: "tasks" });
        }
        // Student list 
        // 0. Do all categories have scores in them?
        var allCategoriesHaveScores = this.allCategoriesHaveScores();
        // 1. Start by computing the number of columns we need
        var row = null;
        // 2. Generate a table with students
        table = studentDiv.createEl("table", { cls: "student-table-style" });
        var columnWidth = parseInt(table.getCssPropertyValue("--column-width"));
        var nameFontSize = parseInt(table.getCssPropertyValue("--name-font-size"));
        var nameWidth = this.longestName * nameFontSize + 100 /*image*/;
        if (nameWidth > columnWidth)
            columnWidth = nameWidth;
        var columns = Math.round(width / columnWidth);
        console.log("For width " + width + " we need " + columns + " columns of width " + columnWidth);
        var count = 0;
        tbody = table.createEl("tbody");
        this.students.forEach(function (stud) {
            if (count == 0) {
                row = tbody.createEl("tr");
            }
            var style = "student-cell-style";
            if (divider1 !== null) {
                var check = allCategoriesHaveScores ? _this.finalScore(stud) : _this.finalScore(stud) / _this.weightTotal();
                if (check >= divider1) {
                    style = "student-colorized-cell-style-1";
                }
                else if (check >= divider2) {
                    style = "student-colorized-cell-style-2";
                }
                else {
                    style = "student-colorized-cell-style-3";
                }
            }
            var cell = row.createEl("td", { cls: style });
            cell.width = "" + columnWidth;
            if (allCategoriesHaveScores)
                stud.display(cell, style, _this.finalScore(stud));
            else {
                stud.display(cell, style, _this.finalScore(stud), _this.finalScore(stud) / _this.weightTotal());
            }
            _this.plugin.registerDomEvent(stud.getDiv(), "click", function (e) {
                console.log("CLICK on " + stud.data.get("name"));
                console.log(stud.noteData);
                _this.plugin.displayStudent(stud);
            });
            // this.plugin.registerDomEvent(stud.getHEI(), "click", (e: MouseEvent) => {
            //     console.log("CLICK on "+stud.data.get("name")+" image");
            //     console.log(stud.noteData);
            // });
            count++;
            count = count % columns;
        });
    };
    GradeSet.prototype.displayList = function (div, width) {
        var _this = this;
        var titleDiv = div.createEl("div", { cls: "title-list-style" });
        var studentDiv = div.createEl("div", { cls: "scores-list-style" });
        // Title 
        var table = titleDiv.createEl("table", { cls: "title-list-table-style" });
        var tbody = table.createEl("tbody");
        var titlerow = tbody.createEl("tr");
        var titlecell = titlerow.createEl("td");
        titlecell.createEl("h1", { text: this.properties.get("title") });
        this.plugin.registerDomEvent(titleDiv, "click", function (e) {
            console.log("CLICK on " + _this.properties.get("title"));
            _this.plugin.displayGradeSetView();
        });
        // Table setup
        table = studentDiv.createEl("table", { cls: "student-list-table-style" });
        parseInt(table.getCssPropertyValue("--name-font-size"));
        tbody = table.createEl("tbody");
        var catrow = tbody.createEl("tr");
        catrow.createEl("td"); //, { cls: "student-list-cell-style" });
        catrow.createEl("td"); //, { cls: "student-list-cell-style" });
        catrow.createEl("td");
        this.categories.forEach(function (cat) {
            if (cat.scoreSet !== undefined) {
                var catname = catrow.createEl("td", { cls: "student-list-category-style", attr: { colspan: cat.scoreSet.length } });
                catname.createEl("h4", { text: cat.name });
            }
        });
        var scorerow = tbody.createEl("tr");
        scorerow.createEl("td"); //, { cls: "student-list-cell-style" });
        scorerow.createEl("td"); //, { cls: "student-list-cell-style" });
        var fs = scorerow.createEl("td", { cls: "student-list-finalscore-style" });
        fs.createEl("h4", { text: "Final Score" });
        this.categories.forEach(function (cat) {
            if (cat.scoreSet !== undefined) {
                cat.scoreSet.forEach(function (score) {
                    var scorename = scorerow.createEl("th", { cls: "student-list-scoretitle-style" });
                    scorename.createEl("h5", { text: score.name, });
                });
            }
        });
        var count = 0;
        this.students.forEach(function (stud) {
            var row = tbody.createEl("tr", { cls: "student-list-cell-style" });
            stud.displayRow(row, _this);
            var color = row.getCssPropertyValue("background-color");
            if (count % 2 == 0)
                color = Utilities.pSBC(0.75, color, false, true);
            else
                color = Utilities.pSBC(-0.75, color, false, true);
            row.style.backgroundColor = color;
            count++;
            _this.plugin.registerDomEvent(stud.getDiv(), "click", function (e) {
                console.log("CLICK on " + stud.data.get("name"));
                console.log(stud.noteData);
                _this.plugin.displayStudent(stud);
            });
        });
    };
    GradeSet.prototype.setSortMethod = function (method) {
        this.sortMethod = method;
        this.students.sort(method);
    };
    GradeSet.prototype.addStudent = function (student) {
        console.log("Adding student " + student.data.get("name") + " to " + this.properties.get("title"));
        // Set up the stdent with the approproiate data
        if (this.categories !== undefined && this.categories !== null) {
            this.categories.forEach(function (cat) {
                if (cat.getScoreSet() !== undefined && cat.getScoreSet() !== null)
                    cat.getScoreSet().forEach(function (score) {
                        if (student.get(cat, score.name) === undefined)
                            student.set(cat, score.name, 0);
                    });
            });
        }
        if (this.counters.length > 0) {
            this.counters.forEach(function (counter) {
                student.addCounter(counter);
            });
        }
        // Add
        this.students.push(student);
        this.students.sort(this.sortMethod);
        this.modified = true;
    };
    GradeSet.prototype.getStudent = function (criterion) {
        var student;
        if (criterion.name !== undefined) {
            student = this.students.find(function (stud) { return stud.data.get("name") === criterion.name; });
        }
        else if (criterion.id !== undefined) {
            student = this.students.find(function (stud) { return stud.data.get("id") === criterion.id; });
        }
        else if (criterion.emailaddress !== undefined) {
            student = this.students.find(function (stud) { return stud.data.get("emailaddress") === criterion.emailaddress; });
        }
        return student;
    };
    GradeSet.prototype.deleteStudent = function (student) {
        this.students = this.students.filter(function (stud) { return stud.data.get("name") !== student.data.get("name"); });
        this.modified = true;
    };
    GradeSet.prototype.addScore = function (name, possible, extraCredit, catname, scores) {
        console.log("Adding SCORE = " + name + '/' + possible + " in " + catname);
        var category;
        // Find the category
        category = null;
        if (this.categories !== undefined && this.categories !== null) {
            this.categories.forEach(function (cat) {
                if (cat.name === catname) {
                    category = cat;
                    var score = new Score(name, possible, extraCredit);
                    cat.addScore(score);
                    console.log("ADDING: ");
                    console.log(cat.scoreSet);
                }
            });
        }
        if (category === null)
            return;
        // add the score to each student
        if (this.students !== undefined && this.students !== null) {
            this.students.forEach(function (stud) {
                stud.set(category, name, scores.get(stud.data.get("name")));
            });
        }
        // Set the gradeset to write when closed
        this.gradeSetData = this.writeGradeSet(true);
        this.modified = true;
    };
    GradeSet.prototype.addAbsences = function (absences) {
        if (this.students !== undefined && this.students !== null) {
            for (var i = 0; i < this.students.length; i++) {
                if (absences[i] !== undefined) {
                    this.students[i].addAbsence(absences[i]);
                    console.log("Adding absence " + absences[i] + " to " + this.students[i].data.get("name"));
                }
            }
            this.modified = true;
        }
    };
    GradeSet.prototype.addReminder = function (reminder) {
        console.log("Adding reminder " + reminder.text);
        this.reminders.push(reminder);
        this.gradeSetData = this.writeGradeSet(true);
        this.modified = true;
    };
    GradeSet.prototype.deleteReminder = function (reminder) {
        this.reminders = this.reminders.filter(function (rem) { return rem.text !== reminder.text; });
        this.gradeSetData = this.writeGradeSet(true);
        this.modified = true;
    };
    GradeSet.prototype.getCategory = function (criterion) {
        var cat;
        if (criterion.name !== undefined) {
            cat = this.categories.find(function (c) { return c.name === criterion.name; });
        }
        return cat;
    };
    //-----------------------------------------------------------------------
    // Sorting
    GradeSet.prototype.studentNamesAscending = function (student1, student2) {
        var name1 = student1.data.get("name");
        if (name1 === undefined)
            name1 = "";
        var name2 = student2.data.get("name");
        if (name2 === undefined)
            name2 = "";
        return name1.localeCompare(name2);
    };
    GradeSet.prototype.studentNamesDescending = function (student1, student2) {
        var name1 = student1.data.get("name");
        if (name1 === undefined)
            name1 = "";
        var name2 = student2.data.get("name");
        if (name2 === undefined)
            name2 = "";
        return name2.localeCompare(name1);
    };
    GradeSet.prototype.studentScoresAscending = function (student1, student2) {
        if (student1 === undefined && student2 === undefined)
            return 0;
        if (student1 === undefined)
            return -1;
        if (student2 === undefined)
            return 1;
        return student1.displayedFinalScore - student2.displayedFinalScore;
    };
    GradeSet.prototype.studentScoresDescending = function (student1, student2) {
        if (student1 === undefined && student2 === undefined)
            return 0;
        if (student1 === undefined)
            return -1;
        if (student2 === undefined)
            return 1;
        return student2.displayedFinalScore - student1.displayedFinalScore;
    };
    //-----------------------------------------------------------------------
    // Statistics
    GradeSet.prototype.classScoreAverage = function (cat, score) {
        var total = 0;
        this.students.forEach(function (stud) {
            total += stud.get(cat, score);
        });
        total = total / this.students.length;
        return total;
    };
    GradeSet.prototype.classAverage = function () {
        var _this = this;
        var total = 0;
        this.students.forEach(function (stud) {
            total += _this.finalScore(stud);
        });
        total = total / this.students.length;
        return total;
    };
    GradeSet.prototype.finalScore = function (student) {
        // For every category, get the student points and add the categories
        if (this.categories == null || this.categories.length == 0) {
            return 0;
        }
        else {
            var total_1 = 0;
            this.categories.forEach(function (cat) {
                total_1 += cat.studentScore(student);
                //console.log("Counting "+total+" for "+student.data.get("name"));
            });
            return total_1;
        }
    };
    GradeSet.prototype.finalPossible = function () {
        // For every category, get the student points and add the categories
        if (this.categories == null || this.categories.length == 0) {
            return 0;
        }
        else {
            var total_2 = 0;
            this.categories.forEach(function (cat) {
                total_2 += cat.possible();
                //console.log("Counting "+total+" for "+student.data.get("name"));
            });
            return total_2;
        }
    };
    GradeSet.prototype.weightTotal = function () {
        if (this.categories == null || this.categories.length == 0) {
            return 0;
        }
        else {
            var total_3 = 0;
            this.categories.forEach(function (cat) {
                if (cat.scoreSet !== undefined && cat.scoreSet !== null && cat.scoreSet.length > 0)
                    total_3 += cat.weight;
            });
            return total_3;
        }
    };
    GradeSet.prototype.allCategoriesHaveScores = function () {
        var allCategoriesHaveScores = true;
        if (this.categories !== undefined && this.categories !== null) {
            this.categories.forEach(function (cat) {
                allCategoriesHaveScores = allCategoriesHaveScores &&
                    (cat.getScoreSet() !== undefined && cat.getScoreSet() !== null && cat.getScoreSet().length > 0);
            });
        }
        return allCategoriesHaveScores;
    };
    //------------------------------------------------------------------------
    // Web server data generation
    //
    // Idea: Generate the XML file at a certain time (spec'd in settings).  
    GradeSet.prototype.generateXMLForWebServer = function () {
        var _this = this;
        console.log("Generating XML for web server");
        var xml = '<class';
        var title = this.properties.get("title");
        if (title !== undefined)
            xml += " name=\"".concat(title, "\" ");
        var shortTitle = this.properties.get("shortTitle");
        if (shortTitle !== undefined)
            xml += " nickname=\"".concat(shortTitle, "\" ");
        xml += '>\n';
        if (this.categories !== undefined && this.categories !== null) {
            this.categories.forEach(function (category) {
                xml += category.generateXML();
            });
        }
        if (this.students !== undefined && this.students !== null) {
            this.students.forEach(function (student) {
                xml += student.generateFirstXML();
                if (_this.categories !== undefined && _this.categories !== null) {
                    _this.categories.forEach(function (category) {
                        if (category.scoreSet !== undefined && category.scoreSet !== null && category.scoreSet.length > 0)
                            xml += student.generateScoreXML(category);
                    });
                }
                xml += "</student>\n";
            });
        }
        xml += '</class>\n';
        return xml;
    };
    return GradeSet;
}());

var VIEW_TYPE_GRADESET_SUMMARY = "gradeset-summary-view";
var PREVIEW_MODE$1 = 2;
var EDITING_MODE$1 = 1;
var GradeSetSummaryView = /** @class */ (function (_super) {
    __extends(GradeSetSummaryView, _super);
    function GradeSetSummaryView(leaf, plugin) {
        var _this = _super.call(this, leaf) || this;
        // set the file contents
        _this.setViewData = function (data, clear) {
            if (clear) {
                _this.codeMirror.swapDoc(CodeMirror.Doc(data, "text/x-grd"));
            }
            else {
                _this.codeMirror.setValue(data);
            }
        };
        _this.navigation = true;
        _this.plugin = plugin;
        // Make copies of these
        _this.gradeSetData = plugin.gradeSet.gradeSetData;
        _this.gradeSet = plugin.gradeSet;
        //console.log("CONSTRUCTOR: modified = "+this.gradeSet.modified);
        _this.codeMirror = CodeMirror(_this.extContentEl, {
            theme: "obsidian"
        });
        _this.mode = EDITING_MODE$1;
        _this.counters = [];
        return _this;
    }
    Object.defineProperty(GradeSetSummaryView.prototype, "extContentEl", {
        // this.contentEl is not exposed, so cheat a bit.
        get: function () {
            // @ts-ignore
            return this.contentEl;
        },
        enumerable: false,
        configurable: true
    });
    GradeSetSummaryView.prototype.getViewType = function () {
        return VIEW_TYPE_GRADESET_SUMMARY;
    };
    GradeSetSummaryView.prototype.getDisplayText = function () {
        return this.gradeSet.properties.get("title") + " Summary";
    };
    // Open the view
    // Generate Markdown into a string, write the string into a note
    GradeSetSummaryView.prototype.onOpen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log("Summary Opening");
                this.previewElement = this.addAction("lucide-book-open", "preview mode", function () {
                    _this.setPreviewMode();
                });
                this.editElement = this.addAction("lucide-edit-3", "edit mode", function () {
                    _this.setEditingMode();
                });
                // Record the "state" of the gradeset so we can detect changes
                this.numCounters = (this.gradeSet.counters == undefined) ? 0 : this.gradeSet.counters.length;
                this.gradeSet.counters.forEach(function (counter) { _this.counters.push(counter); });
                this.codeMirror.setValue(this.gradeSetData);
                this.modified = this.gradeSet.modified;
                //console.log("STARTING MODE: modified = "+this.modified);
                this.setPreviewMode();
                return [2 /*return*/];
            });
        });
    };
    GradeSetSummaryView.prototype.setPreviewMode = function () {
        if (this.mode == PREVIEW_MODE$1)
            return;
        this.mode = PREVIEW_MODE$1;
        this.modified = this.modified || (this.codeMirror.getValue() !== this.plugin.gradeSet.gradeSetData);
        this.gradeSetData = this.codeMirror.getValue();
        this.gradeSet.defineGradeSet(this.gradeSetData, this.gradeSet.sourceFolder, this.gradeSet.sourceFile, true);
        this.container = this.containerEl.children[1];
        this.container.empty();
        var div = this.container.createEl("div", { cls: "view-style" });
        var gradeSetNote = this.generateMarkdownFromGradeSet();
        obsidian.MarkdownRenderer.renderMarkdown(gradeSetNote, div, null, null);
        // this.editElement.toggleVisibility(true);
        // this.previewElement.toggleVisibility(false);
        this.editElement.show();
        this.previewElement.hide();
        console.log("PREVIEW MODE: modified = " + this.modified);
    };
    GradeSetSummaryView.prototype.setEditingMode = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.mode == EDITING_MODE$1)
                    return [2 /*return*/];
                this.mode = EDITING_MODE$1;
                this.container.empty();
                this.codeMirror = CodeMirror(this.extContentEl, {
                    theme: "obsidian"
                });
                this.codeMirror.setValue(this.gradeSetData);
                this.editElement.hide();
                this.previewElement.show();
                console.log("EDIT MODE: modified = " + this.modified);
                return [2 /*return*/];
            });
        });
    };
    GradeSetSummaryView.prototype.onClose = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gsdata, newgs_1, catAdded_1, catDeleted, added, deleted;
            var _this = this;
            return __generator(this, function (_a) {
                this.modified = this.modified || (this.codeMirror.getValue() !== this.plugin.gradeSet.gradeSetData);
                if (this.modified) {
                    gsdata = this.codeMirror.getValue();
                    newgs_1 = new GradeSet(this.plugin);
                    newgs_1.defineGradeSet(gsdata, this.gradeSet.sourceFolder, this.gradeSet.sourceFile, true);
                    catAdded_1 = [];
                    newgs_1.categories.filter(function (cat) {
                        var found = false;
                        _this.gradeSet.categories.forEach(function (c) { if (c.name == cat.name)
                            found = true; });
                        return !found;
                    }).forEach(function (cat) { catAdded_1.push(cat); });
                    catDeleted = [];
                    this.gradeSet.categories.filter(function (cat) {
                        var found = false;
                        newgs_1.categories.forEach(function (c) { if (c.name == cat.name)
                            found = true; });
                        return !found;
                    }).forEach(function (cat) { catDeleted.push(cat); });
                    this.gradeSet.defineGradeSet(this.codeMirror.getValue(), this.gradeSet.sourceFolder, this.gradeSet.sourceFile, true);
                    added = [];
                    this.gradeSet.counters.filter(function (counter) {
                        var found = false;
                        _this.counters.forEach(function (c) { if (c.name == counter.name)
                            found = true; });
                        return !found;
                    }).forEach(function (counter) { added.push(counter); });
                    deleted = [];
                    this.counters.filter(function (counter) {
                        var found = false;
                        _this.gradeSet.counters.forEach(function (c) { if (c.name == counter.name)
                            found = true; });
                        return !found;
                    }).forEach(function (counter) { deleted.push(counter); });
                    console.log(deleted);
                    if (added.length > 0)
                        added.forEach(function (counter) {
                            if (_this.gradeSet.students.length > 0) {
                                _this.gradeSet.students.forEach(function (student) {
                                    student.addCounter(counter);
                                });
                            }
                        });
                    if (deleted.length > 0)
                        deleted.forEach(function (counter) {
                            if (_this.gradeSet.students.length > 0) {
                                _this.gradeSet.students.forEach(function (student) {
                                    student.deleteCounter(counter);
                                });
                            }
                        });
                }
                //this.plugin.gradeSet.modified = this.modified;
                this.plugin.gradeBoxView.display();
                console.log("GSETSUMMARY, GS.MODIFIED = " + this.modified);
                this.app.workspace.detachLeavesOfType(VIEW_TYPE_GRADESET_SUMMARY);
                return [2 /*return*/];
            });
        });
    };
    GradeSetSummaryView.prototype.clear = function () {
    };
    GradeSetSummaryView.prototype.generateMarkdownFromGradeSet = function () {
        var _this = this;
        var gradeSetNote = "";
        // Title 
        gradeSetNote += "----\n# " + this.gradeSet.properties.get('title');
        gradeSetNote += "\n----\n";
        // Class data
        gradeSetNote += "\n### " + this.gradeSet.getStudents() + " students.\n";
        if (this.gradeSet.lastModified != undefined) {
            gradeSetNote += "### Last modified: " + this.gradeSet.lastModified.toLocaleString() + "\n";
        }
        if (this.gradeSet.counters.length > 0) {
            gradeSetNote += "### Counters\n";
            this.gradeSet.counters.forEach(function (counter) {
                gradeSetNote += " - " + counter.name + ', initial = ' + counter.value + '\n';
            });
        }
        if (this.gradeSet.reminders.length > 0) {
            gradeSetNote += "### Reminders\n";
            this.gradeSet.reminders.forEach(function (reminder) {
                gradeSetNote += ' - "' + reminder.text + '" on ' + reminder.date.toLocaleString();
                if (reminder.repeat > 0)
                    gradeSetNote += ', repeats every ' + reminder.repeat + ' days';
                if (reminder.prior > 0)
                    gradeSetNote += ', prior = ' + reminder.prior + ' days';
                gradeSetNote += '\n';
            });
        }
        if (this.gradeSet.getStudents() > 0) {
            gradeSetNote += "### Class average = " + Utilities.fixToPlaces(this.gradeSet.classAverage());
            if (!this.gradeSet.allCategoriesHaveScores()) {
                var extrap = this.gradeSet.classAverage() / this.gradeSet.weightTotal();
                gradeSetNote += " (" + Utilities.fixToPlaces(extrap) + "%)";
            }
        }
        gradeSetNote += "\n----\n";
        // Category listings with data and scores
        if (this.gradeSet.categories.length > 0) {
            gradeSetNote += "## Categories\n";
            this.gradeSet.categories.forEach(function (cat) {
                gradeSetNote += "> [!note] " + cat.name + '\n';
                gradeSetNote += "> - Weight: " + cat.weight + '\n';
                gradeSetNote += "> - " + (cat.percentOfScores * 100) + '% of scores used\n';
                gradeSetNote += "> > [!example] Scores\n";
                gradeSetNote += "> > \n";
                if (cat.scoreSet == undefined) {
                    gradeSetNote += "No scores\n";
                }
                else {
                    gradeSetNote += "> > | Name | Possible | Average |\n";
                    gradeSetNote += "> > |------|:--------:|:-------:|\n";
                    cat.scoreSet.forEach(function (sc) {
                        var value = Math.round(sc.getValue() * 100) / 100;
                        var classAve = Math.round(_this.gradeSet.classScoreAverage(cat, sc.name) * 100) / 100;
                        var percent = Math.round(classAve / sc.getValue() * 10000) / 100;
                        gradeSetNote += "> > | " + sc.getName() + ' | ' + value + " | " + percent + "% (" + classAve + ") |\n";
                    });
                }
                gradeSetNote += "\n";
            });
        }
        else {
            gradeSetNote += "## No categories\n";
        }
        return gradeSetNote;
    };
    return GradeSetSummaryView;
}(obsidian.ItemView));

CodeMirror;

// Stolen from https://github.com/helloitsian/custom-modals-obsidian/blob/main/src/modal/CustomModal.ts
var Alert = /** @class */ (function (_super) {
    __extends(Alert, _super);
    function Alert(plugin, title, content) {
        var _this = _super.call(this, plugin.app) || this;
        _this.plugin = plugin;
        _this.title = title;
        _this.content = content;
        return _this;
    }
    Alert.prototype.onOpen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contentEl;
            var _this = this;
            return __generator(this, function (_a) {
                new obsidian.Notice(this.content);
                contentEl = this.contentEl;
                contentEl.createEl("form", {}, function (form) {
                    var titleDiv = form.createDiv();
                    titleDiv.createEl("h2", { text: _this.title });
                    titleDiv.createEl("hr");
                    titleDiv.createEl("h4", { text: _this.content });
                    form.createDiv("alert-button-container", function (container) {
                        container
                            .createEl("button", { attr: { type: "button" }, text: "Ok" })
                            .addEventListener("click", function () {
                            _this.close();
                        });
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    Alert.prototype.onClose = function () {
        var contentEl = this.contentEl;
        contentEl.empty();
    };
    return Alert;
}(obsidian.Modal));

var CounterTick = /** @class */ (function (_super) {
    __extends(CounterTick, _super);
    function CounterTick(app, student, callbackOnClose) {
        var _this = _super.call(this, app) || this;
        _this.student = student;
        _this.callbackOnClose = callbackOnClose;
        _this.fields = [];
        return _this;
    }
    CounterTick.prototype.onOpen = function () {
        var _this = this;
        var contentEl = this.contentEl;
        contentEl.createEl("form", {}, function (form) {
            var titleDiv = form.createDiv();
            titleDiv.createEl("h2", { text: 'Tick a Counter' });
            titleDiv.createEl("hr");
            _this.student.counters.forEach(function (counter) {
                var counterContainer = form.createDiv();
                var but = new obsidian.ButtonComponent(counterContainer)
                    .setButtonText("-")
                    .setIcon("minus-circle")
                    .onClick(function () {
                    counter.decrement();
                    _this.callbackOnClose(counter);
                    _this.close();
                });
                if (counter.value == 0) {
                    but.setDisabled(true);
                }
                counterContainer.appendText("&nbsp;&nbsp;&nbsp;" + counter.name + "&nbsp;&nbsp;&nbsp;");
                but = new obsidian.ButtonComponent(counterContainer).setButtonText("+").setIcon("plus-circle")
                    .onClick(function () {
                    counter.increment();
                    _this.callbackOnClose(counter);
                    _this.close();
                });
                // form.createDiv("counter-button-container", container => {
                // 	container
                // 		.createEl("button", { attr: { type: "button" }, text: "Close" })
                // 		.addEventListener("click", () => {
                // 			this.close();
                // 		});
                // });
            });
        });
        // new Setting(contentEl)
        // .addButton((btn) =>
        //     btn
        //     .setButtonText("OK")
        //     .setCta()
        //     .onClick(() => {
        //         this.close();
        //     }
        // ));
    };
    return CounterTick;
}(obsidian.Modal));

// Stolen from https://github.com/helloitsian/custom-modals-obsidian/blob/main/src/modal/CustomModal.ts
var Dialog = /** @class */ (function (_super) {
    __extends(Dialog, _super);
    function Dialog(plugin, title, content, okText, cancelText, callback) {
        var _this = _super.call(this, plugin.app) || this;
        _this.plugin = plugin;
        _this.title = title;
        _this.content = content;
        _this.okText = okText;
        _this.cancelText = cancelText;
        _this.continueCallback = callback;
        return _this;
    }
    Dialog.prototype.onOpen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contentEl;
            var _this = this;
            return __generator(this, function (_a) {
                contentEl = this.contentEl;
                contentEl.createEl("h2", { text: this.title });
                new obsidian.Setting(contentEl)
                    .setName(this.content)
                    .addText(function (text) {
                    return text
                        .setValue("")
                        .onChange(function (value) {
                        _this.value = value;
                    });
                });
                new obsidian.Setting(contentEl)
                    .addButton(function (btn) {
                    return btn
                        .setButtonText(_this.cancelText)
                        .setCta()
                        .onClick(function () {
                        _this.close();
                    });
                });
                new obsidian.Setting(contentEl)
                    .addButton(function (btn) {
                    return btn
                        .setButtonText(_this.okText)
                        .setCta()
                        .onClick(function () {
                        _this.close();
                        _this.continueCallback(_this.value);
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    Dialog.prototype.onClose = function () {
        var contentEl = this.contentEl;
        contentEl.empty();
    };
    return Dialog;
}(obsidian.Modal));

//import nodemailer from 'nodemailer';
// try {
//   const nmailer = require('node_modules/nodemailer');
// } catch (e) {
//   if (e instanceof Error && e.code === "MODULE_NOT_FOUND") {
//       console.log(e);
//       console.log("Can't load nodemailer!");
//   }
// }
/* SmtpJS.com - v3.0.0   A0B577E3687C5471EB86040632239117EDDFE6418C84F1525C3391B98D38E4192FDBCF4F8201F28BB187B46D9D422C0F   fnqcqzcwopczxxjd*/
var Emailer = /** @class */ (function () {
    function Emailer() {
        this.emailWorks = false;
        this.message = "";
        this.html = null;
        this.to = "";
        this.from = "";
        this.subject = "";
        this.attachments = [];
    }
    Emailer.prototype.setMessage = function (msg) {
        this.message = msg;
    };
    Emailer.prototype.setMessageHTML = function (html) {
        this.html = html;
    };
    Emailer.prototype.addAttachment = function (path, filename, contentType) {
        if (filename === void 0) { filename = "gb.txt"; }
        var attachment = {
            'name': filename,
            //'contentType': contentType,
            'path': path
        };
        this.attachments.push(attachment);
    };
    Emailer.prototype.sendmail = function (to, from, subject, message, settings, errCallback) {
        this.to = to;
        this.from = from;
        this.subject = subject;
        if (message != null)
            this.message = message;
        console.log("Sending " + message);
        console.log("To: " + to);
        var mailOptions = {
            from: this.from,
            to: this.to,
            subject: this.subject,
            headers: { "X-GradeBox-Version": "Obsidian Version 1.0", "X-dev": "frethop" },
            text: this.message,
            attachments: this.attachments,
            html: this.html,
            //Body: this.message,
            //Username: settings.username,
            //Password: settings.password,
        };
        console.log(mailOptions);
        if (this.emailWorks) {
            var transporter = nodemailer.createTransport({
                service: settings.service,
                host: settings.smtphost,
                port: Number(settings.smtpport),
                secure: settings.secure,
                auth: {
                    user: settings.username,
                    pass: settings.password
                }
            });
            var count_1 = 0;
            //while (count < 5) 
            transporter.sendMail(mailOptions, function (error, info) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!error) return [3 /*break*/, 2];
                                console.log("SENDMAIL ERROR: #" + count_1 + ": " + error);
                                count_1++;
                                return [4 /*yield*/, Utilities.sleep(2000)];
                            case 1:
                                _a.sent();
                                errCallback(error);
                                return [3 /*break*/, 3];
                            case 2:
                                count_1 = 5;
                                console.log('Email sent: ' + info.response);
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            });
        }
    };
    return Emailer;
}());

var EmailerModal = /** @class */ (function (_super) {
    __extends(EmailerModal, _super);
    function EmailerModal(app, settings, onSubmit) {
        var _this = _super.call(this, app) || this;
        _this.settings = settings;
        _this.onSubmit = onSubmit;
        _this.attachScores = false;
        return _this;
    }
    EmailerModal.prototype.onOpen = function () {
        var _this = this;
        var contentEl = this.contentEl;
        contentEl.createEl("h2", { text: 'Enter email message info' });
        this.address = (this.settings.defaultto !== undefined) ? this.settings.defaultto : "";
        this.from = (this.settings.from !== undefined) ? this.settings.from : "";
        this.subject = (this.settings.subject) ? this.settings.subject : "";
        new obsidian.Setting(contentEl)
            .setName("Sent From:")
            .addText(function (text) {
            return text
                .setValue(_this.from)
                .onChange(function (value) {
                _this.from = value;
            });
        });
        new obsidian.Setting(contentEl)
            .setName("Destination:")
            .addText(function (text) {
            return text
                .setValue(_this.address)
                .onChange(function (value) {
                _this.address = value;
            });
        });
        new obsidian.Setting(contentEl)
            .setName("Subject:")
            .addText(function (text) {
            return text
                .setValue(_this.subject)
                .onChange(function (value) {
                _this.subject = value;
            });
        });
        var includesContainer1 = contentEl.createDiv();
        includesContainer1.style.marginTop = "10px";
        includesContainer1.style.alignItems = "center";
        includesContainer1.style.display = "grid";
        includesContainer1.style.gridTemplateColumns = "calc(25% - 10px) 30px";
        includesContainer1.createEl("p", { text: 'Attach scores?' });
        new obsidian.ToggleComponent(includesContainer1)
            .onChange(function (value) {
            _this.attachScores = value;
        });
        includesContainer1.createEl("p", { text: 'Attach Files?' });
        new obsidian.ToggleComponent(includesContainer1)
            .onChange(function (value) {
            _this.attachScores = value;
            attachdiv.style.display = (value) ? "block" : "none";
        });
        var attachdiv = contentEl.createDiv();
        attachdiv.style.display = "grid";
        attachdiv.style.gridTemplateColumns = "calc(33% - 10px) calc(50% - 10px)";
        attachdiv.createEl("p", { text: 'Attachments directory: ' });
        var inputDataFile = attachdiv.createEl("input", {
            attr: {
                type: "file",
                multiple: false,
                //accept: ".json,.csv,.tsv",
                webkitdirectory: true,
            }
        });
        attachdiv.style.display = "none";
        var messageDiv = contentEl.createDiv();
        messageDiv.style.marginTop = "10px";
        messageDiv.style.padding = "10px";
        messageDiv.style.border = "1px solid #ccc";
        messageDiv.createEl("h4", { text: 'Type your message:' });
        var tarea = new obsidian.TextAreaComponent(messageDiv)
            // let tarea = new Setting(messageDiv)
            // 	.setName("Type your message")
            // 	.addTextArea( (area) => {
            // 		area
            .onChange(function (value) {
            _this.message = value;
        });
        //	})
        tarea.inputEl.style.height = "200px";
        tarea.inputEl.style.width = "100%";
        //nameEl.innerHTML = "<font color=red>Type your message:</font>";
        var buttonContainer2 = contentEl.createDiv();
        new obsidian.Setting(buttonContainer2)
            .addButton(function (btn) {
            return btn
                //new ButtonComponent(buttonContainer)
                .setButtonText("OK")
                .setCta()
                .onClick(function () {
                console.log(inputDataFile.files);
                _this.close();
                _this.onSubmit(_this.message, _this.from, _this.address, _this.subject, _this.attachScores, inputDataFile.files);
            });
        });
    };
    EmailerModal.prototype.onClose = function () {
        var contentEl = this.contentEl;
        contentEl.empty();
    };
    return EmailerModal;
}(obsidian.Modal));

var NoteModal = /** @class */ (function (_super) {
    __extends(NoteModal, _super);
    function NoteModal(app, note, onSubmit) {
        var _this = _super.call(this, app) || this;
        _this.note = note;
        _this.onSubmit = onSubmit;
        return _this;
    }
    NoteModal.prototype.onOpen = function () {
        var _this = this;
        var contentEl = this.contentEl;
        contentEl.createEl("h2", { text: 'Type your note:' });
        var messageDiv = contentEl.createDiv();
        messageDiv.style.marginTop = "10px";
        messageDiv.style.padding = "10px";
        messageDiv.style.border = "1px solid #ccc";
        var tarea = new obsidian.TextAreaComponent(messageDiv)
            .setValue(this.note)
            .onChange(function (value) {
            _this.note = value;
        });
        //	})
        tarea.inputEl.style.height = "200px";
        tarea.inputEl.style.width = "100%";
        var buttonContainer2 = contentEl.createDiv();
        new obsidian.Setting(buttonContainer2)
            .addButton(function (btn) {
            return btn
                //new ButtonComponent(buttonContainer)
                .setButtonText("OK")
                .setCta()
                .onClick(function () {
                _this.close();
                _this.onSubmit(_this.note);
            });
        });
    };
    NoteModal.prototype.onClose = function () {
        var contentEl = this.contentEl;
        contentEl.empty();
    };
    return NoteModal;
}(obsidian.Modal));

//--------------------------------------------------------------------------------------------
var Template = /** @class */ (function () {
    function Template(gradeSet) {
        var _this = this;
        this.gradeSet = gradeSet;
        this.processPatterns = [
            { pattern: "%id%",
                process: function (old, stud) {
                    return old.replace("%id%", stud.data.get("id"));
                }
            },
            { pattern: "%name%",
                process: function (old, stud) {
                    return old.replace("%name%", stud.data.get("name"));
                }
            },
            { pattern: "%firstname%",
                process: function (old, stud) {
                    var fname = stud.data.get("fname");
                    if (fname == undefined) {
                        fname = stud.data.get("name");
                        if (fname.contains(",")) {
                            fname = fname.split(",")[1];
                        }
                        else {
                            fname = fname.split(" ")[0];
                        }
                    }
                    return old.replace("%firstname%", fname);
                }
            },
            { pattern: "%lastname%",
                process: function (old, stud) {
                    var lname = stud.data.get("lname");
                    if (lname == undefined) {
                        lname = stud.data.get("name");
                        if (lname.contains(",")) {
                            lname = lname.split(",")[0];
                        }
                        else {
                            lname = lname.split(" ")[1];
                        }
                    }
                    return old.replace("%lastname%", lname);
                }
            },
            { pattern: "%emailaddress%",
                process: function (old, stud) {
                    return old.replace("%emailaddress%", stud.data.get("emailaddress"));
                }
            },
            { pattern: "%title%",
                process: function (old, stud) {
                    return old.replace("%title%", gradeSet.properties.get("title"));
                }
            },
            { pattern: "%absencenumber%",
                process: function (old, stud) {
                    return old.replace("%absencenumber%", stud.absences.length.toString());
                }
            },
            { pattern: "%absencelist%",
                process: function (old, stud) {
                    var abNote = "";
                    if (stud.absences.length > 0) {
                        for (var i = 0; i < stud.absences.length; i++) {
                            abNote += " - " + stud.absences[i].toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" }) + "\n";
                        }
                    }
                    else {
                        abNote = "No absences";
                    }
                    return old.replace("%absencelist%", abNote);
                }
            },
            { pattern: "%absencelistifnonzero%",
                process: function (old, stud) {
                    var abNote = "";
                    if (stud.absences.length > 0) {
                        for (var i = 0; i < stud.absences.length; i++) {
                            abNote += " - " + stud.absences[i].toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" }) + "\n";
                        }
                    }
                    else {
                        abNote = "";
                    }
                    return old.replace("%absencelistifnonzero%", abNote);
                }
            },
            { pattern: "%counter:",
                process: function (old, stud) {
                    var regex = /%counter:(.*?)%/g;
                    var matches = old.match(regex);
                    if (matches == null)
                        return old;
                    matches.forEach(function (match) {
                        var sides = match.split(":");
                        console.log("Counter: " + sides[1]);
                        var cname = sides[1].replace("%", "");
                        var value = stud.getCounter(cname.trim());
                        if (value == null)
                            old = old.replace("%counter:" + sides[1], "ERROR");
                        else
                            old = old.replace("%counter:" + sides[1], value.value.toString());
                    });
                    return old;
                }
            },
            { pattern: "%categorylist%",
                process: function (old, stud) {
                    var catNote = "";
                    if (gradeSet.categories != null) {
                        gradeSet.categories.forEach(function (cat) {
                            catNote += "### " + cat.name + " (weight is " + (cat.weight * 100) + "%)\n";
                            if (cat.scoreSet !== undefined && cat.scoreSet.length > 0) {
                                cat.scoreSet.forEach(function (score) {
                                    catNote += "- **" + score.name + "**: ";
                                    var studentScore = stud.get(cat, score.name);
                                    if (typeof studentScore == 'undefined')
                                        studentScore = 0;
                                    catNote += "" + studentScore + " / " + score.value + "\n";
                                });
                            }
                            else {
                                catNote += "> NO SCORES\n";
                            }
                            catNote += "\n";
                        });
                    }
                    return old.replace("%categorylist%", catNote);
                }
            },
            { pattern: "%category:",
                process: function (old, stud) {
                    var regex = /%category:(.*?)%/g;
                    var matches = old.match(regex);
                    if (matches == null)
                        return old;
                    matches.forEach(function (match) {
                        var sides = match.split(":");
                        var cname = sides[1].replace("%", "");
                        var cat = gradeSet.getCategory({ name: cname });
                        var markdown = "";
                        if (cat == null) {
                            var markdown_1 = "** " + cname + " **\n";
                            if (cat.scoreSet !== undefined && cat.scoreSet.length > 0) {
                                cat.scoreSet.forEach(function (score) {
                                    markdown_1 += "> - **" + score.name + "**: ";
                                    var studentScore = _this.get(cat, score.name);
                                    if (typeof studentScore == 'undefined')
                                        studentScore = 0;
                                    markdown_1 += "" + studentScore + " / " + score.value + "\n";
                                });
                            }
                            else {
                                markdown_1 += "> NO SCORES\n";
                            }
                        }
                        if (cat == null)
                            old = old.replace("%category:" + sides[1], "ERROR");
                        else
                            old = old.replace("%category:" + sides[1], markdown);
                    });
                    return old;
                }
            },
            { pattern: "%scorelist%",
                process: function (old, stud) {
                    return "title";
                }
            },
            { pattern: "%score:",
                process: function (old, stud) {
                    return old;
                }
            },
            { pattern: "%finalscore%",
                process: function (old, stud) {
                    var final = gradeSet.finalScore(stud);
                    var gra = Utilities.fixToPlaces(final);
                    if (!gradeSet.allCategoriesHaveScores()) {
                        gra += " (" + Utilities.fixToPlaces(final / gradeSet.weightTotal()) + "%)";
                    }
                    return old.replace("%finalscore%", gra);
                }
            },
            { pattern: "%image%",
                process: function (old, stud) {
                    return old.replace("%image%", stud.data.get("image"));
                }
            },
            { pattern: "%date%",
                process: function (old, stud) {
                    var dt = new Date().toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" });
                    return old.replace("%date%", dt);
                }
            },
        ];
    }
    Template.prototype.process = function (message, student) {
        if (message == undefined)
            return "";
        this.processPatterns.map(function (pattern) {
            //console.log("Checking "+pattern.pattern);
            if (message.contains(pattern.pattern)) {
                message = pattern.process(message, student);
            }
            //console.log("Message is now "+message);
        });
        console.log(message);
        return message;
    };
    return Template;
}());

/**
 * drawdown.js
 * (c) Adam Leggett
 * https://github.com/adamvleggett/drawdown
 */


function markdown(src) {

    var rx_lt = /</g;
    var rx_gt = />/g;
    var rx_space = /\t|\r|\uf8ff/g;
    var rx_escape = /\\([\\\|`*_{}\[\]()#+\-~])/g;
    var rx_hr = /^([*\-=_] *){3,}$/gm;
    var rx_blockquote = /\n *&gt; *([^]*?)(?=(\n|$){2})/g;
    var rx_list = /\n( *)(?:[*\-+]|((\d+)|([a-z])|[A-Z])[.)]) +([^]*?)(?=(\n|$){2})/g;
    var rx_listjoin = /<\/(ol|ul)>\n\n<\1>/g;
    var rx_highlight = /(^|[^A-Za-z\d\\])(([*_])|(~)|(\^)|(--)|(\+\+)|`)(\2?)([^<]*?)\2\8(?!\2)(?=\W|_|$)/g;
    var rx_code = /\n((```|~~~).*\n?([^]*?)\n?\2|((    .*?\n)+))/g;
    var rx_link = /((!?)\[(.*?)\]\((.*?)( ".*")?\)|\\([\\`*_{}\[\]()#+\-.!~]))/g;
    var rx_table = /\n(( *\|.*?\| *\n)+)/g;
    var rx_thead = /^.*\n( *\|( *\:?-+\:?-+\:? *\|)* *\n|)/;
    var rx_row = /.*\n/g;
    var rx_cell = /\||(.*?[^\\])\|/g;
    var rx_heading = /(?=^|>|\n)([>\s]*?)(#{1,6}) (.*?)( #*)? *(?=\n|$)/g;
    var rx_para = /(?=^|>|\n)\s*\n+([^<]+?)\n+\s*(?=\n|<|$)/g;
    var rx_stash = /-\d+\uf8ff/g;

    function replace(rex, fn) {
        src = src.replace(rex, fn);
    }

    function element(tag, content) {
        return '<' + tag + '>' + content + '</' + tag + '>';
    }

    function blockquote(src) {
        return src.replace(rx_blockquote, function(all, content) {
            return element('blockquote', blockquote(highlight(content.replace(/^ *&gt; */gm, ''))));
        });
    }

    function list(src) {
        return src.replace(rx_list, function(all, ind, ol, num, low, content) {
            var entry = element('li', highlight(content.split(
                RegExp('\n ?' + ind + '(?:(?:\\d+|[a-zA-Z])[.)]|[*\\-+]) +', 'g')).map(list).join('</li><li>')));

            return '\n' + (ol
                ? '<ol start="' + (num
                    ? ol + '">'
                    : parseInt(ol,36) - 9 + '" style="list-style-type:' + (low ? 'low' : 'upp') + 'er-alpha">') + entry + '</ol>'
                : element('ul', entry));
        });
    }

    function highlight(src) {
        return src.replace(rx_highlight, function(all, _, p1, emp, sub, sup, small, big, p2, content) {
            return _ + element(
                  emp ? (p2 ? 'strong' : 'em')
                : sub ? (p2 ? 's' : 'sub')
                : sup ? 'sup'
                : small ? 'small'
                : big ? 'big'
                : 'code',
                highlight(content));
        });
    }

    function unesc(str) {
        return str.replace(rx_escape, '$1');
    }

    var stash = [];
    var si = 0;

    src = '\n' + src + '\n';

    replace(rx_lt, '&lt;');
    replace(rx_gt, '&gt;');
    replace(rx_space, '  ');

    // blockquote
    src = blockquote(src);

    // horizontal rule
    replace(rx_hr, '<hr/>');

    // list
    src = list(src);
    replace(rx_listjoin, '');

    // code
    replace(rx_code, function(all, p1, p2, p3, p4) {
        stash[--si] = element('pre', element('code', p3||p4.replace(/^    /gm, '')));
        return si + '\uf8ff';
    });

    // link or image
    replace(rx_link, function(all, p1, p2, p3, p4, p5, p6) {
        stash[--si] = p4
            ? p2
                ? '<img src="' + p4 + '" alt="' + p3 + '"/>'
                : '<a href="' + p4 + '">' + unesc(highlight(p3)) + '</a>'
            : p6;
        return si + '\uf8ff';
    });

    // table
    replace(rx_table, function(all, table) {
        var sep = table.match(rx_thead)[1];
        return '\n' + element('table',
            table.replace(rx_row, function(row, ri) {
                return row == sep ? '' : element('tr', row.replace(rx_cell, function(all, cell, ci) {
                    return ci ? element(sep && !ri ? 'th' : 'td', unesc(highlight(cell || ''))) : ''
                }))
            })
        )
    });

    // heading
    replace(rx_heading, function(all, _, p1, p2) { return _ + element('h' + p1.length, unesc(highlight(p2))) });

    // paragraph
    replace(rx_para, function(all, content) { return element('p', unesc(highlight(content))) });

    // stash
    replace(rx_stash, function(all) { return stash[parseInt(all)] });

    return src.trim();
}

var VIEW_TYPE_STUDENT = "student-view";
var PREVIEW_MODE = 2;
var EDITING_MODE = 1;
var StudentView = /** @class */ (function (_super) {
    __extends(StudentView, _super);
    function StudentView(leaf, plugin, gradeSet) {
        var _this = _super.call(this, leaf) || this;
        // get the new file contents
        _this.getViewData = function () {
            return _this.codeMirror.getValue();
        };
        // set the file contents
        _this.setViewData = function (data, clear) {
            console.log("SETVIEWDATA");
            console.log(data);
            if (clear) {
                _this.codeMirror.swapDoc(CodeMirror.Doc(data, "text/x-grd"));
            }
            else {
                _this.codeMirror.setValue(data);
            }
            _this.studentData = data;
        };
        // clear the view content
        _this.clear = function () {
            _this.codeMirror.setValue('');
            _this.codeMirror.clearHistory();
        };
        _this.navigation = true;
        _this.plugin = plugin;
        _this.gradeSet = gradeSet;
        // create code mirror instance
        _this.codeMirror = CodeMirror(_this.extContentEl, {
            theme: "obsidian"
        });
        // register the changes event
        //this.codeMirror.on('change', this.changed);
        _this.mode = EDITING_MODE;
        _this.dataChanged = false;
        _this.whatifmode = false;
        return _this;
    }
    Object.defineProperty(StudentView.prototype, "extContentEl", {
        // this.contentEl is not exposed, so cheat a bit.
        get: function () {
            // @ts-ignore
            return this.contentEl;
        },
        enumerable: false,
        configurable: true
    });
    StudentView.prototype.getViewType = function () {
        return VIEW_TYPE_STUDENT;
    };
    StudentView.prototype.getDisplayText = function () {
        return this.student == undefined ? "" : this.student.data.get("name");
    };
    StudentView.prototype.onOpen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log("StudentView onOpen");
                this.gradeSet = this.plugin.gradeSet;
                this.student = this.plugin.currentStudent;
                console.log(this.student.noteData);
                this.studentData = this.student.noteData; //await this.app.vault.read(this.student.sourceFile);
                this.codeMirror.setValue(this.studentData);
                console.log("StudentView data: " + this.studentData);
                this.previewElement = this.addAction("lucide-book-open", "preview", function () {
                    _this.setPreviewMode();
                });
                this.editElement = this.addAction("lucide-edit-3", "edit", function () {
                    _this.setEditingMode();
                });
                this.addAction("file-text", "add note", function () {
                    new NoteModal(_this.app, _this.student.notes, function (note) {
                        _this.student.setNotes(note);
                        _this.studentData = _this.studentData.replace(/#note.*/g, "");
                        console.log(_this.studentData);
                        var notesArray = note.split("\n");
                        notesArray.forEach(function (nte) {
                            _this.studentData += "#note " + nte + "\n";
                        });
                        //this.studentData += "#note "+note+"\n";
                        console.log(_this.studentData);
                        _this.plugin.gradeSet.modified = true;
                        _this.dataChanged = true;
                        _this.redisplay();
                    }).open();
                });
                if (new Emailer().emailWorks) {
                    this.addAction("lucide-mail", "email", function () { return __awaiter(_this, void 0, void 0, function () {
                        var fields;
                        var _this = this;
                        return __generator(this, function (_a) {
                            if (this.student.data.get("emailaddress") == undefined) {
                                new Alert(this.plugin, "No Address", "There is no email address defined for this student.").open();
                                return [2 /*return*/];
                            }
                            else {
                                fields = this.plugin.settings;
                                fields.defaultto = this.student.data.get("emailaddress");
                                new EmailerModal(this.app, fields, function (message, from, address, subject) {
                                    new Emailer().sendmail(_this.student.data.get("emailaddress"), from, subject, message, _this.plugin.settings, console.log);
                                }).open();
                            }
                            return [2 /*return*/];
                        });
                    }); });
                }
                if (this.gradeSet.counters.length > 0)
                    this.addAction("lucide-calculator", "counters", function () {
                        if (_this.gradeSet.counters.length == 0) {
                            new Alert(_this.plugin, "No Counters", "There are no counters defined in this grade set.").open();
                            return;
                        }
                        else {
                            new CounterTick(_this.plugin.app, _this.student, function (counter) {
                                _this.student.updateCounter(counter);
                                _this.gradeSet.modified = true;
                                _this.redisplay();
                            }).open();
                        }
                    });
                this.addAction("lucide-bed", "new absence", function () {
                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth() + 1;
                    var yyyy = today.getFullYear();
                    _this.studentData += "\n#absence " + mm + "/" + dd + "/" + yyyy;
                    _this.setViewData(_this.studentData, true);
                    _this.student.configureFromData(_this.studentData);
                    _this.plugin.gradeSet.modified = true;
                    _this.dataChanged = true;
                    _this.redisplay();
                    //new Alert(this.plugin, "Absence Added", "An absence has been added to this student.").open();
                });
                this.mode = EDITING_MODE; // force view to generate preview first
                this.dataChanged = false;
                this.setPreviewMode();
                return [2 /*return*/];
            });
        });
    };
    StudentView.prototype.onPaneMenu = function (menu, source, callSuper) {
        var _this = this;
        if (source !== 'more-options') {
            _super.prototype.onPaneMenu.call(this, menu, source);
            return;
        }
        // Add a menu item to force the board to markdown view
        if (new Emailer().emailWorks) {
            menu
                .addItem(function (item) {
                item
                    .setTitle('Email student scores')
                    .setIcon('lucide-file-text')
                    .setSection('pane')
                    .onClick(function () { return __awaiter(_this, void 0, void 0, function () {
                    var template, pos, tfile, email, studentNote, html, dt, subject;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                template = this.plugin.settings.template;
                                if (!(template !== undefined && template.length > 0)) return [3 /*break*/, 2];
                                pos = template.indexOf(this.app.vault.adapter.basePath);
                                if (pos >= 0)
                                    template = template.replace(this.app.vault.adapter.basePath + "\\", "");
                                template = template.replace(/\\/g, "/");
                                console.log(template);
                                tfile = this.app.vault.getAbstractFileByPath(template);
                                console.log(tfile);
                                return [4 /*yield*/, app.vault.read(tfile)];
                            case 1:
                                template = _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                template = "";
                                _a.label = 3;
                            case 3:
                                email = new Emailer();
                                studentNote = "";
                                if (template.length > 0) {
                                    studentNote = (new Template(this.gradeSet)).process(template, this.student);
                                }
                                else {
                                    studentNote = this.student.generateMarkdown(this.gradeSet);
                                }
                                console.log(studentNote);
                                html = markdown(studentNote);
                                console.log(html);
                                email.setMessageHTML(html);
                                dt = new Date().toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" });
                                subject = "Your scores in " + this.gradeSet.properties.get("title") + " as of " + dt;
                                email.sendmail(this.student.data.get("emailaddress"), this.plugin.settings.from, subject, "", this.plugin.settings, console.log);
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        }
        menu
            .addItem(function (item) {
            item
                .setTitle('Delete student')
                .setIcon('file-x')
                .setSection('pane')
                .onClick(function () {
                new Dialog(_this.plugin, "Delete Student", "Type DELETE if you want to delete this student.", "Delete", "Cancel", function (str) {
                    if (str == "DELETE") {
                        _this.plugin.gradeSet.deleteStudent(_this.student);
                        _this.plugin.gradeSet.modified = true;
                        // change the file name
                        var newName = _this.student.sourceFile.path.replace(".md", ".del");
                        try {
                            _this.plugin.app.vault.rename(_this.student.sourceFile, newName);
                        }
                        catch (e) {
                            var file = new obsidian.TFile();
                            file.path = newName;
                            _this.plugin.app.vault.delete(file);
                            _this.plugin.app.vault.rename(_this.student.sourceFile, newName);
                        }
                        //close();
                    }
                }).open();
            });
        });
        menu
            .addItem(function (item) {
            item
                .setTitle('What if mode')
                .setIcon('shield-question')
                .setSection('pane')
                .onClick(function () {
                _this.whatifmode = !_this.whatifmode;
                _this.redisplay();
            });
        });
        // Add a "Close" if we are on a mobile device
        if (obsidian.Platform.isMobile) {
            menu
                .addItem(function (item) {
                item
                    .setTitle('Close')
                    .setIcon('cross')
                    .onClick(function () {
                    _this.close();
                });
            });
        }
    };
    StudentView.prototype.redisplay = function () {
        if (this.mode == PREVIEW_MODE) {
            this.container = this.containerEl.children[1];
            this.container.empty();
            var div = this.container.createEl("div", { cls: "view-style" });
            var studentNote = this.student.generateMarkdown(this.gradeSet);
            obsidian.MarkdownRenderer.render(this.app, studentNote, div, null, null);
        }
        else {
            this.codeMirror.setValue(this.studentData);
        }
    };
    StudentView.prototype.setPreviewMode = function () {
        if (this.mode == PREVIEW_MODE)
            return;
        this.mode = PREVIEW_MODE;
        this.studentData = this.codeMirror.getValue();
        if (typeof this.student == 'undefined')
            this.student = new Student(null);
        this.student.configureFromData(this.studentData);
        this.container = this.containerEl.children[1];
        this.container.empty();
        var div = this.container.createEl("div", { cls: "view-style" });
        var studentNote = this.student.generateMarkdown(this.gradeSet);
        obsidian.MarkdownRenderer.render(this.app, studentNote, div, null, null);
        this.editElement.show();
        this.previewElement.hide();
    };
    StudentView.prototype.setEditingMode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.mode == EDITING_MODE)
                    return [2 /*return*/];
                this.mode = EDITING_MODE;
                this.container.empty();
                this.codeMirror = CodeMirror(this.extContentEl, {
                    theme: "obsidian"
                });
                this.codeMirror.on('change', function (instance) {
                    _this.dataChanged = true;
                    _this.studentData = _this.getViewData();
                });
                this.setViewData(this.studentData, true);
                this.plugin.gradeSet.modified = true;
                this.editElement.hide();
                this.previewElement.show();
                return [2 /*return*/];
            });
        });
    };
    StudentView.prototype.onClose = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("StudentView Closing");
                console.log(this.whatifmode);
                if (this.dataChanged && !this.whatifmode) {
                    if (this.mode == EDITING_MODE) {
                        console.log("StudentView Data Changed");
                        //this.studentData = this.getViewData();
                        console.log(this.studentData);
                        this.student.configureFromData(this.studentData);
                    }
                    this.gradeSet.writeGradeSet();
                }
                this.app.workspace.detachLeavesOfType(VIEW_TYPE_STUDENT);
                this.plugin.gradeBoxView.display();
                return [2 /*return*/];
            });
        });
    };
    StudentView.prototype.setViewState = function (viewstate, data) {
        console.log("STUDENTVIEW SetViewstate");
        console.log(viewstate);
    };
    // when the view is resized, refresh CodeMirror (thanks Licat!)
    StudentView.prototype.onResize = function () {
        this.codeMirror.refresh();
    };
    // called on code mirror changes
    StudentView.prototype.changed = function (instance) {
        console.log("DATA CHANGED");
        this.dataChanged = true;
        this.studentData = this.getViewData();
    };
    return StudentView;
}(obsidian.ItemView));

var AddAbsenceModal = /** @class */ (function (_super) {
    __extends(AddAbsenceModal, _super);
    function AddAbsenceModal(app, gradeSet, callbackOnClose) {
        var _this = _super.call(this, app) || this;
        _this.gradeSet = gradeSet;
        _this.callbackOnClose = callbackOnClose;
        _this.absences = [];
        _this.fields = [];
        return _this;
    }
    AddAbsenceModal.prototype.onOpen = function () {
        var _this = this;
        var contentEl = this.contentEl;
        contentEl.createEl("h2", { text: 'New Absence' });
        var presentSetting = new obsidian.Setting(contentEl)
            .setName("Count present")
            .addToggle(function (toggle) {
            toggle
                .setValue(false)
                .onChange(function (value) {
                _this.fields.forEach(function (toggle) {
                    toggle.setValue(!toggle.getValue());
                });
            });
            _this.present = toggle;
        });
        presentSetting.nameEl.style.fontWeight = "bold";
        presentSetting.nameEl.style.fontStyle = "italic";
        this.gradeSet.students.forEach(function (stud) {
            var docfragment = (stud.data.get("image") !== undefined)
                ? "<img src=" + stud.data.get("image") + " width=40> " + stud.data.get("name")
                : stud.data.get("name");
            var setting = new obsidian.Setting(contentEl)
                .setName("NAME")
                .addToggle(function (toggle) {
                toggle
                    .setValue(false)
                    .onChange(function (value) {
                });
                _this.fields.push(toggle);
            });
            setting.nameEl.innerHTML = docfragment;
        });
        new obsidian.Setting(contentEl)
            .addButton(function (btn) {
            return btn
                .setButtonText("OK")
                .setCta()
                .onClick(function () {
                var now = new Date();
                _this.fields.forEach(function (toggle) {
                    if (_this.present.getValue()) {
                        if (toggle.getValue())
                            _this.absences.push(undefined);
                        else
                            _this.absences.push(now);
                    }
                    else {
                        if (toggle.getValue())
                            _this.absences.push(now);
                        else
                            _this.absences.push(undefined);
                    }
                });
                _this.callbackOnClose(_this.absences);
                _this.close();
            });
        });
    };
    return AddAbsenceModal;
}(obsidian.Modal));

var NewReminderModal = /** @class */ (function (_super) {
    __extends(NewReminderModal, _super);
    function NewReminderModal(app, callbackOnClose) {
        var _this = _super.call(this, app) || this;
        _this.callbackOnClose = callbackOnClose;
        _this.reminder = null;
        _this.text = "";
        _this.date = "";
        _this.repeat = "0";
        _this.prior = "0";
        return _this;
    }
    NewReminderModal.prototype.onOpen = function () {
        var _this = this;
        var contentEl = this.contentEl;
        contentEl.createEl("h2", { text: 'New Reminder' });
        new obsidian.Setting(contentEl)
            .setName("Text")
            .addText(function (text) {
            return text
                .setValue("")
                .onChange(function (value) {
                _this.text = value;
            });
        });
        var now = new Date();
        var today = now.toLocaleDateString('en-us', { year: "numeric", month: "numeric", day: "numeric" });
        this.date = today;
        new obsidian.Setting(contentEl)
            .setName("Starting Date")
            .addText(function (text) {
            return text
                .setValue(today)
                .onChange(function (value) {
                _this.date = value;
            });
        });
        new obsidian.Setting(contentEl)
            .setName("Repeat in Days")
            .addText(function (text) {
            return text
                .setValue(_this.repeat)
                .onChange(function (value) {
                _this.repeat = value;
            });
        });
        new obsidian.Setting(contentEl)
            .setName("Reminder Days Before")
            .addText(function (text) {
            return text
                .setValue(_this.prior)
                .onChange(function (value) {
                _this.prior = value;
            });
        });
        new obsidian.Setting(contentEl)
            .addButton(function (btn) {
            return btn
                .setButtonText("OK")
                .setCta()
                .onClick(function () {
                _this.close();
                var rem = new Reminder(_this.text, new Date(_this.date), parseInt(_this.repeat), parseInt(_this.prior));
                console.log(rem);
                _this.callbackOnClose(rem);
            });
        });
    };
    return NewReminderModal;
}(obsidian.Modal));

var NewScoreModal = /** @class */ (function (_super) {
    __extends(NewScoreModal, _super);
    function NewScoreModal(app, gradeSet, callbackOnClose) {
        var _this = _super.call(this, app) || this;
        _this.gradeSet = gradeSet;
        _this.callbackOnClose = callbackOnClose;
        _this.scores = new Map;
        _this.name = "";
        _this.possible = 0;
        _this.catname = (gradeSet.categories == undefined || gradeSet.categories == null || gradeSet.categories.length == 0)
            ? "no categories"
            : gradeSet.categories[0].name;
        return _this;
    }
    NewScoreModal.prototype.onOpen = function () {
        var _this = this;
        var contentEl = this.contentEl;
        contentEl.createEl("h2", { text: 'New Score' });
        this.field = 0;
        this.enterhandler = this.scope.register([], "Enter", function () {
            _this.fields[_this.field].inputEl.focus();
            _this.fields[_this.field].inputEl.select();
            _this.field++;
        });
        new obsidian.Setting(contentEl)
            .setName("Name")
            .addText(function (text) {
            return text
                .setValue("")
                .onChange(function (value) {
                _this.name = value;
            });
        });
        this.possibleField = new obsidian.Setting(contentEl)
            .setName("Total Possible")
            .addText(function (text) {
            return text
                .setValue("")
                .onChange(function (value) {
                _this.possible = value;
            });
        });
        var catDropdown = new obsidian.Setting(contentEl)
            .setName("Category")
            .addDropdown(function (drop) { return drop
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.catname = value;
                return [2 /*return*/];
            });
        }); }); });
        this.gradeSet.categories.forEach(function (cat) {
            catDropdown.components[0].addOption(cat.name, cat.name);
            catDropdown.components[0].setValue(cat.name);
        });
        catDropdown.components[0].setValue(this.gradeSet.categories[0].name);
        // Utility buttons
        this.ec = false;
        var ect = new obsidian.Setting(contentEl)
            .addToggle(function (cb) {
            return cb
                .onChange(function (value) {
                _this.ec = value;
            });
        });
        ect.nameEl.innerHTML = "Extra Credit?";
        new obsidian.Setting(contentEl)
            .addButton(function (btn) {
            return btn
                .setButtonText("Fill Down")
                .setCta()
                .onClick(function () {
                _this.fields.forEach(function (field) {
                    field.setValue("" + _this.possible);
                });
                console.log(Object.keys(_this.scores));
                _this.scores.forEach(function (value, key) {
                    _this.scores.set(key, _this.possible);
                });
                console.log(_this.scores);
            });
        });
        // Students
        this.fields = [];
        this.gradeSet.students.forEach(function (stud) {
            _this.scores.set(stud.data.get("name"), 0);
            new obsidian.Setting(contentEl)
                .setName(stud.data.get("name"))
                .addText(function (text) {
                text
                    .setValue("0")
                    .onChange(function (value) {
                    var num = value;
                    _this.scores.set(stud.data.get("name"), num);
                    console.log("SETTING " + stud.data.get("name") + " to " + num);
                });
                _this.fields.push(text);
            });
        });
        new obsidian.Setting(contentEl)
            .addButton(function (btn) {
            return btn
                .setButtonText("OK")
                .setCta()
                .onClick(function () {
                console.log(_this.scores);
                _this.gradeSet.addScore(_this.name, _this.possible, _this.ec, _this.catname, _this.scores);
                _this.close();
                _this.callbackOnClose();
            });
        });
    };
    NewScoreModal.prototype.onClose = function () {
        this.scope.unregister(this.enterhandler);
    };
    return NewScoreModal;
}(obsidian.Modal));

var NewStudentModal = /** @class */ (function (_super) {
    __extends(NewStudentModal, _super);
    function NewStudentModal(app, callbackOnClose) {
        var _this = _super.call(this, app) || this;
        _this.newStudent = null;
        _this.callbackOnClose = callbackOnClose;
        return _this;
    }
    NewStudentModal.prototype.onOpen = function () {
        var _this = this;
        var contentEl = this.contentEl;
        contentEl.createEl("h2", { text: 'New Student' });
        new obsidian.Setting(contentEl)
            .setName("Name")
            .addText(function (text) {
            return text
                .setValue("")
                .onChange(function (value) {
                _this.name = value;
            });
        });
        new obsidian.Setting(contentEl)
            .setName("ID")
            .addText(function (text) {
            return text
                .setValue("")
                .onChange(function (value) {
                _this.id = value;
            });
        });
        new obsidian.Setting(contentEl)
            .setName("Nickname")
            .addText(function (text) {
            return text
                .setValue("")
                .onChange(function (value) {
                _this.nickname = value;
            });
        });
        new obsidian.Setting(contentEl)
            .setName("Email address")
            .addText(function (text) {
            return text
                .setValue("")
                .onChange(function (value) {
                _this.emailaddress = value;
            });
        });
        new obsidian.Setting(contentEl)
            .setName("Mobile phone number")
            .addText(function (text) {
            return text
                .setValue("")
                .onChange(function (value) {
                _this.mobilePhoneNumber = value;
            });
        });
        new obsidian.Setting(contentEl)
            .addButton(function (btn) {
            return btn
                .setButtonText("OK")
                .setCta()
                .onClick(function () {
                if (_this.name === undefined) {
                    new obsidian.Notice("You must enter a student name.", 5000);
                }
                else if (_this.id === undefined) {
                    new obsidian.Notice("You must enter a student ID.", 5000);
                }
                else {
                    _this.close();
                }
            });
        });
    };
    NewStudentModal.prototype.onClose = function () {
        if (this.name === undefined || this.id === undefined)
            return;
        console.log(this);
        var obj = {
            name: this.name,
            id: this.id,
            emailaddress: this.emailaddress,
            nickname: this.nickname,
            mobilephonenumber: this.mobilePhoneNumber
        };
        this.newStudent = new Student(obj);
        console.log(this.newStudent);
        if (this.newStudent === undefined)
            return;
        this.callbackOnClose(this.newStudent);
    };
    NewStudentModal.prototype.getStudent = function () {
        return this.newStudent;
    };
    return NewStudentModal;
}(obsidian.Modal));

// Stolen from https://github.com/helloitsian/custom-modals-obsidian/blob/main/src/modal/CustomModal.ts
var Progress = /** @class */ (function (_super) {
    __extends(Progress, _super);
    function Progress(plugin, title, label, increment) {
        var _this = _super.call(this, plugin.app) || this;
        _this.plugin = plugin;
        _this.title = title;
        _this.label = label;
        _this.increment = increment;
        return _this;
    }
    Progress.prototype.onOpen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contentEl;
            var _this = this;
            return __generator(this, function (_a) {
                new obsidian.Notice(this.label);
                contentEl = this.contentEl;
                contentEl.createEl("form", {}, function (form) {
                    var titleDiv = form.createDiv();
                    titleDiv.createEl("h2", { text: _this.title });
                    titleDiv.createEl("hr");
                    _this.bar = titleDiv.createEl("progress", { attr: { value: _this.increment, max: "100", width: "100%" } });
                });
                return [2 /*return*/];
            });
        });
    };
    Progress.prototype.update = function () {
        var intvalue = parseInt(this.bar.getAttribute("value"));
        intvalue += parseInt(this.increment);
        this.bar.setAttribute("value", intvalue.toString());
    };
    Progress.prototype.onClose = function () {
        var contentEl = this.contentEl;
        contentEl.empty();
    };
    return Progress;
}(obsidian.Modal));

var ReminderPopup = /** @class */ (function (_super) {
    __extends(ReminderPopup, _super);
    function ReminderPopup(plugin, reminder, dismiss) {
        var _this = _super.call(this, plugin.app) || this;
        _this.plugin = plugin;
        _this.reminder = reminder;
        _this.dismissCallback = dismiss;
        return _this;
    }
    ReminderPopup.prototype.onOpen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contentEl;
            var _this = this;
            return __generator(this, function (_a) {
                contentEl = this.contentEl;
                contentEl.createEl("form", {}, function (form) {
                    var titleDiv = form.createDiv();
                    titleDiv.createEl("h2", { text: "Reminder" });
                    titleDiv.createEl("hr");
                    titleDiv.createEl("h3", { text: _this.reminder.text });
                    form.createDiv("alert-button-container", function (container) {
                        container
                            .createEl("button", { attr: { type: "button" }, text: "Dismiss" })
                            .addEventListener("click", function () {
                            _this.close();
                            _this.dismissCallback(_this.reminder);
                        });
                        container
                            .createEl("button", { attr: { type: "button", margin: "10px" }, text: "Close" })
                            .addEventListener("click", function () {
                            _this.close();
                        });
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    ReminderPopup.prototype.onClose = function () {
        var contentEl = this.contentEl;
        contentEl.empty();
    };
    return ReminderPopup;
}(obsidian.Modal));

// Taken from https://medium.com/swlh/semaphores-in-javascript-e415b0d684bc
var Semaphore = /** @class */ (function () {
    /**
     * Creates a semaphore that limits the number of concurrent Promises being handled
     * @param {*} maxConcurrentRequests max number of concurrent promises being handled at any time
     */
    function Semaphore(maxConcurrentRequests) {
        if (maxConcurrentRequests === void 0) { maxConcurrentRequests = 1; }
        this.currentRequests = [];
        this.runningRequests = 0;
        this.maxConcurrentRequests = maxConcurrentRequests;
    }
    /**
     * Returns a Promise that will eventually return the result of the function passed in
     * Use this to limit the number of concurrent function executions
     * @param {*} fnToCall function that has a cap on the number of concurrent executions
     * @param  {...any} args any arguments to be passed to fnToCall
     * @returns Promise that will resolve with the resolved value as if the function passed in was directly called
     */
    Semaphore.prototype.callFunction = function (fnToCall) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            _this.currentRequests.push({
                resolve: resolve,
                reject: reject,
                fnToCall: fnToCall,
                args: args,
            });
            _this.tryNext();
        });
    };
    Semaphore.prototype.tryNext = function () {
        var _this = this;
        if (!this.currentRequests.length) {
            return;
        }
        else if (this.runningRequests < this.maxConcurrentRequests) {
            var _a = this.currentRequests.shift(), resolve_1 = _a.resolve, reject_1 = _a.reject, fnToCall = _a.fnToCall, args = _a.args;
            this.runningRequests++;
            var req = fnToCall.apply(void 0, args);
            req.then(function (res) { return resolve_1(res); })
                .catch(function (err) { return reject_1(err); })
                .finally(function () {
                _this.runningRequests--;
                _this.tryNext();
            });
        }
    };
    return Semaphore;
}());
/* HOW TO USE */
// const throttler = new Semaphore(2);
// throttler.callFunction(fetch, 'www.facebook.com');
// throttler.callFunction(fetch, 'www.amazon.com');
// throttler.callFunction(fetch, 'www.netflix.com');
// throttler.callFunction(fetch, 'www.google.com');

var VIEW_TYPE_GRADEBOX = "gradebox-view";
var GradeboxView = /** @class */ (function (_super) {
    __extends(GradeboxView, _super);
    function GradeboxView(leaf, plugin) {
        var _this = _super.call(this, leaf) || this;
        _this.navigation = true;
        _this.workspaceleaf = leaf;
        _this.plugin = plugin;
        _this.displayText = (_this.plugin == undefined || _this.plugin.gradeSet == undefined || _this.plugin.gradeSet == null)
            ? _this.plugin.version
            : _this.plugin.gradeSet.properties.get("title");
        _this.filetypes = ["pdf", "docx", "txt", "xlsx"];
        _this.colorized = false;
        _this.register(_this.containerEl.onWindowMigrated(function () {
            console.log("windowMigrated");
        }));
        return _this;
    }
    GradeboxView.prototype.getViewType = function () {
        return VIEW_TYPE_GRADEBOX;
    };
    GradeboxView.prototype.getDisplayText = function () {
        return this.displayText;
    };
    GradeboxView.prototype.endsWith = function (str, suffixes) {
        for (var i = 0; i < suffixes.length; i++)
            if (str.endsWith(suffixes[i]))
                return true;
        return false;
    };
    // 1. Open the view
    GradeboxView.prototype.onOpen = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var width_1, filename, ogfilename, pos, path, taf, xml, xmlFile;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("Opening GradeBoxView");
                        console.log(this);
                        this.plugin.gradeBoxView = this;
                        this.container = this.containerEl.children[1];
                        this.container.empty();
                        this.container.addClass("class-style");
                        if (new Emailer().emailWorks) {
                            this.addAction("lucide-mail", "mail", function () { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    new EmailerModal(this.app, this.plugin.settings, function (message, from, address, subject, includeScores, filesDir) { return __awaiter(_this, void 0, void 0, function () {
                                        var progress_1, sendingDelay_1, semaphore_1, email, i, stud;
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            if (address == "#class") {
                                                progress_1 = new Progress(this.plugin, "Sending email", "GradeBox is a plugin for Obsidian Buddy", "10");
                                                progress_1.open();
                                                sendingDelay_1 = parseInt(this.plugin.settings.delay) * 1000;
                                                semaphore_1 = new Semaphore(1);
                                                this.gradeSet.students.forEach(function (stud) {
                                                    semaphore_1.callFunction(function () { return __awaiter(_this, void 0, void 0, function () {
                                                        var email, lname, i;
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0:
                                                                    email = new Emailer();
                                                                    if (filesDir !== undefined) {
                                                                        lname = stud.data.get("name");
                                                                        if (lname.contains(','))
                                                                            lname = lname.substring(0, lname.indexOf(','));
                                                                        if (lname.contains(' '))
                                                                            lname = lname.substring(lname.indexOf(' ') + 1);
                                                                        lname = lname.toLowerCase();
                                                                        console.log("lname = " + lname);
                                                                        for (i = 0; i < filesDir.length; i++) {
                                                                            if (this.endsWith(filesDir.item(i).name, this.filetypes) &&
                                                                                filesDir.item(i).name.startsWith(lname)) {
                                                                                email.addAttachment(filesDir.item(i).path, filesDir.item(i).name, "application/pdf");
                                                                            }
                                                                        }
                                                                    }
                                                                    message = (new Template(this.gradeSet)).process(message, stud);
                                                                    return [4 /*yield*/, email.sendmail(stud.data.get("emailaddress"), from, subject, message, this.plugin.settings, console.log)];
                                                                case 1:
                                                                    _a.sent();
                                                                    return [4 /*yield*/, Utilities.sleep(sendingDelay_1)];
                                                                case 2:
                                                                    _a.sent();
                                                                    progress_1.update();
                                                                    return [2 /*return*/];
                                                            }
                                                        });
                                                    }); });
                                                });
                                                progress_1.close();
                                                new Alert(this.plugin, "Email Sent", "All email messages sent.").open();
                                            }
                                            else {
                                                email = new Emailer();
                                                console.log(filesDir);
                                                if (filesDir !== undefined) {
                                                    for (i = 0; i < filesDir.length; i++) {
                                                        if (this.endsWith(filesDir.item(i).name, this.filetypes)) {
                                                            email.addAttachment(filesDir.item(i).path, filesDir.item(i).name, "application/pdf");
                                                        }
                                                    }
                                                }
                                                stud = this.gradeSet.getStudent({ emailaddress: address });
                                                if (stud !== undefined)
                                                    message = (new Template(this.gradeSet)).process(message, stud);
                                                email.sendmail(address, from, subject, message, this.plugin.settings, console.log);
                                            }
                                            return [2 /*return*/];
                                        });
                                    }); }).open();
                                    return [2 /*return*/];
                                });
                            }); });
                        }
                        this.addAction("lucide-signal", "sort", function (e) {
                            var sortMenu = new obsidian.Menu();
                            sortMenu.addItem(function (item) {
                                item.setTitle("Name Ascending")
                                    .setIcon("lucide-sort-ascending")
                                    .onClick(function () {
                                    _this.gradeSet.setSortMethod(_this.gradeSet.studentNamesAscending);
                                    _this.display();
                                });
                            });
                            sortMenu.addItem(function (item) {
                                item.setTitle("Name Descending")
                                    .setIcon("lucide-sort-ascending")
                                    .onClick(function () {
                                    _this.gradeSet.setSortMethod(_this.gradeSet.studentNamesDescending);
                                    _this.display();
                                });
                            });
                            sortMenu.addItem(function (item) {
                                item.setTitle("Score Ascending")
                                    .setIcon("lucide-sort-ascending")
                                    .onClick(function () {
                                    _this.gradeSet.setSortMethod(_this.gradeSet.studentScoresAscending);
                                    _this.display();
                                });
                            });
                            sortMenu.addItem(function (item) {
                                item.setTitle("Score Descending")
                                    .setIcon("lucide-sort-ascending")
                                    .onClick(function () {
                                    _this.gradeSet.setSortMethod(_this.gradeSet.studentScoresDescending);
                                    _this.display();
                                });
                            });
                            sortMenu.showAtMouseEvent(e);
                        });
                        this.addAction("lucide-palette", "colorize", function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                this.colorized = !this.colorized;
                                this.display();
                                return [2 /*return*/];
                            });
                        }); });
                        this.addAction("lucide-plus-circle", "Add a score", function () {
                            if (_this.gradeSet.categories.length == 0) {
                                new Alert(_this.plugin, "No Categories", "You must first create a category before adding a score.").open();
                                return;
                            }
                            new NewScoreModal(_this.app, _this.gradeSet, function () {
                                _this.gradeSet.writeGradeSet();
                                _this.display();
                            }).open();
                        });
                        this.addAction("lucide-calendar-plus", "Add an absence", function () {
                            new AddAbsenceModal(_this.app, _this.gradeSet, function (absences) {
                                _this.gradeSet.addAbsences(absences);
                                _this.gradeSet.writeGradeSet();
                                _this.display();
                            }).open();
                        });
                        this.gradeSet = (this.plugin !== undefined) ? this.plugin.gradeSet : null;
                        if (this.gradeSet == undefined || this.gradeSet == null) {
                            console.log("ERROR: GradeSet is undefined, closing GBV");
                            console.log(this.plugin);
                            this.onClose();
                        }
                        else {
                            this.displayText = this.gradeSet.properties.get("title");
                            this.plugin.registerEvent(this.app.workspace.on("resize", function () {
                                var newwidth = _this.containerEl.win.innerWidth;
                                //console.log("RESIZE EVENT: "+newwidth+" & "+width);
                                if (Math.abs(newwidth - width_1) > 300) {
                                    _this.container.empty();
                                    var div_1 = _this.container.createEl("div", { cls: "view-style" });
                                    newwidth = _this.containerEl.win.innerWidth;
                                    _this.gradeSet.display(div_1, newwidth);
                                    width_1 = newwidth;
                                }
                            }));
                            this.plugin.registerEvent(this.app.workspace.on("active-leaf-change", function () {
                                if (_this.gradeSet !== undefined && _this.gradeSet.modified)
                                    _this.display();
                            }));
                            this.container.createEl("div", { cls: "view-style" });
                            width_1 = this.containerEl.win.innerWidth;
                            this.statusbarElement = this.plugin.addStatusBarItem();
                            if (this.gradeSet != null) {
                                this.displayText = this.gradeSet.title;
                                this.display();
                                this.statusbarElement.setText("" + this.gradeSet.getStudents() + " students");
                            }
                        }
                        if (!(this.plugin.settings.whenToGenerate == "open")) return [3 /*break*/, 4];
                        console.log("Generating web server XML");
                        filename = this.plugin.settings.XMLfilename;
                        if (filename.length == 0) {
                            //new Alert(this.plugin, "No Filename", "No XML filename specified in settings").open();
                            return [2 /*return*/];
                        }
                        ogfilename = filename;
                        pos = filename.lastIndexOf("/");
                        path = null;
                        if (pos >= 0) {
                            path = this.app.vault.getAbstractFileByPath(filename.substring(0, pos));
                            filename = filename.substring(pos + 1);
                        }
                        else {
                            path = this.app.vault.getRoot();
                        }
                        if (!Utilities.fileExists(filename, path)) return [3 /*break*/, 2];
                        taf = this.app.vault.getAbstractFileByPath(ogfilename);
                        console.log("Trying to delete " + taf.path);
                        if (!(taf !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.app.vault.delete(taf)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        xml = this.gradeSet.generateXMLForWebServer();
                        return [4 /*yield*/, app.fileManager.createNewMarkdownFile((_a = app.workspace.getActiveFile()) === null || _a === void 0 ? void 0 : _a.path, ogfilename)];
                    case 3:
                        xmlFile = _b.sent();
                        this.app.vault.modify(xmlFile, xml);
                        _b.label = 4;
                    case 4:
                        // Reminders
                        if (this.gradeSet != null) {
                            this.gradeSet.reminders.forEach(function (reminder) {
                                console.log("Checking reminder: " + reminder.text);
                                if (reminder.isTriggered()) {
                                    console.log("Reminder triggered: " + reminder.text);
                                    new ReminderPopup(_this.plugin, reminder, function (rem) {
                                        _this.gradeSet.deleteReminder(rem);
                                        if (rem.repeat > 0) {
                                            rem.reset();
                                            _this.gradeSet.addReminder(rem);
                                        }
                                    }).open();
                                }
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    GradeboxView.prototype.onClose = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var filename, ogfilename, pos, path, taf, xml, xmlFile;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("Closing GradeBoxView");
                        if (this.gradeSet !== undefined) {
                            console.log("MODIFIED: " + this.gradeSet.modified);
                            if (this.gradeSet.modified)
                                this.gradeSet.writeGradeSet();
                            this.statusbarElement.setText("");
                        }
                        this.app.workspace.detachLeavesOfType(VIEW_TYPE_STUDENT);
                        this.app.workspace.detachLeavesOfType(VIEW_TYPE_GRADESET_SUMMARY);
                        this.app.workspace.detachLeavesOfType(VIEW_TYPE_GRADEBOX);
                        if (this.gradeSet == undefined)
                            return [2 /*return*/];
                        console.log("WHEN TO GENERATE: " + this.plugin.settings.whenToGenerate);
                        if (!(this.plugin.settings.whenToGenerate == "close")) return [3 /*break*/, 4];
                        console.log("Generating web server XML");
                        filename = this.gradeSet.properties.get("webfile");
                        if (filename == undefined || filename.length == 0) {
                            //new Alert(this.plugin, "No Filename", "No Web filename specified in settings").open();
                            return [2 /*return*/];
                        }
                        ogfilename = filename;
                        pos = filename.lastIndexOf("/");
                        path = null;
                        if (pos >= 0) {
                            path = this.app.vault.getAbstractFileByPath(filename.substring(0, pos));
                            filename = filename.substring(pos + 1);
                        }
                        else {
                            path = this.app.vault.getRoot();
                        }
                        if (!Utilities.fileExists(filename, path)) return [3 /*break*/, 2];
                        taf = this.app.vault.getAbstractFileByPath(ogfilename);
                        console.log("Trying to delete " + taf.path);
                        if (!(taf !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.app.vault.delete(taf)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        xml = this.gradeSet.generateXMLForWebServer();
                        return [4 /*yield*/, app.fileManager.createNewMarkdownFile((_a = app.workspace.getActiveFile()) === null || _a === void 0 ? void 0 : _a.path, ogfilename)];
                    case 3:
                        xmlFile = _b.sent();
                        this.app.vault.modify(xmlFile, xml);
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GradeboxView.prototype.CSVimport = function (rent, gs, file) {
        return __awaiter(this, void 0, void 0, function () {
            var pos, tfile, csvdata, objPattern, arrMatches, arrData, fieldModal, contentEl, setting, positions, column;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("USING " + file + " FOR IMPORT, Comparing to " + this.app.vault.adapter.basePath);
                        pos = file.indexOf(this.app.vault.adapter.basePath);
                        if (pos >= 0)
                            file = file.replace(this.app.vault.adapter.basePath + "\\", "");
                        file = file.replace(/\\/g, "/");
                        console.log(file);
                        tfile = this.app.vault.getAbstractFileByPath(file);
                        console.log(tfile);
                        return [4 /*yield*/, app.vault.read(tfile)];
                    case 1:
                        csvdata = _a.sent();
                        console.log(csvdata);
                        objPattern = new RegExp(("(\\,|\\r?\\n|\\r|^)(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|([^\\,\\r\\n]*))"), "gi");
                        arrMatches = null, arrData = [[]];
                        while (arrMatches = objPattern.exec(csvdata)) {
                            if (arrMatches[1].length && arrMatches[1] !== ",")
                                arrData.push([]);
                            arrData[arrData.length - 1].push(arrMatches[2] ?
                                arrMatches[2].replace(new RegExp("\"\"", "g"), "\"") :
                                arrMatches[3]);
                        }
                        fieldModal = new obsidian.Modal(this.app);
                        contentEl = fieldModal.contentEl;
                        contentEl.createEl("h2", { text: 'Choose fields to import' });
                        setting = [];
                        positions = {};
                        column = 0;
                        arrData[0].forEach(function (line) {
                            setting[column] =
                                new obsidian.Setting(contentEl)
                                    .setName(line)
                                    .addDropdown(function (text) { return text
                                    .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        positions[value] = column;
                                        return [2 /*return*/];
                                    });
                                }); })
                                    .addOption("ignored", "ignored")
                                    .addOption("first name", "first name")
                                    .addOption("last name", "last name")
                                    .addOption("full name", "full name")
                                    .addOption("ID", "ID")
                                    .addOption("email address", "email address")
                                    .setValue("ignored"); });
                            column++;
                        });
                        new obsidian.Setting(contentEl)
                            .addButton(function (btn) {
                            return btn
                                .setButtonText("Import")
                                .setCta()
                                .onClick(function () {
                                fieldModal.close();
                                // set up positions
                                for (var i = 0; i < setting.length; i++) {
                                    //console.log(setting[i]);
                                    var val = setting[i].components[0].getValue();
                                    if (val !== "ignored")
                                        positions[val] = i;
                                }
                                //// parse / import the file
                                //console.log(positions);
                                arrData.forEach(function (line) { return __awaiter(_this, void 0, void 0, function () {
                                    var stud, sname, studentFile, datastr;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                stud = new Student(null);
                                                sname = line[positions["full name"]];
                                                if (sname == undefined) {
                                                    sname = line[positions["last name"]] + ", " + line[positions["first name"]];
                                                }
                                                stud.data.set("name", sname.replaceAll('"', '').trim());
                                                stud.data.set("id", line[positions["ID"]].replaceAll('"', '').trim());
                                                stud.data.set("emailaddress", line[positions["email address"]].replaceAll('"', '').trim());
                                                stud.data.set("image", "https://plus.hope.edu/Photos/000" + line[positions["ID"]].replaceAll('"', '').trim() + '.jpg');
                                                console.log(stud);
                                                console.log(gs.sourceFolder);
                                                return [4 /*yield*/, app.fileManager.createNewMarkdownFile(gs.sourceFolder, stud.data.get("id"))];
                                            case 1:
                                                studentFile = _a.sent();
                                                datastr = "#name " + stud.data.get("name") + "\n" +
                                                    "#id " + stud.data.get("id") + "\n";
                                                if (stud.data.get("nickname") !== undefined)
                                                    datastr += "#nickname " + stud.data.get("nickname") + "\n";
                                                if (stud.data.get("emailaddress") !== undefined)
                                                    datastr += "#emailaddress " + stud.data.get("emailaddress") + "\n";
                                                if (stud.data.get("mobilePhoneNumber") !== undefined)
                                                    datastr += "#mobilePhoneNumber " + stud.data.get("mobilePhoneNumber") + "\n";
                                                if (stud.data.get("image") !== undefined)
                                                    datastr += "#image " + stud.data.get("image") + "\n";
                                                console.log(datastr);
                                                app.vault.append(studentFile, datastr);
                                                stud.setSourceFile(studentFile);
                                                gs.addStudent(stud);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                _this.display();
                            });
                        });
                        fieldModal.open();
                        return [2 /*return*/];
                }
            });
        });
    };
    GradeboxView.prototype.onPaneMenu = function (menu, source, callSuper) {
        var _this = this;
        if (callSuper === void 0) { callSuper = true; }
        if (source !== 'more-options') {
            _super.prototype.onPaneMenu.call(this, menu, source);
            return;
        }
        // Add a menu item to force the board to markdown view
        if (new Emailer().emailWorks) {
            menu
                .addItem(function (item) {
                item
                    .setTitle('Email student scores')
                    .setIcon('lucide-file-text')
                    .setSection('pane')
                    .onClick(function () { return __awaiter(_this, void 0, void 0, function () {
                    var template, pos, tfile, semaphore;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                template = this.plugin.settings.template;
                                if (!(template !== undefined && template.length > 0)) return [3 /*break*/, 4];
                                pos = template.indexOf(this.app.vault.adapter.basePath);
                                if (pos >= 0)
                                    template = template.replace(this.app.vault.adapter.basePath + "\\", "");
                                template = template.replace(/\\/g, "/");
                                console.log(template);
                                tfile = this.app.vault.getAbstractFileByPath(template);
                                console.log(tfile);
                                if (!(template !== null)) return [3 /*break*/, 2];
                                return [4 /*yield*/, app.vault.read(tfile)];
                            case 1:
                                template = _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                template = "";
                                _a.label = 3;
                            case 3: return [3 /*break*/, 5];
                            case 4:
                                template = "";
                                _a.label = 5;
                            case 5:
                                semaphore = new Semaphore(1);
                                this.gradeSet.students.forEach(function (stud) {
                                    var sendingDelay = parseInt(_this.plugin.settings.delay) * 1000;
                                    semaphore.callFunction(function () { return __awaiter(_this, void 0, void 0, function () {
                                        var email, studentNote, html, dt, subject;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    email = new Emailer();
                                                    studentNote = "";
                                                    if (template.length > 0) {
                                                        studentNote = (new Template(this.gradeSet)).process(template, stud);
                                                    }
                                                    else {
                                                        studentNote = stud.generateMarkdown(this.gradeSet);
                                                    }
                                                    console.log(studentNote);
                                                    html = markdown(studentNote);
                                                    console.log(html);
                                                    email.setMessageHTML(html);
                                                    dt = new Date().toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" });
                                                    subject = "Your scores in " + this.gradeSet.properties.get("title") + " as of " + dt;
                                                    email.sendmail(stud.data.get("emailaddress"), this.plugin.settings.from, subject, "", this.plugin.settings, console.log);
                                                    return [4 /*yield*/, Utilities.sleep(sendingDelay)];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        }
        menu
            .addItem(function (item) {
            item
                .setTitle('Generate score sheet')
                .setIcon('lucide-file-text')
                .setSection('pane')
                .onClick(function () { return __awaiter(_this, void 0, void 0, function () {
                var file, sheet, first, i;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, app.fileManager.createNewMarkdownFile((_a = app.workspace.getActiveFile()) === null || _a === void 0 ? void 0 : _a.path, /*this.gradeSet.properties.get("title")*/ "scoresheet.md")];
                        case 1:
                            file = _b.sent();
                            console.log(file);
                            sheet = "# Score Sheet for " + this.gradeSet.properties.get("title") + "\n\n";
                            first = false;
                            sheet += "|  | ";
                            for (i = 0; i < 7; i++)
                                sheet += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp; |";
                            sheet += "\n";
                            sheet += "|:---|:---|:---|:---|:---|:---|:---|:---|\n";
                            this.gradeSet.students.forEach(function (stud) {
                                sheet += "| ".concat(stud.data.get("name"), " | ");
                                for (var i = 0; i < 7; i++)
                                    sheet += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp; |";
                                sheet += "\n";
                                if (first) {
                                    sheet += "|:---|:---|:---|:---|:---|:---|:---|:---|\n";
                                    first = false;
                                }
                            });
                            this.app.vault.modify(file, sheet);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        menu
            .addItem(function (item) {
            item
                .setTitle('Grid view')
                .setIcon('lucide-grip')
                .setSection('pane')
                .onClick(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.display();
                    return [2 /*return*/];
                });
            }); });
        });
        menu
            .addItem(function (item) {
            item
                .setTitle('List view')
                .setIcon('lucide-layout-list')
                .setSection('pane')
                .onClick(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.displayList();
                    return [2 /*return*/];
                });
            }); });
        });
        menu
            .addItem(function (item) {
            item
                .setTitle('Add a reminder')
                .setIcon('lucide-layout-list')
                .setSection('pane')
                .onClick(function () { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    new NewReminderModal(this.app, function (reminder) {
                        if (reminder !== undefined)
                            _this.gradeSet.addReminder(reminder);
                        console.log(_this.gradeSet.reminders);
                        _this.display();
                    }).open();
                    return [2 /*return*/];
                });
            }); });
        });
        menu
            .addItem(function (item) {
            item
                .setTitle('Generate printables')
                .setIcon('lucide-layout-list')
                .setSection('pane')
                .onClick(function () { return __awaiter(_this, void 0, void 0, function () {
                var template, pos, tfile, file, semaphore;
                var _this = this;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            template = this.plugin.settings.template;
                            if (!(template !== undefined && template.length > 0)) return [3 /*break*/, 4];
                            pos = template.indexOf(this.app.vault.adapter.basePath);
                            if (pos >= 0)
                                template = template.replace(this.app.vault.adapter.basePath + "\\", "");
                            template = template.replace(/\\/g, "/");
                            console.log(template);
                            tfile = this.app.vault.getAbstractFileByPath(template);
                            console.log(tfile);
                            if (!(template !== null)) return [3 /*break*/, 2];
                            return [4 /*yield*/, app.vault.read(tfile)];
                        case 1:
                            template = _b.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            template = "";
                            _b.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            template = "";
                            _b.label = 5;
                        case 5: return [4 /*yield*/, app.fileManager.createNewMarkdownFile((_a = app.workspace.getActiveFile()) === null || _a === void 0 ? void 0 : _a.path, /*this.gradeSet.properties.get("title")*/ "studentpages.md")];
                        case 6:
                            file = _b.sent();
                            semaphore = new Semaphore(1);
                            this.gradeSet.students.forEach(function (stud) {
                                semaphore.callFunction(function () { return __awaiter(_this, void 0, void 0, function () {
                                    var studentNote;
                                    return __generator(this, function (_a) {
                                        studentNote = "";
                                        if (template.length > 0) {
                                            studentNote = (new Template(this.gradeSet)).process(template, stud);
                                        }
                                        else {
                                            studentNote = stud.generateMarkdown(this.gradeSet);
                                        }
                                        this.plugin.app.vault.append(file, '\n\n<div style="page-break-after: always;"></div>\n\n');
                                        this.plugin.app.vault.append(file, studentNote);
                                        return [2 /*return*/];
                                    });
                                }); });
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        menu
            .addItem(function (item) {
            item
                .setTitle('Add a student')
                .setIcon('lucide-smile-plus')
                .setSection('pane')
                .onClick(function () {
                new NewStudentModal(_this.app, function (student) { return __awaiter(_this, void 0, void 0, function () {
                    var studentFile, datastr, imageurl;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, app.fileManager.createNewMarkdownFile(this.gradeSet.sourceFolder, student.data.get("id"))];
                            case 1:
                                studentFile = _a.sent();
                                datastr = "#name " + student.data.get("name") + "\n" +
                                    "#id " + student.data.get("id") + "\n";
                                if (student.data.get("nickname") !== undefined)
                                    datastr += "#nickname " + student.data.get("nickname") + "\n";
                                if (student.data.get("emailaddress") !== undefined)
                                    datastr += "#emailaddress " + student.data.get("emailaddress") + "\n";
                                if (student.data.get("mobilePhoneNumber") !== undefined)
                                    datastr += "#mobilePhoneNumber " + student.data.get("mobilePhoneNumber") + "\n";
                                imageurl = this.plugin.settings.url;
                                imageurl = imageurl.replace("%id%", "000" + student.data.get("id"));
                                datastr += "#image " + imageurl + "\n";
                                console.log(datastr);
                                this.plugin.app.vault.append(studentFile, datastr);
                                student.setSourceFile(studentFile);
                                this.gradeSet.addStudent(student);
                                this.display();
                                this.statusbarElement.setText("" + this.gradeSet.getStudents() + " students");
                                return [2 /*return*/];
                        }
                    });
                }); }).open();
            });
        });
        menu
            .addItem(function (item) {
            item
                .setTitle('Import data')
                .setIcon('lucide-file-text')
                .setSection('pane')
                .onClick(function () {
                // Choose a file
                var modal = new FileSelectorModal(_this.app, _this.gradeSet, _this.CSVimport);
                modal.open();
            });
        });
        menu
            .addItem(function (item) {
            item
                .setTitle('About')
                .setIcon('lucide-file-text')
                .setSection('pane')
                .onClick(function () {
                // Choose a file
                new Alert(_this.plugin, "About ".concat(_this.plugin.version), "GradeBox is a plugin for Obsidian Buddy").open();
            });
        });
        // Add a "Close" if we are on a mobile device
        if (obsidian.Platform.isMobile) {
            menu
                .addItem(function (item) {
                item
                    .setTitle('Close')
                    .setIcon('cross')
                    .onClick(function () {
                    _this.close();
                });
            });
        }
        if (callSuper) {
            _super.prototype.onPaneMenu.call(this, menu, source);
        }
    };
    GradeboxView.prototype.display = function () {
        console.log("DISPLAYING...colorized = " + this.colorized);
        this.container.empty();
        this.displayText = this.plugin.version;
        var div = this.container.createEl("div", { cls: "view-style" });
        var width = this.containerEl.win.innerWidth;
        if (this.gradeSet != null) {
            this.displayText = this.gradeSet.properties.get("title");
            if (this.colorized) {
                this.gradeSet.display(div, width, this.plugin.settings.colorDivider1, this.plugin.settings.colorDivider2);
            }
            else {
                console.log("DISPLAY: " + this.gradeSet.reminders);
                this.gradeSet.display(div, width);
            }
            this.statusbarElement.setText("" + this.gradeSet.getStudents() + " students");
        }
    };
    GradeboxView.prototype.displayList = function () {
        this.container.empty();
        this.displayText = this.plugin.version;
        var div = this.container.createEl("div", { cls: "view-style" });
        var width = this.containerEl.win.innerWidth;
        if (this.gradeSet != null) {
            this.displayText = this.gradeSet.properties.get("title");
            this.gradeSet.displayList(div, width);
            this.statusbarElement.setText("" + this.gradeSet.getStudents() + " students");
        }
    };
    GradeboxView.prototype.clear = function () {
    };
    return GradeboxView;
}(obsidian.ItemView));
var FileSelectorModal = /** @class */ (function (_super) {
    __extends(FileSelectorModal, _super);
    function FileSelectorModal(app, gs, callbackOnClose) {
        var _this = _super.call(this, app) || this;
        _this.callbackOnClose = callbackOnClose;
        _this.gradeSet = gs;
        return _this;
    }
    FileSelectorModal.prototype.onOpen = function () {
        var _this = this;
        var setting1 = new obsidian.Setting(this.contentEl).setName("Choose CSV File").setDesc("Choose CSV data file to import");
        var inputDataFile = setting1.controlEl.createEl("input", {
            attr: {
                type: "file",
                multiple: false,
                //accept: ".json,.csv,.tsv"
            }
        });
        var setting5 = new obsidian.Setting(this.contentEl).setName("Import").setDesc("Press to start the Import Process");
        var input5 = setting5.controlEl.createEl("button");
        input5.textContent = "Import";
        input5.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(inputDataFile.files[0]);
                this.callbackOnClose(this.view, this.gradeSet, inputDataFile.files[0].path);
                new obsidian.Notice("Import Finished");
                this.close();
                this.view.display();
                return [2 /*return*/];
            });
        }); };
    };
    FileSelectorModal.prototype.onClose = function () {
        var contentEl = this.contentEl;
        contentEl.empty();
    };
    return FileSelectorModal;
}(obsidian.Modal));

var RecentFilesModal = /** @class */ (function (_super) {
    __extends(RecentFilesModal, _super);
    function RecentFilesModal(app, file1, file2, file3, callbackOnClose) {
        var _this = _super.call(this, app) || this;
        _this.file1 = file1;
        _this.file2 = file2;
        _this.file3 = file3;
        _this.callbackOnClose = callbackOnClose;
        _this.gradeSet = _this.file1;
        return _this;
    }
    RecentFilesModal.prototype.onOpen = function () {
        var _this = this;
        var contentEl = this.contentEl;
        contentEl.createEl("form", {}, function (form) {
            form.createEl("h2", { text: 'Choose a GradeSet' });
            form.createEl("hr");
            new obsidian.DropdownComponent(form)
                .addOption(_this.file1, _this.file1)
                .addOption(_this.file2, _this.file2)
                .addOption(_this.file3, _this.file3)
                .onChange(function (value) {
                _this.gradeSet = value;
            });
            form.createEl("hr");
            new obsidian.ButtonComponent(form)
                .setButtonText("Open")
                .setCta()
                .onClick(function () {
                _this.close();
                _this.callbackOnClose(_this.gradeSet);
            });
        });
    };
    RecentFilesModal.prototype.onClose = function () {
        var contentEl = this.contentEl;
        contentEl.empty();
    };
    return RecentFilesModal;
}(obsidian.Modal));

var AOL = {
	domains: [
		"aol.com"
	],
	host: "smtp.aol.com",
	port: 587
};
var Bluewin = {
	host: "smtpauths.bluewin.ch",
	domains: [
		"bluewin.ch"
	],
	port: 465
};
var DebugMail = {
	host: "debugmail.io",
	port: 25
};
var DynectEmail = {
	aliases: [
		"Dynect"
	],
	host: "smtp.dynect.net",
	port: 25
};
var Ethereal = {
	aliases: [
		"ethereal.email"
	],
	host: "smtp.ethereal.email",
	port: 587
};
var FastMail = {
	domains: [
		"fastmail.fm"
	],
	host: "smtp.fastmail.com",
	port: 465,
	secure: true
};
var GandiMail = {
	aliases: [
		"Gandi",
		"Gandi Mail"
	],
	host: "mail.gandi.net",
	port: 587
};
var Gmail = {
	aliases: [
		"Google Mail"
	],
	domains: [
		"gmail.com",
		"googlemail.com"
	],
	host: "smtp.gmail.com",
	port: 465,
	secure: true
};
var Godaddy = {
	host: "smtpout.secureserver.net",
	port: 25
};
var GodaddyAsia = {
	host: "smtp.asia.secureserver.net",
	port: 25
};
var GodaddyEurope = {
	host: "smtp.europe.secureserver.net",
	port: 25
};
var Hotmail = {
	aliases: [
		"Outlook",
		"Outlook.com",
		"Hotmail.com"
	],
	domains: [
		"hotmail.com",
		"outlook.com"
	],
	host: "smtp-mail.outlook.com",
	port: 587
};
var iCloud = {
	aliases: [
		"Me",
		"Mac"
	],
	domains: [
		"me.com",
		"mac.com"
	],
	host: "smtp.mail.me.com",
	port: 587
};
var Infomaniak = {
	host: "mail.infomaniak.com",
	domains: [
		"ik.me",
		"ikmail.com",
		"etik.com"
	],
	port: 587
};
var Maildev = {
	port: 1025,
	ignoreTLS: true
};
var Mailgun = {
	host: "smtp.mailgun.org",
	port: 465,
	secure: true
};
var Mailjet = {
	host: "in.mailjet.com",
	port: 587
};
var Mailosaur = {
	host: "mailosaur.io",
	port: 25
};
var Mailtrap = {
	host: "smtp.mailtrap.io",
	port: 2525
};
var Mandrill = {
	host: "smtp.mandrillapp.com",
	port: 587
};
var Naver = {
	host: "smtp.naver.com",
	port: 587
};
var One = {
	host: "send.one.com",
	port: 465,
	secure: true
};
var OpenMailBox = {
	aliases: [
		"OMB",
		"openmailbox.org"
	],
	host: "smtp.openmailbox.org",
	port: 465,
	secure: true
};
var Outlook365 = {
	host: "smtp.office365.com",
	port: 587,
	secure: false
};
var OhMySMTP = {
	host: "smtp.ohmysmtp.com",
	port: 587,
	secure: false
};
var Postmark = {
	aliases: [
		"PostmarkApp"
	],
	host: "smtp.postmarkapp.com",
	port: 2525
};
var QQ = {
	domains: [
		"qq.com"
	],
	host: "smtp.qq.com",
	port: 465,
	secure: true
};
var QQex = {
	aliases: [
		"QQ Enterprise"
	],
	domains: [
		"exmail.qq.com"
	],
	host: "smtp.exmail.qq.com",
	port: 465,
	secure: true
};
var SendCloud = {
	host: "smtp.sendcloud.net",
	port: 2525
};
var SendGrid = {
	host: "smtp.sendgrid.net",
	port: 587
};
var SendinBlue = {
	host: "smtp-relay.sendinblue.com",
	port: 587
};
var SendPulse = {
	host: "smtp-pulse.com",
	port: 465,
	secure: true
};
var SES = {
	host: "email-smtp.us-east-1.amazonaws.com",
	port: 465,
	secure: true
};
var Sparkpost = {
	aliases: [
		"SparkPost",
		"SparkPost Mail"
	],
	domains: [
		"sparkpost.com"
	],
	host: "smtp.sparkpostmail.com",
	port: 587,
	secure: false
};
var Tipimail = {
	host: "smtp.tipimail.com",
	port: 587
};
var Yahoo = {
	domains: [
		"yahoo.com"
	],
	host: "smtp.mail.yahoo.com",
	port: 465,
	secure: true
};
var Yandex = {
	domains: [
		"yandex.ru"
	],
	host: "smtp.yandex.ru",
	port: 465,
	secure: true
};
var Zoho = {
	host: "smtp.zoho.com",
	port: 465,
	secure: true,
	authMethod: "LOGIN"
};
var services = {
	"126": {
	host: "smtp.126.com",
	port: 465,
	secure: true
},
	"163": {
	host: "smtp.163.com",
	port: 465,
	secure: true
},
	"1und1": {
	host: "smtp.1und1.de",
	port: 465,
	secure: true,
	authMethod: "LOGIN"
},
	AOL: AOL,
	Bluewin: Bluewin,
	DebugMail: DebugMail,
	DynectEmail: DynectEmail,
	Ethereal: Ethereal,
	FastMail: FastMail,
	"Forward Email": {
	aliases: [
		"FE",
		"ForwardEmail"
	],
	domains: [
		"forwardemail.net"
	],
	host: "smtp.forwardemail.net",
	port: 465,
	secure: true
},
	GandiMail: GandiMail,
	Gmail: Gmail,
	Godaddy: Godaddy,
	GodaddyAsia: GodaddyAsia,
	GodaddyEurope: GodaddyEurope,
	"hot.ee": {
	host: "mail.hot.ee"
},
	Hotmail: Hotmail,
	iCloud: iCloud,
	Infomaniak: Infomaniak,
	"mail.ee": {
	host: "smtp.mail.ee"
},
	"Mail.ru": {
	host: "smtp.mail.ru",
	port: 465,
	secure: true
},
	Maildev: Maildev,
	Mailgun: Mailgun,
	Mailjet: Mailjet,
	Mailosaur: Mailosaur,
	Mailtrap: Mailtrap,
	Mandrill: Mandrill,
	Naver: Naver,
	One: One,
	OpenMailBox: OpenMailBox,
	Outlook365: Outlook365,
	OhMySMTP: OhMySMTP,
	Postmark: Postmark,
	"qiye.aliyun": {
	host: "smtp.mxhichina.com",
	port: "465",
	secure: true
},
	QQ: QQ,
	QQex: QQex,
	SendCloud: SendCloud,
	SendGrid: SendGrid,
	SendinBlue: SendinBlue,
	SendPulse: SendPulse,
	SES: SES,
	"SES-US-EAST-1": {
	host: "email-smtp.us-east-1.amazonaws.com",
	port: 465,
	secure: true
},
	"SES-US-WEST-2": {
	host: "email-smtp.us-west-2.amazonaws.com",
	port: 465,
	secure: true
},
	"SES-EU-WEST-1": {
	host: "email-smtp.eu-west-1.amazonaws.com",
	port: 465,
	secure: true
},
	Sparkpost: Sparkpost,
	Tipimail: Tipimail,
	Yahoo: Yahoo,
	Yandex: Yandex,
	Zoho: Zoho
};

//--------------------------------------------------------------------------------------
var DEFAULT_SETTINGS = {
    numberOfRecentFiles: "3",
    url: '',
    template: '',
    colorDivider1: "90",
    colorDivider2: "60",
    useAuthentication: false,
    username: 'nobody',
    password: '',
    smtphost: 'smtp.gmail.com',
    smtpport: "465",
    encryption: "None",
    receiver: "",
    from: "",
    defaultto: '',
    subject: "",
    service: "",
    secure: "None",
    delay: "10",
    XMLfilename: "grades.xml",
    whenToGenerate: "close",
    recentFile1: "",
    recentFile2: "",
    recentFile3: "",
};
var GradeboxPlugin = /** @class */ (function (_super) {
    __extends(GradeboxPlugin, _super);
    function GradeboxPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.version = "1.1.2 (111723)";
        return _this;
    }
    GradeboxPlugin.prototype.rotateRecentFiles = function (filePath) {
        if (filePath.length == 0)
            return;
        if (filePath === this.settings.recentFile1)
            return;
        if (filePath === this.settings.recentFile2)
            return;
        if (filePath === this.settings.recentFile3)
            return;
        this.settings.recentFile3 = this.settings.recentFile2;
        this.settings.recentFile2 = this.settings.recentFile1;
        this.settings.recentFile1 = filePath;
        this.saveSettings();
    };
    GradeboxPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('loading plugin');
                        return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        this.registerView(VIEW_TYPE_GRADEBOX, function (leaf) { return new GradeboxView(leaf, _this); });
                        this.registerView(VIEW_TYPE_GRADESET_SUMMARY, function (leaf) { return new GradeSetSummaryView(leaf, _this); });
                        this.registerView(VIEW_TYPE_STUDENT, function (leaf) { return new StudentView(leaf, _this, null); });
                        this.addRibbonIcon('package-open', 'GradeBox Plugin', function (evt) {
                            new RecentFilesModal(_this.app, _this.settings.recentFile1, _this.settings.recentFile2, _this.settings.recentFile3, function (filePath) { return __awaiter(_this, void 0, void 0, function () {
                                var folder;
                                return __generator(this, function (_a) {
                                    folder = this.app.vault.getAbstractFileByPath(filePath);
                                    this.rotateRecentFiles(filePath);
                                    this.openGradeSet(folder);
                                    return [2 /*return*/];
                                });
                            }); }).open();
                        });
                        this.addCommand({
                            id: 'open-gradeset',
                            name: 'Open GradeSet',
                            callback: function () {
                            }
                        });
                        this.registerEvent(this.app.workspace.on("file-menu", function (menu, file, source, view) {
                            if (file instanceof obsidian.TFolder) {
                                menu.addItem(function (item) {
                                    item
                                        .setTitle("Open as GradeSet")
                                        .setIcon("package-open")
                                        .onClick(function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            this.rotateRecentFiles(file.path);
                                            this.openGradeSet(file);
                                            return [2 /*return*/];
                                        });
                                    }); });
                                });
                                return;
                            }
                        }));
                        this.addSettingTab(new GradeBoxSettingsTab(this.app, this));
                        this.gradeBoxView = null;
                        return [2 /*return*/];
                }
            });
        });
    };
    GradeboxPlugin.prototype.onunload = function () {
        console.log('unloading plugin');
        this.app.workspace.detachLeavesOfType(VIEW_TYPE_STUDENT);
        this.app.workspace.detachLeavesOfType(VIEW_TYPE_GRADESET_SUMMARY);
        this.app.workspace.detachLeavesOfType(VIEW_TYPE_GRADEBOX);
    };
    GradeboxPlugin.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [{}, DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    GradeboxPlugin.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GradeboxPlugin.prototype.fileExists = function (fileName, folder) {
        var file = folder.children.find(function (afile) { return afile.name === fileName; });
        return (file !== undefined);
    };
    GradeboxPlugin.prototype.openGradeSet = function (folder) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (folder.children.length == 0 || !this.fileExists("CLASS.md", folder)) {
                    this.newGradeSetFile(folder);
                    return [2 /*return*/];
                }
                this.gradeSet = new GradeSet(this);
                this.gradeSet.setsourceFolder(folder);
                if (folder.children.length > 0) {
                    folder.children.forEach(function (absfile, index) { return __awaiter(_this, void 0, void 0, function () {
                        var file, data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    file = absfile;
                                    console.log("PROCESSING " + file.name);
                                    if (!(file.name !== 'undefined')) return [3 /*break*/, 6];
                                    return [4 /*yield*/, app.vault.read(file)];
                                case 1:
                                    data = _a.sent();
                                    if (!(file.name === "CLASS.md")) return [3 /*break*/, 3];
                                    return [4 /*yield*/, this.gradeSet.defineGradeSet(data, folder, file)];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 5];
                                case 3:
                                    if (!file.name.endsWith(".md")) return [3 /*break*/, 5];
                                    return [4 /*yield*/, this.gradeSet.defineStudent(data, file)];
                                case 4:
                                    _a.sent();
                                    _a.label = 5;
                                case 5:
                                    console.log(this.gradeSet);
                                    if (index == folder.children.length - 1) {
                                        this.app.workspace.detachLeavesOfType(VIEW_TYPE_GRADEBOX);
                                        this.app.workspace.detachLeavesOfType(VIEW_TYPE_STUDENT);
                                        this.app.workspace.detachLeavesOfType(VIEW_TYPE_GRADESET_SUMMARY);
                                        this.app.workspace.getLeaf().setViewState({
                                            type: VIEW_TYPE_GRADEBOX,
                                            state: { folder: folder },
                                        });
                                    }
                                    _a.label = 6;
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); });
                }
                else {
                    this.app.workspace.detachLeavesOfType(VIEW_TYPE_GRADEBOX);
                    this.app.workspace.detachLeavesOfType(VIEW_TYPE_STUDENT);
                    this.app.workspace.detachLeavesOfType(VIEW_TYPE_GRADESET_SUMMARY);
                    this.app.workspace.getLeaf().setViewState({
                        type: VIEW_TYPE_GRADEBOX,
                        state: { folder: folder },
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    GradeboxPlugin.prototype.newGradeSetFile = function (folder) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var grades_1, e_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        folder
                            ? folder
                            : app.fileManager.getNewFileParent(((_a = app.workspace.getActiveFile()) === null || _a === void 0 ? void 0 : _a.path) || '');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        this.app.workspace.detachLeavesOfType(VIEW_TYPE_GRADEBOX);
                        this.app.workspace.detachLeavesOfType(VIEW_TYPE_STUDENT);
                        this.app.workspace.detachLeavesOfType(VIEW_TYPE_GRADESET_SUMMARY);
                        return [4 /*yield*/, app.fileManager.createNewMarkdownFile(folder, 'CLASS')];
                    case 2:
                        grades_1 = _b.sent();
                        //new NewGradeSetModal(this.app, grades).open();
                        new Dialog(this, "New Gradeset", "Enter class name", "Create", "Cancel", function (str) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                this.app.vault.append(grades_1, "#title " + str + '\n');
                                this.openGradeSet(folder);
                                return [2 /*return*/];
                            });
                        }); }).open();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        console.error('Error creating gradeset:', e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GradeboxPlugin.prototype.displayGradeSetView = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, app.workspace.getLeaf(true).setViewState({
                            type: VIEW_TYPE_GRADESET_SUMMARY,
                            state: { gradeset: this.gradeSet },
                        })];
                    case 1:
                        _a.sent();
                        this.app.workspace.revealLeaf(this.app.workspace.getLeavesOfType(VIEW_TYPE_GRADESET_SUMMARY)[0]);
                        return [2 /*return*/];
                }
            });
        });
    };
    GradeboxPlugin.prototype.displayStudent = function (student) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("DISPLAY STUDENT: " + student.data.get("name"));
                        this.currentStudent = student;
                        console.log(this.currentStudent.absences);
                        return [4 /*yield*/, app.workspace.getLeaf(true).setViewState({
                                type: VIEW_TYPE_STUDENT,
                                state: { student: student },
                            })];
                    case 1:
                        _a.sent();
                        this.app.workspace.revealLeaf(this.app.workspace.getLeavesOfType(VIEW_TYPE_STUDENT)[0]);
                        return [2 /*return*/];
                }
            });
        });
    };
    return GradeboxPlugin;
}(obsidian.Plugin));
/** @class */ ((function (_super) {
    __extends(NewGradeSetModal, _super);
    function NewGradeSetModal(app, grades) {
        var _this = _super.call(this, app) || this;
        _this.gradesFile = grades;
        return _this;
    }
    NewGradeSetModal.prototype.onOpen = function () {
        var _this = this;
        var contentEl = this.contentEl;
        contentEl.createEl("h2", { text: 'New Gradeset' });
        new obsidian.Setting(contentEl)
            .setName("Gradeset Name")
            .addText(function (text) {
            return text
                .setValue("")
                .onChange(function (value) {
                _this.gname = value;
            });
        });
        new obsidian.Setting(contentEl)
            .addButton(function (btn) {
            return btn
                .setButtonText("OK")
                .setCta()
                .onClick(function () {
                app.vault.append(_this.gradesFile, "#title " + _this.gname + '\n');
                _this.close();
            });
        });
    };
    NewGradeSetModal.prototype.onClose = function () {
        var contentEl = this.contentEl;
        contentEl.empty();
    };
    return NewGradeSetModal;
})(obsidian.Modal));
var GradeBoxSettingsTab = /** @class */ (function (_super) {
    __extends(GradeBoxSettingsTab, _super);
    function GradeBoxSettingsTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    GradeBoxSettingsTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        containerEl.createEl('h1', { text: 'GradeBox version ' + this.plugin.version });
        containerEl.createEl('hr');
        containerEl.createEl('h2', { text: 'General' });
        new obsidian.Setting(containerEl)
            .setName('Number of recent files')
            .setDesc('This is the number of recent files that will be displayed from the ribbon icon.')
            .addText(function (text) { return text.setPlaceholder('#')
            .setValue(_this.plugin.settings.numberOfRecentFiles)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.plugin.settings.numberOfRecentFiles = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
        new obsidian.Setting(containerEl)
            .setName('Student Image URL')
            .setDesc('This is the URL for a student who is created without an image.')
            .addText(function (text) { return text.setPlaceholder('URL')
            .setValue(_this.plugin.settings.url)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.plugin.settings.url = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
        new obsidian.Setting(containerEl)
            .setName('Template for Emailing Scores')
            .setDesc('This is the template file used when emailing scores to students.')
            .addText(function (text) { return text
            .setValue(_this.plugin.settings.template)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.plugin.settings.template = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
        containerEl.createEl('h2', { text: 'Colorizing' });
        new obsidian.Setting(containerEl)
            .setName('Divider: Top to Middle')
            .setDesc('This is the score that divides the top scores from the middle scores.')
            .addText(function (text) { return text.setPlaceholder('#')
            .setValue(_this.plugin.settings.colorDivider1)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.plugin.settings.colorDivider1 = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
        new obsidian.Setting(containerEl)
            .setName('Divider: Middle to Bottom')
            .setDesc('This is the score that divides the middle scores from the top scores.')
            .addText(function (text) { return text.setPlaceholder('#')
            .setValue(_this.plugin.settings.colorDivider2)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.plugin.settings.colorDivider2 = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
        containerEl.createEl('h2', { text: 'Email Server' });
        new obsidian.Setting(containerEl)
            .setName('Delay between sending messages')
            .setDesc('This is the number of second to wait between sending messages.')
            .addText(function (text) { return text.setPlaceholder('#')
            .setValue(_this.plugin.settings.delay)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.plugin.settings.delay = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
        this.serviceSetting = new obsidian.Setting(containerEl)
            .setName('Email Service Template')
            .setDesc('To populate settings below')
            .addDropdown(function (drop) { return drop
            .addOption("none", "none")
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            var service;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        service = services[value];
                        if (service["host"] == undefined) {
                            this.hostSetting.components[0].setValue("");
                            this.plugin.settings.smtphost = "";
                        }
                        else {
                            this.hostSetting.components[0].setValue(service["host"]);
                            this.plugin.settings.smtphost = service["host"];
                        }
                        if (service["port"] == undefined) {
                            this.portSetting.components[0].setValue("");
                            this.plugin.settings.smtpport = "";
                        }
                        else {
                            this.portSetting.components[0].setValue("" + service["port"]);
                            this.plugin.settings.smtpport = "" + service["port"];
                        }
                        if (service["secure"] == undefined) {
                            this.secureSetting.components[0].setValue("None");
                            this.plugin.settings.secure = "None";
                        }
                        else {
                            if (service["secure"] == true) {
                                this.secureSetting.components[0].setValue("SSL");
                                this.plugin.settings.secure = "SSL";
                            }
                            else {
                                this.secureSetting.components[0].setValue("None");
                                this.plugin.settings.secure = "None";
                            }
                        }
                        this.plugin.settings.service = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
        Object.keys(services).forEach(function (key) {
            _this.serviceSetting.components[0].addOption(key, key);
        });
        this.serviceSetting.components[0].setValue(this.plugin.settings.service);
        this.hostSetting = new obsidian.Setting(containerEl)
            .setName('Email Host')
            .setDesc('The server that collects your email')
            .addText(function (text) { return text
            .setPlaceholder('smtp.gmail.com')
            .setValue(_this.plugin.settings.smtphost)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Email Host: ' + value);
                        this.plugin.settings.smtphost = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
        this.portSetting = new obsidian.Setting(containerEl)
            .setName('Email Host Port')
            .setDesc('The port the server uses to collect your email')
            .addText(function (text) { return text
            .setPlaceholder('465')
            .setValue(_this.plugin.settings.smtpport)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Host Port: ' + value);
                        this.plugin.settings.smtpport = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
        new obsidian.Setting(containerEl)
            .setName('Does Email Host Need Authentication?')
            .setDesc('Does your email host require a username / password?')
            .addToggle(function (text) { return text
            .setValue(_this.plugin.settings.useAuthentication)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('UseAuth: ' + value);
                        this.plugin.settings.useAuthentication = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        if (value) {
                            this.usernameSetting.setDisabled(false);
                            this.passwordSetting.setDisabled(false);
                        }
                        else {
                            this.usernameSetting.setDisabled(true);
                            this.passwordSetting.setDisabled(true);
                        }
                        return [2 /*return*/];
                }
            });
        }); }); });
        this.usernameSetting = new obsidian.Setting(containerEl)
            .setName('Username')
            .setDesc('Username provided for host authentication')
            .setDisabled(!this.plugin.settings.useAuthentication)
            .addText(function (text) { return text
            .setValue(_this.plugin.settings.username)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Username: ' + value);
                        this.plugin.settings.username = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
        this.passwordSetting = new obsidian.Setting(containerEl)
            .setName('Password')
            .setDesc('Password provided for host authentication')
            .setDisabled(!this.plugin.settings.useAuthentication)
            .addText(function (text) { return text
            .setValue(_this.plugin.settings.password)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Password: ' + value);
                        this.plugin.settings.password = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
        this.secureSetting = new obsidian.Setting(containerEl)
            .setName('Encryption')
            .setDesc('What kind of encryption does the host use?')
            .addDropdown(function (text) { return text
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Encryption: ' + value);
                        this.plugin.settings.encryption = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })
            .addOption("None", "None")
            .addOption("TLS", "TLS")
            .addOption("SSL", "SSL")
            .setValue(_this.plugin.settings.encryption); });
        containerEl.createEl('h2', { text: 'Email Message' });
        new obsidian.Setting(containerEl)
            .setName('Sent from')
            .setDesc('Sent from address for pre-filling From field (optional)')
            .addText(function (text) { return text
            .setValue(_this.plugin.settings.from)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('From: ' + value);
                        this.plugin.settings.from = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
        new obsidian.Setting(containerEl)
            .setName('Default To: address for emails')
            .setDesc('This is the default destination address for email messages.')
            .addText(function (text) { return text.setPlaceholder('Email address')
            .setValue(_this.plugin.settings.defaultto)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.plugin.settings.defaultto = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
        new obsidian.Setting(containerEl)
            .setName('Receiver')
            .setDesc('Receiver for pre-filling To field (optional)')
            .addText(function (text) { return text
            .setValue(_this.plugin.settings.receiver)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Receiver: ' + value);
                        this.plugin.settings.receiver = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
        new obsidian.Setting(containerEl)
            .setName('Subject')
            .setDesc('Subject for pre-filling the subject field (optional)')
            .addText(function (text) { return text
            .setValue(_this.plugin.settings.subject)
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Subject: ' + value);
                        this.plugin.settings.subject = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }); });
        containerEl.createEl('h2', { text: 'Grades Web Service' });
        new obsidian.Setting(containerEl)
            .setName('When to generate Web server file')
            .setDesc('When Web server file is generates.')
            .addDropdown(function (text) { return text
            .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.plugin.settings.whenToGenerate = value;
                        return [4 /*yield*/, this.plugin.saveSettings()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })
            .addOption("open", "open")
            .addOption("close", "close")
            .addOption("never", "never")
            .setValue(_this.plugin.settings.whenToGenerate); });
    };
    return GradeBoxSettingsTab;
}(obsidian.PluginSettingTab));

module.exports = GradeboxPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsImRhdGEvU2NvcmUudHMiLCJkYXRhL0NhdGVnb3J5LnRzIiwiZGF0YS9Db3VudGVyLnRzIiwiZGF0YS9SZW1pbmRlci50cyIsInV0aWxpdGllcy9VdGlsaXRpZXMudHMiLCJkYXRhL1N0dWRlbnQudHMiLCJkYXRhL0dyYWRlU2V0LnRzIiwiR3JhZGVTZXRTdW1tYXJ5Vmlldy50cyIsInV0aWxpdGllcy9jb2RlbWlycm9yLmpzIiwidXRpbGl0aWVzL2FsZXJ0LnRzIiwibW9kYWxzL0NvdW50ZXJUaWNrLnRzIiwidXRpbGl0aWVzL0RpYWxvZy50cyIsImVtYWlsLnRzIiwibW9kYWxzL0VtYWlsZXJNb2RhbC50cyIsIm1vZGFscy9Ob3RlTW9kYWwudHMiLCJ1dGlsaXRpZXMvVGVtcGxhdGUudHMiLCJ1dGlsaXRpZXMvZHJhd2Rvd24uanMiLCJTdHVkZW50Vmlldy50cyIsIm1vZGFscy9BZGRBYnNlbmNlTW9kYWwudHMiLCJtb2RhbHMvTmV3UmVtaW5kZXJNb2RhbC50cyIsIm1vZGFscy9OZXdTY29yZU1vZGFsLnRzIiwibW9kYWxzL05ld1N0dWRlbnRNb2RhbC50cyIsInV0aWxpdGllcy9Qcm9ncmVzcy50cyIsIm1vZGFscy9SZW1pbmRlclBvcHVwLnRzIiwidXRpbGl0aWVzL1NlbWFwaG9yZS50cyIsIkdyYWRlYm94Vmlldy50cyIsIm1vZGFscy9SZWNlbnRGaWxlc01vZGFsLnRzIiwibWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UsIFN1cHByZXNzZWRFcnJvciwgU3ltYm9sICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2VzRGVjb3JhdGUoY3RvciwgZGVzY3JpcHRvckluLCBkZWNvcmF0b3JzLCBjb250ZXh0SW4sIGluaXRpYWxpemVycywgZXh0cmFJbml0aWFsaXplcnMpIHtcclxuICAgIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxyXG4gICAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcclxuICAgIHZhciB0YXJnZXQgPSAhZGVzY3JpcHRvckluICYmIGN0b3IgPyBjb250ZXh0SW5bXCJzdGF0aWNcIl0gPyBjdG9yIDogY3Rvci5wcm90b3R5cGUgOiBudWxsO1xyXG4gICAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XHJcbiAgICB2YXIgXywgZG9uZSA9IGZhbHNlO1xyXG4gICAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICB2YXIgY29udGV4dCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluLmFjY2VzcykgY29udGV4dC5hY2Nlc3NbcF0gPSBjb250ZXh0SW4uYWNjZXNzW3BdO1xyXG4gICAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XHJcbiAgICAgICAgaWYgKGtpbmQgPT09IFwiYWNjZXNzb3JcIikge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5nZXQpKSBkZXNjcmlwdG9yLmdldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xyXG4gICAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcclxuICAgICAgICAgICAgZWxzZSBkZXNjcmlwdG9yW2tleV0gPSBfO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0YXJnZXQpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbnRleHRJbi5uYW1lLCBkZXNjcmlwdG9yKTtcclxuICAgIGRvbmUgPSB0cnVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcclxuICAgIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0aWFsaXplcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXNlVmFsdWUgPyB2YWx1ZSA6IHZvaWQgMDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Byb3BLZXkoeCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xyXG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCBcIm5hbWVcIiwgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgsIFwiIFwiLCBuYW1lKSA6IG5hbWUgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XHJcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xyXG4gICAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcclxuICAgIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xyXG4gICAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlKGVudiwgdmFsdWUsIGFzeW5jKSB7XHJcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWQuXCIpO1xyXG4gICAgICAgIHZhciBkaXNwb3NlO1xyXG4gICAgICAgIGlmIChhc3luYykge1xyXG4gICAgICAgICAgICBpZiAoIVN5bWJvbC5hc3luY0Rpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNEaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgICAgICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5hc3luY0Rpc3Bvc2VdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGlzcG9zZSA9PT0gdm9pZCAwKSB7XHJcbiAgICAgICAgICAgIGlmICghU3ltYm9sLmRpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuZGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICAgICAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuZGlzcG9zZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgZGlzcG9zZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IG5vdCBkaXNwb3NhYmxlLlwiKTtcclxuICAgICAgICBlbnYuc3RhY2sucHVzaCh7IHZhbHVlOiB2YWx1ZSwgZGlzcG9zZTogZGlzcG9zZSwgYXN5bmM6IGFzeW5jIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoYXN5bmMpIHtcclxuICAgICAgICBlbnYuc3RhY2sucHVzaCh7IGFzeW5jOiB0cnVlIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG52YXIgX1N1cHByZXNzZWRFcnJvciA9IHR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xyXG4gICAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGlzcG9zZVJlc291cmNlcyhlbnYpIHtcclxuICAgIGZ1bmN0aW9uIGZhaWwoZSkge1xyXG4gICAgICAgIGVudi5lcnJvciA9IGVudi5oYXNFcnJvciA/IG5ldyBfU3VwcHJlc3NlZEVycm9yKGUsIGVudi5lcnJvciwgXCJBbiBlcnJvciB3YXMgc3VwcHJlc3NlZCBkdXJpbmcgZGlzcG9zYWwuXCIpIDogZTtcclxuICAgICAgICBlbnYuaGFzRXJyb3IgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgICAgICB3aGlsZSAoZW52LnN0YWNrLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB2YXIgcmVjID0gZW52LnN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHJlYy5kaXNwb3NlICYmIHJlYy5kaXNwb3NlLmNhbGwocmVjLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZWMuYXN5bmMpIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0KS50aGVuKG5leHQsIGZ1bmN0aW9uKGUpIHsgZmFpbChlKTsgcmV0dXJuIG5leHQoKTsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGZhaWwoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVudi5oYXNFcnJvcikgdGhyb3cgZW52LmVycm9yO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5leHQoKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgX19leHRlbmRzLFxyXG4gICAgX19hc3NpZ24sXHJcbiAgICBfX3Jlc3QsXHJcbiAgICBfX2RlY29yYXRlLFxyXG4gICAgX19wYXJhbSxcclxuICAgIF9fbWV0YWRhdGEsXHJcbiAgICBfX2F3YWl0ZXIsXHJcbiAgICBfX2dlbmVyYXRvcixcclxuICAgIF9fY3JlYXRlQmluZGluZyxcclxuICAgIF9fZXhwb3J0U3RhcixcclxuICAgIF9fdmFsdWVzLFxyXG4gICAgX19yZWFkLFxyXG4gICAgX19zcHJlYWQsXHJcbiAgICBfX3NwcmVhZEFycmF5cyxcclxuICAgIF9fc3ByZWFkQXJyYXksXHJcbiAgICBfX2F3YWl0LFxyXG4gICAgX19hc3luY0dlbmVyYXRvcixcclxuICAgIF9fYXN5bmNEZWxlZ2F0b3IsXHJcbiAgICBfX2FzeW5jVmFsdWVzLFxyXG4gICAgX19tYWtlVGVtcGxhdGVPYmplY3QsXHJcbiAgICBfX2ltcG9ydFN0YXIsXHJcbiAgICBfX2ltcG9ydERlZmF1bHQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRJbixcclxuICAgIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlLFxyXG4gICAgX19kaXNwb3NlUmVzb3VyY2VzLFxyXG59O1xyXG4iLCJleHBvcnQgY2xhc3MgU2NvcmUge1xuICAgIG5hbWU6IHN0cmluZyA9IFwiXCI7XG4gICAgdmFsdWU6IG51bWJlciA9IDAuMDtcbiAgICBleHRyYUNyZWRpdCA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyLCBleHRyYUNyZWQ/OiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHR5cGVvZiBleHRyYUNyZWQgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMuZXh0cmFDcmVkaXQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXh0cmFDcmVkaXQgPSBleHRyYUNyZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXROYW1lKCkge3JldHVybiB0aGlzLm5hbWV9XG4gICAgZ2V0VmFsdWUoKSB7cmV0dXJuIHRoaXMudmFsdWV9XG4gICAgZ2V0RXh0cmFDcmVkaXQoKSB7cmV0dXJuIHRoaXMuZXh0cmFDcmVkaXR9XG5cbiAgICBzZXROYW1lKG5hbWU6IHN0cmluZykge3RoaXMubmFtZSA9IG5hbWU7fVxuICAgIHNldFZhbHVlKHZhbHVlOiBudW1iZXIpIHt0aGlzLnZhbHVlID0gdmFsdWU7fVxuICAgIHNldEV4dHJhQ3JlZGl0KGV4dHJhQ3JlZDogYm9vbGVhbikge3RoaXMuZXh0cmFDcmVkaXQgPSBleHRyYUNyZWQ7fVxuXG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gYHsgXFxcIm5hbWVcXFwiOiBcXFwiJHt0aGlzLm5hbWV9XFxcIiwgYCArXG4gICAgICAgICAgICAgICAgIGBcXFwidmFsdWVcXFwiOiBcXFwiJHt0aGlzLnZhbHVlfVxcXCIsIGAgK1xuICAgICAgICAgICAgICAgICBgXFxcImV4dHJhQ3JlZGl0XFxcIjogXCIke3RoaXMuZXh0cmFDcmVkaXR9XCIgfWA7XG4gICAgfVxufSIsImltcG9ydCB7IFNjb3JlIH0gZnJvbSBcIi4vU2NvcmVcIjtcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi9TdHVkZW50XCI7XG5cbmV4cG9ydCBjbGFzcyBDYXRlZ29yeSB7XG4gICAgXG4gICAgc3RhdGljIFNjb3JpbmdNZXRob2QgPSB7XG5cdFx0VE9UQUxfUE9JTlRTOiAwLCBcbiAgICAgICAgVE9UQUxfU0NPUkVfUEVSQ0VOVEFHRTogMSwgXG4gICAgICAgIElORElWSURVQUxfU0NPUkVfUEVSQ0VOVEFHRTogMiwgXG4gICAgICAgIFBFUkNFTlRBR0VfT0ZfVE9UQUxfUE9TU0lCTEU6IDNcblx0fVxuICAgIFxuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgbmFtZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgcHJpdmF0ZSBfd2VpZ2h0OiBudW1iZXI7XG4gICAgcHVibGljIGdldCB3ZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlaWdodDtcbiAgICB9XG4gICAgcHVibGljIHNldCB3ZWlnaHQodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl93ZWlnaHQgPSB2YWx1ZTtcbiAgICB9XG4gICAgc2NvcmluZ01ldGhvZDogbnVtYmVyO1xuICAgIGRyb3BMb3dlc3Q6IG51bWJlcjtcblx0ZHJvcEhpZ2hlc3Q6IG51bWJlcjtcblx0cGVyY2VudE9mU2NvcmVzOiBudW1iZXI7XG4gICAgc2NvcmVTZXQ6IFNjb3JlW107XG5cbiAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSkge1xuICAgICAgICBpZiAob2JqICE9ICBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSAodHlwZW9mIG9iai5uYW1lID09ICd1bmRlZmluZWQnKT9cIm5vIG5hbWVcIjpvYmoubmFtZTtcbiAgICAgICAgICAgIHRoaXMud2VpZ2h0ID0gKHR5cGVvZiBvYmoud2VpZ2h0ID09ICd1bmRlZmluZWQnKT8xLjA6b2JqLndlaWdodDtcbiAgICAgICAgICAgIHRoaXMuc2NvcmluZ01ldGhvZCA9ICh0eXBlb2Ygb2JqLnNjb3JpbmdNZXRob2QgPT0gJ3VuZGVmaW5lZCcpP0NhdGVnb3J5LlNjb3JpbmdNZXRob2QuSU5ESVZJRFVBTF9TQ09SRV9QRVJDRU5UQUdFOm9iai5zY29yaW5nTWV0aG9kO1xuICAgICAgICAgICAgdGhpcy5kcm9wTG93ZXN0ID0gKHR5cGVvZiBvYmouZHJvcExvd2VzdCA9PSAndW5kZWZpbmVkJyk/MDpvYmouZHJvcExvd2VzdDtcbiAgICAgICAgICAgIHRoaXMuZHJvcEhpZ2hlc3QgPSAodHlwZW9mIG9iai5kcm9wSGlnaGVzdCA9PSAndW5kZWZpbmVkJyk/MDpvYmouZHJvcEhpZ2hlc3Q7XG4gICAgICAgICAgICB0aGlzLnBlcmNlbnRPZlNjb3JlcyA9ICh0eXBlb2Ygb2JqLnBlcmNlbnRPZlNjb3JlcyA9PSAndW5kZWZpbmVkJyk/MTpvYmoucGVyY2VudE9mU2NvcmVzO1xuICAgICAgICAgICAgdGhpcy5zY29yZVNldCA9IFtdO1xuICAgICAgICAgICAgY29uc29sZS5sb2cob2JqLnNjb3Jlcyk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iai5zY29yZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFyciA9IEFycmF5LmZyb20ob2JqLnNjb3Jlcyk7XG4gICAgICAgICAgICAgICAgYXJyLmZvckVhY2goKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjb3JlID0gbmV3IFNjb3JlKGRhdGFbJ25hbWUnXSwgZGF0YVsndmFsdWUnXSwgZGF0YVsnZXh0cmFDcmVkaXQnXSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNjb3JlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZVNldC5wdXNoKHNjb3JlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFNjb3JlKHNjb3JlOiBTY29yZSkge1xuICAgICAgICBpZiAodGhpcy5zY29yZVNldCA9PT0gdW5kZWZpbmVkKSBcbiAgICAgICAgICAgIHRoaXMuc2NvcmVTZXQgPSBbXTtcbiAgICAgICAgdGhpcy5zY29yZVNldC5wdXNoKHNjb3JlKTtcbiAgICB9XG5cbiAgICBnZXRTY29yZShjcml0ZXJpb246IGFueSk6IFNjb3JlIHtcbiAgICAgICAgdmFyIHNjb3JlOiBTY29yZTtcblxuICAgICAgICBpZiAoY3JpdGVyaW9uLm5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2NvcmUgPSB0aGlzLnNjb3JlU2V0LmZpbmQoIChzYykgPT4gc2MubmFtZSA9PT0gY3JpdGVyaW9uLm5hbWUpO1xuICAgICAgICB9IFxuXG4gICAgICAgIHJldHVybiBzY29yZTtcbiAgICB9XG5cbiAgICBnZXRTY29yZVNldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcmVTZXQ7XG4gICAgfVxuXG4gICAgc2V0U2NvcmluZ01ldGhvZChtZXRob2Q6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNjb3JpbmdNZXRob2QgPSBtZXRob2Q7XG4gICAgfVxuXG4gICAgcG9zc2libGUoKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHRvdGFsID0gMDtcbiAgICAgICAgaWYgKHRoaXMuc2NvcmVTZXQgIT09IHVuZGVmaW5lZCkgXG4gICAgICAgICAgICB0aGlzLnNjb3JlU2V0LmZvckVhY2goIChzZXQpID0+IHsgXG4gICAgICAgICAgICAgICAgdG90YWwgPSB0b3RhbCArIHNldC5nZXRWYWx1ZSgpIFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0b3RhbCp0aGlzLndlaWdodDtcbiAgICB9XG5cbiAgICBzdHVkZW50VG90YWxQb2ludHNTY29yZShzdHVkZW50OiBTdHVkZW50KTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHRvdGFsID0gMDtcbiAgICAgICAgaWYgKHRoaXMuc2NvcmVTZXQgIT09IHVuZGVmaW5lZCkgXG4gICAgICAgICAgICB0aGlzLnNjb3JlU2V0LmZvckVhY2goIChzZXQpID0+IHsgXG4gICAgICAgICAgICAgICAgdG90YWwgPSB0b3RhbCArIHN0dWRlbnQuZ2V0KHRoaXMsIHNldC5nZXROYW1lKCkpIFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0b3RhbDtcbiAgICB9XG5cbiAgICBzdHVkZW50VG90YWxTY29yZVBlcmNlbnRhZ2VTY29yZShzdHVkZW50OiBTdHVkZW50KTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHRvdGFsID0gMDtcbiAgICAgICAgbGV0IHBvc3NpYmxlID0gMDtcbiAgICAgICAgaWYgKHRoaXMuc2NvcmVTZXQgIT09IHVuZGVmaW5lZCkgXG4gICAgICAgICAgICB0aGlzLnNjb3JlU2V0LmZvckVhY2goIChzZXQpID0+IHsgXG4gICAgICAgICAgICAgICAgdG90YWwgPSB0b3RhbCArIHN0dWRlbnQuZ2V0KHRoaXMsIHNldC5nZXROYW1lKCkpO1xuICAgICAgICAgICAgICAgIGlmICghIHNldC5leHRyYUNyZWRpdCkgcG9zc2libGUgKz0gc2V0LmdldFZhbHVlKCk7IFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAodG90YWwgLyBwb3NzaWJsZSkqMTAwLjA7XG4gICAgfVxuXG4gICAgc3R1ZGVudEluZGl2aWR1YWxTY29yZVBlcmNlbnRhZ2Uoc3R1ZGVudDogU3R1ZGVudCk6IG51bWJlciB7XG4gICAgICAgIGxldCB0b3RhbCA9IDA7XG4gICAgICAgIGxldCBleHRyYVRvdGFsID0gMDtcbiAgICAgICAgaWYgKHRoaXMuc2NvcmVTZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gRmlndXJlIG91dCB3aXRob3V0IGV4dHJhIGNyZWRpdFxuICAgICAgICAgICAgdGhpcy5zY29yZVNldC5mb3JFYWNoKCAoc2V0KSA9PiB7IFxuICAgICAgICAgICAgICAgIGlmICghIHNldC5leHRyYUNyZWRpdClcbiAgICAgICAgICAgICAgICAgICB0b3RhbCA9IHRvdGFsICsgKCBzdHVkZW50LmdldCh0aGlzLCBzZXQuZ2V0TmFtZSgpKSAvIHNldC5nZXRWYWx1ZSgpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBGaWd1cmUgb3V0IHdpdGggZXh0cmEgY3JlZGl0XG4gICAgICAgICAgICB0aGlzLnNjb3JlU2V0LmZvckVhY2goIChzZXQpID0+IHsgXG4gICAgICAgICAgICAgICAgZXh0cmFUb3RhbCA9IGV4dHJhVG90YWwgKyAoIHN0dWRlbnQuZ2V0KHRoaXMsIHNldC5nZXROYW1lKCkpIC8gc2V0LmdldFZhbHVlKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIGV4dHJhIGNyZWRpdCwgdGhlbiB1c2UgdGhhdFxuICAgICAgICAgICAgaWYgKGV4dHJhVG90YWwgPiB0b3RhbCkgdG90YWwgPSBleHRyYVRvdGFsO1xuICAgICAgICAgICAgdG90YWwgPSB0b3RhbCAvIHRoaXMuc2NvcmVTZXQubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b3RhbCoxMDA7XG4gICAgfVxuXG4gICAgc3R1ZGVudFBlcmNlbnRhZ2VPZlRvdGFsUG9zc2libGUoc3R1ZGVudDogU3R1ZGVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHN0dWRlbnRTY29yZShzdHVkZW50OiBTdHVkZW50KTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHN0dWRzY29yZSA9IDA7XG4gICAgICAgIHN3aXRjaCAodGhpcy5zY29yaW5nTWV0aG9kKSB7XG4gICAgICAgICAgICBjYXNlIENhdGVnb3J5LlNjb3JpbmdNZXRob2QuVE9UQUxfUE9JTlRTOlxuICAgICAgICAgICAgICAgIHN0dWRzY29yZSA9IHRoaXMuc3R1ZGVudFRvdGFsUG9pbnRzU2NvcmUoc3R1ZGVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENhdGVnb3J5LlNjb3JpbmdNZXRob2QuVE9UQUxfU0NPUkVfUEVSQ0VOVEFHRTpcbiAgICAgICAgICAgICAgICBzdHVkc2NvcmUgPSB0aGlzLnN0dWRlbnRUb3RhbFNjb3JlUGVyY2VudGFnZVNjb3JlKHN0dWRlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBDYXRlZ29yeS5TY29yaW5nTWV0aG9kLklORElWSURVQUxfU0NPUkVfUEVSQ0VOVEFHRTpcbiAgICAgICAgICAgICAgICBzdHVkc2NvcmUgPSB0aGlzLnN0dWRlbnRJbmRpdmlkdWFsU2NvcmVQZXJjZW50YWdlKHN0dWRlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBDYXRlZ29yeS5TY29yaW5nTWV0aG9kLlBFUkNFTlRBR0VfT0ZfVE9UQUxfUE9TU0lCTEU6XG4gICAgICAgICAgICAgICAgc3R1ZHNjb3JlID0gdGhpcy5zdHVkZW50UGVyY2VudGFnZU9mVG90YWxQb3NzaWJsZShzdHVkZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdHVkc2NvcmUqdGhpcy53ZWlnaHQ7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVYTUwoKTogc3RyaW5nIHtcblxuICAgICAgICBsZXQgeG1sID0gXG4gICAgICAgICAgICc8Y2F0ZWdvcnkgbmFtZT1cIicgKyB0aGlzLm5hbWUgXG4gICAgICAgICAgICArICdcIiB3ZWlnaHQ9XCInICsgdGhpcy53ZWlnaHQgXG4gICAgICAgICAgICArICdcIiBtZXRob2Q9XCIyJyBcbiAgICAgICAgICAgICAgICAvLyAodGhpcy5zY29yaW5nTWV0aG9kID09IENhdGVnb3J5LlNjb3JpbmdNZXRob2QuVE9UQUxfUE9JTlRTKSA/IFwiMFwiIDpcbiAgICAgICAgICAgICAgICAvLyAgICAodGhpcy5zY29yaW5nTWV0aG9kID09IENhdGVnb3J5LlNjb3JpbmdNZXRob2QuVE9UQUxfU0NPUkVfUEVSQ0VOVEFHRSkgPyBcIjFcIiA6XG4gICAgICAgICAgICAgICAgLy8gICAgICAgKHRoaXMuc2NvcmluZ01ldGhvZCA9PSBDYXRlZ29yeS5TY29yaW5nTWV0aG9kLklORElWSURVQUxfU0NPUkVfUEVSQ0VOVEFHRSkgPyBcIjJcIiA6XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgKHRoaXMuc2NvcmluZ01ldGhvZCA9PSBDYXRlZ29yeS5TY29yaW5nTWV0aG9kLlBFUkNFTlRBR0VfT0ZfVE9UQUxfUE9TU0lCTEUpID8gXCIzXCIgOiBcIjBcIlxuICAgICAgICAgICAgKyAnXCIgZHJvcExvd2VzdD1cIjAnICAvL3RoaXMuZHJvcExvd2VzdCBcbiAgICAgICAgICAgICsgJ1wiIGRyb3BIaWdoZXN0PVwiMCcgIC8vdGhpcy5kcm9wSGlnaGVzdCBcbiAgICAgICAgICAgICsgJ1wiIHBlcmNlbnRPZlNjb3Jlcz1cIicgKyAodGhpcy5wZXJjZW50T2ZTY29yZXMqMTAwKSBcbiAgICAgICAgICAgKyAnXCI+XFxuJztcbiAgICAgICAgaWYgKHRoaXMuc2NvcmVTZXQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnNjb3JlU2V0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnNjb3JlU2V0LmZvckVhY2goIChzZXQpID0+IHsgXG4gICAgICAgICAgICAgICAgeG1sICs9ICc8c2NvcmUgbmFtZT1cIicgKyBzZXQuZ2V0TmFtZSgpICsgJ1wiIHBvc3NpYmxlPVwiJyArIHNldC5nZXRWYWx1ZSgpICsgJ1wiIC8+XFxuJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHhtbCArPSBcIjwvY2F0ZWdvcnk+XFxuXCI7XG5cbiAgICAgICAgcmV0dXJuIHhtbDtcbiAgICB9XG5cbn0iLCJleHBvcnQgY2xhc3MgQ291bnRlciB7XG5cbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgdmFsdWU6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnZhbHVlID0gMDtcbiAgICB9XG5cbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICAgIHRoaXMudmFsdWUrKztcbiAgICB9XG5cbiAgICBkZWNyZW1lbnQoKSB7XG4gICAgICAgIHRoaXMudmFsdWUtLTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IDA7XG4gICAgfVxuXG5cbn0iLCJleHBvcnQgY2xhc3MgUmVtaW5kZXIge1xuXG4gICAgdGV4dDogc3RyaW5nO1xuICAgIGRhdGU6IERhdGU7XG4gICAgcmVwZWF0OiBudW1iZXI7XG4gICAgcHJpb3I6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHRleHQ6IHN0cmluZywgZGF0ZTogRGF0ZSwgcmVwZWF0OiBudW1iZXIsIHByaW9yOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICAgICAgdGhpcy5kYXRlID0gZGF0ZTtcbiAgICAgICAgdGhpcy5yZXBlYXQgPSByZXBlYXQ7XG4gICAgICAgIHRoaXMucHJpb3IgPSBwcmlvcjtcbiAgICB9XG5cbiAgICBpc1RyaWdnZXJlZCgpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGxldCBjaGVjayA9IG5ldyBEYXRlKG5vdy5nZXRGdWxsWWVhcigpLCBub3cuZ2V0TW9udGgoKSwgbm93LmdldERhdGUoKS10aGlzLnByaW9yKTtcbiAgICAgICAgaWYgKHRoaXMuZGF0ZS5nZXRUaW1lKCkgLSBjaGVjay5nZXRUaW1lKCkgPj0gMCBcbiAgICAgICAgICAgICYmIHRoaXMuZGF0ZS5nZXRUaW1lKCkgLSBjaGVjay5nZXRUaW1lKCkgPD0gKHRoaXMucHJpb3IgKiA4NjQwMDAwMCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgbGV0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGxldCBuZXdkYXRlID0gbmV3IERhdGUobm93LmdldEZ1bGxZZWFyKCksIG5vdy5nZXRNb250aCgpLCBub3cuZ2V0RGF0ZSgpK3RoaXMucmVwZWF0KTtcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3ZGF0ZTtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0ICsgXCIgfCBcIiArIHRoaXMuZGF0ZS50b1N0cmluZygpICsgXCIgfCBcIiArIHRoaXMucmVwZWF0LnRvU3RyaW5nKCkgKyBcIiB8IFwiICsgdGhpcy5wcmlvci50b1N0cmluZygpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgVEZvbGRlciB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVdGlsaXRpZXMge1xuXG4gICAgVEFHUzogc3RyaW5nID0gXCJ0YWdzXCI7XG4gICAgTUFSS0RPV046IHN0cmluZyA9IFwibWFya2Rvd25cIjtcblxuICAgIHN0YXRpYyBleHRyYWN0VGFncyhkYXRhOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICB2YXIgdGFnOiBzdHJpbmc7XG4gICAgICAgIHZhciBkZWZpbml0aW9uOiBzdHJpbmc7XG4gICAgICAgIGxldCBsaW5lcyA9IGRhdGEuc3BsaXQoXCJcXG5cIik7XG5cbiAgICAgICAgdmFyIGV4dHJhY3Rpb246IHN0cmluZyA9IFwiXCI7XG5cbiAgICAgICAgbGluZXMuZm9yRWFjaCggKGxpbmU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKGxpbmUuY2hhckF0KDApID09PSAnIycgJiYgbGluZS5jaGFyQXQoMSkgIT09ICcgJykge1xuICAgICAgICAgICAgICAgIGxldCB0YWcgPSBsaW5lLnN1YnN0cmluZygwLCBsaW5lLmluZGV4T2YoXCIgXCIpKTtcbiAgICAgICAgICAgICAgICBsZXQgZGVmaW5pdGlvbiA9IGxpbmUuc3Vic3RyaW5nKGxpbmUuaW5kZXhPZihcIiBcIikpO1xuICAgICAgICAgICAgICAgIGRlZmluaXRpb24gPSBkZWZpbml0aW9uLnRyaW0oKTtcblxuICAgICAgICAgICAgICAgIGV4dHJhY3Rpb24gKz0gdGFnICsgXCIgXCIgKyBkZWZpbml0aW9uICsgXCJcXG5cIjtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiBleHRyYWN0aW9uO1xuXG4gICAgfVxuXG4gICAgc3RhdGljIGV4dHJhY3QoZGF0YTogc3RyaW5nLCB3aGF0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAod2hhdCA9PT0gdGhpcy5UQUdTKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leHRyYWN0VGFncyhkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGZpbGVFeGlzdHMoZmlsZU5hbWU6IHN0cmluZywgZm9sZGVyOiBURm9sZGVyKTogQm9vbGVhbiB7XG5cdFx0dmFyIHJlczogYm9vbGVhbiA9IGZhbHNlO1xuXHRcdGxldCBmaWxlID0gZm9sZGVyLmNoaWxkcmVuLmZpbmQoYWZpbGUgPT4gYWZpbGUubmFtZSA9PT0gZmlsZU5hbWUpO1xuXHRcdHJldHVybiAoZmlsZSAhPT0gdW5kZWZpbmVkKTtcblx0fVxuXG4gICAgc3RhdGljIHNsZWVwKG1zOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzbGVlcDIobWlsbGlzOiBudW1iZXIpIHtcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdmFyIGN1ckRhdGUgPSAwO1xuICAgICAgICB3aGlsZShjdXJEYXRlLWRhdGUgPCBtaWxsaXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2xlZXBpbmc6IFwiICsgKGN1ckRhdGUtZGF0ZSkgKyBcIiBcIiArIG1pbGxpcyArIFwiIFwiICsgKGN1ckRhdGUtZGF0ZSA8IG1pbGxpcykpO1xuICAgICAgICAgICAgY3VyRGF0ZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHN0YXRpYyBmaXhUb1BsYWNlcyhudW1iZXI6IG51bWJlciwgcGxhY2VzOiBudW1iZXIgPSAyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIChNYXRoLnJvdW5kKG51bWJlciAqIDEwMCkgLyAxMDApLnRvRml4ZWQocGxhY2VzKVxuICAgIH1cblxuICAgIC8vIEZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTU2MDI0OC9wcm9ncmFtbWF0aWNhbGx5LWxpZ2h0ZW4tb3ItZGFya2VuLWEtaGV4LWNvbG9yLW9yLXJnYi1hbmQtYmxlbmQtY29sb3JzXG4gICAgc3RhdGljIHBTQkM9KHAsYzAsYzEsbCk9PntcbiAgICAgICAgbGV0IHIsZyxiLFAsZix0LGgsaT1wYXJzZUludCxtPU1hdGgucm91bmQsYT10eXBlb2YoYzEpPT1cInN0cmluZ1wiO1xuICAgICAgICBpZih0eXBlb2YocCkhPVwibnVtYmVyXCJ8fHA8LTF8fHA+MXx8dHlwZW9mKGMwKSE9XCJzdHJpbmdcInx8KGMwWzBdIT0ncicmJmMwWzBdIT0nIycpfHwoYzEmJiFhKSlyZXR1cm4gbnVsbDtcbiAgICAgICAgaWYoIXRoaXMucFNCQ3IpdGhpcy5wU0JDcj0oZCk9PntcbiAgICAgICAgICAgIGxldCBuPWQubGVuZ3RoLHg9e307XG4gICAgICAgICAgICBpZihuPjkpe1xuICAgICAgICAgICAgICAgIFtyLGcsYixhXT1kPWQuc3BsaXQoXCIsXCIpLG49ZC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgaWYobjwzfHxuPjQpcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgeC5yPWkoclszXT09XCJhXCI/ci5zbGljZSg1KTpyLnNsaWNlKDQpKSx4Lmc9aShnKSx4LmI9aShiKSx4LmE9YT9wYXJzZUZsb2F0KGEpOi0xXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZihuPT04fHxuPT02fHxuPDQpcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgaWYobjw2KWQ9XCIjXCIrZFsxXStkWzFdK2RbMl0rZFsyXStkWzNdK2RbM10rKG4+ND9kWzRdK2RbNF06XCJcIik7XG4gICAgICAgICAgICAgICAgZD1pKGQuc2xpY2UoMSksMTYpO1xuICAgICAgICAgICAgICAgIGlmKG49PTl8fG49PTUpeC5yPWQ+PjI0JjI1NSx4Lmc9ZD4+MTYmMjU1LHguYj1kPj44JjI1NSx4LmE9bSgoZCYyNTUpLzAuMjU1KS8xMDAwO1xuICAgICAgICAgICAgICAgIGVsc2UgeC5yPWQ+PjE2LHguZz1kPj44JjI1NSx4LmI9ZCYyNTUseC5hPS0xXG4gICAgICAgICAgICB9cmV0dXJuIHh9O1xuICAgICAgICBoPWMwLmxlbmd0aD45LGg9YT9jMS5sZW5ndGg+OT90cnVlOmMxPT1cImNcIj8haDpmYWxzZTpoLGY9dGhpcy5wU0JDcihjMCksUD1wPDAsdD1jMSYmYzEhPVwiY1wiP3RoaXMucFNCQ3IoYzEpOlA/e3I6MCxnOjAsYjowLGE6LTF9OntyOjI1NSxnOjI1NSxiOjI1NSxhOi0xfSxwPVA/cCotMTpwLFA9MS1wO1xuICAgICAgICBpZighZnx8IXQpcmV0dXJuIG51bGw7XG4gICAgICAgIGlmKGwpcj1tKFAqZi5yK3AqdC5yKSxnPW0oUCpmLmcrcCp0LmcpLGI9bShQKmYuYitwKnQuYik7XG4gICAgICAgIGVsc2Ugcj1tKChQKmYucioqMitwKnQucioqMikqKjAuNSksZz1tKChQKmYuZyoqMitwKnQuZyoqMikqKjAuNSksYj1tKChQKmYuYioqMitwKnQuYioqMikqKjAuNSk7XG4gICAgICAgIGE9Zi5hLHQ9dC5hLGY9YT49MHx8dD49MCxhPWY/YTwwP3Q6dDwwP2E6YSpQK3QqcDowO1xuICAgICAgICBpZihoKXJldHVyblwicmdiXCIrKGY/XCJhKFwiOlwiKFwiKStyK1wiLFwiK2crXCIsXCIrYisoZj9cIixcIittKGEqMTAwMCkvMTAwMDpcIlwiKStcIilcIjtcbiAgICAgICAgZWxzZSByZXR1cm5cIiNcIisoNDI5NDk2NzI5NityKjE2Nzc3MjE2K2cqNjU1MzYrYioyNTYrKGY/bShhKjI1NSk6MCkpLnRvU3RyaW5nKDE2KS5zbGljZSgxLGY/dW5kZWZpbmVkOi0yKVxuICAgIH1cblxufSIsImltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSBcIi4vQ2F0ZWdvcnlcIjtcbmltcG9ydCB7IENvdW50ZXIgfSBmcm9tIFwiLi9Db3VudGVyXCI7XG5pbXBvcnQgeyBHcmFkZVNldCB9IGZyb20gXCIuL0dyYWRlU2V0XCI7XG5pbXBvcnQgeyBTY29yZSB9IGZyb20gXCIuL1Njb3JlXCI7XG5pbXBvcnQgeyBURmlsZSB9IGZyb20gXCJvYnNpZGlhblwiXG5pbXBvcnQgVXRpbGl0aWVzIGZyb20gXCIuLi91dGlsaXRpZXMvVXRpbGl0aWVzXCI7XG5cbmV4cG9ydCBjbGFzcyBTdHVkZW50IHtcblxuICAgIG5hbWU6IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIGVtYWlsYWRkcmVzczogc3RyaW5nO1xuICAgIG5pY2tuYW1lOiBzdHJpbmc7XG4gICAgbW9iaWxlUGhvbmVOdW1iZXI6IHN0cmluZztcbiAgICBub3Rlczogc3RyaW5nO1xuXHRncmFkaW5nX3NjaGVtZTogbnVtYmVyO1xuICAgIGZsYWdzOiBudW1iZXI7XG4gICAgc2NvcmVzOiBNYXA8c3RyaW5nLCBudW1iZXI+O1xuXHRhYnNlbmNlczogRGF0ZVtdO1xuICAgIGNvdW50ZXJzOiBDb3VudGVyW107XG5cdGltYWdlOiBzdHJpbmc7XG4gICAgXG4gICAgZGF0YU1vZGlmaWVkOiBib29sZWFuO1xuICAgIGltYWdlTW9kaWZpZWQ6IGJvb2xlYW47XG4gICAgbm90ZXNNb2RpZmllZDogYm9vbGVhbjtcblxuICAgIGRhdGE6IE1hcDxzdHJpbmcsIHN0cmluZz47XG5cbiAgICBzdHVkZW50RGl2OiBIVE1MRWxlbWVudDtcbiAgICBzdHVkZW50SW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQ7XG5cbiAgICBzb3VyY2VGaWxlOiBURmlsZTtcbiAgICBub3RlRGF0YTogc3RyaW5nO1xuICAgIGRpc3BsYXllZEZpbmFsU2NvcmU6IG51bWJlcjtcblxuICAgIHNjcm9sbHRleHRJY29uOiBzdHJpbmcgPSAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIGNsYXNzPVwibHVjaWRlIGx1Y2lkZS1zY3JvbGwtdGV4dFwiPjxwYXRoIGQ9XCJNOCAyMWgxMmEyIDIgMCAwIDAgMi0ydi0ySDEwdjJhMiAyIDAgMSAxLTQgMFY1YTIgMiAwIDEgMC00IDB2M2g0XCIvPjxwYXRoIGQ9XCJNMTkgMTdWNWEyIDIgMCAwIDAtMi0ySDRcIi8+PHBhdGggZD1cIk0xNSA4aC01XCIvPjxwYXRoIGQ9XCJNMTUgMTJoLTVcIi8+PC9zdmc+JztcblxuICAgIGNvbnN0cnVjdG9yKG9iajogYW55KSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gICAgICAgIGlmIChvYmogIT0gbnVsbCkge1xuICAgICAgICAgICAgbGV0IG9vYmogPSBvYmogYXMgT2JqZWN0O1xuICAgICAgICAgICAgT2JqZWN0LmtleXMob29iaikuZm9yRWFjaCggKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChrZXksIG9ialtrZXldKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRhdGEuc2V0KFwiZGF0YU1vZGlmaWVkXCIsIFwiZmFsc2VcIik7XG4gICAgICAgIHRoaXMuZGF0YS5zZXQoXCJpbWFnZU1vZGlmaWVkXCIsIFwiZmFsc2VcIik7XG4gICAgICAgIHRoaXMuZGF0YS5zZXQoXCJub3Rlc01vZGlmaWVkXCIsIFwiZmFsc2VcIik7XG5cbiAgICAgICAgdGhpcy5zY29yZXMgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuICAgICAgICBpZiAob2JqICE9IG51bGwgJiYgb2JqLnNjb3JlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsZXQgYXJyID0gQXJyYXkuZnJvbShvYmouc2NvcmVzKTtcbiAgICAgICAgICAgIGFyci5mb3JFYWNoKCAocGFpcjogYW55KSA9PntcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3Jlcy5zZXQocGFpci5uYW1lLCBwYWlyLnZhbHVlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5vdGVEYXRhID0gXCJcIjtcbiAgICAgICAgdGhpcy5hYnNlbmNlcyA9IFtdO1xuICAgICAgICB0aGlzLmNvdW50ZXJzID0gW107XG4gICAgICAgIHRoaXMubm90ZXMgPSBcIlwiO1xuICAgICAgICB0aGlzLnNvdXJjZUZpbGUgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uZmlndXJlRnJvbURhdGEoZGF0YTogc3RyaW5nKSB7XG4gICAgICAgIHZhciBzY29yZXM6IGFueVtdO1xuICAgICAgICB2YXIgdGFnOiBzdHJpbmc7XG4gICAgICAgIHZhciBkZWZpbml0aW9uOiBzdHJpbmc7XG5cbiAgICAgICAgdGhpcy5ub3RlRGF0YSA9IGRhdGE7XG5cbiAgICAgICAgbGV0IGxpbmVzID0gZGF0YS5zcGxpdChcIlxcblwiKTtcblxuICAgICAgICBzY29yZXMgPSBbXTtcbiAgICAgICAgdGhpcy5hYnNlbmNlcyA9IFtdO1xuICAgICAgICB0aGlzLmNvdW50ZXJzID0gW107XG4gICAgICAgIHRoaXMubm90ZXMgPSBcIlwiO1xuXG4gICAgICAgIGxpbmVzLmZvckVhY2goIChsaW5lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmIChsaW5lLmNoYXJBdCgwKSA9PT0gJyMnICYmIGxpbmUuY2hhckF0KDEpICE9PSAnICcpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGFnID0gbGluZS5zdWJzdHJpbmcoMCwgbGluZS5pbmRleE9mKFwiIFwiKSk7XG4gICAgICAgICAgICAgICAgbGV0IGRlZmluaXRpb24gPSBsaW5lLnN1YnN0cmluZyhsaW5lLmluZGV4T2YoXCIgXCIpKTtcbiAgICAgICAgICAgICAgICBkZWZpbml0aW9uID0gZGVmaW5pdGlvbi50cmltKCk7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNPTkZJR1VSSU5HIFNUVURFTlQgd2l0aCBcIit0YWcrJyBhcyAnK2RlZmluaXRpb24pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRhZyA9PT0gXCIjbm90ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQURESU5HIE5PVEUgdG8gXCIrdGhpcy5ub3Rlcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90ZXMgKz0gZGVmaW5pdGlvbiArIFwiXFxuXCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubm90ZXMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFnID09PSBcIiNzY29yZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9wcyA9IGRlZmluaXRpb24uc3BsaXQoXCJ8XCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldChwcm9wc1swXS50cmltKCksIHByb3BzWzFdLnRyaW0oKSwgcGFyc2VGbG9hdChwcm9wc1syXSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFnID09PSBcIiNjb3VudGVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb3BzID0gZGVmaW5pdGlvbi5zcGxpdChcInxcIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3VudGVyID0gbmV3IENvdW50ZXIocHJvcHNbMF0udHJpbSgpKTsgXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXIudmFsdWUgPSBwYXJzZUludChwcm9wc1sxXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY291bnRlcnMucHVzaChjb3VudGVyKTsgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0YWcgPT09IFwiI2Fic2VuY2VcIikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKGRlZmluaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRlKVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hYnNlbmNlcyA9PSB1bmRlZmluZWQgfHwgdGhpcy5hYnNlbmNlcyA9PSBudWxsKSB0aGlzLmFic2VuY2VzICA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFic2VuY2VzLnB1c2goZGF0ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZuYW1lID0gdGFnLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldCh2bmFtZSwgZGVmaW5pdGlvbik7IFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIFxuICAgIH1cblxuICAgIHNldFNvdXJjZUZpbGUoZmlsZTogVEZpbGUpIHtcbiAgICAgICAgdGhpcy5zb3VyY2VGaWxlID0gZmlsZTtcbiAgICB9XG5cbiAgICBkaXNwbGF5KGRpdjogSFRNTERpdkVsZW1lbnQsIHN0eWxlOiBzdHJpbmcsIGZpbmFsU2NvcmU6IG51bWJlciwgZmluYWxXaXRoV2VpZ2h0czogbnVtYmVyID0gLTEpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRGaW5hbFNjb3JlID0gZmluYWxTY29yZTtcbiAgICAgICAgdGhpcy5zdHVkZW50RGl2ID0gZGl2LmNyZWF0ZUVsKFwiZGl2XCIpOy8vLCB7Y2xzOiBcInN0dWRlbnQtc3R5bGVcIn0pO1xuXG4gICAgICAgIGxldCB0YWJsZSA9IHRoaXMuc3R1ZGVudERpdi5jcmVhdGVFbChcInRhYmxlXCIsIHsgY2xzOiBcInN0dWRlbnQtdGFibGUtc3R5bGVcIiB9KTtcbiAgICAgICAgbGV0IHRib2R5ID0gdGFibGUuY3JlYXRlRWwoXCJ0Ym9keVwiKTtcbiAgICAgICAgbGV0IHJvdyA9IHRib2R5LmNyZWF0ZUVsKFwidHJcIik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnN0dWRlbnRJbWFnZSA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLmRhdGEuZ2V0KFwiaW1hZ2VcIikgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGV0IGNlbGwgPSByb3cuY3JlYXRlRWwoXCJ0ZFwiLCB7IGNsczogc3R5bGUgfSk7XG4gICAgICAgICAgICBsZXQgaGVpOiBIVE1MSW1hZ2VFbGVtZW50ID0gY2VsbC5jcmVhdGVFbChcImltZ1wiKTsgXG4gICAgICAgICAgICBoZWkuc3JjID0gdGhpcy5kYXRhLmdldChcImltYWdlXCIpO1xuICAgICAgICAgICAgaGVpLmhlaWdodCA9IDEwMDtcbiAgICAgICAgICAgIHRoaXMuc3R1ZGVudEltYWdlID0gaGVpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5ub3RlcyAhPT0gdW5kZWZpbmVkICYmIHRoaXMubm90ZXMgIT09IG51bGwgJiYgdGhpcy5ub3Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY2VsbC5jcmVhdGVFbChcImJyXCIpO1xuICAgICAgICAgICAgICAgIGNlbGwuaW5uZXJIVE1MICs9IHRoaXMuc2Nyb2xsdGV4dEljb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZnNjb3JlID0gVXRpbGl0aWVzLmZpeFRvUGxhY2VzKGZpbmFsU2NvcmUpO1xuXG4gICAgICAgIGxldCBjZWxsID0gcm93LmNyZWF0ZUVsKFwidGRcIiwgeyBjbHM6IHN0eWxlIH0pO1xuICAgICAgICBjZWxsLmNyZWF0ZUVsKFwiaDNcIiwge3RleHQ6IHRoaXMuZGF0YS5nZXQoXCJuYW1lXCIpLCBjbHM6IHN0eWxlfSk7XG4gICAgICAgIGlmIChmaW5hbFdpdGhXZWlnaHRzID09IC0xKSBcbiAgICAgICAgICAgIGNlbGwuY3JlYXRlRWwoXCJoNFwiLCB7dGV4dDogXCJcIitmc2NvcmUsIGNsczogc3R5bGV9KTtcbiAgICAgICAgZWxzZSBcbiAgICAgICAgICAgIGNlbGwuY3JlYXRlRWwoXCJoNFwiLCB7dGV4dDogXCJcIitmc2NvcmUrXCIgKFwiK1V0aWxpdGllcy5maXhUb1BsYWNlcyhmaW5hbFdpdGhXZWlnaHRzKStcIiUpXCIsIGNsczogc3R5bGV9KTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmNvdW50ZXJzKTtcbiAgICAgICAgaWYgKHRoaXMuY291bnRlcnMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvdW50ZXJzICE9PSBudWxsICYmIHRoaXMuY291bnRlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGNvdW50ZXJQID0gY2VsbC5jcmVhdGVFbChcInBcIik7XG4gICAgICAgICAgICB0aGlzLmNvdW50ZXJzLmZvckVhY2goIChjb3VudGVyOiBDb3VudGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY291bnRlclAuY3JlYXRlRWwoXCJzcGFuXCIsIHt0ZXh0OiBjb3VudGVyLm5hbWUgKyBcIjogXCIgKyBjb3VudGVyLnZhbHVlfSk7XG4gICAgICAgICAgICAgICAgY291bnRlclAuY3JlYXRlRWwoXCJiclwiKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYWJzZW5jZXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmFic2VuY2VzICE9PSBudWxsICYmIHRoaXMuYWJzZW5jZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGFicyA9IGNlbGwuY3JlYXRlRWwoXCJwXCIsIHt0ZXh0OiBcIlwiK3RoaXMuYWJzZW5jZXMubGVuZ3RoK1wiIGFic2Vuc2VzXCJ9KTtcbiAgICAgICAgICAgIGFicy5zdHlsZS5jb2xvciA9IFwicmVkXCI7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgZGlzcGxheVJvdyhyb3c6IEhUTUxEaXZFbGVtZW50LCBncmFkZVNldDogR3JhZGVTZXQpIHtcbiAgICAgICAgdGhpcy5zdHVkZW50RGl2ID0gcm93O1xuICAgICAgICBcbiAgICAgICAgbGV0IG5hbWVib3ggPSByb3cuY3JlYXRlRWwoXCJ0ZFwiLCB7IGNsczogXCJzdHVkZW50LWxpc3QtY2VsbC1zdHlsZVwiLCBhdHRyOiB7IGFsaWduOiBcImxlZnRcIiB9IH0pO1xuICAgICAgICBuYW1lYm94LmNyZWF0ZUVsKFwiaDNcIiwge3RleHQ6IHRoaXMuZGF0YS5nZXQoXCJuYW1lXCIpfSk7XG4gICAgICAgIGxldCBpZGJveCA9IHJvdy5jcmVhdGVFbChcInRkXCIsIHsgY2xzOiBcInN0dWRlbnQtbGlzdC1jZWxsLXN0eWxlXCIgfSk7XG4gICAgICAgIGlkYm94LmNyZWF0ZUVsKFwiaDNcIiwge3RleHQ6IHRoaXMuZGF0YS5nZXQoXCJpZFwiKX0pO1xuICAgICAgICBsZXQgZmluYWxib3ggPSByb3cuY3JlYXRlRWwoXCJ0ZFwiLCB7IGNsczogXCJzdHVkZW50LWxpc3QtZmluYWxzY29yZS1zdHlsZVwiIH0pO1xuICAgICAgICBmaW5hbGJveC5jcmVhdGVFbChcImgzXCIsIHt0ZXh0OiBcIlwiK1V0aWxpdGllcy5maXhUb1BsYWNlcyh0aGlzLmRpc3BsYXllZEZpbmFsU2NvcmUpfSk7XG4gICAgICAgIFxuICAgICAgICBncmFkZVNldC5jYXRlZ29yaWVzLmZvckVhY2goIChjYXQ6IENhdGVnb3J5KSA9PiB7IFxuICAgICAgICAgICAgaWYgKGNhdC5zY29yZVNldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY2F0LnNjb3JlU2V0LmZvckVhY2goIChzY29yZTogU2NvcmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0dWRlbnRTY29yZSA9IHRoaXMuZ2V0KGNhdCwgc2NvcmUubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3R1ZGVudFNjb3JlID09ICd1bmRlZmluZWQnKSBzdHVkZW50U2NvcmUgPSAwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbCA9IHJvdy5jcmVhdGVFbChcInRkXCIsIHsgY2xzOiBcInN0dWRlbnQtbGlzdC1jZWxsLXN0eWxlXCIgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY3JlYXRlRWwoXCJoM1wiLCB7dGV4dDogXCJcIitzdHVkZW50U2NvcmV9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0RGl2KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdHVkZW50RGl2O1xuICAgIH1cblxuICAgIGdldEhFSSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3R1ZGVudEltYWdlO1xuICAgIH0gICBcblxuICAgIGdldChjYXQ6IGFueSwgbmFtZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgdmFyIGtleTogc3RyaW5nO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY2F0ID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBrZXkgPSBjYXQgKyBcInxcIiArIG5hbWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBrZXkgPSAoY2F0IGFzIENhdGVnb3J5KS5uYW1lICsgXCJ8XCIgKyBuYW1lO1xuICAgICAgICB9XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJHRVRUSU5HU0NPUkUgXCIra2V5KTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnNjb3Jlcy5rZXlzKCkpO1xuICAgICAgICByZXR1cm4gdGhpcy5zY29yZXMuZ2V0KGtleSk7XG4gICAgfVxuXG4gICAgc2V0KGNhdDogYW55LCBzbmFtZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHZhciBrZXk6IHN0cmluZztcblxuICAgICAgICBpZiAodHlwZW9mIGNhdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGtleSA9IGNhdCArIFwifFwiICsgc25hbWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBrZXkgPSAoY2F0IGFzIENhdGVnb3J5KS5uYW1lICsgXCJ8XCIgKyBzbmFtZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zY29yZXMuZ2V0KGtleSkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5ub3RlRGF0YSArPSBcIlxcbiNzY29yZSBcIitrZXkrXCJ8XCIrdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJTRVRUSU5HIFwiK2tleStcIiB0byBcIit2YWx1ZSlcbiAgICAgICAgdGhpcy5zY29yZXMuc2V0KGtleSwgdmFsdWUpO1xuICAgIH1cblxuICAgIHNldEZyb21QYWlyKHsgbmFtZSwgdmFsdWV9OiB7bmFtZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyfSwgYWRkVG9EYXRhPXRydWUpIHtcbiAgICAgICAgaWYgKHRoaXMuc2NvcmVzLmdldChuYW1lKSA9PT0gdW5kZWZpbmVkICYmIGFkZFRvRGF0YSkge1xuICAgICAgICAgICAgdGhpcy5ub3RlRGF0YSArPSBcIlxcbiNzY29yZSBcIituYW1lK1wifFwiK3ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2NvcmVzLnNldChuYW1lLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgYWRkQWJzZW5jZShkYXRlOiBEYXRlLCBhZGRUb0RhdGE9dHJ1ZSkge1xuICAgICAgICBpZiAodGhpcy5hYnNlbmNlcyA9PSB1bmRlZmluZWQgfHwgdGhpcy5hYnNlbmNlcyA9PSBudWxsKSB0aGlzLmFic2VuY2VzICA9IFtdO1xuICAgICAgICB2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB2YXIgZGQgPSB0b2RheS5nZXREYXRlKCk7XG4gICAgICAgIHZhciBtbSA9IHRvZGF5LmdldE1vbnRoKCkrMTsgXG4gICAgICAgIHZhciB5eXl5ID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChhZGRUb0RhdGEpIHtcbiAgICAgICAgICAgIHRoaXMubm90ZURhdGEgKz0gXCJcXG4jYWJzZW5jZSBcIittbStcIi9cIitkZCtcIi9cIit5eXl5O1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5ub3RlRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hYnNlbmNlcy5wdXNoKGRhdGUpO1xuICAgIH1cblxuICAgIGFkZENvdW50ZXIoY291bnRlcjogQ291bnRlciwgYWRkVG9EYXRhPXRydWUpIHtcbiAgICAgICAgaWYgKGFkZFRvRGF0YSkge1xuICAgICAgICAgICAgdGhpcy5ub3RlRGF0YSArPSBcIlxcbiNjb3VudGVyIFwiK2NvdW50ZXIubmFtZStcInxcIitjb3VudGVyLnZhbHVlO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5ub3RlRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb3VudGVycy5wdXNoKGNvdW50ZXIpO1xuICAgIH1cblxuICAgIGRlbGV0ZUNvdW50ZXIoY291bnRlcjogQ291bnRlcikge1xuICAgICAgICBmb3IgKGxldCBpPTA7IGkgPCB0aGlzLmNvdW50ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb3VudGVyc1tpXS5uYW1lID09PSBjb3VudGVyLm5hbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50ZXJzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmRDb3VudGVyKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICB2YXIgZm91bmQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb3VudGVycy5mb3JFYWNoKCAoY291bnRlcjogQ291bnRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGNvdW50ZXIubmFtZSA9PT0gbmFtZSkgZm91bmQgPSB0cnVlO1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgfVxuXG4gICAgZ2V0Q291bnRlcihuYW1lOiBzdHJpbmcpOiBDb3VudGVyIHtcbiAgICAgICAgbGV0IGMgOiBDb3VudGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb3VudGVycy5mb3JFYWNoKCAoY291bnRlcjogQ291bnRlcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDT01QQVJJTkcgJ1wiK2NvdW50ZXIubmFtZStcIicgdG8gJ1wiK25hbWUrXCInXCIpXG4gICAgICAgICAgICBpZiAoY291bnRlci5uYW1lLmxvY2FsZUNvbXBhcmUobmFtZSkgPT09IDApIGMgPSBjb3VudGVyO1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gYztcbiAgICB9XG5cbiAgICB1cGRhdGVDb3VudGVyKGNvdW50ZXI6IENvdW50ZXIpIHtcbiAgICAgICAgdGhpcy5jb3VudGVycy5mb3JFYWNoKCAoYzogQ291bnRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGMubmFtZSA9PT0gY291bnRlci5uYW1lKSB7XG4gICAgICAgICAgICAgICAgYy52YWx1ZSA9IGNvdW50ZXIudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc2V0Tm90ZXMobm90ZXM6IHN0cmluZykge1xuICAgICAgICB0aGlzLm5vdGVzID0gbm90ZXM7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVNYXJrZG93bihncmFkZVNldDogR3JhZGVTZXQpIHtcbiAgICAgICAgdmFyIHN0dWRlbnROb3RlOiBzdHJpbmcgPSBcIlwiO1xuICAgIFxuICAgICAgICAvLyBUaXRsZSBcbiAgICAgICAgc3R1ZGVudE5vdGUgKz0gXCItLS0tXFxuIyBcIit0aGlzLmRhdGEuZ2V0KFwibmFtZVwiKSsnXFxuJztcbiAgICAgICAgc3R1ZGVudE5vdGUgKz0gXCIhW2ltYWdlfDEwMF0oXCIrdGhpcy5kYXRhLmdldChcImltYWdlXCIpKycpXFxuJztcbiAgICAgICAgc3R1ZGVudE5vdGUgKz0gXCIgLSBJRDogXCIrdGhpcy5kYXRhLmdldChcImlkXCIpKydcXG4nO1xuICAgICAgICBzdHVkZW50Tm90ZSArPSBcIiAtIEVtYWlsOiBcIit0aGlzLmRhdGEuZ2V0KFwiZW1haWxhZGRyZXNzXCIpK1wiXFxuXCI7XG4gICAgICAgIHN0dWRlbnROb3RlICs9IFwiXFxuLS0tLVxcblwiOyBcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuYWJzZW5jZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc3R1ZGVudE5vdGUgKz0gXCIjIyMgQWJzZW5jZXM6IFxcblwiO1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpIDwgdGhpcy5hYnNlbmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgc3R1ZGVudE5vdGUgKz0gXCIgLSBcIiArIHRoaXMuYWJzZW5jZXNbaV0udG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi11cycsIHsgeWVhcjpcIm51bWVyaWNcIiwgbW9udGg6XCJzaG9ydFwiLCBkYXk6XCJudW1lcmljXCJ9KSArIFwiXFxuXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHVkZW50Tm90ZSArPSBcIlxcbi0tLS1cXG5cIlxuICAgICAgICAgIH1cbiAgICAgIFxuICAgICAgICBpZiAodGhpcy5jb3VudGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzdHVkZW50Tm90ZSArPSBcIiMjIyBDb3VudGVyczogXFxuXCI7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7IGkgPCB0aGlzLmNvdW50ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc3R1ZGVudE5vdGUgKz0gXCIgLSBcIiArIHRoaXMuY291bnRlcnNbaV0ubmFtZSArIFwiOiBcIiArIHRoaXMuY291bnRlcnNbaV0udmFsdWUgKyBcIlxcblwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3R1ZGVudE5vdGUgKz0gXCJcXG4tLS0tXFxuXCJcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm5vdGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHN0dWRlbnROb3RlICs9IFwiIyMjIE5vdGVzOiBcXG5cIjtcbiAgICAgICAgICAgIHN0dWRlbnROb3RlICs9IHRoaXMubm90ZXM7XG4gICAgICAgICAgICBzdHVkZW50Tm90ZSArPSBcIlxcbi0tLS1cXG5cIlxuICAgICAgICB9XG4gICAgICBcbiAgICAgICAgaWYgKGdyYWRlU2V0LmNhdGVnb3JpZXMgIT0gbnVsbCkge1xuICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN0dWRlbnRWaWV3IENhdGVnb3J5IGxpc3RpbmdcIik7XG4gICAgICAgICAgIHN0dWRlbnROb3RlICs9IFwiIyMjIFNjb3JlczogXFxuXCI7XG4gICAgICAgICAgIGdyYWRlU2V0LmNhdGVnb3JpZXMuZm9yRWFjaCgoY2F0OiBDYXRlZ29yeSkgPT4ge1xuICAgICAgICAgICAgc3R1ZGVudE5vdGUgKz0gXCI+IFshbm90ZV0gXCIrIGNhdC5uYW1lICsgXCJcXG5cIjtcbiAgICAgICAgICAgIGlmIChjYXQuc2NvcmVTZXQgIT09IHVuZGVmaW5lZCAmJiBjYXQuc2NvcmVTZXQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBjYXQuc2NvcmVTZXQuZm9yRWFjaCggKHNjb3JlOiBTY29yZSkgPT4ge1xuICAgICAgICAgICAgICAgIHN0dWRlbnROb3RlICs9IFwiPiAtICoqXCIrc2NvcmUubmFtZStcIioqOiBcIjtcbiAgICAgICAgICAgICAgICAgbGV0IHN0dWRlbnRTY29yZSA9IHRoaXMuZ2V0KGNhdCwgc2NvcmUubmFtZSk7XG4gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU1RVREVOVFNDT1JFOiBcIitzdHVkZW50U2NvcmUpO1xuICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN0dWRlbnRTY29yZSA9PSAndW5kZWZpbmVkJykgc3R1ZGVudFNjb3JlID0gMDtcbiAgICAgICAgICAgICAgICAgc3R1ZGVudE5vdGUgKz0gXCJcIiArIHN0dWRlbnRTY29yZSArIFwiIC8gXCIgKyBzY29yZS52YWx1ZSArIFwiXFxuXCI7XG4gICAgICAgICAgICAgfSlcbiAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdHVkZW50Tm90ZSArPSBcIj4gTk8gU0NPUkVTXFxuXCI7XG4gICAgICAgICAgIH1cbiAgICAgICAgICAgc3R1ZGVudE5vdGUgKz0gXCJcXG5cIjtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBcbiAgICBcbiAgICAgICAgbGV0IGZpbmFsID0gZ3JhZGVTZXQuZmluYWxTY29yZSh0aGlzKTtcbiAgICAgICAgc3R1ZGVudE5vdGUgKz0gXCIjIyBUT1RBTCA9IFwiK1V0aWxpdGllcy5maXhUb1BsYWNlcyhmaW5hbCk7IFxuICAgICAgICBpZiAoISBncmFkZVNldC5hbGxDYXRlZ29yaWVzSGF2ZVNjb3JlcygpKSB7XG4gICAgICAgICAgICBzdHVkZW50Tm90ZSArPSBcIiAoXCIgKyBVdGlsaXRpZXMuZml4VG9QbGFjZXMoZmluYWwvZ3JhZGVTZXQud2VpZ2h0VG90YWwoKSkgKyBcIiUpXCI7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgcmV0dXJuIHN0dWRlbnROb3RlO1xuICAgIFxuICAgICAgfVxuXG4gICAgICBnZW5lcmF0ZUZpcnN0WE1MKCkgOiBzdHJpbmcge1xuICAgICAgICB2YXIgeG1sID0gJzxzdHVkZW50IG5hbWU9XCInK3RoaXMuZGF0YS5nZXQoXCJuYW1lXCIpKydcIiBpZD1cIicrdGhpcy5kYXRhLmdldChcImlkXCIpKydcIiBlbWFpbD1cIicrdGhpcy5kYXRhLmdldChcImVtYWlsYWRkcmVzc1wiKSsnXCI+XFxuJztcblxuICAgICAgICBpZiAodGhpcy5hYnNlbmNlcyAhPT0gdW5kZWZpbmVkICYmIHRoaXMuYWJzZW5jZXMgIT09IG51bGwgJiYgdGhpcy5hYnNlbmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmFic2VuY2VzLmZvckVhY2goIChkYXRlOiBEYXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgeG1sICs9ICc8YWJzZW5zZSBkYXRlPVwiJytkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tdXMnLCB7IHllYXI6XCJudW1lcmljXCIsIG1vbnRoOlwic2hvcnRcIiwgZGF5OlwibnVtZXJpY1wifSkrJ1wiLz5cXG4nO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geG1sO1xuICAgICAgfVxuXG4gICAgICBnZW5lcmF0ZVNjb3JlWE1MKGNhdDogQ2F0ZWdvcnkpIDogc3RyaW5nIHtcbiAgICAgICAgdmFyIHhtbCA9IFwiXCI7XG5cbiAgICAgICAgaWYgKHRoaXMuc2NvcmVzICE9PSB1bmRlZmluZWQgJiYgdGhpcy5zY29yZXMgIT09IG51bGwgJiYgdGhpcy5zY29yZXMuc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIGNhdC5zY29yZVNldC5mb3JFYWNoKCAoc2NvcmU6IFNjb3JlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHN0dWRlbnRTY29yZSA9IHRoaXMuZ2V0KGNhdCwgc2NvcmUubmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKHN0dWRlbnRTY29yZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHhtbCArPSAnPHNjb3JlIG5hbWU9XCInK3Njb3JlLm5hbWUrJ1wiIHBvaW50cz1cIicrc3R1ZGVudFNjb3JlKydcIj48L3Njb3JlPlxcbic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHhtbDtcbiAgICAgIH1cbiAgICBcblxufSIsImltcG9ydCB7IFRGaWxlLCBURm9sZGVyIH0gZnJvbSBcIm9ic2lkaWFuXCJcblxuaW1wb3J0IHsgQWxlcnQgfSBmcm9tIFwidXRpbGl0aWVzL2FsZXJ0XCJcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSBcIi4vQ2F0ZWdvcnlcIlxuaW1wb3J0IHsgQ291bnRlciB9IGZyb20gXCIuL0NvdW50ZXJcIlxuaW1wb3J0IHsgQ291bnRlclRpY2sgfSBmcm9tIFwibW9kYWxzL0NvdW50ZXJUaWNrXCJcbmltcG9ydCAgR3JhZGVib3hQbHVnaW4gIGZyb20gXCIuLi9tYWluXCJcbmltcG9ydCB7IFJlbWluZGVyIH0gZnJvbSBcIi4vUmVtaW5kZXJcIlxuaW1wb3J0IHsgU2NvcmUgfSBmcm9tIFwiLi9TY29yZVwiXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4vU3R1ZGVudFwiXG5pbXBvcnQgIFV0aWxpdGllcyAgZnJvbSBcIi4uL3V0aWxpdGllcy9VdGlsaXRpZXNcIlxuXG4vL2ltcG9ydCB7IFJlbWluZGVyIH0gZnJvbSBcIi4vUmVtaW5kZXJcIlxuXG5leHBvcnQgY2xhc3MgR3JhZGVTZXQge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgc2hvcnRUaXRsZTogc3RyaW5nO1xuICAgIGdyYWRlU2V0RGF0YTogYW55ID0gbnVsbDtcbiAgICBwbHVnaW46IEdyYWRlYm94UGx1Z2luO1xuICAgIG1vZGlmaWVkOiBib29sZWFuO1xuICAgIGxhc3RNb2RpZmllZDogRGF0ZTtcblxuICAgIHN0dWRlbnRzOiBTdHVkZW50W107XG4gICAgY2F0ZWdvcmllczogQ2F0ZWdvcnlbXTtcbiAgICB0YXNrczogU3RyaW5nW107XG4gICAgcmVtaW5kZXJzOiBSZW1pbmRlcltdO1xuICAgIGNvdW50ZXJzOiBDb3VudGVyW107XG4gICAgcHJvcGVydGllczogTWFwPHN0cmluZywgc3RyaW5nPjtcblxuICAgIHNvdXJjZUZvbGRlcjogVEZvbGRlcjtcbiAgICBzb3VyY2VGaWxlOiBURmlsZTtcblxuICAgIGxvbmdlc3ROYW1lOiBudW1iZXI7XG5cbiAgICBzb3J0TWV0aG9kOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihwbHVnaW46IEdyYWRlYm94UGx1Z2luKSB7XG4gICAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICAgICAgICB0aGlzLm1vZGlmaWVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2F0ZWdvcmllcyA9IFtdO1xuICAgICAgICB0aGlzLnN0dWRlbnRzID0gW107XG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gICAgICAgIHRoaXMucmVtaW5kZXJzID0gW107XG4gICAgICAgIHRoaXMudGFza3MgPSBbXTtcbiAgICAgICAgdGhpcy5zb3VyY2VGb2xkZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY291bnRlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5ncmFkZVNldERhdGEgPSBcIlwiO1xuICAgICAgICB0aGlzLmxvbmdlc3ROYW1lID0gMDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc29ydE1ldGhvZCA9IHRoaXMuc3R1ZGVudE5hbWVzQXNjZW5kaW5nO1xuXG4gICAgfVxuXG4gICAgc2V0c291cmNlRm9sZGVyKGZvbGRlcjogVEZvbGRlcikge1xuICAgICAgICB0aGlzLnNvdXJjZUZvbGRlciA9IGZvbGRlcjtcbiAgICB9XG5cbiAgICBzZXRTb3VyY2VGaWxlKGZpbGU6IFRGaWxlKSB7XG4gICAgICAgIHRoaXMuc291cmNlRmlsZSA9IGZpbGU7XG4gICAgfVxuXG4gICAgYXN5bmMgZGVmaW5lR3JhZGVTZXQoZGF0YTogc3RyaW5nLCBzb3VyY2U6IFRGb2xkZXIsIGZpbGU6IFRGaWxlLCByZWRlZmluZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuc291cmNlRm9sZGVyID0gc291cmNlO1xuICAgICAgICB0aGlzLnNvdXJjZUZpbGUgPSBmaWxlO1xuICAgICAgICBsZXQgY2F0OiBDYXRlZ29yeSA9IG51bGw7XG4gICAgICAgIHRoaXMuZ3JhZGVTZXREYXRhID0gZGF0YTtcblxuICAgICAgICBpZiAocmVkZWZpbmUpIHtcbiAgICAgICAgICAgIHRoaXMuY2F0ZWdvcmllcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgICAgICAgICAgIHRoaXMucmVtaW5kZXJzID0gW107XG4gICAgICAgICAgICB0aGlzLnRhc2tzID0gW107XG4gICAgICAgICAgICB0aGlzLmNvdW50ZXJzID0gW107XG4gICAgICAgICAgICB0aGlzLm1vZGlmaWVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsaW5lcyA9IGRhdGEuc3BsaXQoXCJcXG5cIik7XG5cbiAgICAgICAgbGluZXMuZm9yRWFjaCggKGxpbmU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKGxpbmUuY2hhckF0KDApID09PSAnIycpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGFnID0gbGluZS5zdWJzdHJpbmcoMCwgbGluZS5pbmRleE9mKFwiIFwiKSk7XG4gICAgICAgICAgICAgICAgbGV0IGRlZmluaXRpb24gPSBsaW5lLnN1YnN0cmluZyhsaW5lLmluZGV4T2YoXCIgXCIpKTtcbiAgICAgICAgICAgICAgICBkZWZpbml0aW9uID0gZGVmaW5pdGlvbi50cmltKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBwcm9wZXJ0aWVzIG9mIHRoZSBjbGFzc1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREVGSU5JTkcgR1Mgd2l0aCBcIit0YWcrJyBhcyAnK2RlZmluaXRpb24pO1xuICAgICAgICAgICAgICAgIC8vIFNjb3JlIHNldHVwXG4gICAgICAgICAgICAgICAgaWYgKHRhZyA9PT0gXCIjY2F0ZWdvcnlcIikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2F0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMucHVzaChjYXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9wcyA9IGRlZmluaXRpb24uc3BsaXQoXCJ8XCIpO1xuICAgICAgICAgICAgICAgICAgICBjYXQgPSBuZXcgQ2F0ZWdvcnkobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIGNhdC5uYW1lID0gcHJvcHNbMF0udHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICBjYXQud2VpZ2h0ID0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChwcm9wcy5sZW5ndGggPiAxKSA/IHBhcnNlRmxvYXQocHJvcHNbMV0pIDogMTtcbiAgICAgICAgICAgICAgICAgICAgY2F0LnBlcmNlbnRPZlNjb3JlcyA9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAocHJvcHMubGVuZ3RoID4gMikgPyBwYXJzZUZsb2F0KHByb3BzWzJdKSA6IDE7ICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGNhdC5zY29yaW5nTWV0aG9kID0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChwcm9wcy5sZW5ndGggPiAzKSA/IHBhcnNlSW50KHByb3BzWzNdKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogQ2F0ZWdvcnkuU2NvcmluZ01ldGhvZC5JTkRJVklEVUFMX1NDT1JFX1BFUkNFTlRBR0U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0YWcgPT09IFwiI3Njb3JlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb3BzID0gZGVmaW5pdGlvbi5zcGxpdChcInxcIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzYyA9IG5ldyBTY29yZShwcm9wc1swXS50cmltKCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VGbG9hdChwcm9wc1sxXSkpO1xuICAgICAgICAgICAgICAgICAgICBjYXQuYWRkU2NvcmUoc2MpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFnID09PSBcIiNjb3VudGVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb3BzID0gZGVmaW5pdGlvbi5zcGxpdChcInxcIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3VudGVyID0gbmV3IENvdW50ZXIocHJvcHNbMF0udHJpbSgpKTsgXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXIudmFsdWUgPSBwYXJzZUludChwcm9wc1sxXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY291bnRlcnMucHVzaChjb3VudGVyKTsgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0YWcgPT09IFwiI2xhc3Rtb2RpZmllZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE1vZGlmaWVkID0gbmV3IERhdGUocGFyc2VJbnQoZGVmaW5pdGlvbikpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFnID09PSBcIiNyZW1pbmRlclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9wcyA9IGRlZmluaXRpb24uc3BsaXQoXCJ8XCIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZSAgPSBuZXcgRGF0ZShwcm9wc1sxXSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZW1pbmRlciA9IG5ldyBSZW1pbmRlcihwcm9wc1swXS50cmltKCksIGRhdGUsIHBhcnNlSW50KHByb3BzWzJdKSwgcGFyc2VJbnQocHJvcHNbM10pKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1pbmRlcnMucHVzaChyZW1pbmRlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZuYW1lID0gdGFnLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnNldCh2bmFtZSwgZGVmaW5pdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2V0dGluZyBcIit2bmFtZStcIiB0byBcIit0aGlzLnByb3BlcnRpZXMuZ2V0KHZuYW1lKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGlmIChjYXQgIT09IG51bGwpIHRoaXMuY2F0ZWdvcmllcy5wdXNoKGNhdCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgIH1cblxuICAgIGFzeW5jIGRlZmluZVN0dWRlbnQoZGF0YTogc3RyaW5nLCBzb3VyY2U6IFRGaWxlLCByZWRlZmluZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIHZhciBzT2JqOiBPYmplY3QgPSBuZXcgT2JqZWN0KCk7XG4gICAgICAgIHZhciBzY29yZXM6IGFueVtdO1xuICAgICAgICB2YXIgdGFnOiBzdHJpbmc7XG4gICAgICAgIHZhciBkZWZpbml0aW9uOiBzdHJpbmc7XG4gICAgICAgIHZhciBhYnM6IERhdGVbXTtcbiAgICAgICAgdmFyIGNudGVyOiBDb3VudGVyO1xuICAgICAgICB2YXIgY250ZXJzOiBDb3VudGVyW107XG4gICAgICAgIHZhciBub3Rlczogc3RyaW5nO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiREVGSU5FIFNUQVJUOiBcIiArIGRhdGEgICk7XG4gICAgICAgIFxuICAgICAgICBsZXQgbGluZXMgPSBkYXRhLnNwbGl0KFwiXFxuXCIpO1xuXG4gICAgICAgIHNjb3JlcyA9IFtdO1xuICAgICAgICBhYnMgPSBbXTtcbiAgICAgICAgY250ZXJzID0gW107XG4gICAgICAgIG5vdGVzID0gXCJcIjtcbiAgICAgICAgXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsaW5lcy5mb3JFYWNoKCAobGluZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGxpbmUuY2hhckF0KDApID09PSAnIycgJiYgbGluZS5jaGFyQXQoMSkgIT09ICcgJykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGFnID0gbGluZS5zdWJzdHJpbmcoMCwgbGluZS5pbmRleE9mKFwiIFwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkZWZpbml0aW9uID0gbGluZS5zdWJzdHJpbmcobGluZS5pbmRleE9mKFwiIFwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb24gPSBkZWZpbml0aW9uLnRyaW0oKTtcblxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiREVGSU5JTkcgU1RVREVOVCB3aXRoIFwiK3RhZysnIGFzICcrZGVmaW5pdGlvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhZyA9PT0gXCIjbm90ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub3RlcyArPSBkZWZpbml0aW9uICsgXCJcXG5cIjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0YWcgPT09IFwiI3Njb3JlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9wcyA9IGRlZmluaXRpb24uc3BsaXQoXCJ8XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjID0geyBcIm5hbWVcIjogcHJvcHNbMF0udHJpbSgpK1wifFwiK3Byb3BzWzFdLnRyaW0oKSwgXCJ2YWx1ZVwiOiBwYXJzZUZsb2F0KHByb3BzWzJdKSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmVzLnB1c2goc2MpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRhZyA9PT0gXCIjY291bnRlclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJvcHMgPSBkZWZpbml0aW9uLnNwbGl0KFwifFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb3VudGVyID0gbmV3IENvdW50ZXIocHJvcHNbMF0udHJpbSgpKTsgXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyLnZhbHVlID0gcGFyc2VJbnQocHJvcHNbMV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY250ZXJzLnB1c2goY291bnRlcik7ICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRhZyA9PT0gXCIjYWJzZW5jZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKGRlZmluaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGFicy5wdXNoKGRhdGUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZuYW1lID0gdGFnLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2YWwoXCJzT2JqLlwiK3ZuYW1lKycgPSBcIicrZGVmaW5pdGlvbisnXCInKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzT2JqLm5hbWUgIT09IHVuZGVmaW5lZCAmJiBzT2JqLm5hbWUubGVuZ3RoID4gdGhpcy5sb25nZXN0TmFtZSkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlNldHRpbmcgbG9uZ2VzdCBuYW1lIHRvIFwiK3NPYmoubmFtZS5sZW5ndGgrXCIgZm9yIFwiK3NPYmoubmFtZSk7XG4gICAgXG4gICAgICAgICAgICB0aGlzLmxvbmdlc3ROYW1lID0gc09iai5uYW1lLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc3R1ZGVudDogU3R1ZGVudCA9IG51bGw7XG4gICAgICAgIGlmIChyZWRlZmluZSkge1xuICAgICAgICAgICAgc3R1ZGVudCA9IHRoaXMucGx1Z2luLmN1cnJlbnRTdHVkZW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3R1ZGVudCA9IG5ldyBTdHVkZW50KHNPYmopO1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhpcyBpcyByZWFsIHN0dWRlbnQgZGF0YVxuICAgICAgICAgICAgaWYgKHN0dWRlbnQuZGF0YS5nZXQoXCJuYW1lXCIpID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vdCBhIHN0dWRlbnQsIHNraXBwaW5nXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdHVkZW50Lm5vdGVEYXRhID0gZGF0YTtcbiAgICAgICAgc3R1ZGVudC5zZXRTb3VyY2VGaWxlKHNvdXJjZSk7XG4gICAgICAgIGNudGVycy5mb3JFYWNoKCAoY250ZXIpID0+IHtcbiAgICAgICAgICAgIHN0dWRlbnQuYWRkQ291bnRlcihjbnRlciwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgYWJzLmZvckVhY2goIChkYXRlKSA9PiB7XG4gICAgICAgICAgICBzdHVkZW50LmFkZEFic2VuY2UoZGF0ZSwgZmFsc2UpO1xuICAgICAgICB9KVxuICAgICAgICBzY29yZXMuZm9yRWFjaCggKHBhaXIpID0+IHtcbiAgICAgICAgICAgIHN0dWRlbnQuc2V0RnJvbVBhaXIocGFpciwgZmFsc2UpO1xuICAgICAgICB9IClcbiAgICAgICAgaWYgKG5vdGVzLmxlbmd0aCA+IDApIHN0dWRlbnQuc2V0Tm90ZXMobm90ZXMpO1xuICAgICAgICB0aGlzLnN0dWRlbnRzLnB1c2goc3R1ZGVudCk7XG4gICAgICAgIHRoaXMuc3R1ZGVudHMuc29ydCh0aGlzLnNvcnRNZXRob2QpO1xuICAgIH1cblxuICAgIGFzeW5jIHdyaXRlR3JhZGVTZXQoZ3JhZGVTZXRPbmx5OiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgLy8gV3JpdGUgdGhlIGNsYXNzIGRlZmluaXRpb25cbiAgICAgICAgY29uc29sZS5sb2coXCJXUklUSU5HIEdSQURFU0VUIENMQVNTXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNhdGVnb3JpZXMpO1xuICAgICAgICB0aGlzLnBsdWdpbi5hcHAudmF1bHQucHJvY2Vzcyh0aGlzLnNvdXJjZUZpbGUsIChkYXRhOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGxldCBsaW5lcyA9IGRhdGEuc3BsaXQoXCJcXG5cIik7XG4gICAgICAgICAgICBsZXQgbmV3RGF0YTogc3RyaW5nID0gXCJcIjtcblxuICAgICAgICAgICAgbGluZXMuZm9yRWFjaCggKGxpbmU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGxpbmUpO1xuICAgICAgICAgICAgICAgIGlmIChsaW5lLmNoYXJBdCgwKSA9PT0gJyMnICYmIGxpbmUuY2hhckF0KDEpICE9PSAnICcpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRhZyA9IGxpbmUuc3Vic3RyaW5nKDAsIGxpbmUuaW5kZXhPZihcIiBcIikpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGVmaW5pdGlvbiA9IGxpbmUuc3Vic3RyaW5nKGxpbmUuaW5kZXhPZihcIiBcIikpO1xuICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uID0gZGVmaW5pdGlvbi50cmltKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhZyA9PT0gXCIjdGl0bGVcIikgXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdEYXRhICs9IHRhZyArIFwiIFwiICsgdGhpcy5wcm9wZXJ0aWVzLmdldChcInRpdGxlXCIpKydcXG4nO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGFnID09PSBcIiNzaG9ydHRpdGxlXCIpIFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3RGF0YSArPSB0YWcgKyBcIiBcIiArIHRoaXMucHJvcGVydGllcy5nZXQoXCJzaG9ydFRpdGxlXCIpKydcXG4nOyAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgLy8gRklYIFRISVNcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BlcnRpZXMuZ2V0KFwid2ViZmlsZVwiKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbmV3RGF0YSArPSBcIiN3ZWJmaWxlIFwiK3RoaXMucHJvcGVydGllcy5nZXQoXCJ3ZWJmaWxlXCIpKydcXG4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3RGF0YSArPSBcIiNsYXN0bW9kaWZpZWQgXCIgKyAobmV3IERhdGUoKS5nZXRUaW1lKCkpKydcXG4nO1xuXG4gICAgICAgICAgICAvLyBDb3VudGVyc1xuICAgICAgICAgICAgdGhpcy5jb3VudGVycy5mb3JFYWNoKCAoY291bnRlcjogQ291bnRlcikgPT4ge1xuICAgICAgICAgICAgICAgIG5ld0RhdGEgKz0gXCIjY291bnRlciBcIitjb3VudGVyLm5hbWUrXCIgfCBcIitjb3VudGVyLnZhbHVlK1wiXFxuXCI7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAvLyBSZW1pbmRlcnNcbiAgICAgICAgICAgIHRoaXMucmVtaW5kZXJzLmZvckVhY2goIChyZW1pbmRlcjogUmVtaW5kZXIpID0+IHtcbiAgICAgICAgICAgICAgICBuZXdEYXRhICs9IFwiI3JlbWluZGVyIFwiK3JlbWluZGVyLnRvU3RyaW5nKCkrXCJcXG5cIjtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBDYXRlZ29yaWVzXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldSSVRJTkcgQ0FURUdPUklFU1wiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2F0ZWdvcmllcylcbiAgICAgICAgICAgIHRoaXMuY2F0ZWdvcmllcy5mb3JFYWNoKCAoY2F0OiBDYXRlZ29yeSkgPT4ge1xuICAgICAgICAgICAgICAgIG5ld0RhdGEgKz0gXCIjY2F0ZWdvcnkgXCIrY2F0Lm5hbWUrJyB8ICcrY2F0LndlaWdodCsnIHwgJytjYXQucGVyY2VudE9mU2NvcmVzKydcXG4nO1xuICAgICAgICAgICAgICAgIGlmIChjYXQuc2NvcmVTZXQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgY2F0LnNjb3JlU2V0LmZvckVhY2goIChzYzogU2NvcmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0RhdGEgKz0gXCIjc2NvcmUgXCIrc2MubmFtZStcIiB8IFwiK3NjLnZhbHVlK1wiXFxuXCI7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJORVcgREFUQVxcblwiK25ld0RhdGEpO1xuXG4gICAgICAgICAgICB0aGlzLmdyYWRlU2V0RGF0YSA9IG5ld0RhdGE7XG4gICAgICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICAgICAgfSApO1xuXG4gICAgICAgIHRoaXMubW9kaWZpZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKGdyYWRlU2V0T25seSkgcmV0dXJuO1xuXG4gICAgICAgIC8vIFdyaXRlIGVhY2ggc3R1ZGVudCBub3RlXG4gICAgICAgIHRoaXMuc3R1ZGVudHMuZm9yRWFjaCggKHN0dWRlbnQ6IFN0dWRlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0dWRlbnQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXUklUSU5HIFNUVURFTlQgXCIrc3R1ZGVudC5kYXRhLmdldChcIm5hbWVcIikrXCIgYXQgXCIrc3R1ZGVudC5zb3VyY2VGaWxlLm5hbWUpXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5hcHAudmF1bHQucHJvY2Vzcyggc3R1ZGVudC5zb3VyY2VGaWxlLCAoZGF0YTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGxpbmVzID0gZGF0YS5zcGxpdChcIlxcblwiKTtcbiAgICAgICAgICAgICAgICBsZXQgbmV3RGF0YTogc3RyaW5nID0gXCJcIjtcbiAgICBcbiAgICAgICAgICAgICAgICBsaW5lcy5mb3JFYWNoKCAobGluZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsaW5lLmNoYXJBdCgwKSA9PT0gJyMnICYmIGxpbmUuY2hhckF0KDEpICE9PSAnICcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YWcgPSBsaW5lLnN1YnN0cmluZygwLCBsaW5lLmluZGV4T2YoXCIgXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YWduYW1lID0gdGFnLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZWZpbml0aW9uID0gbGluZS5zdWJzdHJpbmcobGluZS5pbmRleE9mKFwiIFwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uID0gZGVmaW5pdGlvbi50cmltKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YWcgPT09IFwiI3Njb3JlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOb3RoaW5nLCBzZWUgYmVsb3dcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFnID09PSBcIiNjb3VudGVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOb3RoaW5nLCBzZWUgYmVsb3dcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFnID09PSBcIiNhYnNlbmNlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOb3RoaW5nLCBzZWUgYmVsb3dcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFnID09PSBcIiNub3RlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOb3RoaW5nLCBzZWUgYmVsb3dcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3RGF0YSArPSB0YWcrXCIgXCIrc3R1ZGVudC5kYXRhLmdldCh0YWduYW1lKStcIlxcblwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEgbGluZS5zdGFydHNXaXRoKFwiXFxuXCIpKSBuZXdEYXRhICs9IGxpbmUgKyBcIlxcblwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBEdW1wIGNvdW50ZXJzXG4gICAgICAgICAgICAgICAgc3R1ZGVudC5jb3VudGVycy5mb3JFYWNoKCAoY291bnRlcjogQ291bnRlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBuZXdEYXRhICs9IFwiI2NvdW50ZXIgXCIrY291bnRlci5uYW1lK1wiIHwgXCIrY291bnRlci52YWx1ZStcIlxcblwiO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gRHVtcCB0aGUgYWJzZW5jZXMgdG8gaW5jbHVkZSBhbnkgY2hhbmdlc1xuICAgICAgICAgICAgICAgIHN0dWRlbnQuYWJzZW5jZXMuZm9yRWFjaCggKGRhdGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1VUycpICE9PSAnSW52YWxpZCBkYXRlJykgXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdEYXRhICs9IFwiI2Fic2VuY2UgXCIrZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJykrJ1xcbic7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBEdW1wIHRoZSBzY29yZXMgc28gdGhhdCB3ZSBpbmNsdWRlIGFueSBjaGFuZ2VzIG9yIG5ldyBcbiAgICAgICAgICAgICAgICBzdHVkZW50LnNjb3Jlcy5mb3JFYWNoKCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBuZXdEYXRhICs9IFwiI3Njb3JlIFwiK2tleStcIiB8IFwiK3ZhbHVlKydcXG4nO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHN0dWRlbnQubm90ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbm90ZXNBcnJheSA9IHN0dWRlbnQubm90ZXMuc3BsaXQoXCJcXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIG5vdGVzQXJyYXkuZm9yRWFjaCggKG5vdGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0RhdGEgKz0gXCIjbm90ZSBcIitub3RlK1wiXFxuXCI7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGlmIG5ldyBzdHVkZW50IHdpdGhvdXQgdGVtcGxhdGVcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldSSVRJTkcgc3R1ZGVudCBcIitzdHVkZW50LmRhdGEuZ2V0KFwibmFtZVwiKStcIlxcbkxlbmd0aD1cIituZXdEYXRhLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgaWYgKG5ld0RhdGEubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgc3R1ZGVudC5kYXRhLmZvckVhY2goICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIndyaXRpbmcga2V5ID0gXCIra2V5KVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbCA9IHN0dWRlbnQuZGF0YS5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWwgIT09IFwidW5kZWZpbmVkXCIpIG5ld0RhdGEgKz0gXCIjXCIra2V5K1wiIFwiK3ZhbCtcIlxcblwiO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBpZiAoc3R1ZGVudC5zY29yZXMuc2l6ZSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0dWRlbnQuc2NvcmVzLmZvckVhY2goICh2YWx1ZSwga2V5KSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2NvcmUgPSBzdHVkZW50LnNjb3Jlcy5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdEYXRhICs9IFwiI3Njb3JlIFwiICsga2V5ICsgXCIgfCBcIiArIHN0dWRlbnQuc2NvcmVzLmdldChrZXkpICsgXCJcXG5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0VGl0bGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BlcnRpZXMuZ2V0KFwidGl0bGVcIik7XG4gICAgfVxuXG4gICAgZ2V0U3R1ZGVudHMoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5zdHVkZW50cz09bnVsbCk/MDp0aGlzLnN0dWRlbnRzLmxlbmd0aDtcbiAgICB9XG5cbiAgICBkaXNwbGF5KGRpdjogSFRNTERpdkVsZW1lbnQsIHdpZHRoOiBudW1iZXIsXG4gICAgICAgICAgICBkaXZpZGVyMSA9IG51bGwsIGRpdmlkZXIyID0gbnVsbCkge1xuICAgICAgICBsZXQgdGl0bGVEaXYgPSBkaXYuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwidGl0bGUtc3R5bGVcIn0pO1xuICAgICAgICBsZXQgc3R1ZGVudERpdiA9IGRpdi5jcmVhdGVFbChcImRpdlwiLCB7IGNsczogXCJzY29yZXMtc3R5bGVcIn0pO1xuXG4gICAgICAgIC8vIFRpdGxlIFxuICAgICAgICBsZXQgdGFibGUgPSB0aXRsZURpdi5jcmVhdGVFbChcInRhYmxlXCIsIHsgY2xzOiBcInRpdGxlLXRhYmxlLXN0eWxlXCIgfSk7XG4gICAgICAgIGxldCB0Ym9keSA9IHRhYmxlLmNyZWF0ZUVsKFwidGJvZHlcIik7XG4gICAgICAgIGxldCB0aXRsZXJvdyA9IHRib2R5LmNyZWF0ZUVsKFwidHJcIik7XG4gICAgICAgIGxldCB0aXRsZWNlbGwgPSB0aXRsZXJvdy5jcmVhdGVFbChcInRkXCIpO1xuICAgICAgICB0aXRsZWNlbGwuY3JlYXRlRWwoXCJoMVwiLCB7IHRleHQ6IHRoaXMucHJvcGVydGllcy5nZXQoXCJ0aXRsZVwiKSB9KTtcbiAgICAgICAgdGhpcy5wbHVnaW4ucmVnaXN0ZXJEb21FdmVudCh0aXRsZURpdiwgXCJjbGlja1wiLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDTElDSyBvbiBcIit0aGlzLnByb3BlcnRpZXMuZ2V0KFwidGl0bGVcIikpO1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uZGlzcGxheUdyYWRlU2V0VmlldygpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5yZW1pbmRlcnMubGVuZ3RoICsgdGhpcy50YXNrcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aXRsZXJvdyA9IHRib2R5LmNyZWF0ZUVsKFwidHJcIiwgeyBjbHM6IFwidGl0bGUtaW5mby1zdHlsZVwifSk7XG4gICAgICAgICAgICBpZiAodGhpcy5yZW1pbmRlcnMubGVuZ3RoKSBcbiAgICAgICAgICAgICAgICB0aXRsZXJvdy5jcmVhdGVFbChcInRkXCIsIHsgdGV4dDogXCJyZW1pbmRlcnNcIiB9KTtcbiAgICAgICAgICAgIGlmICh0aGlzLnRhc2tzLmxlbmd0aCkgXG4gICAgICAgICAgICAgICAgdGl0bGVyb3cuY3JlYXRlRWwoXCJ0ZFwiLCB7IHRleHQ6IFwidGFza3NcIiB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN0dWRlbnQgbGlzdCBcbiAgICAgICAgLy8gMC4gRG8gYWxsIGNhdGVnb3JpZXMgaGF2ZSBzY29yZXMgaW4gdGhlbT9cbiAgICAgICAgbGV0IGFsbENhdGVnb3JpZXNIYXZlU2NvcmVzID0gdGhpcy5hbGxDYXRlZ29yaWVzSGF2ZVNjb3JlcygpO1xuXG4gICAgICAgIC8vIDEuIFN0YXJ0IGJ5IGNvbXB1dGluZyB0aGUgbnVtYmVyIG9mIGNvbHVtbnMgd2UgbmVlZFxuICAgICAgICBsZXQgcm93OiBIVE1MRWxlbWVudCA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICAvLyAyLiBHZW5lcmF0ZSBhIHRhYmxlIHdpdGggc3R1ZGVudHNcbiAgICAgICAgdGFibGUgPSBzdHVkZW50RGl2LmNyZWF0ZUVsKFwidGFibGVcIiwgeyBjbHM6IFwic3R1ZGVudC10YWJsZS1zdHlsZVwiIH0pO1xuICAgICAgICBsZXQgY29sdW1uV2lkdGggPSBwYXJzZUludCh0YWJsZS5nZXRDc3NQcm9wZXJ0eVZhbHVlKFwiLS1jb2x1bW4td2lkdGhcIikpO1xuICAgICAgICBsZXQgbmFtZUZvbnRTaXplID0gcGFyc2VJbnQodGFibGUuZ2V0Q3NzUHJvcGVydHlWYWx1ZShcIi0tbmFtZS1mb250LXNpemVcIikpO1xuICAgICAgICBsZXQgbmFtZVdpZHRoID0gdGhpcy5sb25nZXN0TmFtZSAqIG5hbWVGb250U2l6ZSArIDEwMCAvKmltYWdlKi87XG4gICAgICAgIGlmIChuYW1lV2lkdGggPiBjb2x1bW5XaWR0aCkgY29sdW1uV2lkdGggPSBuYW1lV2lkdGg7XG4gICAgICAgIGxldCBjb2x1bW5zID0gTWF0aC5yb3VuZCh3aWR0aCAvIGNvbHVtbldpZHRoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJGb3Igd2lkdGggXCIrd2lkdGgrXCIgd2UgbmVlZCBcIitjb2x1bW5zK1wiIGNvbHVtbnMgb2Ygd2lkdGggXCIrY29sdW1uV2lkdGgpO1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBcbiAgICAgICAgdGJvZHkgPSB0YWJsZS5jcmVhdGVFbChcInRib2R5XCIpO1xuICAgICAgICB0aGlzLnN0dWRlbnRzLmZvckVhY2goKHN0dWQ6IFN0dWRlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChjb3VudCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgcm93ID0gdGJvZHkuY3JlYXRlRWwoXCJ0clwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBzdHlsZSA9IFwic3R1ZGVudC1jZWxsLXN0eWxlXCI7XG4gICAgICAgICAgICBpZiAoZGl2aWRlcjEgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2hlY2sgPSBhbGxDYXRlZ29yaWVzSGF2ZVNjb3JlcyA/IHRoaXMuZmluYWxTY29yZShzdHVkKSA6IHRoaXMuZmluYWxTY29yZShzdHVkKS90aGlzLndlaWdodFRvdGFsKCk7XG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrID49IGRpdmlkZXIxKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlID0gXCJzdHVkZW50LWNvbG9yaXplZC1jZWxsLXN0eWxlLTFcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoZWNrID49IGRpdmlkZXIyKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlID0gXCJzdHVkZW50LWNvbG9yaXplZC1jZWxsLXN0eWxlLTJcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IFwic3R1ZGVudC1jb2xvcml6ZWQtY2VsbC1zdHlsZS0zXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGNlbGwgPSByb3cuY3JlYXRlRWwoXCJ0ZFwiLCB7IGNsczogc3R5bGUgfSk7XG4gICAgICAgICAgICBjZWxsLndpZHRoID0gXCJcIitjb2x1bW5XaWR0aDtcbiAgICAgICAgICAgIGlmIChhbGxDYXRlZ29yaWVzSGF2ZVNjb3JlcykgXG4gICAgICAgICAgICAgICAgc3R1ZC5kaXNwbGF5KGNlbGwsIHN0eWxlLCB0aGlzLmZpbmFsU2NvcmUoc3R1ZCkpO1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3R1ZC5kaXNwbGF5KGNlbGwsIHN0eWxlLCB0aGlzLmZpbmFsU2NvcmUoc3R1ZCksIHRoaXMuZmluYWxTY29yZShzdHVkKS90aGlzLndlaWdodFRvdGFsKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wbHVnaW4ucmVnaXN0ZXJEb21FdmVudChzdHVkLmdldERpdigpLCBcImNsaWNrXCIsIChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDTElDSyBvbiBcIitzdHVkLmRhdGEuZ2V0KFwibmFtZVwiKSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3R1ZC5ub3RlRGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uZGlzcGxheVN0dWRlbnQoc3R1ZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIHRoaXMucGx1Z2luLnJlZ2lzdGVyRG9tRXZlbnQoc3R1ZC5nZXRIRUkoKSwgXCJjbGlja1wiLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiQ0xJQ0sgb24gXCIrc3R1ZC5kYXRhLmdldChcIm5hbWVcIikrXCIgaW1hZ2VcIik7XG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coc3R1ZC5ub3RlRGF0YSk7XG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICBjb3VudCA9IGNvdW50ICUgY29sdW1ucztcbiAgICAgICAgfSk7ICAgICAgICBcbiAgICB9XG5cbiAgICBkaXNwbGF5TGlzdChkaXY6IEhUTUxEaXZFbGVtZW50LCB3aWR0aDogbnVtYmVyKSB7XG4gICAgICAgIGxldCB0aXRsZURpdiA9IGRpdi5jcmVhdGVFbChcImRpdlwiLCB7IGNsczogXCJ0aXRsZS1saXN0LXN0eWxlXCJ9KTtcbiAgICAgICAgbGV0IHN0dWRlbnREaXYgPSBkaXYuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwic2NvcmVzLWxpc3Qtc3R5bGVcIn0pO1xuXG4gICAgICAgIC8vIFRpdGxlIFxuICAgICAgICBsZXQgdGFibGUgPSB0aXRsZURpdi5jcmVhdGVFbChcInRhYmxlXCIsIHsgY2xzOiBcInRpdGxlLWxpc3QtdGFibGUtc3R5bGVcIiB9KTtcbiAgICAgICAgbGV0IHRib2R5ID0gdGFibGUuY3JlYXRlRWwoXCJ0Ym9keVwiKTtcbiAgICAgICAgbGV0IHRpdGxlcm93ID0gdGJvZHkuY3JlYXRlRWwoXCJ0clwiKTtcbiAgICAgICAgbGV0IHRpdGxlY2VsbCA9IHRpdGxlcm93LmNyZWF0ZUVsKFwidGRcIik7XG4gICAgICAgIHRpdGxlY2VsbC5jcmVhdGVFbChcImgxXCIsIHsgdGV4dDogdGhpcy5wcm9wZXJ0aWVzLmdldChcInRpdGxlXCIpIH0pO1xuICAgICAgICB0aGlzLnBsdWdpbi5yZWdpc3RlckRvbUV2ZW50KHRpdGxlRGl2LCBcImNsaWNrXCIsIChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNMSUNLIG9uIFwiK3RoaXMucHJvcGVydGllcy5nZXQoXCJ0aXRsZVwiKSk7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5kaXNwbGF5R3JhZGVTZXRWaWV3KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFRhYmxlIHNldHVwXG4gICAgICAgIHRhYmxlID0gc3R1ZGVudERpdi5jcmVhdGVFbChcInRhYmxlXCIsIHsgY2xzOiBcInN0dWRlbnQtbGlzdC10YWJsZS1zdHlsZVwiIH0pO1xuICAgICAgICBsZXQgbmFtZUZvbnRTaXplID0gcGFyc2VJbnQodGFibGUuZ2V0Q3NzUHJvcGVydHlWYWx1ZShcIi0tbmFtZS1mb250LXNpemVcIikpO1xuXG4gICAgICAgIHRib2R5ID0gdGFibGUuY3JlYXRlRWwoXCJ0Ym9keVwiKTtcbiAgICAgICAgbGV0IGNhdHJvdyA9IHRib2R5LmNyZWF0ZUVsKFwidHJcIik7XG4gICAgICAgIGNhdHJvdy5jcmVhdGVFbChcInRkXCIpOyAvLywgeyBjbHM6IFwic3R1ZGVudC1saXN0LWNlbGwtc3R5bGVcIiB9KTtcbiAgICAgICAgY2F0cm93LmNyZWF0ZUVsKFwidGRcIik7IC8vLCB7IGNsczogXCJzdHVkZW50LWxpc3QtY2VsbC1zdHlsZVwiIH0pO1xuICAgICAgICBjYXRyb3cuY3JlYXRlRWwoXCJ0ZFwiKTtcbiAgICAgICAgdGhpcy5jYXRlZ29yaWVzLmZvckVhY2goIChjYXQpID0+IHtcbiAgICAgICAgICAgIGlmIChjYXQuc2NvcmVTZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGxldCBjYXRuYW1lID0gY2F0cm93LmNyZWF0ZUVsKFwidGRcIiwgeyBjbHM6IFwic3R1ZGVudC1saXN0LWNhdGVnb3J5LXN0eWxlXCIsIGF0dHI6IHtjb2xzcGFuOiBjYXQuc2NvcmVTZXQubGVuZ3RofSB9KTtcbiAgICAgICAgICAgICAgICBjYXRuYW1lLmNyZWF0ZUVsKFwiaDRcIiwgeyB0ZXh0OiBjYXQubmFtZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBzY29yZXJvdyA9IHRib2R5LmNyZWF0ZUVsKFwidHJcIik7XG4gICAgICAgIHNjb3Jlcm93LmNyZWF0ZUVsKFwidGRcIik7IC8vLCB7IGNsczogXCJzdHVkZW50LWxpc3QtY2VsbC1zdHlsZVwiIH0pO1xuICAgICAgICBzY29yZXJvdy5jcmVhdGVFbChcInRkXCIpOyAvLywgeyBjbHM6IFwic3R1ZGVudC1saXN0LWNlbGwtc3R5bGVcIiB9KTtcbiAgICAgICAgbGV0IGZzID0gc2NvcmVyb3cuY3JlYXRlRWwoXCJ0ZFwiLCB7IGNsczogXCJzdHVkZW50LWxpc3QtZmluYWxzY29yZS1zdHlsZVwiIH0pO1xuICAgICAgICBmcy5jcmVhdGVFbChcImg0XCIsIHsgdGV4dDogXCJGaW5hbCBTY29yZVwiIH0pO1xuICAgICAgICB0aGlzLmNhdGVnb3JpZXMuZm9yRWFjaCggKGNhdCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNhdC5zY29yZVNldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY2F0LnNjb3JlU2V0LmZvckVhY2goIChzY29yZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2NvcmVuYW1lID0gc2NvcmVyb3cuY3JlYXRlRWwoXCJ0aFwiLCB7IGNsczogXCJzdHVkZW50LWxpc3Qtc2NvcmV0aXRsZS1zdHlsZVwiIH0pO1xuICAgICAgICAgICAgICAgICAgICBzY29yZW5hbWUuY3JlYXRlRWwoXCJoNVwiLCB7IHRleHQ6IHNjb3JlLm5hbWUsIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIHRoaXMuc3R1ZGVudHMuZm9yRWFjaCgoc3R1ZDogU3R1ZGVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJvdyA9IHRib2R5LmNyZWF0ZUVsKFwidHJcIiwgeyBjbHM6IFwic3R1ZGVudC1saXN0LWNlbGwtc3R5bGVcIiB9KTtcbiAgICAgICAgICAgIHN0dWQuZGlzcGxheVJvdyhyb3csIHRoaXMpO1xuICAgICAgICAgICAgbGV0IGNvbG9yID0gcm93LmdldENzc1Byb3BlcnR5VmFsdWUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIpO1xuICAgICAgICAgICAgaWYgKGNvdW50ICUgMiA9PSAwKVxuICAgICAgICAgICAgICAgIGNvbG9yID0gVXRpbGl0aWVzLnBTQkMoMC43NSwgY29sb3IsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjb2xvciA9IFV0aWxpdGllcy5wU0JDKC0wLjc1LCBjb2xvciwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgcm93LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xuICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnJlZ2lzdGVyRG9tRXZlbnQoc3R1ZC5nZXREaXYoKSwgXCJjbGlja1wiLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ0xJQ0sgb24gXCIrc3R1ZC5kYXRhLmdldChcIm5hbWVcIikpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0dWQubm90ZURhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLmRpc3BsYXlTdHVkZW50KHN0dWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldFNvcnRNZXRob2QobWV0aG9kOiBhbnkpIHtcbiAgICAgICAgdGhpcy5zb3J0TWV0aG9kID0gbWV0aG9kO1xuICAgICAgICB0aGlzLnN0dWRlbnRzLnNvcnQobWV0aG9kKTtcbiAgICB9ICAgICAgXG5cbiAgICBhZGRTdHVkZW50KHN0dWRlbnQ6IFN0dWRlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBZGRpbmcgc3R1ZGVudCBcIitzdHVkZW50LmRhdGEuZ2V0KFwibmFtZVwiKStcIiB0byBcIit0aGlzLnByb3BlcnRpZXMuZ2V0KFwidGl0bGVcIikpO1xuICAgICAgICAvLyBTZXQgdXAgdGhlIHN0ZGVudCB3aXRoIHRoZSBhcHByb3Byb2lhdGUgZGF0YVxuICAgICAgICAgaWYgKHRoaXMuY2F0ZWdvcmllcyAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY2F0ZWdvcmllcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jYXRlZ29yaWVzLmZvckVhY2goIChjYXQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2F0LmdldFNjb3JlU2V0KCkgIT09IHVuZGVmaW5lZCAmJiBjYXQuZ2V0U2NvcmVTZXQoKSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgY2F0LmdldFNjb3JlU2V0KCkuZm9yRWFjaCggKHNjb3JlOiBTY29yZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0dWRlbnQuZ2V0KGNhdCwgc2NvcmUubmFtZSkgPT09IHVuZGVmaW5lZCkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R1ZGVudC5zZXQoY2F0LCBzY29yZS5uYW1lLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY291bnRlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5jb3VudGVycy5mb3JFYWNoKCAoY291bnRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHN0dWRlbnQuYWRkQ291bnRlcihjb3VudGVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgXG4gICAgICAgIC8vIEFkZFxuICAgICAgICB0aGlzLnN0dWRlbnRzLnB1c2goc3R1ZGVudCk7XG4gICAgICAgIHRoaXMuc3R1ZGVudHMuc29ydCh0aGlzLnNvcnRNZXRob2QpO1xuXG4gICAgICAgIHRoaXMubW9kaWZpZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGdldFN0dWRlbnQoY3JpdGVyaW9uOiBhbnkpOiBTdHVkZW50IHtcbiAgICAgICAgdmFyIHN0dWRlbnQ6IFN0dWRlbnQ7XG5cbiAgICAgICAgaWYgKGNyaXRlcmlvbi5uYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHN0dWRlbnQgPSB0aGlzLnN0dWRlbnRzLmZpbmQoIChzdHVkKSA9PiBzdHVkLmRhdGEuZ2V0KFwibmFtZVwiKSA9PT0gY3JpdGVyaW9uLm5hbWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNyaXRlcmlvbi5pZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzdHVkZW50ID0gdGhpcy5zdHVkZW50cy5maW5kKCAoc3R1ZCkgPT4gc3R1ZC5kYXRhLmdldChcImlkXCIpID09PSBjcml0ZXJpb24uaWQpO1xuICAgICAgICB9IGVsc2UgaWYgKGNyaXRlcmlvbi5lbWFpbGFkZHJlc3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc3R1ZGVudCA9IHRoaXMuc3R1ZGVudHMuZmluZCggKHN0dWQpID0+IHN0dWQuZGF0YS5nZXQoXCJlbWFpbGFkZHJlc3NcIikgPT09IGNyaXRlcmlvbi5lbWFpbGFkZHJlc3MpO1xuICAgICAgICB9IFxuXG4gICAgICAgIHJldHVybiBzdHVkZW50O1xuICAgIH1cblxuICAgIGRlbGV0ZVN0dWRlbnQoc3R1ZGVudDogU3R1ZGVudCkge1xuICAgICAgICB0aGlzLnN0dWRlbnRzID0gdGhpcy5zdHVkZW50cy5maWx0ZXIoIChzdHVkKSA9PiBzdHVkLmRhdGEuZ2V0KFwibmFtZVwiKSAhPT0gc3R1ZGVudC5kYXRhLmdldChcIm5hbWVcIikpO1xuICAgICAgICB0aGlzLm1vZGlmaWVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBhZGRTY29yZShuYW1lOiBzdHJpbmcsIHBvc3NpYmxlOiBudW1iZXIsIGV4dHJhQ3JlZGl0OiBib29sZWFuLCBjYXRuYW1lOiBzdHJpbmcsIHNjb3JlczogTWFwPHN0cmluZywgbnVtYmVyPikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkFkZGluZyBTQ09SRSA9IFwiK25hbWUrJy8nK3Bvc3NpYmxlK1wiIGluIFwiK2NhdG5hbWUpXG4gICAgICAgIHZhciBjYXRlZ29yeTogQ2F0ZWdvcnk7XG5cbiAgICAgICAgLy8gRmluZCB0aGUgY2F0ZWdvcnlcbiAgICAgICAgY2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5jYXRlZ29yaWVzICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jYXRlZ29yaWVzICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMuZm9yRWFjaCggKGNhdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjYXQubmFtZSA9PT0gY2F0bmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeSA9IGNhdDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjb3JlID0gbmV3IFNjb3JlKG5hbWUsIHBvc3NpYmxlLCBleHRyYUNyZWRpdCk7XG4gICAgICAgICAgICAgICAgICAgIGNhdC5hZGRTY29yZShzY29yZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQURESU5HOiBcIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNhdC5zY29yZVNldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhdGVnb3J5ID09PSBudWxsKSByZXR1cm47XG4gIFxuICAgICAgICAvLyBhZGQgdGhlIHNjb3JlIHRvIGVhY2ggc3R1ZGVudFxuICAgICAgICBpZiAodGhpcy5zdHVkZW50cyAhPT0gdW5kZWZpbmVkICYmIHRoaXMuc3R1ZGVudHMgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc3R1ZGVudHMuZm9yRWFjaCggKHN0dWQ6IFN0dWRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBzdHVkLnNldChjYXRlZ29yeSwgbmFtZSwgc2NvcmVzLmdldChzdHVkLmRhdGEuZ2V0KFwibmFtZVwiKSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXQgdGhlIGdyYWRlc2V0IHRvIHdyaXRlIHdoZW4gY2xvc2VkXG4gICAgICAgIHRoaXMuZ3JhZGVTZXREYXRhID0gdGhpcy53cml0ZUdyYWRlU2V0KHRydWUpO1xuICAgICAgICB0aGlzLm1vZGlmaWVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBhZGRBYnNlbmNlcyhhYnNlbmNlczogRGF0ZVtdKSB7XG4gICAgICAgIGlmICh0aGlzLnN0dWRlbnRzICE9PSB1bmRlZmluZWQgJiYgdGhpcy5zdHVkZW50cyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpIDwgdGhpcy5zdHVkZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChhYnNlbmNlc1tpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgdGhpcy5zdHVkZW50c1tpXS5hZGRBYnNlbmNlKGFic2VuY2VzW2ldKTtcbiAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFkZGluZyBhYnNlbmNlIFwiK2Fic2VuY2VzW2ldK1wiIHRvIFwiK3RoaXMuc3R1ZGVudHNbaV0uZGF0YS5nZXQoXCJuYW1lXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1vZGlmaWVkID0gdHJ1ZTtcbiAgICAgICAgfSBcbiAgICB9XG5cbiAgICBhZGRSZW1pbmRlcihyZW1pbmRlcjogUmVtaW5kZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBZGRpbmcgcmVtaW5kZXIgXCIrcmVtaW5kZXIudGV4dCk7XG4gICAgICAgIHRoaXMucmVtaW5kZXJzLnB1c2gocmVtaW5kZXIpO1xuICAgICAgICB0aGlzLmdyYWRlU2V0RGF0YSA9IHRoaXMud3JpdGVHcmFkZVNldCh0cnVlKTtcbiAgICAgICAgdGhpcy5tb2RpZmllZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZGVsZXRlUmVtaW5kZXIocmVtaW5kZXI6IFJlbWluZGVyKSB7XG4gICAgICAgIHRoaXMucmVtaW5kZXJzID0gdGhpcy5yZW1pbmRlcnMuZmlsdGVyKCAocmVtKSA9PiByZW0udGV4dCAhPT0gcmVtaW5kZXIudGV4dCk7XG4gICAgICAgIHRoaXMuZ3JhZGVTZXREYXRhID0gdGhpcy53cml0ZUdyYWRlU2V0KHRydWUpO1xuICAgICAgICB0aGlzLm1vZGlmaWVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXRDYXRlZ29yeShjcml0ZXJpb246IGFueSk6IENhdGVnb3J5IHtcbiAgICAgICAgdmFyIGNhdDogQ2F0ZWdvcnk7XG5cbiAgICAgICAgaWYgKGNyaXRlcmlvbi5uYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNhdCA9IHRoaXMuY2F0ZWdvcmllcy5maW5kKCAoYykgPT4gYy5uYW1lID09PSBjcml0ZXJpb24ubmFtZSk7XG4gICAgICAgIH0gXG5cbiAgICAgICAgcmV0dXJuIGNhdDtcbiAgICB9XG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gU29ydGluZ1xuXG4gICAgc3R1ZGVudE5hbWVzQXNjZW5kaW5nKHN0dWRlbnQxOiBTdHVkZW50LCBzdHVkZW50MjogU3R1ZGVudCkge1xuICAgICAgICBsZXQgbmFtZTEgPSBzdHVkZW50MS5kYXRhLmdldChcIm5hbWVcIik7XG4gICAgICAgIGlmIChuYW1lMSA9PT0gdW5kZWZpbmVkKSBuYW1lMSA9IFwiXCI7XG4gICAgICAgIGxldCBuYW1lMiA9IHN0dWRlbnQyLmRhdGEuZ2V0KFwibmFtZVwiKTtcbiAgICAgICAgaWYgKG5hbWUyID09PSB1bmRlZmluZWQpIG5hbWUyID0gXCJcIjtcbiAgICAgICAgcmV0dXJuIG5hbWUxLmxvY2FsZUNvbXBhcmUobmFtZTIpO1xuICAgIH1cblxuICAgIHN0dWRlbnROYW1lc0Rlc2NlbmRpbmcoc3R1ZGVudDE6IFN0dWRlbnQsIHN0dWRlbnQyOiBTdHVkZW50KSB7XG4gICAgICAgIGxldCBuYW1lMSA9IHN0dWRlbnQxLmRhdGEuZ2V0KFwibmFtZVwiKTtcbiAgICAgICAgaWYgKG5hbWUxID09PSB1bmRlZmluZWQpIG5hbWUxID0gXCJcIjtcbiAgICAgICAgbGV0IG5hbWUyID0gc3R1ZGVudDIuZGF0YS5nZXQoXCJuYW1lXCIpO1xuICAgICAgICBpZiAobmFtZTIgPT09IHVuZGVmaW5lZCkgbmFtZTIgPSBcIlwiO1xuICAgICAgICByZXR1cm4gbmFtZTIubG9jYWxlQ29tcGFyZShuYW1lMSk7XG4gICAgfVxuXG4gICAgc3R1ZGVudFNjb3Jlc0FzY2VuZGluZyhzdHVkZW50MTogU3R1ZGVudCwgc3R1ZGVudDI6IFN0dWRlbnQpIHtcbiAgICAgICAgaWYgKHN0dWRlbnQxID09PSB1bmRlZmluZWQgJiYgc3R1ZGVudDIgPT09IHVuZGVmaW5lZCkgcmV0dXJuIDA7XG4gICAgICAgIGlmIChzdHVkZW50MSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChzdHVkZW50MiA9PT0gdW5kZWZpbmVkKSByZXR1cm4gMTtcbiAgICAgICAgcmV0dXJuIHN0dWRlbnQxLmRpc3BsYXllZEZpbmFsU2NvcmUtc3R1ZGVudDIuZGlzcGxheWVkRmluYWxTY29yZTtcbiAgICB9XG5cbiAgICBzdHVkZW50U2NvcmVzRGVzY2VuZGluZyhzdHVkZW50MTogU3R1ZGVudCwgc3R1ZGVudDI6IFN0dWRlbnQpIHtcbiAgICAgICAgaWYgKHN0dWRlbnQxID09PSB1bmRlZmluZWQgJiYgc3R1ZGVudDIgPT09IHVuZGVmaW5lZCkgcmV0dXJuIDA7XG4gICAgICAgIGlmIChzdHVkZW50MSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChzdHVkZW50MiA9PT0gdW5kZWZpbmVkKSByZXR1cm4gMTtcbiAgICAgICAgcmV0dXJuIHN0dWRlbnQyLmRpc3BsYXllZEZpbmFsU2NvcmUtc3R1ZGVudDEuZGlzcGxheWVkRmluYWxTY29yZTtcbiAgICB9XG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gU3RhdGlzdGljc1xuXG4gICAgY2xhc3NTY29yZUF2ZXJhZ2UoY2F0OiBDYXRlZ29yeSwgc2NvcmU6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIHZhciB0b3RhbDogbnVtYmVyID0gMDtcblxuICAgICAgICB0aGlzLnN0dWRlbnRzLmZvckVhY2goIChzdHVkKSA9PiB7XG4gICAgICAgICAgICB0b3RhbCArPSBzdHVkLmdldChjYXQsIHNjb3JlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRvdGFsID0gdG90YWwgLyB0aGlzLnN0dWRlbnRzLmxlbmd0aDtcblxuICAgICAgICByZXR1cm4gdG90YWw7XG4gICAgfVxuICAgIFxuICAgIGNsYXNzQXZlcmFnZSgpOiBudW1iZXIge1xuICAgICAgICB2YXIgdG90YWw6IG51bWJlciA9IDA7XG4gICAgICAgIHRoaXMuc3R1ZGVudHMuZm9yRWFjaCggKHN0dWQpID0+IHtcbiAgICAgICAgICAgIHRvdGFsICs9IHRoaXMuZmluYWxTY29yZShzdHVkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRvdGFsID0gdG90YWwgLyB0aGlzLnN0dWRlbnRzLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH1cblxuICAgIGZpbmFsU2NvcmUoc3R1ZGVudDogU3R1ZGVudCk6IG51bWJlciB7XG4gICAgICAgIC8vIEZvciBldmVyeSBjYXRlZ29yeSwgZ2V0IHRoZSBzdHVkZW50IHBvaW50cyBhbmQgYWRkIHRoZSBjYXRlZ29yaWVzXG4gICAgICAgIGlmICh0aGlzLmNhdGVnb3JpZXMgPT0gbnVsbCB8fCB0aGlzLmNhdGVnb3JpZXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHRvdGFsID0gMDtcbiAgICAgICAgICAgIHRoaXMuY2F0ZWdvcmllcy5mb3JFYWNoKCAoY2F0KSA9PiB7XG4gICAgICAgICAgICAgICAgdG90YWwgKz0gY2F0LnN0dWRlbnRTY29yZShzdHVkZW50KTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ291bnRpbmcgXCIrdG90YWwrXCIgZm9yIFwiK3N0dWRlbnQuZGF0YS5nZXQoXCJuYW1lXCIpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRvdGFsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluYWxQb3NzaWJsZSgpOiBudW1iZXIge1xuICAgICAgICAvLyBGb3IgZXZlcnkgY2F0ZWdvcnksIGdldCB0aGUgc3R1ZGVudCBwb2ludHMgYW5kIGFkZCB0aGUgY2F0ZWdvcmllc1xuICAgICAgICBpZiAodGhpcy5jYXRlZ29yaWVzID09IG51bGwgfHwgdGhpcy5jYXRlZ29yaWVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB0b3RhbCA9IDA7XG4gICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMuZm9yRWFjaCggKGNhdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRvdGFsICs9IGNhdC5wb3NzaWJsZSgpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJDb3VudGluZyBcIit0b3RhbCtcIiBmb3IgXCIrc3R1ZGVudC5kYXRhLmdldChcIm5hbWVcIikpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdG90YWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3ZWlnaHRUb3RhbCgpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5jYXRlZ29yaWVzID09IG51bGwgfHwgdGhpcy5jYXRlZ29yaWVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB0b3RhbCA9IDA7XG4gICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMuZm9yRWFjaCggKGNhdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjYXQuc2NvcmVTZXQgIT09IHVuZGVmaW5lZCAmJiBjYXQuc2NvcmVTZXQgIT09IG51bGwgJiYgY2F0LnNjb3JlU2V0Lmxlbmd0aCA+IDApXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsICs9IGNhdC53ZWlnaHQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0b3RhbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFsbENhdGVnb3JpZXNIYXZlU2NvcmVzKCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgYWxsQ2F0ZWdvcmllc0hhdmVTY29yZXMgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5jYXRlZ29yaWVzICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jYXRlZ29yaWVzICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMuZm9yRWFjaCggKGNhdCkgPT4ge1xuICAgICAgICAgICAgICAgIGFsbENhdGVnb3JpZXNIYXZlU2NvcmVzID0gYWxsQ2F0ZWdvcmllc0hhdmVTY29yZXMgJiYgXG4gICAgICAgICAgICAgICAgICAgKGNhdC5nZXRTY29yZVNldCgpICE9PSB1bmRlZmluZWQgJiYgY2F0LmdldFNjb3JlU2V0KCkgIT09IG51bGwgJiYgY2F0LmdldFNjb3JlU2V0KCkubGVuZ3RoID4gMCk7XG4gICAgICAgICAgICB9KSAgXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFsbENhdGVnb3JpZXNIYXZlU2NvcmVzO1xuICAgIH1cblxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBXZWIgc2VydmVyIGRhdGEgZ2VuZXJhdGlvblxuICAgIC8vXG4gICAgLy8gSWRlYTogR2VuZXJhdGUgdGhlIFhNTCBmaWxlIGF0IGEgY2VydGFpbiB0aW1lIChzcGVjJ2QgaW4gc2V0dGluZ3MpLiAgXG5cbiAgICBnZW5lcmF0ZVhNTEZvcldlYlNlcnZlcigpIHsgXG4gICAgICAgIGNvbnNvbGUubG9nKFwiR2VuZXJhdGluZyBYTUwgZm9yIHdlYiBzZXJ2ZXJcIik7ICAgICAgICAgICAgXG5cbiAgICAgICAgbGV0IHhtbCA9ICc8Y2xhc3MnO1xuICAgICAgICBsZXQgdGl0bGUgPSB0aGlzLnByb3BlcnRpZXMuZ2V0KFwidGl0bGVcIik7XG4gICAgICAgIGlmICh0aXRsZSAhPT0gdW5kZWZpbmVkKSB4bWwgKz0gYCBuYW1lPVwiJHt0aXRsZX1cIiBgO1xuICAgICAgICBsZXQgc2hvcnRUaXRsZSA9IHRoaXMucHJvcGVydGllcy5nZXQoXCJzaG9ydFRpdGxlXCIpO1xuICAgICAgICBpZiAoc2hvcnRUaXRsZSAhPT0gdW5kZWZpbmVkKSB4bWwgKz0gYCBuaWNrbmFtZT1cIiR7c2hvcnRUaXRsZX1cIiBgO1xuICAgICAgICB4bWwgKz0gJz5cXG4nO1xuXG4gICAgICAgIGlmICh0aGlzLmNhdGVnb3JpZXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNhdGVnb3JpZXMgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuY2F0ZWdvcmllcy5mb3JFYWNoKCAoY2F0ZWdvcnkpID0+IHtcbiAgICAgICAgICAgICAgICB4bWwgKz0gY2F0ZWdvcnkuZ2VuZXJhdGVYTUwoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zdHVkZW50cyAhPT0gdW5kZWZpbmVkICYmIHRoaXMuc3R1ZGVudHMgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc3R1ZGVudHMuZm9yRWFjaCggKHN0dWRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB4bWwgKz0gc3R1ZGVudC5nZW5lcmF0ZUZpcnN0WE1MKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2F0ZWdvcmllcyAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY2F0ZWdvcmllcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMuZm9yRWFjaCggKGNhdGVnb3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2F0ZWdvcnkuc2NvcmVTZXQgIT09IHVuZGVmaW5lZCAmJiBjYXRlZ29yeS5zY29yZVNldCAhPT0gbnVsbCAmJiBjYXRlZ29yeS5zY29yZVNldC5sZW5ndGggPiAwICkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeG1sICs9IHN0dWRlbnQuZ2VuZXJhdGVTY29yZVhNTChjYXRlZ29yeSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHhtbCArPSBcIjwvc3R1ZGVudD5cXG5cIjtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICB4bWwgKz0gJzwvY2xhc3M+XFxuJztcblxuICAgICAgICByZXR1cm4geG1sO1xuICAgIH1cblxuXG59IiwiaW1wb3J0IHsgSXRlbVZpZXcsIE1hcmtkb3duRWRpdFZpZXcsIE1hcmtkb3duUmVuZGVyZXIsIFRGaWxlLCBUZXh0RmlsZVZpZXcsIFdvcmtzcGFjZUxlYWYgfSBmcm9tIFwib2JzaWRpYW5cIjtcclxuXHJcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSBcImRhdGEvQ2F0ZWdvcnlcIjtcclxuaW1wb3J0IHsgQ291bnRlciB9IGZyb20gXCJkYXRhL0NvdW50ZXJcIjtcclxuaW1wb3J0IHsgR3JhZGVTZXQgfSBmcm9tIFwiZGF0YS9HcmFkZVNldFwiO1xyXG5pbXBvcnQgR3JhZGVib3hQbHVnaW4gZnJvbSBcIm1haW5cIjtcclxuaW1wb3J0IHsgU2NvcmUgfSBmcm9tIFwiZGF0YS9TY29yZVwiO1xyXG5pbXBvcnQgVXRpbGl0aWVzIGZyb20gXCJ1dGlsaXRpZXMvVXRpbGl0aWVzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgVklFV19UWVBFX0dSQURFU0VUX1NVTU1BUlkgPSBcImdyYWRlc2V0LXN1bW1hcnktdmlld1wiO1xyXG5leHBvcnQgY29uc3QgUFJFVklFV19NT0RFID0gMjtcclxuZXhwb3J0IGNvbnN0IEVESVRJTkdfTU9ERSA9IDE7XHJcblxyXG5leHBvcnQgY2xhc3MgR3JhZGVTZXRTdW1tYXJ5VmlldyBleHRlbmRzIEl0ZW1WaWV3IHtcclxuXHJcbiAgcGx1Z2luOiBHcmFkZWJveFBsdWdpbjtcclxuICBncmFkZVNldFBhdGg6IHN0cmluZztcclxuICBmcm9udG1hdHRlciA6IHN0cmluZztcclxuICBncmFkZVNldERhdGE6IHN0cmluZztcclxuICBncmFkZVNldDogR3JhZGVTZXQ7XHJcbiAgY29udGFpbmVyOiBFbGVtZW50O1xyXG5cclxuICBzdGF0dXNiYXJFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICBwcmV2aWV3RWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgZWRpdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gIHNhdmVFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgLy8gaW50ZXJuYWwgY29kZSBtaXJyb3IgaW5zdGFuY2VcclxuICBjb2RlTWlycm9yOiBDb2RlTWlycm9yLkVkaXRvcjtcclxuXHJcbiAgbW9kZTogbnVtYmVyO1xyXG4gIG1vZGlmaWVkOiBib29sZWFuO1xyXG4gIG51bUNvdW50ZXJzOiBudW1iZXI7XHJcbiAgY291bnRlcnM6IENvdW50ZXJbXTtcclxuXHJcbiAgLy8gdGhpcy5jb250ZW50RWwgaXMgbm90IGV4cG9zZWQsIHNvIGNoZWF0IGEgYml0LlxyXG4gIHB1YmxpYyBnZXQgZXh0Q29udGVudEVsKCk6IEhUTUxFbGVtZW50IHtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIHJldHVybiB0aGlzLmNvbnRlbnRFbDtcclxuICB9ICBcclxuICBcclxuICBjb25zdHJ1Y3RvcihsZWFmOiBXb3Jrc3BhY2VMZWFmLCBwbHVnaW46IEdyYWRlYm94UGx1Z2luKSB7XHJcbiAgICBzdXBlcihsZWFmKTtcclxuXHJcbiAgICB0aGlzLm5hdmlnYXRpb24gPSB0cnVlO1xyXG4gICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XHJcbiAgICAvLyBNYWtlIGNvcGllcyBvZiB0aGVzZVxyXG4gICAgdGhpcy5ncmFkZVNldERhdGEgPSBwbHVnaW4uZ3JhZGVTZXQuZ3JhZGVTZXREYXRhO1xyXG4gICAgdGhpcy5ncmFkZVNldCA9IHBsdWdpbi5ncmFkZVNldDtcclxuICAgIC8vY29uc29sZS5sb2coXCJDT05TVFJVQ1RPUjogbW9kaWZpZWQgPSBcIit0aGlzLmdyYWRlU2V0Lm1vZGlmaWVkKTtcclxuXHJcbiAgICB0aGlzLmNvZGVNaXJyb3IgPSBDb2RlTWlycm9yKHRoaXMuZXh0Q29udGVudEVsLCB7XHJcbiAgICAgIHRoZW1lOiBcIm9ic2lkaWFuXCJcclxuICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIHRoaXMubW9kZSA9IEVESVRJTkdfTU9ERTtcclxuICAgIHRoaXMuY291bnRlcnMgPSBbXTtcclxuICB9XHJcblxyXG4gIGdldFZpZXdUeXBlKCkge1xyXG4gICAgcmV0dXJuIFZJRVdfVFlQRV9HUkFERVNFVF9TVU1NQVJZO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGlzcGxheVRleHQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ncmFkZVNldC5wcm9wZXJ0aWVzLmdldChcInRpdGxlXCIpICsgXCIgU3VtbWFyeVwiO1xyXG4gIH1cclxuXHJcbiAgLy8gT3BlbiB0aGUgdmlld1xyXG4gIC8vIEdlbmVyYXRlIE1hcmtkb3duIGludG8gYSBzdHJpbmcsIHdyaXRlIHRoZSBzdHJpbmcgaW50byBhIG5vdGVcclxuXHJcbiAgYXN5bmMgb25PcGVuKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJTdW1tYXJ5IE9wZW5pbmdcIik7XHJcblxyXG4gICAgdGhpcy5wcmV2aWV3RWxlbWVudCA9IHRoaXMuYWRkQWN0aW9uKFwibHVjaWRlLWJvb2stb3BlblwiLCBcInByZXZpZXcgbW9kZVwiLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0UHJldmlld01vZGUoKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5lZGl0RWxlbWVudCA9IHRoaXMuYWRkQWN0aW9uKFwibHVjaWRlLWVkaXQtM1wiLCBcImVkaXQgbW9kZVwiLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0RWRpdGluZ01vZGUoKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvLyBSZWNvcmQgdGhlIFwic3RhdGVcIiBvZiB0aGUgZ3JhZGVzZXQgc28gd2UgY2FuIGRldGVjdCBjaGFuZ2VzXHJcbiAgICB0aGlzLm51bUNvdW50ZXJzID0gKHRoaXMuZ3JhZGVTZXQuY291bnRlcnMgPT0gdW5kZWZpbmVkKT8wOnRoaXMuZ3JhZGVTZXQuY291bnRlcnMubGVuZ3RoO1xyXG4gICAgdGhpcy5ncmFkZVNldC5jb3VudGVycy5mb3JFYWNoKCAoY291bnRlcikgPT4geyB0aGlzLmNvdW50ZXJzLnB1c2goY291bnRlcik7IH0pO1xyXG5cclxuICAgIHRoaXMuY29kZU1pcnJvci5zZXRWYWx1ZSh0aGlzLmdyYWRlU2V0RGF0YSk7XHJcbiAgICB0aGlzLm1vZGlmaWVkID0gdGhpcy5ncmFkZVNldC5tb2RpZmllZDtcclxuICAgIC8vY29uc29sZS5sb2coXCJTVEFSVElORyBNT0RFOiBtb2RpZmllZCA9IFwiK3RoaXMubW9kaWZpZWQpO1xyXG5cclxuICAgIHRoaXMuc2V0UHJldmlld01vZGUoKTtcclxuICB9XHJcblxyXG4gIHNldFByZXZpZXdNb2RlKCkge1xyXG4gICAgaWYgKHRoaXMubW9kZSA9PSBQUkVWSUVXX01PREUpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLm1vZGUgPSBQUkVWSUVXX01PREU7XHJcblxyXG4gICAgdGhpcy5tb2RpZmllZCA9IHRoaXMubW9kaWZpZWQgfHwgKHRoaXMuY29kZU1pcnJvci5nZXRWYWx1ZSgpICE9PSB0aGlzLnBsdWdpbi5ncmFkZVNldC5ncmFkZVNldERhdGEpO1xyXG5cclxuICAgIHRoaXMuZ3JhZGVTZXREYXRhID0gdGhpcy5jb2RlTWlycm9yLmdldFZhbHVlKCk7XHJcbiAgICB0aGlzLmdyYWRlU2V0LmRlZmluZUdyYWRlU2V0KHRoaXMuZ3JhZGVTZXREYXRhLCB0aGlzLmdyYWRlU2V0LnNvdXJjZUZvbGRlciwgdGhpcy5ncmFkZVNldC5zb3VyY2VGaWxlLCB0cnVlKTtcclxuXHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyRWwuY2hpbGRyZW5bMV07XHJcbiAgICB0aGlzLmNvbnRhaW5lci5lbXB0eSgpO1xyXG4gICAgY29uc3QgZGl2ID0gdGhpcy5jb250YWluZXIuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwidmlldy1zdHlsZVwiIH0pO1xyXG4gICAgbGV0IGdyYWRlU2V0Tm90ZSA9IHRoaXMuZ2VuZXJhdGVNYXJrZG93bkZyb21HcmFkZVNldCgpO1xyXG4gICAgbGV0IG1hcmtkb3duID0gTWFya2Rvd25SZW5kZXJlci5yZW5kZXJNYXJrZG93bihncmFkZVNldE5vdGUsIGRpdiwgbnVsbCwgbnVsbCk7XHJcblxyXG4gICAgLy8gdGhpcy5lZGl0RWxlbWVudC50b2dnbGVWaXNpYmlsaXR5KHRydWUpO1xyXG4gICAgLy8gdGhpcy5wcmV2aWV3RWxlbWVudC50b2dnbGVWaXNpYmlsaXR5KGZhbHNlKTtcclxuICAgIHRoaXMuZWRpdEVsZW1lbnQuc2hvdygpO1xyXG4gICAgdGhpcy5wcmV2aWV3RWxlbWVudC5oaWRlKCk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJQUkVWSUVXIE1PREU6IG1vZGlmaWVkID0gXCIrdGhpcy5tb2RpZmllZCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBzZXRFZGl0aW5nTW9kZSgpIHtcclxuICAgIGlmICh0aGlzLm1vZGUgPT0gRURJVElOR19NT0RFKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy5tb2RlID0gRURJVElOR19NT0RFO1xyXG5cclxuICAgIHRoaXMuY29udGFpbmVyLmVtcHR5KCk7XHJcbiAgICB0aGlzLmNvZGVNaXJyb3IgPSBDb2RlTWlycm9yKHRoaXMuZXh0Q29udGVudEVsLCB7XHJcbiAgICAgIHRoZW1lOiBcIm9ic2lkaWFuXCJcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuY29kZU1pcnJvci5zZXRWYWx1ZSh0aGlzLmdyYWRlU2V0RGF0YSk7XHJcblxyXG4gICAgdGhpcy5lZGl0RWxlbWVudC5oaWRlKCk7IFxyXG4gICAgdGhpcy5wcmV2aWV3RWxlbWVudC5zaG93KCk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJFRElUIE1PREU6IG1vZGlmaWVkID0gXCIrdGhpcy5tb2RpZmllZCk7XHJcbiAgfVxyXG5cclxuICAvLyBzZXQgdGhlIGZpbGUgY29udGVudHNcclxuICBzZXRWaWV3RGF0YSA9IChkYXRhOiBzdHJpbmcsIGNsZWFyOiBib29sZWFuKSA9PiB7XHJcbiAgICBpZiAoY2xlYXIpIHtcclxuICAgICAgdGhpcy5jb2RlTWlycm9yLnN3YXBEb2MoQ29kZU1pcnJvci5Eb2MoZGF0YSwgXCJ0ZXh0L3gtZ3JkXCIpKVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMuY29kZU1pcnJvci5zZXRWYWx1ZShkYXRhKTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgYXN5bmMgb25DbG9zZSgpIHtcclxuICAgIHRoaXMubW9kaWZpZWQgPSB0aGlzLm1vZGlmaWVkIHx8ICh0aGlzLmNvZGVNaXJyb3IuZ2V0VmFsdWUoKSAhPT0gdGhpcy5wbHVnaW4uZ3JhZGVTZXQuZ3JhZGVTZXREYXRhKTtcclxuXHJcbiAgICBpZiAodGhpcy5tb2RpZmllZCkge1xyXG5cclxuICAgICAgLy8gRmluZCB0aGUgZGlmZmVyZW5jZXM6IGNvdW50ZXJzLCBzY29yZXMsIGNhdGVnb3JpZXNcclxuICAgICAgbGV0IGdzZGF0YSA9IHRoaXMuY29kZU1pcnJvci5nZXRWYWx1ZSgpO1xyXG4gICAgICBsZXQgbmV3Z3MgPSBuZXcgR3JhZGVTZXQodGhpcy5wbHVnaW4pO1xyXG4gICAgICBuZXdncy5kZWZpbmVHcmFkZVNldChnc2RhdGEsIHRoaXMuZ3JhZGVTZXQuc291cmNlRm9sZGVyLCB0aGlzLmdyYWRlU2V0LnNvdXJjZUZpbGUsIHRydWUpO1xyXG5cclxuICAgICAgLy8gY2hlY2sgY2F0ZWdvcmllc1xyXG4gICAgICBsZXQgY2F0QWRkZWQ6IENhdGVnb3J5W10gPSBbXTtcclxuICAgICAgbmV3Z3MuY2F0ZWdvcmllcy5maWx0ZXIoIChjYXQpID0+IHsgXHJcbiAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ncmFkZVNldC5jYXRlZ29yaWVzLmZvckVhY2goIChjKSA9PiB7IGlmIChjLm5hbWUgPT0gY2F0Lm5hbWUpIGZvdW5kID0gdHJ1ZTsgfSk7IFxyXG4gICAgICAgIHJldHVybiAhZm91bmQ7XHJcbiAgICAgIH0pLmZvckVhY2goIChjYXQpID0+IHsgY2F0QWRkZWQucHVzaChjYXQpOyB9KTtcclxuICAgICAgdmFyIGNhdERlbGV0ZWQ6IENhdGVnb3J5W10gPSBbXTtcclxuICAgICAgdGhpcy5ncmFkZVNldC5jYXRlZ29yaWVzLmZpbHRlciggKGNhdCkgPT4geyBcclxuICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcclxuICAgICAgICBuZXdncy5jYXRlZ29yaWVzLmZvckVhY2goIChjKSA9PiB7IGlmIChjLm5hbWUgPT0gY2F0Lm5hbWUpIGZvdW5kID0gdHJ1ZTsgfSk7IFxyXG4gICAgICAgIHJldHVybiAhZm91bmQ7XHJcbiAgICAgIH0pLmZvckVhY2goIChjYXQpID0+IHsgY2F0RGVsZXRlZC5wdXNoKGNhdCk7IH0pO1xyXG5cclxuICAgICAgdGhpcy5ncmFkZVNldC5kZWZpbmVHcmFkZVNldCh0aGlzLmNvZGVNaXJyb3IuZ2V0VmFsdWUoKSwgdGhpcy5ncmFkZVNldC5zb3VyY2VGb2xkZXIsIHRoaXMuZ3JhZGVTZXQuc291cmNlRmlsZSwgdHJ1ZSk7ICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAvLyBDaGVjayBjb3VudGVycyAvIGFkanVzdCBzdHVkZW50cyBpZiBuZWNlc3NhcnlcclxuICAgICAgdmFyIGFkZGVkOiBDb3VudGVyW10gPSBbXTtcclxuICAgICAgdGhpcy5ncmFkZVNldC5jb3VudGVycy5maWx0ZXIoIChjb3VudGVyKSA9PiB7IFxyXG4gICAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY291bnRlcnMuZm9yRWFjaCggKGMpID0+IHsgaWYgKGMubmFtZSA9PSBjb3VudGVyLm5hbWUpIGZvdW5kID0gdHJ1ZTsgfSk7IFxyXG4gICAgICAgIHJldHVybiAhZm91bmQ7XHJcbiAgICAgIH0pLmZvckVhY2goIChjb3VudGVyKSA9PiB7IGFkZGVkLnB1c2goY291bnRlcik7IH0pO1xyXG4gICAgICB2YXIgZGVsZXRlZDogQ291bnRlcltdID0gW107XHJcbiAgICAgIHRoaXMuY291bnRlcnMuZmlsdGVyKCAoY291bnRlcikgPT4geyBcclxuICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmdyYWRlU2V0LmNvdW50ZXJzLmZvckVhY2goIChjKSA9PiB7IGlmIChjLm5hbWUgPT0gY291bnRlci5uYW1lKSBmb3VuZCA9IHRydWU7IH0pOyBcclxuICAgICAgICByZXR1cm4gIWZvdW5kO1xyXG4gICAgICB9KS5mb3JFYWNoKCAoY291bnRlcikgPT4geyBkZWxldGVkLnB1c2goY291bnRlcik7IH0pO1xyXG4gICAgICBjb25zb2xlLmxvZyhkZWxldGVkKTtcclxuXHJcbiAgICAgIGlmIChhZGRlZC5sZW5ndGggPiAwKVxyXG4gICAgICAgIGFkZGVkLmZvckVhY2goIChjb3VudGVyKSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpcy5ncmFkZVNldC5zdHVkZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5ncmFkZVNldC5zdHVkZW50cy5mb3JFYWNoKCAoc3R1ZGVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBzdHVkZW50LmFkZENvdW50ZXIoY291bnRlcilcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoZGVsZXRlZC5sZW5ndGggPiAwKVxyXG4gICAgICAgIGRlbGV0ZWQuZm9yRWFjaCggKGNvdW50ZXIpID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLmdyYWRlU2V0LnN0dWRlbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICB0aGlzLmdyYWRlU2V0LnN0dWRlbnRzLmZvckVhY2goIChzdHVkZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHN0dWRlbnQuZGVsZXRlQ291bnRlcihjb3VudGVyKVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL3RoaXMucGx1Z2luLmdyYWRlU2V0Lm1vZGlmaWVkID0gdGhpcy5tb2RpZmllZDtcclxuICAgIHRoaXMucGx1Z2luLmdyYWRlQm94Vmlldy5kaXNwbGF5KCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIkdTRVRTVU1NQVJZLCBHUy5NT0RJRklFRCA9IFwiK3RoaXMubW9kaWZpZWQpO1xyXG4gICAgdGhpcy5hcHAud29ya3NwYWNlLmRldGFjaExlYXZlc09mVHlwZShWSUVXX1RZUEVfR1JBREVTRVRfU1VNTUFSWSk7XHJcblxyXG4gIH1cclxuXHJcbiAgY2xlYXIoKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGVNYXJrZG93bkZyb21HcmFkZVNldCgpIHtcclxuICAgIHZhciBncmFkZVNldE5vdGU6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgLy8gVGl0bGUgXHJcbiAgICBncmFkZVNldE5vdGUgKz0gXCItLS0tXFxuIyBcIit0aGlzLmdyYWRlU2V0LnByb3BlcnRpZXMuZ2V0KCd0aXRsZScpO1xyXG4gICAgZ3JhZGVTZXROb3RlICs9IFwiXFxuLS0tLVxcblwiOyBcclxuXHJcbiAgICAvLyBDbGFzcyBkYXRhXHJcbiAgICBncmFkZVNldE5vdGUgKz0gXCJcXG4jIyMgXCIrdGhpcy5ncmFkZVNldC5nZXRTdHVkZW50cygpK1wiIHN0dWRlbnRzLlxcblwiO1xyXG4gICAgaWYgKHRoaXMuZ3JhZGVTZXQubGFzdE1vZGlmaWVkICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICBncmFkZVNldE5vdGUgKz0gXCIjIyMgTGFzdCBtb2RpZmllZDogXCIrdGhpcy5ncmFkZVNldC5sYXN0TW9kaWZpZWQudG9Mb2NhbGVTdHJpbmcoKStcIlxcblwiO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZ3JhZGVTZXQuY291bnRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICBncmFkZVNldE5vdGUgKz0gXCIjIyMgQ291bnRlcnNcXG5cIjtcclxuICAgICAgdGhpcy5ncmFkZVNldC5jb3VudGVycy5mb3JFYWNoKCAoY291bnRlcikgPT4ge1xyXG4gICAgICAgIGdyYWRlU2V0Tm90ZSArPSBcIiAtIFwiK2NvdW50ZXIubmFtZSsnLCBpbml0aWFsID0gJytjb3VudGVyLnZhbHVlKydcXG4nO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmdyYWRlU2V0LnJlbWluZGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGdyYWRlU2V0Tm90ZSArPSBcIiMjIyBSZW1pbmRlcnNcXG5cIjtcclxuICAgICAgdGhpcy5ncmFkZVNldC5yZW1pbmRlcnMuZm9yRWFjaCggKHJlbWluZGVyKSA9PiB7XHJcbiAgICAgICAgZ3JhZGVTZXROb3RlICs9ICcgLSBcIicrcmVtaW5kZXIudGV4dCsnXCIgb24gJytyZW1pbmRlci5kYXRlLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICAgICAgaWYgKHJlbWluZGVyLnJlcGVhdCA+IDApIGdyYWRlU2V0Tm90ZSArPSAnLCByZXBlYXRzIGV2ZXJ5ICcrcmVtaW5kZXIucmVwZWF0KycgZGF5cyc7XHJcbiAgICAgICAgaWYgKHJlbWluZGVyLnByaW9yID4gMCkgZ3JhZGVTZXROb3RlICs9ICcsIHByaW9yID0gJytyZW1pbmRlci5wcmlvcisnIGRheXMnO1xyXG4gICAgICAgIGdyYWRlU2V0Tm90ZSArPSAnXFxuJztcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5ncmFkZVNldC5nZXRTdHVkZW50cygpID4gMCkge1xyXG4gICAgICBncmFkZVNldE5vdGUgKz0gXCIjIyMgQ2xhc3MgYXZlcmFnZSA9IFwiK1V0aWxpdGllcy5maXhUb1BsYWNlcyh0aGlzLmdyYWRlU2V0LmNsYXNzQXZlcmFnZSgpKTtcclxuICAgICAgaWYgKCEgdGhpcy5ncmFkZVNldC5hbGxDYXRlZ29yaWVzSGF2ZVNjb3JlcygpKSB7XHJcbiAgICAgICAgbGV0IGV4dHJhcCA9IHRoaXMuZ3JhZGVTZXQuY2xhc3NBdmVyYWdlKCkgLyB0aGlzLmdyYWRlU2V0LndlaWdodFRvdGFsKClcclxuICAgICAgICBncmFkZVNldE5vdGUgKz0gXCIgKFwiICsgVXRpbGl0aWVzLmZpeFRvUGxhY2VzKGV4dHJhcCkgKyBcIiUpXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGdyYWRlU2V0Tm90ZSArPSBcIlxcbi0tLS1cXG5cIjtcclxuXHJcbiAgICAvLyBDYXRlZ29yeSBsaXN0aW5ncyB3aXRoIGRhdGEgYW5kIHNjb3Jlc1xyXG4gICAgaWYgKHRoaXMuZ3JhZGVTZXQuY2F0ZWdvcmllcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGdyYWRlU2V0Tm90ZSArPSBcIiMjIENhdGVnb3JpZXNcXG5cIjtcclxuICAgICAgdGhpcy5ncmFkZVNldC5jYXRlZ29yaWVzLmZvckVhY2goIChjYXQ6IENhdGVnb3J5KSA9PiB7XHJcbiAgICAgICAgZ3JhZGVTZXROb3RlICs9IFwiPiBbIW5vdGVdIFwiK2NhdC5uYW1lKydcXG4nO1xyXG4gICAgICAgIGdyYWRlU2V0Tm90ZSArPSBcIj4gLSBXZWlnaHQ6IFwiK2NhdC53ZWlnaHQrJ1xcbic7XHJcbiAgICAgICAgZ3JhZGVTZXROb3RlICs9IFwiPiAtIFwiKyhjYXQucGVyY2VudE9mU2NvcmVzKjEwMCkrJyUgb2Ygc2NvcmVzIHVzZWRcXG4nXHJcbiAgICAgICAgZ3JhZGVTZXROb3RlICs9IFwiPiA+IFshZXhhbXBsZV0gU2NvcmVzXFxuXCI7XHJcbiAgICAgICAgZ3JhZGVTZXROb3RlICs9IFwiPiA+IFxcblwiO1xyXG5cclxuICAgICAgICBpZiAoY2F0LnNjb3JlU2V0ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgZ3JhZGVTZXROb3RlICs9IFwiTm8gc2NvcmVzXFxuXCJcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZ3JhZGVTZXROb3RlICs9IFwiPiA+IHwgTmFtZSB8IFBvc3NpYmxlIHwgQXZlcmFnZSB8XFxuXCI7XHJcbiAgICAgICAgICBncmFkZVNldE5vdGUgKz0gXCI+ID4gfC0tLS0tLXw6LS0tLS0tLS06fDotLS0tLS0tOnxcXG5cIjtcclxuICAgICAgICAgIGNhdC5zY29yZVNldC5mb3JFYWNoKCAoc2M6IFNjb3JlKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IE1hdGgucm91bmQoc2MuZ2V0VmFsdWUoKSoxMDApLzEwMDtcclxuICAgICAgICAgICAgbGV0IGNsYXNzQXZlID0gTWF0aC5yb3VuZCh0aGlzLmdyYWRlU2V0LmNsYXNzU2NvcmVBdmVyYWdlKGNhdCwgc2MubmFtZSkqMTAwKS8xMDA7XHJcbiAgICAgICAgICAgIGxldCBwZXJjZW50ID0gTWF0aC5yb3VuZChjbGFzc0F2ZS9zYy5nZXRWYWx1ZSgpKjEwMDAwKS8xMDA7XHJcbiAgICAgICAgICAgIGdyYWRlU2V0Tm90ZSArPSBcIj4gPiB8IFwiK3NjLmdldE5hbWUoKSsnIHwgJyt2YWx1ZStcIiB8IFwiK3BlcmNlbnQrXCIlIChcIitjbGFzc0F2ZStcIikgfFxcblwiO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZ3JhZGVTZXROb3RlICs9IFwiXFxuXCI7XHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBncmFkZVNldE5vdGUgKz0gXCIjIyBObyBjYXRlZ29yaWVzXFxuXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiBncmFkZVNldE5vdGU7XHJcblxyXG4gIH1cclxuXHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IENvZGVNaXJyb3I7IiwiLy8gU3RvbGVuIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2hlbGxvaXRzaWFuL2N1c3RvbS1tb2RhbHMtb2JzaWRpYW4vYmxvYi9tYWluL3NyYy9tb2RhbC9DdXN0b21Nb2RhbC50c1xuXG5pbXBvcnQgeyBBcHAsIE1vZGFsLCBOb3RpY2UsIFBsdWdpbiwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcblxuZXhwb3J0IGNsYXNzIEFsZXJ0IGV4dGVuZHMgTW9kYWwge1xuXHRwbHVnaW46IFBsdWdpbjtcblx0dGl0bGU6IHN0cmluZztcblx0Y29udGVudDogc3RyaW5nO1xuXHRva1RleHQ6IHN0cmluZztcblx0Y2FuY2VsVGV4dDogc3RyaW5nO1xuXHRjb250aW51ZUNhbGxiYWNrOiAoKSA9PiB2b2lkO1xuICBcblx0Y29uc3RydWN0b3IoXG5cdFx0cGx1Z2luOiBQbHVnaW4sXG5cdFx0dGl0bGU6IHN0cmluZyxcblx0XHRjb250ZW50OiBzdHJpbmcsXG5cdCkge1xuXHRcdHN1cGVyKHBsdWdpbi5hcHApO1xuXG5cdFx0dGhpcy5wbHVnaW4gPSBwbHVnaW47XG5cdFx0dGhpcy50aXRsZSA9IHRpdGxlO1xuXHRcdHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG5cdH1cblxuXHRhc3luYyBvbk9wZW4oKSB7XG5cdFx0bmV3IE5vdGljZSh0aGlzLmNvbnRlbnQpO1xuXG5cdFx0bGV0IHtjb250ZW50RWx9ID0gdGhpcztcblx0XHRcblx0XHRjb250ZW50RWwuY3JlYXRlRWwoXCJmb3JtXCIsIHt9LCAoZm9ybSkgPT4ge1xuXG5cdFx0XHRsZXQgdGl0bGVEaXYgPSBmb3JtLmNyZWF0ZURpdigpO1xuXHRcdFx0dGl0bGVEaXYuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IHRoaXMudGl0bGUgfSk7XG5cdFx0XHR0aXRsZURpdi5jcmVhdGVFbChcImhyXCIpO1xuXHRcdFx0XG5cdFx0XHR0aXRsZURpdi5jcmVhdGVFbChcImg0XCIsIHsgdGV4dDogdGhpcy5jb250ZW50fSk7XG5cblx0XHRcdGZvcm0uY3JlYXRlRGl2KFwiYWxlcnQtYnV0dG9uLWNvbnRhaW5lclwiLCBjb250YWluZXIgPT4ge1xuXHRcdFx0XHRjb250YWluZXJcblx0XHRcdFx0XHQuY3JlYXRlRWwoXCJidXR0b25cIiwgeyBhdHRyOiB7IHR5cGU6IFwiYnV0dG9uXCIgfSwgdGV4dDogXCJPa1wiIH0pXG5cdFx0XHRcdFx0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdH0pO1xuXG5cdFx0fSk7XG5cdH1cblxuXHRvbkNsb3NlKCkge1xuXHRcdGxldCB7Y29udGVudEVsfSA9IHRoaXM7XG5cdFx0Y29udGVudEVsLmVtcHR5KCk7XG5cdH1cblxuXG59XG5cbiIsImltcG9ydCB7IEFwcCwgQnV0dG9uQ29tcG9uZW50LCBEcm9wZG93bkNvbXBvbmVudCwgTW9kYWwsIFNldHRpbmcsIFRGaWxlLCBUZXh0RmlsZVZpZXcsIFRvZ2dsZUNvbXBvbmVudCwgV29ya3NwYWNlTGVhZiB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5pbXBvcnQgeyBDYXRlZ29yeSB9IGZyb20gXCJkYXRhL0NhdGVnb3J5XCI7XG5pbXBvcnQgeyBDb3VudGVyIH0gZnJvbSBcImRhdGEvQ291bnRlclwiO1xuaW1wb3J0IHsgR3JhZGVTZXQgfSBmcm9tIFwiZGF0YS9HcmFkZVNldFwiO1xuaW1wb3J0IHsgU2NvcmUgfSBmcm9tIFwiZGF0YS9TY29yZVwiO1xuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCJkYXRhL1N0dWRlbnRcIjtcblxudmFyIHBsdXNpY29uID0gJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBjbGFzcz1cImx1Y2lkZSBsdWNpZGUtcGx1cy1jaXJjbGVcIj48Y2lyY2xlIGN4PVwiMTJcIiBjeT1cIjEyXCIgcj1cIjEwXCIvPjxwYXRoIGQ9XCJNOCAxMmg4XCIvPjxwYXRoIGQ9XCJNMTIgOHY4XCIvPjwvc3ZnPic7XG5cbnZhciBtaW51c2ljb24gPSAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIGNsYXNzPVwibHVjaWRlIGx1Y2lkZS1taW51cy1jaXJjbGVcIj48Y2lyY2xlIGN4PVwiMTJcIiBjeT1cIjEyXCIgcj1cIjEwXCIvPjxwYXRoIGQ9XCJNOCAxMmg4XCIvPjwvc3ZnPic7XG5cbmV4cG9ydCBjbGFzcyBDb3VudGVyVGljayBleHRlbmRzIE1vZGFsIHtcblxuICAgIGNhbGxiYWNrT25DbG9zZTtcbiAgICBncmFkZVNldDogR3JhZGVTZXQ7XG4gICAgc3R1ZGVudDogU3R1ZGVudDtcbiAgICBmaWVsZHM6IFRvZ2dsZUNvbXBvbmVudFtdO1xuXG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHN0dWRlbnQ6U3R1ZGVudCwgY2FsbGJhY2tPbkNsb3NlOiAoY291bnRlcjogQ291bnRlcikgPT4gdm9pZCkge1xuXHRcdHN1cGVyKGFwcCk7XG5cdFx0dGhpcy5zdHVkZW50ID0gc3R1ZGVudDtcbiAgICAgICAgdGhpcy5jYWxsYmFja09uQ2xvc2UgPSBjYWxsYmFja09uQ2xvc2U7XG5cbiAgICAgICAgdGhpcy5maWVsZHMgPSBbXTtcblx0fVxuXG5cdG9uT3BlbigpIHtcblx0XHRsZXQge2NvbnRlbnRFbH0gPSB0aGlzO1xuXHRcdFxuICAgICAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJmb3JtXCIsIHt9LCAoZm9ybSkgPT4ge1xuXG4gICAgICAgIGxldCB0aXRsZURpdiA9IGZvcm0uY3JlYXRlRGl2KCk7XG4gICAgICAgIHRpdGxlRGl2LmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiAnVGljayBhIENvdW50ZXInIH0pO1xuICAgICAgICB0aXRsZURpdi5jcmVhdGVFbChcImhyXCIpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zdHVkZW50LmNvdW50ZXJzLmZvckVhY2goIChjb3VudGVyOiBDb3VudGVyKSA9PiB7XG4gICAgICAgICAgICBsZXQgY291bnRlckNvbnRhaW5lciA9IGZvcm0uY3JlYXRlRGl2KCk7XG4gICAgICAgICAgICBsZXQgYnV0ID0gbmV3IEJ1dHRvbkNvbXBvbmVudChjb3VudGVyQ29udGFpbmVyKVxuICAgICAgICAgICAgICAgIC5zZXRCdXR0b25UZXh0KFwiLVwiKVxuICAgICAgICAgICAgICAgIC5zZXRJY29uKFwibWludXMtY2lyY2xlXCIpXG4gICAgICAgICAgICAgICAgLm9uQ2xpY2soICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlci5kZWNyZW1lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFja09uQ2xvc2UoY291bnRlcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgaWYgKGNvdW50ZXIudmFsdWUgPT0gMCkge1xuICAgICAgICAgICAgICAgIGJ1dC5zZXREaXNhYmxlZCh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvdW50ZXJDb250YWluZXIuYXBwZW5kVGV4dChcIiZuYnNwOyZuYnNwOyZuYnNwO1wiK2NvdW50ZXIubmFtZStcIiZuYnNwOyZuYnNwOyZuYnNwO1wiKTsgXG4gICAgICAgICAgICBidXQgPSBuZXcgQnV0dG9uQ29tcG9uZW50KGNvdW50ZXJDb250YWluZXIpLnNldEJ1dHRvblRleHQoXCIrXCIpLnNldEljb24oXCJwbHVzLWNpcmNsZVwiKVxuICAgICAgICAgICAgICAgIC5vbkNsaWNrKCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXIuaW5jcmVtZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tPbkNsb3NlKGNvdW50ZXIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIGZvcm0uY3JlYXRlRGl2KFwiY291bnRlci1idXR0b24tY29udGFpbmVyXCIsIGNvbnRhaW5lciA9PiB7XG5cdFx0XHQvLyBcdGNvbnRhaW5lclxuXHRcdFx0Ly8gXHRcdC5jcmVhdGVFbChcImJ1dHRvblwiLCB7IGF0dHI6IHsgdHlwZTogXCJidXR0b25cIiB9LCB0ZXh0OiBcIkNsb3NlXCIgfSlcblx0XHRcdC8vIFx0XHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdC8vIFx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHRcdC8vIFx0XHR9KTtcblx0XHRcdC8vIH0pO1xuICAgICAgICB9KVxuXG4gICAgICAgIFxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgLy8gbmV3IFNldHRpbmcoY29udGVudEVsKVxuICAgICAgICAvLyAuYWRkQnV0dG9uKChidG4pID0+XG4gICAgICAgIC8vICAgICBidG5cbiAgICAgICAgLy8gICAgIC5zZXRCdXR0b25UZXh0KFwiT0tcIilcbiAgICAgICAgLy8gICAgIC5zZXRDdGEoKVxuICAgICAgICAvLyAgICAgLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAvLyAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gKSk7XG5cdFxuXG4gICAgfVxuXG59IiwiLy8gU3RvbGVuIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2hlbGxvaXRzaWFuL2N1c3RvbS1tb2RhbHMtb2JzaWRpYW4vYmxvYi9tYWluL3NyYy9tb2RhbC9DdXN0b21Nb2RhbC50c1xuXG5pbXBvcnQgeyBBcHAsIE1vZGFsLCBOb3RpY2UsIFBsdWdpbiwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcblxuZXhwb3J0IGNsYXNzIERpYWxvZyBleHRlbmRzIE1vZGFsIHtcblx0cGx1Z2luOiBQbHVnaW47XG5cdHRpdGxlOiBzdHJpbmc7XG5cdGNvbnRlbnQ6IHN0cmluZztcblx0b2tUZXh0OiBzdHJpbmc7XG5cdGNhbmNlbFRleHQ6IHN0cmluZztcblx0Y29udGludWVDYWxsYmFjazogKHN0cjogc3RyaW5nKSA9PiB2b2lkO1xuXG4gICAgdmFsdWU6IHN0cmluZztcbiAgXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHBsdWdpbjogUGx1Z2luLFxuXHRcdHRpdGxlOiBzdHJpbmcsXG5cdFx0Y29udGVudDogc3RyaW5nLFxuXHRcdG9rVGV4dDogc3RyaW5nLFxuICAgICAgICBjYW5jZWxUZXh0OiBzdHJpbmcsXG5cdFx0Y2FsbGJhY2s6IChzdHI6IHN0cmluZykgPT4gdm9pZCxcblx0KSB7XG5cdFx0c3VwZXIocGx1Z2luLmFwcCk7XG5cblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcblx0XHR0aGlzLnRpdGxlID0gdGl0bGU7XG5cdFx0dGhpcy5jb250ZW50ID0gY29udGVudDtcblx0XHR0aGlzLm9rVGV4dCA9IG9rVGV4dDtcblx0XHR0aGlzLmNhbmNlbFRleHQgPSBjYW5jZWxUZXh0O1xuXHRcdHRoaXMuY29udGludWVDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHR9XG5cblx0YXN5bmMgb25PcGVuKCkge1xuXHRcdGxldCB7Y29udGVudEVsfSA9IHRoaXM7XG5cdFx0XG5cdFx0Y29udGVudEVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiB0aGlzLnRpdGxlIH0pO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGVudEVsKVxuXHRcdFx0LnNldE5hbWUodGhpcy5jb250ZW50KVxuXHRcdFx0LmFkZFRleHQodGV4dCA9PiBcbiAgICAgICAgICAgICAgICB0ZXh0XG5cdFx0XHRcdC5zZXRWYWx1ZShcIlwiKVxuXHRcdFx0XHQub25DaGFuZ2UoICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMudmFsdWUgPSB2YWx1ZTtcblx0XHRcdFx0fSkpO1xuXG5cdFx0XG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcbiAgICAgIFx0XHQuYWRkQnV0dG9uKChidG4pID0+XG4gICAgICAgIFx0XHRidG5cbiAgICAgICAgICBcdFx0LnNldEJ1dHRvblRleHQodGhpcy5jYW5jZWxUZXh0KVxuICAgICAgICAgIFx0XHQuc2V0Q3RhKClcbiAgICAgICAgICBcdFx0Lm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICAgICAgXHRcdHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICBuZXcgU2V0dGluZyhjb250ZW50RWwpXG4gICAgICAgICAgLmFkZEJ1dHRvbigoYnRuKSA9PlxuICAgICAgICAgICAgYnRuXG4gICAgICAgICAgICAgIC5zZXRCdXR0b25UZXh0KHRoaXMub2tUZXh0KVxuICAgICAgICAgICAgICAuc2V0Q3RhKClcbiAgICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRpbnVlQ2FsbGJhY2sodGhpcy52YWx1ZSk7XG4gICAgICB9KSk7XG5cblxuXHR9XG5cblx0b25DbG9zZSgpIHtcblx0XHRsZXQge2NvbnRlbnRFbH0gPSB0aGlzO1xuXHRcdGNvbnRlbnRFbC5lbXB0eSgpO1xuXHR9XG5cblxufVxuXG4iLCJpbXBvcnQgRW1haWwgZnJvbSBcImh0dHBzOi8vc210cGpzLmNvbS92My9zbXRwLmpzXCI7XG5pbXBvcnQgeyBFbWFpbGVyU2V0dGluZ3MgfSBmcm9tICcuL3NldHRpbmdzJ1xuaW1wb3J0IHsgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCAgVXRpbGl0aWVzICBmcm9tICcuL3V0aWxpdGllcy9VdGlsaXRpZXMnO1xuLy9pbXBvcnQgbm9kZW1haWxlciBmcm9tICdub2RlbWFpbGVyJztcblxuLy8gdHJ5IHtcbi8vICAgY29uc3Qgbm1haWxlciA9IHJlcXVpcmUoJ25vZGVfbW9kdWxlcy9ub2RlbWFpbGVyJyk7XG4vLyB9IGNhdGNoIChlKSB7XG4vLyAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IgJiYgZS5jb2RlID09PSBcIk1PRFVMRV9OT1RfRk9VTkRcIikge1xuLy8gICAgICAgY29uc29sZS5sb2coZSk7XG4vLyAgICAgICBjb25zb2xlLmxvZyhcIkNhbid0IGxvYWQgbm9kZW1haWxlciFcIik7XG4vLyAgIH1cbi8vIH1cblxuLyogU210cEpTLmNvbSAtIHYzLjAuMCAgIEEwQjU3N0UzNjg3QzU0NzFFQjg2MDQwNjMyMjM5MTE3RURERkU2NDE4Qzg0RjE1MjVDMzM5MUI5OEQzOEU0MTkyRkRCQ0Y0RjgyMDFGMjhCQjE4N0I0NkQ5RDQyMkMwRiAgIGZucWNxemN3b3Bjenh4amQqL1xuICBcbmV4cG9ydCBjbGFzcyBFbWFpbGVyIHtcblxuICAgIGVtYWlsV29ya3M6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgaHRtbDogc3RyaW5nO1xuICAgIHRvOiBzdHJpbmc7XG4gICAgZnJvbTogc3RyaW5nO1xuICAgIHN1YmplY3Q6IHN0cmluZztcbiAgICBzZXR0aW5nczogRW1haWxlclNldHRpbmdzO1xuICAgIGF0dGFjaG1lbnRzOiBPYmplY3RbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBcIlwiO1xuICAgICAgICB0aGlzLmh0bWwgPSBudWxsO1xuICAgICAgICB0aGlzLnRvID0gXCJcIjtcbiAgICAgICAgdGhpcy5mcm9tID0gXCJcIjtcbiAgICAgICAgdGhpcy5zdWJqZWN0ID0gXCJcIjtcbiAgICAgICAgdGhpcy5hdHRhY2htZW50cyA9IFtdO1xuXHQgIH1cbiAgICBcbiAgICBzZXRNZXNzYWdlKG1zZzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1zZztcbiAgICB9XG5cbiAgICBzZXRNZXNzYWdlSFRNTChodG1sOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5odG1sID0gaHRtbDtcbiAgICB9XG5cbiAgICBhZGRBdHRhY2htZW50KHBhdGg6IHN0cmluZywgZmlsZW5hbWU9XCJnYi50eHRcIiwgY29udGVudFR5cGU9XCJ0ZXh0L3BsYWluXCIpIHtcbiAgICAgICAgbGV0IGF0dGFjaG1lbnQgPSB7XG4gICAgICAgICAgICAnbmFtZSc6IGZpbGVuYW1lLFxuICAgICAgICAgICAgLy8nY29udGVudFR5cGUnOiBjb250ZW50VHlwZSxcbiAgICAgICAgICAgICdwYXRoJzogcGF0aFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmF0dGFjaG1lbnRzLnB1c2goYXR0YWNobWVudCk7XG4gICAgfVxuXG4gICAgc2VuZG1haWwodG86IHN0cmluZywgZnJvbTogc3RyaW5nLCBzdWJqZWN0OiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgc2V0dGluZ3M6IEVtYWlsZXJTZXR0aW5ncywgXG4gICAgICAgICAgICAgZXJyQ2FsbGJhY2s6IChlcnJpbmZvKSA9PiB2b2lkKTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy50byA9IHRvO1xuICAgICAgICB0aGlzLmZyb20gPSBmcm9tO1xuICAgICAgICB0aGlzLnN1YmplY3QgPSBzdWJqZWN0O1xuICAgICAgICBpZiAobWVzc2FnZSAhPSBudWxsKSB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VuZGluZyBcIittZXNzYWdlKVxuICAgICAgICBjb25zb2xlLmxvZyhcIlRvOiBcIit0bylcblxuICAgICAgICBsZXQgbWFpbE9wdGlvbnMgPSB7XG4gICAgICAgICAgICBmcm9tOiB0aGlzLmZyb20sXG4gICAgICAgICAgICB0bzogdGhpcy50byxcbiAgICAgICAgICAgIHN1YmplY3Q6IHRoaXMuc3ViamVjdCxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcIlgtR3JhZGVCb3gtVmVyc2lvblwiOiBcIk9ic2lkaWFuIFZlcnNpb24gMS4wXCIsIFwiWC1kZXZcIjogXCJmcmV0aG9wXCJ9LFxuICAgICAgICAgICAgdGV4dDogdGhpcy5tZXNzYWdlLFxuICAgICAgICAgICAgYXR0YWNobWVudHM6IHRoaXMuYXR0YWNobWVudHMsXG4gICAgICAgICAgICBodG1sOiB0aGlzLmh0bWwsXG4gICAgICAgICAgICAvL0JvZHk6IHRoaXMubWVzc2FnZSxcbiAgICAgICAgICAgIC8vVXNlcm5hbWU6IHNldHRpbmdzLnVzZXJuYW1lLFxuICAgICAgICAgICAgLy9QYXNzd29yZDogc2V0dGluZ3MucGFzc3dvcmQsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnNvbGUubG9nKG1haWxPcHRpb25zKTtcblxuICAgICAgICAgIGlmICh0aGlzLmVtYWlsV29ya3MpIHtcbiAgICAgICAgY29uc3QgdHJhbnNwb3J0ZXIgPSBub2RlbWFpbGVyLmNyZWF0ZVRyYW5zcG9ydCh7XG4gICAgICAgICAgICBzZXJ2aWNlOiBzZXR0aW5ncy5zZXJ2aWNlLFxuICAgICAgICAgICAgaG9zdDogc2V0dGluZ3Muc210cGhvc3QsXG4gICAgICAgICAgICBwb3J0OiBOdW1iZXIoc2V0dGluZ3Muc210cHBvcnQpLFxuICAgICAgICAgICAgc2VjdXJlOiBzZXR0aW5ncy5zZWN1cmUsIFxuICAgICAgICAgICAgYXV0aDoge1xuICAgICAgICAgICAgICB1c2VyOiBzZXR0aW5ncy51c2VybmFtZSxcbiAgICAgICAgICAgICAgcGFzczogc2V0dGluZ3MucGFzc3dvcmRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgLy93aGlsZSAoY291bnQgPCA1KSBcbiAgICAgICAgICB0cmFuc3BvcnRlci5zZW5kTWFpbChtYWlsT3B0aW9ucywgYXN5bmMgZnVuY3Rpb24oZXJyb3I6IGFueSwgaW5mbzogeyByZXNwb25zZTogc3RyaW5nOyB9KXtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNFTkRNQUlMIEVSUk9SOiAjXCIrY291bnQrXCI6IFwiK2Vycm9yKTtcbiAgICAgICAgICAgICAgY291bnQgKys7XG4gICAgICAgICAgICAgIGF3YWl0IFV0aWxpdGllcy5zbGVlcCgyMDAwKTtcbiAgICAgICAgICAgICAgZXJyQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY291bnQgPSA1XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFbWFpbCBzZW50OiAnICsgaW5mby5yZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gICAgICAgIFxuICAgIH0gIFxuICAgIFxufVxuIiwiaW1wb3J0IHsgQXBwLCBCdXR0b25Db21wb25lbnQsIEVkaXRvciwgSXRlbVZpZXcsIE1hcmtkb3duRmlsZUluZm8sIE1lbnUsIE1vZGFsLCBOb3RpY2UsIFNldHRpbmcsIFRGaWxlLCBUZXh0QXJlYUNvbXBvbmVudCwgVGV4dENvbXBvbmVudCwgVGV4dEZpbGVWaWV3LCBUb2dnbGVDb21wb25lbnQsIFdvcmtzcGFjZUxlYWYgfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuZXhwb3J0IGNsYXNzIEVtYWlsZXJNb2RhbCBleHRlbmRzIE1vZGFsIHtcblx0YWRkcmVzczogc3RyaW5nO1xuXHRzdWJqZWN0OiBzdHJpbmc7XG5cdGZyb206IHN0cmluZztcblx0YXR0YWNoU2NvcmVzOiBib29sZWFuO1xuXHRtZXNzYWdlOiBzdHJpbmc7XG5cdG9uU3VibWl0OiAobWVzc2FnZTogc3RyaW5nLCBmcm9tOiBzdHJpbmcsIGFkZHJlc3M6IHN0cmluZywgc3ViamVjdDogc3RyaW5nLCBhdHRhY2hTY29yZXM6IGJvb2xlYW4sIGZpbGVzRGlyOiBGaWxlTGlzdCkgPT4gdm9pZDtcblx0c2V0dGluZ3M6IEdyYWRlQm94UGx1Z2luU2V0dGluZ3M7XG5cdFxuXHRjb25zdHJ1Y3RvcihhcHA6IEFwcCwgXG5cdFx0XHRcdHNldHRpbmdzOiBHcmFkZUJveFBsdWdpblNldHRpbmdzLFxuXHRcdCAgICAgICAgb25TdWJtaXQ6IChtZXNzYWdlOiBzdHJpbmcsIGZyb206IHN0cmluZywgYWRkcmVzczogc3RyaW5nLCBzdWJqZWN0OiBzdHJpbmcsIGF0dGFjaFNjb3JlczogYm9vbGVhbiwgZmlsZXNEaXI6IEZpbGVMaXN0KSA9PiB2b2lkKSB7XG5cdFx0c3VwZXIoYXBwKTtcblxuXHRcdHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcblx0XHR0aGlzLm9uU3VibWl0ID0gb25TdWJtaXQ7XG5cdFx0dGhpcy5hdHRhY2hTY29yZXMgPSBmYWxzZTtcblx0fVxuXG5cdG9uT3BlbigpIHtcblx0XHRjb25zdCB7Y29udGVudEVsfSA9IHRoaXM7XG5cblx0XHRjb250ZW50RWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6ICdFbnRlciBlbWFpbCBtZXNzYWdlIGluZm8nIH0pO1xuXG5cdFx0dGhpcy5hZGRyZXNzID0gKHRoaXMuc2V0dGluZ3MuZGVmYXVsdHRvICE9PSB1bmRlZmluZWQpP3RoaXMuc2V0dGluZ3MuZGVmYXVsdHRvOlwiXCI7XG5cdFx0dGhpcy5mcm9tID0gKHRoaXMuc2V0dGluZ3MuZnJvbSAhPT0gdW5kZWZpbmVkKT90aGlzLnNldHRpbmdzLmZyb206XCJcIjtcblx0XHR0aGlzLnN1YmplY3QgPSAodGhpcy5zZXR0aW5ncy5zdWJqZWN0KT90aGlzLnNldHRpbmdzLnN1YmplY3Q6XCJcIjtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcbiAgICAgIFx0XHQuc2V0TmFtZShcIlNlbnQgRnJvbTpcIilcbiAgICAgIFx0XHQuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgXHRcdHRleHRcblx0XHRcdFx0XHQuc2V0VmFsdWUodGhpcy5mcm9tKVxuXHRcdFx0XHQgICBcdC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICBcdFx0XHRcdHRoaXMuZnJvbSA9IHZhbHVlXG5cdFx0XHRcdFx0fVxuXHRcdCkpO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGVudEVsKVxuICAgICAgXHRcdC5zZXROYW1lKFwiRGVzdGluYXRpb246XCIpXG4gICAgICBcdFx0LmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgIFx0XHR0ZXh0XG5cdFx0XHRcdFx0LnNldFZhbHVlKHRoaXMuYWRkcmVzcylcblx0XHRcdFx0ICAgXHQub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgXHRcdFx0XHR0aGlzLmFkZHJlc3MgPSB2YWx1ZVxuXHRcdFx0XHRcdH1cblx0XHQpKTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcbiAgICAgIFx0XHQuc2V0TmFtZShcIlN1YmplY3Q6XCIpXG4gICAgICBcdFx0LmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgIFx0XHR0ZXh0XG5cdFx0XHRcdFx0LnNldFZhbHVlKHRoaXMuc3ViamVjdClcblx0XHRcdFx0XHQub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgXHRcdFx0XHR0aGlzLnN1YmplY3QgPSB2YWx1ZVxuXHRcdFx0ICAgICAgICB9XG5cdFx0KSk7XG5cblx0XHRsZXQgaW5jbHVkZXNDb250YWluZXIxID0gY29udGVudEVsLmNyZWF0ZURpdigpO1xuXHRcdGluY2x1ZGVzQ29udGFpbmVyMS5zdHlsZS5tYXJnaW5Ub3AgPSBcIjEwcHhcIjtcblx0XHRpbmNsdWRlc0NvbnRhaW5lcjEuc3R5bGUuYWxpZ25JdGVtcyA9IFwiY2VudGVyXCI7XG5cdFx0aW5jbHVkZXNDb250YWluZXIxLnN0eWxlLmRpc3BsYXkgPSBcImdyaWRcIjtcblx0XHRpbmNsdWRlc0NvbnRhaW5lcjEuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IFwiY2FsYygyNSUgLSAxMHB4KSAzMHB4XCI7XG5cdFx0aW5jbHVkZXNDb250YWluZXIxLmNyZWF0ZUVsKFwicFwiLCB7IHRleHQ6ICdBdHRhY2ggc2NvcmVzPycgfSk7XG5cdFx0bmV3IFRvZ2dsZUNvbXBvbmVudChpbmNsdWRlc0NvbnRhaW5lcjEpXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKCAodmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMuYXR0YWNoU2NvcmVzID0gdmFsdWU7XG5cdFx0XHRcdFx0fSk7XG5cdFx0aW5jbHVkZXNDb250YWluZXIxLmNyZWF0ZUVsKFwicFwiLCB7IHRleHQ6ICdBdHRhY2ggRmlsZXM/JyB9KTtcblx0XHRuZXcgVG9nZ2xlQ29tcG9uZW50KGluY2x1ZGVzQ29udGFpbmVyMSlcblx0XHRcdFx0XHQub25DaGFuZ2UoICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5hdHRhY2hTY29yZXMgPSB2YWx1ZTtcblx0XHRcdFx0XHRcdGF0dGFjaGRpdi5zdHlsZS5kaXNwbGF5ID0gKHZhbHVlKT9cImJsb2NrXCI6XCJub25lXCI7XG5cdFx0XHRcdFx0fSlcblx0XHRsZXQgYXR0YWNoZGl2ID0gY29udGVudEVsLmNyZWF0ZURpdigpO1xuXHRcdGF0dGFjaGRpdi5zdHlsZS5kaXNwbGF5ID0gXCJncmlkXCI7XG5cdFx0YXR0YWNoZGl2LnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBcImNhbGMoMzMlIC0gMTBweCkgY2FsYyg1MCUgLSAxMHB4KVwiXG5cdFx0YXR0YWNoZGl2LmNyZWF0ZUVsKFwicFwiLCB7IHRleHQ6ICdBdHRhY2htZW50cyBkaXJlY3Rvcnk6ICcgfSk7XG5cdFx0Y29uc3QgaW5wdXREYXRhRmlsZSA9IGF0dGFjaGRpdi5jcmVhdGVFbChcImlucHV0XCIsIHtcblx0XHRcdFx0XHRhdHRyOiB7XG5cdFx0XHRcdFx0ICB0eXBlOiBcImZpbGVcIixcblx0XHRcdFx0XHQgIG11bHRpcGxlOiBmYWxzZSxcblx0XHRcdFx0XHQgIC8vYWNjZXB0OiBcIi5qc29uLC5jc3YsLnRzdlwiLFxuXHRcdFx0XHRcdCAgd2Via2l0ZGlyZWN0b3J5OiB0cnVlLFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0YXR0YWNoZGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuXHRcdGxldCBtZXNzYWdlRGl2ID0gY29udGVudEVsLmNyZWF0ZURpdigpO1xuXHRcdG1lc3NhZ2VEaXYuc3R5bGUubWFyZ2luVG9wID0gXCIxMHB4XCI7XG5cdFx0bWVzc2FnZURpdi5zdHlsZS5wYWRkaW5nID0gXCIxMHB4XCI7XG5cdFx0bWVzc2FnZURpdi5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCAjY2NjXCI7XG5cdFx0bWVzc2FnZURpdi5jcmVhdGVFbChcImg0XCIsIHsgdGV4dDogJ1R5cGUgeW91ciBtZXNzYWdlOicgfSk7XG5cdFx0bGV0IHRhcmVhID0gbmV3IFRleHRBcmVhQ29tcG9uZW50KG1lc3NhZ2VEaXYpXG5cdFx0Ly8gbGV0IHRhcmVhID0gbmV3IFNldHRpbmcobWVzc2FnZURpdilcblx0XHQvLyBcdC5zZXROYW1lKFwiVHlwZSB5b3VyIG1lc3NhZ2VcIilcblx0XHQvLyBcdC5hZGRUZXh0QXJlYSggKGFyZWEpID0+IHtcblx0XHQvLyBcdFx0YXJlYVxuXHRcdFx0XHRcdC5vbkNoYW5nZSggKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLm1lc3NhZ2UgPSB2YWx1ZTtcblx0XHRcdFx0XHR9KVxuXHRcdC8vXHR9KVxuXHRcdHRhcmVhLmlucHV0RWwuc3R5bGUuaGVpZ2h0ID0gXCIyMDBweFwiO1xuXHRcdHRhcmVhLmlucHV0RWwuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcblx0XHQvL25hbWVFbC5pbm5lckhUTUwgPSBcIjxmb250IGNvbG9yPXJlZD5UeXBlIHlvdXIgbWVzc2FnZTo8L2ZvbnQ+XCI7XG5cblx0XHRsZXQgYnV0dG9uQ29udGFpbmVyMiA9IGNvbnRlbnRFbC5jcmVhdGVEaXYoKTtcblx0XHRcblx0XHRuZXcgU2V0dGluZyhidXR0b25Db250YWluZXIyKVxuICAgICAgXHRcdC5hZGRCdXR0b24oKGJ0bikgPT5cbiAgICAgICAgXHRcdGJ0blxuXHRcdC8vbmV3IEJ1dHRvbkNvbXBvbmVudChidXR0b25Db250YWluZXIpXG4gICAgICAgICAgXHRcdC5zZXRCdXR0b25UZXh0KFwiT0tcIilcbiAgICAgICAgICBcdFx0LnNldEN0YSgpXG4gICAgICAgICAgXHRcdC5vbkNsaWNrKCgpID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhpbnB1dERhdGFGaWxlLmZpbGVzKTtcbiAgICAgICAgICAgIFx0XHR0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICBcdFx0dGhpcy5vblN1Ym1pdCh0aGlzLm1lc3NhZ2UsIHRoaXMuZnJvbSwgdGhpcy5hZGRyZXNzLCB0aGlzLnN1YmplY3QsIHRoaXMuYXR0YWNoU2NvcmVzLCBpbnB1dERhdGFGaWxlLmZpbGVzKTtcbiAgICAgICAgICB9KSk7XG5cdH1cblxuXHRvbkNsb3NlKCkge1xuXHRcdGNvbnN0IHtjb250ZW50RWx9ID0gdGhpcztcblx0XHRjb250ZW50RWwuZW1wdHkoKTtcblx0fVxuXG5cdFxufVxuXG4iLCJpbXBvcnQgeyBBcHAsIEJ1dHRvbkNvbXBvbmVudCwgRWRpdG9yLCBJdGVtVmlldywgTWFya2Rvd25GaWxlSW5mbywgTWVudSwgTW9kYWwsIE5vdGljZSwgU2V0dGluZywgVEZpbGUsIFRleHRBcmVhQ29tcG9uZW50LCBUZXh0Q29tcG9uZW50LCBUZXh0RmlsZVZpZXcsIFRvZ2dsZUNvbXBvbmVudCwgV29ya3NwYWNlTGVhZiB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5leHBvcnQgY2xhc3MgTm90ZU1vZGFsIGV4dGVuZHMgTW9kYWwge1xuXHRub3RlOiBzdHJpbmc7XG5cdG9uU3VibWl0OiAobm90ZTogc3RyaW5nKSA9PiB2b2lkO1xuXHRcblx0Y29uc3RydWN0b3IoYXBwOiBBcHAsIFxuICAgICAgICAgICAgICAgIG5vdGU6IHN0cmluZyxcblx0XHQgICAgICAgIG9uU3VibWl0OiAobm90ZTogc3RyaW5nKSA9PiB2b2lkKSB7XG5cdFx0c3VwZXIoYXBwKTtcblxuXHRcdHRoaXMubm90ZSA9IG5vdGU7XG5cdFx0dGhpcy5vblN1Ym1pdCA9IG9uU3VibWl0O1xuXHR9XG5cblx0b25PcGVuKCkge1xuXHRcdGNvbnN0IHtjb250ZW50RWx9ID0gdGhpcztcblxuXHRcdGNvbnRlbnRFbC5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogJ1R5cGUgeW91ciBub3RlOicgfSk7XG5cblx0XHRsZXQgbWVzc2FnZURpdiA9IGNvbnRlbnRFbC5jcmVhdGVEaXYoKTtcblx0XHRtZXNzYWdlRGl2LnN0eWxlLm1hcmdpblRvcCA9IFwiMTBweFwiO1xuXHRcdG1lc3NhZ2VEaXYuc3R5bGUucGFkZGluZyA9IFwiMTBweFwiO1xuXHRcdG1lc3NhZ2VEaXYuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgI2NjY1wiO1xuXHRcdGxldCB0YXJlYSA9IG5ldyBUZXh0QXJlYUNvbXBvbmVudChtZXNzYWdlRGl2KVxuXHRcdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLm5vdGUpXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKCAodmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMubm90ZSA9IHZhbHVlO1xuXHRcdFx0XHRcdH0pXG5cdFx0Ly9cdH0pXG5cdFx0dGFyZWEuaW5wdXRFbC5zdHlsZS5oZWlnaHQgPSBcIjIwMHB4XCI7XG5cdFx0dGFyZWEuaW5wdXRFbC5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuXG5cdFx0bGV0IGJ1dHRvbkNvbnRhaW5lcjIgPSBjb250ZW50RWwuY3JlYXRlRGl2KCk7XG5cdFx0XG5cdFx0bmV3IFNldHRpbmcoYnV0dG9uQ29udGFpbmVyMilcbiAgICAgIFx0XHQuYWRkQnV0dG9uKChidG4pID0+XG4gICAgICAgIFx0XHRidG5cblx0XHQvL25ldyBCdXR0b25Db21wb25lbnQoYnV0dG9uQ29udGFpbmVyKVxuICAgICAgICAgIFx0XHQuc2V0QnV0dG9uVGV4dChcIk9LXCIpXG4gICAgICAgICAgXHRcdC5zZXRDdGEoKVxuICAgICAgICAgIFx0XHQub25DbGljaygoKSA9PiB7XG4gICAgICAgICAgICBcdFx0dGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgXHRcdHRoaXMub25TdWJtaXQodGhpcy5ub3RlKTtcbiAgICAgICAgICB9KSk7XG5cdH1cblxuXHRvbkNsb3NlKCkge1xuXHRcdGNvbnN0IHtjb250ZW50RWx9ID0gdGhpcztcblx0XHRjb250ZW50RWwuZW1wdHkoKTtcblx0fVxuXG5cdFxufVxuXG4iLCIvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vL1xuLy8gIEZ1bmN0aW9uYWxpdHkgYXNzb2NpYXRlIHdpdGggYSB0ZW1wbGF0ZSwgbW9zdGx5IG1lc3NhZ2UgdGVtcGxhdGVcbi8vIFxuLy8gIFBhdHRlcm4gcmVwbGFjZW1lbnQgaW4gbWVzc2FnZXNcbi8vICAgICAgJWZpcnN0bmFtZSUgLS0+IHN0dWRlbnQgZmlyc3QgbmFtZVxuLy8gICAgICAlbGFzdG5hbWUlICAtLT4gc3R1ZGVudCBsYXN0IG5hbWVcbi8vICAgICAgJWlkJSAgICAgICAgLS0+IHN0dWRlbnQgaWRcblxuaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tICdkYXRhL0NhdGVnb3J5JztcbmltcG9ydCB7IEdyYWRlU2V0IH0gZnJvbSAnZGF0YS9HcmFkZVNldCc7XG5pbXBvcnQgeyBTY29yZSB9IGZyb20gJ2RhdGEvU2NvcmUnO1xuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gJ2RhdGEvU3R1ZGVudCc7XG5pbXBvcnQgVXRpbGl0aWVzIGZyb20gJ3V0aWxpdGllcy9VdGlsaXRpZXMnO1xuXG5leHBvcnQgY2xhc3MgVGVtcGxhdGUge1xuXG4gICAgZ3JhZGVTZXQ6IEdyYWRlU2V0O1xuICAgIHByb2Nlc3NQYXR0ZXJuczoge3BhdHRlcm46IHN0cmluZywgcHJvY2VzczogKG9sZDogc3RyaW5nLCBzdHVkOiBTdHVkZW50KSA9PiBzdHJpbmd9W107XG5cbiAgICBjb25zdHJ1Y3RvcihncmFkZVNldDogR3JhZGVTZXQpIHtcbiAgICAgICAgdGhpcy5ncmFkZVNldCA9IGdyYWRlU2V0O1xuXG4gICAgICAgIHRoaXMucHJvY2Vzc1BhdHRlcm5zID0gW1xuICAgICAgICAgICAge3BhdHRlcm46IFwiJWlkJVwiLCBcbiAgICAgICAgICAgICBwcm9jZXNzOiAob2xkOiBzdHJpbmcsIHN0dWQ6IFN0dWRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2xkLnJlcGxhY2UoXCIlaWQlXCIsIHN0dWQuZGF0YS5nZXQoXCJpZFwiKSk7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtwYXR0ZXJuOiBcIiVuYW1lJVwiLFxuICAgICAgICAgICAgIHByb2Nlc3M6IChvbGQ6IHN0cmluZywgc3R1ZDogU3R1ZGVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBvbGQucmVwbGFjZShcIiVuYW1lJVwiLCBzdHVkLmRhdGEuZ2V0KFwibmFtZVwiKSk7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtwYXR0ZXJuOiBcIiVmaXJzdG5hbWUlXCIsXG4gICAgICAgICAgICAgcHJvY2VzczogKG9sZDogc3RyaW5nLCBzdHVkOiBTdHVkZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGZuYW1lID0gc3R1ZC5kYXRhLmdldChcImZuYW1lXCIpO1xuICAgICAgICAgICAgICAgIGlmIChmbmFtZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm5hbWUgPSBzdHVkLmRhdGEuZ2V0KFwibmFtZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZuYW1lLmNvbnRhaW5zKFwiLFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm5hbWUgPSBmbmFtZS5zcGxpdChcIixcIilbMV07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbmFtZSA9IGZuYW1lLnNwbGl0KFwiIFwiKVswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIHJldHVybiBvbGQucmVwbGFjZShcIiVmaXJzdG5hbWUlXCIsIGZuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgfSxcbiAgICAgICAgICAge3BhdHRlcm46IFwiJWxhc3RuYW1lJVwiLFxuICAgICAgICAgICAgIHByb2Nlc3M6IChvbGQ6IHN0cmluZywgc3R1ZDogU3R1ZGVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBsbmFtZSA9IHN0dWQuZGF0YS5nZXQoXCJsbmFtZVwiKTtcbiAgICAgICAgICAgICAgICBpZiAobG5hbWUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxuYW1lID0gc3R1ZC5kYXRhLmdldChcIm5hbWVcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsbmFtZS5jb250YWlucyhcIixcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxuYW1lID0gbG5hbWUuc3BsaXQoXCIsXCIpWzBdO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG5hbWUgPSBsbmFtZS5zcGxpdChcIiBcIilbMV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICByZXR1cm4gb2xkLnJlcGxhY2UoXCIlbGFzdG5hbWUlXCIsIGxuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtwYXR0ZXJuOiBcIiVlbWFpbGFkZHJlc3MlXCIsXG4gICAgICAgICAgICAgcHJvY2VzczogKG9sZDogc3RyaW5nLCBzdHVkOiBTdHVkZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9sZC5yZXBsYWNlKFwiJWVtYWlsYWRkcmVzcyVcIiwgc3R1ZC5kYXRhLmdldChcImVtYWlsYWRkcmVzc1wiKSk7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtwYXR0ZXJuOiBcIiV0aXRsZSVcIixcbiAgICAgICAgICAgICBwcm9jZXNzOiAob2xkOiBzdHJpbmcsIHN0dWQ6IFN0dWRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2xkLnJlcGxhY2UoXCIldGl0bGUlXCIsIGdyYWRlU2V0LnByb3BlcnRpZXMuZ2V0KFwidGl0bGVcIikpO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7cGF0dGVybjogXCIlYWJzZW5jZW51bWJlciVcIixcbiAgICAgICAgICAgICBwcm9jZXNzOiAob2xkOiBzdHJpbmcsIHN0dWQ6IFN0dWRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2xkLnJlcGxhY2UoXCIlYWJzZW5jZW51bWJlciVcIiwgc3R1ZC5hYnNlbmNlcy5sZW5ndGgudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge3BhdHRlcm46IFwiJWFic2VuY2VsaXN0JVwiLFxuICAgICAgICAgICAgIHByb2Nlc3M6IChvbGQ6IHN0cmluZywgc3R1ZDogU3R1ZGVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBhYk5vdGUgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChzdHVkLmFic2VuY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpIDwgc3R1ZC5hYnNlbmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWJOb3RlICs9IFwiIC0gXCIgKyBzdHVkLmFic2VuY2VzW2ldLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tdXMnLCB7IHllYXI6XCJudW1lcmljXCIsIG1vbnRoOlwic2hvcnRcIiwgZGF5OlwibnVtZXJpY1wifSkgKyBcIlxcblwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWJOb3RlID0gXCJObyBhYnNlbmNlc1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gb2xkLnJlcGxhY2UoXCIlYWJzZW5jZWxpc3QlXCIsIGFiTm90ZSk7O1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7cGF0dGVybjogXCIlYWJzZW5jZWxpc3RpZm5vbnplcm8lXCIsXG4gICAgICAgICAgICAgcHJvY2VzczogKG9sZDogc3RyaW5nLCBzdHVkOiBTdHVkZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGFiTm90ZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKHN0dWQuYWJzZW5jZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7IGkgPCBzdHVkLmFic2VuY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhYk5vdGUgKz0gXCIgLSBcIiArIHN0dWQuYWJzZW5jZXNbaV0udG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi11cycsIHsgeWVhcjpcIm51bWVyaWNcIiwgbW9udGg6XCJzaG9ydFwiLCBkYXk6XCJudW1lcmljXCJ9KSArIFwiXFxuXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhYk5vdGUgPSBcIlwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gb2xkLnJlcGxhY2UoXCIlYWJzZW5jZWxpc3RpZm5vbnplcm8lXCIsIGFiTm90ZSk7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtwYXR0ZXJuOiBcIiVjb3VudGVyOlwiLFxuICAgICAgICAgICAgIHByb2Nlc3M6IChvbGQ6IHN0cmluZywgc3R1ZDogU3R1ZGVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2V4ID0gLyVjb3VudGVyOiguKj8pJS9nO1xuICAgICAgICAgICAgICAgIGxldCBtYXRjaGVzID0gb2xkLm1hdGNoKHJlZ2V4KTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcyA9PSBudWxsKSByZXR1cm4gb2xkO1xuICAgICAgICAgICAgICAgIG1hdGNoZXMuZm9yRWFjaCggKG1hdGNoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaWRlcyA9IG1hdGNoLnNwbGl0KFwiOlwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb3VudGVyOiBcIitzaWRlc1sxXSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjbmFtZSA9IHNpZGVzWzFdLnJlcGxhY2UoXCIlXCIsIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBzdHVkLmdldENvdW50ZXIoY25hbWUudHJpbSgpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIFxuICAgICAgICAgICAgICAgICAgICAgICAgb2xkID0gb2xkLnJlcGxhY2UoXCIlY291bnRlcjpcIitzaWRlc1sxXSwgXCJFUlJPUlwiKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgb2xkID0gb2xkLnJlcGxhY2UoXCIlY291bnRlcjpcIitzaWRlc1sxXSwgdmFsdWUudmFsdWUudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICByZXR1cm4gb2xkO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7cGF0dGVybjogXCIlY2F0ZWdvcnlsaXN0JVwiLFxuICAgICAgICAgICAgIHByb2Nlc3M6IChvbGQ6IHN0cmluZywgc3R1ZDogU3R1ZGVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjYXROb3RlID0gXCJcIjsgICAgIFxuICAgICAgICAgICAgICAgIGlmIChncmFkZVNldC5jYXRlZ29yaWVzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGVTZXQuY2F0ZWdvcmllcy5mb3JFYWNoKChjYXQ6IENhdGVnb3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICBjYXROb3RlICs9IFwiIyMjIFwiKyBjYXQubmFtZSArIFwiICh3ZWlnaHQgaXMgXCIrKGNhdC53ZWlnaHQqMTAwKStcIiUpXFxuXCI7XG4gICAgICAgICAgICAgICAgICAgICBpZiAoY2F0LnNjb3JlU2V0ICE9PSB1bmRlZmluZWQgJiYgY2F0LnNjb3JlU2V0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgY2F0LnNjb3JlU2V0LmZvckVhY2goIChzY29yZTogU2NvcmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Tm90ZSArPSBcIi0gKipcIitzY29yZS5uYW1lK1wiKio6IFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3R1ZGVudFNjb3JlID0gc3R1ZC5nZXQoY2F0LCBzY29yZS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdHVkZW50U2NvcmUgPT0gJ3VuZGVmaW5lZCcpIHN0dWRlbnRTY29yZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhdE5vdGUgKz0gXCJcIiArIHN0dWRlbnRTY29yZSArIFwiIC8gXCIgKyBzY29yZS52YWx1ZSArIFwiXFxuXCI7XG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgY2F0Tm90ZSArPSBcIj4gTk8gU0NPUkVTXFxuXCI7XG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICBjYXROb3RlICs9IFwiXFxuXCI7XG4gICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBvbGQucmVwbGFjZShcIiVjYXRlZ29yeWxpc3QlXCIsIGNhdE5vdGUpO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7cGF0dGVybjogXCIlY2F0ZWdvcnk6XCIsXG4gICAgICAgICAgICAgcHJvY2VzczogKG9sZDogc3RyaW5nLCBzdHVkOiBTdHVkZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVnZXggPSAvJWNhdGVnb3J5OiguKj8pJS9nO1xuICAgICAgICAgICAgICAgIGxldCBtYXRjaGVzID0gb2xkLm1hdGNoKHJlZ2V4KTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcyA9PSBudWxsKSByZXR1cm4gb2xkO1xuICAgICAgICAgICAgICAgIG1hdGNoZXMuZm9yRWFjaCggKG1hdGNoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaWRlcyA9IG1hdGNoLnNwbGl0KFwiOlwiKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNuYW1lID0gc2lkZXNbMV0ucmVwbGFjZShcIiVcIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjYXQgPSBncmFkZVNldC5nZXRDYXRlZ29yeSh7bmFtZTogY25hbWV9KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hcmtkb3duID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhdCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWFya2Rvd24gPSBcIioqIFwiK2NuYW1lK1wiICoqXFxuXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2F0LnNjb3JlU2V0ICE9PSB1bmRlZmluZWQgJiYgY2F0LnNjb3JlU2V0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXQuc2NvcmVTZXQuZm9yRWFjaCggKHNjb3JlOiBTY29yZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZG93biArPSBcIj4gLSAqKlwiK3Njb3JlLm5hbWUrXCIqKjogXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHVkZW50U2NvcmUgPSB0aGlzLmdldChjYXQsIHNjb3JlLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN0dWRlbnRTY29yZSA9PSAndW5kZWZpbmVkJykgc3R1ZGVudFNjb3JlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2Rvd24gKz0gXCJcIiArIHN0dWRlbnRTY29yZSArIFwiIC8gXCIgKyBzY29yZS52YWx1ZSArIFwiXFxuXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZG93biArPSBcIj4gTk8gU0NPUkVTXFxuXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhdCA9PSBudWxsKSBcbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZCA9IG9sZC5yZXBsYWNlKFwiJWNhdGVnb3J5OlwiK3NpZGVzWzFdLCBcIkVSUk9SXCIpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBvbGQgPSBvbGQucmVwbGFjZShcIiVjYXRlZ29yeTpcIitzaWRlc1sxXSwgbWFya2Rvd24pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9sZDtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge3BhdHRlcm46IFwiJXNjb3JlbGlzdCVcIixcbiAgICAgICAgICAgICAgICBwcm9jZXNzOiAob2xkOiBzdHJpbmcsIHN0dWQ6IFN0dWRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGl0bGVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7cGF0dGVybjogXCIlc2NvcmU6XCIsXG4gICAgICAgICAgICAgICAgcHJvY2VzczogKG9sZDogc3RyaW5nLCBzdHVkOiBTdHVkZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2xkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7cGF0dGVybjogXCIlZmluYWxzY29yZSVcIixcbiAgICAgICAgICAgICBwcm9jZXNzOiAob2xkOiBzdHJpbmcsIHN0dWQ6IFN0dWRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZmluYWwgPSBncmFkZVNldC5maW5hbFNjb3JlKHN0dWQpO1xuICAgICAgICAgICAgICAgIGxldCBncmEgPSBVdGlsaXRpZXMuZml4VG9QbGFjZXMoZmluYWwpO1xuICAgICAgICAgICAgICAgIGlmICghIGdyYWRlU2V0LmFsbENhdGVnb3JpZXNIYXZlU2NvcmVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZ3JhICs9IFwiIChcIiArIFV0aWxpdGllcy5maXhUb1BsYWNlcyhmaW5hbC9ncmFkZVNldC53ZWlnaHRUb3RhbCgpKSArIFwiJSlcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9sZC5yZXBsYWNlKFwiJWZpbmFsc2NvcmUlXCIsIGdyYSk7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtwYXR0ZXJuOiBcIiVpbWFnZSVcIixcbiAgICAgICAgICAgICBwcm9jZXNzOiAob2xkOiBzdHJpbmcsIHN0dWQ6IFN0dWRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2xkLnJlcGxhY2UoXCIlaW1hZ2UlXCIsIHN0dWQuZGF0YS5nZXQoXCJpbWFnZVwiKSk7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtwYXR0ZXJuOiBcIiVkYXRlJVwiLFxuICAgICAgICAgICAgIHByb2Nlc3M6IChvbGQ6IHN0cmluZywgc3R1ZDogU3R1ZGVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBkdCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi11cycsIHsgeWVhcjpcIm51bWVyaWNcIiwgbW9udGg6XCJzaG9ydFwiLCBkYXk6XCJudW1lcmljXCJ9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2xkLnJlcGxhY2UoXCIlZGF0ZSVcIiwgZHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuXG4gICAgICAgIF1cbiAgICB9XG5cbiAgICBwcm9jZXNzKG1lc3NhZ2U6IHN0cmluZywgc3R1ZGVudDogU3R1ZGVudCk6IHN0cmluZyB7XG5cbiAgICAgICAgaWYgKG1lc3NhZ2UgPT0gdW5kZWZpbmVkKSByZXR1cm4gXCJcIjtcblxuICAgICAgICB0aGlzLnByb2Nlc3NQYXR0ZXJucy5tYXAoIChwYXR0ZXJuKSA9PiB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ2hlY2tpbmcgXCIrcGF0dGVybi5wYXR0ZXJuKTtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbnRhaW5zKHBhdHRlcm4ucGF0dGVybikpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gcGF0dGVybi5wcm9jZXNzKG1lc3NhZ2UsIHN0dWRlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIk1lc3NhZ2UgaXMgbm93IFwiK21lc3NhZ2UpO1xuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9XG5cblxuXG59IiwiLyoqXG4gKiBkcmF3ZG93bi5qc1xuICogKGMpIEFkYW0gTGVnZ2V0dFxuICogaHR0cHM6Ly9naXRodWIuY29tL2FkYW12bGVnZ2V0dC9kcmF3ZG93blxuICovXG5cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcmtkb3duKHNyYykge1xuXG4gICAgdmFyIHJ4X2x0ID0gLzwvZztcbiAgICB2YXIgcnhfZ3QgPSAvPi9nO1xuICAgIHZhciByeF9zcGFjZSA9IC9cXHR8XFxyfFxcdWY4ZmYvZztcbiAgICB2YXIgcnhfZXNjYXBlID0gL1xcXFwoW1xcXFxcXHxgKl97fVxcW1xcXSgpIytcXC1+XSkvZztcbiAgICB2YXIgcnhfaHIgPSAvXihbKlxcLT1fXSAqKXszLH0kL2dtO1xuICAgIHZhciByeF9ibG9ja3F1b3RlID0gL1xcbiAqJmd0OyAqKFteXSo/KSg/PShcXG58JCl7Mn0pL2c7XG4gICAgdmFyIHJ4X2xpc3QgPSAvXFxuKCAqKSg/OlsqXFwtK118KChcXGQrKXwoW2Etel0pfFtBLVpdKVsuKV0pICsoW15dKj8pKD89KFxcbnwkKXsyfSkvZztcbiAgICB2YXIgcnhfbGlzdGpvaW4gPSAvPFxcLyhvbHx1bCk+XFxuXFxuPFxcMT4vZztcbiAgICB2YXIgcnhfaGlnaGxpZ2h0ID0gLyhefFteQS1aYS16XFxkXFxcXF0pKChbKl9dKXwofil8KFxcXil8KC0tKXwoXFwrXFwrKXxgKShcXDI/KShbXjxdKj8pXFwyXFw4KD8hXFwyKSg/PVxcV3xffCQpL2c7XG4gICAgdmFyIHJ4X2NvZGUgPSAvXFxuKChgYGB8fn5+KS4qXFxuPyhbXl0qPylcXG4/XFwyfCgoICAgIC4qP1xcbikrKSkvZztcbiAgICB2YXIgcnhfbGluayA9IC8oKCE/KVxcWyguKj8pXFxdXFwoKC4qPykoIFwiLipcIik/XFwpfFxcXFwoW1xcXFxgKl97fVxcW1xcXSgpIytcXC0uIX5dKSkvZztcbiAgICB2YXIgcnhfdGFibGUgPSAvXFxuKCggKlxcfC4qP1xcfCAqXFxuKSspL2c7XG4gICAgdmFyIHJ4X3RoZWFkID0gL14uKlxcbiggKlxcfCggKlxcOj8tK1xcOj8tK1xcOj8gKlxcfCkqICpcXG58KS87XG4gICAgdmFyIHJ4X3JvdyA9IC8uKlxcbi9nO1xuICAgIHZhciByeF9jZWxsID0gL1xcfHwoLio/W15cXFxcXSlcXHwvZztcbiAgICB2YXIgcnhfaGVhZGluZyA9IC8oPz1efD58XFxuKShbPlxcc10qPykoI3sxLDZ9KSAoLio/KSggIyopPyAqKD89XFxufCQpL2c7XG4gICAgdmFyIHJ4X3BhcmEgPSAvKD89Xnw+fFxcbilcXHMqXFxuKyhbXjxdKz8pXFxuK1xccyooPz1cXG58PHwkKS9nO1xuICAgIHZhciByeF9zdGFzaCA9IC8tXFxkK1xcdWY4ZmYvZztcblxuICAgIGZ1bmN0aW9uIHJlcGxhY2UocmV4LCBmbikge1xuICAgICAgICBzcmMgPSBzcmMucmVwbGFjZShyZXgsIGZuKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbGVtZW50KHRhZywgY29udGVudCkge1xuICAgICAgICByZXR1cm4gJzwnICsgdGFnICsgJz4nICsgY29udGVudCArICc8LycgKyB0YWcgKyAnPic7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYmxvY2txdW90ZShzcmMpIHtcbiAgICAgICAgcmV0dXJuIHNyYy5yZXBsYWNlKHJ4X2Jsb2NrcXVvdGUsIGZ1bmN0aW9uKGFsbCwgY29udGVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQoJ2Jsb2NrcXVvdGUnLCBibG9ja3F1b3RlKGhpZ2hsaWdodChjb250ZW50LnJlcGxhY2UoL14gKiZndDsgKi9nbSwgJycpKSkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0KHNyYykge1xuICAgICAgICByZXR1cm4gc3JjLnJlcGxhY2UocnhfbGlzdCwgZnVuY3Rpb24oYWxsLCBpbmQsIG9sLCBudW0sIGxvdywgY29udGVudCkge1xuICAgICAgICAgICAgdmFyIGVudHJ5ID0gZWxlbWVudCgnbGknLCBoaWdobGlnaHQoY29udGVudC5zcGxpdChcbiAgICAgICAgICAgICAgICBSZWdFeHAoJ1xcbiA/JyArIGluZCArICcoPzooPzpcXFxcZCt8W2EtekEtWl0pWy4pXXxbKlxcXFwtK10pICsnLCAnZycpKS5tYXAobGlzdCkuam9pbignPC9saT48bGk+JykpKTtcblxuICAgICAgICAgICAgcmV0dXJuICdcXG4nICsgKG9sXG4gICAgICAgICAgICAgICAgPyAnPG9sIHN0YXJ0PVwiJyArIChudW1cbiAgICAgICAgICAgICAgICAgICAgPyBvbCArICdcIj4nXG4gICAgICAgICAgICAgICAgICAgIDogcGFyc2VJbnQob2wsMzYpIC0gOSArICdcIiBzdHlsZT1cImxpc3Qtc3R5bGUtdHlwZTonICsgKGxvdyA/ICdsb3cnIDogJ3VwcCcpICsgJ2VyLWFscGhhXCI+JykgKyBlbnRyeSArICc8L29sPidcbiAgICAgICAgICAgICAgICA6IGVsZW1lbnQoJ3VsJywgZW50cnkpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGlnaGxpZ2h0KHNyYykge1xuICAgICAgICByZXR1cm4gc3JjLnJlcGxhY2UocnhfaGlnaGxpZ2h0LCBmdW5jdGlvbihhbGwsIF8sIHAxLCBlbXAsIHN1Yiwgc3VwLCBzbWFsbCwgYmlnLCBwMiwgY29udGVudCkge1xuICAgICAgICAgICAgcmV0dXJuIF8gKyBlbGVtZW50KFxuICAgICAgICAgICAgICAgICAgZW1wID8gKHAyID8gJ3N0cm9uZycgOiAnZW0nKVxuICAgICAgICAgICAgICAgIDogc3ViID8gKHAyID8gJ3MnIDogJ3N1YicpXG4gICAgICAgICAgICAgICAgOiBzdXAgPyAnc3VwJ1xuICAgICAgICAgICAgICAgIDogc21hbGwgPyAnc21hbGwnXG4gICAgICAgICAgICAgICAgOiBiaWcgPyAnYmlnJ1xuICAgICAgICAgICAgICAgIDogJ2NvZGUnLFxuICAgICAgICAgICAgICAgIGhpZ2hsaWdodChjb250ZW50KSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVuZXNjKHN0cikge1xuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UocnhfZXNjYXBlLCAnJDEnKTtcbiAgICB9XG5cbiAgICB2YXIgc3Rhc2ggPSBbXTtcbiAgICB2YXIgc2kgPSAwO1xuXG4gICAgc3JjID0gJ1xcbicgKyBzcmMgKyAnXFxuJztcblxuICAgIHJlcGxhY2UocnhfbHQsICcmbHQ7Jyk7XG4gICAgcmVwbGFjZShyeF9ndCwgJyZndDsnKTtcbiAgICByZXBsYWNlKHJ4X3NwYWNlLCAnICAnKTtcblxuICAgIC8vIGJsb2NrcXVvdGVcbiAgICBzcmMgPSBibG9ja3F1b3RlKHNyYyk7XG5cbiAgICAvLyBob3Jpem9udGFsIHJ1bGVcbiAgICByZXBsYWNlKHJ4X2hyLCAnPGhyLz4nKTtcblxuICAgIC8vIGxpc3RcbiAgICBzcmMgPSBsaXN0KHNyYyk7XG4gICAgcmVwbGFjZShyeF9saXN0am9pbiwgJycpO1xuXG4gICAgLy8gY29kZVxuICAgIHJlcGxhY2UocnhfY29kZSwgZnVuY3Rpb24oYWxsLCBwMSwgcDIsIHAzLCBwNCkge1xuICAgICAgICBzdGFzaFstLXNpXSA9IGVsZW1lbnQoJ3ByZScsIGVsZW1lbnQoJ2NvZGUnLCBwM3x8cDQucmVwbGFjZSgvXiAgICAvZ20sICcnKSkpO1xuICAgICAgICByZXR1cm4gc2kgKyAnXFx1ZjhmZic7XG4gICAgfSk7XG5cbiAgICAvLyBsaW5rIG9yIGltYWdlXG4gICAgcmVwbGFjZShyeF9saW5rLCBmdW5jdGlvbihhbGwsIHAxLCBwMiwgcDMsIHA0LCBwNSwgcDYpIHtcbiAgICAgICAgc3Rhc2hbLS1zaV0gPSBwNFxuICAgICAgICAgICAgPyBwMlxuICAgICAgICAgICAgICAgID8gJzxpbWcgc3JjPVwiJyArIHA0ICsgJ1wiIGFsdD1cIicgKyBwMyArICdcIi8+J1xuICAgICAgICAgICAgICAgIDogJzxhIGhyZWY9XCInICsgcDQgKyAnXCI+JyArIHVuZXNjKGhpZ2hsaWdodChwMykpICsgJzwvYT4nXG4gICAgICAgICAgICA6IHA2O1xuICAgICAgICByZXR1cm4gc2kgKyAnXFx1ZjhmZic7XG4gICAgfSk7XG5cbiAgICAvLyB0YWJsZVxuICAgIHJlcGxhY2UocnhfdGFibGUsIGZ1bmN0aW9uKGFsbCwgdGFibGUpIHtcbiAgICAgICAgdmFyIHNlcCA9IHRhYmxlLm1hdGNoKHJ4X3RoZWFkKVsxXTtcbiAgICAgICAgcmV0dXJuICdcXG4nICsgZWxlbWVudCgndGFibGUnLFxuICAgICAgICAgICAgdGFibGUucmVwbGFjZShyeF9yb3csIGZ1bmN0aW9uKHJvdywgcmkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcm93ID09IHNlcCA/ICcnIDogZWxlbWVudCgndHInLCByb3cucmVwbGFjZShyeF9jZWxsLCBmdW5jdGlvbihhbGwsIGNlbGwsIGNpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjaSA/IGVsZW1lbnQoc2VwICYmICFyaSA/ICd0aCcgOiAndGQnLCB1bmVzYyhoaWdobGlnaHQoY2VsbCB8fCAnJykpKSA6ICcnXG4gICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgfSk7XG5cbiAgICAvLyBoZWFkaW5nXG4gICAgcmVwbGFjZShyeF9oZWFkaW5nLCBmdW5jdGlvbihhbGwsIF8sIHAxLCBwMikgeyByZXR1cm4gXyArIGVsZW1lbnQoJ2gnICsgcDEubGVuZ3RoLCB1bmVzYyhoaWdobGlnaHQocDIpKSkgfSk7XG5cbiAgICAvLyBwYXJhZ3JhcGhcbiAgICByZXBsYWNlKHJ4X3BhcmEsIGZ1bmN0aW9uKGFsbCwgY29udGVudCkgeyByZXR1cm4gZWxlbWVudCgncCcsIHVuZXNjKGhpZ2hsaWdodChjb250ZW50KSkpIH0pO1xuXG4gICAgLy8gc3Rhc2hcbiAgICByZXBsYWNlKHJ4X3N0YXNoLCBmdW5jdGlvbihhbGwpIHsgcmV0dXJuIHN0YXNoW3BhcnNlSW50KGFsbCldIH0pO1xuXG4gICAgcmV0dXJuIHNyYy50cmltKCk7XG59O1xuIiwiaW1wb3J0ICcuL3V0aWxpdGllcy9jb2RlbWlycm9yJ1xyXG5cclxuaW1wb3J0IHsgSXRlbVZpZXcsIE1hcmtkb3duUmVuZGVyZXIsIE1lbnUsIFBsYXRmb3JtLCBURmlsZSwgVGV4dEZpbGVWaWV3LCBWaWV3U3RhdGUsIFdvcmtzcGFjZUxlYWYgfSBmcm9tIFwib2JzaWRpYW5cIjtcclxuXHJcbmltcG9ydCB7IEFsZXJ0IH0gZnJvbSBcInV0aWxpdGllcy9hbGVydFwiO1xyXG5pbXBvcnQgeyBDYXRlZ29yeSB9IGZyb20gXCJkYXRhL0NhdGVnb3J5XCI7XHJcbmltcG9ydCB7IENvdW50ZXIgfSBmcm9tIFwiZGF0YS9Db3VudGVyXCI7XHJcbmltcG9ydCB7IENvdW50ZXJUaWNrIH0gZnJvbSBcIm1vZGFscy9Db3VudGVyVGlja1wiO1xyXG5pbXBvcnQgeyBEaWFsb2cgfSBmcm9tICd1dGlsaXRpZXMvRGlhbG9nJztcclxuaW1wb3J0IHsgRW1haWxlciB9IGZyb20gXCJlbWFpbFwiO1xyXG5pbXBvcnQgeyBFbWFpbGVyTW9kYWwgfSBmcm9tIFwibW9kYWxzL0VtYWlsZXJNb2RhbFwiO1xyXG5pbXBvcnQgeyBHcmFkZVNldCB9IGZyb20gXCJkYXRhL0dyYWRlU2V0XCI7XHJcbmltcG9ydCBHcmFkZWJveFBsdWdpbiBmcm9tIFwibWFpblwiO1xyXG5pbXBvcnQge05vdGVNb2RhbH0gZnJvbSBcIm1vZGFscy9Ob3RlTW9kYWxcIjtcclxuaW1wb3J0IHsgU2NvcmUgfSBmcm9tIFwiZGF0YS9TY29yZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcImRhdGEvU3R1ZGVudFwiO1xyXG5pbXBvcnQgeyBUZW1wbGF0ZSB9IGZyb20gXCJ1dGlsaXRpZXMvVGVtcGxhdGVcIjtcclxuaW1wb3J0ICBVdGlsaXRpZXMgIGZyb20gXCJ1dGlsaXRpZXMvVXRpbGl0aWVzXCI7XHJcbmltcG9ydCB7IG1hcmtkb3duIH0gZnJvbSBcInV0aWxpdGllcy9kcmF3ZG93blwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IFZJRVdfVFlQRV9TVFVERU5UID0gXCJzdHVkZW50LXZpZXdcIjtcclxuZXhwb3J0IGNvbnN0IFBSRVZJRVdfTU9ERSA9IDI7XHJcbmV4cG9ydCBjb25zdCBFRElUSU5HX01PREUgPSAxO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0dWRlbnRWaWV3IGV4dGVuZHMgSXRlbVZpZXcge1xyXG5cclxuICBwbHVnaW46IEdyYWRlYm94UGx1Z2luO1xyXG4gIGdyYWRlU2V0UGF0aDogc3RyaW5nO1xyXG4gIGdyYWRlU2V0RmlsZTogVEZpbGU7XHJcbiAgZnJvbnRtYXR0ZXIgOiBzdHJpbmc7XHJcbiAgZ3JhZGVTZXREYXRhOiBzdHJpbmc7XHJcbiAgZ3JhZGVTZXQ6IEdyYWRlU2V0O1xyXG4gIHN0dWRlbnQ6IFN0dWRlbnQ7XHJcbiAgY29udGFpbmVyOiBFbGVtZW50O1xyXG5cclxuICBzdGF0dXNiYXJFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICBwcmV2aWV3RWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgZWRpdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gIHNhdmVFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgLy8gaW50ZXJuYWwgY29kZSBtaXJyb3IgaW5zdGFuY2VcclxuICBjb2RlTWlycm9yOiBDb2RlTWlycm9yLkVkaXRvcjtcclxuXHJcbiAgbW9kZTogbnVtYmVyO1xyXG4gIHN0dWRlbnREYXRhOiBzdHJpbmc7XHJcbiAgZGF0YUNoYW5nZWQ6IGJvb2xlYW47XHJcblxyXG4gIHdoYXRpZm1vZGU6IGJvb2xlYW47XHJcblxyXG4gICAgLy8gdGhpcy5jb250ZW50RWwgaXMgbm90IGV4cG9zZWQsIHNvIGNoZWF0IGEgYml0LlxyXG4gICAgcHVibGljIGdldCBleHRDb250ZW50RWwoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgIHJldHVybiB0aGlzLmNvbnRlbnRFbDtcclxuICAgIH0gIFxyXG5cclxuICBjb25zdHJ1Y3RvcihsZWFmOiBXb3Jrc3BhY2VMZWFmLCBwbHVnaW46IEdyYWRlYm94UGx1Z2luLCBncmFkZVNldDogR3JhZGVTZXQpIHtcclxuICAgIHN1cGVyKGxlYWYpO1xyXG5cclxuICAgIHRoaXMubmF2aWdhdGlvbiA9IHRydWU7XHJcbiAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcclxuICAgIHRoaXMuZ3JhZGVTZXQgPSBncmFkZVNldDtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGNvZGUgbWlycm9yIGluc3RhbmNlXHJcbiAgICAgICAgdGhpcy5jb2RlTWlycm9yID0gQ29kZU1pcnJvcih0aGlzLmV4dENvbnRlbnRFbCwge1xyXG4gICAgICAgICAgdGhlbWU6IFwib2JzaWRpYW5cIlxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIHJlZ2lzdGVyIHRoZSBjaGFuZ2VzIGV2ZW50XHJcbiAgICAgICAgLy90aGlzLmNvZGVNaXJyb3Iub24oJ2NoYW5nZScsIHRoaXMuY2hhbmdlZCk7XHJcbiAgICAgIFxyXG4gICAgdGhpcy5tb2RlID0gRURJVElOR19NT0RFO1xyXG4gICAgdGhpcy5kYXRhQ2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy53aGF0aWZtb2RlID0gZmFsc2U7XHJcblxyXG4gIH1cclxuXHJcbiAgZ2V0Vmlld1R5cGUoKSB7XHJcbiAgICByZXR1cm4gVklFV19UWVBFX1NUVURFTlQ7XHJcbiAgfVxyXG5cclxuICBnZXREaXNwbGF5VGV4dCgpIHtcclxuICAgIHJldHVybiB0aGlzLnN0dWRlbnQ9PXVuZGVmaW5lZD9cIlwiOnRoaXMuc3R1ZGVudC5kYXRhLmdldChcIm5hbWVcIik7XHJcbiAgfVxyXG5cclxuICBhc3luYyBvbk9wZW4oKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIlN0dWRlbnRWaWV3IG9uT3BlblwiKTtcclxuICAgIHRoaXMuZ3JhZGVTZXQgPSB0aGlzLnBsdWdpbi5ncmFkZVNldDtcclxuICAgIHRoaXMuc3R1ZGVudCA9IHRoaXMucGx1Z2luLmN1cnJlbnRTdHVkZW50O1xyXG4gICAgY29uc29sZS5sb2codGhpcy5zdHVkZW50Lm5vdGVEYXRhKTtcclxuICAgIHRoaXMuc3R1ZGVudERhdGEgPSB0aGlzLnN0dWRlbnQubm90ZURhdGE7IC8vYXdhaXQgdGhpcy5hcHAudmF1bHQucmVhZCh0aGlzLnN0dWRlbnQuc291cmNlRmlsZSk7XHJcbiAgICB0aGlzLmNvZGVNaXJyb3Iuc2V0VmFsdWUodGhpcy5zdHVkZW50RGF0YSk7XHJcbiAgICBjb25zb2xlLmxvZyhcIlN0dWRlbnRWaWV3IGRhdGE6IFwiK3RoaXMuc3R1ZGVudERhdGEpO1xyXG5cclxuICAgIHRoaXMucHJldmlld0VsZW1lbnQgPSB0aGlzLmFkZEFjdGlvbihcImx1Y2lkZS1ib29rLW9wZW5cIiwgXCJwcmV2aWV3XCIsICgpID0+IHtcclxuICAgICAgdGhpcy5zZXRQcmV2aWV3TW9kZSgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmVkaXRFbGVtZW50ID0gdGhpcy5hZGRBY3Rpb24oXCJsdWNpZGUtZWRpdC0zXCIsIFwiZWRpdFwiLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0RWRpdGluZ01vZGUoKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5hZGRBY3Rpb24oXCJmaWxlLXRleHRcIiwgXCJhZGQgbm90ZVwiLCAoKSA9PiB7XHJcbiAgICAgIG5ldyBOb3RlTW9kYWwodGhpcy5hcHAsIHRoaXMuc3R1ZGVudC5ub3RlcywgKG5vdGU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHRoaXMuc3R1ZGVudC5zZXROb3Rlcyhub3RlKTtcclxuICAgICAgICB0aGlzLnN0dWRlbnREYXRhID0gdGhpcy5zdHVkZW50RGF0YS5yZXBsYWNlKC8jbm90ZS4qL2csIFwiXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3R1ZGVudERhdGEpO1xyXG4gICAgICAgIHZhciBub3Rlc0FycmF5ID0gbm90ZS5zcGxpdChcIlxcblwiKTtcclxuICAgICAgICBub3Rlc0FycmF5LmZvckVhY2goIChudGUpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLnN0dWRlbnREYXRhICs9IFwiI25vdGUgXCIrbnRlK1wiXFxuXCI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy90aGlzLnN0dWRlbnREYXRhICs9IFwiI25vdGUgXCIrbm90ZStcIlxcblwiO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3R1ZGVudERhdGEpO1xyXG4gICAgICAgIHRoaXMucGx1Z2luLmdyYWRlU2V0Lm1vZGlmaWVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmRhdGFDaGFuZ2VkID0gdHJ1ZTsgIFxyXG4gICAgICAgIHRoaXMucmVkaXNwbGF5KCk7XHJcbiAgICAgIH0pLm9wZW4oKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKG5ldyBFbWFpbGVyKCkuZW1haWxXb3Jrcykge1xyXG4gICAgdGhpcy5hZGRBY3Rpb24oXCJsdWNpZGUtbWFpbFwiLCBcImVtYWlsXCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuc3R1ZGVudC5kYXRhLmdldChcImVtYWlsYWRkcmVzc1wiKSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBuZXcgQWxlcnQodGhpcy5wbHVnaW4sIFwiTm8gQWRkcmVzc1wiLCBcIlRoZXJlIGlzIG5vIGVtYWlsIGFkZHJlc3MgZGVmaW5lZCBmb3IgdGhpcyBzdHVkZW50LlwiKS5vcGVuKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBmaWVsZHMgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncztcclxuICAgICAgICBmaWVsZHMuZGVmYXVsdHRvID0gdGhpcy5zdHVkZW50LmRhdGEuZ2V0KFwiZW1haWxhZGRyZXNzXCIpO1xyXG4gICAgICAgIG5ldyBFbWFpbGVyTW9kYWwodGhpcy5hcHAsIGZpZWxkcywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChtZXNzYWdlOiBzdHJpbmcsIGZyb206IHN0cmluZywgYWRkcmVzczogc3RyaW5nLCBzdWJqZWN0OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEVtYWlsZXIoKS5zZW5kbWFpbCh0aGlzLnN0dWRlbnQuZGF0YS5nZXQoXCJlbWFpbGFkZHJlc3NcIiksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tLCBzdWJqZWN0LCBtZXNzYWdlLCB0aGlzLnBsdWdpbi5zZXR0aW5ncywgY29uc29sZS5sb2cpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgKS5vcGVuKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICAgIGlmICh0aGlzLmdyYWRlU2V0LmNvdW50ZXJzLmxlbmd0aCA+IDApIFxyXG4gICAgICB0aGlzLmFkZEFjdGlvbihcImx1Y2lkZS1jYWxjdWxhdG9yXCIsIFwiY291bnRlcnNcIiwgKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmdyYWRlU2V0LmNvdW50ZXJzLmxlbmd0aD09MCkge1xyXG4gICAgICAgICAgbmV3IEFsZXJ0KHRoaXMucGx1Z2luLCBcIk5vIENvdW50ZXJzXCIsIFwiVGhlcmUgYXJlIG5vIGNvdW50ZXJzIGRlZmluZWQgaW4gdGhpcyBncmFkZSBzZXQuXCIpLm9wZW4oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmV3IENvdW50ZXJUaWNrKHRoaXMucGx1Z2luLmFwcCwgdGhpcy5zdHVkZW50LCAoY291bnRlcjogQ291bnRlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN0dWRlbnQudXBkYXRlQ291bnRlcihjb3VudGVyKTtcclxuICAgICAgICAgICAgdGhpcy5ncmFkZVNldC5tb2RpZmllZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucmVkaXNwbGF5KCk7XHJcbiAgICAgICAgICB9KS5vcGVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIHRoaXMuYWRkQWN0aW9uKFwibHVjaWRlLWJlZFwiLCBcIm5ldyBhYnNlbmNlXCIsICgpID0+IHtcclxuICAgICAgdmFyIHRvZGF5ID0gbmV3IERhdGUoKTtcclxuICAgICAgdmFyIGRkID0gdG9kYXkuZ2V0RGF0ZSgpO1xyXG4gICAgICB2YXIgbW0gPSB0b2RheS5nZXRNb250aCgpKzE7IFxyXG4gICAgICB2YXIgeXl5eSA9IHRvZGF5LmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgIFxyXG4gICAgICB0aGlzLnN0dWRlbnREYXRhICs9IFwiXFxuI2Fic2VuY2UgXCIrbW0rXCIvXCIrZGQrXCIvXCIreXl5eTtcclxuICAgICAgdGhpcy5zZXRWaWV3RGF0YSh0aGlzLnN0dWRlbnREYXRhLCB0cnVlKTtcclxuICAgICAgdGhpcy5zdHVkZW50LmNvbmZpZ3VyZUZyb21EYXRhKHRoaXMuc3R1ZGVudERhdGEpO1xyXG4gICAgICB0aGlzLnBsdWdpbi5ncmFkZVNldC5tb2RpZmllZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuZGF0YUNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLnJlZGlzcGxheSgpO1xyXG4gICAgICAvL25ldyBBbGVydCh0aGlzLnBsdWdpbiwgXCJBYnNlbmNlIEFkZGVkXCIsIFwiQW4gYWJzZW5jZSBoYXMgYmVlbiBhZGRlZCB0byB0aGlzIHN0dWRlbnQuXCIpLm9wZW4oKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICB0aGlzLm1vZGUgPSBFRElUSU5HX01PREU7ICAvLyBmb3JjZSB2aWV3IHRvIGdlbmVyYXRlIHByZXZpZXcgZmlyc3RcclxuICAgIHRoaXMuZGF0YUNoYW5nZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuc2V0UHJldmlld01vZGUoKTtcclxuICB9XHJcblxyXG4gIG9uUGFuZU1lbnUobWVudTogTWVudSwgc291cmNlOiBzdHJpbmcsIGNhbGxTdXBlcjogYm9vbGVhbiA9IHRydWUpIHtcclxuXHRcdGlmIChzb3VyY2UgIT09ICdtb3JlLW9wdGlvbnMnKSB7XHJcblx0XHQgIHN1cGVyLm9uUGFuZU1lbnUobWVudSwgc291cmNlKTtcclxuXHRcdCAgcmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEFkZCBhIG1lbnUgaXRlbSB0byBmb3JjZSB0aGUgYm9hcmQgdG8gbWFya2Rvd24gdmlld1xyXG4gICAgaWYgKG5ldyBFbWFpbGVyKCkuZW1haWxXb3Jrcykge1xyXG4gICAgICBtZW51XHJcbiAgICAuYWRkSXRlbSgoaXRlbSkgPT4ge1xyXG4gICAgaXRlbVxyXG4gICAgICAuc2V0VGl0bGUoJ0VtYWlsIHN0dWRlbnQgc2NvcmVzJylcclxuICAgICAgLnNldEljb24oJ2x1Y2lkZS1maWxlLXRleHQnKVxyXG4gICAgICAuc2V0U2VjdGlvbigncGFuZScpXHJcbiAgICAgIC5vbkNsaWNrKCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAvLyAvLyBIZXJlIHdlIGVtYWlsIHRoZSBzdHVkZW50IG5vdGVcclxuICAgICAgICAgIC8vICAgbGV0IGVtYWlsID0gbmV3IEVtYWlsZXIoKTtcclxuICAgICAgICAgIC8vICAgbGV0IHN0dWRlbnROb3RlID0gdGhpcy5zdHVkZW50LmdlbmVyYXRlTWFya2Rvd24odGhpcy5ncmFkZVNldCk7XHJcbiAgICAgICAgICAvLyAgIGxldCBlbWFpbERpdiA9IHRoaXMuY29udGFpbmVyLmNyZWF0ZURpdigpO1xyXG4gICAgICAgICAgLy8gICBNYXJrZG93blJlbmRlcmVyLnJlbmRlck1hcmtkb3duKHN0dWRlbnROb3RlLCBlbWFpbERpdiwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAvLyAgIGxldCBodG1sID0gZW1haWxEaXYuaW5uZXJIVE1MO1xyXG4gICAgICAgICAgLy8gICBlbWFpbC5zZXRNZXNzYWdlSFRNTChodG1sKTsgXHJcbiAgICAgICAgICAvLyAgIGVtYWlsRGl2LmVtcHR5KCk7IGVtYWlsRGl2LmRldGFjaCgpO1xyXG4gICAgICAgICAgLy8gICBsZXQgc3ViamVjdCA9IFwiU2NvcmVzIGluIFwiK3RoaXMuZ3JhZGVTZXQudGl0bGUrXCIgYXMgb2YgXCIrRGF0ZSgpOyAgICAgICAgICAgXHJcbiAgICAgICAgICAvLyAgIGVtYWlsLnNlbmRtYWlsKHRoaXMuc3R1ZGVudC5kYXRhLmdldChcImVtYWlsYWRkcmVzc1wiKSwgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZnJvbSwgc3ViamVjdCwgXCJcIiwgdGhpcy5wbHVnaW4uc2V0dGluZ3MsIGNvbnNvbGUubG9nKTtcclxuICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IHRoaXMucGx1Z2luLnNldHRpbmdzLnRlbXBsYXRlO1xyXG4gICAgICAgICAgaWYgKHRlbXBsYXRlICE9PSB1bmRlZmluZWQgJiYgdGVtcGxhdGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gdGVtcGxhdGUuaW5kZXhPZih0aGlzLmFwcC52YXVsdC5hZGFwdGVyLmJhc2VQYXRoKTtcclxuICAgICAgICAgICAgaWYgKHBvcyA+PSAwKSB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UodGhpcy5hcHAudmF1bHQuYWRhcHRlci5iYXNlUGF0aCtcIlxcXFxcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZSgvXFxcXC9nLCBcIi9cIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRlbXBsYXRlKTtcclxuICAgICAgICAgICAgbGV0IHRmaWxlID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKHRlbXBsYXRlKSBhcyBURmlsZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGZpbGUpO1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA9ICBhd2FpdCBhcHAudmF1bHQucmVhZCggdGZpbGUgKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlID0gXCJcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIC8vIEhlcmUgd2UgZW1haWwgdGhlIHN0dWRlbnQgbm90ZVxyXG4gICAgICAgICAgICBsZXQgZW1haWwgPSBuZXcgRW1haWxlcigpO1xyXG4gICAgICAgICAgICBsZXQgc3R1ZGVudE5vdGUgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZiAodGVtcGxhdGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgIHN0dWRlbnROb3RlID0gKG5ldyBUZW1wbGF0ZSh0aGlzLmdyYWRlU2V0KSkucHJvY2Vzcyh0ZW1wbGF0ZSwgdGhpcy5zdHVkZW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBzdHVkZW50Tm90ZSA9IHRoaXMuc3R1ZGVudC5nZW5lcmF0ZU1hcmtkb3duKHRoaXMuZ3JhZGVTZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0dWRlbnROb3RlKTtcclxuICAgICAgICAgICAgbGV0IGh0bWwgPSBtYXJrZG93bihzdHVkZW50Tm90ZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGh0bWwpO1xyXG4gICAgICAgICAgICBlbWFpbC5zZXRNZXNzYWdlSFRNTChodG1sKTsgXHJcbiAgICAgICAgICAgIGxldCBkdCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi11cycsIHsgeWVhcjpcIm51bWVyaWNcIiwgbW9udGg6XCJzaG9ydFwiLCBkYXk6XCJudW1lcmljXCJ9KTtcclxuICAgICAgICAgICAgbGV0IHN1YmplY3QgPSBcIllvdXIgc2NvcmVzIGluIFwiK3RoaXMuZ3JhZGVTZXQucHJvcGVydGllcy5nZXQoXCJ0aXRsZVwiKStcIiBhcyBvZiBcIitkdDsgICAgICAgICAgIFxyXG4gICAgICAgICAgICBlbWFpbC5zZW5kbWFpbCh0aGlzLnN0dWRlbnQuZGF0YS5nZXQoXCJlbWFpbGFkZHJlc3NcIiksIHRoaXMucGx1Z2luLnNldHRpbmdzLmZyb20sIHN1YmplY3QsIFwiXCIsIHRoaXMucGx1Z2luLnNldHRpbmdzLCBjb25zb2xlLmxvZyk7XHJcbiAgICAgICAgICBcclxuICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAgIG1lbnVcclxuICAgIC5hZGRJdGVtKChpdGVtKSA9PiB7XHJcbiAgICBpdGVtXHJcbiAgICAgIC5zZXRUaXRsZSgnRGVsZXRlIHN0dWRlbnQnKVxyXG4gICAgICAuc2V0SWNvbignZmlsZS14JylcclxuICAgICAgLnNldFNlY3Rpb24oJ3BhbmUnKVxyXG4gICAgICAub25DbGljayggKCkgPT4ge1xyXG4gICAgICAgICAgbmV3IERpYWxvZyh0aGlzLnBsdWdpbiwgXCJEZWxldGUgU3R1ZGVudFwiLCBcIlR5cGUgREVMRVRFIGlmIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIHN0dWRlbnQuXCIsIFwiRGVsZXRlXCIsIFwiQ2FuY2VsXCIsIChzdHI6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3RyID09IFwiREVMRVRFXCIpIHtcclxuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5ncmFkZVNldC5kZWxldGVTdHVkZW50KHRoaXMuc3R1ZGVudCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uZ3JhZGVTZXQubW9kaWZpZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIC8vIGNoYW5nZSB0aGUgZmlsZSBuYW1lXHJcbiAgICAgICAgICAgICAgbGV0IG5ld05hbWUgPSB0aGlzLnN0dWRlbnQuc291cmNlRmlsZS5wYXRoLnJlcGxhY2UoXCIubWRcIiwgXCIuZGVsXCIpO1xyXG4gICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5hcHAudmF1bHQucmVuYW1lKHRoaXMuc3R1ZGVudC5zb3VyY2VGaWxlLCBuZXdOYW1lKTtcclxuICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmlsZSA9IG5ldyBURmlsZSgpO1xyXG4gICAgICAgICAgICAgICAgZmlsZS5wYXRoID0gbmV3TmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLmFwcC52YXVsdC5kZWxldGUoZmlsZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5hcHAudmF1bHQucmVuYW1lKHRoaXMuc3R1ZGVudC5zb3VyY2VGaWxlLCBuZXdOYW1lKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgLy9jbG9zZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KS5vcGVuKCk7XHJcbiAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIG1lbnVcclxuICAgIC5hZGRJdGVtKChpdGVtKSA9PiB7XHJcbiAgICBpdGVtXHJcbiAgICAgIC5zZXRUaXRsZSgnV2hhdCBpZiBtb2RlJylcclxuICAgICAgLnNldEljb24oJ3NoaWVsZC1xdWVzdGlvbicpXHJcbiAgICAgIC5zZXRTZWN0aW9uKCdwYW5lJylcclxuICAgICAgLm9uQ2xpY2soICgpID0+IHtcclxuICAgICAgICB0aGlzLndoYXRpZm1vZGUgPSAhdGhpcy53aGF0aWZtb2RlO1xyXG4gICAgICAgIHRoaXMucmVkaXNwbGF5KCk7IFxyXG4gICAgICB9KTtcclxuICAgIH0pOyAgICAgICAgICAgICAgXHJcblxyXG4gICAgLy8gQWRkIGEgXCJDbG9zZVwiIGlmIHdlIGFyZSBvbiBhIG1vYmlsZSBkZXZpY2VcclxuICAgIGlmIChQbGF0Zm9ybS5pc01vYmlsZSkge1xyXG4gICAgICBtZW51XHJcbiAgICAgICAgLmFkZEl0ZW0oKGl0ZW0pID0+IHtcclxuICAgICAgICAgIGl0ZW1cclxuICAgICAgICAgICAgLnNldFRpdGxlKCdDbG9zZScpXHJcbiAgICAgICAgICAgIC5zZXRJY29uKCdjcm9zcycpXHJcbiAgICAgICAgICAgIC5vbkNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVkaXNwbGF5KCkge1xyXG4gICAgaWYgKHRoaXMubW9kZSA9PSBQUkVWSUVXX01PREUpIHtcclxuICAgICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmNvbnRhaW5lckVsLmNoaWxkcmVuWzFdO1xyXG4gICAgICB0aGlzLmNvbnRhaW5lci5lbXB0eSgpO1xyXG4gICAgICBjb25zdCBkaXYgPSB0aGlzLmNvbnRhaW5lci5jcmVhdGVFbChcImRpdlwiLCB7IGNsczogXCJ2aWV3LXN0eWxlXCIgfSk7XHJcbiAgICAgIGxldCBzdHVkZW50Tm90ZSA9IHRoaXMuc3R1ZGVudC5nZW5lcmF0ZU1hcmtkb3duKHRoaXMuZ3JhZGVTZXQpO1xyXG4gICAgICBsZXQgbWFya2Rvd24gPSBNYXJrZG93blJlbmRlcmVyLnJlbmRlcih0aGlzLmFwcCwgc3R1ZGVudE5vdGUsIGRpdiwgbnVsbCwgbnVsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvZGVNaXJyb3Iuc2V0VmFsdWUodGhpcy5zdHVkZW50RGF0YSk7XHJcbiAgICB9ICBcclxuICB9XHJcblxyXG4gIHNldFByZXZpZXdNb2RlKCkge1xyXG4gICAgaWYgKHRoaXMubW9kZSA9PSBQUkVWSUVXX01PREUpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLm1vZGUgPSBQUkVWSUVXX01PREU7XHJcblxyXG4gICAgdGhpcy5zdHVkZW50RGF0YSA9IHRoaXMuY29kZU1pcnJvci5nZXRWYWx1ZSgpO1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLnN0dWRlbnQgPT0gJ3VuZGVmaW5lZCcpIHRoaXMuc3R1ZGVudCA9IG5ldyBTdHVkZW50KG51bGwpO1xyXG4gICAgdGhpcy5zdHVkZW50LmNvbmZpZ3VyZUZyb21EYXRhKHRoaXMuc3R1ZGVudERhdGEpO1xyXG5cclxuICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy5jb250YWluZXJFbC5jaGlsZHJlblsxXTtcclxuICAgIHRoaXMuY29udGFpbmVyLmVtcHR5KCk7XHJcbiAgICBjb25zdCBkaXYgPSB0aGlzLmNvbnRhaW5lci5jcmVhdGVFbChcImRpdlwiLCB7IGNsczogXCJ2aWV3LXN0eWxlXCIgfSk7XHJcbiAgICBsZXQgc3R1ZGVudE5vdGUgPSB0aGlzLnN0dWRlbnQuZ2VuZXJhdGVNYXJrZG93bih0aGlzLmdyYWRlU2V0KTtcclxuICAgIGxldCBtYXJrZG93biA9IE1hcmtkb3duUmVuZGVyZXIucmVuZGVyKHRoaXMuYXBwLCBzdHVkZW50Tm90ZSwgZGl2LCBudWxsLCBudWxsKTtcclxuXHJcbiAgICB0aGlzLmVkaXRFbGVtZW50LnNob3coKTtcclxuICAgIHRoaXMucHJldmlld0VsZW1lbnQuaGlkZSgpO1xyXG5cclxuICB9XHJcblxyXG4gIGFzeW5jIHNldEVkaXRpbmdNb2RlKCkge1xyXG4gICAgaWYgKHRoaXMubW9kZSA9PSBFRElUSU5HX01PREUpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLm1vZGUgPSBFRElUSU5HX01PREU7XHJcblxyXG4gICAgdGhpcy5jb250YWluZXIuZW1wdHkoKTtcclxuICAgIHRoaXMuY29kZU1pcnJvciA9IENvZGVNaXJyb3IodGhpcy5leHRDb250ZW50RWwsIHtcclxuICAgICAgdGhlbWU6IFwib2JzaWRpYW5cIlxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNvZGVNaXJyb3Iub24oJ2NoYW5nZScsIChpbnN0YW5jZTogQ29kZU1pcnJvci5FZGl0b3IpID0+IHtcclxuICAgICAgdGhpcy5kYXRhQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuc3R1ZGVudERhdGEgPSB0aGlzLmdldFZpZXdEYXRhKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnNldFZpZXdEYXRhKHRoaXMuc3R1ZGVudERhdGEsIHRydWUpO1xyXG4gICAgdGhpcy5wbHVnaW4uZ3JhZGVTZXQubW9kaWZpZWQgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuZWRpdEVsZW1lbnQuaGlkZSgpO1xyXG4gICAgdGhpcy5wcmV2aWV3RWxlbWVudC5zaG93KCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBvbkNsb3NlKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJTdHVkZW50VmlldyBDbG9zaW5nXCIpO1xyXG4gICAgY29uc29sZS5sb2codGhpcy53aGF0aWZtb2RlKTtcclxuICAgIGlmICh0aGlzLmRhdGFDaGFuZ2VkICYmICF0aGlzLndoYXRpZm1vZGUpIHtcclxuICAgICAgaWYgKHRoaXMubW9kZSA9PSBFRElUSU5HX01PREUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlN0dWRlbnRWaWV3IERhdGEgQ2hhbmdlZFwiKTtcclxuICAgICAgICAvL3RoaXMuc3R1ZGVudERhdGEgPSB0aGlzLmdldFZpZXdEYXRhKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zdHVkZW50RGF0YSk7XHJcbiAgICAgICAgdGhpcy5zdHVkZW50LmNvbmZpZ3VyZUZyb21EYXRhKHRoaXMuc3R1ZGVudERhdGEpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZ3JhZGVTZXQud3JpdGVHcmFkZVNldCgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hcHAud29ya3NwYWNlLmRldGFjaExlYXZlc09mVHlwZShWSUVXX1RZUEVfU1RVREVOVCk7XHJcbiAgICB0aGlzLnBsdWdpbi5ncmFkZUJveFZpZXcuZGlzcGxheSgpXHJcbiAgfVxyXG5cclxuICBzZXRWaWV3U3RhdGUodmlld3N0YXRlOiBWaWV3U3RhdGUsIGRhdGE/OiBhbnkpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiU1RVREVOVFZJRVcgU2V0Vmlld3N0YXRlXCIpO1xyXG4gICAgY29uc29sZS5sb2codmlld3N0YXRlKTtcclxuICB9XHJcblxyXG4gICAgLy8gd2hlbiB0aGUgdmlldyBpcyByZXNpemVkLCByZWZyZXNoIENvZGVNaXJyb3IgKHRoYW5rcyBMaWNhdCEpXHJcbiAgICBvblJlc2l6ZSgpIHtcclxuICAgICAgdGhpcy5jb2RlTWlycm9yLnJlZnJlc2goKTtcclxuICAgIH1cclxuICBcclxuICAgIC8vIGNhbGxlZCBvbiBjb2RlIG1pcnJvciBjaGFuZ2VzXHJcbiAgICBjaGFuZ2VkKGluc3RhbmNlOiBDb2RlTWlycm9yLkVkaXRvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkRBVEEgQ0hBTkdFRFwiKTtcclxuICAgICAgdGhpcy5kYXRhQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuc3R1ZGVudERhdGEgPSB0aGlzLmdldFZpZXdEYXRhKCk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBnZXQgdGhlIG5ldyBmaWxlIGNvbnRlbnRzXHJcbiAgICBnZXRWaWV3RGF0YSA9ICgpID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29kZU1pcnJvci5nZXRWYWx1ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNldCB0aGUgZmlsZSBjb250ZW50c1xyXG4gICAgc2V0Vmlld0RhdGEgPSAoZGF0YTogc3RyaW5nLCBjbGVhcjogYm9vbGVhbikgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlNFVFZJRVdEQVRBXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgaWYgKGNsZWFyKSB7XHJcbiAgICAgICAgdGhpcy5jb2RlTWlycm9yLnN3YXBEb2MoQ29kZU1pcnJvci5Eb2MoZGF0YSwgXCJ0ZXh0L3gtZ3JkXCIpKVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMuY29kZU1pcnJvci5zZXRWYWx1ZShkYXRhKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnN0dWRlbnREYXRhID0gZGF0YTtcclxuICAgIH1cclxuICBcclxuICAgIC8vIGNsZWFyIHRoZSB2aWV3IGNvbnRlbnRcclxuICAgIGNsZWFyID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLmNvZGVNaXJyb3Iuc2V0VmFsdWUoJycpO1xyXG4gICAgICB0aGlzLmNvZGVNaXJyb3IuY2xlYXJIaXN0b3J5KCk7XHJcbiAgICB9XHJcbiAgXHJcbn0iLCJpbXBvcnQgeyBBcHAsIERyb3Bkb3duQ29tcG9uZW50LCBNb2RhbCwgU2V0dGluZywgVEZpbGUsIFRleHRGaWxlVmlldywgVG9nZ2xlQ29tcG9uZW50LCBXb3Jrc3BhY2VMZWFmIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5cbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSBcImRhdGEvQ2F0ZWdvcnlcIjtcbmltcG9ydCB7IEdyYWRlU2V0IH0gZnJvbSBcImRhdGEvR3JhZGVTZXRcIjtcbmltcG9ydCB7IFNjb3JlIH0gZnJvbSBcImRhdGEvU2NvcmVcIjtcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiZGF0YS9TdHVkZW50XCI7XG5cbmV4cG9ydCBjbGFzcyBBZGRBYnNlbmNlTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG5cbiAgICBjYWxsYmFja09uQ2xvc2U7XG4gICAgZ3JhZGVTZXQ6IEdyYWRlU2V0O1xuICAgIGFic2VuY2VzOiBEYXRlW107XG4gICAgZmllbGRzOiBUb2dnbGVDb21wb25lbnRbXTtcbiAgICBwcmVzZW50OiBUb2dnbGVDb21wb25lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgZ3JhZGVTZXQ6IEdyYWRlU2V0LCBjYWxsYmFja09uQ2xvc2U6IChhYnNlbmNlczogRGF0ZVtdKSA9PiB2b2lkKSB7XG5cdFx0c3VwZXIoYXBwKTtcblx0XHR0aGlzLmdyYWRlU2V0ID0gZ3JhZGVTZXQ7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tPbkNsb3NlID0gY2FsbGJhY2tPbkNsb3NlO1xuXG4gICAgICAgIHRoaXMuYWJzZW5jZXMgPSBbXTtcbiAgICAgICAgdGhpcy5maWVsZHMgPSBbXTtcblx0fVxuXG5cdG9uT3BlbigpIHtcblx0XHRsZXQge2NvbnRlbnRFbH0gPSB0aGlzO1xuXHRcdFxuXHRcdGNvbnRlbnRFbC5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogJ05ldyBBYnNlbmNlJyB9KTtcbiAgICAgICAgbGV0IHByZXNlbnRTZXR0aW5nID0gbmV3IFNldHRpbmcoY29udGVudEVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJDb3VudCBwcmVzZW50XCIpXG4gICAgICAgICAgICAuYWRkVG9nZ2xlKCAodG9nZ2xlKSA9PiB7XG4gICAgICAgICAgICAgIHRvZ2dsZVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZShmYWxzZSlcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZWxkcy5mb3JFYWNoKCAodG9nZ2xlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGUuc2V0VmFsdWUoIXRvZ2dsZS5nZXRWYWx1ZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVzZW50ID0gdG9nZ2xlO1xuICAgICAgICB9KTtcbiAgICAgICAgcHJlc2VudFNldHRpbmcubmFtZUVsLnN0eWxlLmZvbnRXZWlnaHQgPSBcImJvbGRcIjtcbiAgICAgICAgcHJlc2VudFNldHRpbmcubmFtZUVsLnN0eWxlLmZvbnRTdHlsZSA9IFwiaXRhbGljXCI7XG5cbiAgICAgICAgdGhpcy5ncmFkZVNldC5zdHVkZW50cy5mb3JFYWNoKCAoc3R1ZDogU3R1ZGVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IGRvY2ZyYWdtZW50ID0gKHN0dWQuZGF0YS5nZXQoXCJpbWFnZVwiKSAhPT0gdW5kZWZpbmVkKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiPGltZyBzcmM9XCIrc3R1ZC5kYXRhLmdldChcImltYWdlXCIpK1wiIHdpZHRoPTQwPiBcIitzdHVkLmRhdGEuZ2V0KFwibmFtZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogc3R1ZC5kYXRhLmdldChcIm5hbWVcIik7XG5cdFx0XHRsZXQgc2V0dGluZyA9IG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcblx0XHRcdC5zZXROYW1lKFwiTkFNRVwiKVxuXHRcdFx0LmFkZFRvZ2dsZSggKHRvZ2dsZSkgPT4ge1xuXHRcdFx0ICBcdHRvZ2dsZVxuXHRcdFx0ICBcdFx0LnNldFZhbHVlKGZhbHNlKVxuXHRcdFx0XHRcdC5vbkNoYW5nZSggKHZhbHVlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cdFx0XHRcdHRoaXMuZmllbGRzLnB1c2godG9nZ2xlKTtcblx0XHRcdH1cblx0XHRcdCk7XG4gICAgICAgICAgICBzZXR0aW5nLm5hbWVFbC5pbm5lckhUTUwgPSBkb2NmcmFnbWVudDtcbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcbiAgICAgICAgLmFkZEJ1dHRvbigoYnRuKSA9PlxuICAgICAgICAgICAgYnRuXG4gICAgICAgICAgICAuc2V0QnV0dG9uVGV4dChcIk9LXCIpXG4gICAgICAgICAgICAuc2V0Q3RhKClcbiAgICAgICAgICAgIC5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZmllbGRzLmZvckVhY2goICh0b2dnbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucHJlc2VudC5nZXRWYWx1ZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9nZ2xlLmdldFZhbHVlKCkpIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWJzZW5jZXMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWJzZW5jZXMucHVzaChub3cpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRvZ2dsZS5nZXRWYWx1ZSgpKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFic2VuY2VzLnB1c2gobm93KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFic2VuY2VzLnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tPbkNsb3NlKHRoaXMuYWJzZW5jZXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKSk7XG5cbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBBcHAsIERyb3Bkb3duQ29tcG9uZW50LCBNb2RhbCwgU2V0dGluZywgVEZpbGUsIFRleHRDb21wb25lbnQsIFRleHRGaWxlVmlldywgV29ya3NwYWNlTGVhZiB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5pbXBvcnQgeyBDYXRlZ29yeSB9IGZyb20gXCJkYXRhL0NhdGVnb3J5XCI7XG5pbXBvcnQgeyBHcmFkZVNldCB9IGZyb20gXCJkYXRhL0dyYWRlU2V0XCI7XG5pbXBvcnQgR3JhZGVib3hQbHVnaW4gZnJvbSBcIm1haW5cIjtcbmltcG9ydCB7IFJlbWluZGVyIH0gZnJvbSBcImRhdGEvUmVtaW5kZXJcIjtcbmltcG9ydCB7IFNjb3JlIH0gZnJvbSBcImRhdGEvU2NvcmVcIjtcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiZGF0YS9TdHVkZW50XCI7XG5cbmV4cG9ydCBjbGFzcyBOZXdSZW1pbmRlck1vZGFsIGV4dGVuZHMgTW9kYWwge1xuXG4gICAgY2FsbGJhY2tPbkNsb3NlO1xuXHRyZW1pbmRlcjogUmVtaW5kZXI7XG5cdGdyYWRlU2V0OiBHcmFkZVNldDtcbiAgICB0ZXh0OiBzdHJpbmc7XG4gICAgZGF0ZTogc3RyaW5nO1xuICAgIHJlcGVhdDogc3RyaW5nO1xuICAgIHByaW9yOiBzdHJpbmc7XG5cblx0Y29uc3RydWN0b3IoYXBwOiBBcHAsIGNhbGxiYWNrT25DbG9zZTogKHJlbWluZGVyOiBSZW1pbmRlcikgPT4gdm9pZCkge1xuXHRcdHN1cGVyKGFwcCk7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tPbkNsb3NlID0gY2FsbGJhY2tPbkNsb3NlO1xuXHRcdHRoaXMucmVtaW5kZXIgPSBudWxsO1xuICAgICAgICB0aGlzLnRleHQgPSBcIlwiO1xuICAgICAgICB0aGlzLmRhdGUgPSBcIlwiO1xuICAgICAgICB0aGlzLnJlcGVhdCA9IFwiMFwiO1xuICAgICAgICB0aGlzLnByaW9yID0gXCIwXCI7XG5cdH1cblxuICAgIG9uT3BlbigpIHtcblx0XHRsZXQge2NvbnRlbnRFbH0gPSB0aGlzO1xuXHRcdFxuXHRcdGNvbnRlbnRFbC5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogJ05ldyBSZW1pbmRlcicgfSk7XG5cblx0XHRuZXcgU2V0dGluZyhjb250ZW50RWwpXG5cdFx0LnNldE5hbWUoXCJUZXh0XCIpXG5cdFx0LmFkZFRleHQoKHRleHQpID0+XG5cdFx0ICB0ZXh0XG5cdFx0XHQgIC5zZXRWYWx1ZShcIlwiKVxuXHRcdFx0ICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHRcblx0XHRcdFx0ICB0aGlzLnRleHQgPSB2YWx1ZTtcblx0XHRcdCAgfVxuICAgIFx0KSk7XG5cbiAgICAgICAgbGV0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGxldCB0b2RheSA9IG5vdy50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLXVzJywgeyB5ZWFyOlwibnVtZXJpY1wiLCBtb250aDpcIm51bWVyaWNcIiwgZGF5OlwibnVtZXJpY1wifSk7XG4gICAgICAgIHRoaXMuZGF0ZSA9IHRvZGF5O1xuICAgICAgICBuZXcgU2V0dGluZyhjb250ZW50RWwpXG4gICAgICAgIC5zZXROYW1lKFwiU3RhcnRpbmcgRGF0ZVwiKVxuICAgICAgICAuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgICAgIHRleHRcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodG9kYXkpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICkpO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcbiAgICAgICAgLnNldE5hbWUoXCJSZXBlYXQgaW4gRGF5c1wiKVxuICAgICAgICAuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgICAgIHRleHRcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5yZXBlYXQpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcGVhdCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgKSk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGVudEVsKVxuICAgICAgICAuc2V0TmFtZShcIlJlbWluZGVyIERheXMgQmVmb3JlXCIpXG4gICAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICAgICAgdGV4dFxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnByaW9yKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmlvciA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgKSk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGVudEVsKVxuXHRcdC5hZGRCdXR0b24oKGJ0bikgPT5cblx0XHQgIGJ0blxuXHRcdFx0LnNldEJ1dHRvblRleHQoXCJPS1wiKVxuXHRcdFx0LnNldEN0YSgpXG5cdFx0XHQub25DbGljaygoKSA9PiB7XG5cdFx0XHQgIFx0dGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIGxldCByZW0gPSBuZXcgUmVtaW5kZXIodGhpcy50ZXh0LCBuZXcgRGF0ZSh0aGlzLmRhdGUpLCBwYXJzZUludCh0aGlzLnJlcGVhdCksIHBhcnNlSW50KHRoaXMucHJpb3IpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZW0pO1xuXHRcdFx0XHR0aGlzLmNhbGxiYWNrT25DbG9zZShyZW0pO1xuICAgICAgICAgICAgICAgIFxuXHRcdFx0fVxuXHRcdCkpO1xuXG4gICAgfVxufSIsImltcG9ydCB7IEFwcCwgRHJvcGRvd25Db21wb25lbnQsIEtleW1hcEV2ZW50SGFuZGxlciwgTW9kYWwsIFNldHRpbmcsIFRGaWxlLCBUZXh0Q29tcG9uZW50LCBUZXh0RmlsZVZpZXcsIFdvcmtzcGFjZUxlYWYgfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuaW1wb3J0IHsgR3JhZGVTZXQgfSBmcm9tIFwiZGF0YS9HcmFkZVNldFwiO1xuaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tIFwiZGF0YS9DYXRlZ29yeVwiO1xuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCJkYXRhL1N0dWRlbnRcIjtcbmltcG9ydCB7IFNjb3JlIH0gZnJvbSBcImRhdGEvU2NvcmVcIjtcbmltcG9ydCBHcmFkZWJveFBsdWdpbiBmcm9tIFwibWFpblwiO1xuXG5leHBvcnQgY2xhc3MgTmV3U2NvcmVNb2RhbCBleHRlbmRzIE1vZGFsIHtcblxuICAgIGNhbGxiYWNrT25DbG9zZTtcblx0bmFtZTogc3RyaW5nO1xuXHRwb3NzaWJsZTogbnVtYmVyO1xuXHRjYXRuYW1lOiBzdHJpbmc7XG5cdHNjb3JlczogTWFwPHN0cmluZywgbnVtYmVyPjtcblx0ZmllbGRzOiBUZXh0Q29tcG9uZW50W107XHRcblx0cG9zc2libGVGaWVsZDogU2V0dGluZztcblx0Z3JhZGVTZXQ6IEdyYWRlU2V0O1xuXHRlYzogYm9vbGVhbjtcblx0ZW50ZXJoYW5kbGVyOiBLZXltYXBFdmVudEhhbmRsZXI7XG5cdGZpZWxkOiBudW1iZXI7XG5cblx0Y29uc3RydWN0b3IoYXBwOiBBcHAsIGdyYWRlU2V0OiBHcmFkZVNldCwgY2FsbGJhY2tPbkNsb3NlOiAoKSA9PiB2b2lkKSB7XG5cdFx0c3VwZXIoYXBwKTtcblx0XHR0aGlzLmdyYWRlU2V0ID0gZ3JhZGVTZXQ7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tPbkNsb3NlID0gY2FsbGJhY2tPbkNsb3NlO1xuXHRcdHRoaXMuc2NvcmVzID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj47XG5cdFx0dGhpcy5uYW1lID0gXCJcIjtcblx0XHR0aGlzLnBvc3NpYmxlID0gMDtcblx0XHR0aGlzLmNhdG5hbWUgPSAoZ3JhZGVTZXQuY2F0ZWdvcmllcyA9PSB1bmRlZmluZWQgfHwgZ3JhZGVTZXQuY2F0ZWdvcmllcyA9PSBudWxsIHx8IGdyYWRlU2V0LmNhdGVnb3JpZXMubGVuZ3RoID09IDApXG5cdFx0XHRcdFx0XHRcdD9cIm5vIGNhdGVnb3JpZXNcIlxuXHRcdFx0XHRcdFx0XHQ6Z3JhZGVTZXQuY2F0ZWdvcmllc1swXS5uYW1lO1xuXHR9XG5cblx0b25PcGVuKCkge1xuXHRcdGxldCB7Y29udGVudEVsfSA9IHRoaXM7XG5cdFx0XG5cdFx0Y29udGVudEVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiAnTmV3IFNjb3JlJyB9KTtcblxuXHRcdHRoaXMuZmllbGQgPSAwO1xuXHRcdHRoaXMuZW50ZXJoYW5kbGVyID0gdGhpcy5zY29wZS5yZWdpc3RlcihbXSwgXCJFbnRlclwiLCAoKSA9PiB7XG5cdFx0XHR0aGlzLmZpZWxkc1t0aGlzLmZpZWxkXS5pbnB1dEVsLmZvY3VzKCk7XG5cdFx0XHR0aGlzLmZpZWxkc1t0aGlzLmZpZWxkXS5pbnB1dEVsLnNlbGVjdCgpO1xuXHRcdFx0dGhpcy5maWVsZCsrO1xuXHRcdH0pXG5cblx0XHRuZXcgU2V0dGluZyhjb250ZW50RWwpXG5cdFx0LnNldE5hbWUoXCJOYW1lXCIpXG5cdFx0LmFkZFRleHQoKHRleHQpID0+XG5cdFx0ICB0ZXh0XG5cdFx0XHQgIC5zZXRWYWx1ZShcIlwiKVxuXHRcdFx0ICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHRcblx0XHRcdFx0ICB0aGlzLm5hbWUgPSB2YWx1ZTtcblx0XHRcdCAgfVxuICAgIFx0KSk7XG5cblx0XHR0aGlzLnBvc3NpYmxlRmllbGQgPSBuZXcgU2V0dGluZyhjb250ZW50RWwpXG5cdFx0XHQuc2V0TmFtZShcIlRvdGFsIFBvc3NpYmxlXCIpXG5cdFx0XHQuYWRkVGV4dCggKHRleHQpID0+IFxuXHRcdFx0ICBcdHRleHRcblx0XHRcdCAgXHRcdC5zZXRWYWx1ZShcIlwiKVxuXHRcdFx0XHRcdC5vbkNoYW5nZSggKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLnBvc3NpYmxlID0gdmFsdWUgYXMgdW5rbm93biBhcyBudW1iZXI7XG5cdFx0XHRcdFx0fSlcblx0XHRcdCk7XG5cblx0XHRsZXQgY2F0RHJvcGRvd24gPSBuZXcgU2V0dGluZyhjb250ZW50RWwpIFxuXHRcdCAgICAuc2V0TmFtZShcIkNhdGVnb3J5XCIpXG5cdFx0XHQuYWRkRHJvcGRvd24oZHJvcCA9PiBkcm9wXG5cdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcblx0XHRcdFx0XHR0aGlzLmNhdG5hbWUgPSB2YWx1ZTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0dGhpcy5ncmFkZVNldC5jYXRlZ29yaWVzLmZvckVhY2goIChjYXQ6IENhdGVnb3J5KSA9PiB7XG5cdFx0XHQoY2F0RHJvcGRvd24uY29tcG9uZW50c1swXSBhcyBEcm9wZG93bkNvbXBvbmVudCkuYWRkT3B0aW9uKGNhdC5uYW1lLCBjYXQubmFtZSk7XHRcdFx0XG5cdFx0XHQoY2F0RHJvcGRvd24uY29tcG9uZW50c1swXSBhcyBEcm9wZG93bkNvbXBvbmVudCkuc2V0VmFsdWUoY2F0Lm5hbWUpO1xuXHRcdH0pO1xuXHRcdChjYXREcm9wZG93bi5jb21wb25lbnRzWzBdIGFzIERyb3Bkb3duQ29tcG9uZW50KS5zZXRWYWx1ZSh0aGlzLmdyYWRlU2V0LmNhdGVnb3JpZXNbMF0ubmFtZSk7XG5cblx0XHQvLyBVdGlsaXR5IGJ1dHRvbnNcblx0XHR0aGlzLmVjID0gZmFsc2U7XG5cdFx0dmFyIGVjdCA9IG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcblx0XHQgICAuYWRkVG9nZ2xlKChjYikgPT4gXG5cdFx0ICAgICAgIGNiXG5cdFx0XHQgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG5cdFx0XHRcdCAgIHRoaXMuZWMgPSB2YWx1ZTtcblx0XHRcdCAgIH0pXG5cdFx0ICAgKTtcdFxuXHRcdCAgIGVjdC5uYW1lRWwuaW5uZXJIVE1MID0gXCJFeHRyYSBDcmVkaXQ/XCI7ICBcdFxuXHQgICAgbmV3IFNldHRpbmcoY29udGVudEVsKVxuXHRcdC5hZGRCdXR0b24oKGJ0bikgPT5cblx0XHQgIGJ0blxuXHRcdFx0LnNldEJ1dHRvblRleHQoXCJGaWxsIERvd25cIilcblx0XHRcdC5zZXRDdGEoKVxuXHRcdFx0Lm9uQ2xpY2soKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmZpZWxkcy5mb3JFYWNoKCAoZmllbGQ6IFRleHRDb21wb25lbnQpID0+IHtcblx0XHRcdFx0XHRmaWVsZC5zZXRWYWx1ZShcIlwiK3RoaXMucG9zc2libGUpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHRjb25zb2xlLmxvZyhPYmplY3Qua2V5cyh0aGlzLnNjb3JlcykpO1xuXHRcdFx0XHR0aGlzLnNjb3Jlcy5mb3JFYWNoKCAodmFsdWUsIGtleSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuc2NvcmVzLnNldChrZXksIHRoaXMucG9zc2libGUpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLnNjb3Jlcyk7XG5cdFx0XHR9XG5cdFx0KSk7XG5cblx0XHRcblxuXHRcdC8vIFN0dWRlbnRzXG5cdFx0dGhpcy5maWVsZHMgPSBbXTtcblx0XHR0aGlzLmdyYWRlU2V0LnN0dWRlbnRzLmZvckVhY2goIChzdHVkOiBTdHVkZW50KSA9PiB7XG5cdFx0XHR0aGlzLnNjb3Jlcy5zZXQoc3R1ZC5kYXRhLmdldChcIm5hbWVcIiksIDApO1xuXHRcdFx0bmV3IFNldHRpbmcoY29udGVudEVsKVxuXHRcdFx0LnNldE5hbWUoc3R1ZC5kYXRhLmdldChcIm5hbWVcIikpXG5cdFx0XHQuYWRkVGV4dCggKHRleHQpID0+IHtcblx0XHRcdCAgXHR0ZXh0XG5cdFx0XHQgIFx0XHQuc2V0VmFsdWUoXCIwXCIpXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKCAodmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdGxldCBudW0gPSB2YWx1ZSBhcyB1bmtub3duIGFzIG51bWJlcjtcblx0XHRcdFx0XHRcdHRoaXMuc2NvcmVzLnNldChzdHVkLmRhdGEuZ2V0KFwibmFtZVwiKSwgbnVtKTtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiU0VUVElORyBcIitzdHVkLmRhdGEuZ2V0KFwibmFtZVwiKStcIiB0byBcIitudW0pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR0aGlzLmZpZWxkcy5wdXNoKHRleHQpO1xuXHRcdFx0fVxuXHRcdFx0KX0pO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGVudEVsKVxuXHRcdC5hZGRCdXR0b24oKGJ0bikgPT5cblx0XHQgIGJ0blxuXHRcdFx0LnNldEJ1dHRvblRleHQoXCJPS1wiKVxuXHRcdFx0LnNldEN0YSgpXG5cdFx0XHQub25DbGljaygoKSA9PiB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMuc2NvcmVzKVxuXHRcdFx0XHR0aGlzLmdyYWRlU2V0LmFkZFNjb3JlKHRoaXMubmFtZSwgdGhpcy5wb3NzaWJsZSwgdGhpcy5lYywgdGhpcy5jYXRuYW1lLCB0aGlzLnNjb3Jlcyk7XG5cdFx0XHQgIFx0dGhpcy5jbG9zZSgpO1xuXHRcdFx0XHR0aGlzLmNhbGxiYWNrT25DbG9zZSgpO1xuXHRcdFx0fVxuXHRcdCkpO1xuXG5cdH1cblxuXHRvbkNsb3NlKCkge1xuXHRcdHRoaXMuc2NvcGUudW5yZWdpc3Rlcih0aGlzLmVudGVyaGFuZGxlcik7XG5cdH1cbn1cblxuIiwiaW1wb3J0IHsgQXBwLCBNb2RhbCwgTm90aWNlLCBTZXR0aW5nLCBURmlsZSwgVGV4dEZpbGVWaWV3LCBXb3Jrc3BhY2VMZWFmIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5cbmltcG9ydCB7IEdyYWRlU2V0IH0gZnJvbSBcImRhdGEvR3JhZGVTZXRcIjtcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiZGF0YS9TdHVkZW50XCI7XG5pbXBvcnQgR3JhZGVib3hQbHVnaW4gZnJvbSBcIm1haW5cIjtcblxuZXhwb3J0IGNsYXNzIE5ld1N0dWRlbnRNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgbmFtZTogc3RyaW5nO1xuICBpZDogc3RyaW5nO1xuICBlbWFpbGFkZHJlc3M6IHN0cmluZztcbiAgbmlja25hbWU6IHN0cmluZztcbiAgbW9iaWxlUGhvbmVOdW1iZXI6IHN0cmluZztcblxuICBuZXdTdHVkZW50OiBTdHVkZW50O1xuXG4gIGNhbGxiYWNrT25DbG9zZTtcblxuXHRjb25zdHJ1Y3RvcihhcHA6IEFwcCwgY2FsbGJhY2tPbkNsb3NlOiAoc3R1ZGVudDogU3R1ZGVudCkgPT4gdm9pZCkge1xuXHRcdHN1cGVyKGFwcCk7XG4gICAgXHR0aGlzLm5ld1N0dWRlbnQgPSBudWxsO1xuICAgIFx0dGhpcy5jYWxsYmFja09uQ2xvc2UgPSBjYWxsYmFja09uQ2xvc2U7XG5cdH1cblxuXHRvbk9wZW4oKSB7XG5cdFx0bGV0IHtjb250ZW50RWx9ID0gdGhpcztcblx0XHRcblx0XHRjb250ZW50RWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6ICdOZXcgU3R1ZGVudCcgfSk7XG5cblx0XHRuZXcgU2V0dGluZyhjb250ZW50RWwpXG5cdFx0LnNldE5hbWUoXCJOYW1lXCIpXG5cdFx0LmFkZFRleHQoKHRleHQpID0+XG5cdFx0ICB0ZXh0XG5cdFx0XHQgIC5zZXRWYWx1ZShcIlwiKVxuXHRcdFx0ICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHRcblx0XHRcdFx0ICB0aGlzLm5hbWUgPSB2YWx1ZTtcblx0XHRcdCAgfVxuICAgICkpO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGVudEVsKVxuXHRcdC5zZXROYW1lKFwiSURcIilcblx0XHQuYWRkVGV4dCgodGV4dCkgPT5cblx0XHQgIHRleHRcblx0XHRcdCAgLnNldFZhbHVlKFwiXCIpXG5cdFx0XHQgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcdFxuXHRcdFx0XHQgIHRoaXMuaWQgPSB2YWx1ZTtcblx0XHRcdCAgfVxuICAgICkpO1xuICAgIFxuXHRcdG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcblx0XHQuc2V0TmFtZShcIk5pY2tuYW1lXCIpXG5cdFx0LmFkZFRleHQoKHRleHQpID0+XG5cdFx0ICB0ZXh0XG5cdFx0XHQgIC5zZXRWYWx1ZShcIlwiKVxuXHRcdFx0ICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHRcblx0XHRcdFx0ICB0aGlzLm5pY2tuYW1lID0gdmFsdWU7XG5cdFx0XHQgIH1cbiAgICApKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcblx0XHQuc2V0TmFtZShcIkVtYWlsIGFkZHJlc3NcIilcblx0XHQuYWRkVGV4dCgodGV4dCkgPT5cblx0XHQgIHRleHRcblx0XHRcdCAgLnNldFZhbHVlKFwiXCIpXG5cdFx0XHQgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcdFxuXHRcdFx0XHQgIHRoaXMuZW1haWxhZGRyZXNzID0gdmFsdWU7XG5cdFx0XHQgIH1cbiAgICApKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcblx0XHQuc2V0TmFtZShcIk1vYmlsZSBwaG9uZSBudW1iZXJcIilcblx0XHQuYWRkVGV4dCgodGV4dCkgPT5cblx0XHQgIHRleHRcblx0XHRcdCAgLnNldFZhbHVlKFwiXCIpXG5cdFx0XHQgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcdFxuXHRcdFx0XHQgIHRoaXMubW9iaWxlUGhvbmVOdW1iZXIgPSB2YWx1ZTtcblx0XHRcdCAgfVxuICAgICkpO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGVudEVsKVxuXHRcdFx0LmFkZEJ1dHRvbigoYnRuKSA9PlxuXHRcdFx0ICBidG5cblx0XHRcdFx0LnNldEJ1dHRvblRleHQoXCJPS1wiKVxuXHRcdFx0XHQuc2V0Q3RhKClcblx0XHRcdFx0Lm9uQ2xpY2soKCkgPT4ge1xuXHRcdFx0XHRcdGlmICh0aGlzLm5hbWUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0bmV3IE5vdGljZShcIllvdSBtdXN0IGVudGVyIGEgc3R1ZGVudCBuYW1lLlwiLCA1MDAwKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuaWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0bmV3IE5vdGljZShcIllvdSBtdXN0IGVudGVyIGEgc3R1ZGVudCBJRC5cIiwgNTAwMCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdH0pKTtcblx0fVxuXG5cdG9uQ2xvc2UoKSB7XG5cdFx0aWYgKHRoaXMubmFtZSA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuaWQgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuXHRcdGNvbnNvbGUubG9nKHRoaXMpO1xuXHRcdHZhciBvYmo6IE9iamVjdCA9IHtcblx0XHRcdG5hbWU6IHRoaXMubmFtZSxcblx0XHRcdGlkOiB0aGlzLmlkLFxuXHRcdFx0ZW1haWxhZGRyZXNzOiB0aGlzLmVtYWlsYWRkcmVzcyxcblx0XHRcdG5pY2tuYW1lOiB0aGlzLm5pY2tuYW1lLFxuXHRcdFx0bW9iaWxlcGhvbmVudW1iZXI6IHRoaXMubW9iaWxlUGhvbmVOdW1iZXJcblx0XHR9XG4gICAgXHR0aGlzLm5ld1N0dWRlbnQgPSBuZXcgU3R1ZGVudChvYmopO1xuXHRcdGNvbnNvbGUubG9nKHRoaXMubmV3U3R1ZGVudCk7XG5cdFx0aWYgKHRoaXMubmV3U3R1ZGVudCA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgXHR0aGlzLmNhbGxiYWNrT25DbG9zZSh0aGlzLm5ld1N0dWRlbnQpO1xuXHR9XG5cbiAgZ2V0U3R1ZGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5uZXdTdHVkZW50O1xuICB9XG59XG4iLCIvLyBTdG9sZW4gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vaGVsbG9pdHNpYW4vY3VzdG9tLW1vZGFscy1vYnNpZGlhbi9ibG9iL21haW4vc3JjL21vZGFsL0N1c3RvbU1vZGFsLnRzXG5cbmltcG9ydCB7IEFwcCwgTW9kYWwsIE5vdGljZSwgUGx1Z2luLCBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nO1xuXG5leHBvcnQgY2xhc3MgUHJvZ3Jlc3MgZXh0ZW5kcyBNb2RhbCB7XG5cdHBsdWdpbjogUGx1Z2luO1xuXHR0aXRsZTogc3RyaW5nO1xuXHRsYWJlbDogc3RyaW5nO1xuXHRiYXI6IEhUTUxQcm9ncmVzc0VsZW1lbnQ7XG5cdGluY3JlbWVudDogc3RyaW5nO1xuICBcblx0Y29uc3RydWN0b3IoXG5cdFx0cGx1Z2luOiBQbHVnaW4sXG5cdFx0dGl0bGU6IHN0cmluZyxcblx0XHRsYWJlbDogc3RyaW5nLFxuXHRcdGluY3JlbWVudDogc3RyaW5nXG5cdCkge1xuXHRcdHN1cGVyKHBsdWdpbi5hcHApO1xuXG5cdFx0dGhpcy5wbHVnaW4gPSBwbHVnaW47XG5cdFx0dGhpcy50aXRsZSA9IHRpdGxlO1xuXHRcdHRoaXMubGFiZWwgPSBsYWJlbDtcblx0XHR0aGlzLmluY3JlbWVudCA9IGluY3JlbWVudDtcblx0fVxuXG5cdGFzeW5jIG9uT3BlbigpIHtcblx0XHRuZXcgTm90aWNlKHRoaXMubGFiZWwpO1xuXG5cdFx0bGV0IHtjb250ZW50RWx9ID0gdGhpcztcblx0XHRcblx0XHRjb250ZW50RWwuY3JlYXRlRWwoXCJmb3JtXCIsIHt9LCAoZm9ybSkgPT4ge1xuXG5cdFx0XHRsZXQgdGl0bGVEaXYgPSBmb3JtLmNyZWF0ZURpdigpO1xuXHRcdFx0dGl0bGVEaXYuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IHRoaXMudGl0bGUgfSk7XG5cdFx0XHR0aXRsZURpdi5jcmVhdGVFbChcImhyXCIpO1xuXHRcdFx0XG5cdFx0XHR0aGlzLmJhciA9IHRpdGxlRGl2LmNyZWF0ZUVsKFwicHJvZ3Jlc3NcIiwgeyBhdHRyOiB7dmFsdWU6IHRoaXMuaW5jcmVtZW50LCBtYXg6IFwiMTAwXCIsIHdpZHRoOiBcIjEwMCVcIn0gfSk7XG5cblx0XHR9KTtcblx0fVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBsZXQgaW50dmFsdWUgPSBwYXJzZUludCh0aGlzLmJhci5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSk7XG5cdFx0aW50dmFsdWUgKz0gcGFyc2VJbnQodGhpcy5pbmNyZW1lbnQpO1xuXHRcdHRoaXMuYmFyLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIGludHZhbHVlLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuXHRvbkNsb3NlKCkge1xuXHRcdGxldCB7Y29udGVudEVsfSA9IHRoaXM7XG5cdFx0Y29udGVudEVsLmVtcHR5KCk7XG5cdH1cblxuXG59XG5cbiIsImltcG9ydCB7IEFwcCwgTW9kYWwsIE5vdGljZSwgUGx1Z2luLCBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nO1xuXG5pbXBvcnQgeyBSZW1pbmRlciB9IGZyb20gJ2RhdGEvUmVtaW5kZXInO1xuXG5leHBvcnQgY2xhc3MgUmVtaW5kZXJQb3B1cCBleHRlbmRzIE1vZGFsIHtcblx0cGx1Z2luOiBQbHVnaW47XG5cdHRpdGxlOiBzdHJpbmc7XG5cdHJlbWluZGVyOiBSZW1pbmRlcjtcblx0ZGlzbWlzc0NhbGxiYWNrOiAocmVtaW5kZXI6IFJlbWluZGVyKSA9PiB2b2lkO1xuICBcblx0Y29uc3RydWN0b3IocGx1Z2luOiBQbHVnaW4sIHJlbWluZGVyOiBSZW1pbmRlciwgZGlzbWlzczogKHJlbWluZGVyOiBSZW1pbmRlcikgPT4gdm9pZCkge1xuXHRcdHN1cGVyKHBsdWdpbi5hcHApO1xuXG5cdFx0dGhpcy5wbHVnaW4gPSBwbHVnaW47XG5cdFx0dGhpcy5yZW1pbmRlciA9IHJlbWluZGVyO1xuICAgICAgICB0aGlzLmRpc21pc3NDYWxsYmFjayA9IGRpc21pc3M7XG5cdH1cblxuXHRhc3luYyBvbk9wZW4oKSB7XG5cdFx0bGV0IHtjb250ZW50RWx9ID0gdGhpcztcblx0XHRcblx0XHRjb250ZW50RWwuY3JlYXRlRWwoXCJmb3JtXCIsIHt9LCAoZm9ybSkgPT4ge1xuXG5cdFx0XHRsZXQgdGl0bGVEaXYgPSBmb3JtLmNyZWF0ZURpdigpO1xuXHRcdFx0dGl0bGVEaXYuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IFwiUmVtaW5kZXJcIiB9KTtcblx0XHRcdHRpdGxlRGl2LmNyZWF0ZUVsKFwiaHJcIik7XG5cdFx0XHRcblx0XHRcdHRpdGxlRGl2LmNyZWF0ZUVsKFwiaDNcIiwgeyB0ZXh0OiB0aGlzLnJlbWluZGVyLnRleHR9KTtcblxuXHRcdFx0Zm9ybS5jcmVhdGVEaXYoXCJhbGVydC1idXR0b24tY29udGFpbmVyXCIsIGNvbnRhaW5lciA9PiB7XG5cdFx0XHRcdGNvbnRhaW5lclxuXHRcdFx0XHRcdC5jcmVhdGVFbChcImJ1dHRvblwiLCB7IGF0dHI6IHsgdHlwZTogXCJidXR0b25cIiB9LCB0ZXh0OiBcIkRpc21pc3NcIiB9KVxuXHRcdFx0XHRcdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNtaXNzQ2FsbGJhY2sodGhpcy5yZW1pbmRlcik7XG5cdFx0XHRcdFx0fSk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyXG5cdFx0XHRcdFx0LmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHsgYXR0cjogeyB0eXBlOiBcImJ1dHRvblwiLCBtYXJnaW46IFwiMTBweFwiIH0sIHRleHQ6IFwiQ2xvc2VcIiB9KVxuXHRcdFx0XHRcdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5jbG9zZSgpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHR9KTtcblxuXHRcdH0pO1xuXHR9XG5cblx0b25DbG9zZSgpIHtcblx0XHRsZXQge2NvbnRlbnRFbH0gPSB0aGlzO1xuXHRcdGNvbnRlbnRFbC5lbXB0eSgpO1xuXHR9XG5cblxufVxuXG4iLCIvLyBUYWtlbiBmcm9tIGh0dHBzOi8vbWVkaXVtLmNvbS9zd2xoL3NlbWFwaG9yZXMtaW4tamF2YXNjcmlwdC1lNDE1YjBkNjg0YmNcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VtYXBob3JlIHtcblxuICAgIGN1cnJlbnRSZXF1ZXN0czogYW55W107XG4gICAgcnVubmluZ1JlcXVlc3RzOiBudW1iZXI7XG4gICAgbWF4Q29uY3VycmVudFJlcXVlc3RzOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgc2VtYXBob3JlIHRoYXQgbGltaXRzIHRoZSBudW1iZXIgb2YgY29uY3VycmVudCBQcm9taXNlcyBiZWluZyBoYW5kbGVkXG4gICAgICogQHBhcmFtIHsqfSBtYXhDb25jdXJyZW50UmVxdWVzdHMgbWF4IG51bWJlciBvZiBjb25jdXJyZW50IHByb21pc2VzIGJlaW5nIGhhbmRsZWQgYXQgYW55IHRpbWVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihtYXhDb25jdXJyZW50UmVxdWVzdHMgPSAxKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFJlcXVlc3RzID0gW107XG4gICAgICAgIHRoaXMucnVubmluZ1JlcXVlc3RzID0gMDtcbiAgICAgICAgdGhpcy5tYXhDb25jdXJyZW50UmVxdWVzdHMgPSBtYXhDb25jdXJyZW50UmVxdWVzdHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIFByb21pc2UgdGhhdCB3aWxsIGV2ZW50dWFsbHkgcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGZ1bmN0aW9uIHBhc3NlZCBpblxuICAgICAqIFVzZSB0aGlzIHRvIGxpbWl0IHRoZSBudW1iZXIgb2YgY29uY3VycmVudCBmdW5jdGlvbiBleGVjdXRpb25zXG4gICAgICogQHBhcmFtIHsqfSBmblRvQ2FsbCBmdW5jdGlvbiB0aGF0IGhhcyBhIGNhcCBvbiB0aGUgbnVtYmVyIG9mIGNvbmN1cnJlbnQgZXhlY3V0aW9uc1xuICAgICAqIEBwYXJhbSAgey4uLmFueX0gYXJncyBhbnkgYXJndW1lbnRzIHRvIGJlIHBhc3NlZCB0byBmblRvQ2FsbFxuICAgICAqIEByZXR1cm5zIFByb21pc2UgdGhhdCB3aWxsIHJlc29sdmUgd2l0aCB0aGUgcmVzb2x2ZWQgdmFsdWUgYXMgaWYgdGhlIGZ1bmN0aW9uIHBhc3NlZCBpbiB3YXMgZGlyZWN0bHkgY2FsbGVkXG4gICAgICovXG4gICAgY2FsbEZ1bmN0aW9uKGZuVG9DYWxsLCAuLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRSZXF1ZXN0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICAgIHJlamVjdCxcbiAgICAgICAgICAgICAgICBmblRvQ2FsbCxcbiAgICAgICAgICAgICAgICBhcmdzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnRyeU5leHQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdHJ5TmV4dCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmN1cnJlbnRSZXF1ZXN0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJ1bm5pbmdSZXF1ZXN0cyA8IHRoaXMubWF4Q29uY3VycmVudFJlcXVlc3RzKSB7XG4gICAgICAgICAgICBsZXQgeyByZXNvbHZlLCByZWplY3QsIGZuVG9DYWxsLCBhcmdzIH0gPSB0aGlzLmN1cnJlbnRSZXF1ZXN0cy5zaGlmdCgpO1xuICAgICAgICAgICAgdGhpcy5ydW5uaW5nUmVxdWVzdHMrKztcbiAgICAgICAgICAgIGxldCByZXEgPSBmblRvQ2FsbCguLi5hcmdzKTtcbiAgICAgICAgICAgIHJlcS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4gcmVqZWN0KGVycikpXG4gICAgICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmdSZXF1ZXN0cy0tO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeU5leHQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyogSE9XIFRPIFVTRSAqL1xuLy8gY29uc3QgdGhyb3R0bGVyID0gbmV3IFNlbWFwaG9yZSgyKTtcbi8vIHRocm90dGxlci5jYWxsRnVuY3Rpb24oZmV0Y2gsICd3d3cuZmFjZWJvb2suY29tJyk7XG4vLyB0aHJvdHRsZXIuY2FsbEZ1bmN0aW9uKGZldGNoLCAnd3d3LmFtYXpvbi5jb20nKTtcbi8vIHRocm90dGxlci5jYWxsRnVuY3Rpb24oZmV0Y2gsICd3d3cubmV0ZmxpeC5jb20nKTtcbi8vIHRocm90dGxlci5jYWxsRnVuY3Rpb24oZmV0Y2gsICd3d3cuZ29vZ2xlLmNvbScpOyIsImltcG9ydCB7IEFwcCwgRHJvcGRvd25Db21wb25lbnQsIEVkaXRvciwgRmlsZVN5c3RlbUFkYXB0ZXIsIEl0ZW1WaWV3LCBNYXJrZG93bkZpbGVJbmZvLCBNYXJrZG93blJlbmRlcmVyLCBNYXJrZG93blZpZXcsIE1lbnUsIE1lbnVJdGVtLCBNb2RhbCwgTm90aWNlLCBQbGF0Zm9ybSwgU2V0dGluZywgVEZpbGUsIFRGb2xkZXIsIFRleHRGaWxlVmlldywgV29ya3NwYWNlTGVhZiB9IGZyb20gXCJvYnNpZGlhblwiO1xyXG5pbXBvcnQgeyBTdHVkZW50VmlldywgVklFV19UWVBFX1NUVURFTlQgfSBmcm9tIFwiU3R1ZGVudFZpZXdcIjtcclxuXHJcbmltcG9ydCB7IEFkZEFic2VuY2VNb2RhbCB9IGZyb20gXCJtb2RhbHMvQWRkQWJzZW5jZU1vZGFsXCI7XHJcbmltcG9ydCB7IEFsZXJ0IH0gZnJvbSBcIi4vdXRpbGl0aWVzL2FsZXJ0XCI7XHJcbmltcG9ydCB7IENvdW50ZXIgfSBmcm9tIFwiZGF0YS9Db3VudGVyXCI7XHJcbmltcG9ydCB7IEVtYWlsZXIgfSBmcm9tIFwiLi9lbWFpbFwiO1xyXG5pbXBvcnQgeyBFbWFpbGVyTW9kYWwgfSBmcm9tIFwibW9kYWxzL0VtYWlsZXJNb2RhbFwiO1xyXG5pbXBvcnQgeyBHcmFkZVNldCB9IGZyb20gXCJkYXRhL0dyYWRlU2V0XCI7XHJcbmltcG9ydCBHcmFkZWJveFBsdWdpbiBmcm9tIFwibWFpblwiO1xyXG5pbXBvcnQgeyBOZXdSZW1pbmRlck1vZGFsIH0gZnJvbSBcIm1vZGFscy9OZXdSZW1pbmRlck1vZGFsXCI7XHJcbmltcG9ydCB7IE5ld1Njb3JlTW9kYWwgfSBmcm9tIFwibW9kYWxzL05ld1Njb3JlTW9kYWxcIjtcclxuaW1wb3J0IHsgTmV3U3R1ZGVudE1vZGFsIH0gZnJvbSBcIm1vZGFscy9OZXdTdHVkZW50TW9kYWxcIjtcclxuaW1wb3J0IHsgUHJvZ3Jlc3MgfSBmcm9tIFwidXRpbGl0aWVzL1Byb2dyZXNzXCI7XHJcbmltcG9ydCB7IFJlbWluZGVyIH0gZnJvbSBcImRhdGEvUmVtaW5kZXJcIjtcclxuaW1wb3J0IHsgUmVtaW5kZXJQb3B1cCB9IGZyb20gXCJtb2RhbHMvUmVtaW5kZXJQb3B1cFwiO1xyXG5pbXBvcnQgeyBTY29yZSB9IGZyb20gXCJkYXRhL1Njb3JlXCI7XHJcbmltcG9ydCBTZW1hcGhvcmUgZnJvbSBcInV0aWxpdGllcy9TZW1hcGhvcmVcIjtcclxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCJkYXRhL1N0dWRlbnRcIjtcclxuaW1wb3J0IHsgVGVtcGxhdGUgfSBmcm9tIFwidXRpbGl0aWVzL1RlbXBsYXRlXCI7XHJcbmltcG9ydCBVdGlsaXRpZXMgZnJvbSBcInV0aWxpdGllcy9VdGlsaXRpZXNcIjtcclxuaW1wb3J0IHsgVklFV19UWVBFX0dSQURFU0VUX1NVTU1BUlkgfSBmcm9tIFwiR3JhZGVTZXRTdW1tYXJ5Vmlld1wiO1xyXG5pbXBvcnQgeyBtYXJrZG93biB9IGZyb20gXCJ1dGlsaXRpZXMvZHJhd2Rvd25cIjtcclxuXHJcbmV4cG9ydCBjb25zdCBWSUVXX1RZUEVfR1JBREVCT1ggPSBcImdyYWRlYm94LXZpZXdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHcmFkZWJveFZpZXcgZXh0ZW5kcyBJdGVtVmlldyB7XHJcblxyXG4gIHBsdWdpbjogR3JhZGVib3hQbHVnaW47XHJcbiAgZ3JhZGVTZXRQYXRoOiBzdHJpbmc7XHJcbiAgZ3JhZGVTZXRGaWxlOiBURmlsZTtcclxuICBmcm9udG1hdHRlciA6IHN0cmluZztcclxuICBncmFkZVNldERhdGE6IHN0cmluZztcclxuICBncmFkZVNldDogR3JhZGVTZXQ7XHJcbiAgY29udGFpbmVyOiBFbGVtZW50O1xyXG4gIHdvcmtzcGFjZWxlYWY6IFdvcmtzcGFjZUxlYWY7XHJcblxyXG4gIHN0YXR1c2JhckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cclxuICBkaXNwbGF5VGV4dDogc3RyaW5nO1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcbiAgZmlsZXR5cGVzOiBzdHJpbmdbXTtcclxuICBjb2xvcml6ZWQ6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKGxlYWY6IFdvcmtzcGFjZUxlYWYsIHBsdWdpbjogR3JhZGVib3hQbHVnaW4pIHtcclxuICAgIHN1cGVyKGxlYWYpO1xyXG5cclxuICAgIHRoaXMubmF2aWdhdGlvbiA9IHRydWU7XHJcbiAgICB0aGlzLndvcmtzcGFjZWxlYWYgPSBsZWFmO1xyXG4gICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XHJcblxyXG4gICAgdGhpcy5kaXNwbGF5VGV4dCA9ICh0aGlzLnBsdWdpbiA9PSB1bmRlZmluZWQgfHwgdGhpcy5wbHVnaW4uZ3JhZGVTZXQgPT0gdW5kZWZpbmVkIHx8IHRoaXMucGx1Z2luLmdyYWRlU2V0ID09IG51bGwpIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5wbHVnaW4udmVyc2lvbiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMucGx1Z2luLmdyYWRlU2V0LnByb3BlcnRpZXMuZ2V0KFwidGl0bGVcIik7XHJcbiAgICB0aGlzLmZpbGV0eXBlcyA9IFsgXCJwZGZcIiwgXCJkb2N4XCIsIFwidHh0XCIsIFwieGxzeFwiIF07XHJcblxyXG4gICAgdGhpcy5jb2xvcml6ZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnJlZ2lzdGVyKFxyXG4gICAgICB0aGlzLmNvbnRhaW5lckVsLm9uV2luZG93TWlncmF0ZWQoKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwid2luZG93TWlncmF0ZWRcIik7XHJcbiAgICAgIH0pXHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBnZXRWaWV3VHlwZSgpIHtcclxuICAgIHJldHVybiBWSUVXX1RZUEVfR1JBREVCT1g7XHJcbiAgfVxyXG5cclxuICBnZXREaXNwbGF5VGV4dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmRpc3BsYXlUZXh0OyAgXHJcbiAgfVxyXG5cclxuICBlbmRzV2l0aChzdHI6IHN0cmluZywgc3VmZml4ZXM6IHN0cmluZ1tdKTogYm9vbGVhbiB7XHJcbiAgICAgIGZvciAobGV0IGk9MDsgaTxzdWZmaXhlcy5sZW5ndGg7IGkrKykgXHJcbiAgICAgICAgaWYgKHN0ci5lbmRzV2l0aChzdWZmaXhlc1tpXSkpIHJldHVybiB0cnVlO1xyXG4gICAgICBcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLy8gMS4gT3BlbiB0aGUgdmlld1xyXG4gIGFzeW5jIG9uT3BlbigpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiT3BlbmluZyBHcmFkZUJveFZpZXdcIik7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzKTtcclxuXHJcbiAgICB0aGlzLnBsdWdpbi5ncmFkZUJveFZpZXcgPSB0aGlzO1xyXG5cclxuICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy5jb250YWluZXJFbC5jaGlsZHJlblsxXTtcclxuICAgIHRoaXMuY29udGFpbmVyLmVtcHR5KCk7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5hZGRDbGFzcyhcImNsYXNzLXN0eWxlXCIpO1xyXG4gXHJcbiAgICAgIGlmIChuZXcgRW1haWxlcigpLmVtYWlsV29ya3MpIHtcclxuICAgIHRoaXMuYWRkQWN0aW9uKFwibHVjaWRlLW1haWxcIiwgXCJtYWlsXCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgbmV3IEVtYWlsZXJNb2RhbCh0aGlzLmFwcCwgdGhpcy5wbHVnaW4uc2V0dGluZ3MsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGFzeW5jIChtZXNzYWdlOiBzdHJpbmcsIGZyb206IHN0cmluZywgYWRkcmVzczogc3RyaW5nLCBzdWJqZWN0OiBzdHJpbmcsIGluY2x1ZGVTY29yZXM6IGJvb2xlYW4sIGZpbGVzRGlyOiBGaWxlTGlzdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhZGRyZXNzID09IFwiI2NsYXNzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IG5ldyBQcm9ncmVzcyh0aGlzLnBsdWdpbiwgYFNlbmRpbmcgZW1haWxgLCBcIkdyYWRlQm94IGlzIGEgcGx1Z2luIGZvciBPYnNpZGlhbiBCdWRkeVwiLCBcIjEwXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3Mub3BlbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VuZGluZ0RlbGF5ID0gcGFyc2VJbnQodGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVsYXkpKjEwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZW1hcGhvcmUgPSBuZXcgU2VtYXBob3JlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmFkZVNldC5zdHVkZW50cy5mb3JFYWNoKCAoc3R1ZDogU3R1ZGVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZW1hcGhvcmUuY2FsbEZ1bmN0aW9uKCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVtYWlsID0gbmV3IEVtYWlsZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZXNEaXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBsYXN0IG5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsbmFtZSA9IHN0dWQuZGF0YS5nZXQoXCJuYW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxuYW1lLmNvbnRhaW5zKCcsJykpIGxuYW1lID0gbG5hbWUuc3Vic3RyaW5nKDAsIGxuYW1lLmluZGV4T2YoJywnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG5hbWUuY29udGFpbnMoJyAnKSkgbG5hbWUgPSBsbmFtZS5zdWJzdHJpbmcobG5hbWUuaW5kZXhPZignICcpKzEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG5hbWUgPSBsbmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsbmFtZSA9IFwiK2xuYW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7IGkgPCBmaWxlc0Rpci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmRzV2l0aChmaWxlc0Rpci5pdGVtKGkpLm5hbWUsIHRoaXMuZmlsZXR5cGVzKSAgJiYgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVzRGlyLml0ZW0oaSkubmFtZS5zdGFydHNXaXRoKGxuYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsLmFkZEF0dGFjaG1lbnQoZmlsZXNEaXIuaXRlbShpKS5wYXRoLCBmaWxlc0Rpci5pdGVtKGkpLm5hbWUsIFwiYXBwbGljYXRpb24vcGRmXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAobmV3IFRlbXBsYXRlKHRoaXMuZ3JhZGVTZXQpKS5wcm9jZXNzKG1lc3NhZ2UsIHN0dWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGVtYWlsLnNlbmRtYWlsKHN0dWQuZGF0YS5nZXQoXCJlbWFpbGFkZHJlc3NcIiksIGZyb20sIHN1YmplY3QsIG1lc3NhZ2UsIHRoaXMucGx1Z2luLnNldHRpbmdzLCBjb25zb2xlLmxvZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgVXRpbGl0aWVzLnNsZWVwKHNlbmRpbmdEZWxheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3MudXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEFsZXJ0KHRoaXMucGx1Z2luLCBcIkVtYWlsIFNlbnRcIiwgXCJBbGwgZW1haWwgbWVzc2FnZXMgc2VudC5cIikub3BlbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVtYWlsID0gbmV3IEVtYWlsZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGZpbGVzRGlyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlc0RpciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaSA8IGZpbGVzRGlyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmRzV2l0aChmaWxlc0Rpci5pdGVtKGkpLm5hbWUsIHRoaXMuZmlsZXR5cGVzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsLmFkZEF0dGFjaG1lbnQoZmlsZXNEaXIuaXRlbShpKS5wYXRoLCBmaWxlc0Rpci5pdGVtKGkpLm5hbWUsIFwiYXBwbGljYXRpb24vcGRmXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3R1ZCA9IHRoaXMuZ3JhZGVTZXQuZ2V0U3R1ZGVudCh7ZW1haWxhZGRyZXNzOiBhZGRyZXNzfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3R1ZCAhPT0gdW5kZWZpbmVkKSBtZXNzYWdlID0gKG5ldyBUZW1wbGF0ZSh0aGlzLmdyYWRlU2V0KSkucHJvY2VzcyhtZXNzYWdlLCBzdHVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsLnNlbmRtYWlsKGFkZHJlc3MsIGZyb20sIHN1YmplY3QsIG1lc3NhZ2UsIHRoaXMucGx1Z2luLnNldHRpbmdzLCBjb25zb2xlLmxvZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgKS5vcGVuKCk7XHJcbiAgICB9KVxyXG4gICAgfVxyXG4gICAgdGhpcy5hZGRBY3Rpb24oXCJsdWNpZGUtc2lnbmFsXCIsIFwic29ydFwiLCAoZTogTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICBsZXQgc29ydE1lbnUgPSBuZXcgTWVudSgpO1xyXG4gICAgICBzb3J0TWVudS5hZGRJdGVtKCAoaXRlbSkgPT4ge1xyXG4gICAgICAgIGl0ZW0uc2V0VGl0bGUoXCJOYW1lIEFzY2VuZGluZ1wiKVxyXG4gICAgICAgICAgLnNldEljb24oXCJsdWNpZGUtc29ydC1hc2NlbmRpbmdcIilcclxuICAgICAgICAgIC5vbkNsaWNrKCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JhZGVTZXQuc2V0U29ydE1ldGhvZCh0aGlzLmdyYWRlU2V0LnN0dWRlbnROYW1lc0FzY2VuZGluZyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIHNvcnRNZW51LmFkZEl0ZW0oIChpdGVtKSA9PiB7XHJcbiAgICAgICAgaXRlbS5zZXRUaXRsZShcIk5hbWUgRGVzY2VuZGluZ1wiKVxyXG4gICAgICAgICAgLnNldEljb24oXCJsdWNpZGUtc29ydC1hc2NlbmRpbmdcIilcclxuICAgICAgICAgIC5vbkNsaWNrKCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JhZGVTZXQuc2V0U29ydE1ldGhvZCh0aGlzLmdyYWRlU2V0LnN0dWRlbnROYW1lc0Rlc2NlbmRpbmcpO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICBzb3J0TWVudS5hZGRJdGVtKCAoaXRlbSkgPT4ge1xyXG4gICAgICAgIGl0ZW0uc2V0VGl0bGUoXCJTY29yZSBBc2NlbmRpbmdcIilcclxuICAgICAgICAgIC5zZXRJY29uKFwibHVjaWRlLXNvcnQtYXNjZW5kaW5nXCIpXHJcbiAgICAgICAgICAub25DbGljayggKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdyYWRlU2V0LnNldFNvcnRNZXRob2QodGhpcy5ncmFkZVNldC5zdHVkZW50U2NvcmVzQXNjZW5kaW5nKTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5KCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgc29ydE1lbnUuYWRkSXRlbSggKGl0ZW0pID0+IHtcclxuICAgICAgICBpdGVtLnNldFRpdGxlKFwiU2NvcmUgRGVzY2VuZGluZ1wiKVxyXG4gICAgICAgICAgLnNldEljb24oXCJsdWNpZGUtc29ydC1hc2NlbmRpbmdcIilcclxuICAgICAgICAgIC5vbkNsaWNrKCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JhZGVTZXQuc2V0U29ydE1ldGhvZCh0aGlzLmdyYWRlU2V0LnN0dWRlbnRTY29yZXNEZXNjZW5kaW5nKTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5KCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzb3J0TWVudS5zaG93QXRNb3VzZUV2ZW50KGUpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmFkZEFjdGlvbihcImx1Y2lkZS1wYWxldHRlXCIsIFwiY29sb3JpemVcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICB0aGlzLmNvbG9yaXplZCA9ICF0aGlzLmNvbG9yaXplZDtcclxuICAgICAgdGhpcy5kaXNwbGF5KCk7XHJcbiAgICB9KVxyXG4gICAgdGhpcy5hZGRBY3Rpb24oXCJsdWNpZGUtcGx1cy1jaXJjbGVcIiwgXCJBZGQgYSBzY29yZVwiLCAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmdyYWRlU2V0LmNhdGVnb3JpZXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICBuZXcgQWxlcnQodGhpcy5wbHVnaW4sIFwiTm8gQ2F0ZWdvcmllc1wiLCBcIllvdSBtdXN0IGZpcnN0IGNyZWF0ZSBhIGNhdGVnb3J5IGJlZm9yZSBhZGRpbmcgYSBzY29yZS5cIikub3BlbigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cdFx0ICBuZXcgTmV3U2NvcmVNb2RhbCh0aGlzLmFwcCwgdGhpcy5ncmFkZVNldCwgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ3JhZGVTZXQud3JpdGVHcmFkZVNldCgpXHJcbiAgICAgICAgdGhpcy5kaXNwbGF5KCk7XHJcbiAgICAgIH0pLm9wZW4oKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5hZGRBY3Rpb24oXCJsdWNpZGUtY2FsZW5kYXItcGx1c1wiLCBcIkFkZCBhbiBhYnNlbmNlXCIsICgpID0+IHtcclxuXHRcdCAgbmV3IEFkZEFic2VuY2VNb2RhbCh0aGlzLmFwcCwgdGhpcy5ncmFkZVNldCwgKGFic2VuY2VzOiBEYXRlW10pID0+IHtcclxuICAgICAgICAgIHRoaXMuZ3JhZGVTZXQuYWRkQWJzZW5jZXMoYWJzZW5jZXMpO1xyXG4gICAgICAgICAgdGhpcy5ncmFkZVNldC53cml0ZUdyYWRlU2V0KCk7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcclxuICAgICAgfSkub3BlbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5ncmFkZVNldCA9ICh0aGlzLnBsdWdpbiAhPT0gdW5kZWZpbmVkKSA/IHRoaXMucGx1Z2luLmdyYWRlU2V0IDogbnVsbDtcclxuICAgIGlmICh0aGlzLmdyYWRlU2V0ID09IHVuZGVmaW5lZCB8fCB0aGlzLmdyYWRlU2V0ID09IG51bGwpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SOiBHcmFkZVNldCBpcyB1bmRlZmluZWQsIGNsb3NpbmcgR0JWXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGx1Z2luKTtcclxuICAgICAgICB0aGlzLm9uQ2xvc2UoKTsgIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5kaXNwbGF5VGV4dCA9IHRoaXMuZ3JhZGVTZXQucHJvcGVydGllcy5nZXQoXCJ0aXRsZVwiKTtcclxuXHJcbiAgICAgIHRoaXMucGx1Z2luLnJlZ2lzdGVyRXZlbnQoXHJcbiAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLm9uKFwicmVzaXplXCIsICgpID0+IHtcclxuICAgICAgICAgICBsZXQgbmV3d2lkdGggPSB0aGlzLmNvbnRhaW5lckVsLndpbi5pbm5lcldpZHRoO1xyXG4gICAgICAgICAgIC8vY29uc29sZS5sb2coXCJSRVNJWkUgRVZFTlQ6IFwiK25ld3dpZHRoK1wiICYgXCIrd2lkdGgpO1xyXG4gICAgICAgICAgIGlmIChNYXRoLmFicyhuZXd3aWR0aC13aWR0aCkgPiAzMDApIHtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuZW1wdHkoKTtcclxuICAgICAgICAgICAgY29uc3QgZGl2ID0gdGhpcy5jb250YWluZXIuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwidmlldy1zdHlsZVwiIH0pO1xyXG4gICAgICAgICAgICBuZXd3aWR0aCA9IHRoaXMuY29udGFpbmVyRWwud2luLmlubmVyV2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JhZGVTZXQuZGlzcGxheShkaXYsIG5ld3dpZHRoKTtcclxuICAgICAgICAgICAgd2lkdGggPSBuZXd3aWR0aDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgXHJcbiAgICAgIHRoaXMucGx1Z2luLnJlZ2lzdGVyRXZlbnQoXHJcbiAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLm9uKFwiYWN0aXZlLWxlYWYtY2hhbmdlXCIsICgpID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLmdyYWRlU2V0ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5ncmFkZVNldC5tb2RpZmllZCkgdGhpcy5kaXNwbGF5KCk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBjb25zdCBkaXYgPSB0aGlzLmNvbnRhaW5lci5jcmVhdGVFbChcImRpdlwiLCB7IGNsczogXCJ2aWV3LXN0eWxlXCIgfSk7XHJcblxyXG4gICAgICAgIGxldCB3aWR0aCA9IHRoaXMuY29udGFpbmVyRWwud2luLmlubmVyV2lkdGg7ICAgIFxyXG4gICAgICAgIHRoaXMuc3RhdHVzYmFyRWxlbWVudCA9IHRoaXMucGx1Z2luLmFkZFN0YXR1c0Jhckl0ZW0oKVxyXG5cclxuICAgICAgICBpZiAodGhpcy5ncmFkZVNldCAhPSBudWxsKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlUZXh0ID0gdGhpcy5ncmFkZVNldC50aXRsZTtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xyXG4gICAgICAgICAgdGhpcy5zdGF0dXNiYXJFbGVtZW50LnNldFRleHQoXCJcIit0aGlzLmdyYWRlU2V0LmdldFN0dWRlbnRzKCkrXCIgc3R1ZGVudHNcIik7ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLndoZW5Ub0dlbmVyYXRlID09IFwib3BlblwiKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJHZW5lcmF0aW5nIHdlYiBzZXJ2ZXIgWE1MXCIpO1xyXG4gICAgICAgIGxldCBmaWxlbmFtZSA9IHRoaXMucGx1Z2luLnNldHRpbmdzLlhNTGZpbGVuYW1lO1xyXG4gICAgICAgIGlmIChmaWxlbmFtZS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAvL25ldyBBbGVydCh0aGlzLnBsdWdpbiwgXCJObyBGaWxlbmFtZVwiLCBcIk5vIFhNTCBmaWxlbmFtZSBzcGVjaWZpZWQgaW4gc2V0dGluZ3NcIikub3BlbigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBvZ2ZpbGVuYW1lID0gZmlsZW5hbWU7XHJcbiAgICAgICAgbGV0IHBvcyA9IGZpbGVuYW1lLmxhc3RJbmRleE9mKFwiL1wiKTtcclxuICAgICAgICBsZXQgcGF0aCA9IG51bGw7XHJcbiAgICAgICAgaWYgKHBvcyA+PSAwKSB7XHJcbiAgICAgICAgICBwYXRoID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGZpbGVuYW1lLnN1YnN0cmluZygwLCBwb3MpKTtcclxuICAgICAgICAgIGZpbGVuYW1lID0gZmlsZW5hbWUuc3Vic3RyaW5nKHBvcysxKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcGF0aCA9IHRoaXMuYXBwLnZhdWx0LmdldFJvb3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKFV0aWxpdGllcy5maWxlRXhpc3RzKGZpbGVuYW1lLCBwYXRoIGFzIFRGb2xkZXIpKSB7IFxyXG4gICAgICAgICAgbGV0IHRhZiA9IHRoaXMuYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChvZ2ZpbGVuYW1lKSBhcyBURmlsZTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiVHJ5aW5nIHRvIGRlbGV0ZSBcIit0YWYucGF0aClcclxuICAgICAgICAgIGlmICh0YWYgIT09IHVuZGVmaW5lZCkgYXdhaXQgdGhpcy5hcHAudmF1bHQuZGVsZXRlKHRhZik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB4bWwgPSB0aGlzLmdyYWRlU2V0LmdlbmVyYXRlWE1MRm9yV2ViU2VydmVyKCk7XHJcbiAgICAgICAgY29uc3QgeG1sRmlsZTogVEZpbGUgPSBhd2FpdCAoXHJcbiAgICAgICAgICBhcHAuZmlsZU1hbmFnZXIgYXMgYW55XHJcbiAgICAgICAgICApLmNyZWF0ZU5ld01hcmtkb3duRmlsZShhcHAud29ya3NwYWNlLmdldEFjdGl2ZUZpbGUoKT8ucGF0aCwgb2dmaWxlbmFtZSk7XHJcbiAgICAgICAgdGhpcy5hcHAudmF1bHQubW9kaWZ5KHhtbEZpbGUsIHhtbCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJlbWluZGVyc1xyXG4gICAgICBpZiAodGhpcy5ncmFkZVNldCAhPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5ncmFkZVNldC5yZW1pbmRlcnMuZm9yRWFjaCggKHJlbWluZGVyOiBSZW1pbmRlcikgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJDaGVja2luZyByZW1pbmRlcjogXCIrcmVtaW5kZXIudGV4dCk7XHJcbiAgICAgICAgICBpZiAocmVtaW5kZXIuaXNUcmlnZ2VyZWQoKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlbWluZGVyIHRyaWdnZXJlZDogXCIrcmVtaW5kZXIudGV4dCk7XHJcbiAgICAgICAgICAgIG5ldyBSZW1pbmRlclBvcHVwKHRoaXMucGx1Z2luLCByZW1pbmRlciwgKHJlbTogUmVtaW5kZXIpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmdyYWRlU2V0LmRlbGV0ZVJlbWluZGVyKHJlbSk7XHJcbiAgICAgICAgICAgICAgaWYgKHJlbS5yZXBlYXQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZW0ucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JhZGVTZXQuYWRkUmVtaW5kZXIocmVtKTtcclxuICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB9KS5vcGVuKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIFxyXG4gIH1cclxuXHJcbiAgYXN5bmMgb25DbG9zZSgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiQ2xvc2luZyBHcmFkZUJveFZpZXdcIik7XHJcbiAgICBpZiAodGhpcy5ncmFkZVNldCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiTU9ESUZJRUQ6IFwiK3RoaXMuZ3JhZGVTZXQubW9kaWZpZWQpO1xyXG4gICAgICBpZiAodGhpcy5ncmFkZVNldC5tb2RpZmllZCkgdGhpcy5ncmFkZVNldC53cml0ZUdyYWRlU2V0KCk7XHJcbiAgICAgIHRoaXMuc3RhdHVzYmFyRWxlbWVudC5zZXRUZXh0KFwiXCIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hcHAud29ya3NwYWNlLmRldGFjaExlYXZlc09mVHlwZShWSUVXX1RZUEVfU1RVREVOVCk7XHJcbiAgICB0aGlzLmFwcC53b3Jrc3BhY2UuZGV0YWNoTGVhdmVzT2ZUeXBlKFZJRVdfVFlQRV9HUkFERVNFVF9TVU1NQVJZKTtcclxuICAgIHRoaXMuYXBwLndvcmtzcGFjZS5kZXRhY2hMZWF2ZXNPZlR5cGUoVklFV19UWVBFX0dSQURFQk9YKTtcclxuXHJcbiAgICBpZiAodGhpcy5ncmFkZVNldCA9PSB1bmRlZmluZWQpIHJldHVybjtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIldIRU4gVE8gR0VORVJBVEU6IFwiK3RoaXMucGx1Z2luLnNldHRpbmdzLndoZW5Ub0dlbmVyYXRlKTtcclxuICAgIGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy53aGVuVG9HZW5lcmF0ZSA9PSBcImNsb3NlXCIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJHZW5lcmF0aW5nIHdlYiBzZXJ2ZXIgWE1MXCIpO1xyXG4gICAgICBsZXQgZmlsZW5hbWUgPSB0aGlzLmdyYWRlU2V0LnByb3BlcnRpZXMuZ2V0KFwid2ViZmlsZVwiKTtcclxuICAgICAgaWYgKGZpbGVuYW1lID09IHVuZGVmaW5lZCB8fCBmaWxlbmFtZS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgLy9uZXcgQWxlcnQodGhpcy5wbHVnaW4sIFwiTm8gRmlsZW5hbWVcIiwgXCJObyBXZWIgZmlsZW5hbWUgc3BlY2lmaWVkIGluIHNldHRpbmdzXCIpLm9wZW4oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBsZXQgb2dmaWxlbmFtZSA9IGZpbGVuYW1lO1xyXG4gICAgICBsZXQgcG9zID0gZmlsZW5hbWUubGFzdEluZGV4T2YoXCIvXCIpO1xyXG4gICAgICBsZXQgcGF0aCA9IG51bGw7XHJcbiAgICAgIGlmIChwb3MgPj0gMCkge1xyXG4gICAgICAgIHBhdGggPSB0aGlzLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoZmlsZW5hbWUuc3Vic3RyaW5nKDAsIHBvcykpO1xyXG4gICAgICAgIGZpbGVuYW1lID0gZmlsZW5hbWUuc3Vic3RyaW5nKHBvcysxKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwYXRoID0gdGhpcy5hcHAudmF1bHQuZ2V0Um9vdCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChVdGlsaXRpZXMuZmlsZUV4aXN0cyhmaWxlbmFtZSwgcGF0aCBhcyBURm9sZGVyKSkgeyBcclxuICAgICAgICBsZXQgdGFmID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKG9nZmlsZW5hbWUpIGFzIFRGaWxlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVHJ5aW5nIHRvIGRlbGV0ZSBcIit0YWYucGF0aClcclxuICAgICAgICBpZiAodGFmICE9PSB1bmRlZmluZWQpIGF3YWl0IHRoaXMuYXBwLnZhdWx0LmRlbGV0ZSh0YWYpO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCB4bWwgPSB0aGlzLmdyYWRlU2V0LmdlbmVyYXRlWE1MRm9yV2ViU2VydmVyKCk7XHJcbiAgICAgIGNvbnN0IHhtbEZpbGU6IFRGaWxlID0gYXdhaXQgKFxyXG4gICAgICAgIGFwcC5maWxlTWFuYWdlciBhcyBhbnlcclxuICAgICAgICApLmNyZWF0ZU5ld01hcmtkb3duRmlsZShhcHAud29ya3NwYWNlLmdldEFjdGl2ZUZpbGUoKT8ucGF0aCwgb2dmaWxlbmFtZSk7XHJcbiAgICAgIHRoaXMuYXBwLnZhdWx0Lm1vZGlmeSh4bWxGaWxlLCB4bWwpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGFzeW5jIENTVmltcG9ydChyZW50OiBHcmFkZWJveFZpZXcsIGdzOiBHcmFkZVNldCwgZmlsZTogc3RyaW5nKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIlVTSU5HIFwiK2ZpbGUrXCIgRk9SIElNUE9SVCwgQ29tcGFyaW5nIHRvIFwiK3RoaXMuYXBwLnZhdWx0LmFkYXB0ZXIuYmFzZVBhdGgpO1xyXG4gICAgLy8gUHJvY2Vzc1xyXG4gICAgbGV0IHBvcyA9IGZpbGUuaW5kZXhPZih0aGlzLmFwcC52YXVsdC5hZGFwdGVyLmJhc2VQYXRoKTtcclxuICAgIGlmIChwb3MgPj0gMCkgZmlsZSA9IGZpbGUucmVwbGFjZSh0aGlzLmFwcC52YXVsdC5hZGFwdGVyLmJhc2VQYXRoK1wiXFxcXFwiLCBcIlwiKTtcclxuICAgIGZpbGUgPSBmaWxlLnJlcGxhY2UoL1xcXFwvZywgXCIvXCIpO1xyXG4gICAgY29uc29sZS5sb2coZmlsZSk7XHJcbiAgICBsZXQgdGZpbGUgPSB0aGlzLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoZmlsZSkgYXMgVEZpbGU7XHJcbiAgICBjb25zb2xlLmxvZyh0ZmlsZSk7XHJcbiAgICBsZXQgY3N2ZGF0YSA9IGF3YWl0IGFwcC52YXVsdC5yZWFkKCB0ZmlsZSApO1xyXG4gICAgY29uc29sZS5sb2coY3N2ZGF0YSk7XHJcbiAgICAvLyBsZXQgY3N2ZGF0YSA9IFxyXG4gICAgLy8gICAgICdcImppcHBpbmcsIE1pa2VcIiwgXCIwMTAxMDEwMVwiLCBcImppcHBpbmdAaG9wZS5lZHVcIiwgMjQsIDQyLCA1LjEsIEhlbGxvXFxuJyArXHJcbiAgICAvLyAgICAgJ1wiU2hhdG5lciwgV2lsbGlhbVwiLCBcIjAwMDExMTAwMVwiLCBcImtpcmtAZW50ZXJwcmlzZS5vcmdcIiwgMjIsMjIsNi4wLCBHbyc7XHJcbiAgICBjb25zdCBvYmpQYXR0ZXJuID0gbmV3IFJlZ0V4cCgoXCIoXFxcXCx8XFxcXHI/XFxcXG58XFxcXHJ8XikoPzpcXFwiKFteXFxcIl0qKD86XFxcIlxcXCJbXlxcXCJdKikqKVxcXCJ8KFteXFxcXCxcXFxcclxcXFxuXSopKVwiKSxcImdpXCIpO1xyXG4gICAgbGV0IGFyck1hdGNoZXMgPSBudWxsLCBhcnJEYXRhOiBzdHJpbmdbXVtdID0gW1tdXTtcclxuICAgIHdoaWxlIChhcnJNYXRjaGVzID0gb2JqUGF0dGVybi5leGVjKGNzdmRhdGEpKXtcclxuICAgICAgICBpZiAoYXJyTWF0Y2hlc1sxXS5sZW5ndGggJiYgYXJyTWF0Y2hlc1sxXSAhPT0gXCIsXCIpYXJyRGF0YS5wdXNoKFtdKTtcclxuICAgICAgICBhcnJEYXRhW2FyckRhdGEubGVuZ3RoIC0gMV0ucHVzaChhcnJNYXRjaGVzWzJdID8gXHJcbiAgICAgICAgICAgIGFyck1hdGNoZXNbMl0ucmVwbGFjZShuZXcgUmVnRXhwKCBcIlxcXCJcXFwiXCIsIFwiZ1wiICksIFwiXFxcIlwiKSA6XHJcbiAgICAgICAgICAgIGFyck1hdGNoZXNbM10pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENob29zZSBmaWVsZHNcclxuICAgIC8vIEJ1aWxkIGEgbW9kYWwsIFxyXG4gICAgbGV0IGZpZWxkTW9kYWwgPSBuZXcgTW9kYWwodGhpcy5hcHApO1xyXG4gICAgbGV0IHtjb250ZW50RWx9ID0gZmllbGRNb2RhbDtcclxuXHRcdFxyXG5cdFx0Y29udGVudEVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiAnQ2hvb3NlIGZpZWxkcyB0byBpbXBvcnQnIH0pO1xyXG5cclxuICAgIGxldCBzZXR0aW5nOiBTZXR0aW5nW10gPSBbXTtcclxuICAgIGxldCBwb3NpdGlvbnMgPSB7fTtcclxuICAgIGxldCBjb2x1bW4gPSAwO1xyXG4gICAgYXJyRGF0YVswXS5mb3JFYWNoKCAobGluZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHNldHRpbmdbY29sdW1uXSA9IFxyXG4gICAgICBuZXcgU2V0dGluZyhjb250ZW50RWwpIFxyXG5cdFx0XHQuc2V0TmFtZShsaW5lKVxyXG5cdFx0XHQuYWRkRHJvcGRvd24odGV4dCA9PiB0ZXh0XHJcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBwb3NpdGlvbnNbdmFsdWVdID0gY29sdW1uO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LmFkZE9wdGlvbihcImlnbm9yZWRcIiwgXCJpZ25vcmVkXCIpXHJcblx0XHRcdFx0LmFkZE9wdGlvbihcImZpcnN0IG5hbWVcIiwgXCJmaXJzdCBuYW1lXCIpXHJcblx0XHRcdFx0LmFkZE9wdGlvbihcImxhc3QgbmFtZVwiLCBcImxhc3QgbmFtZVwiKVxyXG5cdFx0XHRcdC5hZGRPcHRpb24oXCJmdWxsIG5hbWVcIiwgXCJmdWxsIG5hbWVcIilcclxuXHRcdFx0XHQuYWRkT3B0aW9uKFwiSURcIiwgXCJJRFwiKVxyXG5cdFx0XHRcdC5hZGRPcHRpb24oXCJlbWFpbCBhZGRyZXNzXCIsIFwiZW1haWwgYWRkcmVzc1wiKVxyXG5cdFx0XHRcdC5zZXRWYWx1ZShcImlnbm9yZWRcIilcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbHVtbiArKztcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBuZXcgU2V0dGluZyhjb250ZW50RWwpXHJcbiAgICAgICAgLmFkZEJ1dHRvbigoYnRuKSA9PlxyXG4gICAgICAgIGJ0blxyXG4gICAgICAgICAgLnNldEJ1dHRvblRleHQoXCJJbXBvcnRcIilcclxuICAgICAgICAgIC5zZXRDdGEoKVxyXG4gICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICBmaWVsZE1vZGFsLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIC8vIHNldCB1cCBwb3NpdGlvbnNcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZXR0aW5nLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzZXR0aW5nW2ldKTtcclxuICAgICAgICAgICAgICBsZXQgdmFsOiBzdHJpbmcgPSBzZXR0aW5nW2ldLmNvbXBvbmVudHNbMF0uZ2V0VmFsdWUoKTtcclxuICAgICAgICAgICAgICBpZiAodmFsICE9PSBcImlnbm9yZWRcIikgcG9zaXRpb25zW3ZhbF0gPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vLy8gcGFyc2UgLyBpbXBvcnQgdGhlIGZpbGVcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhwb3NpdGlvbnMpO1xyXG4gICAgICAgICAgICBhcnJEYXRhLmZvckVhY2goIGFzeW5jIChsaW5lOiBzdHJpbmdbXSkgPT4ge1xyXG4gICAgICAgICAgICAgIGxldCBzdHVkID0gbmV3IFN0dWRlbnQobnVsbCk7XHJcbiAgICAgICAgICAgICAgbGV0IHNuYW1lID0gbGluZVtwb3NpdGlvbnNbXCJmdWxsIG5hbWVcIl1dO1xyXG4gICAgICAgICAgICAgIGlmIChzbmFtZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHNuYW1lID0gbGluZVtwb3NpdGlvbnNbXCJsYXN0IG5hbWVcIl1dICsgXCIsIFwiICsgbGluZVtwb3NpdGlvbnNbXCJmaXJzdCBuYW1lXCJdXTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgc3R1ZC5kYXRhLnNldChcIm5hbWVcIiwgc25hbWUucmVwbGFjZUFsbCgnXCInLCAnJykudHJpbSgpKTtcclxuICAgICAgICAgICAgICBzdHVkLmRhdGEuc2V0KFwiaWRcIiwgbGluZVtwb3NpdGlvbnNbXCJJRFwiXV0ucmVwbGFjZUFsbCgnXCInLCAnJykudHJpbSgpKTtcclxuICAgICAgICAgICAgICBzdHVkLmRhdGEuc2V0KFwiZW1haWxhZGRyZXNzXCIsIGxpbmVbcG9zaXRpb25zW1wiZW1haWwgYWRkcmVzc1wiXV0ucmVwbGFjZUFsbCgnXCInLCAnJykudHJpbSgpKTtcclxuICAgICAgICAgICAgICBzdHVkLmRhdGEuc2V0KFwiaW1hZ2VcIiwgXCJodHRwczovL3BsdXMuaG9wZS5lZHUvUGhvdG9zLzAwMFwiK2xpbmVbcG9zaXRpb25zW1wiSURcIl1dLnJlcGxhY2VBbGwoJ1wiJywgJycpLnRyaW0oKSsnLmpwZycpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0dWQpO1xyXG5cclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhncy5zb3VyY2VGb2xkZXIpO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHN0dWRlbnRGaWxlOiBURmlsZSA9IGF3YWl0IChcclxuICAgICAgICAgICAgICAgIGFwcC5maWxlTWFuYWdlciBhcyBhbnlcclxuICAgICAgICAgICAgICAgICkuY3JlYXRlTmV3TWFya2Rvd25GaWxlKGdzLnNvdXJjZUZvbGRlciwgc3R1ZC5kYXRhLmdldChcImlkXCIpKTtcclxuICAgICAgICAgICAgICB2YXIgZGF0YXN0ciA9IFwiI25hbWUgXCIrc3R1ZC5kYXRhLmdldChcIm5hbWVcIikrXCJcXG5cIitcclxuICAgICAgICAgICAgICAgICBcIiNpZCBcIitzdHVkLmRhdGEuZ2V0KFwiaWRcIikrXCJcXG5cIjtcclxuICAgICAgICAgICAgICBpZiAoc3R1ZC5kYXRhLmdldChcIm5pY2tuYW1lXCIpICE9PSB1bmRlZmluZWQpIFxyXG4gICAgICAgICAgICAgICAgIGRhdGFzdHIgKz0gXCIjbmlja25hbWUgXCIrc3R1ZC5kYXRhLmdldChcIm5pY2tuYW1lXCIpK1wiXFxuXCI7XHJcbiAgICAgICAgICAgICAgaWYgKHN0dWQuZGF0YS5nZXQoXCJlbWFpbGFkZHJlc3NcIikgIT09IHVuZGVmaW5lZCkgXHJcbiAgICAgICAgICAgICAgICAgZGF0YXN0ciArPSBcIiNlbWFpbGFkZHJlc3MgXCIrc3R1ZC5kYXRhLmdldChcImVtYWlsYWRkcmVzc1wiKStcIlxcblwiO1xyXG4gICAgICAgICAgICAgIGlmIChzdHVkLmRhdGEuZ2V0KFwibW9iaWxlUGhvbmVOdW1iZXJcIikgIT09IHVuZGVmaW5lZCkgXHJcbiAgICAgICAgICAgICAgICAgZGF0YXN0ciArPSBcIiNtb2JpbGVQaG9uZU51bWJlciBcIitzdHVkLmRhdGEuZ2V0KFwibW9iaWxlUGhvbmVOdW1iZXJcIikrXCJcXG5cIjsgIFxyXG4gICAgICAgICAgICAgICBpZiAoc3R1ZC5kYXRhLmdldChcImltYWdlXCIpICE9PSB1bmRlZmluZWQpIFxyXG4gICAgICAgICAgICAgICAgIGRhdGFzdHIgKz0gXCIjaW1hZ2UgXCIrc3R1ZC5kYXRhLmdldChcImltYWdlXCIpK1wiXFxuXCI7ICBcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhc3RyKSAgICAgIFxyXG4gICAgICAgICAgICAgIGFwcC52YXVsdC5hcHBlbmQoc3R1ZGVudEZpbGUsIGRhdGFzdHIpO1xyXG4gICAgICAgICAgICAgIHN0dWQuc2V0U291cmNlRmlsZShzdHVkZW50RmlsZSk7XHJcbiAgICAgICAgICAgICAgZ3MuYWRkU3R1ZGVudChzdHVkKTtcclxuICAgICAgICAgICAgfSApO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcclxuICAgICAgfSkpO1xyXG5cclxuICAgIGZpZWxkTW9kYWwub3BlbigpO1xyXG5cclxuICB9XHJcblxyXG4gIG9uUGFuZU1lbnUobWVudTogTWVudSwgc291cmNlOiBzdHJpbmcsIGNhbGxTdXBlcjogYm9vbGVhbiA9IHRydWUpIHtcclxuXHRcdGlmIChzb3VyY2UgIT09ICdtb3JlLW9wdGlvbnMnKSB7XHJcblx0XHQgIHN1cGVyLm9uUGFuZU1lbnUobWVudSwgc291cmNlKTtcclxuXHRcdCAgcmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0Ly8gQWRkIGEgbWVudSBpdGVtIHRvIGZvcmNlIHRoZSBib2FyZCB0byBtYXJrZG93biB2aWV3XHJcbiAgICBpZiAobmV3IEVtYWlsZXIoKS5lbWFpbFdvcmtzKSB7XHJcbiAgICAgIG1lbnVcclxuICAgIC5hZGRJdGVtKChpdGVtKSA9PiB7XHJcbiAgICBpdGVtXHJcbiAgICAgIC5zZXRUaXRsZSgnRW1haWwgc3R1ZGVudCBzY29yZXMnKVxyXG4gICAgICAuc2V0SWNvbignbHVjaWRlLWZpbGUtdGV4dCcpXHJcbiAgICAgIC5zZXRTZWN0aW9uKCdwYW5lJylcclxuICAgICAgLm9uQ2xpY2soIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IHRoaXMucGx1Z2luLnNldHRpbmdzLnRlbXBsYXRlO1xyXG4gICAgICAgICAgaWYgKHRlbXBsYXRlICE9PSB1bmRlZmluZWQgJiYgdGVtcGxhdGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gdGVtcGxhdGUuaW5kZXhPZih0aGlzLmFwcC52YXVsdC5hZGFwdGVyLmJhc2VQYXRoKTtcclxuICAgICAgICAgICAgaWYgKHBvcyA+PSAwKSB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UodGhpcy5hcHAudmF1bHQuYWRhcHRlci5iYXNlUGF0aCtcIlxcXFxcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZSgvXFxcXC9nLCBcIi9cIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRlbXBsYXRlKTtcclxuICAgICAgICAgICAgbGV0IHRmaWxlID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKHRlbXBsYXRlKSBhcyBURmlsZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGZpbGUpO1xyXG4gICAgICAgICAgICBpZiAodGVtcGxhdGUgIT09IG51bGwpIFxyXG4gICAgICAgICAgICAgICB0ZW1wbGF0ZSA9ICBhd2FpdCBhcHAudmF1bHQucmVhZCggdGZpbGUgKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGUgPSBcIlwiO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGVtcGxhdGUgPSBcIlwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8gSGVyZSB3ZSBlbWFpbCB0aGUgc3R1ZGVudCBub3RlXHJcbiAgICAgICAgICBjb25zdCBzZW1hcGhvcmUgPSBuZXcgU2VtYXBob3JlKDEpO1xyXG4gICAgICAgICAgdGhpcy5ncmFkZVNldC5zdHVkZW50cy5mb3JFYWNoKCAoc3R1ZDogU3R1ZGVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzZW5kaW5nRGVsYXkgPSBwYXJzZUludCh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWxheSkqMTAwMDtcclxuICAgICAgICAgICAgc2VtYXBob3JlLmNhbGxGdW5jdGlvbiggYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGxldCBlbWFpbCA9IG5ldyBFbWFpbGVyKCk7XHJcbiAgICAgICAgICAgICAgbGV0IHN0dWRlbnROb3RlID0gXCJcIjtcclxuICAgICAgICAgICAgICBpZiAodGVtcGxhdGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc3R1ZGVudE5vdGUgPSAobmV3IFRlbXBsYXRlKHRoaXMuZ3JhZGVTZXQpKS5wcm9jZXNzKHRlbXBsYXRlLCBzdHVkKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3R1ZGVudE5vdGUgPSBzdHVkLmdlbmVyYXRlTWFya2Rvd24odGhpcy5ncmFkZVNldCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0dWRlbnROb3RlKTtcclxuICAgICAgICAgICAgICBsZXQgaHRtbCA9IG1hcmtkb3duKHN0dWRlbnROb3RlKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhodG1sKTtcclxuICAgICAgICAgICAgICBlbWFpbC5zZXRNZXNzYWdlSFRNTChodG1sKTsgXHJcbiAgICAgICAgICAgICAgbGV0IGR0ID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLXVzJywgeyB5ZWFyOlwibnVtZXJpY1wiLCBtb250aDpcInNob3J0XCIsIGRheTpcIm51bWVyaWNcIn0pO1xyXG4gICAgICAgICAgICAgIGxldCBzdWJqZWN0ID0gXCJZb3VyIHNjb3JlcyBpbiBcIit0aGlzLmdyYWRlU2V0LnByb3BlcnRpZXMuZ2V0KFwidGl0bGVcIikrXCIgYXMgb2YgXCIrZHQ7ICAgICAgICAgICBcclxuICAgICAgICAgICAgICBlbWFpbC5zZW5kbWFpbChzdHVkLmRhdGEuZ2V0KFwiZW1haWxhZGRyZXNzXCIpLCB0aGlzLnBsdWdpbi5zZXR0aW5ncy5mcm9tLCBzdWJqZWN0LCBcIlwiLCB0aGlzLnBsdWdpbi5zZXR0aW5ncywgY29uc29sZS5sb2cpO1xyXG4gICAgICAgICAgICAgIGF3YWl0IFV0aWxpdGllcy5zbGVlcChzZW5kaW5nRGVsYXkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuICAgIG1lbnVcclxuICAgIC5hZGRJdGVtKChpdGVtKSA9PiB7XHJcbiAgICBpdGVtXHJcbiAgICAgIC5zZXRUaXRsZSgnR2VuZXJhdGUgc2NvcmUgc2hlZXQnKVxyXG4gICAgICAuc2V0SWNvbignbHVjaWRlLWZpbGUtdGV4dCcpXHJcbiAgICAgIC5zZXRTZWN0aW9uKCdwYW5lJylcclxuICAgICAgLm9uQ2xpY2soIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIC8vIE9wZW4gYSBmaWxlIGFuZCBnZW5lcmF0ZSBtYXJrZG93biBmb3IgYSBzY29yZSBzaGVldFxyXG4gICAgICAgICAgLy9sZXQgZmlsZSA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aCh0aGlzLmdyYWRlU2V0LnNvdXJjZUZvbGRlcitcIi9cIit0aGlzLmdyYWRlU2V0LnByb3BlcnRpZXMuZ2V0KFwidGl0bGVcIikrXCJzaGVldC5tZFwiKTtcclxuICAgICAgICAgIGNvbnN0IGZpbGU6IFRGaWxlID0gYXdhaXQgKFxyXG4gICAgICAgICAgICBhcHAuZmlsZU1hbmFnZXIgYXMgYW55XHJcbiAgICAgICAgICAgICkuY3JlYXRlTmV3TWFya2Rvd25GaWxlKGFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlRmlsZSgpPy5wYXRoLCAvKnRoaXMuZ3JhZGVTZXQucHJvcGVydGllcy5nZXQoXCJ0aXRsZVwiKSovXCJzY29yZXNoZWV0Lm1kXCIpO1xyXG4gICAgICBcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGZpbGUgYXMgVEZpbGUpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBsZXQgc2hlZXQgPSBcIiMgU2NvcmUgU2hlZXQgZm9yIFwiK3RoaXMuZ3JhZGVTZXQucHJvcGVydGllcy5nZXQoXCJ0aXRsZVwiKStcIlxcblxcblwiO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBsZXQgZmlyc3QgPSBmYWxzZTtcclxuICAgICAgICAgIHNoZWV0ICs9IGB8ICB8IGA7XHJcbiAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8NzsgaSsrKSBzaGVldCArPSBcIiZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3AmbmJzcDsgfFwiO1xyXG4gICAgICAgICAgc2hlZXQgKz0gXCJcXG5cIjtcclxuICAgICAgICAgIHNoZWV0ICs9IGB8Oi0tLXw6LS0tfDotLS18Oi0tLXw6LS0tfDotLS18Oi0tLXw6LS0tfFxcbmA7XHJcbiAgICAgICAgICB0aGlzLmdyYWRlU2V0LnN0dWRlbnRzLmZvckVhY2goIChzdHVkOiBTdHVkZW50KSA9PiB7XHJcbiAgICAgICAgICAgICBzaGVldCArPSBgfCAke3N0dWQuZGF0YS5nZXQoXCJuYW1lXCIpfSB8IGA7XHJcbiAgICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8NzsgaSsrKSBzaGVldCArPSBcIiZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3AmbmJzcDsgfFwiO1xyXG4gICAgICAgICAgICAgc2hlZXQgKz0gXCJcXG5cIjtcclxuICAgICAgICAgICAgIGlmIChmaXJzdCkge1xyXG4gICAgICAgICAgICAgICAgc2hlZXQgKz0gYHw6LS0tfDotLS18Oi0tLXw6LS0tfDotLS18Oi0tLXw6LS0tfDotLS18XFxuYDtcclxuICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aGlzLmFwcC52YXVsdC5tb2RpZnkoZmlsZSwgc2hlZXQpO1xyXG4gICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIG1lbnVcclxuICAgIC5hZGRJdGVtKChpdGVtKSA9PiB7XHJcbiAgICAgIGl0ZW1cclxuICAgICAgLnNldFRpdGxlKCdHcmlkIHZpZXcnKVxyXG4gICAgICAuc2V0SWNvbignbHVjaWRlLWdyaXAnKVxyXG4gICAgICAuc2V0U2VjdGlvbigncGFuZScpXHJcbiAgICAgIC5vbkNsaWNrKCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5KCk7XHJcbiAgICAgIH1cclxuICAgICl9KTtcclxuICAgIG1lbnVcclxuICAgIC5hZGRJdGVtKChpdGVtKSA9PiB7XHJcbiAgICAgaXRlbVxyXG4gICAgICAuc2V0VGl0bGUoJ0xpc3QgdmlldycpXHJcbiAgICAgIC5zZXRJY29uKCdsdWNpZGUtbGF5b3V0LWxpc3QnKVxyXG4gICAgICAuc2V0U2VjdGlvbigncGFuZScpXHJcbiAgICAgIC5vbkNsaWNrKCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TGlzdCgpO1xyXG4gICAgICB9XHJcbiAgICApfSk7XHJcbiAgICBtZW51XHJcbiAgICAuYWRkSXRlbSgoaXRlbSkgPT4ge1xyXG4gICAgIGl0ZW1cclxuICAgICAgLnNldFRpdGxlKCdBZGQgYSByZW1pbmRlcicpXHJcbiAgICAgIC5zZXRJY29uKCdsdWNpZGUtbGF5b3V0LWxpc3QnKVxyXG4gICAgICAuc2V0U2VjdGlvbigncGFuZScpXHJcbiAgICAgIC5vbkNsaWNrKCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbmV3IE5ld1JlbWluZGVyTW9kYWwodGhpcy5hcHAsIChyZW1pbmRlcjogUmVtaW5kZXIpID0+IHtcclxuICAgICAgICAgIGlmIChyZW1pbmRlciAhPT0gdW5kZWZpbmVkKSB0aGlzLmdyYWRlU2V0LmFkZFJlbWluZGVyKHJlbWluZGVyKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ3JhZGVTZXQucmVtaW5kZXJzKTtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xyXG4gICAgICAgIH0pLm9wZW4oKTtcclxuICAgICAgfVxyXG4gICAgKX0pO1xyXG4gICAgbWVudVxyXG4gICAgLmFkZEl0ZW0oKGl0ZW0pID0+IHtcclxuICAgICBpdGVtXHJcbiAgICAgIC5zZXRUaXRsZSgnR2VuZXJhdGUgcHJpbnRhYmxlcycpXHJcbiAgICAgIC5zZXRJY29uKCdsdWNpZGUtbGF5b3V0LWxpc3QnKVxyXG4gICAgICAuc2V0U2VjdGlvbigncGFuZScpXHJcbiAgICAgIC5vbkNsaWNrKCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IHRoaXMucGx1Z2luLnNldHRpbmdzLnRlbXBsYXRlO1xyXG4gICAgICAgICAgaWYgKHRlbXBsYXRlICE9PSB1bmRlZmluZWQgJiYgdGVtcGxhdGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gdGVtcGxhdGUuaW5kZXhPZih0aGlzLmFwcC52YXVsdC5hZGFwdGVyLmJhc2VQYXRoKTtcclxuICAgICAgICAgICAgaWYgKHBvcyA+PSAwKSB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UodGhpcy5hcHAudmF1bHQuYWRhcHRlci5iYXNlUGF0aCtcIlxcXFxcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZSgvXFxcXC9nLCBcIi9cIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRlbXBsYXRlKTtcclxuICAgICAgICAgICAgbGV0IHRmaWxlID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKHRlbXBsYXRlKSBhcyBURmlsZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGZpbGUpO1xyXG4gICAgICAgICAgICBpZiAodGVtcGxhdGUgIT09IG51bGwpIFxyXG4gICAgICAgICAgICAgICB0ZW1wbGF0ZSA9ICBhd2FpdCBhcHAudmF1bHQucmVhZCggdGZpbGUgKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGUgPSBcIlwiO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGVtcGxhdGUgPSBcIlwiO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIEhlcmUgd2UgZW1haWwgdGhlIHN0dWRlbnQgbm90ZVxyXG4gICAgICAgICAgY29uc3QgZmlsZTogVEZpbGUgPSBhd2FpdCAoXHJcbiAgICAgICAgICAgIGFwcC5maWxlTWFuYWdlciBhcyBhbnlcclxuICAgICAgICAgICAgKS5jcmVhdGVOZXdNYXJrZG93bkZpbGUoYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVGaWxlKCk/LnBhdGgsIC8qdGhpcy5ncmFkZVNldC5wcm9wZXJ0aWVzLmdldChcInRpdGxlXCIpKi9cInN0dWRlbnRwYWdlcy5tZFwiKTsgIFxyXG4gICAgICAgICAgY29uc3Qgc2VtYXBob3JlID0gbmV3IFNlbWFwaG9yZSgxKTtcclxuICAgICAgICAgIHRoaXMuZ3JhZGVTZXQuc3R1ZGVudHMuZm9yRWFjaCggKHN0dWQ6IFN0dWRlbnQpID0+IHtcclxuICAgICAgICAgICAgc2VtYXBob3JlLmNhbGxGdW5jdGlvbiggYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGxldCBzdHVkZW50Tm90ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgaWYgKHRlbXBsYXRlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHN0dWRlbnROb3RlID0gKG5ldyBUZW1wbGF0ZSh0aGlzLmdyYWRlU2V0KSkucHJvY2Vzcyh0ZW1wbGF0ZSwgc3R1ZCk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0dWRlbnROb3RlID0gc3R1ZC5nZW5lcmF0ZU1hcmtkb3duKHRoaXMuZ3JhZGVTZXQpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5hcHAudmF1bHQuYXBwZW5kKGZpbGUsICdcXG5cXG48ZGl2IHN0eWxlPVwicGFnZS1icmVhay1hZnRlcjogYWx3YXlzO1wiPjwvZGl2PlxcblxcbicpO1xyXG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLmFwcC52YXVsdC5hcHBlbmQoZmlsZSwgc3R1ZGVudE5vdGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gICAgbWVudVxyXG5cdFx0ICAuYWRkSXRlbSgoaXRlbSkgPT4ge1xyXG5cdFx0XHRpdGVtXHJcblx0XHRcdCAgLnNldFRpdGxlKCdBZGQgYSBzdHVkZW50JylcclxuXHRcdFx0ICAuc2V0SWNvbignbHVjaWRlLXNtaWxlLXBsdXMnKVxyXG5cdFx0XHQgIC5zZXRTZWN0aW9uKCdwYW5lJylcclxuXHRcdFx0ICAub25DbGljayggKCkgPT4ge1xyXG4gICAgICAgICAgbmV3IE5ld1N0dWRlbnRNb2RhbCh0aGlzLmFwcCwgYXN5bmMgKHN0dWRlbnQ6IFN0dWRlbnQpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc3R1ZGVudEZpbGU6IFRGaWxlID0gYXdhaXQgKFxyXG4gICAgICAgICAgICAgIGFwcC5maWxlTWFuYWdlciBhcyBhbnlcclxuICAgICAgICAgICAgICApLmNyZWF0ZU5ld01hcmtkb3duRmlsZSh0aGlzLmdyYWRlU2V0LnNvdXJjZUZvbGRlciwgc3R1ZGVudC5kYXRhLmdldChcImlkXCIpKTtcclxuICAgICAgICAgICAgdmFyIGRhdGFzdHIgPSBcIiNuYW1lIFwiK3N0dWRlbnQuZGF0YS5nZXQoXCJuYW1lXCIpK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgIFwiI2lkIFwiK3N0dWRlbnQuZGF0YS5nZXQoXCJpZFwiKStcIlxcblwiO1xyXG4gICAgICAgICAgICBpZiAoc3R1ZGVudC5kYXRhLmdldChcIm5pY2tuYW1lXCIpICE9PSB1bmRlZmluZWQpIFxyXG4gICAgICAgICAgICAgICBkYXRhc3RyICs9IFwiI25pY2tuYW1lIFwiK3N0dWRlbnQuZGF0YS5nZXQoXCJuaWNrbmFtZVwiKStcIlxcblwiO1xyXG4gICAgICAgICAgICBpZiAoc3R1ZGVudC5kYXRhLmdldChcImVtYWlsYWRkcmVzc1wiKSAhPT0gdW5kZWZpbmVkKSBcclxuICAgICAgICAgICAgICAgZGF0YXN0ciArPSBcIiNlbWFpbGFkZHJlc3MgXCIrc3R1ZGVudC5kYXRhLmdldChcImVtYWlsYWRkcmVzc1wiKStcIlxcblwiO1xyXG4gICAgICAgICAgICBpZiAoc3R1ZGVudC5kYXRhLmdldChcIm1vYmlsZVBob25lTnVtYmVyXCIpICE9PSB1bmRlZmluZWQpIFxyXG4gICAgICAgICAgICAgICBkYXRhc3RyICs9IFwiI21vYmlsZVBob25lTnVtYmVyIFwiK3N0dWRlbnQuZGF0YS5nZXQoXCJtb2JpbGVQaG9uZU51bWJlclwiKStcIlxcblwiOyAgXHJcbiAgICAgICAgICAgIGxldCBpbWFnZXVybCA9IHRoaXMucGx1Z2luLnNldHRpbmdzLnVybDtcclxuICAgICAgICAgICAgaW1hZ2V1cmwgPSBpbWFnZXVybC5yZXBsYWNlKFwiJWlkJVwiLCBcIjAwMFwiK3N0dWRlbnQuZGF0YS5nZXQoXCJpZFwiKSk7XHJcbiAgICAgICAgICAgIGRhdGFzdHIgKz0gXCIjaW1hZ2UgXCIraW1hZ2V1cmwrXCJcXG5cIjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YXN0cikgICAgICBcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uYXBwLnZhdWx0LmFwcGVuZChzdHVkZW50RmlsZSwgZGF0YXN0cik7XHJcbiAgICAgICAgICAgIHN0dWRlbnQuc2V0U291cmNlRmlsZShzdHVkZW50RmlsZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JhZGVTZXQuYWRkU3R1ZGVudChzdHVkZW50KTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzYmFyRWxlbWVudC5zZXRUZXh0KFwiXCIrdGhpcy5ncmFkZVNldC5nZXRTdHVkZW50cygpK1wiIHN0dWRlbnRzXCIpOyAgICBcclxuICAgICAgICAgIH0pLm9wZW4oKTtcclxuICAgIFxyXG4gXHRcdFx0ICB9KTtcclxuXHRcdCAgfSk7XHJcbiAgICAgIG1lbnVcclxuXHRcdCAgLmFkZEl0ZW0oKGl0ZW0pID0+IHtcclxuXHRcdFx0aXRlbVxyXG5cdFx0XHQgIC5zZXRUaXRsZSgnSW1wb3J0IGRhdGEnKVxyXG5cdFx0XHQgIC5zZXRJY29uKCdsdWNpZGUtZmlsZS10ZXh0JylcclxuXHRcdFx0ICAuc2V0U2VjdGlvbigncGFuZScpXHJcblx0XHRcdCAgLm9uQ2xpY2soICgpID0+IHtcclxuICAgICAgICAgIC8vIENob29zZSBhIGZpbGVcclxuICAgICAgICAgICAgY29uc3QgbW9kYWwgPSBuZXcgRmlsZVNlbGVjdG9yTW9kYWwodGhpcy5hcHAsIHRoaXMuZ3JhZGVTZXQsIHRoaXMuQ1NWaW1wb3J0KTtcclxuICAgICAgICAgICAgbW9kYWwub3BlbigpO1xyXG5cclxuIFx0XHRcdCAgfSk7XHJcblx0XHQgIH0pO1xyXG4gICAgICBtZW51XHJcblx0XHQgIC5hZGRJdGVtKChpdGVtKSA9PiB7XHJcblx0XHRcdGl0ZW1cclxuXHRcdFx0ICAuc2V0VGl0bGUoJ0Fib3V0JylcclxuXHRcdFx0ICAuc2V0SWNvbignbHVjaWRlLWZpbGUtdGV4dCcpXHJcblx0XHRcdCAgLnNldFNlY3Rpb24oJ3BhbmUnKVxyXG5cdFx0XHQgIC5vbkNsaWNrKCAoKSA9PiB7XHJcbiAgICAgICAgICAvLyBDaG9vc2UgYSBmaWxlXHJcbiAgICAgICAgICBuZXcgQWxlcnQodGhpcy5wbHVnaW4sIGBBYm91dCAke3RoaXMucGx1Z2luLnZlcnNpb259YCwgXCJHcmFkZUJveCBpcyBhIHBsdWdpbiBmb3IgT2JzaWRpYW4gQnVkZHlcIikub3BlbigpO1xyXG4gXHRcdFx0ICB9KTtcclxuXHRcdCAgfSk7XHJcblxyXG4gICAgLy8gQWRkIGEgXCJDbG9zZVwiIGlmIHdlIGFyZSBvbiBhIG1vYmlsZSBkZXZpY2VcclxuICAgIGlmIChQbGF0Zm9ybS5pc01vYmlsZSkge1xyXG4gICAgICBtZW51XHJcbiAgICAgICAgLmFkZEl0ZW0oKGl0ZW0pID0+IHtcclxuICAgICAgICAgIGl0ZW1cclxuICAgICAgICAgICAgLnNldFRpdGxlKCdDbG9zZScpXHJcbiAgICAgICAgICAgIC5zZXRJY29uKCdjcm9zcycpXHJcbiAgICAgICAgICAgIC5vbkNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAgIFxyXG5cclxuICAgICAgaWYgKGNhbGxTdXBlcikge1xyXG4gICAgICAgIHN1cGVyLm9uUGFuZU1lbnUobWVudSwgc291cmNlKTtcclxuICAgICAgfVxyXG4gIFxyXG4gICAgfVxyXG5cclxuICBkaXNwbGF5KCkge1xyXG4gICAgY29uc29sZS5sb2coXCJESVNQTEFZSU5HLi4uY29sb3JpemVkID0gXCIrdGhpcy5jb2xvcml6ZWQpO1xyXG4gICAgdGhpcy5jb250YWluZXIuZW1wdHkoKTtcclxuICAgIHRoaXMuZGlzcGxheVRleHQgPSB0aGlzLnBsdWdpbi52ZXJzaW9uO1xyXG4gICAgY29uc3QgZGl2ID0gdGhpcy5jb250YWluZXIuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwidmlldy1zdHlsZVwiIH0pO1xyXG4gICAgbGV0IHdpZHRoID0gdGhpcy5jb250YWluZXJFbC53aW4uaW5uZXJXaWR0aDtcclxuICAgIGlmICh0aGlzLmdyYWRlU2V0ICE9IG51bGwpIHtcclxuICAgICAgdGhpcy5kaXNwbGF5VGV4dCA9IHRoaXMuZ3JhZGVTZXQucHJvcGVydGllcy5nZXQoXCJ0aXRsZVwiKTtcclxuICAgICAgaWYgKHRoaXMuY29sb3JpemVkKSB7XHJcbiAgICAgICAgdGhpcy5ncmFkZVNldC5kaXNwbGF5KGRpdiwgd2lkdGgsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvckRpdmlkZXIxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvckRpdmlkZXIyKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkRJU1BMQVk6IFwiK3RoaXMuZ3JhZGVTZXQucmVtaW5kZXJzKTtcclxuICAgICAgICB0aGlzLmdyYWRlU2V0LmRpc3BsYXkoZGl2LCB3aWR0aCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zdGF0dXNiYXJFbGVtZW50LnNldFRleHQoXCJcIit0aGlzLmdyYWRlU2V0LmdldFN0dWRlbnRzKCkrXCIgc3R1ZGVudHNcIik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5TGlzdCgpIHtcclxuICAgIHRoaXMuY29udGFpbmVyLmVtcHR5KCk7XHJcbiAgICB0aGlzLmRpc3BsYXlUZXh0ID0gdGhpcy5wbHVnaW4udmVyc2lvbjtcclxuICAgIGNvbnN0IGRpdiA9IHRoaXMuY29udGFpbmVyLmNyZWF0ZUVsKFwiZGl2XCIsIHsgY2xzOiBcInZpZXctc3R5bGVcIiB9KTtcclxuICAgIGxldCB3aWR0aCA9IHRoaXMuY29udGFpbmVyRWwud2luLmlubmVyV2lkdGg7XHJcbiAgICBpZiAodGhpcy5ncmFkZVNldCAhPSBudWxsKSB7XHJcbiAgICAgIHRoaXMuZGlzcGxheVRleHQgPSB0aGlzLmdyYWRlU2V0LnByb3BlcnRpZXMuZ2V0KFwidGl0bGVcIik7XHJcbiAgICAgIHRoaXMuZ3JhZGVTZXQuZGlzcGxheUxpc3QoZGl2LCB3aWR0aCk7XHJcbiAgICAgIHRoaXMuc3RhdHVzYmFyRWxlbWVudC5zZXRUZXh0KFwiXCIrdGhpcy5ncmFkZVNldC5nZXRTdHVkZW50cygpK1wiIHN0dWRlbnRzXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2xlYXIoKSB7XHJcblxyXG4gIH1cclxuXHJcblxyXG59XHJcblxyXG5jbGFzcyBGaWxlU2VsZWN0b3JNb2RhbCBleHRlbmRzIE1vZGFsIHtcclxuXHRcclxuICBjYWxsYmFja09uQ2xvc2U7XHJcblxyXG4gIGNhbGxlcjogT2JqZWN0O1xyXG4gIGhhbmRsZXI6IEZ1bmN0aW9uO1xyXG4gIGdyYWRlU2V0OiBHcmFkZVNldDtcclxuICB2aWV3OiBHcmFkZWJveFZpZXc7XHJcblxyXG5jb25zdHJ1Y3RvcihhcHA6IEFwcCwgZ3M6IEdyYWRlU2V0LCBjYWxsYmFja09uQ2xvc2U6ICh2aWV3OiBHcmFkZWJveFZpZXcsIGdzOiBHcmFkZVNldCwgZmlsZTogc3RyaW5nKSA9PiB2b2lkKSB7XHJcbiAgc3VwZXIoYXBwKTtcclxuXHJcbiAgICAgIHRoaXMuY2FsbGJhY2tPbkNsb3NlID0gY2FsbGJhY2tPbkNsb3NlO1xyXG4gICAgICB0aGlzLmdyYWRlU2V0ID0gZ3M7XHJcbn1cclxuXHJcbm9uT3BlbigpIHtcclxuICAgIGNvbnN0IHNldHRpbmcxID0gbmV3IFNldHRpbmcodGhpcy5jb250ZW50RWwpLnNldE5hbWUoXCJDaG9vc2UgQ1NWIEZpbGVcIikuc2V0RGVzYyhcIkNob29zZSBDU1YgZGF0YSBmaWxlIHRvIGltcG9ydFwiKTtcclxuICAgIGNvbnN0IGlucHV0RGF0YUZpbGUgPSBzZXR0aW5nMS5jb250cm9sRWwuY3JlYXRlRWwoXCJpbnB1dFwiLCB7XHJcbiAgICAgICAgYXR0cjoge1xyXG4gICAgICAgICAgdHlwZTogXCJmaWxlXCIsXHJcbiAgICAgICAgICBtdWx0aXBsZTogZmFsc2UsXHJcbiAgICAgICAgICAvL2FjY2VwdDogXCIuanNvbiwuY3N2LC50c3ZcIlxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHNldHRpbmc1ID0gbmV3IFNldHRpbmcodGhpcy5jb250ZW50RWwpLnNldE5hbWUoXCJJbXBvcnRcIikuc2V0RGVzYyhcIlByZXNzIHRvIHN0YXJ0IHRoZSBJbXBvcnQgUHJvY2Vzc1wiKTtcclxuICAgIGNvbnN0IGlucHV0NSA9IHNldHRpbmc1LmNvbnRyb2xFbC5jcmVhdGVFbChcImJ1dHRvblwiKTtcclxuICAgIGlucHV0NS50ZXh0Q29udGVudCA9IFwiSW1wb3J0XCI7XHJcblxyXG4gICAgaW5wdXQ1Lm9uY2xpY2sgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGlucHV0RGF0YUZpbGUuZmlsZXNbMF0pO1xyXG4gICAgICB0aGlzLmNhbGxiYWNrT25DbG9zZSh0aGlzLnZpZXcsIHRoaXMuZ3JhZGVTZXQsIGlucHV0RGF0YUZpbGUuZmlsZXNbMF0ucGF0aCk7XHJcbiAgICBcclxuICAgICAgbmV3IE5vdGljZShcIkltcG9ydCBGaW5pc2hlZFwiKTtcclxuICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICB0aGlzLnZpZXcuZGlzcGxheSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25DbG9zZSgpIHtcclxuICAgIGxldCB7Y29udGVudEVsfSA9IHRoaXM7XHJcbiAgICBjb250ZW50RWwuZW1wdHkoKTtcclxuICB9XHJcblxyXG59IiwiaW1wb3J0IHsgQXBwLCBCdXR0b25Db21wb25lbnQsIERyb3Bkb3duQ29tcG9uZW50LCBNb2RhbCwgU2V0dGluZywgVEZpbGUsIFRleHRGaWxlVmlldywgVG9nZ2xlQ29tcG9uZW50LCBXb3Jrc3BhY2VMZWFmIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5cbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSBcImRhdGEvQ2F0ZWdvcnlcIjtcbmltcG9ydCB7IENvdW50ZXIgfSBmcm9tIFwiZGF0YS9Db3VudGVyXCI7XG5pbXBvcnQgeyBHcmFkZVNldCB9IGZyb20gXCJkYXRhL0dyYWRlU2V0XCI7XG5pbXBvcnQgeyBTY29yZSB9IGZyb20gXCJkYXRhL1Njb3JlXCI7XG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcImRhdGEvU3R1ZGVudFwiO1xuXG5leHBvcnQgY2xhc3MgUmVjZW50RmlsZXNNb2RhbCBleHRlbmRzIE1vZGFsIHtcblxuICAgIGNhbGxiYWNrT25DbG9zZTtcbiAgICBmaWxlMTogc3RyaW5nO1xuICAgIGZpbGUyOiBzdHJpbmc7XG4gICAgZmlsZTM6IHN0cmluZztcbiAgICBncmFkZVNldDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHAsIFxuICAgICAgICAgICAgICAgIGZpbGUxOiBzdHJpbmcsIGZpbGUyOiBzdHJpbmcsIGZpbGUzOiBzdHJpbmcsIFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrT25DbG9zZTogKGZpbGVQYXRoOiBzdHJpbmcpID0+IHZvaWQpIHtcblx0XHRzdXBlcihhcHApO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5maWxlMSA9IGZpbGUxO1xuICAgICAgICB0aGlzLmZpbGUyID0gZmlsZTI7XG4gICAgICAgIHRoaXMuZmlsZTMgPSBmaWxlMztcbiAgICAgICAgdGhpcy5jYWxsYmFja09uQ2xvc2UgPSBjYWxsYmFja09uQ2xvc2U7XG5cbiAgICAgICAgdGhpcy5ncmFkZVNldCA9IHRoaXMuZmlsZTE7XG5cdH1cblxuXHRvbk9wZW4oKSB7XG5cdFx0bGV0IHtjb250ZW50RWx9ID0gdGhpcztcblx0XHRcbiAgICAgICAgY29udGVudEVsLmNyZWF0ZUVsKFwiZm9ybVwiLCB7fSwgKGZvcm0pID0+IHtcblxuICAgICAgICBmb3JtLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiAnQ2hvb3NlIGEgR3JhZGVTZXQnIH0pO1xuICAgICAgICBmb3JtLmNyZWF0ZUVsKFwiaHJcIik7XG5cbiAgICAgICAgbGV0IGZpbGVzRHJvcGRvd24gPSBuZXcgRHJvcGRvd25Db21wb25lbnQoZm9ybSlcbiAgICAgICAgICAgIC5hZGRPcHRpb24odGhpcy5maWxlMSwgdGhpcy5maWxlMSlcbiAgICAgICAgICAgIC5hZGRPcHRpb24odGhpcy5maWxlMiwgdGhpcy5maWxlMilcbiAgICAgICAgICAgIC5hZGRPcHRpb24odGhpcy5maWxlMywgdGhpcy5maWxlMylcbiAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdyYWRlU2V0ID0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgXG5cbiAgICAgICAgZm9ybS5jcmVhdGVFbChcImhyXCIpO1xuXG4gICAgICAgIG5ldyBCdXR0b25Db21wb25lbnQoZm9ybSlcbiAgICAgICAgICAgIC5zZXRCdXR0b25UZXh0KFwiT3BlblwiKVxuICAgICAgICAgICAgLnNldEN0YSgpXG4gICAgICAgICAgICAub25DbGljayggKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrT25DbG9zZSh0aGlzLmdyYWRlU2V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVx0XG5cbiAgICB9XG5cbiAgICBvbkNsb3NlKCkge1xuXHRcdGNvbnN0IHtjb250ZW50RWx9ID0gdGhpcztcblx0XHRjb250ZW50RWwuZW1wdHkoKTtcblx0fVxuXG59IiwiLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vL1xyXG4vLyBHcmFkZUJveCBwbHVnaW4gZm9yIE9ic2lkaWFuXHJcbi8vXHJcbi8vIE1pa2UgSmlwcGluZywgU3ByaW5nIDIwMjRcclxuLy9cclxuLy8gQXMgYSB3YXkgdG8gbGVhcm4gcGx1Z2lucyBmb3IgT2JzaWRpYW4gYW5kIEphdmFzY3JpcHQsIHRoaXMgcGx1Z2luIHdhcyB3cml0dGVuLiAgXHJcbi8vIFNldmVyYWwgY29uY2VwdHVhbCBjaGFsbGVuZ2VzOiBzaG91bGQgcGx1Z2lucyBiZSB0aGlzIGJpZz8gIHNob3VsZCBwbHVnaW5zIFxyXG4vLyByZXByZXNlbnQgYW4gZW50aXJlIGFwcD8gIHdoYXQgd291bGQgYSBzY29yZSBrZWVwaW5nIHByb2dyYW0gbG9vayBsaWtlIGlmIGl0XHJcbi8vIHdlcmUgYmFzZWQgb24gbm90ZXM/XHJcblxyXG5pbXBvcnQge1xyXG5cdCAgICAgQXBwLFxyXG5cdCAgICAgRHJvcGRvd25Db21wb25lbnQsXHJcblx0ICAgICBNZW51LFxyXG5cdCAgICAgTW9kYWwsXHJcblx0ICAgICBOb3RpY2UsXHJcblx0ICAgICBQbHVnaW4sXHJcblx0ICAgICBQbHVnaW5TZXR0aW5nVGFiLFxyXG5cdCAgICAgU2V0dGluZyxcclxuXHQgICAgIFRBYnN0cmFjdEZpbGUsXHJcblx0ICAgICBURmlsZSxcclxuXHQgICAgIFRGb2xkZXIsXHJcblx0ICAgICBUZXh0Q29tcG9uZW50LFxyXG5cdCAgICAgVmlld1N0YXRlLFxyXG5cdCAgICAgV29ya3NwYWNlTGVhZlxyXG59IGZyb20gJ29ic2lkaWFuJztcclxuaW1wb3J0IHsgR3JhZGVTZXRTdW1tYXJ5VmlldywgVklFV19UWVBFX0dSQURFU0VUX1NVTU1BUlkgfSBmcm9tIFwiLi9HcmFkZVNldFN1bW1hcnlWaWV3XCI7XHJcbmltcG9ydCB7IEdyYWRlYm94VmlldywgVklFV19UWVBFX0dSQURFQk9YIH0gZnJvbSBcIi4vR3JhZGVib3hWaWV3XCI7XHJcbmltcG9ydCB7IFN0dWRlbnRWaWV3LCBWSUVXX1RZUEVfU1RVREVOVCB9IGZyb20gXCIuL1N0dWRlbnRWaWV3XCJcclxuXHJcbmltcG9ydCB7IERpYWxvZyB9IGZyb20gJy4vdXRpbGl0aWVzL0RpYWxvZydcclxuaW1wb3J0IHsgR3JhZGVTZXQgfSBmcm9tIFwiLi9kYXRhL0dyYWRlU2V0XCI7XHJcbmltcG9ydCB7IE5ld0dyYWRlU2V0TW9kYWwwIH0gZnJvbSBcIi4vbW9kYWxzL05ld0dyYWRlU2V0TW9kYWxcIjtcclxuaW1wb3J0IHsgUmVjZW50RmlsZXNNb2RhbCB9IGZyb20gXCIuL21vZGFscy9SZWNlbnRGaWxlc01vZGFsXCI7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi9kYXRhL1N0dWRlbnRcIjtcclxuaW1wb3J0IHNlcnZpY2VzIGZyb20gJy4vc2VydmljZXMuanNvbic7XHJcblxyXG5pbnRlcmZhY2UgR3JhZGVCb3hQbHVnaW5TZXR0aW5ncyB7XHJcblx0bnVtYmVyT2ZSZWNlbnRGaWxlczogc3RyaW5nO1xyXG5cdHVybDogc3RyaW5nO1xyXG5cdHRlbXBsYXRlOiBzdHJpbmc7XHJcblx0Y29sb3JEaXZpZGVyMTogc3RyaW5nO1xyXG5cdGNvbG9yRGl2aWRlcjI6IHN0cmluZztcclxuXHJcblx0dXNlQXV0aGVudGljYXRpb246IGJvb2xlYW47XHJcblx0dXNlcm5hbWU6IHN0cmluZztcclxuXHRwYXNzd29yZDogc3RyaW5nO1xyXG5cdHNtdHBob3N0OiBzdHJpbmc7XHJcblx0c210cHBvcnQ6IHN0cmluZztcclxuXHRlbmNyeXB0aW9uOiBzdHJpbmc7XHJcblx0cmVjZWl2ZXI6IHN0cmluZztcclxuXHRmcm9tOiBzdHJpbmc7XHJcblx0ZGVmYXVsdHRvOiBzdHJpbmc7XHJcblx0c3ViamVjdDogc3RyaW5nO1xyXG5cdHNlcnZpY2U6IHN0cmluZztcclxuXHRzZWN1cmU6IHN0cmluZztcclxuXHRkZWxheTogc3RyaW5nO1xyXG5cclxuXHRYTUxmaWxlbmFtZTogc3RyaW5nO1xyXG5cdHdoZW5Ub0dlbmVyYXRlOiBzdHJpbmc7XHJcblxyXG5cdHJlY2VudEZpbGUxOiBzdHJpbmc7XHJcblx0cmVjZW50RmlsZTI6IHN0cmluZztcclxuXHRyZWNlbnRGaWxlMzogc3RyaW5nO1xyXG5cclxufVxyXG5cclxuY29uc3QgREVGQVVMVF9TRVRUSU5HUzogR3JhZGVCb3hQbHVnaW5TZXR0aW5ncyA9IHtcclxuXHRudW1iZXJPZlJlY2VudEZpbGVzOiBcIjNcIixcclxuXHR1cmw6ICcnLFxyXG5cdHRlbXBsYXRlOiAnJyxcclxuXHRjb2xvckRpdmlkZXIxOiBcIjkwXCIsXHJcblx0Y29sb3JEaXZpZGVyMjogXCI2MFwiLFxyXG5cclxuXHR1c2VBdXRoZW50aWNhdGlvbjogZmFsc2UsXHJcblx0dXNlcm5hbWU6ICdub2JvZHknLFxyXG5cdHBhc3N3b3JkOiAnJyxcclxuXHRzbXRwaG9zdDogJ3NtdHAuZ21haWwuY29tJyxcclxuXHRzbXRwcG9ydDogXCI0NjVcIixcclxuXHRlbmNyeXB0aW9uOiBcIk5vbmVcIixcclxuXHRyZWNlaXZlcjogXCJcIixcclxuXHRmcm9tOiBcIlwiLFxyXG5cdGRlZmF1bHR0bzogJycsXHJcblx0c3ViamVjdDogXCJcIixcclxuXHRzZXJ2aWNlOiBcIlwiLFxyXG5cdHNlY3VyZTogXCJOb25lXCIsXHJcblx0ZGVsYXk6IFwiMTBcIixcclxuXHJcblx0WE1MZmlsZW5hbWU6IFwiZ3JhZGVzLnhtbFwiLFxyXG5cdHdoZW5Ub0dlbmVyYXRlOiBcImNsb3NlXCIsXHJcblxyXG5cdHJlY2VudEZpbGUxOiBcIlwiLFxyXG5cdHJlY2VudEZpbGUyOiBcIlwiLFxyXG5cdHJlY2VudEZpbGUzOiBcIlwiLFxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYWRlYm94UGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcclxuXHJcblx0c2V0dGluZ3M6IEdyYWRlQm94UGx1Z2luU2V0dGluZ3M7XHJcblx0XHJcblx0Y3VycmVudFN0dWRlbnQ6IFN0dWRlbnQ7XHJcblx0Z3JhZGVTZXQ6IEdyYWRlU2V0O1xyXG5cclxuXHRncmFkZUJveFZpZXcgOiBHcmFkZWJveFZpZXc7XHJcblxyXG5cdHZlcnNpb246IHN0cmluZyA9IFwiMS4xLjIgKDExMTcyMylcIjtcclxuXHJcblx0cm90YXRlUmVjZW50RmlsZXMoZmlsZVBhdGg6IHN0cmluZykge1xyXG5cdFx0aWYgKGZpbGVQYXRoLmxlbmd0aCA9PSAwKSByZXR1cm47XHJcblxyXG5cdFx0aWYgKGZpbGVQYXRoID09PSB0aGlzLnNldHRpbmdzLnJlY2VudEZpbGUxKSByZXR1cm47XHJcblx0XHRpZiAoZmlsZVBhdGggPT09IHRoaXMuc2V0dGluZ3MucmVjZW50RmlsZTIpIHJldHVybjtcclxuXHRcdGlmIChmaWxlUGF0aCA9PT0gdGhpcy5zZXR0aW5ncy5yZWNlbnRGaWxlMykgcmV0dXJuO1xyXG5cdFx0XHRcdFx0XHJcblx0XHR0aGlzLnNldHRpbmdzLnJlY2VudEZpbGUzID0gdGhpcy5zZXR0aW5ncy5yZWNlbnRGaWxlMjtcclxuXHRcdHRoaXMuc2V0dGluZ3MucmVjZW50RmlsZTIgPSB0aGlzLnNldHRpbmdzLnJlY2VudEZpbGUxO1xyXG5cdFx0dGhpcy5zZXR0aW5ncy5yZWNlbnRGaWxlMSA9IGZpbGVQYXRoO1xyXG5cclxuXHRcdHRoaXMuc2F2ZVNldHRpbmdzKCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBvbmxvYWQoKSB7XHJcblx0XHRjb25zb2xlLmxvZygnbG9hZGluZyBwbHVnaW4nKTtcclxuXHJcblx0XHRhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xyXG5cclxuXHRcdHRoaXMucmVnaXN0ZXJWaWV3KFxyXG5cdFx0XHRWSUVXX1RZUEVfR1JBREVCT1gsXHJcblx0XHRcdChsZWFmKSA9PiBuZXcgR3JhZGVib3hWaWV3KGxlYWYsIHRoaXMpXHJcblx0XHQgICk7XHQgIFxyXG5cdFx0dGhpcy5yZWdpc3RlclZpZXcoXHJcblx0XHRcdFZJRVdfVFlQRV9HUkFERVNFVF9TVU1NQVJZLFxyXG5cdFx0XHQobGVhZikgPT4gbmV3IEdyYWRlU2V0U3VtbWFyeVZpZXcobGVhZiwgdGhpcylcclxuXHRcdCAgKTtcdFxyXG5cdFx0dGhpcy5yZWdpc3RlclZpZXcoXHJcblx0XHRcdFZJRVdfVFlQRV9TVFVERU5ULFxyXG5cdFx0XHQobGVhZikgPT4gbmV3IFN0dWRlbnRWaWV3KGxlYWYsIHRoaXMsIG51bGwpXHJcblx0XHQgICk7XHJcblx0XHQgIFxyXG5cdFx0Y29uc3QgcmliYm9uSWNvbkVsID0gdGhpcy5hZGRSaWJib25JY29uKCdwYWNrYWdlLW9wZW4nLCAnR3JhZGVCb3ggUGx1Z2luJywgKGV2dDogTW91c2VFdmVudCkgPT4ge1xyXG5cdFx0XHRuZXcgUmVjZW50RmlsZXNNb2RhbCh0aGlzLmFwcCwgdGhpcy5zZXR0aW5ncy5yZWNlbnRGaWxlMSwgdGhpcy5zZXR0aW5ncy5yZWNlbnRGaWxlMiwgdGhpcy5zZXR0aW5ncy5yZWNlbnRGaWxlMywgYXN5bmMgKGZpbGVQYXRoOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0XHRjb25zdCBmb2xkZXIgPSB0aGlzLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoZmlsZVBhdGgpIGFzIFRGb2xkZXI7XHJcblx0XHRcdFx0dGhpcy5yb3RhdGVSZWNlbnRGaWxlcyhmaWxlUGF0aCk7XHJcblx0XHRcdFx0dGhpcy5vcGVuR3JhZGVTZXQoZm9sZGVyKTtcclxuXHRcdFx0fSkub3BlbigpO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XHJcblx0XHRcdGlkOiAnb3Blbi1ncmFkZXNldCcsXHJcblx0XHRcdG5hbWU6ICdPcGVuIEdyYWRlU2V0JyxcclxuXHRcdFx0Y2FsbGJhY2s6ICgpID0+IHtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdFxyXG5cdFx0dGhpcy5yZWdpc3RlckV2ZW50KFxyXG5cdFx0XHR0aGlzLmFwcC53b3Jrc3BhY2Uub24oXCJmaWxlLW1lbnVcIiwgKG1lbnUsIGZpbGUsIHNvdXJjZSwgdmlldykgPT4ge1xyXG5cdFx0XHRcdGlmIChmaWxlIGluc3RhbmNlb2YgVEZvbGRlcikge1xyXG5cdFx0XHRcdFx0bWVudS5hZGRJdGVtKChpdGVtKSA9PiB7XHJcblx0XHRcdFx0XHRcdGl0ZW1cclxuXHRcdFx0XHRcdFx0LnNldFRpdGxlKFwiT3BlbiBhcyBHcmFkZVNldFwiKVxyXG5cdFx0XHRcdFx0XHQuc2V0SWNvbihcInBhY2thZ2Utb3BlblwiKVxyXG5cdFx0XHRcdFx0XHQub25DbGljayhhc3luYyAoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5yb3RhdGVSZWNlbnRGaWxlcyhmaWxlLnBhdGgpO1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMub3BlbkdyYWRlU2V0KGZpbGUpXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0ICApO1xyXG5cclxuXHRcdHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgR3JhZGVCb3hTZXR0aW5nc1RhYih0aGlzLmFwcCwgdGhpcykpO1xyXG5cclxuXHRcdHRoaXMuZ3JhZGVCb3hWaWV3ID0gbnVsbDtcclxuXHR9XHJcblxyXG5cdG9udW5sb2FkKCkge1xyXG5cdFx0Y29uc29sZS5sb2coJ3VubG9hZGluZyBwbHVnaW4nKTtcclxuXHRcdHRoaXMuYXBwLndvcmtzcGFjZS5kZXRhY2hMZWF2ZXNPZlR5cGUoVklFV19UWVBFX1NUVURFTlQpO1xyXG5cdFx0dGhpcy5hcHAud29ya3NwYWNlLmRldGFjaExlYXZlc09mVHlwZShWSUVXX1RZUEVfR1JBREVTRVRfU1VNTUFSWSk7XHJcblx0XHR0aGlzLmFwcC53b3Jrc3BhY2UuZGV0YWNoTGVhdmVzT2ZUeXBlKFZJRVdfVFlQRV9HUkFERUJPWCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBsb2FkU2V0dGluZ3MoKSB7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9TRVRUSU5HUywgYXdhaXQgdGhpcy5sb2FkRGF0YSgpKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHNhdmVTZXR0aW5ncygpIHtcclxuXHRcdGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XHJcblx0fVxyXG5cclxuXHRmaWxlRXhpc3RzKGZpbGVOYW1lOiBzdHJpbmcsIGZvbGRlcjogVEZvbGRlcik6IEJvb2xlYW4ge1xyXG5cdFx0dmFyIHJlczogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdFx0bGV0IGZpbGUgPSBmb2xkZXIuY2hpbGRyZW4uZmluZChhZmlsZSA9PiBhZmlsZS5uYW1lID09PSBmaWxlTmFtZSk7XHJcblx0XHRyZXR1cm4gKGZpbGUgIT09IHVuZGVmaW5lZCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBvcGVuR3JhZGVTZXQoZm9sZGVyOiBURm9sZGVyKSB7XHJcblx0XHRpZiAoZm9sZGVyLmNoaWxkcmVuLmxlbmd0aCA9PSAwIHx8ICEgdGhpcy5maWxlRXhpc3RzKFwiQ0xBU1MubWRcIiwgZm9sZGVyKSkge1xyXG5cdFx0XHR0aGlzLm5ld0dyYWRlU2V0RmlsZShmb2xkZXIpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5ncmFkZVNldCA9IG5ldyBHcmFkZVNldCh0aGlzKTtcclxuXHRcdHRoaXMuZ3JhZGVTZXQuc2V0c291cmNlRm9sZGVyKGZvbGRlcik7XHJcblx0XHRpZiAoZm9sZGVyLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0Zm9sZGVyLmNoaWxkcmVuLmZvckVhY2goIGFzeW5jIChhYnNmaWxlOiBUQWJzdHJhY3RGaWxlLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcblx0XHRcdFx0bGV0IGZpbGUgPSBhYnNmaWxlIGFzIFRGaWxlO1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiUFJPQ0VTU0lORyBcIitmaWxlLm5hbWUpO1xyXG5cdFx0XHRcdGlmIChmaWxlLm5hbWUgIT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0XHRsZXQgZGF0YSA9IGF3YWl0IGFwcC52YXVsdC5yZWFkKCBmaWxlICk7XHJcblx0XHRcdFx0XHRpZiAoZmlsZS5uYW1lID09PSBcIkNMQVNTLm1kXCIpIHtcclxuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5ncmFkZVNldC5kZWZpbmVHcmFkZVNldChkYXRhLCBmb2xkZXIsIGZpbGUpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0aWYgKGZpbGUubmFtZS5lbmRzV2l0aChcIi5tZFwiKSlcclxuXHRcdFx0XHRcdFx0XHRhd2FpdCB0aGlzLmdyYWRlU2V0LmRlZmluZVN0dWRlbnQoZGF0YSwgZmlsZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5ncmFkZVNldCk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGluZGV4ID09IGZvbGRlci5jaGlsZHJlbi5sZW5ndGgtMSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmFwcC53b3Jrc3BhY2UuZGV0YWNoTGVhdmVzT2ZUeXBlKFZJRVdfVFlQRV9HUkFERUJPWCk7XHJcblx0XHRcdFx0XHRcdHRoaXMuYXBwLndvcmtzcGFjZS5kZXRhY2hMZWF2ZXNPZlR5cGUoVklFV19UWVBFX1NUVURFTlQpO1xyXG5cdFx0XHRcdFx0XHR0aGlzLmFwcC53b3Jrc3BhY2UuZGV0YWNoTGVhdmVzT2ZUeXBlKFZJRVdfVFlQRV9HUkFERVNFVF9TVU1NQVJZKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0dGhpcy5hcHAud29ya3NwYWNlLmdldExlYWYoKS5zZXRWaWV3U3RhdGUoe1xyXG5cdFx0XHRcdFx0XHRcdHR5cGU6IFZJRVdfVFlQRV9HUkFERUJPWCxcclxuXHRcdFx0XHRcdFx0XHRzdGF0ZTogeyBmb2xkZXI6IGZvbGRlciB9LFxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cdFx0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuYXBwLndvcmtzcGFjZS5kZXRhY2hMZWF2ZXNPZlR5cGUoVklFV19UWVBFX0dSQURFQk9YKTtcclxuXHRcdFx0dGhpcy5hcHAud29ya3NwYWNlLmRldGFjaExlYXZlc09mVHlwZShWSUVXX1RZUEVfU1RVREVOVCk7XHJcblx0XHRcdHRoaXMuYXBwLndvcmtzcGFjZS5kZXRhY2hMZWF2ZXNPZlR5cGUoVklFV19UWVBFX0dSQURFU0VUX1NVTU1BUlkpO1xyXG5cdFxyXG5cdFx0XHR0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0TGVhZigpLnNldFZpZXdTdGF0ZSh7XHJcblx0XHRcdFx0dHlwZTogVklFV19UWVBFX0dSQURFQk9YLFxyXG5cdFx0XHRcdHN0YXRlOiB7IGZvbGRlcjogZm9sZGVyIH0sXHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRhc3luYyBuZXdHcmFkZVNldEZpbGUoZm9sZGVyOiBURm9sZGVyKSB7XHJcblx0XHRjb25zdCB0YXJnZXRGb2xkZXIgPSBmb2xkZXJcclxuXHRcdCAgPyBmb2xkZXJcclxuXHRcdCAgOiBhcHAuZmlsZU1hbmFnZXIuZ2V0TmV3RmlsZVBhcmVudChcclxuXHRcdFx0ICBhcHAud29ya3NwYWNlLmdldEFjdGl2ZUZpbGUoKT8ucGF0aCB8fCAnJ1xyXG5cdFx0XHQpO1xyXG5cdFxyXG5cdFx0dHJ5IHtcclxuXHRcdCAgdGhpcy5hcHAud29ya3NwYWNlLmRldGFjaExlYXZlc09mVHlwZShWSUVXX1RZUEVfR1JBREVCT1gpO1xyXG5cdFx0ICB0aGlzLmFwcC53b3Jrc3BhY2UuZGV0YWNoTGVhdmVzT2ZUeXBlKFZJRVdfVFlQRV9TVFVERU5UKTtcclxuXHRcdCAgdGhpcy5hcHAud29ya3NwYWNlLmRldGFjaExlYXZlc09mVHlwZShWSUVXX1RZUEVfR1JBREVTRVRfU1VNTUFSWSk7XHJcblxyXG5cdFx0ICBjb25zdCBncmFkZXM6IFRGaWxlID0gYXdhaXQgKFxyXG5cdFx0XHRhcHAuZmlsZU1hbmFnZXIgYXMgYW55XHJcblx0XHQgICkuY3JlYXRlTmV3TWFya2Rvd25GaWxlKGZvbGRlciwgJ0NMQVNTJyk7XHJcblx0XHJcblx0XHQgIC8vbmV3IE5ld0dyYWRlU2V0TW9kYWwodGhpcy5hcHAsIGdyYWRlcykub3BlbigpO1xyXG5cdFx0ICBuZXcgRGlhbG9nKHRoaXMsIFwiTmV3IEdyYWRlc2V0XCIsIFwiRW50ZXIgY2xhc3MgbmFtZVwiLCBcIkNyZWF0ZVwiLCBcIkNhbmNlbFwiLCBhc3luYyAoc3RyOiBzdHJpbmcpID0+IHtcclxuXHJcblx0XHRcdHRoaXMuYXBwLnZhdWx0LmFwcGVuZChncmFkZXMsIFwiI3RpdGxlIFwiK3N0cisnXFxuJyk7XHJcblx0XHRcdHRoaXMub3BlbkdyYWRlU2V0KGZvbGRlcik7XHJcblxyXG5cdFx0Ly8gICBhd2FpdCBhcHAud29ya3NwYWNlLmdldExlYWYoKS5zZXRWaWV3U3RhdGUoe1xyXG5cdFx0Ly8gXHR0eXBlOiBWSUVXX1RZUEVfR1JBREVCT1gsXHJcblx0XHQvLyBcdHN0YXRlOiB7IGZpbGU6IGdyYWRlcy5wYXRoIH0sXHJcblx0XHQvLyAgIH0pO1xyXG5cdFx0fSkub3BlbigpO1xyXG5cclxuXHRcdCAgLy9jb25zb2xlLmxvZyhhcHAud29ya3NwYWNlLmdldFJpZ2h0TGVhZihmYWxzZSkuZ2V0Vmlld1N0YXRlKCkuc3RhdGUpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0ICAgY29uc29sZS5lcnJvcignRXJyb3IgY3JlYXRpbmcgZ3JhZGVzZXQ6JywgZSk7XHJcblx0XHR9XHJcblx0ICB9XHJcblxyXG5cdCAgYXN5bmMgZGlzcGxheUdyYWRlU2V0VmlldygpIHtcclxuXHRcdGF3YWl0IGFwcC53b3Jrc3BhY2UuZ2V0TGVhZih0cnVlKS5zZXRWaWV3U3RhdGUoe1xyXG5cdFx0XHR0eXBlOiBWSUVXX1RZUEVfR1JBREVTRVRfU1VNTUFSWSxcclxuXHRcdFx0c3RhdGU6IHsgZ3JhZGVzZXQ6IHRoaXMuZ3JhZGVTZXQgfSxcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5hcHAud29ya3NwYWNlLnJldmVhbExlYWYoXHJcblx0XHQgXHR0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0TGVhdmVzT2ZUeXBlKFZJRVdfVFlQRV9HUkFERVNFVF9TVU1NQVJZKVswXVxyXG5cdFx0KTtcclxuXHJcblx0ICB9XHJcblxyXG5cdCAgYXN5bmMgZGlzcGxheVN0dWRlbnQoc3R1ZGVudDogU3R1ZGVudCkge1xyXG5cdFx0Y29uc29sZS5sb2coXCJESVNQTEFZIFNUVURFTlQ6IFwiK3N0dWRlbnQuZGF0YS5nZXQoXCJuYW1lXCIpKTtcclxuXHRcdHRoaXMuY3VycmVudFN0dWRlbnQgPSBzdHVkZW50O1xyXG5cdFx0Y29uc29sZS5sb2codGhpcy5jdXJyZW50U3R1ZGVudC5hYnNlbmNlcyk7XHJcblxyXG5cdFx0YXdhaXQgYXBwLndvcmtzcGFjZS5nZXRMZWFmKHRydWUpLnNldFZpZXdTdGF0ZSh7XHJcblx0XHRcdHR5cGU6IFZJRVdfVFlQRV9TVFVERU5ULFxyXG5cdFx0XHRzdGF0ZTogeyBzdHVkZW50OiBzdHVkZW50IH0sXHJcblx0XHR9KTtcclxuXHRcdHRoaXMuYXBwLndvcmtzcGFjZS5yZXZlYWxMZWFmKFxyXG5cdFx0IFx0dGhpcy5hcHAud29ya3NwYWNlLmdldExlYXZlc09mVHlwZShWSUVXX1RZUEVfU1RVREVOVClbMF1cclxuXHRcdCk7XHJcblxyXG5cdCAgfVxyXG5cclxuXHJcbn1cclxuXHJcbmNsYXNzIE5ld0dyYWRlU2V0TW9kYWwgZXh0ZW5kcyBNb2RhbCB7XHJcblx0Z25hbWU6IHN0cmluZztcclxuXHRncmFkZXNGaWxlOiBURmlsZTtcclxuXHJcblx0Y29uc3RydWN0b3IoYXBwOiBBcHAsIGdyYWRlczogVEZpbGUpIHtcclxuXHRcdHN1cGVyKGFwcCk7XHJcblx0XHR0aGlzLmdyYWRlc0ZpbGUgPSBncmFkZXM7XHJcblx0fVxyXG5cclxuXHRvbk9wZW4oKSB7XHJcblx0XHRsZXQge2NvbnRlbnRFbH0gPSB0aGlzO1xyXG5cdFx0XHJcblx0XHRjb250ZW50RWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6ICdOZXcgR3JhZGVzZXQnIH0pO1xyXG5cclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcclxuXHRcdC5zZXROYW1lKFwiR3JhZGVzZXQgTmFtZVwiKVxyXG5cdFx0LmFkZFRleHQoKHRleHQpID0+XHJcblx0XHQgIHRleHRcclxuXHRcdFx0ICAuc2V0VmFsdWUoXCJcIilcclxuXHRcdFx0ICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHRcclxuXHRcdFx0XHR0aGlzLmduYW1lID0gdmFsdWU7XHJcblx0XHRcdCAgfVxyXG4gICAgICAgICAgICApKTtcclxuXHJcblx0XHRuZXcgU2V0dGluZyhjb250ZW50RWwpXHJcblx0XHRcdC5hZGRCdXR0b24oKGJ0bikgPT5cclxuXHRcdFx0ICBidG5cclxuXHRcdFx0XHQuc2V0QnV0dG9uVGV4dChcIk9LXCIpXHJcblx0XHRcdFx0LnNldEN0YSgpXHJcblx0XHRcdFx0Lm9uQ2xpY2soKCkgPT4ge1xyXG5cdFx0XHRcdCAgYXBwLnZhdWx0LmFwcGVuZCh0aGlzLmdyYWRlc0ZpbGUsIFwiI3RpdGxlIFwiK3RoaXMuZ25hbWUrJ1xcbicpO1xyXG5cdFx0XHRcdCAgdGhpcy5jbG9zZSgpO1xyXG5cdFx0XHRcdFxyXG5cdFx0fSkpO1xyXG5cdH1cclxuXHJcblx0b25DbG9zZSgpIHtcclxuXHRcdGxldCB7Y29udGVudEVsfSA9IHRoaXM7XHJcblx0XHRjb250ZW50RWwuZW1wdHkoKTtcclxuXHR9XHJcblxyXG5cdFxyXG59XHJcblxyXG5jbGFzcyBHcmFkZUJveFNldHRpbmdzVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XHJcblx0cGx1Z2luOiBHcmFkZWJveFBsdWdpbjtcclxuXHJcblx0c2VydmljZVNldHRpbmc6IFNldHRpbmc7XHJcblx0aG9zdFNldHRpbmc6IFNldHRpbmc7XHJcblx0cG9ydFNldHRpbmc6IFNldHRpbmc7XHJcblx0dXNlcm5hbWVTZXR0aW5nOiBTZXR0aW5nO1xyXG5cdHBhc3N3b3JkU2V0dGluZzogU2V0dGluZztcclxuXHRzZWN1cmVTZXR0aW5nOiBTZXR0aW5nO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBHcmFkZWJveFBsdWdpbikge1xyXG5cdFx0c3VwZXIoYXBwLCBwbHVnaW4pO1xyXG5cdFx0dGhpcy5wbHVnaW4gPSBwbHVnaW47XHJcblx0fVxyXG5cclxuXHRkaXNwbGF5KCk6IHZvaWQge1xyXG5cdFx0bGV0IHtjb250YWluZXJFbH0gPSB0aGlzO1xyXG5cclxuXHRcdGNvbnRhaW5lckVsLmVtcHR5KCk7XHJcblxyXG5cdFx0Y29udGFpbmVyRWwuY3JlYXRlRWwoJ2gxJywge3RleHQ6ICdHcmFkZUJveCB2ZXJzaW9uICcrdGhpcy5wbHVnaW4udmVyc2lvbn0pO1xyXG5cdFx0Y29udGFpbmVyRWwuY3JlYXRlRWwoJ2hyJyk7XHJcblxyXG5cdFx0Y29udGFpbmVyRWwuY3JlYXRlRWwoJ2gyJywge3RleHQ6ICdHZW5lcmFsJ30pO1xyXG5cclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZSgnTnVtYmVyIG9mIHJlY2VudCBmaWxlcycpXHJcblx0XHRcdC5zZXREZXNjKCdUaGlzIGlzIHRoZSBudW1iZXIgb2YgcmVjZW50IGZpbGVzIHRoYXQgd2lsbCBiZSBkaXNwbGF5ZWQgZnJvbSB0aGUgcmliYm9uIGljb24uJylcclxuXHRcdFx0LmFkZFRleHQodGV4dCA9PiB0ZXh0LnNldFBsYWNlaG9sZGVyKCcjJylcclxuXHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubnVtYmVyT2ZSZWNlbnRGaWxlcylcclxuXHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5udW1iZXJPZlJlY2VudEZpbGVzID0gdmFsdWU7XHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHR9KSk7XHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdTdHVkZW50IEltYWdlIFVSTCcpXHJcblx0XHRcdC5zZXREZXNjKCdUaGlzIGlzIHRoZSBVUkwgZm9yIGEgc3R1ZGVudCB3aG8gaXMgY3JlYXRlZCB3aXRob3V0IGFuIGltYWdlLicpXHJcblx0XHRcdC5hZGRUZXh0KHRleHQgPT4gdGV4dC5zZXRQbGFjZWhvbGRlcignVVJMJylcclxuXHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudXJsKVxyXG5cdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnVybCA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdFx0fSkpO1xyXG5cdFx0XHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoJ1RlbXBsYXRlIGZvciBFbWFpbGluZyBTY29yZXMnKVxyXG5cdFx0XHQuc2V0RGVzYygnVGhpcyBpcyB0aGUgdGVtcGxhdGUgZmlsZSB1c2VkIHdoZW4gZW1haWxpbmcgc2NvcmVzIHRvIHN0dWRlbnRzLicpXHJcblx0XHRcdC5hZGRUZXh0KHRleHQgPT4gdGV4dFxyXG5cdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy50ZW1wbGF0ZSlcclxuXHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy50ZW1wbGF0ZSA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdFx0fSkpO1xyXG5cdFx0XHRcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRjb250YWluZXJFbC5jcmVhdGVFbCgnaDInLCB7dGV4dDogJ0NvbG9yaXppbmcnfSk7XHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdEaXZpZGVyOiBUb3AgdG8gTWlkZGxlJylcclxuXHRcdFx0LnNldERlc2MoJ1RoaXMgaXMgdGhlIHNjb3JlIHRoYXQgZGl2aWRlcyB0aGUgdG9wIHNjb3JlcyBmcm9tIHRoZSBtaWRkbGUgc2NvcmVzLicpXHJcblx0XHRcdC5hZGRUZXh0KHRleHQgPT4gdGV4dC5zZXRQbGFjZWhvbGRlcignIycpXHJcblx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmNvbG9yRGl2aWRlcjEpXHJcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JEaXZpZGVyMSA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdFx0fSkpO1xyXG5cclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZSgnRGl2aWRlcjogTWlkZGxlIHRvIEJvdHRvbScpXHJcblx0XHRcdC5zZXREZXNjKCdUaGlzIGlzIHRoZSBzY29yZSB0aGF0IGRpdmlkZXMgdGhlIG1pZGRsZSBzY29yZXMgZnJvbSB0aGUgdG9wIHNjb3Jlcy4nKVxyXG5cdFx0XHQuYWRkVGV4dCh0ZXh0ID0+IHRleHQuc2V0UGxhY2Vob2xkZXIoJyMnKVxyXG5cdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvckRpdmlkZXIyKVxyXG5cdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmNvbG9yRGl2aWRlcjIgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHRcdH0pKTtcdFx0XHJcblxyXG5cdFx0Y29udGFpbmVyRWwuY3JlYXRlRWwoJ2gyJywge3RleHQ6ICdFbWFpbCBTZXJ2ZXInfSk7XHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdEZWxheSBiZXR3ZWVuIHNlbmRpbmcgbWVzc2FnZXMnKVxyXG5cdFx0XHQuc2V0RGVzYygnVGhpcyBpcyB0aGUgbnVtYmVyIG9mIHNlY29uZCB0byB3YWl0IGJldHdlZW4gc2VuZGluZyBtZXNzYWdlcy4nKVxyXG5cdFx0XHQuYWRkVGV4dCh0ZXh0ID0+IHRleHQuc2V0UGxhY2Vob2xkZXIoJyMnKVxyXG5cdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWxheSlcclxuXHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWxheSA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdFx0fSkpO1xyXG5cclxuXHRcdHRoaXMuc2VydmljZVNldHRpbmcgPSBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoJ0VtYWlsIFNlcnZpY2UgVGVtcGxhdGUnKVxyXG5cdFx0XHQuc2V0RGVzYygnVG8gcG9wdWxhdGUgc2V0dGluZ3MgYmVsb3cnKVxyXG5cdFx0XHQuYWRkRHJvcGRvd24oZHJvcCA9PiBkcm9wXHJcblx0XHRcdFx0LmFkZE9wdGlvbihcIm5vbmVcIiwgXCJub25lXCIpXHJcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0Y29uc3Qgc2VydmljZSA9IHNlcnZpY2VzW3ZhbHVlXTtcclxuXHRcdFx0XHRcdGlmIChzZXJ2aWNlW1wiaG9zdFwiXSA9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdFx0KHRoaXMuaG9zdFNldHRpbmcuY29tcG9uZW50c1swXSBhcyBUZXh0Q29tcG9uZW50KS5zZXRWYWx1ZShcIlwiKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3Muc210cGhvc3QgPSBcIlwiO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0KHRoaXMuaG9zdFNldHRpbmcuY29tcG9uZW50c1swXSBhcyBUZXh0Q29tcG9uZW50KS5zZXRWYWx1ZShzZXJ2aWNlW1wiaG9zdFwiXSk7XHJcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnNtdHBob3N0ID0gc2VydmljZVtcImhvc3RcIl07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoc2VydmljZVtcInBvcnRcIl0gPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdCh0aGlzLnBvcnRTZXR0aW5nLmNvbXBvbmVudHNbMF0gYXMgVGV4dENvbXBvbmVudCkuc2V0VmFsdWUoXCJcIik7XHJcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnNtdHBwb3J0ID0gXCJcIjtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdCh0aGlzLnBvcnRTZXR0aW5nLmNvbXBvbmVudHNbMF0gYXMgVGV4dENvbXBvbmVudCkuc2V0VmFsdWUoXCJcIitzZXJ2aWNlW1wicG9ydFwiXSk7XHJcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnNtdHBwb3J0ID0gXCJcIitzZXJ2aWNlW1wicG9ydFwiXTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmIChzZXJ2aWNlW1wic2VjdXJlXCJdID09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHQodGhpcy5zZWN1cmVTZXR0aW5nLmNvbXBvbmVudHNbMF0gYXMgRHJvcGRvd25Db21wb25lbnQpLnNldFZhbHVlKFwiTm9uZVwiKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3Muc2VjdXJlID0gXCJOb25lXCI7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRpZiAoc2VydmljZVtcInNlY3VyZVwiXSA9PSB0cnVlKSB7XHJcblx0XHRcdFx0XHRcdFx0KHRoaXMuc2VjdXJlU2V0dGluZy5jb21wb25lbnRzWzBdIGFzIERyb3Bkb3duQ29tcG9uZW50KS5zZXRWYWx1ZShcIlNTTFwiKTtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5zZWN1cmUgPSBcIlNTTFwiO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdCh0aGlzLnNlY3VyZVNldHRpbmcuY29tcG9uZW50c1swXSBhcyBEcm9wZG93bkNvbXBvbmVudCkuc2V0VmFsdWUoXCJOb25lXCIpO1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnNlY3VyZSA9IFwiTm9uZVwiO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5zZXJ2aWNlID0gdmFsdWU7XHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHQpO1xyXG5cdFx0T2JqZWN0LmtleXMoc2VydmljZXMpLmZvckVhY2goa2V5ID0+IHtcclxuXHRcdFx0KHRoaXMuc2VydmljZVNldHRpbmcuY29tcG9uZW50c1swXSBhcyBEcm9wZG93bkNvbXBvbmVudCkuYWRkT3B0aW9uKGtleSxrZXkpO1xyXG5cdFx0fSk7XHJcblx0XHQodGhpcy5zZXJ2aWNlU2V0dGluZy5jb21wb25lbnRzWzBdIGFzIERyb3Bkb3duQ29tcG9uZW50KS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5zZXJ2aWNlKTtcclxuXHJcblx0XHR0aGlzLmhvc3RTZXR0aW5nID0gbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdFbWFpbCBIb3N0JylcclxuXHRcdFx0LnNldERlc2MoJ1RoZSBzZXJ2ZXIgdGhhdCBjb2xsZWN0cyB5b3VyIGVtYWlsJylcclxuXHRcdFx0LmFkZFRleHQodGV4dCA9PiB0ZXh0XHJcblx0XHRcdFx0LnNldFBsYWNlaG9sZGVyKCdzbXRwLmdtYWlsLmNvbScpXHJcblx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnNtdHBob3N0KVxyXG5cdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdFbWFpbCBIb3N0OiAnICsgdmFsdWUpO1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3Muc210cGhvc3QgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHRcdH0pKTtcclxuXHJcblx0XHR0aGlzLnBvcnRTZXR0aW5nID0gbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdFbWFpbCBIb3N0IFBvcnQnKVxyXG5cdFx0XHQuc2V0RGVzYygnVGhlIHBvcnQgdGhlIHNlcnZlciB1c2VzIHRvIGNvbGxlY3QgeW91ciBlbWFpbCcpXHJcblx0XHRcdC5hZGRUZXh0KHRleHQgPT4gdGV4dFxyXG5cdFx0XHRcdC5zZXRQbGFjZWhvbGRlcignNDY1JylcclxuXHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc210cHBvcnQpXHJcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ0hvc3QgUG9ydDogJyArIHZhbHVlKTtcclxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnNtdHBwb3J0ID0gdmFsdWU7XHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHR9KSk7XHJcblx0XHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoJ0RvZXMgRW1haWwgSG9zdCBOZWVkIEF1dGhlbnRpY2F0aW9uPycpXHJcblx0XHRcdC5zZXREZXNjKCdEb2VzIHlvdXIgZW1haWwgaG9zdCByZXF1aXJlIGEgdXNlcm5hbWUgLyBwYXNzd29yZD8nKVxyXG5cdFx0XHQuYWRkVG9nZ2xlKHRleHQgPT4gdGV4dFxyXG5cdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51c2VBdXRoZW50aWNhdGlvbilcclxuXHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnVXNlQXV0aDogJyArIHZhbHVlKTtcclxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZUF1dGhlbnRpY2F0aW9uID0gdmFsdWU7XHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHJcblx0XHRcdFx0XHRpZiAodmFsdWUpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy51c2VybmFtZVNldHRpbmcuc2V0RGlzYWJsZWQoZmFsc2UpO1xyXG5cdFx0XHRcdFx0XHR0aGlzLnBhc3N3b3JkU2V0dGluZy5zZXREaXNhYmxlZChmYWxzZSk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnVzZXJuYW1lU2V0dGluZy5zZXREaXNhYmxlZCh0cnVlKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5wYXNzd29yZFNldHRpbmcuc2V0RGlzYWJsZWQodHJ1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdH0pKTtcclxuXHJcblx0XHR0aGlzLnVzZXJuYW1lU2V0dGluZyA9IG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZSgnVXNlcm5hbWUnKVxyXG5cdFx0XHQuc2V0RGVzYygnVXNlcm5hbWUgcHJvdmlkZWQgZm9yIGhvc3QgYXV0aGVudGljYXRpb24nKVxyXG5cdFx0XHQuc2V0RGlzYWJsZWQoISB0aGlzLnBsdWdpbi5zZXR0aW5ncy51c2VBdXRoZW50aWNhdGlvbilcclxuXHRcdFx0LmFkZFRleHQodGV4dCA9PiB0ZXh0XHJcblx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZXJuYW1lKVxyXG5cdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdVc2VybmFtZTogJyArIHZhbHVlKTtcclxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZXJuYW1lID0gdmFsdWU7XHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0fSkpO1xyXG5cclxuXHRcdHRoaXMucGFzc3dvcmRTZXR0aW5nID0gbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdQYXNzd29yZCcpXHJcblx0XHRcdC5zZXREZXNjKCdQYXNzd29yZCBwcm92aWRlZCBmb3IgaG9zdCBhdXRoZW50aWNhdGlvbicpXHJcblx0XHRcdC5zZXREaXNhYmxlZCghIHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZUF1dGhlbnRpY2F0aW9uKVxyXG5cdFx0XHQuYWRkVGV4dCh0ZXh0ID0+IHRleHRcclxuXHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MucGFzc3dvcmQpXHJcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ1Bhc3N3b3JkOiAnICsgdmFsdWUpO1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MucGFzc3dvcmQgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHR9KSk7XHJcblx0XHRcclxuXHRcdHRoaXMuc2VjdXJlU2V0dGluZyA9IG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZSgnRW5jcnlwdGlvbicpXHJcblx0XHRcdC5zZXREZXNjKCdXaGF0IGtpbmQgb2YgZW5jcnlwdGlvbiBkb2VzIHRoZSBob3N0IHVzZT8nKVxyXG5cdFx0XHQuYWRkRHJvcGRvd24odGV4dCA9PiB0ZXh0XHJcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ0VuY3J5cHRpb246ICcgKyB2YWx1ZSk7XHJcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbmNyeXB0aW9uID0gdmFsdWU7XHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5hZGRPcHRpb24oXCJOb25lXCIsIFwiTm9uZVwiKVxyXG5cdFx0XHRcdC5hZGRPcHRpb24oXCJUTFNcIiwgXCJUTFNcIilcclxuXHRcdFx0XHQuYWRkT3B0aW9uKFwiU1NMXCIsIFwiU1NMXCIpXHJcblx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmVuY3J5cHRpb24pXHJcblx0XHQpO1xyXG5cclxuXHRcdGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdoMicsIHt0ZXh0OiAnRW1haWwgTWVzc2FnZSd9KTtcclxuXHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdC5zZXROYW1lKCdTZW50IGZyb20nKVxyXG5cdFx0LnNldERlc2MoJ1NlbnQgZnJvbSBhZGRyZXNzIGZvciBwcmUtZmlsbGluZyBGcm9tIGZpZWxkIChvcHRpb25hbCknKVxyXG5cdFx0LmFkZFRleHQodGV4dCA9PiB0ZXh0XHJcblx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5mcm9tKVxyXG5cdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ0Zyb206ICcgKyB2YWx1ZSk7XHJcblx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuZnJvbSA9IHZhbHVlO1xyXG5cdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0fSkpO1xyXG5cclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZSgnRGVmYXVsdCBUbzogYWRkcmVzcyBmb3IgZW1haWxzJylcclxuXHRcdFx0LnNldERlc2MoJ1RoaXMgaXMgdGhlIGRlZmF1bHQgZGVzdGluYXRpb24gYWRkcmVzcyBmb3IgZW1haWwgbWVzc2FnZXMuJylcclxuXHRcdFx0LmFkZFRleHQodGV4dCA9PiB0ZXh0LnNldFBsYWNlaG9sZGVyKCdFbWFpbCBhZGRyZXNzJylcclxuXHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVmYXVsdHRvKVxyXG5cdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmRlZmF1bHR0byA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdFx0fSkpO1xyXG5cclxuXHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdC5zZXROYW1lKCdSZWNlaXZlcicpXHJcblx0XHQuc2V0RGVzYygnUmVjZWl2ZXIgZm9yIHByZS1maWxsaW5nIFRvIGZpZWxkIChvcHRpb25hbCknKVxyXG5cdFx0LmFkZFRleHQodGV4dCA9PiB0ZXh0XHJcblx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5yZWNlaXZlcilcclxuXHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdSZWNlaXZlcjogJyArIHZhbHVlKTtcclxuXHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5yZWNlaXZlciA9IHZhbHVlO1xyXG5cdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0fSkpO1xyXG5cclxuXHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdC5zZXROYW1lKCdTdWJqZWN0JylcclxuXHRcdC5zZXREZXNjKCdTdWJqZWN0IGZvciBwcmUtZmlsbGluZyB0aGUgc3ViamVjdCBmaWVsZCAob3B0aW9uYWwpJylcclxuXHRcdC5hZGRUZXh0KHRleHQgPT4gdGV4dFxyXG5cdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc3ViamVjdClcclxuXHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdTdWJqZWN0OiAnICsgdmFsdWUpO1xyXG5cdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnN1YmplY3QgPSB2YWx1ZTtcclxuXHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdH0pKTtcclxuXHRcdFxyXG5cdFx0Y29udGFpbmVyRWwuY3JlYXRlRWwoJ2gyJywge3RleHQ6ICdHcmFkZXMgV2ViIFNlcnZpY2UnfSk7XHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdXaGVuIHRvIGdlbmVyYXRlIFdlYiBzZXJ2ZXIgZmlsZScpXHJcblx0XHRcdC5zZXREZXNjKCdXaGVuIFdlYiBzZXJ2ZXIgZmlsZSBpcyBnZW5lcmF0ZXMuJylcclxuXHRcdFx0LmFkZERyb3Bkb3duKHRleHQgPT4gdGV4dFxyXG5cdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLndoZW5Ub0dlbmVyYXRlID0gdmFsdWU7XHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5hZGRPcHRpb24oXCJvcGVuXCIsIFwib3BlblwiKVxyXG5cdFx0XHRcdC5hZGRPcHRpb24oXCJjbG9zZVwiLCBcImNsb3NlXCIpXHJcblx0XHRcdFx0LmFkZE9wdGlvbihcIm5ldmVyXCIsIFwibmV2ZXJcIilcclxuXHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Mud2hlblRvR2VuZXJhdGUpXHJcblx0XHQpO1xyXG5cclxuXHR9XHJcblxyXG5cdFxyXG5cclxufVxyXG4iXSwibmFtZXMiOlsiUFJFVklFV19NT0RFIiwiRURJVElOR19NT0RFIiwiTWFya2Rvd25SZW5kZXJlciIsIkl0ZW1WaWV3IiwiTm90aWNlIiwiTW9kYWwiLCJCdXR0b25Db21wb25lbnQiLCJTZXR0aW5nIiwiVG9nZ2xlQ29tcG9uZW50IiwiVGV4dEFyZWFDb21wb25lbnQiLCJURmlsZSIsIlBsYXRmb3JtIiwiTWVudSIsIkRyb3Bkb3duQ29tcG9uZW50IiwiVEZvbGRlciIsIlBsdWdpbiIsIlBsdWdpblNldHRpbmdUYWIiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNuQyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztBQUN6QyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDcEYsUUFBUSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDMUcsSUFBSSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBQ0Y7QUFDTyxTQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2hDLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxLQUFLLElBQUk7QUFDN0MsUUFBUSxNQUFNLElBQUksU0FBUyxDQUFDLHNCQUFzQixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRywrQkFBK0IsQ0FBQyxDQUFDO0FBQ2xHLElBQUksYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4QixJQUFJLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUMzQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDekYsQ0FBQztBQW9GRDtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDdEcsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDdEgsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUUsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Q7QUFDTyxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0FBQzNDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNySCxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLE1BQU0sS0FBSyxVQUFVLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzdKLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDdEUsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDdEIsUUFBUSxJQUFJLENBQUMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDdEUsUUFBUSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSTtBQUN0RCxZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pLLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxZQUFZLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6QixnQkFBZ0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTTtBQUM5QyxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQ3hFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQjtBQUNoQixvQkFBb0IsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtBQUNoSSxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUMxRyxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFO0FBQ3pGLG9CQUFvQixJQUFJLENBQUMs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QyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQztBQUNuQixvQkFBQSxJQUFHLENBQUMsSUFBRSxDQUFDLElBQUUsQ0FBQyxJQUFFLENBQUM7d0JBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsRUFBRSxHQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsSUFBRSxFQUFFLEdBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsR0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxJQUFFLEtBQUssQ0FBQyxHQUFDLElBQUksQ0FBQzs7QUFDNUUsd0JBQUEsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsR0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUE7QUFDL0MsaUJBQUE7QUFBQSxnQkFBQSxPQUFPLENBQUMsQ0FBQTtBQUFBLGFBQUMsQ0FBQztBQUNmLFFBQUEsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUMsSUFBSSxHQUFDLEVBQUUsSUFBRSxHQUFHLEdBQUMsQ0FBQyxDQUFDLEdBQUMsS0FBSyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsRUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsRUFBRSxJQUFFLEVBQUUsSUFBRSxHQUFHLEdBQUMsRUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBQyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztBQUN6SyxRQUFBLElBQUcsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDO0FBQUMsWUFBQSxPQUFPLElBQUksQ0FBQztBQUN0QixRQUFBLElBQUcsQ0FBQztZQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUNuRCxZQUFBLENBQUMsR0FBQyxDQUFDLENBQUMsVUFBQyxDQUFDLEdBQUMsSUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQSxHQUFDLENBQUMsR0FBQyxJQUFBLENBQUEsR0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBLEdBQUcsR0FBRyxDQUFBLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUEsQ0FBQSxHQUFBLEVBQUMsQ0FBQyxHQUFDLElBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUEsR0FBQyxDQUFDLEdBQUMsU0FBQSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQSxHQUFHLEdBQUcsQ0FBQSxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFBLENBQUEsR0FBQSxFQUFDLENBQUMsR0FBQyxTQUFBLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBLEdBQUMsQ0FBQyxHQUFDLElBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUEsR0FBRyxHQUFHLENBQUEsQ0FBQyxDQUFDO1FBQy9GLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxJQUFFLENBQUMsSUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO0FBQ25ELFFBQUEsSUFBRyxDQUFDO1lBQUMsT0FBTSxLQUFLLElBQUUsQ0FBQyxHQUFDLElBQUksR0FBQyxHQUFHLENBQUMsR0FBQyxDQUFDLEdBQUMsR0FBRyxHQUFDLENBQUMsR0FBQyxHQUFHLEdBQUMsQ0FBQyxJQUFFLENBQUMsR0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBQyxJQUFJLEdBQUMsRUFBRSxDQUFDLEdBQUMsR0FBRyxDQUFDOztZQUNyRSxPQUFNLEdBQUcsR0FBQyxDQUFDLFVBQVUsR0FBQyxDQUFDLEdBQUMsUUFBUSxHQUFDLENBQUMsR0FBQyxLQUFLLEdBQUMsQ0FBQyxHQUFDLEdBQUcsSUFBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxD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
