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
    Category.prototype.removeScore = function (score) {
        var index = this.scoreSet.indexOf(score);
        if (index > -1) {
            this.scoreSet.splice(index, 1);
        }
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
    Counter.prototype.set = function (value) {
        this.value = value;
    };
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

var NewCounterModal = /** @class */ (function (_super) {
    __extends(NewCounterModal, _super);
    function NewCounterModal(app, gradeSet, callbackOnClose) {
        var _this = _super.call(this, app) || this;
        _this.gradeSet = gradeSet;
        _this.callbackOnClose = callbackOnClose;
        _this.name = "";
        return _this;
    }
    NewCounterModal.prototype.onOpen = function () {
        var _this = this;
        var contentEl = this.contentEl;
        contentEl.createEl("h2", { text: 'New Counter' });
        new obsidian.Setting(contentEl)
            .setName("Name")
            .addText(function (text) { return text
            .setValue("")
            .onChange(function (value) {
            _this.name = value;
        }); });
        this.initialField = new obsidian.Setting(contentEl)
            .setName("Initial Value")
            .addText(function (text) {
            return text
                .setValue("")
                .onChange(function (value) {
                _this.initial = value;
            });
        });
        new obsidian.Setting(contentEl)
            .addButton(function (btn) {
            return btn
                .setButtonText("OK")
                .setCta()
                .onClick(function () {
                var counter = new Counter(_this.name);
                counter.set(_this.initial);
                _this.close();
                _this.callbackOnClose(counter);
            });
        });
    };
    NewCounterModal.prototype.onClose = function () {
        this.scope.unregister(this.enterhandler);
    };
    return NewCounterModal;
}(obsidian.Modal));

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

var VIEW_TYPE_GRADESET_SUMMARY = "gradeset-summary-view";
var PREVIEW_MODE$1 = 2;
var EDITING_MODE$1 = 1;
var GradeSetSummaryView = /** @class */ (function (_super) {
    __extends(GradeSetSummaryView, _super);
    function GradeSetSummaryView(leaf, plugin) {
        var _this = _super.call(this, leaf) || this;
        // set the file contents
        _this.setViewData = function (data, clear) {
        };
        _this.navigation = true;
        _this.plugin = plugin;
        // Make copies of these
        _this.gradeSetData = plugin.gradeSet.gradeSetData;
        _this.gradeSet = plugin.gradeSet;
        //console.log("CONSTRUCTOR: modified = "+this.gradeSet.modified);
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
                this.addAction("lucide-calculator", "Add a counter", function () {
                    new NewCounterModal(_this.app, _this.gradeSet, function (counter) {
                        _this.gradeSet.addCounter(counter);
                        _this.gradeSet.modified = true;
                        //this.gradeSet.writeGradeSet();
                        //this.display();
                        if (_this.mode == EDITING_MODE$1)
                            _this.setEditingMode(true);
                        if (_this.mode == PREVIEW_MODE$1)
                            _this.setPreviewMode(true);
                    }).open();
                });
                // Record the "state" of the gradeset so we can detect changes
                this.numCounters = (this.gradeSet.counters == undefined) ? 0 : this.gradeSet.counters.length;
                this.gradeSet.counters.forEach(function (counter) { _this.counters.push(counter); });
                this.modified = this.gradeSet.modified;
                this.setPreviewMode();
                return [2 /*return*/];
            });
        });
    };
    GradeSetSummaryView.prototype.setPreviewMode = function (force) {
        if (force === void 0) { force = false; }
        if (this.mode == PREVIEW_MODE$1 && !force)
            return;
        this.mode = PREVIEW_MODE$1;
        this.container = this.containerEl.children[1];
        this.container.empty();
        var div = this.container.createEl("div", { cls: "view-style" });
        var gradeSetNote = this.generateMarkdownFromGradeSet();
        obsidian.MarkdownRenderer.renderMarkdown(gradeSetNote, div, null, null);
        this.editElement.show();
        this.previewElement.hide();
        console.log("PREVIEW MODE: modified = " + this.modified);
    };
    GradeSetSummaryView.prototype.setEditingMode = function (force) {
        if (force === void 0) { force = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.mode == EDITING_MODE$1 && !force)
                    return [2 /*return*/];
                this.mode = EDITING_MODE$1;
                this.container.empty();
                this.generateEditHTML(this.container);
                this.editElement.hide();
                this.previewElement.show();
                console.log("EDIT MODE 2: modified = " + this.modified);
                return [2 /*return*/];
            });
        });
    };
    GradeSetSummaryView.prototype.onClose = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.modified = this.modified || (this.catsChanged.length > 0) || (this.countersChanged.length > 0) || (this.scoresChanged.length > 0);
                if (this.modified) {
                    // Check categories
                    this.catsChanged.forEach(function (cat) {
                        var oldName = cat.split("~~>")[0];
                        var newName = cat.split("~~>")[1];
                        _this.gradeSet.renameCategory(oldName, newName);
                        _this.gradeSet.students.forEach(function (student) {
                            student.renameCategory(oldName, newName);
                        });
                        _this.gradeSet.modified = true;
                    });
                    // Check counters / adjust students if necessary
                    console.log(this.countersChanged);
                    this.countersChanged.forEach(function (counter) {
                        var name = counter.split("~~>")[0];
                        var value = counter.split("~~>")[1];
                        console.log("COUNTER CHANGED: " + name + " to " + value);
                        _this.gradeSet.students.forEach(function (student) {
                            var sc = student.getCounter(name);
                            if (sc != undefined) {
                                console.log("Changing " + name + " to " + value + " for " + sc.name + " = " + sc.value);
                                if (value === "-1") {
                                    student.deleteCounter(sc);
                                }
                                else {
                                    var numericValue = Number(value);
                                    console.log("Numeric value = " + numericValue);
                                    if (!Number.isNaN(numericValue)) {
                                        sc.name = value;
                                        student.updateCounterName(name, sc);
                                    }
                                    else {
                                        numericValue - sc.value;
                                        sc.value = sc.value;
                                    }
                                }
                            }
                        });
                        _this.gradeSet.modified = true;
                    });
                    // Check scores that have changed
                    this.scoresChanged.forEach(function (score) {
                        var oldName = score.split("~~>")[0];
                        var newName = score.split("~~>")[1];
                        console.log("SCORE CHANGED: " + oldName + " to " + newName);
                        _this.gradeSet.students.forEach(function (student) {
                            student.renameScore(oldName, newName);
                        });
                    });
                    this.gradeSet.modified = true;
                }
                this.plugin.gradeSet.modified = this.modified;
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
                if (cat.scoreSet == undefined || cat.scoreSet.length == 0) {
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
    GradeSetSummaryView.prototype.generateEditHTML = function (container) {
        var _this = this;
        this.countersChanged = [];
        this.remindersChanged = [];
        this.catsChanged = [];
        this.scoresChanged = [];
        container.empty();
        var titleContainer = container.createDiv();
        titleContainer.createEl("hr");
        // Title
        titleContainer.createEl("h2", { text: "Class Title" });
        var editTitle = new obsidian.TextComponent(titleContainer);
        editTitle.inputEl.setAttribute("style", "width: 30%;");
        editTitle.setValue(this.gradeSet.properties.get('title'));
        editTitle.onChange(function (value) {
            _this.gradeSet.properties.set('title', value);
            _this.modified = true;
        });
        titleContainer.createEl("hr");
        // Counters
        var counterContainer = container.createDiv();
        if (this.gradeSet.counters.length > 0) {
            counterContainer.createEl("h2", { text: "Counters" });
            var counterTable_1 = counterContainer.createEl("table");
            var headerRow = counterTable_1.createEl("tr");
            headerRow.createEl("th", { text: "Name" });
            headerRow.createEl("th", { text: "Initial Value" });
            this.gradeSet.counters.forEach(function (counter) {
                var row = counterTable_1.createEl("tr");
                var cell = row.createEl("td");
                var editCounter = new obsidian.TextComponent(cell);
                editCounter.setValue(counter.name);
                editCounter.onChange(function (value) {
                    console.log("COUNTER CHANGED: " + counter.name + "~~>" + value);
                    _this.countersChanged.push(counter.name + "~~>" + value);
                    counter.name = value;
                    _this.modified = true;
                });
                cell = row.createEl("td");
                var editCounterValue = new obsidian.TextComponent(cell);
                editCounterValue.setValue("" + counter.value);
                editCounterValue.onChange(function (value) {
                    counter.value = Number(value);
                    _this.countersChanged.push(counter.name + "~~>" + value);
                    _this.modified = true;
                });
                cell = row.createEl("td");
                var delButton = new obsidian.ButtonComponent(cell);
                delButton.setButtonText("X");
                delButton.onClick(function () {
                    _this.gradeSet.counters.splice(_this.gradeSet.counters.indexOf(counter), 1);
                    _this.countersChanged.push(counter.name + "~~>" + (-1));
                    row.remove();
                });
            });
            counterContainer.createEl("hr");
        }
        // Reminders
        var reminderContainer = container.createDiv();
        if (this.gradeSet.reminders.length > 0) {
            reminderContainer.createEl("h2", { text: "Reminders" });
            var remTable_1 = reminderContainer.createEl("table");
            var headerRow = remTable_1.createEl("tr");
            headerRow.createEl("th", { text: "Text" });
            headerRow.createEl("th", { text: "Date" });
            headerRow.createEl("th", { text: "Repeat" });
            headerRow.createEl("th", { text: "Prior" });
            this.gradeSet.reminders.forEach(function (reminder) {
                // gradeSetNote += ' - "'+reminder.text+'" on '+reminder.date.toLocaleString();
                var row = remTable_1.createEl("tr");
                var cell = row.createEl("td");
                var editReminder = new obsidian.TextComponent(cell);
                editReminder.setValue(reminder.text);
                editReminder.onChange(function (value) {
                    reminder.text = value;
                    _this.modified = true;
                });
                cell = row.createEl("td");
                var editReminderDate = new obsidian.TextComponent(cell);
                editReminderDate.setValue(reminder.date.toLocaleString());
                editReminderDate.onChange(function (value) {
                    reminder.date = new Date(value);
                    _this.modified = true;
                });
                // if (reminder.repeat > 0) gradeSetNote += ', repeats every '+reminder.repeat+' days';
                cell = row.createEl("td");
                var editReminderRepeat = new obsidian.TextComponent(cell);
                editReminderRepeat.setValue(reminder.repeat.toString());
                editReminderRepeat.onChange(function (value) {
                    reminder.repeat = Number(value);
                    _this.modified = true;
                });
                // if (reminder.prior > 0) gradeSetNote += ', prior = '+reminder.prior+' days';
                cell = row.createEl("td");
                var editReminderPrior = new obsidian.TextComponent(cell);
                editReminderPrior.setValue(reminder.prior.toString());
                editReminderPrior.onChange(function (value) {
                    reminder.prior = Number(value);
                    _this.modified = true;
                });
                cell = row.createEl("td");
                var delButton = new obsidian.ButtonComponent(cell);
                delButton.setButtonText("X");
                delButton.onClick(function () {
                    _this.gradeSet.deleteReminder(reminder);
                    row.remove();
                    if (_this.gradeSet.reminders.length == 0)
                        reminderContainer.innerHTML = "";
                });
            });
            reminderContainer.createEl("hr");
        }
        // Categories + scores
        var categoryContainer = container.createDiv();
        if (this.gradeSet.categories.length > 0) {
            var conTable = categoryContainer.createEl("table");
            var conRow = conTable.createEl("tr");
            var conCell = conRow.createEl("td");
            conCell.createEl("h2", { text: "Categories" });
            conCell = conRow.createEl("td");
            var addCategoryButton = new obsidian.ButtonComponent(conCell);
            addCategoryButton.setButtonText("+");
            addCategoryButton.onClick(function () {
                var newCat = new Category({ name: "New Category", weight: 1.0, percentOfScores: 1.0 });
                _this.gradeSet.addCategory(newCat);
                _this.modified = true;
            });
            this.gradeSet.categories.forEach(function (cat) {
                var catTable = categoryContainer.createEl("table");
                var catRowT = catTable.createEl("tr");
                catRowT.createEl("th", { text: "Category Name" });
                catRowT.createEl("th", { text: "Weight" });
                catRowT.createEl("th", { text: "% of Scores Used" });
                var catRow = catTable.createEl("tr");
                var catCell = catRow.createEl("td");
                var editCategory = new obsidian.TextComponent(catCell);
                editCategory.setValue(cat.name);
                editCategory.onChange(function (value) {
                    _this.catsChanged.push(cat.name + "~~>" + value);
                    cat.name = value;
                    _this.modified = true;
                });
                catCell = catRow.createEl("td");
                var editCategoryWeight = new obsidian.TextComponent(catCell);
                editCategoryWeight.setValue("" + cat.weight);
                editCategoryWeight.onChange(function (value) {
                    cat.weight = Number(value);
                    _this.modified = true;
                });
                catCell = catRow.createEl("td");
                var editCategoryPercent = new obsidian.TextComponent(catCell);
                editCategoryPercent.setValue("" + cat.percentOfScores);
                editCategoryPercent.onChange(function (value) {
                    cat.percentOfScores = Number(value);
                    _this.modified = true;
                });
                catCell = catRow.createEl("td");
                var delButton = new obsidian.ButtonComponent(catCell);
                delButton.setButtonText("X");
                delButton.onClick(function () {
                    _this.gradeSet.deleteCategory(cat);
                    catRowT.remove();
                    catRow.remove();
                    _this.setEditingMode(true);
                    _this.modified = true;
                });
                if (cat.scoreSet != undefined && cat.scoreSet.length > 0) {
                    var catTable_1 = categoryContainer.createEl("table");
                    var catRow_1 = catTable_1.createEl("tr");
                    catRow_1.createEl("th", { text: "Score Name" });
                    catRow_1.createEl("th", { text: "Possible" });
                    cat.scoreSet.forEach(function (sc) {
                        catRow_1 = catTable_1.createEl("tr");
                        var catCell = catRow_1.createEl("td");
                        var value = Math.round(sc.getValue() * 100) / 100;
                        var classAve = Math.round(_this.gradeSet.classScoreAverage(cat, sc.name) * 100) / 100;
                        Math.round(classAve / sc.getValue() * 10000) / 100;
                        var editScore = new obsidian.TextComponent(catCell);
                        editScore.setValue(sc.name);
                        editScore.onChange(function (value) {
                            _this.scoresChanged.push(sc.name + "~~>" + value);
                            sc.name = value;
                            _this.modified = true;
                        });
                        catCell = catRow_1.createEl("td");
                        var editScoreValue = new obsidian.TextComponent(catCell);
                        editScoreValue.setValue("" + value);
                        editScoreValue.onChange(function (value) {
                            sc.setValue(Number(value));
                            _this.gradeSet.modified = true;
                        });
                        catCell = catRow_1.createEl("td");
                        var delButton = new obsidian.ButtonComponent(catCell);
                        delButton.setButtonText("X");
                        delButton.onClick(function () {
                            cat.removeScore(sc);
                            catRow_1.remove();
                        });
                    });
                }
                categoryContainer.createEl("br");
            });
        }
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
            var counterContainer = form.createDiv();
            var counterTable = counterContainer.createEl("table", { cls: "counter-table" });
            _this.student.counters.forEach(function (counter) {
                var counterRow = counterTable.createEl("tr");
                var counterCell = counterRow.createEl("td");
                var but = new obsidian.ButtonComponent(counterCell)
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
                counterCell = counterRow.createEl("td", { attr: { "text-align": "center" } });
                counterCell.appendText(counter.name);
                counterCell = counterRow.createEl("td");
                but = new obsidian.ButtonComponent(counterRow).setButtonText("+").setIcon("plus-circle")
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
        if (this.emailWorks) ;
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
        var cell = row.createEl("td", { cls: style });
        var hei = cell.createEl("img");
        if (this.data.get("image") == undefined) {
            hei.src = "https://rizzo.hope.edu/~jipping/noimage.png";
            this.data.set("image", "https://rizzo.hope.edu/~jipping/noimage.png");
        }
        else {
            hei.src = this.data.get("image");
        }
        hei.onerror = function () {
            hei.src = "https://rizzo.hope.edu/~jipping/noimage.png";
            this.data.set("image", "https://rizzo.hope.edu/~jipping/noimage.png");
            this.data.set("imageModified", "true");
            this.data.set("dataModified", "true");
        };
        hei.height = 100;
        this.studentImage = hei;
        if (this.notes !== undefined && this.notes !== null && this.notes.length > 0) {
            cell.createEl("br");
            cell.innerHTML += this.scrolltextIcon;
        }
        var fscore = Utilities.fixToPlaces(finalScore);
        cell = row.createEl("td", { cls: style });
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
    Student.prototype.renameCategory = function (oldName, newName) {
        var _this = this;
        console.log("RENAMING " + oldName + " to " + newName);
        var newScores = new Map();
        this.scores.forEach(function (value, key) {
            var parts = key.split("|");
            if (parts[0] === oldName) {
                newScores.set(newName + "|" + parts[1], value);
                console.log("REPLACING " + key + " with " + newName + "|" + parts[1]);
                _this.dataModified = true;
            }
            else {
                newScores.set(key, value);
            }
        });
        this.scores = newScores;
    };
    Student.prototype.renameScore = function (oldName, newName) {
        var _this = this;
        console.log("RENAMING " + oldName + " to " + newName);
        //let newScores = new Map<string, number>();
        this.scores.forEach(function (value, key) {
            if (key === oldName) {
                _this.scores.set(newName, value);
                _this.scores.delete(oldName);
                console.log("REPLACING " + key + " with " + newName);
                _this.dataModified = true;
            }
        });
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
    Student.prototype.updateCounterName = function (name, counter) {
        this.counters.forEach(function (c) {
            if (c.name === name) {
                c.name = counter.name;
            }
        });
    };
    Student.prototype.setNotes = function (notes) {
        this.notes = notes;
    };
    Student.prototype.imageExists = function (image_url) {
        var http = new XMLHttpRequest();
        try {
            http.open('HEAD', image_url, false);
            http.send();
            console.log(http);
            return http.status != 404;
        }
        catch (e) {
            console.log("Error in imageExists: " + e);
            return false;
        }
    };
    Student.prototype.generateMarkdown = function (gradeSet) {
        var _this = this;
        var studentNote = "";
        // Title 
        studentNote += "----\n# " + this.data.get("name") + '\n';
        // Image
        var im = this.data.get("image");
        if (this.data.get("image") == undefined) {
            this.data.set("image", "https://rizzo.hope.edu/~jipping/noimage.png");
            im = "https://rizzo.hope.edu/~jipping/noimage.png";
        }
        studentNote += "<img src=\"" + im + "\" width=75 >\n\n";
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
    Student.prototype.generateEditHTML = function (container, gradeSet) {
        //container.empty();
        var _this = this;
        var infoContainer = container.createDiv();
        infoContainer.createEl("hr");
        // Student info
        infoContainer.createEl("h2", { text: "Student Information" });
        var infoTable = infoContainer.createEl("table");
        var infoRow = infoTable.createEl("tr");
        var infoCell = infoRow.createEl("td", { text: "Name:" });
        infoCell = infoRow.createEl("td");
        var editName = new obsidian.TextComponent(infoCell);
        editName.setValue(this.data.get("name"));
        editName.onChange(function (value) {
            _this.data.set("name", value);
        });
        infoRow = infoTable.createEl("tr");
        infoCell = infoRow.createEl("td", { text: "ID:" });
        infoCell = infoRow.createEl("td");
        var editID = new obsidian.TextComponent(infoCell);
        editID.setValue(this.data.get("id"));
        editID.onChange(function (value) {
            _this.data.set("id", value);
        });
        infoRow = infoTable.createEl("tr");
        infoCell = infoRow.createEl("td", { text: "Email Address:" });
        infoCell = infoRow.createEl("td");
        var editAddr = new obsidian.TextComponent(infoCell);
        editAddr.setValue(this.data.get("emailaddress"));
        editAddr.onChange(function (value) {
            _this.data.set("emailaddress", value);
        });
        infoRow = infoTable.createEl("tr");
        infoCell = infoRow.createEl("td", { text: "Image:" });
        infoCell = infoRow.createEl("td");
        var imageAddr = new obsidian.TextComponent(infoCell);
        imageAddr.inputEl.setAttribute("style", "width: 300%;");
        imageAddr.setValue(this.data.get("image"));
        imageAddr.onChange(function (value) {
            _this.data.set("image", value);
        });
        infoContainer.createEl("hr");
        // Absences
        if (this.absences.length > 0) {
            var abContainer = container.createDiv();
            abContainer.createEl("h2", { text: "Absences" });
            var abTable_1 = abContainer.createEl("table");
            this.absences.forEach(function (abs) {
                var abRow = abTable_1.createEl("tr");
                var abCell = abRow.createEl("td");
                var editAddr = new obsidian.TextComponent(abCell);
                editAddr.setValue(abs.toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" }));
                editAddr.onChange(function (value) {
                    var orig = abs;
                    abs = new Date(value);
                    _this.absences[_this.absences.indexOf(orig)] = abs;
                });
                abCell = abRow.createEl("td");
                var delButton = new obsidian.ButtonComponent(abCell);
                delButton.setButtonText("Delete");
                delButton.onClick(function () {
                    _this.absences.splice(_this.absences.indexOf(abs), 1);
                    abRow.remove();
                });
            });
            abContainer.createEl("hr");
        }
        // Counters
        if (this.counters.length > 0) {
            var coContainer = container.createDiv();
            coContainer.createEl("h2", { text: "Counters" });
            var coTable_1 = coContainer.createEl("table");
            this.counters.forEach(function (cnt) {
                var coRow = coTable_1.createEl("tr");
                var coCell = coRow.createEl("td", { text: cnt.name });
                coCell = coRow.createEl("td");
                var editCounter = new obsidian.TextComponent(coCell);
                editCounter.setValue("" + cnt.value);
                editCounter.onChange(function (value) {
                    cnt.value = Number(value);
                });
            });
            coContainer.createEl("hr");
        }
        // Scores
        var scoreContainer = container.createDiv();
        if (this.scores.size > 0) {
            scoreContainer.createEl("h2", { text: "Scores" });
            gradeSet.categories.forEach(function (cat) {
                scoreContainer.createEl("h3", { text: cat.name });
                if (cat.scoreSet != undefined) {
                    var scTable_1 = scoreContainer.createEl("table");
                    cat.scoreSet.forEach(function (sc) {
                        var scRow = scTable_1.createEl("tr");
                        scRow.createEl("td", { attr: { width: "25px" } });
                        var scCell = scRow.createEl("td", { text: sc.name });
                        scCell = scRow.createEl("td");
                        var editScoreValue = new obsidian.TextComponent(scCell);
                        var score = _this.get(cat, sc.name);
                        editScoreValue.setValue("" + score);
                        editScoreValue.onChange(function (value) {
                            _this.set(cat, sc.name, Number(value));
                        });
                    });
                }
                else {
                    scoreContainer.createEl("p", { text: "No Scores" });
                }
            });
        }
    };
    return Student;
}());

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
                    var regex = /%score:(.*?)%/g;
                    var matches = old.match(regex);
                    if (matches == null)
                        return old;
                    matches.forEach(function (match) {
                        // WHAT??? 
                    });
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
            return "";
        };
        // set the file contents
        _this.setViewData = function (data, clear) {
            console.log("SETVIEWDATA, clear: " + clear);
            console.log(data);
        };
        // clear the view content
        _this.clear = function () {
        };
        _this.navigation = true;
        _this.plugin = plugin;
        _this.gradeSet = gradeSet;
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
                    today.getDate();
                    today.getMonth() + 1;
                    today.getFullYear();
                    _this.student.addAbsence(today);
                    _this.plugin.gradeSet.modified = true;
                    _this.dataChanged = true;
                    _this.redisplay();
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
                console.log("What if mode---------------------------------------------------");
                _this.whatifmode = !_this.whatifmode;
                if (_this.whatifmode) {
                    _this.backupData = _this.studentData;
                }
                else {
                    _this.studentData = _this.backupData;
                }
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
            if (this.whatifmode)
                studentNote = "# What if mode is on\n" + studentNote;
            obsidian.MarkdownRenderer.render(this.app, studentNote, div, null, null);
        }
    };
    StudentView.prototype.setPreviewMode = function () {
        if (this.mode == PREVIEW_MODE)
            return;
        this.mode = PREVIEW_MODE;
        //this.studentData = this.codeMirror.getValue();
        if (typeof this.student == 'undefined')
            this.student = new Student(null);
        //this.student.configureFromData(this.studentData);
        this.container = this.containerEl.children[1];
        this.container.empty();
        var div = this.container.createEl("div", { cls: "view-style" });
        var studentNote = this.student.generateMarkdown(this.gradeSet);
        if (this.whatifmode)
            studentNote = "# What if mode is on\n" + studentNote;
        console.log(studentNote);
        obsidian.MarkdownRenderer.render(this.app, studentNote, div, null, null);
        this.editElement.show();
        this.previewElement.hide();
    };
    StudentView.prototype.setEditingMode = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.mode == EDITING_MODE)
                    return [2 /*return*/];
                this.mode = EDITING_MODE;
                this.container = this.containerEl.children[1];
                this.container.empty();
                if (this.whatifmode)
                    this.container.createEl("h1", { text: "What if mode is on" });
                this.student.generateEditHTML(this.container, this.gradeSet);
                //this.setViewData(this.studentData, true);
                this.plugin.gradeSet.modified = !this.whatifmode;
                this.dataChanged = !this.whatifmode;
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
                if (this.whatifmode) {
                    this.studentData = this.backupData;
                }
                else if (this.dataChanged) {
                    if (this.mode == EDITING_MODE) {
                        console.log("StudentView Data Changed");
                        //this.studentData = this.getViewData();
                        console.log(this.studentData);
                        //this.student.configureFromData(this.studentData);
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

var NewCategoryModal = /** @class */ (function (_super) {
    __extends(NewCategoryModal, _super);
    function NewCategoryModal(app, callbackOnClose) {
        var _this = _super.call(this, app) || this;
        _this.callbackOnClose = callbackOnClose;
        _this.category = null;
        _this.weight = 1.0;
        _this.scoringMethod = Category.ScoringMethod.INDIVIDUAL_SCORE_PERCENTAGE;
        _this.dropLowest = 0;
        _this.dropHighest = 0;
        _this.percentOfScores = 1;
        return _this;
    }
    NewCategoryModal.prototype.onOpen = function () {
        var _this = this;
        var contentEl = this.contentEl;
        contentEl.createEl("h2", { text: 'New Category' });
        new obsidian.Setting(contentEl)
            .setName("Name")
            .addText(function (name) {
            return name
                .setValue("")
                .onChange(function (value) {
                _this.name = value;
            });
        });
        new obsidian.Setting(contentEl)
            .setName("Weight of category")
            .addText(function (text) {
            return text
                .setValue("" + _this.weight)
                .onChange(function (value) {
                _this.weight = value;
            });
        });
        new obsidian.Setting(contentEl)
            .setName("Drop # of lowest scores")
            .addText(function (text) {
            return text
                .setValue("" + _this.dropLowest)
                .onChange(function (value) {
                _this.dropLowest = value;
            });
        });
        new obsidian.Setting(contentEl)
            .setName("DropHighest")
            .addText(function (text) {
            return text
                .setValue("" + _this.dropHighest)
                .onChange(function (value) {
                _this.dropHighest = value;
            });
        });
        new obsidian.Setting(contentEl)
            .setName("%age of scores used")
            .addText(function (text) {
            return text
                .setValue("" + _this.percentOfScores)
                .onChange(function (value) {
                _this.percentOfScores = value;
            });
        });
        new obsidian.Setting(contentEl)
            .addButton(function (btn) {
            return btn
                .setButtonText("OK")
                .setCta()
                .onClick(function () {
                _this.close();
                var cat = new Category(null);
                cat.name = _this.name;
                cat.weight = _this.weight;
                cat.scoringMethod = _this.scoringMethod;
                cat.dropLowest = _this.dropLowest;
                cat.dropHighest = _this.dropHighest;
                cat.percentOfScores = _this.percentOfScores;
                _this.callbackOnClose(cat);
            });
        });
    };
    return NewCategoryModal;
}(obsidian.Modal));

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
    function Progress(plugin, title, label, closingMessage, max) {
        var _this = _super.call(this, plugin.app) || this;
        _this.plugin = plugin;
        _this.title = title;
        _this.label = label;
        _this.closingMessage = closingMessage;
        _this.max = max;
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
                    _this.bar = titleDiv.createEl("progress", { attr: { value: 1, max: "" + _this.max, width: "100%" } });
                });
                return [2 /*return*/];
            });
        });
    };
    Progress.prototype.update = function () {
        var intvalue = parseInt(this.bar.getAttribute("value"));
        intvalue += 1;
        this.bar.setAttribute("value", intvalue.toString());
        if (intvalue >= this.max) {
            this.close();
        }
    };
    Progress.prototype.onClose = function () {
        var contentEl = this.contentEl;
        contentEl.empty();
        if (this.closingMessage.length > 0) {
            new Alert(this.plugin, "Done!", this.closingMessage).open();
        }
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
        _this.listview = false;
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
                                                progress_1 = new Progress(this.plugin, "Sending email", "GradeBox is a plugin for Obsidian Buddy", "All email messages sent.", this.gradeSet.getStudents());
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
                        this.addAction("lucide-calculator", "Add a counter", function () {
                            new NewCounterModal(_this.app, _this.gradeSet, function (counter) {
                                _this.gradeSet.addCounter(counter);
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
                        if (pos < 0) {
                            new Alert(rent.plugin, "Error", "You must choose a file in the vault").open();
                            return [2 /*return*/];
                        }
                        else {
                            file = file.replace(this.app.vault.adapter.basePath + "\\", "");
                        }
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
                                                if (line[positions["email address"]] != undefined) {
                                                    stud.data.set("emailaddress", stud.data.get("emailaddress").replaceAll('"', '').trim());
                                                }
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
                    this.listview = false;
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
                    this.listview = true;
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
                .setTitle('Add a category')
                .setIcon('lucide-layout-list')
                .setSection('pane')
                .onClick(function () { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    new NewCategoryModal(this.app, function (category) {
                        if (category !== undefined)
                            _this.gradeSet.addCategory(category);
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
                .setTitle('Generate class list')
                .setIcon('lucide-layout-list')
                .setSection('pane')
                .onClick(function () { return __awaiter(_this, void 0, void 0, function () {
                var file, liststring;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, app.fileManager.createNewMarkdownFile((_a = app.workspace.getActiveFile()) === null || _a === void 0 ? void 0 : _a.path, /*this.gradeSet.properties.get("title")*/ "classlist.md")];
                        case 1:
                            file = _b.sent();
                            liststring = "# Class List for " + this.gradeSet.properties.get("title") + "\n\n";
                            liststring += '| Name | ID | Email |\n';
                            liststring += "|:---|:---:|:---|\n";
                            this.gradeSet.students.forEach(function (stud) {
                                liststring += "| ".concat(stud.data.get("name"), " ");
                                liststring += "| ".concat(stud.data.get("id"), " ");
                                liststring += "| ".concat(stud.data.get("emailaddress"), " ");
                                liststring += '|\n';
                            });
                            this.plugin.app.vault.append(file, liststring);
                            return [2 /*return*/];
                    }
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
        if (this.listview) {
            this.displayList();
        }
        else {
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
        new obsidian.Setting(this.contentEl).setName("Importing is very picky!").
            setDesc("The file to be imported must be in the vault.  The file will be imported as a CSV file.");
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
                            _this.categories.push(cat);
                        }
                        else if (tag === "#score") {
                            var props = definition.split("|");
                            if (props.length == 2) {
                                var sc = new Score(props[0].trim(), parseFloat(props[1]));
                                cat.addScore(sc);
                            }
                            else {
                                cat = _this.getCategory({ name: props[0].trim() });
                                console.log("Adding score to " + cat.name + " with value " + props[2]);
                                if (cat != null) {
                                    var sc = new Score(props[1].trim(), parseFloat(props[2]));
                                    cat.addScore(sc);
                                }
                            }
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
                //if (cat !== null) this.categories.push(cat);
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
    GradeSet.prototype.renameCategory = function (oldName, newName) {
        var _this = this;
        console.log("Renaming category " + oldName + " to " + newName);
        this.categories.forEach(function (cat) {
            if (cat.name === oldName) {
                cat.name = newName;
                _this.modified = true;
            }
        });
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
                    scorename.createEl("h5", { text: score.name });
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
                    var score = new Score(catname + "|" + name, possible, extraCredit);
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
    GradeSet.prototype.addCounter = function (counter) {
        this.counters.push(counter);
        if (this.students !== undefined && this.students !== null) {
            for (var i = 0; i < this.students.length; i++) {
                this.students[i].addCounter(counter);
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
    GradeSet.prototype.addCategory = function (cat) {
        this.categories.push(cat);
        this.modified = true;
    };
    GradeSet.prototype.deleteCategory = function (cat) {
        this.categories = this.categories.filter(function (c) { return c.name !== cat.name; });
        this.modified = true;
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
        _this.version = "1.2.1 (081524)";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsImRhdGEvU2NvcmUudHMiLCJkYXRhL0NhdGVnb3J5LnRzIiwiZGF0YS9Db3VudGVyLnRzIiwibW9kYWxzL05ld0NvdW50ZXJNb2RhbC50cyIsInV0aWxpdGllcy9VdGlsaXRpZXMudHMiLCJHcmFkZVNldFN1bW1hcnlWaWV3LnRzIiwidXRpbGl0aWVzL2NvZGVtaXJyb3IuanMiLCJ1dGlsaXRpZXMvYWxlcnQudHMiLCJtb2RhbHMvQ291bnRlclRpY2sudHMiLCJ1dGlsaXRpZXMvRGlhbG9nLnRzIiwiZW1haWwudHMiLCJtb2RhbHMvRW1haWxlck1vZGFsLnRzIiwibW9kYWxzL05vdGVNb2RhbC50cyIsImRhdGEvU3R1ZGVudC50cyIsInV0aWxpdGllcy9UZW1wbGF0ZS50cyIsInV0aWxpdGllcy9kcmF3ZG93bi5qcyIsIlN0dWRlbnRWaWV3LnRzIiwibW9kYWxzL0FkZEFic2VuY2VNb2RhbC50cyIsIm1vZGFscy9OZXdDYXRlZ29yeU1vZGFsLnRzIiwiZGF0YS9SZW1pbmRlci50cyIsIm1vZGFscy9OZXdSZW1pbmRlck1vZGFsLnRzIiwibW9kYWxzL05ld1Njb3JlTW9kYWwudHMiLCJtb2RhbHMvTmV3U3R1ZGVudE1vZGFsLnRzIiwidXRpbGl0aWVzL1Byb2dyZXNzLnRzIiwibW9kYWxzL1JlbWluZGVyUG9wdXAudHMiLCJ1dGlsaXRpZXMvU2VtYXBob3JlLnRzIiwiR3JhZGVib3hWaWV3LnRzIiwiZGF0YS9HcmFkZVNldC50cyIsIm1vZGFscy9SZWNlbnRGaWxlc01vZGFsLnRzIiwibWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UsIFN1cHByZXNzZWRFcnJvciwgU3ltYm9sICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2VzRGVjb3JhdGUoY3RvciwgZGVzY3JpcHRvckluLCBkZWNvcmF0b3JzLCBjb250ZXh0SW4sIGluaXRpYWxpemVycywgZXh0cmFJbml0aWFsaXplcnMpIHtcclxuICAgIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxyXG4gICAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcclxuICAgIHZhciB0YXJnZXQgPSAhZGVzY3JpcHRvckluICYmIGN0b3IgPyBjb250ZXh0SW5bXCJzdGF0aWNcIl0gPyBjdG9yIDogY3Rvci5wcm90b3R5cGUgOiBudWxsO1xyXG4gICAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XHJcbiAgICB2YXIgXywgZG9uZSA9IGZhbHNlO1xyXG4gICAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICB2YXIgY29udGV4dCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluLmFjY2VzcykgY29udGV4dC5hY2Nlc3NbcF0gPSBjb250ZXh0SW4uYWNjZXNzW3BdO1xyXG4gICAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XHJcbiAgICAgICAgaWYgKGtpbmQgPT09IFwiYWNjZXNzb3JcIikge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5nZXQpKSBkZXNjcmlwdG9yLmdldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xyXG4gICAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcclxuICAgICAgICAgICAgZWxzZSBkZXNjcmlwdG9yW2tleV0gPSBfO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0YXJnZXQpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbnRleHRJbi5uYW1lLCBkZXNjcmlwdG9yKTtcclxuICAgIGRvbmUgPSB0cnVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcclxuICAgIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0aWFsaXplcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXNlVmFsdWUgPyB2YWx1ZSA6IHZvaWQgMDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Byb3BLZXkoeCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xyXG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCBcIm5hbWVcIiwgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgsIFwiIFwiLCBuYW1lKSA6IG5hbWUgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XHJcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xyXG4gICAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcclxuICAgIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xyXG4gICAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlKGVudiwgdmFsdWUsIGFzeW5jKSB7XHJcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWQuXCIpO1xyXG4gICAgICAgIHZhciBkaXNwb3NlO1xyXG4gICAgICAgIGlmIChhc3luYykge1xyXG4gICAgICAgICAgICBpZiAoIVN5bWJvbC5hc3luY0Rpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNEaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgICAgICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5hc3luY0Rpc3Bvc2VdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGlzcG9zZSA9PT0gdm9pZCAwKSB7XHJcbiAgICAgICAgICAgIGlmICghU3ltYm9sLmRpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuZGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICAgICAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuZGlzcG9zZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgZGlzcG9zZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IG5vdCBkaXNwb3NhYmxlLlwiKTtcclxuICAgICAgICBlbnYuc3RhY2sucHVzaCh7IHZhbHVlOiB2YWx1ZSwgZGlzcG9zZTogZGlzcG9zZSwgYXN5bmM6IGFzeW5jIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoYXN5bmMpIHtcclxuICAgICAgICBlbnYuc3RhY2sucHVzaCh7IGFzeW5jOiB0cnVlIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG52YXIgX1N1cHByZXNzZWRFcnJvciA9IHR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xyXG4gICAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGlzcG9zZVJlc291cmNlcyhlbnYpIHtcclxuICAgIGZ1bmN0aW9uIGZhaWwoZSkge1xyXG4gICAgICAgIGVudi5lcnJvciA9IGVudi5oYXNFcnJvciA/IG5ldyBfU3VwcHJlc3NlZEVycm9yKGUsIGVudi5lcnJvciwgXCJBbiBlcnJvciB3YXMgc3VwcHJlc3NlZCBkdXJpbmcgZGlzcG9zYWwuXCIpIDogZTtcclxuICAgICAgICBlbnYuaGFzRXJyb3IgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgICAgICB3aGlsZSAoZW52LnN0YWNrLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB2YXIgcmVjID0gZW52LnN0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHJlYy5kaXNwb3NlICYmIHJlYy5kaXNwb3NlLmNhbGwocmVjLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZWMuYXN5bmMpIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0KS50aGVuKG5leHQsIGZ1bmN0aW9uKGUpIHsgZmFpbChlKTsgcmV0dXJuIG5leHQoKTsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGZhaWwoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVudi5oYXNFcnJvcikgdGhyb3cgZW52LmVycm9yO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5leHQoKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgX19leHRlbmRzLFxyXG4gICAgX19hc3NpZ24sXHJcbiAgICBfX3Jlc3QsXHJcbiAgICBfX2RlY29yYXRlLFxyXG4gICAgX19wYXJhbSxcclxuICAgIF9fbWV0YWRhdGEsXHJcbiAgICBfX2F3YWl0ZXIsXHJcbiAgICBfX2dlbmVyYXRvcixcclxuICAgIF9fY3JlYXRlQmluZGluZyxcclxuICAgIF9fZXhwb3J0U3RhcixcclxuICAgIF9fdmFsdWVzLFxyXG4gICAgX19yZWFkLFxyXG4gICAgX19zcHJlYWQsXHJcbiAgICBfX3NwcmVhZEFycmF5cyxcclxuICAgIF9fc3ByZWFkQXJyYXksXHJcbiAgICBfX2F3YWl0LFxyXG4gICAgX19hc3luY0dlbmVyYXRvcixcclxuICAgIF9fYXN5bmNEZWxlZ2F0b3IsXHJcbiAgICBfX2FzeW5jVmFsdWVzLFxyXG4gICAgX19tYWtlVGVtcGxhdGVPYmplY3QsXHJcbiAgICBfX2ltcG9ydFN0YXIsXHJcbiAgICBfX2ltcG9ydERlZmF1bHQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRJbixcclxuICAgIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlLFxyXG4gICAgX19kaXNwb3NlUmVzb3VyY2VzLFxyXG59O1xyXG4iLCJleHBvcnQgY2xhc3MgU2NvcmUge1xuICAgIG5hbWU6IHN0cmluZyA9IFwiXCI7XG4gICAgdmFsdWU6IG51bWJlciA9IDAuMDtcbiAgICBleHRyYUNyZWRpdCA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyLCBleHRyYUNyZWQ/OiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHR5cGVvZiBleHRyYUNyZWQgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMuZXh0cmFDcmVkaXQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXh0cmFDcmVkaXQgPSBleHRyYUNyZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXROYW1lKCkge3JldHVybiB0aGlzLm5hbWV9XG4gICAgZ2V0VmFsdWUoKSB7cmV0dXJuIHRoaXMudmFsdWV9XG4gICAgZ2V0RXh0cmFDcmVkaXQoKSB7cmV0dXJuIHRoaXMuZXh0cmFDcmVkaXR9XG5cbiAgICBzZXROYW1lKG5hbWU6IHN0cmluZykge3RoaXMubmFtZSA9IG5hbWU7fVxuICAgIHNldFZhbHVlKHZhbHVlOiBudW1iZXIpIHt0aGlzLnZhbHVlID0gdmFsdWU7fVxuICAgIHNldEV4dHJhQ3JlZGl0KGV4dHJhQ3JlZDogYm9vbGVhbikge3RoaXMuZXh0cmFDcmVkaXQgPSBleHRyYUNyZWQ7fVxuXG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gYHsgXFxcIm5hbWVcXFwiOiBcXFwiJHt0aGlzLm5hbWV9XFxcIiwgYCArXG4gICAgICAgICAgICAgICAgIGBcXFwidmFsdWVcXFwiOiBcXFwiJHt0aGlzLnZhbHVlfVxcXCIsIGAgK1xuICAgICAgICAgICAgICAgICBgXFxcImV4dHJhQ3JlZGl0XFxcIjogXCIke3RoaXMuZXh0cmFDcmVkaXR9XCIgfWA7XG4gICAgfVxufSIsImltcG9ydCB7IFNjb3JlIH0gZnJvbSBcIi4vU2NvcmVcIjtcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiLi9TdHVkZW50XCI7XG5cbmV4cG9ydCBjbGFzcyBDYXRlZ29yeSB7XG4gICAgXG4gICAgc3RhdGljIFNjb3JpbmdNZXRob2QgPSB7XG5cdFx0VE9UQUxfUE9JTlRTOiAwLCBcbiAgICAgICAgVE9UQUxfU0NPUkVfUEVSQ0VOVEFHRTogMSwgXG4gICAgICAgIElORElWSURVQUxfU0NPUkVfUEVSQ0VOVEFHRTogMiwgXG4gICAgICAgIFBFUkNFTlRBR0VfT0ZfVE9UQUxfUE9TU0lCTEU6IDNcblx0fVxuICAgIFxuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgbmFtZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgcHJpdmF0ZSBfd2VpZ2h0OiBudW1iZXI7XG4gICAgcHVibGljIGdldCB3ZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlaWdodDtcbiAgICB9XG4gICAgcHVibGljIHNldCB3ZWlnaHQodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl93ZWlnaHQgPSB2YWx1ZTtcbiAgICB9XG4gICAgc2NvcmluZ01ldGhvZDogbnVtYmVyO1xuICAgIGRyb3BMb3dlc3Q6IG51bWJlcjtcblx0ZHJvcEhpZ2hlc3Q6IG51bWJlcjtcblx0cGVyY2VudE9mU2NvcmVzOiBudW1iZXI7XG4gICAgc2NvcmVTZXQ6IFNjb3JlW107XG5cbiAgICBjb25zdHJ1Y3RvcihvYmo6IGFueSkge1xuICAgICAgICBpZiAob2JqICE9ICBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSAodHlwZW9mIG9iai5uYW1lID09ICd1bmRlZmluZWQnKT9cIm5vIG5hbWVcIjpvYmoubmFtZTtcbiAgICAgICAgICAgIHRoaXMud2VpZ2h0ID0gKHR5cGVvZiBvYmoud2VpZ2h0ID09ICd1bmRlZmluZWQnKT8xLjA6b2JqLndlaWdodDtcbiAgICAgICAgICAgIHRoaXMuc2NvcmluZ01ldGhvZCA9ICh0eXBlb2Ygb2JqLnNjb3JpbmdNZXRob2QgPT0gJ3VuZGVmaW5lZCcpP0NhdGVnb3J5LlNjb3JpbmdNZXRob2QuSU5ESVZJRFVBTF9TQ09SRV9QRVJDRU5UQUdFOm9iai5zY29yaW5nTWV0aG9kO1xuICAgICAgICAgICAgdGhpcy5kcm9wTG93ZXN0ID0gKHR5cGVvZiBvYmouZHJvcExvd2VzdCA9PSAndW5kZWZpbmVkJyk/MDpvYmouZHJvcExvd2VzdDtcbiAgICAgICAgICAgIHRoaXMuZHJvcEhpZ2hlc3QgPSAodHlwZW9mIG9iai5kcm9wSGlnaGVzdCA9PSAndW5kZWZpbmVkJyk/MDpvYmouZHJvcEhpZ2hlc3Q7XG4gICAgICAgICAgICB0aGlzLnBlcmNlbnRPZlNjb3JlcyA9ICh0eXBlb2Ygb2JqLnBlcmNlbnRPZlNjb3JlcyA9PSAndW5kZWZpbmVkJyk/MTpvYmoucGVyY2VudE9mU2NvcmVzO1xuICAgICAgICAgICAgdGhpcy5zY29yZVNldCA9IFtdO1xuICAgICAgICAgICAgY29uc29sZS5sb2cob2JqLnNjb3Jlcyk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iai5zY29yZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFyciA9IEFycmF5LmZyb20ob2JqLnNjb3Jlcyk7XG4gICAgICAgICAgICAgICAgYXJyLmZvckVhY2goKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjb3JlID0gbmV3IFNjb3JlKGRhdGFbJ25hbWUnXSwgZGF0YVsndmFsdWUnXSwgZGF0YVsnZXh0cmFDcmVkaXQnXSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNjb3JlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZVNldC5wdXNoKHNjb3JlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFNjb3JlKHNjb3JlOiBTY29yZSkge1xuICAgICAgICBpZiAodGhpcy5zY29yZVNldCA9PT0gdW5kZWZpbmVkKSBcbiAgICAgICAgICAgIHRoaXMuc2NvcmVTZXQgPSBbXTtcbiAgICAgICAgdGhpcy5zY29yZVNldC5wdXNoKHNjb3JlKTtcbiAgICB9XG5cbiAgICBnZXRTY29yZShjcml0ZXJpb246IGFueSk6IFNjb3JlIHtcbiAgICAgICAgdmFyIHNjb3JlOiBTY29yZTtcblxuICAgICAgICBpZiAoY3JpdGVyaW9uLm5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2NvcmUgPSB0aGlzLnNjb3JlU2V0LmZpbmQoIChzYykgPT4gc2MubmFtZSA9PT0gY3JpdGVyaW9uLm5hbWUpO1xuICAgICAgICB9IFxuXG4gICAgICAgIHJldHVybiBzY29yZTtcbiAgICB9XG5cbiAgICBnZXRTY29yZVNldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NvcmVTZXQ7XG4gICAgfVxuXG4gICAgcmVtb3ZlU2NvcmUoc2NvcmU6IFNjb3JlKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuc2NvcmVTZXQuaW5kZXhPZihzY29yZSk7XG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnNjb3JlU2V0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRTY29yaW5nTWV0aG9kKG1ldGhvZDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2NvcmluZ01ldGhvZCA9IG1ldGhvZDtcbiAgICB9XG5cbiAgICBwb3NzaWJsZSgpOiBudW1iZXIge1xuICAgICAgICBsZXQgdG90YWwgPSAwO1xuICAgICAgICBpZiAodGhpcy5zY29yZVNldCAhPT0gdW5kZWZpbmVkKSBcbiAgICAgICAgICAgIHRoaXMuc2NvcmVTZXQuZm9yRWFjaCggKHNldCkgPT4geyBcbiAgICAgICAgICAgICAgICB0b3RhbCA9IHRvdGFsICsgc2V0LmdldFZhbHVlKCkgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRvdGFsKnRoaXMud2VpZ2h0O1xuICAgIH1cblxuICAgIHN0dWRlbnRUb3RhbFBvaW50c1Njb3JlKHN0dWRlbnQ6IFN0dWRlbnQpOiBudW1iZXIge1xuICAgICAgICBsZXQgdG90YWwgPSAwO1xuICAgICAgICBpZiAodGhpcy5zY29yZVNldCAhPT0gdW5kZWZpbmVkKSBcbiAgICAgICAgICAgIHRoaXMuc2NvcmVTZXQuZm9yRWFjaCggKHNldCkgPT4geyBcbiAgICAgICAgICAgICAgICB0b3RhbCA9IHRvdGFsICsgc3R1ZGVudC5nZXQodGhpcywgc2V0LmdldE5hbWUoKSkgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH1cblxuICAgIHN0dWRlbnRUb3RhbFNjb3JlUGVyY2VudGFnZVNjb3JlKHN0dWRlbnQ6IFN0dWRlbnQpOiBudW1iZXIge1xuICAgICAgICBsZXQgdG90YWwgPSAwO1xuICAgICAgICBsZXQgcG9zc2libGUgPSAwO1xuICAgICAgICBpZiAodGhpcy5zY29yZVNldCAhPT0gdW5kZWZpbmVkKSBcbiAgICAgICAgICAgIHRoaXMuc2NvcmVTZXQuZm9yRWFjaCggKHNldCkgPT4geyBcbiAgICAgICAgICAgICAgICB0b3RhbCA9IHRvdGFsICsgc3R1ZGVudC5nZXQodGhpcywgc2V0LmdldE5hbWUoKSk7XG4gICAgICAgICAgICAgICAgaWYgKCEgc2V0LmV4dHJhQ3JlZGl0KSBwb3NzaWJsZSArPSBzZXQuZ2V0VmFsdWUoKTsgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuICh0b3RhbCAvIHBvc3NpYmxlKSoxMDAuMDtcbiAgICB9XG5cbiAgICBzdHVkZW50SW5kaXZpZHVhbFNjb3JlUGVyY2VudGFnZShzdHVkZW50OiBTdHVkZW50KTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHRvdGFsID0gMDtcbiAgICAgICAgbGV0IGV4dHJhVG90YWwgPSAwO1xuICAgICAgICBpZiAodGhpcy5zY29yZVNldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBGaWd1cmUgb3V0IHdpdGhvdXQgZXh0cmEgY3JlZGl0XG4gICAgICAgICAgICB0aGlzLnNjb3JlU2V0LmZvckVhY2goIChzZXQpID0+IHsgXG4gICAgICAgICAgICAgICAgaWYgKCEgc2V0LmV4dHJhQ3JlZGl0KVxuICAgICAgICAgICAgICAgICAgIHRvdGFsID0gdG90YWwgKyAoIHN0dWRlbnQuZ2V0KHRoaXMsIHNldC5nZXROYW1lKCkpIC8gc2V0LmdldFZhbHVlKCkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEZpZ3VyZSBvdXQgd2l0aCBleHRyYSBjcmVkaXRcbiAgICAgICAgICAgIHRoaXMuc2NvcmVTZXQuZm9yRWFjaCggKHNldCkgPT4geyBcbiAgICAgICAgICAgICAgICBleHRyYVRvdGFsID0gZXh0cmFUb3RhbCArICggc3R1ZGVudC5nZXQodGhpcywgc2V0LmdldE5hbWUoKSkgLyBzZXQuZ2V0VmFsdWUoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgZXh0cmEgY3JlZGl0LCB0aGVuIHVzZSB0aGF0XG4gICAgICAgICAgICBpZiAoZXh0cmFUb3RhbCA+IHRvdGFsKSB0b3RhbCA9IGV4dHJhVG90YWw7XG4gICAgICAgICAgICB0b3RhbCA9IHRvdGFsIC8gdGhpcy5zY29yZVNldC5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvdGFsKjEwMDtcbiAgICB9XG5cbiAgICBzdHVkZW50UGVyY2VudGFnZU9mVG90YWxQb3NzaWJsZShzdHVkZW50OiBTdHVkZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgc3R1ZGVudFNjb3JlKHN0dWRlbnQ6IFN0dWRlbnQpOiBudW1iZXIge1xuICAgICAgICBsZXQgc3R1ZHNjb3JlID0gMDtcbiAgICAgICAgc3dpdGNoICh0aGlzLnNjb3JpbmdNZXRob2QpIHtcbiAgICAgICAgICAgIGNhc2UgQ2F0ZWdvcnkuU2NvcmluZ01ldGhvZC5UT1RBTF9QT0lOVFM6XG4gICAgICAgICAgICAgICAgc3R1ZHNjb3JlID0gdGhpcy5zdHVkZW50VG90YWxQb2ludHNTY29yZShzdHVkZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ2F0ZWdvcnkuU2NvcmluZ01ldGhvZC5UT1RBTF9TQ09SRV9QRVJDRU5UQUdFOlxuICAgICAgICAgICAgICAgIHN0dWRzY29yZSA9IHRoaXMuc3R1ZGVudFRvdGFsU2NvcmVQZXJjZW50YWdlU2NvcmUoc3R1ZGVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENhdGVnb3J5LlNjb3JpbmdNZXRob2QuSU5ESVZJRFVBTF9TQ09SRV9QRVJDRU5UQUdFOlxuICAgICAgICAgICAgICAgIHN0dWRzY29yZSA9IHRoaXMuc3R1ZGVudEluZGl2aWR1YWxTY29yZVBlcmNlbnRhZ2Uoc3R1ZGVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENhdGVnb3J5LlNjb3JpbmdNZXRob2QuUEVSQ0VOVEFHRV9PRl9UT1RBTF9QT1NTSUJMRTpcbiAgICAgICAgICAgICAgICBzdHVkc2NvcmUgPSB0aGlzLnN0dWRlbnRQZXJjZW50YWdlT2ZUb3RhbFBvc3NpYmxlKHN0dWRlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN0dWRzY29yZSp0aGlzLndlaWdodDtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZVhNTCgpOiBzdHJpbmcge1xuXG4gICAgICAgIGxldCB4bWwgPSBcbiAgICAgICAgICAgJzxjYXRlZ29yeSBuYW1lPVwiJyArIHRoaXMubmFtZSBcbiAgICAgICAgICAgICsgJ1wiIHdlaWdodD1cIicgKyB0aGlzLndlaWdodCBcbiAgICAgICAgICAgICsgJ1wiIG1ldGhvZD1cIjInIFxuICAgICAgICAgICAgICAgIC8vICh0aGlzLnNjb3JpbmdNZXRob2QgPT0gQ2F0ZWdvcnkuU2NvcmluZ01ldGhvZC5UT1RBTF9QT0lOVFMpID8gXCIwXCIgOlxuICAgICAgICAgICAgICAgIC8vICAgICh0aGlzLnNjb3JpbmdNZXRob2QgPT0gQ2F0ZWdvcnkuU2NvcmluZ01ldGhvZC5UT1RBTF9TQ09SRV9QRVJDRU5UQUdFKSA/IFwiMVwiIDpcbiAgICAgICAgICAgICAgICAvLyAgICAgICAodGhpcy5zY29yaW5nTWV0aG9kID09IENhdGVnb3J5LlNjb3JpbmdNZXRob2QuSU5ESVZJRFVBTF9TQ09SRV9QRVJDRU5UQUdFKSA/IFwiMlwiIDpcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAodGhpcy5zY29yaW5nTWV0aG9kID09IENhdGVnb3J5LlNjb3JpbmdNZXRob2QuUEVSQ0VOVEFHRV9PRl9UT1RBTF9QT1NTSUJMRSkgPyBcIjNcIiA6IFwiMFwiXG4gICAgICAgICAgICArICdcIiBkcm9wTG93ZXN0PVwiMCcgIC8vdGhpcy5kcm9wTG93ZXN0IFxuICAgICAgICAgICAgKyAnXCIgZHJvcEhpZ2hlc3Q9XCIwJyAgLy90aGlzLmRyb3BIaWdoZXN0IFxuICAgICAgICAgICAgKyAnXCIgcGVyY2VudE9mU2NvcmVzPVwiJyArICh0aGlzLnBlcmNlbnRPZlNjb3JlcyoxMDApIFxuICAgICAgICAgICArICdcIj5cXG4nO1xuICAgICAgICBpZiAodGhpcy5zY29yZVNldCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuc2NvcmVTZXQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVTZXQuZm9yRWFjaCggKHNldCkgPT4geyBcbiAgICAgICAgICAgICAgICB4bWwgKz0gJzxzY29yZSBuYW1lPVwiJyArIHNldC5nZXROYW1lKCkgKyAnXCIgcG9zc2libGU9XCInICsgc2V0LmdldFZhbHVlKCkgKyAnXCIgLz5cXG4nO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgeG1sICs9IFwiPC9jYXRlZ29yeT5cXG5cIjtcblxuICAgICAgICByZXR1cm4geG1sO1xuICAgIH1cblxufSIsImV4cG9ydCBjbGFzcyBDb3VudGVyIHtcblxuICAgIG5hbWU6IHN0cmluZztcbiAgICB2YWx1ZTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudmFsdWUgPSAwO1xuICAgIH1cblxuICAgIHNldCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICAgIHRoaXMudmFsdWUrKztcbiAgICB9XG5cbiAgICBkZWNyZW1lbnQoKSB7XG4gICAgICAgIHRoaXMudmFsdWUtLTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IDA7XG4gICAgfVxuXG5cbn0iLCJpbXBvcnQgeyBBcHAsIERyb3Bkb3duQ29tcG9uZW50LCBLZXltYXBFdmVudEhhbmRsZXIsIE1vZGFsLCBTZXR0aW5nLCBURmlsZSwgVGV4dENvbXBvbmVudCwgVGV4dEZpbGVWaWV3LCBXb3Jrc3BhY2VMZWFmIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5cbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSBcImRhdGEvQ2F0ZWdvcnlcIjtcbmltcG9ydCB7IENvdW50ZXIgfSBmcm9tIFwiZGF0YS9Db3VudGVyXCI7XG5pbXBvcnQgeyBHcmFkZVNldCB9IGZyb20gXCJkYXRhL0dyYWRlU2V0XCI7XG5pbXBvcnQgR3JhZGVib3hQbHVnaW4gZnJvbSBcIm1haW5cIjtcbmltcG9ydCB7IFNjb3JlIH0gZnJvbSBcImRhdGEvU2NvcmVcIjtcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiZGF0YS9TdHVkZW50XCI7XG5cbmV4cG9ydCBjbGFzcyBOZXdDb3VudGVyTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG5cbiAgICBjYWxsYmFja09uQ2xvc2U7XG5cdG5hbWU6IHN0cmluZztcblx0aW5pdGlhbDogbnVtYmVyO1xuXHRmaWVsZHM6IFRleHRDb21wb25lbnRbXTtcdFxuXHRpbml0aWFsRmllbGQ6IFNldHRpbmc7XG5cdGdyYWRlU2V0OiBHcmFkZVNldDtcblx0ZWM6IGJvb2xlYW47XG5cdGVudGVyaGFuZGxlcjogS2V5bWFwRXZlbnRIYW5kbGVyO1xuXHRmaWVsZDogbnVtYmVyO1xuXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBncmFkZVNldDogR3JhZGVTZXQsIGNhbGxiYWNrT25DbG9zZTogKGNvdW50ZXI6IENvdW50ZXIpID0+IHZvaWQpIHtcblx0XHRzdXBlcihhcHApO1xuXHRcdHRoaXMuZ3JhZGVTZXQgPSBncmFkZVNldDtcbiAgICAgICAgdGhpcy5jYWxsYmFja09uQ2xvc2UgPSBjYWxsYmFja09uQ2xvc2U7XG5cdFx0dGhpcy5uYW1lID0gXCJcIjtcdH1cblxuXHRvbk9wZW4oKSB7XG5cdFx0bGV0IHtjb250ZW50RWx9ID0gdGhpcztcblx0XHRcblx0XHRjb250ZW50RWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6ICdOZXcgQ291bnRlcicgfSk7XG5cblx0XHRuZXcgU2V0dGluZyhjb250ZW50RWwpXG5cdFx0ICAgIC5zZXROYW1lKFwiTmFtZVwiKVxuICAgICAgICAgICAgLmFkZFRleHQoKHRleHQpID0+IHRleHRcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUoXCJcIilcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYW1lID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKSk7XG5cblx0XHR0aGlzLmluaXRpYWxGaWVsZCA9IG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcblx0XHRcdC5zZXROYW1lKFwiSW5pdGlhbCBWYWx1ZVwiKVxuXHRcdFx0LmFkZFRleHQoICh0ZXh0KSA9PiBcblx0XHRcdCAgXHR0ZXh0XG5cdFx0XHQgIFx0XHQuc2V0VmFsdWUoXCJcIilcblx0XHRcdFx0XHQub25DaGFuZ2UoICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5pbml0aWFsID0gdmFsdWUgYXMgdW5rbm93biBhcyBudW1iZXI7XG5cdFx0XHRcdFx0fSlcblx0XHRcdCk7XG5cblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcblx0XHQuYWRkQnV0dG9uKChidG4pID0+XG5cdFx0ICBidG5cblx0XHRcdC5zZXRCdXR0b25UZXh0KFwiT0tcIilcblx0XHRcdC5zZXRDdGEoKVxuXHRcdFx0Lm9uQ2xpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb3VudGVyID0gbmV3IENvdW50ZXIodGhpcy5uYW1lKTtcbiAgICAgICAgICAgICAgICBjb3VudGVyLnNldCh0aGlzLmluaXRpYWwpO1xuXHRcdFx0ICBcdHRoaXMuY2xvc2UoKTtcblx0XHRcdFx0dGhpcy5jYWxsYmFja09uQ2xvc2UoY291bnRlcik7XG5cdFx0XHR9XG5cdFx0KSk7XG5cblx0fVxuXG5cdG9uQ2xvc2UoKSB7XG5cdFx0dGhpcy5zY29wZS51bnJlZ2lzdGVyKHRoaXMuZW50ZXJoYW5kbGVyKTtcblx0fVxufVxuXG4iLCJpbXBvcnQgeyBURm9sZGVyIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFV0aWxpdGllcyB7XG5cbiAgICBUQUdTOiBzdHJpbmcgPSBcInRhZ3NcIjtcbiAgICBNQVJLRE9XTjogc3RyaW5nID0gXCJtYXJrZG93blwiO1xuXG4gICAgc3RhdGljIGV4dHJhY3RUYWdzKGRhdGE6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHZhciB0YWc6IHN0cmluZztcbiAgICAgICAgdmFyIGRlZmluaXRpb246IHN0cmluZztcbiAgICAgICAgbGV0IGxpbmVzID0gZGF0YS5zcGxpdChcIlxcblwiKTtcblxuICAgICAgICB2YXIgZXh0cmFjdGlvbjogc3RyaW5nID0gXCJcIjtcblxuICAgICAgICBsaW5lcy5mb3JFYWNoKCAobGluZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAobGluZS5jaGFyQXQoMCkgPT09ICcjJyAmJiBsaW5lLmNoYXJBdCgxKSAhPT0gJyAnKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRhZyA9IGxpbmUuc3Vic3RyaW5nKDAsIGxpbmUuaW5kZXhPZihcIiBcIikpO1xuICAgICAgICAgICAgICAgIGxldCBkZWZpbml0aW9uID0gbGluZS5zdWJzdHJpbmcobGluZS5pbmRleE9mKFwiIFwiKSk7XG4gICAgICAgICAgICAgICAgZGVmaW5pdGlvbiA9IGRlZmluaXRpb24udHJpbSgpO1xuXG4gICAgICAgICAgICAgICAgZXh0cmFjdGlvbiArPSB0YWcgKyBcIiBcIiArIGRlZmluaXRpb24gKyBcIlxcblwiO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIGV4dHJhY3Rpb247XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgZXh0cmFjdChkYXRhOiBzdHJpbmcsIHdoYXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICh3aGF0ID09PSB0aGlzLlRBR1MpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV4dHJhY3RUYWdzKGRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZmlsZUV4aXN0cyhmaWxlTmFtZTogc3RyaW5nLCBmb2xkZXI6IFRGb2xkZXIpOiBCb29sZWFuIHtcblx0XHR2YXIgcmVzOiBib29sZWFuID0gZmFsc2U7XG5cdFx0bGV0IGZpbGUgPSBmb2xkZXIuY2hpbGRyZW4uZmluZChhZmlsZSA9PiBhZmlsZS5uYW1lID09PSBmaWxlTmFtZSk7XG5cdFx0cmV0dXJuIChmaWxlICE9PSB1bmRlZmluZWQpO1xuXHR9XG5cbiAgICBzdGF0aWMgc2xlZXAobXM6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNsZWVwMihtaWxsaXM6IG51bWJlcikge1xuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB2YXIgY3VyRGF0ZSA9IDA7XG4gICAgICAgIHdoaWxlKGN1ckRhdGUtZGF0ZSA8IG1pbGxpcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzbGVlcGluZzogXCIgKyAoY3VyRGF0ZS1kYXRlKSArIFwiIFwiICsgbWlsbGlzICsgXCIgXCIgKyAoY3VyRGF0ZS1kYXRlIDwgbWlsbGlzKSk7XG4gICAgICAgICAgICBjdXJEYXRlID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc3RhdGljIGZpeFRvUGxhY2VzKG51bWJlcjogbnVtYmVyLCBwbGFjZXM6IG51bWJlciA9IDIpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gKE1hdGgucm91bmQobnVtYmVyICogMTAwKSAvIDEwMCkudG9GaXhlZChwbGFjZXMpXG4gICAgfVxuXG4gICAgLy8gRnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NTYwMjQ4L3Byb2dyYW1tYXRpY2FsbHktbGlnaHRlbi1vci1kYXJrZW4tYS1oZXgtY29sb3Itb3ItcmdiLWFuZC1ibGVuZC1jb2xvcnNcbiAgICBzdGF0aWMgcFNCQz0ocCxjMCxjMSxsKT0+e1xuICAgICAgICBsZXQgcixnLGIsUCxmLHQsaCxpPXBhcnNlSW50LG09TWF0aC5yb3VuZCxhPXR5cGVvZihjMSk9PVwic3RyaW5nXCI7XG4gICAgICAgIGlmKHR5cGVvZihwKSE9XCJudW1iZXJcInx8cDwtMXx8cD4xfHx0eXBlb2YoYzApIT1cInN0cmluZ1wifHwoYzBbMF0hPSdyJyYmYzBbMF0hPScjJyl8fChjMSYmIWEpKXJldHVybiBudWxsO1xuICAgICAgICBpZighdGhpcy5wU0JDcil0aGlzLnBTQkNyPShkKT0+e1xuICAgICAgICAgICAgbGV0IG49ZC5sZW5ndGgseD17fTtcbiAgICAgICAgICAgIGlmKG4+OSl7XG4gICAgICAgICAgICAgICAgW3IsZyxiLGFdPWQ9ZC5zcGxpdChcIixcIiksbj1kLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZihuPDN8fG4+NClyZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB4LnI9aShyWzNdPT1cImFcIj9yLnNsaWNlKDUpOnIuc2xpY2UoNCkpLHguZz1pKGcpLHguYj1pKGIpLHguYT1hP3BhcnNlRmxvYXQoYSk6LTFcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlmKG49PTh8fG49PTZ8fG48NClyZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICBpZihuPDYpZD1cIiNcIitkWzFdK2RbMV0rZFsyXStkWzJdK2RbM10rZFszXSsobj40P2RbNF0rZFs0XTpcIlwiKTtcbiAgICAgICAgICAgICAgICBkPWkoZC5zbGljZSgxKSwxNik7XG4gICAgICAgICAgICAgICAgaWYobj09OXx8bj09NSl4LnI9ZD4+MjQmMjU1LHguZz1kPj4xNiYyNTUseC5iPWQ+PjgmMjU1LHguYT1tKChkJjI1NSkvMC4yNTUpLzEwMDA7XG4gICAgICAgICAgICAgICAgZWxzZSB4LnI9ZD4+MTYseC5nPWQ+PjgmMjU1LHguYj1kJjI1NSx4LmE9LTFcbiAgICAgICAgICAgIH1yZXR1cm4geH07XG4gICAgICAgIGg9YzAubGVuZ3RoPjksaD1hP2MxLmxlbmd0aD45P3RydWU6YzE9PVwiY1wiPyFoOmZhbHNlOmgsZj10aGlzLnBTQkNyKGMwKSxQPXA8MCx0PWMxJiZjMSE9XCJjXCI/dGhpcy5wU0JDcihjMSk6UD97cjowLGc6MCxiOjAsYTotMX06e3I6MjU1LGc6MjU1LGI6MjU1LGE6LTF9LHA9UD9wKi0xOnAsUD0xLXA7XG4gICAgICAgIGlmKCFmfHwhdClyZXR1cm4gbnVsbDtcbiAgICAgICAgaWYobClyPW0oUCpmLnIrcCp0LnIpLGc9bShQKmYuZytwKnQuZyksYj1tKFAqZi5iK3AqdC5iKTtcbiAgICAgICAgZWxzZSByPW0oKFAqZi5yKioyK3AqdC5yKioyKSoqMC41KSxnPW0oKFAqZi5nKioyK3AqdC5nKioyKSoqMC41KSxiPW0oKFAqZi5iKioyK3AqdC5iKioyKSoqMC41KTtcbiAgICAgICAgYT1mLmEsdD10LmEsZj1hPj0wfHx0Pj0wLGE9Zj9hPDA/dDp0PDA/YTphKlArdCpwOjA7XG4gICAgICAgIGlmKGgpcmV0dXJuXCJyZ2JcIisoZj9cImEoXCI6XCIoXCIpK3IrXCIsXCIrZytcIixcIitiKyhmP1wiLFwiK20oYSoxMDAwKS8xMDAwOlwiXCIpK1wiKVwiO1xuICAgICAgICBlbHNlIHJldHVyblwiI1wiKyg0Mjk0OTY3Mjk2K3IqMTY3NzcyMTYrZyo2NTUzNitiKjI1NisoZj9tKGEqMjU1KTowKSkudG9TdHJpbmcoMTYpLnNsaWNlKDEsZj91bmRlZmluZWQ6LTIpXG4gICAgfVxuXG59IiwiaW1wb3J0IHsgQnV0dG9uQ29tcG9uZW50LCBJdGVtVmlldywgTWFya2Rvd25FZGl0VmlldywgTWFya2Rvd25SZW5kZXJlciwgVEZpbGUsIFRleHRDb21wb25lbnQsIFRleHRGaWxlVmlldywgV29ya3NwYWNlTGVhZiB9IGZyb20gXCJvYnNpZGlhblwiO1xyXG5cclxuaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tIFwiZGF0YS9DYXRlZ29yeVwiO1xyXG5pbXBvcnQgeyBDb3VudGVyIH0gZnJvbSBcImRhdGEvQ291bnRlclwiO1xyXG5pbXBvcnQgeyBHcmFkZVNldCB9IGZyb20gXCJkYXRhL0dyYWRlU2V0XCI7XHJcbmltcG9ydCBHcmFkZWJveFBsdWdpbiBmcm9tIFwibWFpblwiO1xyXG5pbXBvcnQgeyBOZXdDb3VudGVyTW9kYWwgfSBmcm9tIFwibW9kYWxzL05ld0NvdW50ZXJNb2RhbFwiO1xyXG5pbXBvcnQgeyBTY29yZSB9IGZyb20gXCJkYXRhL1Njb3JlXCI7XHJcbmltcG9ydCBVdGlsaXRpZXMgZnJvbSBcInV0aWxpdGllcy9VdGlsaXRpZXNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBWSUVXX1RZUEVfR1JBREVTRVRfU1VNTUFSWSA9IFwiZ3JhZGVzZXQtc3VtbWFyeS12aWV3XCI7XHJcbmV4cG9ydCBjb25zdCBQUkVWSUVXX01PREUgPSAyO1xyXG5leHBvcnQgY29uc3QgRURJVElOR19NT0RFID0gMTtcclxuXHJcbmV4cG9ydCBjbGFzcyBHcmFkZVNldFN1bW1hcnlWaWV3IGV4dGVuZHMgSXRlbVZpZXcge1xyXG5cclxuICBwbHVnaW46IEdyYWRlYm94UGx1Z2luO1xyXG4gIGdyYWRlU2V0UGF0aDogc3RyaW5nO1xyXG4gIGZyb250bWF0dGVyIDogc3RyaW5nO1xyXG4gIGdyYWRlU2V0RGF0YTogc3RyaW5nO1xyXG4gIGdyYWRlU2V0OiBHcmFkZVNldDtcclxuICBjb250YWluZXI6IEVsZW1lbnQ7XHJcblxyXG4gIHN0YXR1c2JhckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gIHByZXZpZXdFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICBlZGl0RWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgc2F2ZUVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cclxuICAvLyBpbnRlcm5hbCBjb2RlIG1pcnJvciBpbnN0YW5jZVxyXG4gIGNvZGVNaXJyb3I6IENvZGVNaXJyb3IuRWRpdG9yO1xyXG5cclxuICBtb2RlOiBudW1iZXI7XHJcbiAgbW9kaWZpZWQ6IGJvb2xlYW47XHJcbiAgbnVtQ291bnRlcnM6IG51bWJlcjtcclxuICBjb3VudGVyczogQ291bnRlcltdO1xyXG5cclxuICBjb3VudGVyc0NoYW5nZWQ6IHN0cmluZ1tdO1xyXG4gIHJlbWluZGVyc0NoYW5nZWQ6IHN0cmluZ1tdO1xyXG4gIGNhdHNDaGFuZ2VkOiBzdHJpbmdbXTtcclxuICBzY29yZXNDaGFuZ2VkOiBzdHJpbmdbXTtcclxuXHJcbiAgLy8gdGhpcy5jb250ZW50RWwgaXMgbm90IGV4cG9zZWQsIHNvIGNoZWF0IGEgYml0LlxyXG4gIHB1YmxpYyBnZXQgZXh0Q29udGVudEVsKCk6IEhUTUxFbGVtZW50IHtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIHJldHVybiB0aGlzLmNvbnRlbnRFbDtcclxuICB9ICBcclxuICBcclxuICBjb25zdHJ1Y3RvcihsZWFmOiBXb3Jrc3BhY2VMZWFmLCBwbHVnaW46IEdyYWRlYm94UGx1Z2luKSB7XHJcbiAgICBzdXBlcihsZWFmKTtcclxuXHJcbiAgICB0aGlzLm5hdmlnYXRpb24gPSB0cnVlO1xyXG4gICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XHJcbiAgICAvLyBNYWtlIGNvcGllcyBvZiB0aGVzZVxyXG4gICAgdGhpcy5ncmFkZVNldERhdGEgPSBwbHVnaW4uZ3JhZGVTZXQuZ3JhZGVTZXREYXRhO1xyXG4gICAgdGhpcy5ncmFkZVNldCA9IHBsdWdpbi5ncmFkZVNldDtcclxuICAgIC8vY29uc29sZS5sb2coXCJDT05TVFJVQ1RPUjogbW9kaWZpZWQgPSBcIit0aGlzLmdyYWRlU2V0Lm1vZGlmaWVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgdGhpcy5tb2RlID0gRURJVElOR19NT0RFO1xyXG4gICAgdGhpcy5jb3VudGVycyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgZ2V0Vmlld1R5cGUoKSB7XHJcbiAgICByZXR1cm4gVklFV19UWVBFX0dSQURFU0VUX1NVTU1BUlk7XHJcbiAgfVxyXG5cclxuICBnZXREaXNwbGF5VGV4dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmdyYWRlU2V0LnByb3BlcnRpZXMuZ2V0KFwidGl0bGVcIikgKyBcIiBTdW1tYXJ5XCI7XHJcbiAgfVxyXG5cclxuICAvLyBPcGVuIHRoZSB2aWV3XHJcbiAgLy8gR2VuZXJhdGUgTWFya2Rvd24gaW50byBhIHN0cmluZywgd3JpdGUgdGhlIHN0cmluZyBpbnRvIGEgbm90ZVxyXG5cclxuICBhc3luYyBvbk9wZW4oKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIlN1bW1hcnkgT3BlbmluZ1wiKTtcclxuXHJcbiAgICB0aGlzLnByZXZpZXdFbGVtZW50ID0gdGhpcy5hZGRBY3Rpb24oXCJsdWNpZGUtYm9vay1vcGVuXCIsIFwicHJldmlldyBtb2RlXCIsICgpID0+IHtcclxuICAgICAgdGhpcy5zZXRQcmV2aWV3TW9kZSgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmVkaXRFbGVtZW50ID0gdGhpcy5hZGRBY3Rpb24oXCJsdWNpZGUtZWRpdC0zXCIsIFwiZWRpdCBtb2RlXCIsICgpID0+IHtcclxuICAgICAgdGhpcy5zZXRFZGl0aW5nTW9kZSgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmFkZEFjdGlvbihcImx1Y2lkZS1jYWxjdWxhdG9yXCIsIFwiQWRkIGEgY291bnRlclwiLCAoKSA9PiB7XHJcblx0XHQgIG5ldyBOZXdDb3VudGVyTW9kYWwodGhpcy5hcHAsIHRoaXMuZ3JhZGVTZXQsIChjb3VudGVyOiBDb3VudGVyKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmdyYWRlU2V0LmFkZENvdW50ZXIoY291bnRlcik7XHJcbiAgICAgICAgICB0aGlzLmdyYWRlU2V0Lm1vZGlmaWVkID0gdHJ1ZTtcclxuICAgICAgICAgIC8vdGhpcy5ncmFkZVNldC53cml0ZUdyYWRlU2V0KCk7XHJcbiAgICAgICAgICAvL3RoaXMuZGlzcGxheSgpO1xyXG4gICAgICAgICAgaWYgKHRoaXMubW9kZSA9PSBFRElUSU5HX01PREUpIHRoaXMuc2V0RWRpdGluZ01vZGUodHJ1ZSk7XHJcbiAgICAgICAgICBpZiAodGhpcy5tb2RlID09IFBSRVZJRVdfTU9ERSkgdGhpcy5zZXRQcmV2aWV3TW9kZSh0cnVlKTtcclxuICAgICAgfSkub3BlbigpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAvLyBSZWNvcmQgdGhlIFwic3RhdGVcIiBvZiB0aGUgZ3JhZGVzZXQgc28gd2UgY2FuIGRldGVjdCBjaGFuZ2VzXHJcbiAgICB0aGlzLm51bUNvdW50ZXJzID0gKHRoaXMuZ3JhZGVTZXQuY291bnRlcnMgPT0gdW5kZWZpbmVkKT8wOnRoaXMuZ3JhZGVTZXQuY291bnRlcnMubGVuZ3RoO1xyXG4gICAgdGhpcy5ncmFkZVNldC5jb3VudGVycy5mb3JFYWNoKCAoY291bnRlcikgPT4geyB0aGlzLmNvdW50ZXJzLnB1c2goY291bnRlcik7IH0pO1xyXG5cclxuICAgIHRoaXMubW9kaWZpZWQgPSB0aGlzLmdyYWRlU2V0Lm1vZGlmaWVkO1xyXG5cclxuICAgIHRoaXMuc2V0UHJldmlld01vZGUoKTtcclxuICB9XHJcblxyXG4gIHNldFByZXZpZXdNb2RlKGZvcmNlOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgIGlmICh0aGlzLm1vZGUgPT0gUFJFVklFV19NT0RFICYmICFmb3JjZSkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMubW9kZSA9IFBSRVZJRVdfTU9ERTtcclxuXHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyRWwuY2hpbGRyZW5bMV07XHJcbiAgICB0aGlzLmNvbnRhaW5lci5lbXB0eSgpO1xyXG4gICAgY29uc3QgZGl2ID0gdGhpcy5jb250YWluZXIuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwidmlldy1zdHlsZVwiIH0pO1xyXG4gICAgbGV0IGdyYWRlU2V0Tm90ZSA9IHRoaXMuZ2VuZXJhdGVNYXJrZG93bkZyb21HcmFkZVNldCgpO1xyXG4gICAgbGV0IG1hcmtkb3duID0gTWFya2Rvd25SZW5kZXJlci5yZW5kZXJNYXJrZG93bihncmFkZVNldE5vdGUsIGRpdiwgbnVsbCwgbnVsbCk7XHJcblxyXG4gICAgdGhpcy5lZGl0RWxlbWVudC5zaG93KCk7XHJcbiAgICB0aGlzLnByZXZpZXdFbGVtZW50LmhpZGUoKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIlBSRVZJRVcgTU9ERTogbW9kaWZpZWQgPSBcIit0aGlzLm1vZGlmaWVkKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHNldEVkaXRpbmdNb2RlKGZvcmNlOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgIGlmICh0aGlzLm1vZGUgPT0gRURJVElOR19NT0RFICYmICFmb3JjZSkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMubW9kZSA9IEVESVRJTkdfTU9ERTtcclxuXHJcbiAgICB0aGlzLmNvbnRhaW5lci5lbXB0eSgpO1xyXG5cclxuICAgIHRoaXMuZ2VuZXJhdGVFZGl0SFRNTCh0aGlzLmNvbnRhaW5lcik7XHJcblxyXG4gICAgdGhpcy5lZGl0RWxlbWVudC5oaWRlKCk7IFxyXG4gICAgdGhpcy5wcmV2aWV3RWxlbWVudC5zaG93KCk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJFRElUIE1PREUgMjogbW9kaWZpZWQgPSBcIit0aGlzLm1vZGlmaWVkKTtcclxuICB9XHJcblxyXG4gIC8vIHNldCB0aGUgZmlsZSBjb250ZW50c1xyXG4gIHNldFZpZXdEYXRhID0gKGRhdGE6IHN0cmluZywgY2xlYXI6IGJvb2xlYW4pID0+IHtcclxuICB9XHJcbiAgXHJcbiAgYXN5bmMgb25DbG9zZSgpIHtcclxuICAgIHRoaXMubW9kaWZpZWQgPSB0aGlzLm1vZGlmaWVkIHx8ICh0aGlzLmNhdHNDaGFuZ2VkLmxlbmd0aCA+IDApIHx8ICh0aGlzLmNvdW50ZXJzQ2hhbmdlZC5sZW5ndGggPiAwKSB8fCAodGhpcy5zY29yZXNDaGFuZ2VkLmxlbmd0aCA+IDApO1xyXG4gICAgaWYgKHRoaXMubW9kaWZpZWQpIHtcclxuXHJcbiAgICAgIC8vIENoZWNrIGNhdGVnb3JpZXNcclxuICAgICAgdGhpcy5jYXRzQ2hhbmdlZC5mb3JFYWNoKCAoY2F0KSA9PiB7XHJcbiAgICAgICAgbGV0IG9sZE5hbWUgPSBjYXQuc3BsaXQoXCJ+fj5cIilbMF07XHJcbiAgICAgICAgbGV0IG5ld05hbWUgPSBjYXQuc3BsaXQoXCJ+fj5cIilbMV07XHJcbiAgICAgICAgdGhpcy5ncmFkZVNldC5yZW5hbWVDYXRlZ29yeShvbGROYW1lLCBuZXdOYW1lKTtcclxuICAgICAgICB0aGlzLmdyYWRlU2V0LnN0dWRlbnRzLmZvckVhY2goIChzdHVkZW50KSA9PiB7XHJcbiAgICAgICAgICBzdHVkZW50LnJlbmFtZUNhdGVnb3J5KG9sZE5hbWUsIG5ld05hbWUpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5ncmFkZVNldC5tb2RpZmllZCA9IHRydWU7XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAvLyBDaGVjayBjb3VudGVycyAvIGFkanVzdCBzdHVkZW50cyBpZiBuZWNlc3NhcnlcclxuICAgICAgY29uc29sZS5sb2codGhpcy5jb3VudGVyc0NoYW5nZWQpO1xyXG4gICAgICB0aGlzLmNvdW50ZXJzQ2hhbmdlZC5mb3JFYWNoKCAoY291bnRlcikgPT4ge1xyXG4gICAgICAgIGxldCBuYW1lID0gY291bnRlci5zcGxpdChcIn5+PlwiKVswXTtcclxuICAgICAgICBsZXQgdmFsdWUgPSBjb3VudGVyLnNwbGl0KFwifn4+XCIpWzFdO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ09VTlRFUiBDSEFOR0VEOiBcIituYW1lKyBcIiB0byBcIiArIHZhbHVlKTtcclxuXHJcbiAgICAgICAgdGhpcy5ncmFkZVNldC5zdHVkZW50cy5mb3JFYWNoKCAoc3R1ZGVudCkgPT4ge1xyXG4gICAgICAgICAgbGV0IHNjID0gc3R1ZGVudC5nZXRDb3VudGVyKG5hbWUpO1xyXG4gICAgICAgICAgaWYgKHNjICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoYW5naW5nIFwiK25hbWUrIFwiIHRvIFwiICsgdmFsdWUgKyBcIiBmb3IgXCIgKyBzYy5uYW1lICsgXCIgPSBcIiArIHNjLnZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBcIi0xXCIpIHtcclxuICAgICAgICAgICAgICBzdHVkZW50LmRlbGV0ZUNvdW50ZXIoc2MpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGxldCBudW1lcmljVmFsdWUgPSBOdW1iZXIodmFsdWUpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTnVtZXJpYyB2YWx1ZSA9IFwiK251bWVyaWNWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgaWYgKCFOdW1iZXIuaXNOYU4obnVtZXJpY1ZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgc2MubmFtZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgc3R1ZGVudC51cGRhdGVDb3VudGVyTmFtZShuYW1lLCBzYyk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBkaWZmID0gbnVtZXJpY1ZhbHVlIC0gc2MudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBzYy52YWx1ZSA9IHNjLnZhbHVlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5ncmFkZVNldC5tb2RpZmllZCA9IHRydWU7XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAvLyBDaGVjayBzY29yZXMgdGhhdCBoYXZlIGNoYW5nZWRcclxuICAgICAgdGhpcy5zY29yZXNDaGFuZ2VkLmZvckVhY2goIChzY29yZSkgPT4ge1xyXG4gICAgICAgIGxldCBvbGROYW1lID0gc2NvcmUuc3BsaXQoXCJ+fj5cIilbMF07XHJcbiAgICAgICAgbGV0IG5ld05hbWUgPSBzY29yZS5zcGxpdChcIn5+PlwiKVsxXTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNDT1JFIENIQU5HRUQ6IFwiK29sZE5hbWUrIFwiIHRvIFwiICsgbmV3TmFtZSk7XHJcbiAgICAgICAgdGhpcy5ncmFkZVNldC5zdHVkZW50cy5mb3JFYWNoKCAoc3R1ZGVudCkgPT4ge1xyXG4gICAgICAgICAgc3R1ZGVudC5yZW5hbWVTY29yZShvbGROYW1lLCBuZXdOYW1lKTtcclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLmdyYWRlU2V0Lm1vZGlmaWVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnBsdWdpbi5ncmFkZVNldC5tb2RpZmllZCA9IHRoaXMubW9kaWZpZWQ7XHJcbiAgICB0aGlzLnBsdWdpbi5ncmFkZUJveFZpZXcuZGlzcGxheSgpO1xyXG4gICAgY29uc29sZS5sb2coXCJHU0VUU1VNTUFSWSwgR1MuTU9ESUZJRUQgPSBcIit0aGlzLm1vZGlmaWVkKTtcclxuICAgIHRoaXMuYXBwLndvcmtzcGFjZS5kZXRhY2hMZWF2ZXNPZlR5cGUoVklFV19UWVBFX0dSQURFU0VUX1NVTU1BUlkpO1xyXG5cclxuICB9XHJcblxyXG4gIGNsZWFyKCkge1xyXG5cclxuICB9XHJcblxyXG4gIGdlbmVyYXRlTWFya2Rvd25Gcm9tR3JhZGVTZXQoKSB7XHJcbiAgICB2YXIgZ3JhZGVTZXROb3RlOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIC8vIFRpdGxlIFxyXG4gICAgZ3JhZGVTZXROb3RlICs9IFwiLS0tLVxcbiMgXCIrdGhpcy5ncmFkZVNldC5wcm9wZXJ0aWVzLmdldCgndGl0bGUnKTtcclxuICAgIGdyYWRlU2V0Tm90ZSArPSBcIlxcbi0tLS1cXG5cIjsgXHJcblxyXG4gICAgLy8gQ2xhc3MgZGF0YVxyXG4gICAgZ3JhZGVTZXROb3RlICs9IFwiXFxuIyMjIFwiK3RoaXMuZ3JhZGVTZXQuZ2V0U3R1ZGVudHMoKStcIiBzdHVkZW50cy5cXG5cIjtcclxuICAgIGlmICh0aGlzLmdyYWRlU2V0Lmxhc3RNb2RpZmllZCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgZ3JhZGVTZXROb3RlICs9IFwiIyMjIExhc3QgbW9kaWZpZWQ6IFwiK3RoaXMuZ3JhZGVTZXQubGFzdE1vZGlmaWVkLnRvTG9jYWxlU3RyaW5nKCkrXCJcXG5cIjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmdyYWRlU2V0LmNvdW50ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgZ3JhZGVTZXROb3RlICs9IFwiIyMjIENvdW50ZXJzXFxuXCI7XHJcbiAgICAgIHRoaXMuZ3JhZGVTZXQuY291bnRlcnMuZm9yRWFjaCggKGNvdW50ZXIpID0+IHtcclxuICAgICAgICBncmFkZVNldE5vdGUgKz0gXCIgLSBcIitjb3VudGVyLm5hbWUrJywgaW5pdGlhbCA9ICcrY291bnRlci52YWx1ZSsnXFxuJztcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5ncmFkZVNldC5yZW1pbmRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICBncmFkZVNldE5vdGUgKz0gXCIjIyMgUmVtaW5kZXJzXFxuXCI7XHJcbiAgICAgIHRoaXMuZ3JhZGVTZXQucmVtaW5kZXJzLmZvckVhY2goIChyZW1pbmRlcikgPT4ge1xyXG4gICAgICAgIGdyYWRlU2V0Tm90ZSArPSAnIC0gXCInK3JlbWluZGVyLnRleHQrJ1wiIG9uICcrcmVtaW5kZXIuZGF0ZS50b0xvY2FsZVN0cmluZygpO1xyXG4gICAgICAgIGlmIChyZW1pbmRlci5yZXBlYXQgPiAwKSBncmFkZVNldE5vdGUgKz0gJywgcmVwZWF0cyBldmVyeSAnK3JlbWluZGVyLnJlcGVhdCsnIGRheXMnO1xyXG4gICAgICAgIGlmIChyZW1pbmRlci5wcmlvciA+IDApIGdyYWRlU2V0Tm90ZSArPSAnLCBwcmlvciA9ICcrcmVtaW5kZXIucHJpb3IrJyBkYXlzJztcclxuICAgICAgICBncmFkZVNldE5vdGUgKz0gJ1xcbic7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZ3JhZGVTZXQuZ2V0U3R1ZGVudHMoKSA+IDApIHtcclxuICAgICAgZ3JhZGVTZXROb3RlICs9IFwiIyMjIENsYXNzIGF2ZXJhZ2UgPSBcIitVdGlsaXRpZXMuZml4VG9QbGFjZXModGhpcy5ncmFkZVNldC5jbGFzc0F2ZXJhZ2UoKSk7XHJcbiAgICAgIGlmICghIHRoaXMuZ3JhZGVTZXQuYWxsQ2F0ZWdvcmllc0hhdmVTY29yZXMoKSkge1xyXG4gICAgICAgIGxldCBleHRyYXAgPSB0aGlzLmdyYWRlU2V0LmNsYXNzQXZlcmFnZSgpIC8gdGhpcy5ncmFkZVNldC53ZWlnaHRUb3RhbCgpXHJcbiAgICAgICAgZ3JhZGVTZXROb3RlICs9IFwiIChcIiArIFV0aWxpdGllcy5maXhUb1BsYWNlcyhleHRyYXApICsgXCIlKVwiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBncmFkZVNldE5vdGUgKz0gXCJcXG4tLS0tXFxuXCI7XHJcblxyXG4gICAgLy8gQ2F0ZWdvcnkgbGlzdGluZ3Mgd2l0aCBkYXRhIGFuZCBzY29yZXNcclxuICAgIGlmICh0aGlzLmdyYWRlU2V0LmNhdGVnb3JpZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICBncmFkZVNldE5vdGUgKz0gXCIjIyBDYXRlZ29yaWVzXFxuXCI7XHJcbiAgICAgIHRoaXMuZ3JhZGVTZXQuY2F0ZWdvcmllcy5mb3JFYWNoKCAoY2F0OiBDYXRlZ29yeSkgPT4ge1xyXG4gICAgICAgIGdyYWRlU2V0Tm90ZSArPSBcIj4gWyFub3RlXSBcIitjYXQubmFtZSsnXFxuJztcclxuICAgICAgICBncmFkZVNldE5vdGUgKz0gXCI+IC0gV2VpZ2h0OiBcIitjYXQud2VpZ2h0KydcXG4nO1xyXG4gICAgICAgIGdyYWRlU2V0Tm90ZSArPSBcIj4gLSBcIisoY2F0LnBlcmNlbnRPZlNjb3JlcyoxMDApKyclIG9mIHNjb3JlcyB1c2VkXFxuJ1xyXG4gICAgICAgIGdyYWRlU2V0Tm90ZSArPSBcIj4gPiBbIWV4YW1wbGVdIFNjb3Jlc1xcblwiO1xyXG4gICAgICAgIGdyYWRlU2V0Tm90ZSArPSBcIj4gPiBcXG5cIjtcclxuXHJcbiAgICAgICAgaWYgKGNhdC5zY29yZVNldCA9PSB1bmRlZmluZWQgfHwgY2F0LnNjb3JlU2V0Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICBncmFkZVNldE5vdGUgKz0gXCJObyBzY29yZXNcXG5cIlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBncmFkZVNldE5vdGUgKz0gXCI+ID4gfCBOYW1lIHwgUG9zc2libGUgfCBBdmVyYWdlIHxcXG5cIjtcclxuICAgICAgICAgIGdyYWRlU2V0Tm90ZSArPSBcIj4gPiB8LS0tLS0tfDotLS0tLS0tLTp8Oi0tLS0tLS06fFxcblwiO1xyXG4gICAgICAgICAgY2F0LnNjb3JlU2V0LmZvckVhY2goIChzYzogU2NvcmUpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gTWF0aC5yb3VuZChzYy5nZXRWYWx1ZSgpKjEwMCkvMTAwO1xyXG4gICAgICAgICAgICBsZXQgY2xhc3NBdmUgPSBNYXRoLnJvdW5kKHRoaXMuZ3JhZGVTZXQuY2xhc3NTY29yZUF2ZXJhZ2UoY2F0LCBzYy5uYW1lKSoxMDApLzEwMDtcclxuICAgICAgICAgICAgbGV0IHBlcmNlbnQgPSBNYXRoLnJvdW5kKGNsYXNzQXZlL3NjLmdldFZhbHVlKCkqMTAwMDApLzEwMDtcclxuICAgICAgICAgICAgZ3JhZGVTZXROb3RlICs9IFwiPiA+IHwgXCIrc2MuZ2V0TmFtZSgpKycgfCAnK3ZhbHVlK1wiIHwgXCIrcGVyY2VudCtcIiUgKFwiK2NsYXNzQXZlK1wiKSB8XFxuXCI7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBncmFkZVNldE5vdGUgKz0gXCJcXG5cIjtcclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGdyYWRlU2V0Tm90ZSArPSBcIiMjIE5vIGNhdGVnb3JpZXNcXG5cIjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIGdyYWRlU2V0Tm90ZTtcclxuXHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZUVkaXRIVE1MKGNvbnRhaW5lcjogRWxlbWVudCkge1xyXG4gICAgdGhpcy5jb3VudGVyc0NoYW5nZWQgPSBbXTtcclxuICAgIHRoaXMucmVtaW5kZXJzQ2hhbmdlZCA9IFtdO1xyXG4gICAgdGhpcy5jYXRzQ2hhbmdlZCA9IFtdO1xyXG4gICAgdGhpcy5zY29yZXNDaGFuZ2VkID0gW107XHJcblxyXG4gICAgY29udGFpbmVyLmVtcHR5KCk7XHJcblxyXG4gICAgbGV0IHRpdGxlQ29udGFpbmVyID0gY29udGFpbmVyLmNyZWF0ZURpdigpO1xyXG4gICAgdGl0bGVDb250YWluZXIuY3JlYXRlRWwoXCJoclwiKTtcclxuXHJcbiAgICAvLyBUaXRsZVxyXG4gICAgdGl0bGVDb250YWluZXIuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IFwiQ2xhc3MgVGl0bGVcIiB9KTtcclxuICAgIGxldCBlZGl0VGl0bGUgPSBuZXcgVGV4dENvbXBvbmVudCh0aXRsZUNvbnRhaW5lcik7XHJcbiAgICBlZGl0VGl0bGUuaW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIndpZHRoOiAzMCU7XCIpO1xyXG4gICAgZWRpdFRpdGxlLnNldFZhbHVlKHRoaXMuZ3JhZGVTZXQucHJvcGVydGllcy5nZXQoJ3RpdGxlJykpO1xyXG4gICAgZWRpdFRpdGxlLm9uQ2hhbmdlKCAodmFsdWUpID0+IHtcclxuICAgICAgdGhpcy5ncmFkZVNldC5wcm9wZXJ0aWVzLnNldCgndGl0bGUnLCB2YWx1ZSk7XHJcbiAgICAgIHRoaXMubW9kaWZpZWQgPSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgICB0aXRsZUNvbnRhaW5lci5jcmVhdGVFbChcImhyXCIpO1xyXG5cclxuICAgIC8vIENvdW50ZXJzXHJcbiAgICBsZXQgY291bnRlckNvbnRhaW5lciA9IGNvbnRhaW5lci5jcmVhdGVEaXYoKTtcclxuICAgIGlmICh0aGlzLmdyYWRlU2V0LmNvdW50ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY291bnRlckNvbnRhaW5lci5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogXCJDb3VudGVyc1wiIH0pO1xyXG4gICAgICBsZXQgY291bnRlclRhYmxlID0gY291bnRlckNvbnRhaW5lci5jcmVhdGVFbChcInRhYmxlXCIpO1xyXG5cclxuICAgICAgbGV0IGhlYWRlclJvdyA9IGNvdW50ZXJUYWJsZS5jcmVhdGVFbChcInRyXCIpO1xyXG4gICAgICBoZWFkZXJSb3cuY3JlYXRlRWwoXCJ0aFwiLCB7IHRleHQ6IFwiTmFtZVwiIH0pO1xyXG4gICAgICBoZWFkZXJSb3cuY3JlYXRlRWwoXCJ0aFwiLCB7IHRleHQ6IFwiSW5pdGlhbCBWYWx1ZVwiIH0pO1xyXG5cclxuICAgICAgdGhpcy5ncmFkZVNldC5jb3VudGVycy5mb3JFYWNoKCAoY291bnRlcikgPT4ge1xyXG4gICAgICAgIGxldCByb3cgPSBjb3VudGVyVGFibGUuY3JlYXRlRWwoXCJ0clwiKTtcclxuICAgICAgICBsZXQgY2VsbCA9IHJvdy5jcmVhdGVFbChcInRkXCIpO1xyXG4gICAgICAgIGxldCBlZGl0Q291bnRlciA9IG5ldyBUZXh0Q29tcG9uZW50KGNlbGwpO1xyXG4gICAgICAgIGVkaXRDb3VudGVyLnNldFZhbHVlKGNvdW50ZXIubmFtZSk7XHJcbiAgICAgICAgZWRpdENvdW50ZXIub25DaGFuZ2UoICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJDT1VOVEVSIENIQU5HRUQ6IFwiK2NvdW50ZXIubmFtZStcIn5+PlwiK3ZhbHVlKTtcclxuICAgICAgICAgIHRoaXMuY291bnRlcnNDaGFuZ2VkLnB1c2goY291bnRlci5uYW1lK1wifn4+XCIrdmFsdWUpO1xyXG4gICAgICAgICAgY291bnRlci5uYW1lID0gdmFsdWU7XHJcbiAgICAgICAgICB0aGlzLm1vZGlmaWVkID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjZWxsID0gcm93LmNyZWF0ZUVsKFwidGRcIik7XHJcbiAgICAgICAgbGV0IGVkaXRDb3VudGVyVmFsdWUgPSBuZXcgVGV4dENvbXBvbmVudChjZWxsKTtcclxuICAgICAgICBlZGl0Q291bnRlclZhbHVlLnNldFZhbHVlKFwiXCIrY291bnRlci52YWx1ZSk7XHJcbiAgICAgICAgZWRpdENvdW50ZXJWYWx1ZS5vbkNoYW5nZSggKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICBjb3VudGVyLnZhbHVlID0gTnVtYmVyKHZhbHVlKTtcclxuICAgICAgICAgIHRoaXMuY291bnRlcnNDaGFuZ2VkLnB1c2goY291bnRlci5uYW1lK1wifn4+XCIrdmFsdWUpO1xyXG4gICAgICAgICAgdGhpcy5tb2RpZmllZCA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2VsbCA9IHJvdy5jcmVhdGVFbChcInRkXCIpO1xyXG4gICAgICAgIGxldCBkZWxCdXR0b24gPSBuZXcgQnV0dG9uQ29tcG9uZW50KGNlbGwpO1xyXG4gICAgICAgIGRlbEJ1dHRvbi5zZXRCdXR0b25UZXh0KFwiWFwiKTtcclxuICAgICAgICBkZWxCdXR0b24ub25DbGljayggKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdyYWRlU2V0LmNvdW50ZXJzLnNwbGljZSh0aGlzLmdyYWRlU2V0LmNvdW50ZXJzLmluZGV4T2YoY291bnRlciksIDEpO1xyXG4gICAgICAgICAgICB0aGlzLmNvdW50ZXJzQ2hhbmdlZC5wdXNoKGNvdW50ZXIubmFtZStcIn5+PlwiKygtMSkpO1xyXG4gICAgICAgICAgICByb3cucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgfSk7XHJcbiAgICAgIGNvdW50ZXJDb250YWluZXIuY3JlYXRlRWwoXCJoclwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZW1pbmRlcnNcclxuICAgIGxldCByZW1pbmRlckNvbnRhaW5lciA9IGNvbnRhaW5lci5jcmVhdGVEaXYoKTtcclxuICAgIGlmICh0aGlzLmdyYWRlU2V0LnJlbWluZGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJlbWluZGVyQ29udGFpbmVyLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBcIlJlbWluZGVyc1wiIH0pO1xyXG4gICAgICBsZXQgcmVtVGFibGUgPSByZW1pbmRlckNvbnRhaW5lci5jcmVhdGVFbChcInRhYmxlXCIpO1xyXG5cclxuICAgICAgbGV0IGhlYWRlclJvdyA9IHJlbVRhYmxlLmNyZWF0ZUVsKFwidHJcIik7XHJcbiAgICAgIGhlYWRlclJvdy5jcmVhdGVFbChcInRoXCIsIHsgdGV4dDogXCJUZXh0XCIgfSk7XHJcbiAgICAgIGhlYWRlclJvdy5jcmVhdGVFbChcInRoXCIsIHsgdGV4dDogXCJEYXRlXCIgfSk7XHJcbiAgICAgIGhlYWRlclJvdy5jcmVhdGVFbChcInRoXCIsIHsgdGV4dDogXCJSZXBlYXRcIiB9KTtcclxuICAgICAgaGVhZGVyUm93LmNyZWF0ZUVsKFwidGhcIiwgeyB0ZXh0OiBcIlByaW9yXCIgfSk7XHJcblxyXG4gICAgICB0aGlzLmdyYWRlU2V0LnJlbWluZGVycy5mb3JFYWNoKCAocmVtaW5kZXIpID0+IHtcclxuICAgICAgICAvLyBncmFkZVNldE5vdGUgKz0gJyAtIFwiJytyZW1pbmRlci50ZXh0KydcIiBvbiAnK3JlbWluZGVyLmRhdGUudG9Mb2NhbGVTdHJpbmcoKTtcclxuICAgICAgICBsZXQgcm93ID0gcmVtVGFibGUuY3JlYXRlRWwoXCJ0clwiKTtcclxuICAgICAgICBsZXQgY2VsbCA9IHJvdy5jcmVhdGVFbChcInRkXCIpO1xyXG4gICAgICAgICAgbGV0IGVkaXRSZW1pbmRlciA9IG5ldyBUZXh0Q29tcG9uZW50KGNlbGwpO1xyXG4gICAgICAgICAgZWRpdFJlbWluZGVyLnNldFZhbHVlKHJlbWluZGVyLnRleHQpO1xyXG4gICAgICAgICAgZWRpdFJlbWluZGVyLm9uQ2hhbmdlKCAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgcmVtaW5kZXIudGV4dCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGlmaWVkID0gdHJ1ZTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgY2VsbCA9IHJvdy5jcmVhdGVFbChcInRkXCIpO1xyXG4gICAgICAgICAgbGV0IGVkaXRSZW1pbmRlckRhdGUgPSBuZXcgVGV4dENvbXBvbmVudChjZWxsKTtcclxuICAgICAgICAgIGVkaXRSZW1pbmRlckRhdGUuc2V0VmFsdWUocmVtaW5kZXIuZGF0ZS50b0xvY2FsZVN0cmluZygpKTtcclxuICAgICAgICAgIGVkaXRSZW1pbmRlckRhdGUub25DaGFuZ2UoICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICByZW1pbmRlci5kYXRlID0gbmV3IERhdGUodmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGlmaWVkID0gdHJ1ZTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIC8vIGlmIChyZW1pbmRlci5yZXBlYXQgPiAwKSBncmFkZVNldE5vdGUgKz0gJywgcmVwZWF0cyBldmVyeSAnK3JlbWluZGVyLnJlcGVhdCsnIGRheXMnO1xyXG4gICAgICAgICAgY2VsbCA9IHJvdy5jcmVhdGVFbChcInRkXCIpO1xyXG4gICAgICAgICAgbGV0IGVkaXRSZW1pbmRlclJlcGVhdCA9IG5ldyBUZXh0Q29tcG9uZW50KGNlbGwpO1xyXG4gICAgICAgICAgZWRpdFJlbWluZGVyUmVwZWF0LnNldFZhbHVlKHJlbWluZGVyLnJlcGVhdC50b1N0cmluZygpKTtcclxuICAgICAgICAgIGVkaXRSZW1pbmRlclJlcGVhdC5vbkNoYW5nZSggKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHJlbWluZGVyLnJlcGVhdCA9IE51bWJlcih2YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMubW9kaWZpZWQgPSB0cnVlO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgLy8gaWYgKHJlbWluZGVyLnByaW9yID4gMCkgZ3JhZGVTZXROb3RlICs9ICcsIHByaW9yID0gJytyZW1pbmRlci5wcmlvcisnIGRheXMnO1xyXG4gICAgICAgICAgY2VsbCA9IHJvdy5jcmVhdGVFbChcInRkXCIpO1xyXG4gICAgICAgICAgbGV0IGVkaXRSZW1pbmRlclByaW9yID0gbmV3IFRleHRDb21wb25lbnQoY2VsbCk7XHJcbiAgICAgICAgICBlZGl0UmVtaW5kZXJQcmlvci5zZXRWYWx1ZShyZW1pbmRlci5wcmlvci50b1N0cmluZygpKTtcclxuICAgICAgICAgIGVkaXRSZW1pbmRlclByaW9yLm9uQ2hhbmdlKCAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgcmVtaW5kZXIucHJpb3IgPSBOdW1iZXIodmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGlmaWVkID0gdHJ1ZTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGNlbGwgPSByb3cuY3JlYXRlRWwoXCJ0ZFwiKTtcclxuICAgICAgICAgIGxldCBkZWxCdXR0b24gPSBuZXcgQnV0dG9uQ29tcG9uZW50KGNlbGwpO1xyXG4gICAgICAgICAgZGVsQnV0dG9uLnNldEJ1dHRvblRleHQoXCJYXCIpO1xyXG4gICAgICAgICAgZGVsQnV0dG9uLm9uQ2xpY2soICgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmdyYWRlU2V0LmRlbGV0ZVJlbWluZGVyKHJlbWluZGVyKTtcclxuICAgICAgICAgICAgICByb3cucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMuZ3JhZGVTZXQucmVtaW5kZXJzLmxlbmd0aCA9PSAwKSByZW1pbmRlckNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgfSk7XHJcbiAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVtaW5kZXJDb250YWluZXIuY3JlYXRlRWwoXCJoclwiKTtcclxuICAgICAgfTtcclxuICAgIFxyXG5cclxuICAgIC8vIENhdGVnb3JpZXMgKyBzY29yZXNcclxuICAgIGxldCBjYXRlZ29yeUNvbnRhaW5lciA9IGNvbnRhaW5lci5jcmVhdGVEaXYoKTtcclxuICAgIGlmICh0aGlzLmdyYWRlU2V0LmNhdGVnb3JpZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICBsZXQgY29uVGFibGUgPSBjYXRlZ29yeUNvbnRhaW5lci5jcmVhdGVFbChcInRhYmxlXCIpO1xyXG4gICAgICBsZXQgY29uUm93ID0gY29uVGFibGUuY3JlYXRlRWwoXCJ0clwiKTtcclxuICAgICAgbGV0IGNvbkNlbGwgPSBjb25Sb3cuY3JlYXRlRWwoXCJ0ZFwiKTtcclxuICAgICAgY29uQ2VsbC5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogXCJDYXRlZ29yaWVzXCIgfSk7XHJcbiAgICAgIGNvbkNlbGwgPSBjb25Sb3cuY3JlYXRlRWwoXCJ0ZFwiKTtcclxuICAgICAgbGV0IGFkZENhdGVnb3J5QnV0dG9uID0gbmV3IEJ1dHRvbkNvbXBvbmVudChjb25DZWxsKTtcclxuICAgICAgYWRkQ2F0ZWdvcnlCdXR0b24uc2V0QnV0dG9uVGV4dChcIitcIik7XHJcbiAgICAgIGFkZENhdGVnb3J5QnV0dG9uLm9uQ2xpY2soICgpID0+IHtcclxuICAgICAgICBsZXQgbmV3Q2F0ID0gbmV3IENhdGVnb3J5KHtuYW1lOiBcIk5ldyBDYXRlZ29yeVwiLCB3ZWlnaHQ6IDEuMCwgcGVyY2VudE9mU2NvcmVzOiAxLjB9KTtcclxuICAgICAgICB0aGlzLmdyYWRlU2V0LmFkZENhdGVnb3J5KG5ld0NhdCk7XHJcbiAgICAgICAgdGhpcy5tb2RpZmllZCA9IHRydWU7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5ncmFkZVNldC5jYXRlZ29yaWVzLmZvckVhY2goIChjYXQ6IENhdGVnb3J5KSA9PiB7XHJcbiAgICAgICAgbGV0IGNhdFRhYmxlID0gY2F0ZWdvcnlDb250YWluZXIuY3JlYXRlRWwoXCJ0YWJsZVwiKTtcclxuICAgICAgICBsZXQgY2F0Um93VCA9IGNhdFRhYmxlLmNyZWF0ZUVsKFwidHJcIik7XHJcbiAgICAgICAgY2F0Um93VC5jcmVhdGVFbChcInRoXCIsIHsgdGV4dDogXCJDYXRlZ29yeSBOYW1lXCIgfSk7XHJcbiAgICAgICAgY2F0Um93VC5jcmVhdGVFbChcInRoXCIsIHsgdGV4dDogXCJXZWlnaHRcIiB9KTtcclxuICAgICAgICBjYXRSb3dULmNyZWF0ZUVsKFwidGhcIiwgeyB0ZXh0OiBcIiUgb2YgU2NvcmVzIFVzZWRcIiB9KTtcclxuXHJcbiAgICAgICAgbGV0IGNhdFJvdyA9IGNhdFRhYmxlLmNyZWF0ZUVsKFwidHJcIik7ICBcclxuICAgICAgICBsZXQgY2F0Q2VsbCA9IGNhdFJvdy5jcmVhdGVFbChcInRkXCIpOyAgXHJcbiAgICAgICAgbGV0IGVkaXRDYXRlZ29yeSA9IG5ldyBUZXh0Q29tcG9uZW50KGNhdENlbGwpO1xyXG4gICAgICAgIGVkaXRDYXRlZ29yeS5zZXRWYWx1ZShjYXQubmFtZSk7XHJcbiAgICAgICAgZWRpdENhdGVnb3J5Lm9uQ2hhbmdlKCAodmFsdWUpID0+IHtcclxuICAgICAgICAgIHRoaXMuY2F0c0NoYW5nZWQucHVzaChjYXQubmFtZStcIn5+PlwiK3ZhbHVlKTtcclxuICAgICAgICAgIGNhdC5uYW1lID0gdmFsdWU7XHJcbiAgICAgICAgICB0aGlzLm1vZGlmaWVkID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjYXRDZWxsID0gY2F0Um93LmNyZWF0ZUVsKFwidGRcIik7XHJcbiAgICAgICAgbGV0IGVkaXRDYXRlZ29yeVdlaWdodCA9IG5ldyBUZXh0Q29tcG9uZW50KGNhdENlbGwpO1xyXG4gICAgICAgIGVkaXRDYXRlZ29yeVdlaWdodC5zZXRWYWx1ZShcIlwiK2NhdC53ZWlnaHQpO1xyXG4gICAgICAgIGVkaXRDYXRlZ29yeVdlaWdodC5vbkNoYW5nZSggKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICBjYXQud2VpZ2h0ID0gTnVtYmVyKHZhbHVlKTtcclxuICAgICAgICAgIHRoaXMubW9kaWZpZWQgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNhdENlbGwgPSBjYXRSb3cuY3JlYXRlRWwoXCJ0ZFwiKTtcclxuICAgICAgICBsZXQgZWRpdENhdGVnb3J5UGVyY2VudCA9IG5ldyBUZXh0Q29tcG9uZW50KGNhdENlbGwpO1xyXG4gICAgICAgIGVkaXRDYXRlZ29yeVBlcmNlbnQuc2V0VmFsdWUoXCJcIitjYXQucGVyY2VudE9mU2NvcmVzKTtcclxuICAgICAgICBlZGl0Q2F0ZWdvcnlQZXJjZW50Lm9uQ2hhbmdlKCAodmFsdWUpID0+IHtcclxuICAgICAgICAgIGNhdC5wZXJjZW50T2ZTY29yZXMgPSBOdW1iZXIodmFsdWUpO1xyXG4gICAgICAgICAgdGhpcy5tb2RpZmllZCA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2F0Q2VsbCA9IGNhdFJvdy5jcmVhdGVFbChcInRkXCIpO1xyXG4gICAgICAgIGxldCBkZWxCdXR0b24gPSBuZXcgQnV0dG9uQ29tcG9uZW50KGNhdENlbGwpO1xyXG4gICAgICAgIGRlbEJ1dHRvbi5zZXRCdXR0b25UZXh0KFwiWFwiKTtcclxuICAgICAgICBkZWxCdXR0b24ub25DbGljayggKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdyYWRlU2V0LmRlbGV0ZUNhdGVnb3J5KGNhdCk7XHJcbiAgICAgICAgICAgIGNhdFJvd1QucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGNhdFJvdy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRFZGl0aW5nTW9kZSh0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5tb2RpZmllZCA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICBpZiAoY2F0LnNjb3JlU2V0ICE9IHVuZGVmaW5lZCAmJiBjYXQuc2NvcmVTZXQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgbGV0IGNhdFRhYmxlID0gY2F0ZWdvcnlDb250YWluZXIuY3JlYXRlRWwoXCJ0YWJsZVwiKTtcclxuICAgICAgICAgIGxldCBjYXRSb3cgPSBjYXRUYWJsZS5jcmVhdGVFbChcInRyXCIpO1xyXG4gICAgICAgICAgY2F0Um93LmNyZWF0ZUVsKFwidGhcIiwgeyB0ZXh0OiBcIlNjb3JlIE5hbWVcIiB9KTtcclxuICAgICAgICAgIGNhdFJvdy5jcmVhdGVFbChcInRoXCIsIHsgdGV4dDogXCJQb3NzaWJsZVwiIH0pOyAgXHJcbiAgICAgIFxyXG4gICAgICAgICAgY2F0LnNjb3JlU2V0LmZvckVhY2goIChzYzogU2NvcmUpID0+IHtcclxuICAgICAgICAgICAgY2F0Um93ID0gY2F0VGFibGUuY3JlYXRlRWwoXCJ0clwiKTtcclxuICAgICAgICAgICAgbGV0IGNhdENlbGwgPSBjYXRSb3cuY3JlYXRlRWwoXCJ0ZFwiKTsgIFxyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBNYXRoLnJvdW5kKHNjLmdldFZhbHVlKCkqMTAwKS8xMDA7XHJcbiAgICAgICAgICAgIGxldCBjbGFzc0F2ZSA9IE1hdGgucm91bmQodGhpcy5ncmFkZVNldC5jbGFzc1Njb3JlQXZlcmFnZShjYXQsIHNjLm5hbWUpKjEwMCkvMTAwO1xyXG4gICAgICAgICAgICBsZXQgcGVyY2VudCA9IE1hdGgucm91bmQoY2xhc3NBdmUvc2MuZ2V0VmFsdWUoKSoxMDAwMCkvMTAwO1xyXG4gICAgICAgICAgICBsZXQgZWRpdFNjb3JlID0gbmV3IFRleHRDb21wb25lbnQoY2F0Q2VsbCk7XHJcbiAgICAgICAgICAgIGVkaXRTY29yZS5zZXRWYWx1ZShzYy5uYW1lKTtcclxuICAgICAgICAgICAgZWRpdFNjb3JlLm9uQ2hhbmdlKCAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLnNjb3Jlc0NoYW5nZWQucHVzaChzYy5uYW1lK1wifn4+XCIrdmFsdWUpO1xyXG4gICAgICAgICAgICAgIHNjLm5hbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICB0aGlzLm1vZGlmaWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNhdENlbGwgPSBjYXRSb3cuY3JlYXRlRWwoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgbGV0IGVkaXRTY29yZVZhbHVlID0gbmV3IFRleHRDb21wb25lbnQoY2F0Q2VsbCk7XHJcbiAgICAgICAgICAgIGVkaXRTY29yZVZhbHVlLnNldFZhbHVlKFwiXCIrdmFsdWUpO1xyXG4gICAgICAgICAgICBlZGl0U2NvcmVWYWx1ZS5vbkNoYW5nZSggKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgc2Muc2V0VmFsdWUoTnVtYmVyKHZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5ncmFkZVNldC5tb2RpZmllZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pOyBcclxuICAgICAgICAgICAgY2F0Q2VsbCA9IGNhdFJvdy5jcmVhdGVFbChcInRkXCIpO1xyXG4gICAgICAgICAgICBsZXQgZGVsQnV0dG9uID0gbmV3IEJ1dHRvbkNvbXBvbmVudChjYXRDZWxsKTtcclxuICAgICAgICAgICAgZGVsQnV0dG9uLnNldEJ1dHRvblRleHQoXCJYXCIpO1xyXG4gICAgICAgICAgICBkZWxCdXR0b24ub25DbGljayggKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2F0LnJlbW92ZVNjb3JlKHNjKTtcclxuICAgICAgICAgICAgICAgIGNhdFJvdy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0ZWdvcnlDb250YWluZXIuY3JlYXRlRWwoXCJiclwiKTtcclxuXHJcbiAgICAgIH1cclxuICAgICl9XHJcbiAgfVxyXG5cclxufSIsIm1vZHVsZS5leHBvcnRzID0gQ29kZU1pcnJvcjsiLCIvLyBTdG9sZW4gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vaGVsbG9pdHNpYW4vY3VzdG9tLW1vZGFscy1vYnNpZGlhbi9ibG9iL21haW4vc3JjL21vZGFsL0N1c3RvbU1vZGFsLnRzXG5cbmltcG9ydCB7IEFwcCwgTW9kYWwsIE5vdGljZSwgUGx1Z2luLCBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nO1xuXG5leHBvcnQgY2xhc3MgQWxlcnQgZXh0ZW5kcyBNb2RhbCB7XG5cdHBsdWdpbjogUGx1Z2luO1xuXHR0aXRsZTogc3RyaW5nO1xuXHRjb250ZW50OiBzdHJpbmc7XG5cdG9rVGV4dDogc3RyaW5nO1xuXHRjYW5jZWxUZXh0OiBzdHJpbmc7XG5cdGNvbnRpbnVlQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XG4gIFxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwbHVnaW46IFBsdWdpbixcblx0XHR0aXRsZTogc3RyaW5nLFxuXHRcdGNvbnRlbnQ6IHN0cmluZyxcblx0KSB7XG5cdFx0c3VwZXIocGx1Z2luLmFwcCk7XG5cblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcblx0XHR0aGlzLnRpdGxlID0gdGl0bGU7XG5cdFx0dGhpcy5jb250ZW50ID0gY29udGVudDtcblx0fVxuXG5cdGFzeW5jIG9uT3BlbigpIHtcblx0XHRuZXcgTm90aWNlKHRoaXMuY29udGVudCk7XG5cblx0XHRsZXQge2NvbnRlbnRFbH0gPSB0aGlzO1xuXHRcdFxuXHRcdGNvbnRlbnRFbC5jcmVhdGVFbChcImZvcm1cIiwge30sIChmb3JtKSA9PiB7XG5cblx0XHRcdGxldCB0aXRsZURpdiA9IGZvcm0uY3JlYXRlRGl2KCk7XG5cdFx0XHR0aXRsZURpdi5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogdGhpcy50aXRsZSB9KTtcblx0XHRcdHRpdGxlRGl2LmNyZWF0ZUVsKFwiaHJcIik7XG5cdFx0XHRcblx0XHRcdHRpdGxlRGl2LmNyZWF0ZUVsKFwiaDRcIiwgeyB0ZXh0OiB0aGlzLmNvbnRlbnR9KTtcblxuXHRcdFx0Zm9ybS5jcmVhdGVEaXYoXCJhbGVydC1idXR0b24tY29udGFpbmVyXCIsIGNvbnRhaW5lciA9PiB7XG5cdFx0XHRcdGNvbnRhaW5lclxuXHRcdFx0XHRcdC5jcmVhdGVFbChcImJ1dHRvblwiLCB7IGF0dHI6IHsgdHlwZTogXCJidXR0b25cIiB9LCB0ZXh0OiBcIk9rXCIgfSlcblx0XHRcdFx0XHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0fSk7XG5cblx0XHR9KTtcblx0fVxuXG5cdG9uQ2xvc2UoKSB7XG5cdFx0bGV0IHtjb250ZW50RWx9ID0gdGhpcztcblx0XHRjb250ZW50RWwuZW1wdHkoKTtcblx0fVxuXG5cbn1cblxuIiwiaW1wb3J0IHsgQXBwLCBCdXR0b25Db21wb25lbnQsIERyb3Bkb3duQ29tcG9uZW50LCBNb2RhbCwgU2V0dGluZywgVEZpbGUsIFRleHRGaWxlVmlldywgVG9nZ2xlQ29tcG9uZW50LCBXb3Jrc3BhY2VMZWFmIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5cbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSBcImRhdGEvQ2F0ZWdvcnlcIjtcbmltcG9ydCB7IENvdW50ZXIgfSBmcm9tIFwiZGF0YS9Db3VudGVyXCI7XG5pbXBvcnQgeyBHcmFkZVNldCB9IGZyb20gXCJkYXRhL0dyYWRlU2V0XCI7XG5pbXBvcnQgeyBTY29yZSB9IGZyb20gXCJkYXRhL1Njb3JlXCI7XG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcImRhdGEvU3R1ZGVudFwiO1xuXG52YXIgcGx1c2ljb24gPSAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIGNsYXNzPVwibHVjaWRlIGx1Y2lkZS1wbHVzLWNpcmNsZVwiPjxjaXJjbGUgY3g9XCIxMlwiIGN5PVwiMTJcIiByPVwiMTBcIi8+PHBhdGggZD1cIk04IDEyaDhcIi8+PHBhdGggZD1cIk0xMiA4djhcIi8+PC9zdmc+JztcblxudmFyIG1pbnVzaWNvbiA9ICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgY2xhc3M9XCJsdWNpZGUgbHVjaWRlLW1pbnVzLWNpcmNsZVwiPjxjaXJjbGUgY3g9XCIxMlwiIGN5PVwiMTJcIiByPVwiMTBcIi8+PHBhdGggZD1cIk04IDEyaDhcIi8+PC9zdmc+JztcblxuZXhwb3J0IGNsYXNzIENvdW50ZXJUaWNrIGV4dGVuZHMgTW9kYWwge1xuXG4gICAgY2FsbGJhY2tPbkNsb3NlO1xuICAgIGdyYWRlU2V0OiBHcmFkZVNldDtcbiAgICBzdHVkZW50OiBTdHVkZW50O1xuICAgIGZpZWxkczogVG9nZ2xlQ29tcG9uZW50W107XG5cbiAgICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgc3R1ZGVudDpTdHVkZW50LCBjYWxsYmFja09uQ2xvc2U6IChjb3VudGVyOiBDb3VudGVyKSA9PiB2b2lkKSB7XG5cdFx0c3VwZXIoYXBwKTtcblx0XHR0aGlzLnN0dWRlbnQgPSBzdHVkZW50O1xuICAgICAgICB0aGlzLmNhbGxiYWNrT25DbG9zZSA9IGNhbGxiYWNrT25DbG9zZTtcblxuICAgICAgICB0aGlzLmZpZWxkcyA9IFtdO1xuXHR9XG5cblx0b25PcGVuKCkge1xuXHRcdGxldCB7Y29udGVudEVsfSA9IHRoaXM7XG5cdFx0XG4gICAgICAgIGNvbnRlbnRFbC5jcmVhdGVFbChcImZvcm1cIiwge30sIChmb3JtKSA9PiB7XG5cbiAgICAgICAgbGV0IHRpdGxlRGl2ID0gZm9ybS5jcmVhdGVEaXYoKTtcbiAgICAgICAgdGl0bGVEaXYuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6ICdUaWNrIGEgQ291bnRlcicgfSk7XG4gICAgICAgIHRpdGxlRGl2LmNyZWF0ZUVsKFwiaHJcIik7XG4gICAgICAgIFxuICAgICAgICBsZXQgY291bnRlckNvbnRhaW5lciA9IGZvcm0uY3JlYXRlRGl2KCk7XG4gICAgICAgIGxldCBjb3VudGVyVGFibGUgPSBjb3VudGVyQ29udGFpbmVyLmNyZWF0ZUVsKFwidGFibGVcIiwgeyBjbHM6IFwiY291bnRlci10YWJsZVwiIH0pO1xuICAgICAgICB0aGlzLnN0dWRlbnQuY291bnRlcnMuZm9yRWFjaCggKGNvdW50ZXI6IENvdW50ZXIpID0+IHtcbiAgICAgICAgICAgIGxldCBjb3VudGVyUm93ID0gY291bnRlclRhYmxlLmNyZWF0ZUVsKFwidHJcIik7XG4gICAgICAgICAgICBsZXQgY291bnRlckNlbGwgPSBjb3VudGVyUm93LmNyZWF0ZUVsKFwidGRcIik7XG4gICAgICAgICAgICBsZXQgYnV0ID0gbmV3IEJ1dHRvbkNvbXBvbmVudChjb3VudGVyQ2VsbClcbiAgICAgICAgICAgICAgICAuc2V0QnV0dG9uVGV4dChcIi1cIilcbiAgICAgICAgICAgICAgICAuc2V0SWNvbihcIm1pbnVzLWNpcmNsZVwiKVxuICAgICAgICAgICAgICAgIC5vbkNsaWNrKCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXIuZGVjcmVtZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tPbkNsb3NlKGNvdW50ZXIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGlmIChjb3VudGVyLnZhbHVlID09IDApIHtcbiAgICAgICAgICAgICAgICBidXQuc2V0RGlzYWJsZWQodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3VudGVyQ2VsbCA9IGNvdW50ZXJSb3cuY3JlYXRlRWwoXCJ0ZFwiLCB7IGF0dHI6IHsgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIgfSB9KTtcbiAgICAgICAgICAgIGNvdW50ZXJDZWxsLmFwcGVuZFRleHQoY291bnRlci5uYW1lKTtcbiAgICAgICAgICAgIGNvdW50ZXJDZWxsID0gY291bnRlclJvdy5jcmVhdGVFbChcInRkXCIpO1xuICAgICAgICAgICAgYnV0ID0gbmV3IEJ1dHRvbkNvbXBvbmVudChjb3VudGVyUm93KS5zZXRCdXR0b25UZXh0KFwiK1wiKS5zZXRJY29uKFwicGx1cy1jaXJjbGVcIilcbiAgICAgICAgICAgICAgICAub25DbGljayggKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyLmluY3JlbWVudCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrT25DbG9zZShjb3VudGVyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyBmb3JtLmNyZWF0ZURpdihcImNvdW50ZXItYnV0dG9uLWNvbnRhaW5lclwiLCBjb250YWluZXIgPT4ge1xuXHRcdFx0Ly8gXHRjb250YWluZXJcblx0XHRcdC8vIFx0XHQuY3JlYXRlRWwoXCJidXR0b25cIiwgeyBhdHRyOiB7IHR5cGU6IFwiYnV0dG9uXCIgfSwgdGV4dDogXCJDbG9zZVwiIH0pXG5cdFx0XHQvLyBcdFx0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHQvLyBcdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0XHQvLyBcdFx0fSk7XG5cdFx0XHQvLyB9KTtcbiAgICAgICAgfSlcblxuICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIC8vIG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcbiAgICAgICAgLy8gLmFkZEJ1dHRvbigoYnRuKSA9PlxuICAgICAgICAvLyAgICAgYnRuXG4gICAgICAgIC8vICAgICAuc2V0QnV0dG9uVGV4dChcIk9LXCIpXG4gICAgICAgIC8vICAgICAuc2V0Q3RhKClcbiAgICAgICAgLy8gICAgIC5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICkpO1xuXHRcblxuICAgIH1cblxufSIsIi8vIFN0b2xlbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9oZWxsb2l0c2lhbi9jdXN0b20tbW9kYWxzLW9ic2lkaWFuL2Jsb2IvbWFpbi9zcmMvbW9kYWwvQ3VzdG9tTW9kYWwudHNcblxuaW1wb3J0IHsgQXBwLCBNb2RhbCwgTm90aWNlLCBQbHVnaW4sIFNldHRpbmcgfSBmcm9tICdvYnNpZGlhbic7XG5cbmV4cG9ydCBjbGFzcyBEaWFsb2cgZXh0ZW5kcyBNb2RhbCB7XG5cdHBsdWdpbjogUGx1Z2luO1xuXHR0aXRsZTogc3RyaW5nO1xuXHRjb250ZW50OiBzdHJpbmc7XG5cdG9rVGV4dDogc3RyaW5nO1xuXHRjYW5jZWxUZXh0OiBzdHJpbmc7XG5cdGNvbnRpbnVlQ2FsbGJhY2s6IChzdHI6IHN0cmluZykgPT4gdm9pZDtcblxuICAgIHZhbHVlOiBzdHJpbmc7XG4gIFxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwbHVnaW46IFBsdWdpbixcblx0XHR0aXRsZTogc3RyaW5nLFxuXHRcdGNvbnRlbnQ6IHN0cmluZyxcblx0XHRva1RleHQ6IHN0cmluZyxcbiAgICAgICAgY2FuY2VsVGV4dDogc3RyaW5nLFxuXHRcdGNhbGxiYWNrOiAoc3RyOiBzdHJpbmcpID0+IHZvaWQsXG5cdCkge1xuXHRcdHN1cGVyKHBsdWdpbi5hcHApO1xuXG5cdFx0dGhpcy5wbHVnaW4gPSBwbHVnaW47XG5cdFx0dGhpcy50aXRsZSA9IHRpdGxlO1xuXHRcdHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG5cdFx0dGhpcy5va1RleHQgPSBva1RleHQ7XG5cdFx0dGhpcy5jYW5jZWxUZXh0ID0gY2FuY2VsVGV4dDtcblx0XHR0aGlzLmNvbnRpbnVlQ2FsbGJhY2sgPSBjYWxsYmFjaztcblx0fVxuXG5cdGFzeW5jIG9uT3BlbigpIHtcblx0XHRsZXQge2NvbnRlbnRFbH0gPSB0aGlzO1xuXHRcdFxuXHRcdGNvbnRlbnRFbC5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogdGhpcy50aXRsZSB9KTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcblx0XHRcdC5zZXROYW1lKHRoaXMuY29udGVudClcblx0XHRcdC5hZGRUZXh0KHRleHQgPT4gXG4gICAgICAgICAgICAgICAgdGV4dFxuXHRcdFx0XHQuc2V0VmFsdWUoXCJcIilcblx0XHRcdFx0Lm9uQ2hhbmdlKCAodmFsdWUpID0+IHtcblx0XHRcdFx0XHR0aGlzLnZhbHVlID0gdmFsdWU7XG5cdFx0XHRcdH0pKTtcblxuXHRcdFxuICAgICAgICBuZXcgU2V0dGluZyhjb250ZW50RWwpXG4gICAgICBcdFx0LmFkZEJ1dHRvbigoYnRuKSA9PlxuICAgICAgICBcdFx0YnRuXG4gICAgICAgICAgXHRcdC5zZXRCdXR0b25UZXh0KHRoaXMuY2FuY2VsVGV4dClcbiAgICAgICAgICBcdFx0LnNldEN0YSgpXG4gICAgICAgICAgXHRcdC5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICAgIFx0XHR0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgbmV3IFNldHRpbmcoY29udGVudEVsKVxuICAgICAgICAgIC5hZGRCdXR0b24oKGJ0bikgPT5cbiAgICAgICAgICAgIGJ0blxuICAgICAgICAgICAgICAuc2V0QnV0dG9uVGV4dCh0aGlzLm9rVGV4dClcbiAgICAgICAgICAgICAgLnNldEN0YSgpXG4gICAgICAgICAgICAgIC5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250aW51ZUNhbGxiYWNrKHRoaXMudmFsdWUpO1xuICAgICAgfSkpO1xuXG5cblx0fVxuXG5cdG9uQ2xvc2UoKSB7XG5cdFx0bGV0IHtjb250ZW50RWx9ID0gdGhpcztcblx0XHRjb250ZW50RWwuZW1wdHkoKTtcblx0fVxuXG5cbn1cblxuIiwiaW1wb3J0IEVtYWlsIGZyb20gXCJodHRwczovL3NtdHBqcy5jb20vdjMvc210cC5qc1wiO1xuaW1wb3J0IHsgRW1haWxlclNldHRpbmdzIH0gZnJvbSAnLi9zZXR0aW5ncydcbmltcG9ydCB7IFNldHRpbmcgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgIFV0aWxpdGllcyAgZnJvbSAnLi91dGlsaXRpZXMvVXRpbGl0aWVzJztcbi8vaW1wb3J0IG5vZGVtYWlsZXIgZnJvbSAnbm9kZW1haWxlcic7XG5cbi8vIHRyeSB7XG4vLyAgIGNvbnN0IG5tYWlsZXIgPSByZXF1aXJlKCdub2RlX21vZHVsZXMvbm9kZW1haWxlcicpO1xuLy8gfSBjYXRjaCAoZSkge1xuLy8gICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yICYmIGUuY29kZSA9PT0gXCJNT0RVTEVfTk9UX0ZPVU5EXCIpIHtcbi8vICAgICAgIGNvbnNvbGUubG9nKGUpO1xuLy8gICAgICAgY29uc29sZS5sb2coXCJDYW4ndCBsb2FkIG5vZGVtYWlsZXIhXCIpO1xuLy8gICB9XG4vLyB9XG5cbi8qIFNtdHBKUy5jb20gLSB2My4wLjAgICBBMEI1NzdFMzY4N0M1NDcxRUI4NjA0MDYzMjIzOTExN0VEREZFNjQxOEM4NEYxNTI1QzMzOTFCOThEMzhFNDE5MkZEQkNGNEY4MjAxRjI4QkIxODdCNDZEOUQ0MjJDMEYgICBmbnFjcXpjd29wY3p4eGpkKi9cbiAgXG5leHBvcnQgY2xhc3MgRW1haWxlciB7XG5cbiAgICBlbWFpbFdvcmtzOiBib29sZWFuID0gZmFsc2U7XG4gICAgXG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIGh0bWw6IHN0cmluZztcbiAgICB0bzogc3RyaW5nO1xuICAgIGZyb206IHN0cmluZztcbiAgICBzdWJqZWN0OiBzdHJpbmc7XG4gICAgc2V0dGluZ3M6IEVtYWlsZXJTZXR0aW5ncztcbiAgICBhdHRhY2htZW50czogT2JqZWN0W107XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gXCJcIjtcbiAgICAgICAgdGhpcy5odG1sID0gbnVsbDtcbiAgICAgICAgdGhpcy50byA9IFwiXCI7XG4gICAgICAgIHRoaXMuZnJvbSA9IFwiXCI7XG4gICAgICAgIHRoaXMuc3ViamVjdCA9IFwiXCI7XG4gICAgICAgIHRoaXMuYXR0YWNobWVudHMgPSBbXTtcblx0ICB9XG4gICAgXG4gICAgc2V0TWVzc2FnZShtc2c6IHN0cmluZykge1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtc2c7XG4gICAgfVxuXG4gICAgc2V0TWVzc2FnZUhUTUwoaHRtbDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuaHRtbCA9IGh0bWw7XG4gICAgfVxuXG4gICAgYWRkQXR0YWNobWVudChwYXRoOiBzdHJpbmcsIGZpbGVuYW1lPVwiZ2IudHh0XCIsIGNvbnRlbnRUeXBlPVwidGV4dC9wbGFpblwiKSB7XG4gICAgICAgIGxldCBhdHRhY2htZW50ID0ge1xuICAgICAgICAgICAgJ25hbWUnOiBmaWxlbmFtZSxcbiAgICAgICAgICAgIC8vJ2NvbnRlbnRUeXBlJzogY29udGVudFR5cGUsXG4gICAgICAgICAgICAncGF0aCc6IHBhdGhcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xuICAgIH1cblxuICAgIHNlbmRtYWlsKHRvOiBzdHJpbmcsIGZyb206IHN0cmluZywgc3ViamVjdDogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIHNldHRpbmdzOiBFbWFpbGVyU2V0dGluZ3MsIFxuICAgICAgICAgICAgIGVyckNhbGxiYWNrOiAoZXJyaW5mbykgPT4gdm9pZCk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMudG8gPSB0bztcbiAgICAgICAgdGhpcy5mcm9tID0gZnJvbTtcbiAgICAgICAgdGhpcy5zdWJqZWN0ID0gc3ViamVjdDtcbiAgICAgICAgaWYgKG1lc3NhZ2UgIT0gbnVsbCkgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIlNlbmRpbmcgXCIrbWVzc2FnZSlcbiAgICAgICAgY29uc29sZS5sb2coXCJUbzogXCIrdG8pXG5cbiAgICAgICAgbGV0IG1haWxPcHRpb25zID0ge1xuICAgICAgICAgICAgZnJvbTogdGhpcy5mcm9tLFxuICAgICAgICAgICAgdG86IHRoaXMudG8sXG4gICAgICAgICAgICBzdWJqZWN0OiB0aGlzLnN1YmplY3QsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XCJYLUdyYWRlQm94LVZlcnNpb25cIjogXCJPYnNpZGlhbiBWZXJzaW9uIDEuMFwiLCBcIlgtZGV2XCI6IFwiZnJldGhvcFwifSxcbiAgICAgICAgICAgIHRleHQ6IHRoaXMubWVzc2FnZSxcbiAgICAgICAgICAgIGF0dGFjaG1lbnRzOiB0aGlzLmF0dGFjaG1lbnRzLFxuICAgICAgICAgICAgaHRtbDogdGhpcy5odG1sLFxuICAgICAgICAgICAgLy9Cb2R5OiB0aGlzLm1lc3NhZ2UsXG4gICAgICAgICAgICAvL1VzZXJuYW1lOiBzZXR0aW5ncy51c2VybmFtZSxcbiAgICAgICAgICAgIC8vUGFzc3dvcmQ6IHNldHRpbmdzLnBhc3N3b3JkLFxuICAgICAgICB9O1xuICAgICAgICBjb25zb2xlLmxvZyhtYWlsT3B0aW9ucyk7XG5cbiAgICAgICAgICBpZiAodGhpcy5lbWFpbFdvcmtzKSB7XG4gICAgICAgIC8vIGNvbnN0IHRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xuICAgICAgICAvLyAgICAgc2VydmljZTogc2V0dGluZ3Muc2VydmljZSxcbiAgICAgICAgLy8gICAgIGhvc3Q6IHNldHRpbmdzLnNtdHBob3N0LFxuICAgICAgICAvLyAgICAgcG9ydDogTnVtYmVyKHNldHRpbmdzLnNtdHBwb3J0KSxcbiAgICAgICAgLy8gICAgIHNlY3VyZTogc2V0dGluZ3Muc2VjdXJlLCBcbiAgICAgICAgLy8gICAgIGF1dGg6IHtcbiAgICAgICAgLy8gICAgICAgdXNlcjogc2V0dGluZ3MudXNlcm5hbWUsXG4gICAgICAgIC8vICAgICAgIHBhc3M6IHNldHRpbmdzLnBhc3N3b3JkICBcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICB9KTtcbiAgICAgICAgLy8gbGV0IGNvdW50ID0gMDtcbiAgICAgICAgLy8gLy93aGlsZSAoY291bnQgPCA1KSBcbiAgICAgICAgLy8gICB0cmFuc3BvcnRlci5zZW5kTWFpbChtYWlsT3B0aW9ucywgYXN5bmMgZnVuY3Rpb24oZXJyb3I6IGFueSwgaW5mbzogeyByZXNwb25zZTogc3RyaW5nOyB9KXtcbiAgICAgICAgLy8gICAgIGlmIChlcnJvcikge1xuICAgICAgICAvLyAgICAgICBjb25zb2xlLmxvZyhcIlNFTkRNQUlMIEVSUk9SOiAjXCIrY291bnQrXCI6IFwiK2Vycm9yKTtcbiAgICAgICAgLy8gICAgICAgY291bnQgKys7XG4gICAgICAgIC8vICAgICAgIGF3YWl0IFV0aWxpdGllcy5zbGVlcCgyMDAwKTtcbiAgICAgICAgLy8gICAgICAgZXJyQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgY291bnQgPSA1XG4gICAgICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCdFbWFpbCBzZW50OiAnICsgaW5mby5yZXNwb25zZSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgfSk7XG4gICAgICAgICAgXG4gICAgICAgIC8vIH0gICAgICAgIFxuICAgIH0gIFxuICAgIFxufVxuIiwiaW1wb3J0IHsgQXBwLCBCdXR0b25Db21wb25lbnQsIEVkaXRvciwgSXRlbVZpZXcsIE1hcmtkb3duRmlsZUluZm8sIE1lbnUsIE1vZGFsLCBOb3RpY2UsIFNldHRpbmcsIFRGaWxlLCBUZXh0QXJlYUNvbXBvbmVudCwgVGV4dENvbXBvbmVudCwgVGV4dEZpbGVWaWV3LCBUb2dnbGVDb21wb25lbnQsIFdvcmtzcGFjZUxlYWYgfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuZXhwb3J0IGNsYXNzIEVtYWlsZXJNb2RhbCBleHRlbmRzIE1vZGFsIHtcblx0YWRkcmVzczogc3RyaW5nO1xuXHRzdWJqZWN0OiBzdHJpbmc7XG5cdGZyb206IHN0cmluZztcblx0YXR0YWNoU2NvcmVzOiBib29sZWFuO1xuXHRtZXNzYWdlOiBzdHJpbmc7XG5cdG9uU3VibWl0OiAobWVzc2FnZTogc3RyaW5nLCBmcm9tOiBzdHJpbmcsIGFkZHJlc3M6IHN0cmluZywgc3ViamVjdDogc3RyaW5nLCBhdHRhY2hTY29yZXM6IGJvb2xlYW4sIGZpbGVzRGlyOiBGaWxlTGlzdCkgPT4gdm9pZDtcblx0c2V0dGluZ3M6IEdyYWRlQm94UGx1Z2luU2V0dGluZ3M7XG5cdFxuXHRjb25zdHJ1Y3RvcihhcHA6IEFwcCwgXG5cdFx0XHRcdHNldHRpbmdzOiBHcmFkZUJveFBsdWdpblNldHRpbmdzLFxuXHRcdCAgICAgICAgb25TdWJtaXQ6IChtZXNzYWdlOiBzdHJpbmcsIGZyb206IHN0cmluZywgYWRkcmVzczogc3RyaW5nLCBzdWJqZWN0OiBzdHJpbmcsIGF0dGFjaFNjb3JlczogYm9vbGVhbiwgZmlsZXNEaXI6IEZpbGVMaXN0KSA9PiB2b2lkKSB7XG5cdFx0c3VwZXIoYXBwKTtcblxuXHRcdHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcblx0XHR0aGlzLm9uU3VibWl0ID0gb25TdWJtaXQ7XG5cdFx0dGhpcy5hdHRhY2hTY29yZXMgPSBmYWxzZTtcblx0fVxuXG5cdG9uT3BlbigpIHtcblx0XHRjb25zdCB7Y29udGVudEVsfSA9IHRoaXM7XG5cblx0XHRjb250ZW50RWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6ICdFbnRlciBlbWFpbCBtZXNzYWdlIGluZm8nIH0pO1xuXG5cdFx0dGhpcy5hZGRyZXNzID0gKHRoaXMuc2V0dGluZ3MuZGVmYXVsdHRvICE9PSB1bmRlZmluZWQpP3RoaXMuc2V0dGluZ3MuZGVmYXVsdHRvOlwiXCI7XG5cdFx0dGhpcy5mcm9tID0gKHRoaXMuc2V0dGluZ3MuZnJvbSAhPT0gdW5kZWZpbmVkKT90aGlzLnNldHRpbmdzLmZyb206XCJcIjtcblx0XHR0aGlzLnN1YmplY3QgPSAodGhpcy5zZXR0aW5ncy5zdWJqZWN0KT90aGlzLnNldHRpbmdzLnN1YmplY3Q6XCJcIjtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcbiAgICAgIFx0XHQuc2V0TmFtZShcIlNlbnQgRnJvbTpcIilcbiAgICAgIFx0XHQuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgXHRcdHRleHRcblx0XHRcdFx0XHQuc2V0VmFsdWUodGhpcy5mcm9tKVxuXHRcdFx0XHQgICBcdC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICBcdFx0XHRcdHRoaXMuZnJvbSA9IHZhbHVlXG5cdFx0XHRcdFx0fVxuXHRcdCkpO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGVudEVsKVxuICAgICAgXHRcdC5zZXROYW1lKFwiRGVzdGluYXRpb246XCIpXG4gICAgICBcdFx0LmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgIFx0XHR0ZXh0XG5cdFx0XHRcdFx0LnNldFZhbHVlKHRoaXMuYWRkcmVzcylcblx0XHRcdFx0ICAgXHQub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgXHRcdFx0XHR0aGlzLmFkZHJlc3MgPSB2YWx1ZVxuXHRcdFx0XHRcdH1cblx0XHQpKTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcbiAgICAgIFx0XHQuc2V0TmFtZShcIlN1YmplY3Q6XCIpXG4gICAgICBcdFx0LmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgIFx0XHR0ZXh0XG5cdFx0XHRcdFx0LnNldFZhbHVlKHRoaXMuc3ViamVjdClcblx0XHRcdFx0XHQub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgXHRcdFx0XHR0aGlzLnN1YmplY3QgPSB2YWx1ZVxuXHRcdFx0ICAgICAgICB9XG5cdFx0KSk7XG5cblx0XHRsZXQgaW5jbHVkZXNDb250YWluZXIxID0gY29udGVudEVsLmNyZWF0ZURpdigpO1xuXHRcdGluY2x1ZGVzQ29udGFpbmVyMS5zdHlsZS5tYXJnaW5Ub3AgPSBcIjEwcHhcIjtcblx0XHRpbmNsdWRlc0NvbnRhaW5lcjEuc3R5bGUuYWxpZ25JdGVtcyA9IFwiY2VudGVyXCI7XG5cdFx0aW5jbHVkZXNDb250YWluZXIxLnN0eWxlLmRpc3BsYXkgPSBcImdyaWRcIjtcblx0XHRpbmNsdWRlc0NvbnRhaW5lcjEuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IFwiY2FsYygyNSUgLSAxMHB4KSAzMHB4XCI7XG5cdFx0aW5jbHVkZXNDb250YWluZXIxLmNyZWF0ZUVsKFwicFwiLCB7IHRleHQ6ICdBdHRhY2ggc2NvcmVzPycgfSk7XG5cdFx0bmV3IFRvZ2dsZUNvbXBvbmVudChpbmNsdWRlc0NvbnRhaW5lcjEpXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKCAodmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMuYXR0YWNoU2NvcmVzID0gdmFsdWU7XG5cdFx0XHRcdFx0fSk7XG5cdFx0aW5jbHVkZXNDb250YWluZXIxLmNyZWF0ZUVsKFwicFwiLCB7IHRleHQ6ICdBdHRhY2ggRmlsZXM/JyB9KTtcblx0XHRuZXcgVG9nZ2xlQ29tcG9uZW50KGluY2x1ZGVzQ29udGFpbmVyMSlcblx0XHRcdFx0XHQub25DaGFuZ2UoICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5hdHRhY2hTY29yZXMgPSB2YWx1ZTtcblx0XHRcdFx0XHRcdGF0dGFjaGRpdi5zdHlsZS5kaXNwbGF5ID0gKHZhbHVlKT9cImJsb2NrXCI6XCJub25lXCI7XG5cdFx0XHRcdFx0fSlcblx0XHRsZXQgYXR0YWNoZGl2ID0gY29udGVudEVsLmNyZWF0ZURpdigpO1xuXHRcdGF0dGFjaGRpdi5zdHlsZS5kaXNwbGF5ID0gXCJncmlkXCI7XG5cdFx0YXR0YWNoZGl2LnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBcImNhbGMoMzMlIC0gMTBweCkgY2FsYyg1MCUgLSAxMHB4KVwiXG5cdFx0YXR0YWNoZGl2LmNyZWF0ZUVsKFwicFwiLCB7IHRleHQ6ICdBdHRhY2htZW50cyBkaXJlY3Rvcnk6ICcgfSk7XG5cdFx0Y29uc3QgaW5wdXREYXRhRmlsZSA9IGF0dGFjaGRpdi5jcmVhdGVFbChcImlucHV0XCIsIHtcblx0XHRcdFx0XHRhdHRyOiB7XG5cdFx0XHRcdFx0ICB0eXBlOiBcImZpbGVcIixcblx0XHRcdFx0XHQgIG11bHRpcGxlOiBmYWxzZSxcblx0XHRcdFx0XHQgIC8vYWNjZXB0OiBcIi5qc29uLC5jc3YsLnRzdlwiLFxuXHRcdFx0XHRcdCAgd2Via2l0ZGlyZWN0b3J5OiB0cnVlLFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0YXR0YWNoZGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuXHRcdGxldCBtZXNzYWdlRGl2ID0gY29udGVudEVsLmNyZWF0ZURpdigpO1xuXHRcdG1lc3NhZ2VEaXYuc3R5bGUubWFyZ2luVG9wID0gXCIxMHB4XCI7XG5cdFx0bWVzc2FnZURpdi5zdHlsZS5wYWRkaW5nID0gXCIxMHB4XCI7XG5cdFx0bWVzc2FnZURpdi5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCAjY2NjXCI7XG5cdFx0bWVzc2FnZURpdi5jcmVhdGVFbChcImg0XCIsIHsgdGV4dDogJ1R5cGUgeW91ciBtZXNzYWdlOicgfSk7XG5cdFx0bGV0IHRhcmVhID0gbmV3IFRleHRBcmVhQ29tcG9uZW50KG1lc3NhZ2VEaXYpXG5cdFx0Ly8gbGV0IHRhcmVhID0gbmV3IFNldHRpbmcobWVzc2FnZURpdilcblx0XHQvLyBcdC5zZXROYW1lKFwiVHlwZSB5b3VyIG1lc3NhZ2VcIilcblx0XHQvLyBcdC5hZGRUZXh0QXJlYSggKGFyZWEpID0+IHtcblx0XHQvLyBcdFx0YXJlYVxuXHRcdFx0XHRcdC5vbkNoYW5nZSggKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLm1lc3NhZ2UgPSB2YWx1ZTtcblx0XHRcdFx0XHR9KVxuXHRcdC8vXHR9KVxuXHRcdHRhcmVhLmlucHV0RWwuc3R5bGUuaGVpZ2h0ID0gXCIyMDBweFwiO1xuXHRcdHRhcmVhLmlucHV0RWwuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcblx0XHQvL25hbWVFbC5pbm5lckhUTUwgPSBcIjxmb250IGNvbG9yPXJlZD5UeXBlIHlvdXIgbWVzc2FnZTo8L2ZvbnQ+XCI7XG5cblx0XHRsZXQgYnV0dG9uQ29udGFpbmVyMiA9IGNvbnRlbnRFbC5jcmVhdGVEaXYoKTtcblx0XHRcblx0XHRuZXcgU2V0dGluZyhidXR0b25Db250YWluZXIyKVxuICAgICAgXHRcdC5hZGRCdXR0b24oKGJ0bikgPT5cbiAgICAgICAgXHRcdGJ0blxuXHRcdC8vbmV3IEJ1dHRvbkNvbXBvbmVudChidXR0b25Db250YWluZXIpXG4gICAgICAgICAgXHRcdC5zZXRCdXR0b25UZXh0KFwiT0tcIilcbiAgICAgICAgICBcdFx0LnNldEN0YSgpXG4gICAgICAgICAgXHRcdC5vbkNsaWNrKCgpID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhpbnB1dERhdGFGaWxlLmZpbGVzKTtcbiAgICAgICAgICAgIFx0XHR0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICBcdFx0dGhpcy5vblN1Ym1pdCh0aGlzLm1lc3NhZ2UsIHRoaXMuZnJvbSwgdGhpcy5hZGRyZXNzLCB0aGlzLnN1YmplY3QsIHRoaXMuYXR0YWNoU2NvcmVzLCBpbnB1dERhdGFGaWxlLmZpbGVzKTtcbiAgICAgICAgICB9KSk7XG5cdH1cblxuXHRvbkNsb3NlKCkge1xuXHRcdGNvbnN0IHtjb250ZW50RWx9ID0gdGhpcztcblx0XHRjb250ZW50RWwuZW1wdHkoKTtcblx0fVxuXG5cdFxufVxuXG4iLCJpbXBvcnQgeyBBcHAsIEJ1dHRvbkNvbXBvbmVudCwgRWRpdG9yLCBJdGVtVmlldywgTWFya2Rvd25GaWxlSW5mbywgTWVudSwgTW9kYWwsIE5vdGljZSwgU2V0dGluZywgVEZpbGUsIFRleHRBcmVhQ29tcG9uZW50LCBUZXh0Q29tcG9uZW50LCBUZXh0RmlsZVZpZXcsIFRvZ2dsZUNvbXBvbmVudCwgV29ya3NwYWNlTGVhZiB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5leHBvcnQgY2xhc3MgTm90ZU1vZGFsIGV4dGVuZHMgTW9kYWwge1xuXHRub3RlOiBzdHJpbmc7XG5cdG9uU3VibWl0OiAobm90ZTogc3RyaW5nKSA9PiB2b2lkO1xuXHRcblx0Y29uc3RydWN0b3IoYXBwOiBBcHAsIFxuICAgICAgICAgICAgICAgIG5vdGU6IHN0cmluZyxcblx0XHQgICAgICAgIG9uU3VibWl0OiAobm90ZTogc3RyaW5nKSA9PiB2b2lkKSB7XG5cdFx0c3VwZXIoYXBwKTtcblxuXHRcdHRoaXMubm90ZSA9IG5vdGU7XG5cdFx0dGhpcy5vblN1Ym1pdCA9IG9uU3VibWl0O1xuXHR9XG5cblx0b25PcGVuKCkge1xuXHRcdGNvbnN0IHtjb250ZW50RWx9ID0gdGhpcztcblxuXHRcdGNvbnRlbnRFbC5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogJ1R5cGUgeW91ciBub3RlOicgfSk7XG5cblx0XHRsZXQgbWVzc2FnZURpdiA9IGNvbnRlbnRFbC5jcmVhdGVEaXYoKTtcblx0XHRtZXNzYWdlRGl2LnN0eWxlLm1hcmdpblRvcCA9IFwiMTBweFwiO1xuXHRcdG1lc3NhZ2VEaXYuc3R5bGUucGFkZGluZyA9IFwiMTBweFwiO1xuXHRcdG1lc3NhZ2VEaXYuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgI2NjY1wiO1xuXHRcdGxldCB0YXJlYSA9IG5ldyBUZXh0QXJlYUNvbXBvbmVudChtZXNzYWdlRGl2KVxuXHRcdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLm5vdGUpXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKCAodmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMubm90ZSA9IHZhbHVlO1xuXHRcdFx0XHRcdH0pXG5cdFx0Ly9cdH0pXG5cdFx0dGFyZWEuaW5wdXRFbC5zdHlsZS5oZWlnaHQgPSBcIjIwMHB4XCI7XG5cdFx0dGFyZWEuaW5wdXRFbC5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuXG5cdFx0bGV0IGJ1dHRvbkNvbnRhaW5lcjIgPSBjb250ZW50RWwuY3JlYXRlRGl2KCk7XG5cdFx0XG5cdFx0bmV3IFNldHRpbmcoYnV0dG9uQ29udGFpbmVyMilcbiAgICAgIFx0XHQuYWRkQnV0dG9uKChidG4pID0+XG4gICAgICAgIFx0XHRidG5cblx0XHQvL25ldyBCdXR0b25Db21wb25lbnQoYnV0dG9uQ29udGFpbmVyKVxuICAgICAgICAgIFx0XHQuc2V0QnV0dG9uVGV4dChcIk9LXCIpXG4gICAgICAgICAgXHRcdC5zZXRDdGEoKVxuICAgICAgICAgIFx0XHQub25DbGljaygoKSA9PiB7XG4gICAgICAgICAgICBcdFx0dGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgXHRcdHRoaXMub25TdWJtaXQodGhpcy5ub3RlKTtcbiAgICAgICAgICB9KSk7XG5cdH1cblxuXHRvbkNsb3NlKCkge1xuXHRcdGNvbnN0IHtjb250ZW50RWx9ID0gdGhpcztcblx0XHRjb250ZW50RWwuZW1wdHkoKTtcblx0fVxuXG5cdFxufVxuXG4iLCJpbXBvcnQgeyBCdXR0b25Db21wb25lbnQsIFRGaWxlLCBUZXh0Q29tcG9uZW50IH0gZnJvbSBcIm9ic2lkaWFuXCJcblxuaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tIFwiLi9DYXRlZ29yeVwiO1xuaW1wb3J0IHsgQ291bnRlciB9IGZyb20gXCIuL0NvdW50ZXJcIjtcbmltcG9ydCB7IEdyYWRlU2V0IH0gZnJvbSBcIi4vR3JhZGVTZXRcIjtcbmltcG9ydCB7IFNjb3JlIH0gZnJvbSBcIi4vU2NvcmVcIjtcbmltcG9ydCBVdGlsaXRpZXMgZnJvbSBcIi4uL3V0aWxpdGllcy9VdGlsaXRpZXNcIjtcblxuZXhwb3J0IGNsYXNzIFN0dWRlbnQge1xuXG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGlkOiBzdHJpbmc7XG4gICAgZW1haWxhZGRyZXNzOiBzdHJpbmc7XG4gICAgbmlja25hbWU6IHN0cmluZztcbiAgICBtb2JpbGVQaG9uZU51bWJlcjogc3RyaW5nO1xuICAgIG5vdGVzOiBzdHJpbmc7XG5cdGdyYWRpbmdfc2NoZW1lOiBudW1iZXI7XG4gICAgZmxhZ3M6IG51bWJlcjtcbiAgICBzY29yZXM6IE1hcDxzdHJpbmcsIG51bWJlcj47XG5cdGFic2VuY2VzOiBEYXRlW107XG4gICAgY291bnRlcnM6IENvdW50ZXJbXTtcblx0aW1hZ2U6IHN0cmluZztcbiAgICBcbiAgICBkYXRhTW9kaWZpZWQ6IGJvb2xlYW47XG4gICAgaW1hZ2VNb2RpZmllZDogYm9vbGVhbjtcbiAgICBub3Rlc01vZGlmaWVkOiBib29sZWFuO1xuXG4gICAgZGF0YTogTWFwPHN0cmluZywgc3RyaW5nPjtcblxuICAgIHN0dWRlbnREaXY6IEhUTUxFbGVtZW50O1xuICAgIHN0dWRlbnRJbWFnZTogSFRNTEltYWdlRWxlbWVudDtcblxuICAgIHNvdXJjZUZpbGU6IFRGaWxlO1xuICAgIG5vdGVEYXRhOiBzdHJpbmc7XG4gICAgZGlzcGxheWVkRmluYWxTY29yZTogbnVtYmVyO1xuXG4gICAgc2Nyb2xsdGV4dEljb246IHN0cmluZyA9ICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgY2xhc3M9XCJsdWNpZGUgbHVjaWRlLXNjcm9sbC10ZXh0XCI+PHBhdGggZD1cIk04IDIxaDEyYTIgMiAwIDAgMCAyLTJ2LTJIMTB2MmEyIDIgMCAxIDEtNCAwVjVhMiAyIDAgMSAwLTQgMHYzaDRcIi8+PHBhdGggZD1cIk0xOSAxN1Y1YTIgMiAwIDAgMC0yLTJINFwiLz48cGF0aCBkPVwiTTE1IDhoLTVcIi8+PHBhdGggZD1cIk0xNSAxMmgtNVwiLz48L3N2Zz4nO1xuXG4gICAgY29uc3RydWN0b3Iob2JqOiBhbnkpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgICAgICAgaWYgKG9iaiAhPSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgb29iaiA9IG9iaiBhcyBPYmplY3Q7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhvb2JqKS5mb3JFYWNoKCAoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGtleSwgb2JqW2tleV0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGF0YS5zZXQoXCJkYXRhTW9kaWZpZWRcIiwgXCJmYWxzZVwiKTtcbiAgICAgICAgdGhpcy5kYXRhLnNldChcImltYWdlTW9kaWZpZWRcIiwgXCJmYWxzZVwiKTtcbiAgICAgICAgdGhpcy5kYXRhLnNldChcIm5vdGVzTW9kaWZpZWRcIiwgXCJmYWxzZVwiKTtcblxuICAgICAgICB0aGlzLnNjb3JlcyA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG4gICAgICAgIGlmIChvYmogIT0gbnVsbCAmJiBvYmouc2NvcmVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxldCBhcnIgPSBBcnJheS5mcm9tKG9iai5zY29yZXMpO1xuICAgICAgICAgICAgYXJyLmZvckVhY2goIChwYWlyOiBhbnkpID0+e1xuICAgICAgICAgICAgICAgIHRoaXMuc2NvcmVzLnNldChwYWlyLm5hbWUsIHBhaXIudmFsdWUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubm90ZURhdGEgPSBcIlwiO1xuICAgICAgICB0aGlzLmFic2VuY2VzID0gW107XG4gICAgICAgIHRoaXMuY291bnRlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5ub3RlcyA9IFwiXCI7XG4gICAgICAgIHRoaXMuc291cmNlRmlsZSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25maWd1cmVGcm9tRGF0YShkYXRhOiBzdHJpbmcpIHtcbiAgICAgICAgdmFyIHNjb3JlczogYW55W107XG4gICAgICAgIHZhciB0YWc6IHN0cmluZztcbiAgICAgICAgdmFyIGRlZmluaXRpb246IHN0cmluZztcblxuICAgICAgICB0aGlzLm5vdGVEYXRhID0gZGF0YTtcblxuICAgICAgICBsZXQgbGluZXMgPSBkYXRhLnNwbGl0KFwiXFxuXCIpO1xuXG4gICAgICAgIHNjb3JlcyA9IFtdO1xuICAgICAgICB0aGlzLmFic2VuY2VzID0gW107XG4gICAgICAgIHRoaXMuY291bnRlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5ub3RlcyA9IFwiXCI7XG5cbiAgICAgICAgbGluZXMuZm9yRWFjaCggKGxpbmU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKGxpbmUuY2hhckF0KDApID09PSAnIycgJiYgbGluZS5jaGFyQXQoMSkgIT09ICcgJykge1xuICAgICAgICAgICAgICAgIGxldCB0YWcgPSBsaW5lLnN1YnN0cmluZygwLCBsaW5lLmluZGV4T2YoXCIgXCIpKTtcbiAgICAgICAgICAgICAgICBsZXQgZGVmaW5pdGlvbiA9IGxpbmUuc3Vic3RyaW5nKGxpbmUuaW5kZXhPZihcIiBcIikpO1xuICAgICAgICAgICAgICAgIGRlZmluaXRpb24gPSBkZWZpbml0aW9uLnRyaW0oKTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ09ORklHVVJJTkcgU1RVREVOVCB3aXRoIFwiK3RhZysnIGFzICcrZGVmaW5pdGlvbik7XG5cbiAgICAgICAgICAgICAgICBpZiAodGFnID09PSBcIiNub3RlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBRERJTkcgTk9URSB0byBcIit0aGlzLm5vdGVzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RlcyArPSBkZWZpbml0aW9uICsgXCJcXG5cIjtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5ub3Rlcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0YWcgPT09IFwiI3Njb3JlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb3BzID0gZGVmaW5pdGlvbi5zcGxpdChcInxcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0KHByb3BzWzBdLnRyaW0oKSwgcHJvcHNbMV0udHJpbSgpLCBwYXJzZUZsb2F0KHByb3BzWzJdKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0YWcgPT09IFwiI2NvdW50ZXJcIikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvcHMgPSBkZWZpbml0aW9uLnNwbGl0KFwifFwiKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ZXIgPSBuZXcgQ291bnRlcihwcm9wc1swXS50cmltKCkpOyBcbiAgICAgICAgICAgICAgICAgICAgY291bnRlci52YWx1ZSA9IHBhcnNlSW50KHByb3BzWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3VudGVycy5wdXNoKGNvdW50ZXIpOyAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRhZyA9PT0gXCIjYWJzZW5jZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoZGVmaW5pdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGUpXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFic2VuY2VzID09IHVuZGVmaW5lZCB8fCB0aGlzLmFic2VuY2VzID09IG51bGwpIHRoaXMuYWJzZW5jZXMgID0gW107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWJzZW5jZXMucHVzaChkYXRlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdm5hbWUgPSB0YWcuc3Vic3RyaW5nKDEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KHZuYW1lLCBkZWZpbml0aW9uKTsgXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgXG4gICAgfVxuXG4gICAgc2V0U291cmNlRmlsZShmaWxlOiBURmlsZSkge1xuICAgICAgICB0aGlzLnNvdXJjZUZpbGUgPSBmaWxlO1xuICAgIH1cblxuICAgIGRpc3BsYXkoZGl2OiBIVE1MRGl2RWxlbWVudCwgc3R5bGU6IHN0cmluZywgZmluYWxTY29yZTogbnVtYmVyLCBmaW5hbFdpdGhXZWlnaHRzOiBudW1iZXIgPSAtMSkge1xuICAgICAgICB0aGlzLmRpc3BsYXllZEZpbmFsU2NvcmUgPSBmaW5hbFNjb3JlO1xuICAgICAgICB0aGlzLnN0dWRlbnREaXYgPSBkaXYuY3JlYXRlRWwoXCJkaXZcIik7Ly8sIHtjbHM6IFwic3R1ZGVudC1zdHlsZVwifSk7XG5cbiAgICAgICAgbGV0IHRhYmxlID0gdGhpcy5zdHVkZW50RGl2LmNyZWF0ZUVsKFwidGFibGVcIiwgeyBjbHM6IFwic3R1ZGVudC10YWJsZS1zdHlsZVwiIH0pO1xuICAgICAgICBsZXQgdGJvZHkgPSB0YWJsZS5jcmVhdGVFbChcInRib2R5XCIpO1xuICAgICAgICBsZXQgcm93ID0gdGJvZHkuY3JlYXRlRWwoXCJ0clwiKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc3R1ZGVudEltYWdlID0gbnVsbDtcbiAgICAgICAgbGV0IGNlbGwgPSByb3cuY3JlYXRlRWwoXCJ0ZFwiLCB7IGNsczogc3R5bGUgfSk7XG4gICAgICAgIGxldCBoZWk6IEhUTUxJbWFnZUVsZW1lbnQgPSBjZWxsLmNyZWF0ZUVsKFwiaW1nXCIpOyBcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5nZXQoXCJpbWFnZVwiKSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGhlaS5zcmMgPSBcImh0dHBzOi8vcml6em8uaG9wZS5lZHUvfmppcHBpbmcvbm9pbWFnZS5wbmdcIjtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoXCJpbWFnZVwiLCBcImh0dHBzOi8vcml6em8uaG9wZS5lZHUvfmppcHBpbmcvbm9pbWFnZS5wbmdcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoZWkuc3JjID0gdGhpcy5kYXRhLmdldChcImltYWdlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGhlaS5vbmVycm9yID0gZnVuY3Rpb24oKSB7IFxuICAgICAgICAgICAgaGVpLnNyYyA9IFwiaHR0cHM6Ly9yaXp6by5ob3BlLmVkdS9+amlwcGluZy9ub2ltYWdlLnBuZ1wiOyBcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoXCJpbWFnZVwiLCBcImh0dHBzOi8vcml6em8uaG9wZS5lZHUvfmppcHBpbmcvbm9pbWFnZS5wbmdcIik7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2V0KFwiaW1hZ2VNb2RpZmllZFwiLCBcInRydWVcIik7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2V0KFwiZGF0YU1vZGlmaWVkXCIsIFwidHJ1ZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBoZWkuaGVpZ2h0ID0gMTAwO1xuICAgICAgICB0aGlzLnN0dWRlbnRJbWFnZSA9IGhlaTtcblxuICAgICAgICBpZiAodGhpcy5ub3RlcyAhPT0gdW5kZWZpbmVkICYmIHRoaXMubm90ZXMgIT09IG51bGwgJiYgdGhpcy5ub3Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjZWxsLmNyZWF0ZUVsKFwiYnJcIik7XG4gICAgICAgICAgICBjZWxsLmlubmVySFRNTCArPSB0aGlzLnNjcm9sbHRleHRJY29uO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZzY29yZSA9IFV0aWxpdGllcy5maXhUb1BsYWNlcyhmaW5hbFNjb3JlKTtcblxuICAgICAgICBjZWxsID0gcm93LmNyZWF0ZUVsKFwidGRcIiwgeyBjbHM6IHN0eWxlIH0pO1xuICAgICAgICBjZWxsLmNyZWF0ZUVsKFwiaDNcIiwge3RleHQ6IHRoaXMuZGF0YS5nZXQoXCJuYW1lXCIpLCBjbHM6IHN0eWxlfSk7XG4gICAgICAgIGlmIChmaW5hbFdpdGhXZWlnaHRzID09IC0xKSBcbiAgICAgICAgICAgIGNlbGwuY3JlYXRlRWwoXCJoNFwiLCB7dGV4dDogXCJcIitmc2NvcmUsIGNsczogc3R5bGV9KTtcbiAgICAgICAgZWxzZSBcbiAgICAgICAgICAgIGNlbGwuY3JlYXRlRWwoXCJoNFwiLCB7dGV4dDogXCJcIitmc2NvcmUrXCIgKFwiK1V0aWxpdGllcy5maXhUb1BsYWNlcyhmaW5hbFdpdGhXZWlnaHRzKStcIiUpXCIsIGNsczogc3R5bGV9KTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmNvdW50ZXJzKTtcbiAgICAgICAgaWYgKHRoaXMuY291bnRlcnMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvdW50ZXJzICE9PSBudWxsICYmIHRoaXMuY291bnRlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGNvdW50ZXJQID0gY2VsbC5jcmVhdGVFbChcInBcIik7XG4gICAgICAgICAgICB0aGlzLmNvdW50ZXJzLmZvckVhY2goIChjb3VudGVyOiBDb3VudGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY291bnRlclAuY3JlYXRlRWwoXCJzcGFuXCIsIHt0ZXh0OiBjb3VudGVyLm5hbWUgKyBcIjogXCIgKyBjb3VudGVyLnZhbHVlfSk7XG4gICAgICAgICAgICAgICAgY291bnRlclAuY3JlYXRlRWwoXCJiclwiKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYWJzZW5jZXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmFic2VuY2VzICE9PSBudWxsICYmIHRoaXMuYWJzZW5jZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGFicyA9IGNlbGwuY3JlYXRlRWwoXCJwXCIsIHt0ZXh0OiBcIlwiK3RoaXMuYWJzZW5jZXMubGVuZ3RoK1wiIGFic2Vuc2VzXCJ9KTtcbiAgICAgICAgICAgIGFicy5zdHlsZS5jb2xvciA9IFwicmVkXCI7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgZGlzcGxheVJvdyhyb3c6IEhUTUxEaXZFbGVtZW50LCBncmFkZVNldDogR3JhZGVTZXQpIHtcbiAgICAgICAgdGhpcy5zdHVkZW50RGl2ID0gcm93O1xuICAgICAgICBcbiAgICAgICAgbGV0IG5hbWVib3ggPSByb3cuY3JlYXRlRWwoXCJ0ZFwiLCB7IGNsczogXCJzdHVkZW50LWxpc3QtY2VsbC1zdHlsZVwiLCBhdHRyOiB7IGFsaWduOiBcImxlZnRcIiB9IH0pO1xuICAgICAgICBuYW1lYm94LmNyZWF0ZUVsKFwiaDNcIiwge3RleHQ6IHRoaXMuZGF0YS5nZXQoXCJuYW1lXCIpfSk7XG4gICAgICAgIGxldCBpZGJveCA9IHJvdy5jcmVhdGVFbChcInRkXCIsIHsgY2xzOiBcInN0dWRlbnQtbGlzdC1jZWxsLXN0eWxlXCIgfSk7XG4gICAgICAgIGlkYm94LmNyZWF0ZUVsKFwiaDNcIiwge3RleHQ6IHRoaXMuZGF0YS5nZXQoXCJpZFwiKX0pO1xuICAgICAgICBsZXQgZmluYWxib3ggPSByb3cuY3JlYXRlRWwoXCJ0ZFwiLCB7IGNsczogXCJzdHVkZW50LWxpc3QtZmluYWxzY29yZS1zdHlsZVwiIH0pO1xuICAgICAgICBmaW5hbGJveC5jcmVhdGVFbChcImgzXCIsIHt0ZXh0OiBcIlwiK1V0aWxpdGllcy5maXhUb1BsYWNlcyh0aGlzLmRpc3BsYXllZEZpbmFsU2NvcmUpfSk7XG4gICAgICAgIFxuICAgICAgICBncmFkZVNldC5jYXRlZ29yaWVzLmZvckVhY2goIChjYXQ6IENhdGVnb3J5KSA9PiB7IFxuICAgICAgICAgICAgaWYgKGNhdC5zY29yZVNldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY2F0LnNjb3JlU2V0LmZvckVhY2goIChzY29yZTogU2NvcmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0dWRlbnRTY29yZSA9IHRoaXMuZ2V0KGNhdCwgc2NvcmUubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3R1ZGVudFNjb3JlID09ICd1bmRlZmluZWQnKSBzdHVkZW50U2NvcmUgPSAwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbCA9IHJvdy5jcmVhdGVFbChcInRkXCIsIHsgY2xzOiBcInN0dWRlbnQtbGlzdC1jZWxsLXN0eWxlXCIgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY3JlYXRlRWwoXCJoM1wiLCB7dGV4dDogXCJcIitzdHVkZW50U2NvcmV9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0RGl2KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdHVkZW50RGl2O1xuICAgIH1cblxuICAgIGdldEhFSSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3R1ZGVudEltYWdlO1xuICAgIH0gICBcblxuICAgIGdldChjYXQ6IGFueSwgbmFtZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgdmFyIGtleTogc3RyaW5nO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY2F0ID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBrZXkgPSBjYXQgKyBcInxcIiArIG5hbWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBrZXkgPSAoY2F0IGFzIENhdGVnb3J5KS5uYW1lICsgXCJ8XCIgKyBuYW1lO1xuICAgICAgICB9XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJHRVRUSU5HU0NPUkUgXCIra2V5KTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnNjb3Jlcy5rZXlzKCkpO1xuICAgICAgICByZXR1cm4gdGhpcy5zY29yZXMuZ2V0KGtleSk7XG4gICAgfVxuXG4gICAgc2V0KGNhdDogYW55LCBzbmFtZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHZhciBrZXk6IHN0cmluZztcblxuICAgICAgICBpZiAodHlwZW9mIGNhdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGtleSA9IGNhdCArIFwifFwiICsgc25hbWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBrZXkgPSAoY2F0IGFzIENhdGVnb3J5KS5uYW1lICsgXCJ8XCIgKyBzbmFtZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zY29yZXMuZ2V0KGtleSkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5ub3RlRGF0YSArPSBcIlxcbiNzY29yZSBcIitrZXkrXCJ8XCIrdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJTRVRUSU5HIFwiK2tleStcIiB0byBcIit2YWx1ZSlcbiAgICAgICAgdGhpcy5zY29yZXMuc2V0KGtleSwgdmFsdWUpO1xuICAgIH1cblxuICAgIHJlbmFtZUNhdGVnb3J5KG9sZE5hbWU6IHN0cmluZywgbmV3TmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUkVOQU1JTkcgXCIrb2xkTmFtZStcIiB0byBcIituZXdOYW1lKTtcbiAgICAgICAgbGV0IG5ld1Njb3JlcyA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG4gICAgICAgIHRoaXMuc2NvcmVzLmZvckVhY2goICh2YWx1ZTogbnVtYmVyLCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgbGV0IHBhcnRzID0ga2V5LnNwbGl0KFwifFwiKTtcbiAgICAgICAgICAgIGlmIChwYXJ0c1swXSA9PT0gb2xkTmFtZSkge1xuICAgICAgICAgICAgICAgIG5ld1Njb3Jlcy5zZXQobmV3TmFtZStcInxcIitwYXJ0c1sxXSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUkVQTEFDSU5HIFwiK2tleStcIiB3aXRoIFwiK25ld05hbWUrXCJ8XCIrcGFydHNbMV0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YU1vZGlmaWVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3U2NvcmVzLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5zY29yZXMgPSBuZXdTY29yZXM7XG4gICAgfVxuXG4gICAgcmVuYW1lU2NvcmUob2xkTmFtZTogc3RyaW5nLCBuZXdOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJSRU5BTUlORyBcIitvbGROYW1lK1wiIHRvIFwiK25ld05hbWUpO1xuICAgICAgICAvL2xldCBuZXdTY29yZXMgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuICAgICAgICB0aGlzLnNjb3Jlcy5mb3JFYWNoKCAodmFsdWU6IG51bWJlciwga2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgPT09IG9sZE5hbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3Jlcy5zZXQobmV3TmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2NvcmVzLmRlbGV0ZShvbGROYW1lKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJFUExBQ0lORyBcIitrZXkrXCIgd2l0aCBcIituZXdOYW1lKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFNb2RpZmllZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc2V0RnJvbVBhaXIoeyBuYW1lLCB2YWx1ZX06IHtuYW1lOiBzdHJpbmcsIHZhbHVlOiBudW1iZXJ9LCBhZGRUb0RhdGE9dHJ1ZSkge1xuICAgICAgICBpZiAodGhpcy5zY29yZXMuZ2V0KG5hbWUpID09PSB1bmRlZmluZWQgJiYgYWRkVG9EYXRhKSB7XG4gICAgICAgICAgICB0aGlzLm5vdGVEYXRhICs9IFwiXFxuI3Njb3JlIFwiK25hbWUrXCJ8XCIrdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zY29yZXMuc2V0KG5hbWUsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBhZGRBYnNlbmNlKGRhdGU6IERhdGUsIGFkZFRvRGF0YT10cnVlKSB7XG4gICAgICAgIGlmICh0aGlzLmFic2VuY2VzID09IHVuZGVmaW5lZCB8fCB0aGlzLmFic2VuY2VzID09IG51bGwpIHRoaXMuYWJzZW5jZXMgID0gW107XG4gICAgICAgIHZhciB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHZhciBkZCA9IHRvZGF5LmdldERhdGUoKTtcbiAgICAgICAgdmFyIG1tID0gdG9kYXkuZ2V0TW9udGgoKSsxOyBcbiAgICAgICAgdmFyIHl5eXkgPSB0b2RheS5nZXRGdWxsWWVhcigpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGFkZFRvRGF0YSkge1xuICAgICAgICAgICAgdGhpcy5ub3RlRGF0YSArPSBcIlxcbiNhYnNlbmNlIFwiK21tK1wiL1wiK2RkK1wiL1wiK3l5eXk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5vdGVEYXRhKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFic2VuY2VzLnB1c2goZGF0ZSk7XG4gICAgfVxuXG4gICAgYWRkQ291bnRlcihjb3VudGVyOiBDb3VudGVyLCBhZGRUb0RhdGE9dHJ1ZSkge1xuICAgICAgICBpZiAoYWRkVG9EYXRhKSB7XG4gICAgICAgICAgICB0aGlzLm5vdGVEYXRhICs9IFwiXFxuI2NvdW50ZXIgXCIrY291bnRlci5uYW1lK1wifFwiK2NvdW50ZXIudmFsdWU7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5vdGVEYXRhKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvdW50ZXJzLnB1c2goY291bnRlcik7XG4gICAgfVxuXG4gICAgZGVsZXRlQ291bnRlcihjb3VudGVyOiBDb3VudGVyKSB7XG4gICAgICAgIGZvciAobGV0IGk9MDsgaSA8IHRoaXMuY291bnRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvdW50ZXJzW2ldLm5hbWUgPT09IGNvdW50ZXIubmFtZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY291bnRlcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluZENvdW50ZXIobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHZhciBmb3VuZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvdW50ZXJzLmZvckVhY2goIChjb3VudGVyOiBDb3VudGVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoY291bnRlci5uYW1lID09PSBuYW1lKSBmb3VuZCA9IHRydWU7XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG5cbiAgICBnZXRDb3VudGVyKG5hbWU6IHN0cmluZyk6IENvdW50ZXIge1xuICAgICAgICBsZXQgYyA6IENvdW50ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmNvdW50ZXJzLmZvckVhY2goIChjb3VudGVyOiBDb3VudGVyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNPTVBBUklORyAnXCIrY291bnRlci5uYW1lK1wiJyB0byAnXCIrbmFtZStcIidcIilcbiAgICAgICAgICAgIGlmIChjb3VudGVyLm5hbWUubG9jYWxlQ29tcGFyZShuYW1lKSA9PT0gMCkgYyA9IGNvdW50ZXI7XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBjO1xuICAgIH1cblxuICAgIHVwZGF0ZUNvdW50ZXIoY291bnRlcjogQ291bnRlcikge1xuICAgICAgICB0aGlzLmNvdW50ZXJzLmZvckVhY2goIChjOiBDb3VudGVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoYy5uYW1lID09PSBjb3VudGVyLm5hbWUpIHtcbiAgICAgICAgICAgICAgICBjLnZhbHVlID0gY291bnRlci52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB1cGRhdGVDb3VudGVyTmFtZShuYW1lOiBzdHJpbmcsIGNvdW50ZXI6IENvdW50ZXIpIHtcbiAgICAgICAgdGhpcy5jb3VudGVycy5mb3JFYWNoKCAoYzogQ291bnRlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGMubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgIGMubmFtZSA9IGNvdW50ZXIubmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzZXROb3Rlcyhub3Rlczogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubm90ZXMgPSBub3RlcztcbiAgICB9XG5cbiAgICBpbWFnZUV4aXN0cyhpbWFnZV91cmw6IHN0cmluZykge1xuXG4gICAgICAgIHZhciBodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBodHRwLm9wZW4oJ0hFQUQnLCBpbWFnZV91cmwsIGZhbHNlKTtcbiAgICAgICAgICAgIGh0dHAuc2VuZCgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coaHR0cCk7XG4gICAgICAgICAgICByZXR1cm4gaHR0cC5zdGF0dXMgIT0gNDA0O1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGluIGltYWdlRXhpc3RzOiBcIitlKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2VuZXJhdGVNYXJrZG93bihncmFkZVNldDogR3JhZGVTZXQpIHtcbiAgICAgICAgdmFyIHN0dWRlbnROb3RlOiBzdHJpbmcgPSBcIlwiO1xuICAgIFxuICAgICAgICAvLyBUaXRsZSBcbiAgICAgICAgc3R1ZGVudE5vdGUgKz0gXCItLS0tXFxuIyBcIit0aGlzLmRhdGEuZ2V0KFwibmFtZVwiKSsnXFxuJztcblxuICAgICAgICAvLyBJbWFnZVxuICAgICAgICBsZXQgaW0gPSB0aGlzLmRhdGEuZ2V0KFwiaW1hZ2VcIik7XG4gICAgICAgIGlmICh0aGlzLmRhdGEuZ2V0KFwiaW1hZ2VcIikgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2V0KFwiaW1hZ2VcIiwgXCJodHRwczovL3JpenpvLmhvcGUuZWR1L35qaXBwaW5nL25vaW1hZ2UucG5nXCIpO1xuICAgICAgICAgICAgaW0gPSBcImh0dHBzOi8vcml6em8uaG9wZS5lZHUvfmppcHBpbmcvbm9pbWFnZS5wbmdcIjtcbiAgICAgICAgfSBcbiAgICAgICAgc3R1ZGVudE5vdGUgKz0gXCI8aW1nIHNyYz1cXFwiXCIraW0rXCJcXFwiIHdpZHRoPTc1ID5cXG5cXG5cIjtcbiAgXG4gICAgICAgIHN0dWRlbnROb3RlICs9IFwiIC0gSUQ6IFwiK3RoaXMuZGF0YS5nZXQoXCJpZFwiKSsnXFxuJztcbiAgICAgICAgc3R1ZGVudE5vdGUgKz0gXCIgLSBFbWFpbDogXCIrdGhpcy5kYXRhLmdldChcImVtYWlsYWRkcmVzc1wiKStcIlxcblwiO1xuICAgICAgICBzdHVkZW50Tm90ZSArPSBcIlxcbi0tLS1cXG5cIjsgXG4gICAgXG4gICAgICAgIGlmICh0aGlzLmFic2VuY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHN0dWRlbnROb3RlICs9IFwiIyMjIEFic2VuY2VzOiBcXG5cIjtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaSA8IHRoaXMuYWJzZW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgIHN0dWRlbnROb3RlICs9IFwiIC0gXCIgKyB0aGlzLmFic2VuY2VzW2ldLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tdXMnLCB7IHllYXI6XCJudW1lcmljXCIsIG1vbnRoOlwic2hvcnRcIiwgZGF5OlwibnVtZXJpY1wifSkgKyBcIlxcblwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3R1ZGVudE5vdGUgKz0gXCJcXG4tLS0tXFxuXCJcbiAgICAgICAgICB9XG4gICAgICBcbiAgICAgICAgaWYgKHRoaXMuY291bnRlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc3R1ZGVudE5vdGUgKz0gXCIjIyMgQ291bnRlcnM6IFxcblwiO1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpIDwgdGhpcy5jb3VudGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHN0dWRlbnROb3RlICs9IFwiIC0gXCIgKyB0aGlzLmNvdW50ZXJzW2ldLm5hbWUgKyBcIjogXCIgKyB0aGlzLmNvdW50ZXJzW2ldLnZhbHVlICsgXCJcXG5cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0dWRlbnROb3RlICs9IFwiXFxuLS0tLVxcblwiXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5ub3Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzdHVkZW50Tm90ZSArPSBcIiMjIyBOb3RlczogXFxuXCI7XG4gICAgICAgICAgICBzdHVkZW50Tm90ZSArPSB0aGlzLm5vdGVzO1xuICAgICAgICAgICAgc3R1ZGVudE5vdGUgKz0gXCJcXG4tLS0tXFxuXCJcbiAgICAgICAgfVxuICAgICAgXG4gICAgICAgIGlmIChncmFkZVNldC5jYXRlZ29yaWVzICE9IG51bGwpIHtcbiAgICAgICAgICAgY29uc29sZS5sb2coXCJTdHVkZW50VmlldyBDYXRlZ29yeSBsaXN0aW5nXCIpO1xuICAgICAgICAgICBzdHVkZW50Tm90ZSArPSBcIiMjIyBTY29yZXM6IFxcblwiO1xuICAgICAgICAgICBncmFkZVNldC5jYXRlZ29yaWVzLmZvckVhY2goKGNhdDogQ2F0ZWdvcnkpID0+IHtcbiAgICAgICAgICAgIHN0dWRlbnROb3RlICs9IFwiPiBbIW5vdGVdIFwiKyBjYXQubmFtZSArIFwiXFxuXCI7XG4gICAgICAgICAgICBpZiAoY2F0LnNjb3JlU2V0ICE9PSB1bmRlZmluZWQgJiYgY2F0LnNjb3JlU2V0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgY2F0LnNjb3JlU2V0LmZvckVhY2goIChzY29yZTogU2NvcmUpID0+IHtcbiAgICAgICAgICAgICAgICBzdHVkZW50Tm90ZSArPSBcIj4gLSAqKlwiK3Njb3JlLm5hbWUrXCIqKjogXCI7XG4gICAgICAgICAgICAgICAgIGxldCBzdHVkZW50U2NvcmUgPSB0aGlzLmdldChjYXQsIHNjb3JlLm5hbWUpO1xuICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNUVURFTlRTQ09SRTogXCIrc3R1ZGVudFNjb3JlKTtcbiAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdHVkZW50U2NvcmUgPT0gJ3VuZGVmaW5lZCcpIHN0dWRlbnRTY29yZSA9IDA7XG4gICAgICAgICAgICAgICAgIHN0dWRlbnROb3RlICs9IFwiXCIgKyBzdHVkZW50U2NvcmUgKyBcIiAvIFwiICsgc2NvcmUudmFsdWUgKyBcIlxcblwiO1xuICAgICAgICAgICAgIH0pXG4gICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3R1ZGVudE5vdGUgKz0gXCI+IE5PIFNDT1JFU1xcblwiO1xuICAgICAgICAgICB9XG4gICAgICAgICAgIHN0dWRlbnROb3RlICs9IFwiXFxuXCI7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gXG4gICAgXG4gICAgICAgIGxldCBmaW5hbCA9IGdyYWRlU2V0LmZpbmFsU2NvcmUodGhpcyk7XG4gICAgICAgIHN0dWRlbnROb3RlICs9IFwiIyMgVE9UQUwgPSBcIitVdGlsaXRpZXMuZml4VG9QbGFjZXMoZmluYWwpOyBcbiAgICAgICAgaWYgKCEgZ3JhZGVTZXQuYWxsQ2F0ZWdvcmllc0hhdmVTY29yZXMoKSkge1xuICAgICAgICAgICAgc3R1ZGVudE5vdGUgKz0gXCIgKFwiICsgVXRpbGl0aWVzLmZpeFRvUGxhY2VzKGZpbmFsL2dyYWRlU2V0LndlaWdodFRvdGFsKCkpICsgXCIlKVwiO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHJldHVybiBzdHVkZW50Tm90ZTtcbiAgICBcbiAgICAgIH1cblxuICAgICAgZ2VuZXJhdGVGaXJzdFhNTCgpIDogc3RyaW5nIHtcbiAgICAgICAgdmFyIHhtbCA9ICc8c3R1ZGVudCBuYW1lPVwiJyt0aGlzLmRhdGEuZ2V0KFwibmFtZVwiKSsnXCIgaWQ9XCInK3RoaXMuZGF0YS5nZXQoXCJpZFwiKSsnXCIgZW1haWw9XCInK3RoaXMuZGF0YS5nZXQoXCJlbWFpbGFkZHJlc3NcIikrJ1wiPlxcbic7XG5cbiAgICAgICAgaWYgKHRoaXMuYWJzZW5jZXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmFic2VuY2VzICE9PSBudWxsICYmIHRoaXMuYWJzZW5jZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5hYnNlbmNlcy5mb3JFYWNoKCAoZGF0ZTogRGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHhtbCArPSAnPGFic2Vuc2UgZGF0ZT1cIicrZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLXVzJywgeyB5ZWFyOlwibnVtZXJpY1wiLCBtb250aDpcInNob3J0XCIsIGRheTpcIm51bWVyaWNcIn0pKydcIi8+XFxuJztcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHhtbDtcbiAgICAgIH1cblxuICAgICAgZ2VuZXJhdGVTY29yZVhNTChjYXQ6IENhdGVnb3J5KSA6IHN0cmluZyB7XG4gICAgICAgIHZhciB4bWwgPSBcIlwiO1xuXG4gICAgICAgIGlmICh0aGlzLnNjb3JlcyAhPT0gdW5kZWZpbmVkICYmIHRoaXMuc2NvcmVzICE9PSBudWxsICYmIHRoaXMuc2NvcmVzLnNpemUgPiAwKSB7XG4gICAgICAgICAgICBjYXQuc2NvcmVTZXQuZm9yRWFjaCggKHNjb3JlOiBTY29yZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzdHVkZW50U2NvcmUgPSB0aGlzLmdldChjYXQsIHNjb3JlLm5hbWUpO1xuICAgICAgICAgICAgICAgIGlmIChzdHVkZW50U2NvcmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB4bWwgKz0gJzxzY29yZSBuYW1lPVwiJytzY29yZS5uYW1lKydcIiBwb2ludHM9XCInK3N0dWRlbnRTY29yZSsnXCI+PC9zY29yZT5cXG4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4bWw7XG4gICAgICB9XG4gICAgXG4gICAgICBnZW5lcmF0ZUVkaXRIVE1MKGNvbnRhaW5lcjogRWxlbWVudCwgZ3JhZGVTZXQ6IEdyYWRlU2V0KSB7XG4gIFxuICAgICAgICAvL2NvbnRhaW5lci5lbXB0eSgpO1xuICBcbiAgICAgICAgbGV0IGluZm9Db250YWluZXIgPSBjb250YWluZXIuY3JlYXRlRGl2KCk7XG4gICAgICAgIGluZm9Db250YWluZXIuY3JlYXRlRWwoXCJoclwiKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFN0dWRlbnQgaW5mb1xuICAgICAgICBpbmZvQ29udGFpbmVyLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBcIlN0dWRlbnQgSW5mb3JtYXRpb25cIiB9KTtcbiAgICAgICAgbGV0IGluZm9UYWJsZSA9IGluZm9Db250YWluZXIuY3JlYXRlRWwoXCJ0YWJsZVwiKTsgIFxuICAgICAgICBsZXQgaW5mb1JvdyA9IGluZm9UYWJsZS5jcmVhdGVFbChcInRyXCIpO1xuICAgICAgICBsZXQgaW5mb0NlbGwgPSBpbmZvUm93LmNyZWF0ZUVsKFwidGRcIiwgeyB0ZXh0OiBcIk5hbWU6XCJ9KTtcbiAgICAgICAgaW5mb0NlbGwgPSBpbmZvUm93LmNyZWF0ZUVsKFwidGRcIik7XG4gICAgICAgIGxldCBlZGl0TmFtZSA9IG5ldyBUZXh0Q29tcG9uZW50KGluZm9DZWxsKTtcbiAgICAgICAgZWRpdE5hbWUuc2V0VmFsdWUodGhpcy5kYXRhLmdldChcIm5hbWVcIikpO1xuICAgICAgICBlZGl0TmFtZS5vbkNoYW5nZSggKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2V0KFwibmFtZVwiLCB2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpbmZvUm93ID0gaW5mb1RhYmxlLmNyZWF0ZUVsKFwidHJcIik7XG4gICAgICAgIGluZm9DZWxsID0gaW5mb1Jvdy5jcmVhdGVFbChcInRkXCIsIHsgdGV4dDogXCJJRDpcIn0pO1xuICAgICAgICBpbmZvQ2VsbCA9IGluZm9Sb3cuY3JlYXRlRWwoXCJ0ZFwiKTtcbiAgICAgICAgbGV0IGVkaXRJRCA9IG5ldyBUZXh0Q29tcG9uZW50KGluZm9DZWxsKTtcbiAgICAgICAgZWRpdElELnNldFZhbHVlKHRoaXMuZGF0YS5nZXQoXCJpZFwiKSk7XG4gICAgICAgIGVkaXRJRC5vbkNoYW5nZSggKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2V0KFwiaWRcIiwgdmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaW5mb1JvdyA9IGluZm9UYWJsZS5jcmVhdGVFbChcInRyXCIpO1xuICAgICAgICBpbmZvQ2VsbCA9IGluZm9Sb3cuY3JlYXRlRWwoXCJ0ZFwiLCB7IHRleHQ6IFwiRW1haWwgQWRkcmVzczpcIn0pO1xuICAgICAgICBpbmZvQ2VsbCA9IGluZm9Sb3cuY3JlYXRlRWwoXCJ0ZFwiKTtcbiAgICAgICAgbGV0IGVkaXRBZGRyID0gbmV3IFRleHRDb21wb25lbnQoaW5mb0NlbGwpO1xuICAgICAgICBlZGl0QWRkci5zZXRWYWx1ZSh0aGlzLmRhdGEuZ2V0KFwiZW1haWxhZGRyZXNzXCIpKTtcbiAgICAgICAgZWRpdEFkZHIub25DaGFuZ2UoICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNldChcImVtYWlsYWRkcmVzc1wiLCB2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpbmZvUm93ID0gaW5mb1RhYmxlLmNyZWF0ZUVsKFwidHJcIik7XG4gICAgICAgIGluZm9DZWxsID0gaW5mb1Jvdy5jcmVhdGVFbChcInRkXCIsIHsgdGV4dDogXCJJbWFnZTpcIn0pO1xuICAgICAgICBpbmZvQ2VsbCA9IGluZm9Sb3cuY3JlYXRlRWwoXCJ0ZFwiKTtcbiAgICAgICAgbGV0IGltYWdlQWRkciA9IG5ldyBUZXh0Q29tcG9uZW50KGluZm9DZWxsKTtcbiAgICAgICAgaW1hZ2VBZGRyLmlucHV0RWwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJ3aWR0aDogMzAwJTtcIik7XG4gICAgICAgIGltYWdlQWRkci5zZXRWYWx1ZSh0aGlzLmRhdGEuZ2V0KFwiaW1hZ2VcIikpO1xuICAgICAgICBpbWFnZUFkZHIub25DaGFuZ2UoICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNldChcImltYWdlXCIsIHZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaW5mb0NvbnRhaW5lci5jcmVhdGVFbChcImhyXCIpO1xuXG4gICAgICAgIC8vIEFic2VuY2VzXG4gICAgICAgIGlmICh0aGlzLmFic2VuY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBsZXQgYWJDb250YWluZXIgPSBjb250YWluZXIuY3JlYXRlRGl2KCk7XG4gICAgICAgICAgYWJDb250YWluZXIuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IFwiQWJzZW5jZXNcIiB9KTtcbiAgICAgICAgICBsZXQgYWJUYWJsZSA9IGFiQ29udGFpbmVyLmNyZWF0ZUVsKFwidGFibGVcIik7ICBcbiAgICAgICAgICB0aGlzLmFic2VuY2VzLmZvckVhY2goIChhYnMpID0+IHtcbiAgICAgICAgICAgIGxldCBhYlJvdyA9IGFiVGFibGUuY3JlYXRlRWwoXCJ0clwiKTtcbiAgICAgICAgICAgIGxldCBhYkNlbGwgPSBhYlJvdy5jcmVhdGVFbChcInRkXCIpO1xuICAgICAgICAgICAgbGV0IGVkaXRBZGRyID0gbmV3IFRleHRDb21wb25lbnQoYWJDZWxsKTtcbiAgICAgICAgICAgIGVkaXRBZGRyLnNldFZhbHVlKGFicy50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLXVzJywgeyB5ZWFyOlwibnVtZXJpY1wiLCBtb250aDpcInNob3J0XCIsIGRheTpcIm51bWVyaWNcIn0pKTtcbiAgICAgICAgICAgIGVkaXRBZGRyLm9uQ2hhbmdlKCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgb3JpZyA9IGFicztcbiAgICAgICAgICAgICAgICBhYnMgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5hYnNlbmNlc1t0aGlzLmFic2VuY2VzLmluZGV4T2Yob3JpZyldID0gYWJzO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhYkNlbGwgPSBhYlJvdy5jcmVhdGVFbChcInRkXCIpO1xuICAgICAgICAgICAgbGV0IGRlbEJ1dHRvbiA9IG5ldyBCdXR0b25Db21wb25lbnQoYWJDZWxsKTtcbiAgICAgICAgICAgIGRlbEJ1dHRvbi5zZXRCdXR0b25UZXh0KFwiRGVsZXRlXCIpO1xuICAgICAgICAgICAgZGVsQnV0dG9uLm9uQ2xpY2soICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFic2VuY2VzLnNwbGljZSh0aGlzLmFic2VuY2VzLmluZGV4T2YoYWJzKSwgMSk7XG4gICAgICAgICAgICAgICAgYWJSb3cucmVtb3ZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBhYkNvbnRhaW5lci5jcmVhdGVFbChcImhyXCIpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLyBDb3VudGVyc1xuICAgICAgICBpZiAodGhpcy5jb3VudGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGV0IGNvQ29udGFpbmVyID0gY29udGFpbmVyLmNyZWF0ZURpdigpO1xuICAgICAgICAgIGNvQ29udGFpbmVyLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBcIkNvdW50ZXJzXCIgfSk7XG4gICAgICAgICAgbGV0IGNvVGFibGUgPSBjb0NvbnRhaW5lci5jcmVhdGVFbChcInRhYmxlXCIpOyAgXG4gICAgICAgICAgdGhpcy5jb3VudGVycy5mb3JFYWNoKCAoY250KSA9PiB7XG4gICAgICAgICAgICBsZXQgY29Sb3cgPSBjb1RhYmxlLmNyZWF0ZUVsKFwidHJcIik7XG4gICAgICAgICAgICBsZXQgY29DZWxsID0gY29Sb3cuY3JlYXRlRWwoXCJ0ZFwiLCB7IHRleHQ6IGNudC5uYW1lfSk7XG4gICAgICAgICAgICBjb0NlbGwgPSBjb1Jvdy5jcmVhdGVFbChcInRkXCIpO1xuICAgICAgICAgICAgbGV0IGVkaXRDb3VudGVyID0gbmV3IFRleHRDb21wb25lbnQoY29DZWxsKTtcbiAgICAgICAgICAgIGVkaXRDb3VudGVyLnNldFZhbHVlKFwiXCIrY250LnZhbHVlKTtcbiAgICAgICAgICAgIGVkaXRDb3VudGVyLm9uQ2hhbmdlKCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgY250LnZhbHVlID0gTnVtYmVyKHZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGNvQ29udGFpbmVyLmNyZWF0ZUVsKFwiaHJcIik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTY29yZXNcbiAgICAgICAgbGV0IHNjb3JlQ29udGFpbmVyID0gY29udGFpbmVyLmNyZWF0ZURpdigpO1xuICAgICAgICBpZiAodGhpcy5zY29yZXMuc2l6ZSA+IDApIHtcbiAgICAgICAgICBzY29yZUNvbnRhaW5lci5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogXCJTY29yZXNcIiB9KTtcbiAgICBcbiAgICAgICAgICBncmFkZVNldC5jYXRlZ29yaWVzLmZvckVhY2goIChjYXQ6IENhdGVnb3J5KSA9PiB7XG4gICAgICAgICAgICBzY29yZUNvbnRhaW5lci5jcmVhdGVFbChcImgzXCIsIHsgdGV4dDogY2F0Lm5hbWUgfSk7XG5cbiAgICAgICAgICAgIGlmIChjYXQuc2NvcmVTZXQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNjVGFibGUgPSBzY29yZUNvbnRhaW5lci5jcmVhdGVFbChcInRhYmxlXCIpOyAgICBcbiAgICAgICAgICAgICAgICBjYXQuc2NvcmVTZXQuZm9yRWFjaCggKHNjOiBTY29yZSkgPT4geyAgXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY1JvdyA9IHNjVGFibGUuY3JlYXRlRWwoXCJ0clwiKTsgIFxuICAgICAgICAgICAgICAgICAgICBzY1Jvdy5jcmVhdGVFbChcInRkXCIsIHsgYXR0cjoge3dpZHRoOiBcIjI1cHhcIiB9fSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzY0NlbGwgPSBzY1Jvdy5jcmVhdGVFbChcInRkXCIsIHsgdGV4dDogc2MubmFtZSB9KTsgIFxuICAgICAgICAgICAgICAgICAgICBzY0NlbGwgPSBzY1Jvdy5jcmVhdGVFbChcInRkXCIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZWRpdFNjb3JlVmFsdWUgPSBuZXcgVGV4dENvbXBvbmVudChzY0NlbGwpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2NvcmUgPSB0aGlzLmdldChjYXQsIHNjLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBlZGl0U2NvcmVWYWx1ZS5zZXRWYWx1ZShcIlwiK3Njb3JlKTtcbiAgICAgICAgICAgICAgICAgICAgZWRpdFNjb3JlVmFsdWUub25DaGFuZ2UoICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXQoY2F0LCBzYy5uYW1lLCBOdW1iZXIodmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjb3JlQ29udGFpbmVyLmNyZWF0ZUVsKFwicFwiLCB7IHRleHQ6IFwiTm8gU2NvcmVzXCJ9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuICAgICAgICBcblxufSIsIi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vXG4vLyAgRnVuY3Rpb25hbGl0eSBhc3NvY2lhdGUgd2l0aCBhIHRlbXBsYXRlLCBtb3N0bHkgbWVzc2FnZSB0ZW1wbGF0ZVxuLy8gXG4vLyAgUGF0dGVybiByZXBsYWNlbWVudCBpbiBtZXNzYWdlc1xuLy8gICAgICAlZmlyc3RuYW1lJSAtLT4gc3R1ZGVudCBmaXJzdCBuYW1lXG4vLyAgICAgICVsYXN0bmFtZSUgIC0tPiBzdHVkZW50IGxhc3QgbmFtZVxuLy8gICAgICAlaWQlICAgICAgICAtLT4gc3R1ZGVudCBpZFxuXG5pbXBvcnQgeyBDYXRlZ29yeSB9IGZyb20gJ2RhdGEvQ2F0ZWdvcnknO1xuaW1wb3J0IHsgR3JhZGVTZXQgfSBmcm9tICdkYXRhL0dyYWRlU2V0JztcbmltcG9ydCB7IFNjb3JlIH0gZnJvbSAnZGF0YS9TY29yZSc7XG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSAnZGF0YS9TdHVkZW50JztcbmltcG9ydCBVdGlsaXRpZXMgZnJvbSAndXRpbGl0aWVzL1V0aWxpdGllcyc7XG5cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZSB7XG5cbiAgICBncmFkZVNldDogR3JhZGVTZXQ7XG4gICAgcHJvY2Vzc1BhdHRlcm5zOiB7cGF0dGVybjogc3RyaW5nLCBwcm9jZXNzOiAob2xkOiBzdHJpbmcsIHN0dWQ6IFN0dWRlbnQpID0+IHN0cmluZ31bXTtcblxuICAgIGNvbnN0cnVjdG9yKGdyYWRlU2V0OiBHcmFkZVNldCkge1xuICAgICAgICB0aGlzLmdyYWRlU2V0ID0gZ3JhZGVTZXQ7XG5cbiAgICAgICAgdGhpcy5wcm9jZXNzUGF0dGVybnMgPSBbXG4gICAgICAgICAgICB7cGF0dGVybjogXCIlaWQlXCIsIFxuICAgICAgICAgICAgIHByb2Nlc3M6IChvbGQ6IHN0cmluZywgc3R1ZDogU3R1ZGVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBvbGQucmVwbGFjZShcIiVpZCVcIiwgc3R1ZC5kYXRhLmdldChcImlkXCIpKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge3BhdHRlcm46IFwiJW5hbWUlXCIsXG4gICAgICAgICAgICAgcHJvY2VzczogKG9sZDogc3RyaW5nLCBzdHVkOiBTdHVkZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9sZC5yZXBsYWNlKFwiJW5hbWUlXCIsIHN0dWQuZGF0YS5nZXQoXCJuYW1lXCIpKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge3BhdHRlcm46IFwiJWZpcnN0bmFtZSVcIixcbiAgICAgICAgICAgICBwcm9jZXNzOiAob2xkOiBzdHJpbmcsIHN0dWQ6IFN0dWRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZm5hbWUgPSBzdHVkLmRhdGEuZ2V0KFwiZm5hbWVcIik7XG4gICAgICAgICAgICAgICAgaWYgKGZuYW1lID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBmbmFtZSA9IHN0dWQuZGF0YS5nZXQoXCJuYW1lXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm5hbWUuY29udGFpbnMoXCIsXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbmFtZSA9IGZuYW1lLnNwbGl0KFwiLFwiKVsxXTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuYW1lID0gZm5hbWUuc3BsaXQoXCIgXCIpWzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgcmV0dXJuIG9sZC5yZXBsYWNlKFwiJWZpcnN0bmFtZSVcIiwgZm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICB9LFxuICAgICAgICAgICB7cGF0dGVybjogXCIlbGFzdG5hbWUlXCIsXG4gICAgICAgICAgICAgcHJvY2VzczogKG9sZDogc3RyaW5nLCBzdHVkOiBTdHVkZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGxuYW1lID0gc3R1ZC5kYXRhLmdldChcImxuYW1lXCIpO1xuICAgICAgICAgICAgICAgIGlmIChsbmFtZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbG5hbWUgPSBzdHVkLmRhdGEuZ2V0KFwibmFtZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxuYW1lLmNvbnRhaW5zKFwiLFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG5hbWUgPSBsbmFtZS5zcGxpdChcIixcIilbMF07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsbmFtZSA9IGxuYW1lLnNwbGl0KFwiIFwiKVsxXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIHJldHVybiBvbGQucmVwbGFjZShcIiVsYXN0bmFtZSVcIiwgbG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICB9LFxuICAgICAgICAgICAge3BhdHRlcm46IFwiJWVtYWlsYWRkcmVzcyVcIixcbiAgICAgICAgICAgICBwcm9jZXNzOiAob2xkOiBzdHJpbmcsIHN0dWQ6IFN0dWRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2xkLnJlcGxhY2UoXCIlZW1haWxhZGRyZXNzJVwiLCBzdHVkLmRhdGEuZ2V0KFwiZW1haWxhZGRyZXNzXCIpKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge3BhdHRlcm46IFwiJXRpdGxlJVwiLFxuICAgICAgICAgICAgIHByb2Nlc3M6IChvbGQ6IHN0cmluZywgc3R1ZDogU3R1ZGVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBvbGQucmVwbGFjZShcIiV0aXRsZSVcIiwgZ3JhZGVTZXQucHJvcGVydGllcy5nZXQoXCJ0aXRsZVwiKSk7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtwYXR0ZXJuOiBcIiVhYnNlbmNlbnVtYmVyJVwiLFxuICAgICAgICAgICAgIHByb2Nlc3M6IChvbGQ6IHN0cmluZywgc3R1ZDogU3R1ZGVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBvbGQucmVwbGFjZShcIiVhYnNlbmNlbnVtYmVyJVwiLCBzdHVkLmFic2VuY2VzLmxlbmd0aC50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7cGF0dGVybjogXCIlYWJzZW5jZWxpc3QlXCIsXG4gICAgICAgICAgICAgcHJvY2VzczogKG9sZDogc3RyaW5nLCBzdHVkOiBTdHVkZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGFiTm90ZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKHN0dWQuYWJzZW5jZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7IGkgPCBzdHVkLmFic2VuY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhYk5vdGUgKz0gXCIgLSBcIiArIHN0dWQuYWJzZW5jZXNbaV0udG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi11cycsIHsgeWVhcjpcIm51bWVyaWNcIiwgbW9udGg6XCJzaG9ydFwiLCBkYXk6XCJudW1lcmljXCJ9KSArIFwiXFxuXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhYk5vdGUgPSBcIk5vIGFic2VuY2VzXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBvbGQucmVwbGFjZShcIiVhYnNlbmNlbGlzdCVcIiwgYWJOb3RlKTs7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtwYXR0ZXJuOiBcIiVhYnNlbmNlbGlzdGlmbm9uemVybyVcIixcbiAgICAgICAgICAgICBwcm9jZXNzOiAob2xkOiBzdHJpbmcsIHN0dWQ6IFN0dWRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYWJOb3RlID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAoc3R1ZC5hYnNlbmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaSA8IHN0dWQuYWJzZW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFiTm90ZSArPSBcIiAtIFwiICsgc3R1ZC5hYnNlbmNlc1tpXS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLXVzJywgeyB5ZWFyOlwibnVtZXJpY1wiLCBtb250aDpcInNob3J0XCIsIGRheTpcIm51bWVyaWNcIn0pICsgXCJcXG5cIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFiTm90ZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBvbGQucmVwbGFjZShcIiVhYnNlbmNlbGlzdGlmbm9uemVybyVcIiwgYWJOb3RlKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge3BhdHRlcm46IFwiJWNvdW50ZXI6XCIsXG4gICAgICAgICAgICAgcHJvY2VzczogKG9sZDogc3RyaW5nLCBzdHVkOiBTdHVkZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVnZXggPSAvJWNvdW50ZXI6KC4qPyklL2c7XG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoZXMgPSBvbGQubWF0Y2gocmVnZXgpO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzID09IG51bGwpIHJldHVybiBvbGQ7XG4gICAgICAgICAgICAgICAgbWF0Y2hlcy5mb3JFYWNoKCAobWF0Y2gpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpZGVzID0gbWF0Y2guc3BsaXQoXCI6XCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvdW50ZXI6IFwiK3NpZGVzWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNuYW1lID0gc2lkZXNbMV0ucmVwbGFjZShcIiVcIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHN0dWQuZ2V0Q291bnRlcihjbmFtZS50cmltKCkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgXG4gICAgICAgICAgICAgICAgICAgICAgICBvbGQgPSBvbGQucmVwbGFjZShcIiVjb3VudGVyOlwiK3NpZGVzWzFdLCBcIkVSUk9SXCIpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBvbGQgPSBvbGQucmVwbGFjZShcIiVjb3VudGVyOlwiK3NpZGVzWzFdLCB2YWx1ZS52YWx1ZS50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHJldHVybiBvbGQ7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtwYXR0ZXJuOiBcIiVjYXRlZ29yeWxpc3QlXCIsXG4gICAgICAgICAgICAgcHJvY2VzczogKG9sZDogc3RyaW5nLCBzdHVkOiBTdHVkZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNhdE5vdGUgPSBcIlwiOyAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGdyYWRlU2V0LmNhdGVnb3JpZXMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBncmFkZVNldC5jYXRlZ29yaWVzLmZvckVhY2goKGNhdDogQ2F0ZWdvcnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgIGNhdE5vdGUgKz0gXCIjIyMgXCIrIGNhdC5uYW1lICsgXCIgKHdlaWdodCBpcyBcIisoY2F0LndlaWdodCoxMDApK1wiJSlcXG5cIjtcbiAgICAgICAgICAgICAgICAgICAgIGlmIChjYXQuc2NvcmVTZXQgIT09IHVuZGVmaW5lZCAmJiBjYXQuc2NvcmVTZXQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICBjYXQuc2NvcmVTZXQuZm9yRWFjaCggKHNjb3JlOiBTY29yZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjYXROb3RlICs9IFwiLSAqKlwiK3Njb3JlLm5hbWUrXCIqKjogXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHVkZW50U2NvcmUgPSBzdHVkLmdldChjYXQsIHNjb3JlLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN0dWRlbnRTY29yZSA9PSAndW5kZWZpbmVkJykgc3R1ZGVudFNjb3JlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Tm90ZSArPSBcIlwiICsgc3R1ZGVudFNjb3JlICsgXCIgLyBcIiArIHNjb3JlLnZhbHVlICsgXCJcXG5cIjtcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBjYXROb3RlICs9IFwiPiBOTyBTQ09SRVNcXG5cIjtcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIGNhdE5vdGUgKz0gXCJcXG5cIjtcbiAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9sZC5yZXBsYWNlKFwiJWNhdGVnb3J5bGlzdCVcIiwgY2F0Tm90ZSk7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtwYXR0ZXJuOiBcIiVjYXRlZ29yeTpcIixcbiAgICAgICAgICAgICBwcm9jZXNzOiAob2xkOiBzdHJpbmcsIHN0dWQ6IFN0dWRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWdleCA9IC8lY2F0ZWdvcnk6KC4qPyklL2c7XG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoZXMgPSBvbGQubWF0Y2gocmVnZXgpO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzID09IG51bGwpIHJldHVybiBvbGQ7XG4gICAgICAgICAgICAgICAgbWF0Y2hlcy5mb3JFYWNoKCAobWF0Y2gpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpZGVzID0gbWF0Y2guc3BsaXQoXCI6XCIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY25hbWUgPSBzaWRlc1sxXS5yZXBsYWNlKFwiJVwiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNhdCA9IGdyYWRlU2V0LmdldENhdGVnb3J5KHtuYW1lOiBjbmFtZX0pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWFya2Rvd24gPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2F0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtYXJrZG93biA9IFwiKiogXCIrY25hbWUrXCIgKipcXG5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYXQuc2NvcmVTZXQgIT09IHVuZGVmaW5lZCAmJiBjYXQuc2NvcmVTZXQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdC5zY29yZVNldC5mb3JFYWNoKCAoc2NvcmU6IFNjb3JlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtkb3duICs9IFwiPiAtICoqXCIrc2NvcmUubmFtZStcIioqOiBcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0dWRlbnRTY29yZSA9IHRoaXMuZ2V0KGNhdCwgc2NvcmUubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3R1ZGVudFNjb3JlID09ICd1bmRlZmluZWQnKSBzdHVkZW50U2NvcmUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZG93biArPSBcIlwiICsgc3R1ZGVudFNjb3JlICsgXCIgLyBcIiArIHNjb3JlLnZhbHVlICsgXCJcXG5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtkb3duICs9IFwiPiBOTyBTQ09SRVNcXG5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoY2F0ID09IG51bGwpIFxuICAgICAgICAgICAgICAgICAgICAgICAgb2xkID0gb2xkLnJlcGxhY2UoXCIlY2F0ZWdvcnk6XCIrc2lkZXNbMV0sIFwiRVJST1JcIik7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZCA9IG9sZC5yZXBsYWNlKFwiJWNhdGVnb3J5OlwiK3NpZGVzWzFdLCBtYXJrZG93bik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICByZXR1cm4gb2xkO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7cGF0dGVybjogXCIlc2NvcmVsaXN0JVwiLFxuICAgICAgICAgICAgICAgIHByb2Nlc3M6IChvbGQ6IHN0cmluZywgc3R1ZDogU3R1ZGVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ0aXRsZVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtwYXR0ZXJuOiBcIiVzY29yZTpcIixcbiAgICAgICAgICAgICAgICBwcm9jZXNzOiAob2xkOiBzdHJpbmcsIHN0dWQ6IFN0dWRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnZXggPSAvJXNjb3JlOiguKj8pJS9nO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWF0Y2hlcyA9IG9sZC5tYXRjaChyZWdleCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzID09IG51bGwpIHJldHVybiBvbGQ7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZXMuZm9yRWFjaCggKG1hdGNoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgIC8vIFdIQVQ/Pz8gXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtwYXR0ZXJuOiBcIiVmaW5hbHNjb3JlJVwiLFxuICAgICAgICAgICAgIHByb2Nlc3M6IChvbGQ6IHN0cmluZywgc3R1ZDogU3R1ZGVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBmaW5hbCA9IGdyYWRlU2V0LmZpbmFsU2NvcmUoc3R1ZCk7XG4gICAgICAgICAgICAgICAgbGV0IGdyYSA9IFV0aWxpdGllcy5maXhUb1BsYWNlcyhmaW5hbCk7XG4gICAgICAgICAgICAgICAgaWYgKCEgZ3JhZGVTZXQuYWxsQ2F0ZWdvcmllc0hhdmVTY29yZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICBncmEgKz0gXCIgKFwiICsgVXRpbGl0aWVzLmZpeFRvUGxhY2VzKGZpbmFsL2dyYWRlU2V0LndlaWdodFRvdGFsKCkpICsgXCIlKVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gb2xkLnJlcGxhY2UoXCIlZmluYWxzY29yZSVcIiwgZ3JhKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge3BhdHRlcm46IFwiJWltYWdlJVwiLFxuICAgICAgICAgICAgIHByb2Nlc3M6IChvbGQ6IHN0cmluZywgc3R1ZDogU3R1ZGVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBvbGQucmVwbGFjZShcIiVpbWFnZSVcIiwgc3R1ZC5kYXRhLmdldChcImltYWdlXCIpKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge3BhdHRlcm46IFwiJWRhdGUlXCIsXG4gICAgICAgICAgICAgcHJvY2VzczogKG9sZDogc3RyaW5nLCBzdHVkOiBTdHVkZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGR0ID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLXVzJywgeyB5ZWFyOlwibnVtZXJpY1wiLCBtb250aDpcInNob3J0XCIsIGRheTpcIm51bWVyaWNcIn0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBvbGQucmVwbGFjZShcIiVkYXRlJVwiLCBkdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG5cbiAgICAgICAgXVxuICAgIH1cblxuICAgIHByb2Nlc3MobWVzc2FnZTogc3RyaW5nLCBzdHVkZW50OiBTdHVkZW50KTogc3RyaW5nIHtcblxuICAgICAgICBpZiAobWVzc2FnZSA9PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xuXG4gICAgICAgIHRoaXMucHJvY2Vzc1BhdHRlcm5zLm1hcCggKHBhdHRlcm4pID0+IHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJDaGVja2luZyBcIitwYXR0ZXJuLnBhdHRlcm4pO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29udGFpbnMocGF0dGVybi5wYXR0ZXJuKSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBwYXR0ZXJuLnByb2Nlc3MobWVzc2FnZSwgc3R1ZGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiTWVzc2FnZSBpcyBub3cgXCIrbWVzc2FnZSk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH1cblxuXG5cbn0iLCIvKipcbiAqIGRyYXdkb3duLmpzXG4gKiAoYykgQWRhbSBMZWdnZXR0XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYWRhbXZsZWdnZXR0L2RyYXdkb3duXG4gKi9cblxuXG5leHBvcnQgZnVuY3Rpb24gbWFya2Rvd24oc3JjKSB7XG5cbiAgICB2YXIgcnhfbHQgPSAvPC9nO1xuICAgIHZhciByeF9ndCA9IC8+L2c7XG4gICAgdmFyIHJ4X3NwYWNlID0gL1xcdHxcXHJ8XFx1ZjhmZi9nO1xuICAgIHZhciByeF9lc2NhcGUgPSAvXFxcXChbXFxcXFxcfGAqX3t9XFxbXFxdKCkjK1xcLX5dKS9nO1xuICAgIHZhciByeF9ociA9IC9eKFsqXFwtPV9dICopezMsfSQvZ207XG4gICAgdmFyIHJ4X2Jsb2NrcXVvdGUgPSAvXFxuIComZ3Q7ICooW15dKj8pKD89KFxcbnwkKXsyfSkvZztcbiAgICB2YXIgcnhfbGlzdCA9IC9cXG4oICopKD86WypcXC0rXXwoKFxcZCspfChbYS16XSl8W0EtWl0pWy4pXSkgKyhbXl0qPykoPz0oXFxufCQpezJ9KS9nO1xuICAgIHZhciByeF9saXN0am9pbiA9IC88XFwvKG9sfHVsKT5cXG5cXG48XFwxPi9nO1xuICAgIHZhciByeF9oaWdobGlnaHQgPSAvKF58W15BLVphLXpcXGRcXFxcXSkoKFsqX10pfCh+KXwoXFxeKXwoLS0pfChcXCtcXCspfGApKFxcMj8pKFtePF0qPylcXDJcXDgoPyFcXDIpKD89XFxXfF98JCkvZztcbiAgICB2YXIgcnhfY29kZSA9IC9cXG4oKGBgYHx+fn4pLipcXG4/KFteXSo/KVxcbj9cXDJ8KCggICAgLio/XFxuKSspKS9nO1xuICAgIHZhciByeF9saW5rID0gLygoIT8pXFxbKC4qPylcXF1cXCgoLio/KSggXCIuKlwiKT9cXCl8XFxcXChbXFxcXGAqX3t9XFxbXFxdKCkjK1xcLS4hfl0pKS9nO1xuICAgIHZhciByeF90YWJsZSA9IC9cXG4oKCAqXFx8Lio/XFx8ICpcXG4pKykvZztcbiAgICB2YXIgcnhfdGhlYWQgPSAvXi4qXFxuKCAqXFx8KCAqXFw6Py0rXFw6Py0rXFw6PyAqXFx8KSogKlxcbnwpLztcbiAgICB2YXIgcnhfcm93ID0gLy4qXFxuL2c7XG4gICAgdmFyIHJ4X2NlbGwgPSAvXFx8fCguKj9bXlxcXFxdKVxcfC9nO1xuICAgIHZhciByeF9oZWFkaW5nID0gLyg/PV58PnxcXG4pKFs+XFxzXSo/KSgjezEsNn0pICguKj8pKCAjKik/ICooPz1cXG58JCkvZztcbiAgICB2YXIgcnhfcGFyYSA9IC8oPz1efD58XFxuKVxccypcXG4rKFtePF0rPylcXG4rXFxzKig/PVxcbnw8fCQpL2c7XG4gICAgdmFyIHJ4X3N0YXNoID0gLy1cXGQrXFx1ZjhmZi9nO1xuXG4gICAgZnVuY3Rpb24gcmVwbGFjZShyZXgsIGZuKSB7XG4gICAgICAgIHNyYyA9IHNyYy5yZXBsYWNlKHJleCwgZm4pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVsZW1lbnQodGFnLCBjb250ZW50KSB7XG4gICAgICAgIHJldHVybiAnPCcgKyB0YWcgKyAnPicgKyBjb250ZW50ICsgJzwvJyArIHRhZyArICc+JztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBibG9ja3F1b3RlKHNyYykge1xuICAgICAgICByZXR1cm4gc3JjLnJlcGxhY2UocnhfYmxvY2txdW90ZSwgZnVuY3Rpb24oYWxsLCBjb250ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudCgnYmxvY2txdW90ZScsIGJsb2NrcXVvdGUoaGlnaGxpZ2h0KGNvbnRlbnQucmVwbGFjZSgvXiAqJmd0OyAqL2dtLCAnJykpKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3Qoc3JjKSB7XG4gICAgICAgIHJldHVybiBzcmMucmVwbGFjZShyeF9saXN0LCBmdW5jdGlvbihhbGwsIGluZCwgb2wsIG51bSwgbG93LCBjb250ZW50KSB7XG4gICAgICAgICAgICB2YXIgZW50cnkgPSBlbGVtZW50KCdsaScsIGhpZ2hsaWdodChjb250ZW50LnNwbGl0KFxuICAgICAgICAgICAgICAgIFJlZ0V4cCgnXFxuID8nICsgaW5kICsgJyg/Oig/OlxcXFxkK3xbYS16QS1aXSlbLildfFsqXFxcXC0rXSkgKycsICdnJykpLm1hcChsaXN0KS5qb2luKCc8L2xpPjxsaT4nKSkpO1xuXG4gICAgICAgICAgICByZXR1cm4gJ1xcbicgKyAob2xcbiAgICAgICAgICAgICAgICA/ICc8b2wgc3RhcnQ9XCInICsgKG51bVxuICAgICAgICAgICAgICAgICAgICA/IG9sICsgJ1wiPidcbiAgICAgICAgICAgICAgICAgICAgOiBwYXJzZUludChvbCwzNikgLSA5ICsgJ1wiIHN0eWxlPVwibGlzdC1zdHlsZS10eXBlOicgKyAobG93ID8gJ2xvdycgOiAndXBwJykgKyAnZXItYWxwaGFcIj4nKSArIGVudHJ5ICsgJzwvb2w+J1xuICAgICAgICAgICAgICAgIDogZWxlbWVudCgndWwnLCBlbnRyeSkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoaWdobGlnaHQoc3JjKSB7XG4gICAgICAgIHJldHVybiBzcmMucmVwbGFjZShyeF9oaWdobGlnaHQsIGZ1bmN0aW9uKGFsbCwgXywgcDEsIGVtcCwgc3ViLCBzdXAsIHNtYWxsLCBiaWcsIHAyLCBjb250ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gXyArIGVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICBlbXAgPyAocDIgPyAnc3Ryb25nJyA6ICdlbScpXG4gICAgICAgICAgICAgICAgOiBzdWIgPyAocDIgPyAncycgOiAnc3ViJylcbiAgICAgICAgICAgICAgICA6IHN1cCA/ICdzdXAnXG4gICAgICAgICAgICAgICAgOiBzbWFsbCA/ICdzbWFsbCdcbiAgICAgICAgICAgICAgICA6IGJpZyA/ICdiaWcnXG4gICAgICAgICAgICAgICAgOiAnY29kZScsXG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0KGNvbnRlbnQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW5lc2Moc3RyKSB7XG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZShyeF9lc2NhcGUsICckMScpO1xuICAgIH1cblxuICAgIHZhciBzdGFzaCA9IFtdO1xuICAgIHZhciBzaSA9IDA7XG5cbiAgICBzcmMgPSAnXFxuJyArIHNyYyArICdcXG4nO1xuXG4gICAgcmVwbGFjZShyeF9sdCwgJyZsdDsnKTtcbiAgICByZXBsYWNlKHJ4X2d0LCAnJmd0OycpO1xuICAgIHJlcGxhY2Uocnhfc3BhY2UsICcgICcpO1xuXG4gICAgLy8gYmxvY2txdW90ZVxuICAgIHNyYyA9IGJsb2NrcXVvdGUoc3JjKTtcblxuICAgIC8vIGhvcml6b250YWwgcnVsZVxuICAgIHJlcGxhY2UocnhfaHIsICc8aHIvPicpO1xuXG4gICAgLy8gbGlzdFxuICAgIHNyYyA9IGxpc3Qoc3JjKTtcbiAgICByZXBsYWNlKHJ4X2xpc3Rqb2luLCAnJyk7XG5cbiAgICAvLyBjb2RlXG4gICAgcmVwbGFjZShyeF9jb2RlLCBmdW5jdGlvbihhbGwsIHAxLCBwMiwgcDMsIHA0KSB7XG4gICAgICAgIHN0YXNoWy0tc2ldID0gZWxlbWVudCgncHJlJywgZWxlbWVudCgnY29kZScsIHAzfHxwNC5yZXBsYWNlKC9eICAgIC9nbSwgJycpKSk7XG4gICAgICAgIHJldHVybiBzaSArICdcXHVmOGZmJztcbiAgICB9KTtcblxuICAgIC8vIGxpbmsgb3IgaW1hZ2VcbiAgICByZXBsYWNlKHJ4X2xpbmssIGZ1bmN0aW9uKGFsbCwgcDEsIHAyLCBwMywgcDQsIHA1LCBwNikge1xuICAgICAgICBzdGFzaFstLXNpXSA9IHA0XG4gICAgICAgICAgICA/IHAyXG4gICAgICAgICAgICAgICAgPyAnPGltZyBzcmM9XCInICsgcDQgKyAnXCIgYWx0PVwiJyArIHAzICsgJ1wiLz4nXG4gICAgICAgICAgICAgICAgOiAnPGEgaHJlZj1cIicgKyBwNCArICdcIj4nICsgdW5lc2MoaGlnaGxpZ2h0KHAzKSkgKyAnPC9hPidcbiAgICAgICAgICAgIDogcDY7XG4gICAgICAgIHJldHVybiBzaSArICdcXHVmOGZmJztcbiAgICB9KTtcblxuICAgIC8vIHRhYmxlXG4gICAgcmVwbGFjZShyeF90YWJsZSwgZnVuY3Rpb24oYWxsLCB0YWJsZSkge1xuICAgICAgICB2YXIgc2VwID0gdGFibGUubWF0Y2gocnhfdGhlYWQpWzFdO1xuICAgICAgICByZXR1cm4gJ1xcbicgKyBlbGVtZW50KCd0YWJsZScsXG4gICAgICAgICAgICB0YWJsZS5yZXBsYWNlKHJ4X3JvdywgZnVuY3Rpb24ocm93LCByaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByb3cgPT0gc2VwID8gJycgOiBlbGVtZW50KCd0cicsIHJvdy5yZXBsYWNlKHJ4X2NlbGwsIGZ1bmN0aW9uKGFsbCwgY2VsbCwgY2kpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNpID8gZWxlbWVudChzZXAgJiYgIXJpID8gJ3RoJyA6ICd0ZCcsIHVuZXNjKGhpZ2hsaWdodChjZWxsIHx8ICcnKSkpIDogJydcbiAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICB9KTtcblxuICAgIC8vIGhlYWRpbmdcbiAgICByZXBsYWNlKHJ4X2hlYWRpbmcsIGZ1bmN0aW9uKGFsbCwgXywgcDEsIHAyKSB7IHJldHVybiBfICsgZWxlbWVudCgnaCcgKyBwMS5sZW5ndGgsIHVuZXNjKGhpZ2hsaWdodChwMikpKSB9KTtcblxuICAgIC8vIHBhcmFncmFwaFxuICAgIHJlcGxhY2UocnhfcGFyYSwgZnVuY3Rpb24oYWxsLCBjb250ZW50KSB7IHJldHVybiBlbGVtZW50KCdwJywgdW5lc2MoaGlnaGxpZ2h0KGNvbnRlbnQpKSkgfSk7XG5cbiAgICAvLyBzdGFzaFxuICAgIHJlcGxhY2Uocnhfc3Rhc2gsIGZ1bmN0aW9uKGFsbCkgeyByZXR1cm4gc3Rhc2hbcGFyc2VJbnQoYWxsKV0gfSk7XG5cbiAgICByZXR1cm4gc3JjLnRyaW0oKTtcbn07XG4iLCJpbXBvcnQgJy4vdXRpbGl0aWVzL2NvZGVtaXJyb3InXHJcblxyXG5pbXBvcnQgeyBFZGl0b3IsIEl0ZW1WaWV3LCBNYXJrZG93blJlbmRlcmVyLCBNYXJrZG93blZpZXcsIE1lbnUsIFBsYXRmb3JtLCBURmlsZSwgVGV4dENvbXBvbmVudCwgVGV4dEZpbGVWaWV3LCBWaWV3U3RhdGUsIFdvcmtzcGFjZUxlYWYgfSBmcm9tIFwib2JzaWRpYW5cIjtcclxuXHJcbmltcG9ydCB7IEFsZXJ0IH0gZnJvbSBcInV0aWxpdGllcy9hbGVydFwiO1xyXG5pbXBvcnQgeyBDYXRlZ29yeSB9IGZyb20gXCJkYXRhL0NhdGVnb3J5XCI7XHJcbmltcG9ydCB7IENvdW50ZXIgfSBmcm9tIFwiZGF0YS9Db3VudGVyXCI7XHJcbmltcG9ydCB7IENvdW50ZXJUaWNrIH0gZnJvbSBcIm1vZGFscy9Db3VudGVyVGlja1wiO1xyXG5pbXBvcnQgeyBEaWFsb2cgfSBmcm9tICd1dGlsaXRpZXMvRGlhbG9nJztcclxuaW1wb3J0IHsgRW1haWxlciB9IGZyb20gXCJlbWFpbFwiO1xyXG5pbXBvcnQgeyBFbWFpbGVyTW9kYWwgfSBmcm9tIFwibW9kYWxzL0VtYWlsZXJNb2RhbFwiO1xyXG5pbXBvcnQgeyBHcmFkZVNldCB9IGZyb20gXCJkYXRhL0dyYWRlU2V0XCI7XHJcbmltcG9ydCBHcmFkZWJveFBsdWdpbiBmcm9tIFwibWFpblwiO1xyXG5pbXBvcnQge05vdGVNb2RhbH0gZnJvbSBcIm1vZGFscy9Ob3RlTW9kYWxcIjtcclxuaW1wb3J0IHsgU2NvcmUgfSBmcm9tIFwiZGF0YS9TY29yZVwiO1xyXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcImRhdGEvU3R1ZGVudFwiO1xyXG5pbXBvcnQgeyBUZW1wbGF0ZSB9IGZyb20gXCJ1dGlsaXRpZXMvVGVtcGxhdGVcIjtcclxuaW1wb3J0ICBVdGlsaXRpZXMgIGZyb20gXCJ1dGlsaXRpZXMvVXRpbGl0aWVzXCI7XHJcbmltcG9ydCB7IG1hcmtkb3duIH0gZnJvbSBcInV0aWxpdGllcy9kcmF3ZG93blwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IFZJRVdfVFlQRV9TVFVERU5UID0gXCJzdHVkZW50LXZpZXdcIjtcclxuZXhwb3J0IGNvbnN0IFBSRVZJRVdfTU9ERSA9IDI7XHJcbmV4cG9ydCBjb25zdCBFRElUSU5HX01PREUgPSAxO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0dWRlbnRWaWV3IGV4dGVuZHMgSXRlbVZpZXcge1xyXG5cclxuICBwbHVnaW46IEdyYWRlYm94UGx1Z2luO1xyXG4gIGdyYWRlU2V0UGF0aDogc3RyaW5nO1xyXG4gIGdyYWRlU2V0RmlsZTogVEZpbGU7XHJcbiAgZnJvbnRtYXR0ZXIgOiBzdHJpbmc7XHJcbiAgZ3JhZGVTZXREYXRhOiBzdHJpbmc7XHJcbiAgZ3JhZGVTZXQ6IEdyYWRlU2V0O1xyXG4gIHN0dWRlbnQ6IFN0dWRlbnQ7XHJcbiAgY29udGFpbmVyOiBFbGVtZW50O1xyXG5cclxuICBzdGF0dXNiYXJFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICBwcmV2aWV3RWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgZWRpdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gIHNhdmVFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgLy8gaW50ZXJuYWwgY29kZSBtaXJyb3IgaW5zdGFuY2VcclxuICBlZGl0b3I6IEVkaXRvcjtcclxuXHJcbiAgbW9kZTogbnVtYmVyO1xyXG4gIHN0dWRlbnREYXRhOiBzdHJpbmc7XHJcbiAgYmFja3VwRGF0YTogc3RyaW5nO1xyXG4gIGRhdGFDaGFuZ2VkOiBib29sZWFuO1xyXG5cclxuICB3aGF0aWZtb2RlOiBib29sZWFuO1xyXG5cclxuICAgIC8vIHRoaXMuY29udGVudEVsIGlzIG5vdCBleHBvc2VkLCBzbyBjaGVhdCBhIGJpdC5cclxuICAgIHB1YmxpYyBnZXQgZXh0Q29udGVudEVsKCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICByZXR1cm4gdGhpcy5jb250ZW50RWw7XHJcbiAgICB9ICBcclxuXHJcbiAgY29uc3RydWN0b3IobGVhZjogV29ya3NwYWNlTGVhZiwgcGx1Z2luOiBHcmFkZWJveFBsdWdpbiwgZ3JhZGVTZXQ6IEdyYWRlU2V0KSB7XHJcbiAgICBzdXBlcihsZWFmKTtcclxuXHJcbiAgICB0aGlzLm5hdmlnYXRpb24gPSB0cnVlO1xyXG4gICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XHJcbiAgICB0aGlzLmdyYWRlU2V0ID0gZ3JhZGVTZXQ7XHJcbiAgICAgIFxyXG4gICAgdGhpcy5tb2RlID0gRURJVElOR19NT0RFO1xyXG4gICAgdGhpcy5kYXRhQ2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy53aGF0aWZtb2RlID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBnZXRWaWV3VHlwZSgpIHtcclxuICAgIHJldHVybiBWSUVXX1RZUEVfU1RVREVOVDtcclxuICB9XHJcblxyXG4gIGdldERpc3BsYXlUZXh0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc3R1ZGVudD09dW5kZWZpbmVkP1wiXCI6dGhpcy5zdHVkZW50LmRhdGEuZ2V0KFwibmFtZVwiKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIG9uT3BlbigpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiU3R1ZGVudFZpZXcgb25PcGVuXCIpO1xyXG4gICAgdGhpcy5ncmFkZVNldCA9IHRoaXMucGx1Z2luLmdyYWRlU2V0O1xyXG4gICAgdGhpcy5zdHVkZW50ID0gdGhpcy5wbHVnaW4uY3VycmVudFN0dWRlbnQ7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLnN0dWRlbnQubm90ZURhdGEpO1xyXG4gICAgdGhpcy5zdHVkZW50RGF0YSA9IHRoaXMuc3R1ZGVudC5ub3RlRGF0YTsgLy9hd2FpdCB0aGlzLmFwcC52YXVsdC5yZWFkKHRoaXMuc3R1ZGVudC5zb3VyY2VGaWxlKTtcclxuICAgIGNvbnNvbGUubG9nKFwiU3R1ZGVudFZpZXcgZGF0YTogXCIrdGhpcy5zdHVkZW50RGF0YSk7XHJcblxyXG4gICAgdGhpcy5wcmV2aWV3RWxlbWVudCA9IHRoaXMuYWRkQWN0aW9uKFwibHVjaWRlLWJvb2stb3BlblwiLCBcInByZXZpZXdcIiwgKCkgPT4ge1xyXG4gICAgICB0aGlzLnNldFByZXZpZXdNb2RlKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuZWRpdEVsZW1lbnQgPSB0aGlzLmFkZEFjdGlvbihcImx1Y2lkZS1lZGl0LTNcIiwgXCJlZGl0XCIsICgpID0+IHtcclxuICAgICAgdGhpcy5zZXRFZGl0aW5nTW9kZSgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmFkZEFjdGlvbihcImZpbGUtdGV4dFwiLCBcImFkZCBub3RlXCIsICgpID0+IHtcclxuICAgICAgbmV3IE5vdGVNb2RhbCh0aGlzLmFwcCwgdGhpcy5zdHVkZW50Lm5vdGVzLCAobm90ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zdHVkZW50LnNldE5vdGVzKG5vdGUpO1xyXG4gICAgICAgIHRoaXMuc3R1ZGVudERhdGEgPSB0aGlzLnN0dWRlbnREYXRhLnJlcGxhY2UoLyNub3RlLiovZywgXCJcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zdHVkZW50RGF0YSk7XHJcbiAgICAgICAgdmFyIG5vdGVzQXJyYXkgPSBub3RlLnNwbGl0KFwiXFxuXCIpO1xyXG4gICAgICAgIG5vdGVzQXJyYXkuZm9yRWFjaCggKG50ZSkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuc3R1ZGVudERhdGEgKz0gXCIjbm90ZSBcIitudGUrXCJcXG5cIjtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL3RoaXMuc3R1ZGVudERhdGEgKz0gXCIjbm90ZSBcIitub3RlK1wiXFxuXCI7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zdHVkZW50RGF0YSk7XHJcbiAgICAgICAgdGhpcy5wbHVnaW4uZ3JhZGVTZXQubW9kaWZpZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZGF0YUNoYW5nZWQgPSB0cnVlOyAgXHJcbiAgICAgICAgdGhpcy5yZWRpc3BsYXkoKTtcclxuICAgICAgfSkub3BlbigpO1xyXG4gICAgfSk7XHJcbiAgICBpZiAobmV3IEVtYWlsZXIoKS5lbWFpbFdvcmtzKSB7XHJcbiAgICB0aGlzLmFkZEFjdGlvbihcImx1Y2lkZS1tYWlsXCIsIFwiZW1haWxcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5zdHVkZW50LmRhdGEuZ2V0KFwiZW1haWxhZGRyZXNzXCIpID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG5ldyBBbGVydCh0aGlzLnBsdWdpbiwgXCJObyBBZGRyZXNzXCIsIFwiVGhlcmUgaXMgbm8gZW1haWwgYWRkcmVzcyBkZWZpbmVkIGZvciB0aGlzIHN0dWRlbnQuXCIpLm9wZW4oKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGZpZWxkcyA9IHRoaXMucGx1Z2luLnNldHRpbmdzO1xyXG4gICAgICAgIGZpZWxkcy5kZWZhdWx0dG8gPSB0aGlzLnN0dWRlbnQuZGF0YS5nZXQoXCJlbWFpbGFkZHJlc3NcIik7XHJcbiAgICAgICAgbmV3IEVtYWlsZXJNb2RhbCh0aGlzLmFwcCwgZmllbGRzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKG1lc3NhZ2U6IHN0cmluZywgZnJvbTogc3RyaW5nLCBhZGRyZXNzOiBzdHJpbmcsIHN1YmplY3Q6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRW1haWxlcigpLnNlbmRtYWlsKHRoaXMuc3R1ZGVudC5kYXRhLmdldChcImVtYWlsYWRkcmVzc1wiKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20sIHN1YmplY3QsIG1lc3NhZ2UsIHRoaXMucGx1Z2luLnNldHRpbmdzLCBjb25zb2xlLmxvZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICApLm9wZW4oKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gICAgaWYgKHRoaXMuZ3JhZGVTZXQuY291bnRlcnMubGVuZ3RoID4gMCkgXHJcbiAgICAgIHRoaXMuYWRkQWN0aW9uKFwibHVjaWRlLWNhbGN1bGF0b3JcIiwgXCJjb3VudGVyc1wiLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ3JhZGVTZXQuY291bnRlcnMubGVuZ3RoPT0wKSB7XHJcbiAgICAgICAgICBuZXcgQWxlcnQodGhpcy5wbHVnaW4sIFwiTm8gQ291bnRlcnNcIiwgXCJUaGVyZSBhcmUgbm8gY291bnRlcnMgZGVmaW5lZCBpbiB0aGlzIGdyYWRlIHNldC5cIikub3BlbigpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuZXcgQ291bnRlclRpY2sodGhpcy5wbHVnaW4uYXBwLCB0aGlzLnN0dWRlbnQsIChjb3VudGVyOiBDb3VudGVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3R1ZGVudC51cGRhdGVDb3VudGVyKGNvdW50ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmdyYWRlU2V0Lm1vZGlmaWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5yZWRpc3BsYXkoKTtcclxuICAgICAgICAgIH0pLm9wZW4oKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgdGhpcy5hZGRBY3Rpb24oXCJsdWNpZGUtYmVkXCIsIFwibmV3IGFic2VuY2VcIiwgKCkgPT4ge1xyXG4gICAgICB2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICB2YXIgZGQgPSB0b2RheS5nZXREYXRlKCk7XHJcbiAgICAgIHZhciBtbSA9IHRvZGF5LmdldE1vbnRoKCkrMTsgXHJcbiAgICAgIHZhciB5eXl5ID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgXHJcbiAgICAgIHRoaXMuc3R1ZGVudC5hZGRBYnNlbmNlKHRvZGF5KTtcclxuICAgICAgdGhpcy5wbHVnaW4uZ3JhZGVTZXQubW9kaWZpZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLmRhdGFDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5yZWRpc3BsYXkoKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICB0aGlzLm1vZGUgPSBFRElUSU5HX01PREU7ICAvLyBmb3JjZSB2aWV3IHRvIGdlbmVyYXRlIHByZXZpZXcgZmlyc3RcclxuICAgIHRoaXMuZGF0YUNoYW5nZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuc2V0UHJldmlld01vZGUoKTtcclxuICB9XHJcblxyXG4gIG9uUGFuZU1lbnUobWVudTogTWVudSwgc291cmNlOiBzdHJpbmcsIGNhbGxTdXBlcjogYm9vbGVhbiA9IHRydWUpIHtcclxuXHRcdGlmIChzb3VyY2UgIT09ICdtb3JlLW9wdGlvbnMnKSB7XHJcblx0XHQgIHN1cGVyLm9uUGFuZU1lbnUobWVudSwgc291cmNlKTtcclxuXHRcdCAgcmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEFkZCBhIG1lbnUgaXRlbSB0byBmb3JjZSB0aGUgYm9hcmQgdG8gbWFya2Rvd24gdmlld1xyXG4gICAgaWYgKG5ldyBFbWFpbGVyKCkuZW1haWxXb3Jrcykge1xyXG4gICAgICBtZW51XHJcbiAgICAuYWRkSXRlbSgoaXRlbSkgPT4ge1xyXG4gICAgaXRlbVxyXG4gICAgICAuc2V0VGl0bGUoJ0VtYWlsIHN0dWRlbnQgc2NvcmVzJylcclxuICAgICAgLnNldEljb24oJ2x1Y2lkZS1maWxlLXRleHQnKVxyXG4gICAgICAuc2V0U2VjdGlvbigncGFuZScpXHJcbiAgICAgIC5vbkNsaWNrKCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAvLyAvLyBIZXJlIHdlIGVtYWlsIHRoZSBzdHVkZW50IG5vdGVcclxuICAgICAgICAgIC8vICAgbGV0IGVtYWlsID0gbmV3IEVtYWlsZXIoKTtcclxuICAgICAgICAgIC8vICAgbGV0IHN0dWRlbnROb3RlID0gdGhpcy5zdHVkZW50LmdlbmVyYXRlTWFya2Rvd24odGhpcy5ncmFkZVNldCk7XHJcbiAgICAgICAgICAvLyAgIGxldCBlbWFpbERpdiA9IHRoaXMuY29udGFpbmVyLmNyZWF0ZURpdigpO1xyXG4gICAgICAgICAgLy8gICBNYXJrZG93blJlbmRlcmVyLnJlbmRlck1hcmtkb3duKHN0dWRlbnROb3RlLCBlbWFpbERpdiwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAvLyAgIGxldCBodG1sID0gZW1haWxEaXYuaW5uZXJIVE1MO1xyXG4gICAgICAgICAgLy8gICBlbWFpbC5zZXRNZXNzYWdlSFRNTChodG1sKTsgXHJcbiAgICAgICAgICAvLyAgIGVtYWlsRGl2LmVtcHR5KCk7IGVtYWlsRGl2LmRldGFjaCgpO1xyXG4gICAgICAgICAgLy8gICBsZXQgc3ViamVjdCA9IFwiU2NvcmVzIGluIFwiK3RoaXMuZ3JhZGVTZXQudGl0bGUrXCIgYXMgb2YgXCIrRGF0ZSgpOyAgICAgICAgICAgXHJcbiAgICAgICAgICAvLyAgIGVtYWlsLnNlbmRtYWlsKHRoaXMuc3R1ZGVudC5kYXRhLmdldChcImVtYWlsYWRkcmVzc1wiKSwgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZnJvbSwgc3ViamVjdCwgXCJcIiwgdGhpcy5wbHVnaW4uc2V0dGluZ3MsIGNvbnNvbGUubG9nKTtcclxuICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IHRoaXMucGx1Z2luLnNldHRpbmdzLnRlbXBsYXRlO1xyXG4gICAgICAgICAgaWYgKHRlbXBsYXRlICE9PSB1bmRlZmluZWQgJiYgdGVtcGxhdGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gdGVtcGxhdGUuaW5kZXhPZih0aGlzLmFwcC52YXVsdC5hZGFwdGVyLmJhc2VQYXRoKTtcclxuICAgICAgICAgICAgaWYgKHBvcyA+PSAwKSB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UodGhpcy5hcHAudmF1bHQuYWRhcHRlci5iYXNlUGF0aCtcIlxcXFxcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZSgvXFxcXC9nLCBcIi9cIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRlbXBsYXRlKTtcclxuICAgICAgICAgICAgbGV0IHRmaWxlID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKHRlbXBsYXRlKSBhcyBURmlsZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGZpbGUpO1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA9ICBhd2FpdCBhcHAudmF1bHQucmVhZCggdGZpbGUgKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlID0gXCJcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIC8vIEhlcmUgd2UgZW1haWwgdGhlIHN0dWRlbnQgbm90ZVxyXG4gICAgICAgICAgICBsZXQgZW1haWwgPSBuZXcgRW1haWxlcigpO1xyXG4gICAgICAgICAgICBsZXQgc3R1ZGVudE5vdGUgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZiAodGVtcGxhdGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgIHN0dWRlbnROb3RlID0gKG5ldyBUZW1wbGF0ZSh0aGlzLmdyYWRlU2V0KSkucHJvY2Vzcyh0ZW1wbGF0ZSwgdGhpcy5zdHVkZW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBzdHVkZW50Tm90ZSA9IHRoaXMuc3R1ZGVudC5nZW5lcmF0ZU1hcmtkb3duKHRoaXMuZ3JhZGVTZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0dWRlbnROb3RlKTtcclxuICAgICAgICAgICAgbGV0IGh0bWwgPSBtYXJrZG93bihzdHVkZW50Tm90ZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGh0bWwpO1xyXG4gICAgICAgICAgICBlbWFpbC5zZXRNZXNzYWdlSFRNTChodG1sKTsgXHJcbiAgICAgICAgICAgIGxldCBkdCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi11cycsIHsgeWVhcjpcIm51bWVyaWNcIiwgbW9udGg6XCJzaG9ydFwiLCBkYXk6XCJudW1lcmljXCJ9KTtcclxuICAgICAgICAgICAgbGV0IHN1YmplY3QgPSBcIllvdXIgc2NvcmVzIGluIFwiK3RoaXMuZ3JhZGVTZXQucHJvcGVydGllcy5nZXQoXCJ0aXRsZVwiKStcIiBhcyBvZiBcIitkdDsgICAgICAgICAgIFxyXG4gICAgICAgICAgICBlbWFpbC5zZW5kbWFpbCh0aGlzLnN0dWRlbnQuZGF0YS5nZXQoXCJlbWFpbGFkZHJlc3NcIiksIHRoaXMucGx1Z2luLnNldHRpbmdzLmZyb20sIHN1YmplY3QsIFwiXCIsIHRoaXMucGx1Z2luLnNldHRpbmdzLCBjb25zb2xlLmxvZyk7XHJcbiAgICAgICAgICBcclxuICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAgIG1lbnVcclxuICAgIC5hZGRJdGVtKChpdGVtKSA9PiB7XHJcbiAgICBpdGVtXHJcbiAgICAgIC5zZXRUaXRsZSgnRGVsZXRlIHN0dWRlbnQnKVxyXG4gICAgICAuc2V0SWNvbignZmlsZS14JylcclxuICAgICAgLnNldFNlY3Rpb24oJ3BhbmUnKVxyXG4gICAgICAub25DbGljayggKCkgPT4ge1xyXG4gICAgICAgICAgbmV3IERpYWxvZyh0aGlzLnBsdWdpbiwgXCJEZWxldGUgU3R1ZGVudFwiLCBcIlR5cGUgREVMRVRFIGlmIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIHN0dWRlbnQuXCIsIFwiRGVsZXRlXCIsIFwiQ2FuY2VsXCIsIChzdHI6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3RyID09IFwiREVMRVRFXCIpIHtcclxuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5ncmFkZVNldC5kZWxldGVTdHVkZW50KHRoaXMuc3R1ZGVudCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uZ3JhZGVTZXQubW9kaWZpZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIC8vIGNoYW5nZSB0aGUgZmlsZSBuYW1lXHJcbiAgICAgICAgICAgICAgbGV0IG5ld05hbWUgPSB0aGlzLnN0dWRlbnQuc291cmNlRmlsZS5wYXRoLnJlcGxhY2UoXCIubWRcIiwgXCIuZGVsXCIpO1xyXG4gICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5hcHAudmF1bHQucmVuYW1lKHRoaXMuc3R1ZGVudC5zb3VyY2VGaWxlLCBuZXdOYW1lKTtcclxuICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmlsZSA9IG5ldyBURmlsZSgpO1xyXG4gICAgICAgICAgICAgICAgZmlsZS5wYXRoID0gbmV3TmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLmFwcC52YXVsdC5kZWxldGUoZmlsZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5hcHAudmF1bHQucmVuYW1lKHRoaXMuc3R1ZGVudC5zb3VyY2VGaWxlLCBuZXdOYW1lKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgLy9jbG9zZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KS5vcGVuKCk7XHJcbiAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIG1lbnVcclxuICAgIC5hZGRJdGVtKChpdGVtKSA9PiB7XHJcbiAgICBpdGVtXHJcbiAgICAgIC5zZXRUaXRsZSgnV2hhdCBpZiBtb2RlJylcclxuICAgICAgLnNldEljb24oJ3NoaWVsZC1xdWVzdGlvbicpXHJcbiAgICAgIC5zZXRTZWN0aW9uKCdwYW5lJylcclxuICAgICAgLm9uQ2xpY2soICgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIldoYXQgaWYgbW9kZS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcclxuICAgICAgICB0aGlzLndoYXRpZm1vZGUgPSAhdGhpcy53aGF0aWZtb2RlO1xyXG4gICAgICAgIGlmICh0aGlzLndoYXRpZm1vZGUpIHtcclxuICAgICAgICAgIHRoaXMuYmFja3VwRGF0YSA9IHRoaXMuc3R1ZGVudERhdGE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc3R1ZGVudERhdGEgPSB0aGlzLmJhY2t1cERhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVkaXNwbGF5KCk7IFxyXG4gICAgICB9KTtcclxuICAgIH0pOyAgICAgICAgICAgICAgXHJcblxyXG4gICAgLy8gQWRkIGEgXCJDbG9zZVwiIGlmIHdlIGFyZSBvbiBhIG1vYmlsZSBkZXZpY2VcclxuICAgIGlmIChQbGF0Zm9ybS5pc01vYmlsZSkge1xyXG4gICAgICBtZW51XHJcbiAgICAgICAgLmFkZEl0ZW0oKGl0ZW0pID0+IHtcclxuICAgICAgICAgIGl0ZW1cclxuICAgICAgICAgICAgLnNldFRpdGxlKCdDbG9zZScpXHJcbiAgICAgICAgICAgIC5zZXRJY29uKCdjcm9zcycpXHJcbiAgICAgICAgICAgIC5vbkNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVkaXNwbGF5KCkge1xyXG4gICAgaWYgKHRoaXMubW9kZSA9PSBQUkVWSUVXX01PREUpIHtcclxuICAgICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmNvbnRhaW5lckVsLmNoaWxkcmVuWzFdO1xyXG4gICAgICB0aGlzLmNvbnRhaW5lci5lbXB0eSgpO1xyXG4gICAgICBjb25zdCBkaXYgPSB0aGlzLmNvbnRhaW5lci5jcmVhdGVFbChcImRpdlwiLCB7IGNsczogXCJ2aWV3LXN0eWxlXCIgfSk7XHJcbiAgICAgIGxldCBzdHVkZW50Tm90ZSA9IHRoaXMuc3R1ZGVudC5nZW5lcmF0ZU1hcmtkb3duKHRoaXMuZ3JhZGVTZXQpO1xyXG4gICAgICBpZiAodGhpcy53aGF0aWZtb2RlKSBzdHVkZW50Tm90ZSA9IFwiIyBXaGF0IGlmIG1vZGUgaXMgb25cXG5cIiArIHN0dWRlbnROb3RlO1xyXG4gICAgICBsZXQgbWFya2Rvd24gPSBNYXJrZG93blJlbmRlcmVyLnJlbmRlcih0aGlzLmFwcCwgc3R1ZGVudE5vdGUsIGRpdiwgbnVsbCwgbnVsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvL3RoaXMuY29kZU1pcnJvci5zZXRWYWx1ZSh0aGlzLnN0dWRlbnREYXRhKTtcclxuICAgIH0gIFxyXG4gIH1cclxuXHJcbiAgc2V0UHJldmlld01vZGUoKSB7XHJcbiAgICBpZiAodGhpcy5tb2RlID09IFBSRVZJRVdfTU9ERSkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMubW9kZSA9IFBSRVZJRVdfTU9ERTtcclxuXHJcbiAgICAvL3RoaXMuc3R1ZGVudERhdGEgPSB0aGlzLmNvZGVNaXJyb3IuZ2V0VmFsdWUoKTtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5zdHVkZW50ID09ICd1bmRlZmluZWQnKSB0aGlzLnN0dWRlbnQgPSBuZXcgU3R1ZGVudChudWxsKTtcclxuICAgIC8vdGhpcy5zdHVkZW50LmNvbmZpZ3VyZUZyb21EYXRhKHRoaXMuc3R1ZGVudERhdGEpO1xyXG5cclxuICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy5jb250YWluZXJFbC5jaGlsZHJlblsxXTtcclxuICAgIHRoaXMuY29udGFpbmVyLmVtcHR5KCk7XHJcbiAgICBjb25zdCBkaXYgPSB0aGlzLmNvbnRhaW5lci5jcmVhdGVFbChcImRpdlwiLCB7IGNsczogXCJ2aWV3LXN0eWxlXCIgfSk7XHJcbiAgICBsZXQgc3R1ZGVudE5vdGUgPSB0aGlzLnN0dWRlbnQuZ2VuZXJhdGVNYXJrZG93bih0aGlzLmdyYWRlU2V0KTtcclxuICAgIGlmICh0aGlzLndoYXRpZm1vZGUpIHN0dWRlbnROb3RlID0gXCIjIFdoYXQgaWYgbW9kZSBpcyBvblxcblwiICsgc3R1ZGVudE5vdGU7XHJcbiAgICBjb25zb2xlLmxvZyhzdHVkZW50Tm90ZSk7XHJcbiAgICBsZXQgbWFya2Rvd24gPSBNYXJrZG93blJlbmRlcmVyLnJlbmRlcih0aGlzLmFwcCwgc3R1ZGVudE5vdGUsIGRpdiwgbnVsbCwgbnVsbCk7XHJcblxyXG4gICAgdGhpcy5lZGl0RWxlbWVudC5zaG93KCk7XHJcbiAgICB0aGlzLnByZXZpZXdFbGVtZW50LmhpZGUoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHNldEVkaXRpbmdNb2RlKCkge1xyXG4gICAgaWYgKHRoaXMubW9kZSA9PSBFRElUSU5HX01PREUpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLm1vZGUgPSBFRElUSU5HX01PREU7XHJcblxyXG4gICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmNvbnRhaW5lckVsLmNoaWxkcmVuWzFdO1xyXG4gICAgdGhpcy5jb250YWluZXIuZW1wdHkoKTtcclxuXHJcbiAgICBpZiAodGhpcy53aGF0aWZtb2RlKSB0aGlzLmNvbnRhaW5lci5jcmVhdGVFbChcImgxXCIsIHsgdGV4dDogXCJXaGF0IGlmIG1vZGUgaXMgb25cIiB9KTtcclxuICAgIHRoaXMuc3R1ZGVudC5nZW5lcmF0ZUVkaXRIVE1MKHRoaXMuY29udGFpbmVyLCB0aGlzLmdyYWRlU2V0KTtcclxuXHJcbiAgICAvL3RoaXMuc2V0Vmlld0RhdGEodGhpcy5zdHVkZW50RGF0YSwgdHJ1ZSk7XHJcbiAgICB0aGlzLnBsdWdpbi5ncmFkZVNldC5tb2RpZmllZCA9ICEgdGhpcy53aGF0aWZtb2RlO1xyXG4gICAgdGhpcy5kYXRhQ2hhbmdlZCA9ICEgdGhpcy53aGF0aWZtb2RlO1xyXG5cclxuICAgIHRoaXMuZWRpdEVsZW1lbnQuaGlkZSgpO1xyXG4gICAgdGhpcy5wcmV2aWV3RWxlbWVudC5zaG93KCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBvbkNsb3NlKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJTdHVkZW50VmlldyBDbG9zaW5nXCIpO1xyXG4gICAgY29uc29sZS5sb2codGhpcy53aGF0aWZtb2RlKTtcclxuICAgIGlmICh0aGlzLndoYXRpZm1vZGUpIHtcclxuICAgICAgdGhpcy5zdHVkZW50RGF0YSA9IHRoaXMuYmFja3VwRGF0YTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhQ2hhbmdlZCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1vZGUgPT0gRURJVElOR19NT0RFKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlN0dWRlbnRWaWV3IERhdGEgQ2hhbmdlZFwiKTtcclxuICAgICAgICAgIC8vdGhpcy5zdHVkZW50RGF0YSA9IHRoaXMuZ2V0Vmlld0RhdGEoKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3R1ZGVudERhdGEpO1xyXG4gICAgICAgICAgLy90aGlzLnN0dWRlbnQuY29uZmlndXJlRnJvbURhdGEodGhpcy5zdHVkZW50RGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ3JhZGVTZXQud3JpdGVHcmFkZVNldCgpO1xyXG4gICAgICB9XHJcbiAgXHJcbiAgICB0aGlzLmFwcC53b3Jrc3BhY2UuZGV0YWNoTGVhdmVzT2ZUeXBlKFZJRVdfVFlQRV9TVFVERU5UKTtcclxuICAgIHRoaXMucGx1Z2luLmdyYWRlQm94Vmlldy5kaXNwbGF5KClcclxuICB9XHJcblxyXG4gIHNldFZpZXdTdGF0ZSh2aWV3c3RhdGU6IFZpZXdTdGF0ZSwgZGF0YT86IGFueSkge1xyXG4gICAgY29uc29sZS5sb2coXCJTVFVERU5UVklFVyBTZXRWaWV3c3RhdGVcIik7XHJcbiAgICBjb25zb2xlLmxvZyh2aWV3c3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgICAvLyB3aGVuIHRoZSB2aWV3IGlzIHJlc2l6ZWQsIHJlZnJlc2ggQ29kZU1pcnJvciAodGhhbmtzIExpY2F0ISlcclxuICAgIG9uUmVzaXplKCkge1xyXG4gICAgfVxyXG4gIFxyXG4gICAgLy8gY2FsbGVkIG9uIGNvZGUgbWlycm9yIGNoYW5nZXNcclxuICAgIGNoYW5nZWQoaW5zdGFuY2U6IENvZGVNaXJyb3IuRWRpdG9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiREFUQSBDSEFOR0VEXCIpO1xyXG4gICAgICB0aGlzLmRhdGFDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5zdHVkZW50RGF0YSA9IHRoaXMuZ2V0Vmlld0RhdGEoKTtcclxuICAgIH1cclxuICBcclxuICAgIC8vIGdldCB0aGUgbmV3IGZpbGUgY29udGVudHNcclxuICAgIGdldFZpZXdEYXRhID0gKCkgPT4ge1xyXG4gICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzZXQgdGhlIGZpbGUgY29udGVudHNcclxuICAgIHNldFZpZXdEYXRhID0gKGRhdGE6IHN0cmluZywgY2xlYXI6IGJvb2xlYW4pID0+IHtcclxuICAgICAgY29uc29sZS5sb2coXCJTRVRWSUVXREFUQSwgY2xlYXI6IFwiK2NsZWFyKTtcclxuICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBjbGVhciB0aGUgdmlldyBjb250ZW50XHJcbiAgICBjbGVhciA9ICgpID0+IHtcclxuICAgIH1cclxuXHJcblxyXG4gIFxyXG4gIFxyXG59IiwiaW1wb3J0IHsgQXBwLCBEcm9wZG93bkNvbXBvbmVudCwgTW9kYWwsIFNldHRpbmcsIFRGaWxlLCBUZXh0RmlsZVZpZXcsIFRvZ2dsZUNvbXBvbmVudCwgV29ya3NwYWNlTGVhZiB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5pbXBvcnQgeyBDYXRlZ29yeSB9IGZyb20gXCJkYXRhL0NhdGVnb3J5XCI7XG5pbXBvcnQgeyBHcmFkZVNldCB9IGZyb20gXCJkYXRhL0dyYWRlU2V0XCI7XG5pbXBvcnQgeyBTY29yZSB9IGZyb20gXCJkYXRhL1Njb3JlXCI7XG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcImRhdGEvU3R1ZGVudFwiO1xuXG5leHBvcnQgY2xhc3MgQWRkQWJzZW5jZU1vZGFsIGV4dGVuZHMgTW9kYWwge1xuXG4gICAgY2FsbGJhY2tPbkNsb3NlO1xuICAgIGdyYWRlU2V0OiBHcmFkZVNldDtcbiAgICBhYnNlbmNlczogRGF0ZVtdO1xuICAgIGZpZWxkczogVG9nZ2xlQ29tcG9uZW50W107XG4gICAgcHJlc2VudDogVG9nZ2xlQ29tcG9uZW50O1xuXG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHAsIGdyYWRlU2V0OiBHcmFkZVNldCwgY2FsbGJhY2tPbkNsb3NlOiAoYWJzZW5jZXM6IERhdGVbXSkgPT4gdm9pZCkge1xuXHRcdHN1cGVyKGFwcCk7XG5cdFx0dGhpcy5ncmFkZVNldCA9IGdyYWRlU2V0O1xuICAgICAgICB0aGlzLmNhbGxiYWNrT25DbG9zZSA9IGNhbGxiYWNrT25DbG9zZTtcblxuICAgICAgICB0aGlzLmFic2VuY2VzID0gW107XG4gICAgICAgIHRoaXMuZmllbGRzID0gW107XG5cdH1cblxuXHRvbk9wZW4oKSB7XG5cdFx0bGV0IHtjb250ZW50RWx9ID0gdGhpcztcblx0XHRcblx0XHRjb250ZW50RWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6ICdOZXcgQWJzZW5jZScgfSk7XG4gICAgICAgIGxldCBwcmVzZW50U2V0dGluZyA9IG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiQ291bnQgcHJlc2VudFwiKVxuICAgICAgICAgICAgLmFkZFRvZ2dsZSggKHRvZ2dsZSkgPT4ge1xuICAgICAgICAgICAgICB0b2dnbGVcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUoZmFsc2UpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWVsZHMuZm9yRWFjaCggKHRvZ2dsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlLnNldFZhbHVlKCF0b2dnbGUuZ2V0VmFsdWUoKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMucHJlc2VudCA9IHRvZ2dsZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHByZXNlbnRTZXR0aW5nLm5hbWVFbC5zdHlsZS5mb250V2VpZ2h0ID0gXCJib2xkXCI7XG4gICAgICAgIHByZXNlbnRTZXR0aW5nLm5hbWVFbC5zdHlsZS5mb250U3R5bGUgPSBcIml0YWxpY1wiO1xuXG4gICAgICAgIHRoaXMuZ3JhZGVTZXQuc3R1ZGVudHMuZm9yRWFjaCggKHN0dWQ6IFN0dWRlbnQpID0+IHtcbiAgICAgICAgICAgIGxldCBkb2NmcmFnbWVudCA9IChzdHVkLmRhdGEuZ2V0KFwiaW1hZ2VcIikgIT09IHVuZGVmaW5lZCkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIjxpbWcgc3JjPVwiK3N0dWQuZGF0YS5nZXQoXCJpbWFnZVwiKStcIiB3aWR0aD00MD4gXCIrc3R1ZC5kYXRhLmdldChcIm5hbWVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHN0dWQuZGF0YS5nZXQoXCJuYW1lXCIpO1xuXHRcdFx0bGV0IHNldHRpbmcgPSBuZXcgU2V0dGluZyhjb250ZW50RWwpXG5cdFx0XHQuc2V0TmFtZShcIk5BTUVcIilcblx0XHRcdC5hZGRUb2dnbGUoICh0b2dnbGUpID0+IHtcblx0XHRcdCAgXHR0b2dnbGVcblx0XHRcdCAgXHRcdC5zZXRWYWx1ZShmYWxzZSlcblx0XHRcdFx0XHQub25DaGFuZ2UoICh2YWx1ZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXHRcdFx0XHR0aGlzLmZpZWxkcy5wdXNoKHRvZ2dsZSk7XG5cdFx0XHR9XG5cdFx0XHQpO1xuICAgICAgICAgICAgc2V0dGluZy5uYW1lRWwuaW5uZXJIVE1MID0gZG9jZnJhZ21lbnQ7XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBuZXcgU2V0dGluZyhjb250ZW50RWwpXG4gICAgICAgIC5hZGRCdXR0b24oKGJ0bikgPT5cbiAgICAgICAgICAgIGJ0blxuICAgICAgICAgICAgLnNldEJ1dHRvblRleHQoXCJPS1wiKVxuICAgICAgICAgICAgLnNldEN0YSgpXG4gICAgICAgICAgICAub25DbGljaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZpZWxkcy5mb3JFYWNoKCAodG9nZ2xlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByZXNlbnQuZ2V0VmFsdWUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRvZ2dsZS5nZXRWYWx1ZSgpKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFic2VuY2VzLnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFic2VuY2VzLnB1c2gobm93KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2dnbGUuZ2V0VmFsdWUoKSkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hYnNlbmNlcy5wdXNoKG5vdyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hYnNlbmNlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrT25DbG9zZSh0aGlzLmFic2VuY2VzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICkpO1xuXG4gICAgfVxuXG59IiwiaW1wb3J0IHsgQXBwLCBEcm9wZG93bkNvbXBvbmVudCwgTW9kYWwsIFNldHRpbmcsIFRGaWxlLCBUZXh0Q29tcG9uZW50LCBUZXh0RmlsZVZpZXcsIFdvcmtzcGFjZUxlYWYgfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tIFwiZGF0YS9DYXRlZ29yeVwiO1xuaW1wb3J0IHsgR3JhZGVTZXQgfSBmcm9tIFwiZGF0YS9HcmFkZVNldFwiO1xuaW1wb3J0IEdyYWRlYm94UGx1Z2luIGZyb20gXCJtYWluXCI7XG5pbXBvcnQgeyBTY29yZSB9IGZyb20gXCJkYXRhL1Njb3JlXCI7XG5cbmV4cG9ydCBjbGFzcyBOZXdDYXRlZ29yeU1vZGFsIGV4dGVuZHMgTW9kYWwge1xuXG4gICAgY2FsbGJhY2tPbkNsb3NlO1xuXHRjYXRlZ29yeTogQ2F0ZWdvcnk7XG5cdGdyYWRlU2V0OiBHcmFkZVNldDtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgd2VpZ2h0OiBudW1iZXJcbiAgICBzY29yaW5nTWV0aG9kOiBudW1iZXI7XG4gICAgZHJvcExvd2VzdDogbnVtYmVyO1xuXHRkcm9wSGlnaGVzdDogbnVtYmVyO1xuXHRwZXJjZW50T2ZTY29yZXM6IG51bWJlcjtcblxuXHRjb25zdHJ1Y3RvcihhcHA6IEFwcCwgY2FsbGJhY2tPbkNsb3NlOiAoY2F0ZWdvcnk6IENhdGVnb3J5KSA9PiB2b2lkKSB7XG5cdFx0c3VwZXIoYXBwKTtcbiAgICAgICAgdGhpcy5jYWxsYmFja09uQ2xvc2UgPSBjYWxsYmFja09uQ2xvc2U7XG5cdFx0dGhpcy5jYXRlZ29yeSA9IG51bGw7XG4gICAgICAgIHRoaXMud2VpZ2h0ID0gMS4wO1xuICAgICAgICB0aGlzLnNjb3JpbmdNZXRob2QgPSBDYXRlZ29yeS5TY29yaW5nTWV0aG9kLklORElWSURVQUxfU0NPUkVfUEVSQ0VOVEFHRTtcbiAgICAgICAgdGhpcy5kcm9wTG93ZXN0ID0gMDtcbiAgICAgICAgdGhpcy5kcm9wSGlnaGVzdCA9IDA7XG4gICAgICAgIHRoaXMucGVyY2VudE9mU2NvcmVzID0gMTtcblx0fVxuXG4gICAgb25PcGVuKCkge1xuXHRcdGxldCB7Y29udGVudEVsfSA9IHRoaXM7XG5cdFx0XG5cdFx0Y29udGVudEVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiAnTmV3IENhdGVnb3J5JyB9KTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcblx0XHQuc2V0TmFtZShcIk5hbWVcIilcblx0XHQuYWRkVGV4dCgobmFtZSkgPT5cblx0XHQgIG5hbWVcblx0XHRcdCAgLnNldFZhbHVlKFwiXCIpXG5cdFx0XHQgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcdFxuXHRcdFx0XHQgIHRoaXMubmFtZSA9IHZhbHVlO1xuXHRcdFx0ICB9XG4gICAgXHQpKTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250ZW50RWwpXG4gICAgICAgIC5zZXROYW1lKFwiV2VpZ2h0IG9mIGNhdGVnb3J5XCIpXG4gICAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICAgICAgdGV4dFxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZShcIlwiK3RoaXMud2VpZ2h0KVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWlnaHQgPSB2YWx1ZSBhcyBudW1iZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICApKTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250ZW50RWwpXG4gICAgICAgIC5zZXROYW1lKFwiRHJvcCAjIG9mIGxvd2VzdCBzY29yZXNcIilcbiAgICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgICAgICB0ZXh0XG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKFwiXCIrdGhpcy5kcm9wTG93ZXN0KVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wTG93ZXN0ID0gdmFsdWUgYXMgbnVtYmVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgKSk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGVudEVsKVxuICAgICAgICAuc2V0TmFtZShcIkRyb3BIaWdoZXN0XCIpXG4gICAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICAgICAgdGV4dFxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZShcIlwiK3RoaXMuZHJvcEhpZ2hlc3QpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3BIaWdoZXN0ID0gdmFsdWUgYXMgbnVtYmVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgKSk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGVudEVsKVxuICAgICAgICAuc2V0TmFtZShcIiVhZ2Ugb2Ygc2NvcmVzIHVzZWRcIilcbiAgICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgICAgICB0ZXh0XG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKFwiXCIrdGhpcy5wZXJjZW50T2ZTY29yZXMpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcmNlbnRPZlNjb3JlcyA9IHZhbHVlIGFzIG51bWJlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICkpO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcblx0XHQuYWRkQnV0dG9uKChidG4pID0+XG5cdFx0ICBidG5cblx0XHRcdC5zZXRCdXR0b25UZXh0KFwiT0tcIilcblx0XHRcdC5zZXRDdGEoKVxuXHRcdFx0Lm9uQ2xpY2soKCkgPT4ge1xuXHRcdFx0ICBcdHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICBsZXQgY2F0ID0gbmV3IENhdGVnb3J5KG51bGwpO1xuICAgICAgICAgICAgICAgIGNhdC5uYW1lID0gdGhpcy5uYW1lO1xuICAgICAgICAgICAgICAgIGNhdC53ZWlnaHQgPSB0aGlzLndlaWdodDsgICBcbiAgICAgICAgICAgICAgICBjYXQuc2NvcmluZ01ldGhvZCA9IHRoaXMuc2NvcmluZ01ldGhvZDtcbiAgICAgICAgICAgICAgICBjYXQuZHJvcExvd2VzdCA9IHRoaXMuZHJvcExvd2VzdDtcbiAgICAgICAgICAgICAgICBjYXQuZHJvcEhpZ2hlc3QgPSB0aGlzLmRyb3BIaWdoZXN0O1xuICAgICAgICAgICAgICAgIGNhdC5wZXJjZW50T2ZTY29yZXMgPSB0aGlzLnBlcmNlbnRPZlNjb3JlcztcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrT25DbG9zZShjYXQpOyAgICAgICAgICAgICAgICBcblx0XHRcdH1cblx0XHQpKTtcblxuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgUmVtaW5kZXIge1xuXG4gICAgdGV4dDogc3RyaW5nO1xuICAgIGRhdGU6IERhdGU7XG4gICAgcmVwZWF0OiBudW1iZXI7XG4gICAgcHJpb3I6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHRleHQ6IHN0cmluZywgZGF0ZTogRGF0ZSwgcmVwZWF0OiBudW1iZXIsIHByaW9yOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICAgICAgdGhpcy5kYXRlID0gZGF0ZTtcbiAgICAgICAgdGhpcy5yZXBlYXQgPSByZXBlYXQ7XG4gICAgICAgIHRoaXMucHJpb3IgPSBwcmlvcjtcbiAgICB9XG5cbiAgICBpc1RyaWdnZXJlZCgpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGxldCBjaGVjayA9IG5ldyBEYXRlKG5vdy5nZXRGdWxsWWVhcigpLCBub3cuZ2V0TW9udGgoKSwgbm93LmdldERhdGUoKS10aGlzLnByaW9yKTtcbiAgICAgICAgaWYgKHRoaXMuZGF0ZS5nZXRUaW1lKCkgLSBjaGVjay5nZXRUaW1lKCkgPj0gMCBcbiAgICAgICAgICAgICYmIHRoaXMuZGF0ZS5nZXRUaW1lKCkgLSBjaGVjay5nZXRUaW1lKCkgPD0gKHRoaXMucHJpb3IgKiA4NjQwMDAwMCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgbGV0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGxldCBuZXdkYXRlID0gbmV3IERhdGUobm93LmdldEZ1bGxZZWFyKCksIG5vdy5nZXRNb250aCgpLCBub3cuZ2V0RGF0ZSgpK3RoaXMucmVwZWF0KTtcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3ZGF0ZTtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0ICsgXCIgfCBcIiArIHRoaXMuZGF0ZS50b1N0cmluZygpICsgXCIgfCBcIiArIHRoaXMucmVwZWF0LnRvU3RyaW5nKCkgKyBcIiB8IFwiICsgdGhpcy5wcmlvci50b1N0cmluZygpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgQXBwLCBEcm9wZG93bkNvbXBvbmVudCwgTW9kYWwsIFNldHRpbmcsIFRGaWxlLCBUZXh0Q29tcG9uZW50LCBUZXh0RmlsZVZpZXcsIFdvcmtzcGFjZUxlYWYgfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tIFwiZGF0YS9DYXRlZ29yeVwiO1xuaW1wb3J0IHsgR3JhZGVTZXQgfSBmcm9tIFwiZGF0YS9HcmFkZVNldFwiO1xuaW1wb3J0IEdyYWRlYm94UGx1Z2luIGZyb20gXCJtYWluXCI7XG5pbXBvcnQgeyBSZW1pbmRlciB9IGZyb20gXCJkYXRhL1JlbWluZGVyXCI7XG5pbXBvcnQgeyBTY29yZSB9IGZyb20gXCJkYXRhL1Njb3JlXCI7XG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcImRhdGEvU3R1ZGVudFwiO1xuXG5leHBvcnQgY2xhc3MgTmV3UmVtaW5kZXJNb2RhbCBleHRlbmRzIE1vZGFsIHtcblxuICAgIGNhbGxiYWNrT25DbG9zZTtcblx0cmVtaW5kZXI6IFJlbWluZGVyO1xuXHRncmFkZVNldDogR3JhZGVTZXQ7XG4gICAgdGV4dDogc3RyaW5nO1xuICAgIGRhdGU6IHN0cmluZztcbiAgICByZXBlYXQ6IHN0cmluZztcbiAgICBwcmlvcjogc3RyaW5nO1xuXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBjYWxsYmFja09uQ2xvc2U6IChyZW1pbmRlcjogUmVtaW5kZXIpID0+IHZvaWQpIHtcblx0XHRzdXBlcihhcHApO1xuICAgICAgICB0aGlzLmNhbGxiYWNrT25DbG9zZSA9IGNhbGxiYWNrT25DbG9zZTtcblx0XHR0aGlzLnJlbWluZGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy50ZXh0ID0gXCJcIjtcbiAgICAgICAgdGhpcy5kYXRlID0gXCJcIjtcbiAgICAgICAgdGhpcy5yZXBlYXQgPSBcIjBcIjtcbiAgICAgICAgdGhpcy5wcmlvciA9IFwiMFwiO1xuXHR9XG5cbiAgICBvbk9wZW4oKSB7XG5cdFx0bGV0IHtjb250ZW50RWx9ID0gdGhpcztcblx0XHRcblx0XHRjb250ZW50RWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6ICdOZXcgUmVtaW5kZXInIH0pO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGVudEVsKVxuXHRcdC5zZXROYW1lKFwiVGV4dFwiKVxuXHRcdC5hZGRUZXh0KCh0ZXh0KSA9PlxuXHRcdCAgdGV4dFxuXHRcdFx0ICAuc2V0VmFsdWUoXCJcIilcblx0XHRcdCAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1x0XG5cdFx0XHRcdCAgdGhpcy50ZXh0ID0gdmFsdWU7XG5cdFx0XHQgIH1cbiAgICBcdCkpO1xuXG4gICAgICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBsZXQgdG9kYXkgPSBub3cudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi11cycsIHsgeWVhcjpcIm51bWVyaWNcIiwgbW9udGg6XCJudW1lcmljXCIsIGRheTpcIm51bWVyaWNcIn0pO1xuICAgICAgICB0aGlzLmRhdGUgPSB0b2RheTtcbiAgICAgICAgbmV3IFNldHRpbmcoY29udGVudEVsKVxuICAgICAgICAuc2V0TmFtZShcIlN0YXJ0aW5nIERhdGVcIilcbiAgICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgICAgICB0ZXh0XG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRvZGF5KVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICApKTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250ZW50RWwpXG4gICAgICAgIC5zZXROYW1lKFwiUmVwZWF0IGluIERheXNcIilcbiAgICAgICAgLmFkZFRleHQoKHRleHQpID0+XG4gICAgICAgICAgICB0ZXh0XG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucmVwZWF0KVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXBlYXQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICkpO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcbiAgICAgICAgLnNldE5hbWUoXCJSZW1pbmRlciBEYXlzIEJlZm9yZVwiKVxuICAgICAgICAuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgICAgIHRleHRcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wcmlvcilcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJpb3IgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICkpO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcblx0XHQuYWRkQnV0dG9uKChidG4pID0+XG5cdFx0ICBidG5cblx0XHRcdC5zZXRCdXR0b25UZXh0KFwiT0tcIilcblx0XHRcdC5zZXRDdGEoKVxuXHRcdFx0Lm9uQ2xpY2soKCkgPT4ge1xuXHRcdFx0ICBcdHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICBsZXQgcmVtID0gbmV3IFJlbWluZGVyKHRoaXMudGV4dCwgbmV3IERhdGUodGhpcy5kYXRlKSwgcGFyc2VJbnQodGhpcy5yZXBlYXQpLCBwYXJzZUludCh0aGlzLnByaW9yKSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVtKTtcblx0XHRcdFx0dGhpcy5jYWxsYmFja09uQ2xvc2UocmVtKTtcbiAgICAgICAgICAgICAgICBcblx0XHRcdH1cblx0XHQpKTtcblxuICAgIH1cbn0iLCJpbXBvcnQgeyBBcHAsIERyb3Bkb3duQ29tcG9uZW50LCBLZXltYXBFdmVudEhhbmRsZXIsIE1vZGFsLCBTZXR0aW5nLCBURmlsZSwgVGV4dENvbXBvbmVudCwgVGV4dEZpbGVWaWV3LCBXb3Jrc3BhY2VMZWFmIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5cbmltcG9ydCB7IEdyYWRlU2V0IH0gZnJvbSBcImRhdGEvR3JhZGVTZXRcIjtcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSBcImRhdGEvQ2F0ZWdvcnlcIjtcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiZGF0YS9TdHVkZW50XCI7XG5pbXBvcnQgeyBTY29yZSB9IGZyb20gXCJkYXRhL1Njb3JlXCI7XG5pbXBvcnQgR3JhZGVib3hQbHVnaW4gZnJvbSBcIm1haW5cIjtcblxuZXhwb3J0IGNsYXNzIE5ld1Njb3JlTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG5cbiAgICBjYWxsYmFja09uQ2xvc2U7XG5cdG5hbWU6IHN0cmluZztcblx0cG9zc2libGU6IG51bWJlcjtcblx0Y2F0bmFtZTogc3RyaW5nO1xuXHRzY29yZXM6IE1hcDxzdHJpbmcsIG51bWJlcj47XG5cdGZpZWxkczogVGV4dENvbXBvbmVudFtdO1x0XG5cdHBvc3NpYmxlRmllbGQ6IFNldHRpbmc7XG5cdGdyYWRlU2V0OiBHcmFkZVNldDtcblx0ZWM6IGJvb2xlYW47XG5cdGVudGVyaGFuZGxlcjogS2V5bWFwRXZlbnRIYW5kbGVyO1xuXHRmaWVsZDogbnVtYmVyO1xuXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBncmFkZVNldDogR3JhZGVTZXQsIGNhbGxiYWNrT25DbG9zZTogKCkgPT4gdm9pZCkge1xuXHRcdHN1cGVyKGFwcCk7XG5cdFx0dGhpcy5ncmFkZVNldCA9IGdyYWRlU2V0O1xuICAgICAgICB0aGlzLmNhbGxiYWNrT25DbG9zZSA9IGNhbGxiYWNrT25DbG9zZTtcblx0XHR0aGlzLnNjb3JlcyA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+O1xuXHRcdHRoaXMubmFtZSA9IFwiXCI7XG5cdFx0dGhpcy5wb3NzaWJsZSA9IDA7XG5cdFx0dGhpcy5jYXRuYW1lID0gKGdyYWRlU2V0LmNhdGVnb3JpZXMgPT0gdW5kZWZpbmVkIHx8IGdyYWRlU2V0LmNhdGVnb3JpZXMgPT0gbnVsbCB8fCBncmFkZVNldC5jYXRlZ29yaWVzLmxlbmd0aCA9PSAwKVxuXHRcdFx0XHRcdFx0XHQ/XCJubyBjYXRlZ29yaWVzXCJcblx0XHRcdFx0XHRcdFx0OmdyYWRlU2V0LmNhdGVnb3JpZXNbMF0ubmFtZTtcblx0fVxuXG5cdG9uT3BlbigpIHtcblx0XHRsZXQge2NvbnRlbnRFbH0gPSB0aGlzO1xuXHRcdFxuXHRcdGNvbnRlbnRFbC5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogJ05ldyBTY29yZScgfSk7XG5cblx0XHR0aGlzLmZpZWxkID0gMDtcblx0XHR0aGlzLmVudGVyaGFuZGxlciA9IHRoaXMuc2NvcGUucmVnaXN0ZXIoW10sIFwiRW50ZXJcIiwgKCkgPT4ge1xuXHRcdFx0dGhpcy5maWVsZHNbdGhpcy5maWVsZF0uaW5wdXRFbC5mb2N1cygpO1xuXHRcdFx0dGhpcy5maWVsZHNbdGhpcy5maWVsZF0uaW5wdXRFbC5zZWxlY3QoKTtcblx0XHRcdHRoaXMuZmllbGQrKztcblx0XHR9KVxuXG5cdFx0bmV3IFNldHRpbmcoY29udGVudEVsKVxuXHRcdC5zZXROYW1lKFwiTmFtZVwiKVxuXHRcdC5hZGRUZXh0KCh0ZXh0KSA9PlxuXHRcdCAgdGV4dFxuXHRcdFx0ICAuc2V0VmFsdWUoXCJcIilcblx0XHRcdCAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1x0XG5cdFx0XHRcdCAgdGhpcy5uYW1lID0gdmFsdWU7XG5cdFx0XHQgIH1cbiAgICBcdCkpO1xuXG5cdFx0dGhpcy5wb3NzaWJsZUZpZWxkID0gbmV3IFNldHRpbmcoY29udGVudEVsKVxuXHRcdFx0LnNldE5hbWUoXCJUb3RhbCBQb3NzaWJsZVwiKVxuXHRcdFx0LmFkZFRleHQoICh0ZXh0KSA9PiBcblx0XHRcdCAgXHR0ZXh0XG5cdFx0XHQgIFx0XHQuc2V0VmFsdWUoXCJcIilcblx0XHRcdFx0XHQub25DaGFuZ2UoICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5wb3NzaWJsZSA9IHZhbHVlIGFzIHVua25vd24gYXMgbnVtYmVyO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHQpO1xuXG5cdFx0bGV0IGNhdERyb3Bkb3duID0gbmV3IFNldHRpbmcoY29udGVudEVsKSBcblx0XHQgICAgLnNldE5hbWUoXCJDYXRlZ29yeVwiKVxuXHRcdFx0LmFkZERyb3Bkb3duKGRyb3AgPT4gZHJvcFxuXHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5jYXRuYW1lID0gdmFsdWU7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdHRoaXMuZ3JhZGVTZXQuY2F0ZWdvcmllcy5mb3JFYWNoKCAoY2F0OiBDYXRlZ29yeSkgPT4ge1xuXHRcdFx0KGNhdERyb3Bkb3duLmNvbXBvbmVudHNbMF0gYXMgRHJvcGRvd25Db21wb25lbnQpLmFkZE9wdGlvbihjYXQubmFtZSwgY2F0Lm5hbWUpO1x0XHRcdFxuXHRcdFx0KGNhdERyb3Bkb3duLmNvbXBvbmVudHNbMF0gYXMgRHJvcGRvd25Db21wb25lbnQpLnNldFZhbHVlKGNhdC5uYW1lKTtcblx0XHR9KTtcblx0XHQoY2F0RHJvcGRvd24uY29tcG9uZW50c1swXSBhcyBEcm9wZG93bkNvbXBvbmVudCkuc2V0VmFsdWUodGhpcy5ncmFkZVNldC5jYXRlZ29yaWVzWzBdLm5hbWUpO1xuXG5cdFx0Ly8gVXRpbGl0eSBidXR0b25zXG5cdFx0dGhpcy5lYyA9IGZhbHNlO1xuXHRcdHZhciBlY3QgPSBuZXcgU2V0dGluZyhjb250ZW50RWwpXG5cdFx0ICAgLmFkZFRvZ2dsZSgoY2IpID0+IFxuXHRcdCAgICAgICBjYlxuXHRcdFx0ICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuXHRcdFx0XHQgICB0aGlzLmVjID0gdmFsdWU7XG5cdFx0XHQgICB9KVxuXHRcdCAgICk7XHRcblx0XHQgICBlY3QubmFtZUVsLmlubmVySFRNTCA9IFwiRXh0cmEgQ3JlZGl0P1wiOyAgXHRcblx0ICAgIG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcblx0XHQuYWRkQnV0dG9uKChidG4pID0+XG5cdFx0ICBidG5cblx0XHRcdC5zZXRCdXR0b25UZXh0KFwiRmlsbCBEb3duXCIpXG5cdFx0XHQuc2V0Q3RhKClcblx0XHRcdC5vbkNsaWNrKCgpID0+IHtcblx0XHRcdFx0dGhpcy5maWVsZHMuZm9yRWFjaCggKGZpZWxkOiBUZXh0Q29tcG9uZW50KSA9PiB7XG5cdFx0XHRcdFx0ZmllbGQuc2V0VmFsdWUoXCJcIit0aGlzLnBvc3NpYmxlKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0Y29uc29sZS5sb2coT2JqZWN0LmtleXModGhpcy5zY29yZXMpKTtcblx0XHRcdFx0dGhpcy5zY29yZXMuZm9yRWFjaCggKHZhbHVlLCBrZXkpID0+IHtcblx0XHRcdFx0XHR0aGlzLnNjb3Jlcy5zZXQoa2V5LCB0aGlzLnBvc3NpYmxlKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5zY29yZXMpO1xuXHRcdFx0fVxuXHRcdCkpO1xuXG5cdFx0XG5cblx0XHQvLyBTdHVkZW50c1xuXHRcdHRoaXMuZmllbGRzID0gW107XG5cdFx0dGhpcy5ncmFkZVNldC5zdHVkZW50cy5mb3JFYWNoKCAoc3R1ZDogU3R1ZGVudCkgPT4ge1xuXHRcdFx0dGhpcy5zY29yZXMuc2V0KHN0dWQuZGF0YS5nZXQoXCJuYW1lXCIpLCAwKTtcblx0XHRcdG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcblx0XHRcdC5zZXROYW1lKHN0dWQuZGF0YS5nZXQoXCJuYW1lXCIpKVxuXHRcdFx0LmFkZFRleHQoICh0ZXh0KSA9PiB7XG5cdFx0XHQgIFx0dGV4dFxuXHRcdFx0ICBcdFx0LnNldFZhbHVlKFwiMFwiKVxuXHRcdFx0XHRcdC5vbkNoYW5nZSggKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHRsZXQgbnVtID0gdmFsdWUgYXMgdW5rbm93biBhcyBudW1iZXI7XG5cdFx0XHRcdFx0XHR0aGlzLnNjb3Jlcy5zZXQoc3R1ZC5kYXRhLmdldChcIm5hbWVcIiksIG51bSk7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIlNFVFRJTkcgXCIrc3R1ZC5kYXRhLmdldChcIm5hbWVcIikrXCIgdG8gXCIrbnVtKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0dGhpcy5maWVsZHMucHVzaCh0ZXh0KTtcblx0XHRcdH1cblx0XHRcdCl9KTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcblx0XHQuYWRkQnV0dG9uKChidG4pID0+XG5cdFx0ICBidG5cblx0XHRcdC5zZXRCdXR0b25UZXh0KFwiT0tcIilcblx0XHRcdC5zZXRDdGEoKVxuXHRcdFx0Lm9uQ2xpY2soKCkgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLnNjb3Jlcylcblx0XHRcdFx0dGhpcy5ncmFkZVNldC5hZGRTY29yZSh0aGlzLm5hbWUsIHRoaXMucG9zc2libGUsIHRoaXMuZWMsIHRoaXMuY2F0bmFtZSwgdGhpcy5zY29yZXMpO1xuXHRcdFx0ICBcdHRoaXMuY2xvc2UoKTtcblx0XHRcdFx0dGhpcy5jYWxsYmFja09uQ2xvc2UoKTtcblx0XHRcdH1cblx0XHQpKTtcblxuXHR9XG5cblx0b25DbG9zZSgpIHtcblx0XHR0aGlzLnNjb3BlLnVucmVnaXN0ZXIodGhpcy5lbnRlcmhhbmRsZXIpO1xuXHR9XG59XG5cbiIsImltcG9ydCB7IEFwcCwgTW9kYWwsIE5vdGljZSwgU2V0dGluZywgVEZpbGUsIFRleHRGaWxlVmlldywgV29ya3NwYWNlTGVhZiB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5pbXBvcnQgeyBHcmFkZVNldCB9IGZyb20gXCJkYXRhL0dyYWRlU2V0XCI7XG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcImRhdGEvU3R1ZGVudFwiO1xuaW1wb3J0IEdyYWRlYm94UGx1Z2luIGZyb20gXCJtYWluXCI7XG5cbmV4cG9ydCBjbGFzcyBOZXdTdHVkZW50TW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG4gIG5hbWU6IHN0cmluZztcbiAgaWQ6IHN0cmluZztcbiAgZW1haWxhZGRyZXNzOiBzdHJpbmc7XG4gIG5pY2tuYW1lOiBzdHJpbmc7XG4gIG1vYmlsZVBob25lTnVtYmVyOiBzdHJpbmc7XG5cbiAgbmV3U3R1ZGVudDogU3R1ZGVudDtcblxuICBjYWxsYmFja09uQ2xvc2U7XG5cblx0Y29uc3RydWN0b3IoYXBwOiBBcHAsIGNhbGxiYWNrT25DbG9zZTogKHN0dWRlbnQ6IFN0dWRlbnQpID0+IHZvaWQpIHtcblx0XHRzdXBlcihhcHApO1xuICAgIFx0dGhpcy5uZXdTdHVkZW50ID0gbnVsbDtcbiAgICBcdHRoaXMuY2FsbGJhY2tPbkNsb3NlID0gY2FsbGJhY2tPbkNsb3NlO1xuXHR9XG5cblx0b25PcGVuKCkge1xuXHRcdGxldCB7Y29udGVudEVsfSA9IHRoaXM7XG5cdFx0XG5cdFx0Y29udGVudEVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiAnTmV3IFN0dWRlbnQnIH0pO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGVudEVsKVxuXHRcdC5zZXROYW1lKFwiTmFtZVwiKVxuXHRcdC5hZGRUZXh0KCh0ZXh0KSA9PlxuXHRcdCAgdGV4dFxuXHRcdFx0ICAuc2V0VmFsdWUoXCJcIilcblx0XHRcdCAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1x0XG5cdFx0XHRcdCAgdGhpcy5uYW1lID0gdmFsdWU7XG5cdFx0XHQgIH1cbiAgICApKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcblx0XHQuc2V0TmFtZShcIklEXCIpXG5cdFx0LmFkZFRleHQoKHRleHQpID0+XG5cdFx0ICB0ZXh0XG5cdFx0XHQgIC5zZXRWYWx1ZShcIlwiKVxuXHRcdFx0ICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHRcblx0XHRcdFx0ICB0aGlzLmlkID0gdmFsdWU7XG5cdFx0XHQgIH1cbiAgICApKTtcbiAgICBcblx0XHRuZXcgU2V0dGluZyhjb250ZW50RWwpXG5cdFx0LnNldE5hbWUoXCJOaWNrbmFtZVwiKVxuXHRcdC5hZGRUZXh0KCh0ZXh0KSA9PlxuXHRcdCAgdGV4dFxuXHRcdFx0ICAuc2V0VmFsdWUoXCJcIilcblx0XHRcdCAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1x0XG5cdFx0XHRcdCAgdGhpcy5uaWNrbmFtZSA9IHZhbHVlO1xuXHRcdFx0ICB9XG4gICAgKSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250ZW50RWwpXG5cdFx0LnNldE5hbWUoXCJFbWFpbCBhZGRyZXNzXCIpXG5cdFx0LmFkZFRleHQoKHRleHQpID0+XG5cdFx0ICB0ZXh0XG5cdFx0XHQgIC5zZXRWYWx1ZShcIlwiKVxuXHRcdFx0ICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHRcblx0XHRcdFx0ICB0aGlzLmVtYWlsYWRkcmVzcyA9IHZhbHVlO1xuXHRcdFx0ICB9XG4gICAgKSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250ZW50RWwpXG5cdFx0LnNldE5hbWUoXCJNb2JpbGUgcGhvbmUgbnVtYmVyXCIpXG5cdFx0LmFkZFRleHQoKHRleHQpID0+XG5cdFx0ICB0ZXh0XG5cdFx0XHQgIC5zZXRWYWx1ZShcIlwiKVxuXHRcdFx0ICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHRcblx0XHRcdFx0ICB0aGlzLm1vYmlsZVBob25lTnVtYmVyID0gdmFsdWU7XG5cdFx0XHQgIH1cbiAgICApKTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcblx0XHRcdC5hZGRCdXR0b24oKGJ0bikgPT5cblx0XHRcdCAgYnRuXG5cdFx0XHRcdC5zZXRCdXR0b25UZXh0KFwiT0tcIilcblx0XHRcdFx0LnNldEN0YSgpXG5cdFx0XHRcdC5vbkNsaWNrKCgpID0+IHtcblx0XHRcdFx0XHRpZiAodGhpcy5uYW1lID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdG5ldyBOb3RpY2UoXCJZb3UgbXVzdCBlbnRlciBhIHN0dWRlbnQgbmFtZS5cIiwgNTAwMCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLmlkID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdG5ldyBOb3RpY2UoXCJZb3UgbXVzdCBlbnRlciBhIHN0dWRlbnQgSUQuXCIsIDUwMDApO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHR9KSk7XG5cdH1cblxuXHRvbkNsb3NlKCkge1xuXHRcdGlmICh0aGlzLm5hbWUgPT09IHVuZGVmaW5lZCB8fCB0aGlzLmlkID09PSB1bmRlZmluZWQpIHJldHVybjtcblx0XHRjb25zb2xlLmxvZyh0aGlzKTtcblx0XHR2YXIgb2JqOiBPYmplY3QgPSB7XG5cdFx0XHRuYW1lOiB0aGlzLm5hbWUsXG5cdFx0XHRpZDogdGhpcy5pZCxcblx0XHRcdGVtYWlsYWRkcmVzczogdGhpcy5lbWFpbGFkZHJlc3MsXG5cdFx0XHRuaWNrbmFtZTogdGhpcy5uaWNrbmFtZSxcblx0XHRcdG1vYmlsZXBob25lbnVtYmVyOiB0aGlzLm1vYmlsZVBob25lTnVtYmVyXG5cdFx0fVxuICAgIFx0dGhpcy5uZXdTdHVkZW50ID0gbmV3IFN0dWRlbnQob2JqKTtcblx0XHRjb25zb2xlLmxvZyh0aGlzLm5ld1N0dWRlbnQpO1xuXHRcdGlmICh0aGlzLm5ld1N0dWRlbnQgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgIFx0dGhpcy5jYWxsYmFja09uQ2xvc2UodGhpcy5uZXdTdHVkZW50KTtcblx0fVxuXG4gIGdldFN0dWRlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMubmV3U3R1ZGVudDtcbiAgfVxufVxuIiwiLy8gU3RvbGVuIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2hlbGxvaXRzaWFuL2N1c3RvbS1tb2RhbHMtb2JzaWRpYW4vYmxvYi9tYWluL3NyYy9tb2RhbC9DdXN0b21Nb2RhbC50c1xuXG5pbXBvcnQgeyBBcHAsIE1vZGFsLCBOb3RpY2UsIFBsdWdpbiwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcblxuaW1wb3J0IHsgQWxlcnQgfSBmcm9tICcuL2FsZXJ0JztcblxuZXhwb3J0IGNsYXNzIFByb2dyZXNzIGV4dGVuZHMgTW9kYWwge1xuXHRwbHVnaW46IFBsdWdpbjtcblx0dGl0bGU6IHN0cmluZztcblx0bGFiZWw6IHN0cmluZztcblx0YmFyOiBIVE1MUHJvZ3Jlc3NFbGVtZW50O1xuXHRjbG9zaW5nTWVzc2FnZTogc3RyaW5nO1xuXHRtYXg6IG51bWJlcjtcbiAgXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHBsdWdpbjogUGx1Z2luLFxuXHRcdHRpdGxlOiBzdHJpbmcsXG5cdFx0bGFiZWw6IHN0cmluZyxcblx0XHRjbG9zaW5nTWVzc2FnZTogc3RyaW5nLFxuXHRcdG1heDogbnVtYmVyXG5cdCkge1xuXHRcdHN1cGVyKHBsdWdpbi5hcHApO1xuXG5cdFx0dGhpcy5wbHVnaW4gPSBwbHVnaW47XG5cdFx0dGhpcy50aXRsZSA9IHRpdGxlO1xuXHRcdHRoaXMubGFiZWwgPSBsYWJlbDtcblx0XHR0aGlzLmNsb3NpbmdNZXNzYWdlID0gY2xvc2luZ01lc3NhZ2U7XG5cdFx0dGhpcy5tYXggPSBtYXg7XG5cblx0fVxuXG5cdGFzeW5jIG9uT3BlbigpIHtcblx0XHRuZXcgTm90aWNlKHRoaXMubGFiZWwpO1xuXG5cdFx0bGV0IHtjb250ZW50RWx9ID0gdGhpcztcblx0XHRcblx0XHRjb250ZW50RWwuY3JlYXRlRWwoXCJmb3JtXCIsIHt9LCAoZm9ybSkgPT4ge1xuXG5cdFx0XHRsZXQgdGl0bGVEaXYgPSBmb3JtLmNyZWF0ZURpdigpO1xuXHRcdFx0dGl0bGVEaXYuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IHRoaXMudGl0bGUgfSk7XG5cdFx0XHR0aXRsZURpdi5jcmVhdGVFbChcImhyXCIpO1xuXHRcdFx0XG5cdFx0XHR0aGlzLmJhciA9IHRpdGxlRGl2LmNyZWF0ZUVsKFwicHJvZ3Jlc3NcIiwgeyBhdHRyOiB7dmFsdWU6IDEsIG1heDogXCJcIit0aGlzLm1heCwgd2lkdGg6IFwiMTAwJVwifSB9KTtcblxuXHRcdH0pO1xuXHR9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGxldCBpbnR2YWx1ZSA9IHBhcnNlSW50KHRoaXMuYmFyLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpKTtcblx0XHRpbnR2YWx1ZSArPSAxO1xuXHRcdHRoaXMuYmFyLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIGludHZhbHVlLnRvU3RyaW5nKCkpO1xuXHRcdGlmIChpbnR2YWx1ZSA+PSB0aGlzLm1heCkge1xuXHRcdFx0dGhpcy5jbG9zZSgpO1xuXHRcdH1cbiAgICB9XG5cblx0b25DbG9zZSgpIHtcblx0XHRsZXQge2NvbnRlbnRFbH0gPSB0aGlzO1xuXHRcdGNvbnRlbnRFbC5lbXB0eSgpO1xuXHRcdGlmICh0aGlzLmNsb3NpbmdNZXNzYWdlLmxlbmd0aCA+IDApIHtcblx0XHRcdG5ldyBBbGVydCh0aGlzLnBsdWdpbiwgXCJEb25lIVwiLCB0aGlzLmNsb3NpbmdNZXNzYWdlKS5vcGVuKCk7XG5cdFx0fVx0XG5cdH1cblxuXG59XG5cbiIsImltcG9ydCB7IEFwcCwgTW9kYWwsIE5vdGljZSwgUGx1Z2luLCBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nO1xuXG5pbXBvcnQgeyBSZW1pbmRlciB9IGZyb20gJ2RhdGEvUmVtaW5kZXInO1xuXG5leHBvcnQgY2xhc3MgUmVtaW5kZXJQb3B1cCBleHRlbmRzIE1vZGFsIHtcblx0cGx1Z2luOiBQbHVnaW47XG5cdHRpdGxlOiBzdHJpbmc7XG5cdHJlbWluZGVyOiBSZW1pbmRlcjtcblx0ZGlzbWlzc0NhbGxiYWNrOiAocmVtaW5kZXI6IFJlbWluZGVyKSA9PiB2b2lkO1xuICBcblx0Y29uc3RydWN0b3IocGx1Z2luOiBQbHVnaW4sIHJlbWluZGVyOiBSZW1pbmRlciwgZGlzbWlzczogKHJlbWluZGVyOiBSZW1pbmRlcikgPT4gdm9pZCkge1xuXHRcdHN1cGVyKHBsdWdpbi5hcHApO1xuXG5cdFx0dGhpcy5wbHVnaW4gPSBwbHVnaW47XG5cdFx0dGhpcy5yZW1pbmRlciA9IHJlbWluZGVyO1xuICAgICAgICB0aGlzLmRpc21pc3NDYWxsYmFjayA9IGRpc21pc3M7XG5cdH1cblxuXHRhc3luYyBvbk9wZW4oKSB7XG5cdFx0bGV0IHtjb250ZW50RWx9ID0gdGhpcztcblx0XHRcblx0XHRjb250ZW50RWwuY3JlYXRlRWwoXCJmb3JtXCIsIHt9LCAoZm9ybSkgPT4ge1xuXG5cdFx0XHRsZXQgdGl0bGVEaXYgPSBmb3JtLmNyZWF0ZURpdigpO1xuXHRcdFx0dGl0bGVEaXYuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IFwiUmVtaW5kZXJcIiB9KTtcblx0XHRcdHRpdGxlRGl2LmNyZWF0ZUVsKFwiaHJcIik7XG5cdFx0XHRcblx0XHRcdHRpdGxlRGl2LmNyZWF0ZUVsKFwiaDNcIiwgeyB0ZXh0OiB0aGlzLnJlbWluZGVyLnRleHR9KTtcblxuXHRcdFx0Zm9ybS5jcmVhdGVEaXYoXCJhbGVydC1idXR0b24tY29udGFpbmVyXCIsIGNvbnRhaW5lciA9PiB7XG5cdFx0XHRcdGNvbnRhaW5lclxuXHRcdFx0XHRcdC5jcmVhdGVFbChcImJ1dHRvblwiLCB7IGF0dHI6IHsgdHlwZTogXCJidXR0b25cIiB9LCB0ZXh0OiBcIkRpc21pc3NcIiB9KVxuXHRcdFx0XHRcdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNtaXNzQ2FsbGJhY2sodGhpcy5yZW1pbmRlcik7XG5cdFx0XHRcdFx0fSk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyXG5cdFx0XHRcdFx0LmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHsgYXR0cjogeyB0eXBlOiBcImJ1dHRvblwiLCBtYXJnaW46IFwiMTBweFwiIH0sIHRleHQ6IFwiQ2xvc2VcIiB9KVxuXHRcdFx0XHRcdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5jbG9zZSgpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHR9KTtcblxuXHRcdH0pO1xuXHR9XG5cblx0b25DbG9zZSgpIHtcblx0XHRsZXQge2NvbnRlbnRFbH0gPSB0aGlzO1xuXHRcdGNvbnRlbnRFbC5lbXB0eSgpO1xuXHR9XG5cblxufVxuXG4iLCIvLyBUYWtlbiBmcm9tIGh0dHBzOi8vbWVkaXVtLmNvbS9zd2xoL3NlbWFwaG9yZXMtaW4tamF2YXNjcmlwdC1lNDE1YjBkNjg0YmNcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VtYXBob3JlIHtcblxuICAgIGN1cnJlbnRSZXF1ZXN0czogYW55W107XG4gICAgcnVubmluZ1JlcXVlc3RzOiBudW1iZXI7XG4gICAgbWF4Q29uY3VycmVudFJlcXVlc3RzOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgc2VtYXBob3JlIHRoYXQgbGltaXRzIHRoZSBudW1iZXIgb2YgY29uY3VycmVudCBQcm9taXNlcyBiZWluZyBoYW5kbGVkXG4gICAgICogQHBhcmFtIHsqfSBtYXhDb25jdXJyZW50UmVxdWVzdHMgbWF4IG51bWJlciBvZiBjb25jdXJyZW50IHByb21pc2VzIGJlaW5nIGhhbmRsZWQgYXQgYW55IHRpbWVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihtYXhDb25jdXJyZW50UmVxdWVzdHMgPSAxKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFJlcXVlc3RzID0gW107XG4gICAgICAgIHRoaXMucnVubmluZ1JlcXVlc3RzID0gMDtcbiAgICAgICAgdGhpcy5tYXhDb25jdXJyZW50UmVxdWVzdHMgPSBtYXhDb25jdXJyZW50UmVxdWVzdHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIFByb21pc2UgdGhhdCB3aWxsIGV2ZW50dWFsbHkgcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGZ1bmN0aW9uIHBhc3NlZCBpblxuICAgICAqIFVzZSB0aGlzIHRvIGxpbWl0IHRoZSBudW1iZXIgb2YgY29uY3VycmVudCBmdW5jdGlvbiBleGVjdXRpb25zXG4gICAgICogQHBhcmFtIHsqfSBmblRvQ2FsbCBmdW5jdGlvbiB0aGF0IGhhcyBhIGNhcCBvbiB0aGUgbnVtYmVyIG9mIGNvbmN1cnJlbnQgZXhlY3V0aW9uc1xuICAgICAqIEBwYXJhbSAgey4uLmFueX0gYXJncyBhbnkgYXJndW1lbnRzIHRvIGJlIHBhc3NlZCB0byBmblRvQ2FsbFxuICAgICAqIEByZXR1cm5zIFByb21pc2UgdGhhdCB3aWxsIHJlc29sdmUgd2l0aCB0aGUgcmVzb2x2ZWQgdmFsdWUgYXMgaWYgdGhlIGZ1bmN0aW9uIHBhc3NlZCBpbiB3YXMgZGlyZWN0bHkgY2FsbGVkXG4gICAgICovXG4gICAgY2FsbEZ1bmN0aW9uKGZuVG9DYWxsLCAuLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRSZXF1ZXN0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICAgIHJlamVjdCxcbiAgICAgICAgICAgICAgICBmblRvQ2FsbCxcbiAgICAgICAgICAgICAgICBhcmdzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnRyeU5leHQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdHJ5TmV4dCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmN1cnJlbnRSZXF1ZXN0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJ1bm5pbmdSZXF1ZXN0cyA8IHRoaXMubWF4Q29uY3VycmVudFJlcXVlc3RzKSB7XG4gICAgICAgICAgICBsZXQgeyByZXNvbHZlLCByZWplY3QsIGZuVG9DYWxsLCBhcmdzIH0gPSB0aGlzLmN1cnJlbnRSZXF1ZXN0cy5zaGlmdCgpO1xuICAgICAgICAgICAgdGhpcy5ydW5uaW5nUmVxdWVzdHMrKztcbiAgICAgICAgICAgIGxldCByZXEgPSBmblRvQ2FsbCguLi5hcmdzKTtcbiAgICAgICAgICAgIHJlcS50aGVuKChyZXMpID0+IHJlc29sdmUocmVzKSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4gcmVqZWN0KGVycikpXG4gICAgICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmdSZXF1ZXN0cy0tO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeU5leHQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyogSE9XIFRPIFVTRSAqL1xuLy8gY29uc3QgdGhyb3R0bGVyID0gbmV3IFNlbWFwaG9yZSgyKTtcbi8vIHRocm90dGxlci5jYWxsRnVuY3Rpb24oZmV0Y2gsICd3d3cuZmFjZWJvb2suY29tJyk7XG4vLyB0aHJvdHRsZXIuY2FsbEZ1bmN0aW9uKGZldGNoLCAnd3d3LmFtYXpvbi5jb20nKTtcbi8vIHRocm90dGxlci5jYWxsRnVuY3Rpb24oZmV0Y2gsICd3d3cubmV0ZmxpeC5jb20nKTtcbi8vIHRocm90dGxlci5jYWxsRnVuY3Rpb24oZmV0Y2gsICd3d3cuZ29vZ2xlLmNvbScpOyIsImltcG9ydCB7IEFwcCwgRHJvcGRvd25Db21wb25lbnQsIEVkaXRvciwgRmlsZVN5c3RlbUFkYXB0ZXIsIEl0ZW1WaWV3LCBNYXJrZG93bkZpbGVJbmZvLCBNYXJrZG93blJlbmRlcmVyLCBNYXJrZG93blZpZXcsIE1lbnUsIE1lbnVJdGVtLCBNb2RhbCwgTm90aWNlLCBQbGF0Zm9ybSwgU2V0dGluZywgVEZpbGUsIFRGb2xkZXIsIFRleHRGaWxlVmlldywgV29ya3NwYWNlTGVhZiB9IGZyb20gXCJvYnNpZGlhblwiO1xyXG5pbXBvcnQgeyBTdHVkZW50VmlldywgVklFV19UWVBFX1NUVURFTlQgfSBmcm9tIFwiU3R1ZGVudFZpZXdcIjtcclxuXHJcbmltcG9ydCB7IEFkZEFic2VuY2VNb2RhbCB9IGZyb20gXCJtb2RhbHMvQWRkQWJzZW5jZU1vZGFsXCI7XHJcbmltcG9ydCB7IEFsZXJ0IH0gZnJvbSBcIi4vdXRpbGl0aWVzL2FsZXJ0XCI7XHJcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSBcImRhdGEvQ2F0ZWdvcnlcIjtcclxuaW1wb3J0IHsgQ291bnRlciB9IGZyb20gXCJkYXRhL0NvdW50ZXJcIjtcclxuaW1wb3J0IHsgRW1haWxlciB9IGZyb20gXCIuL2VtYWlsXCI7XHJcbmltcG9ydCB7IEVtYWlsZXJNb2RhbCB9IGZyb20gXCJtb2RhbHMvRW1haWxlck1vZGFsXCI7XHJcbmltcG9ydCB7IEdyYWRlU2V0IH0gZnJvbSBcImRhdGEvR3JhZGVTZXRcIjtcclxuaW1wb3J0IEdyYWRlYm94UGx1Z2luIGZyb20gXCJtYWluXCI7XHJcbmltcG9ydCB7IE5ld0NhdGVnb3J5TW9kYWwgfSBmcm9tIFwibW9kYWxzL05ld0NhdGVnb3J5TW9kYWxcIjtcclxuaW1wb3J0IHsgTmV3Q291bnRlck1vZGFsIH0gZnJvbSBcIm1vZGFscy9OZXdDb3VudGVyTW9kYWxcIjtcclxuaW1wb3J0IHsgTmV3UmVtaW5kZXJNb2RhbCB9IGZyb20gXCJtb2RhbHMvTmV3UmVtaW5kZXJNb2RhbFwiO1xyXG5pbXBvcnQgeyBOZXdTY29yZU1vZGFsIH0gZnJvbSBcIm1vZGFscy9OZXdTY29yZU1vZGFsXCI7XHJcbmltcG9ydCB7IE5ld1N0dWRlbnRNb2RhbCB9IGZyb20gXCJtb2RhbHMvTmV3U3R1ZGVudE1vZGFsXCI7XHJcbmltcG9ydCB7IFByb2dyZXNzIH0gZnJvbSBcInV0aWxpdGllcy9Qcm9ncmVzc1wiO1xyXG5pbXBvcnQgeyBSZW1pbmRlciB9IGZyb20gXCJkYXRhL1JlbWluZGVyXCI7XHJcbmltcG9ydCB7IFJlbWluZGVyUG9wdXAgfSBmcm9tIFwibW9kYWxzL1JlbWluZGVyUG9wdXBcIjtcclxuaW1wb3J0IHsgU2NvcmUgfSBmcm9tIFwiZGF0YS9TY29yZVwiO1xyXG5pbXBvcnQgU2VtYXBob3JlIGZyb20gXCJ1dGlsaXRpZXMvU2VtYXBob3JlXCI7XHJcbmltcG9ydCB7IFN0dWRlbnQgfSBmcm9tIFwiZGF0YS9TdHVkZW50XCI7XHJcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSBcInV0aWxpdGllcy9UZW1wbGF0ZVwiO1xyXG5pbXBvcnQgVXRpbGl0aWVzIGZyb20gXCJ1dGlsaXRpZXMvVXRpbGl0aWVzXCI7XHJcbmltcG9ydCB7IFZJRVdfVFlQRV9HUkFERVNFVF9TVU1NQVJZIH0gZnJvbSBcIkdyYWRlU2V0U3VtbWFyeVZpZXdcIjtcclxuaW1wb3J0IHsgbWFya2Rvd24gfSBmcm9tIFwidXRpbGl0aWVzL2RyYXdkb3duXCI7XHJcblxyXG5leHBvcnQgY29uc3QgVklFV19UWVBFX0dSQURFQk9YID0gXCJncmFkZWJveC12aWV3XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgR3JhZGVib3hWaWV3IGV4dGVuZHMgSXRlbVZpZXcge1xyXG5cclxuICBwbHVnaW46IEdyYWRlYm94UGx1Z2luO1xyXG4gIGdyYWRlU2V0UGF0aDogc3RyaW5nO1xyXG4gIGdyYWRlU2V0RmlsZTogVEZpbGU7XHJcbiAgZnJvbnRtYXR0ZXIgOiBzdHJpbmc7XHJcbiAgZ3JhZGVTZXREYXRhOiBzdHJpbmc7XHJcbiAgZ3JhZGVTZXQ6IEdyYWRlU2V0O1xyXG4gIGNvbnRhaW5lcjogRWxlbWVudDtcclxuICB3b3Jrc3BhY2VsZWFmOiBXb3Jrc3BhY2VMZWFmO1xyXG5cclxuICBzdGF0dXNiYXJFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgZGlzcGxheVRleHQ6IHN0cmluZztcclxuICB3aWR0aDogbnVtYmVyO1xyXG4gIGZpbGV0eXBlczogc3RyaW5nW107XHJcbiAgY29sb3JpemVkOiBib29sZWFuO1xyXG5cclxuICBsaXN0dmlldzogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IobGVhZjogV29ya3NwYWNlTGVhZiwgcGx1Z2luOiBHcmFkZWJveFBsdWdpbikge1xyXG4gICAgc3VwZXIobGVhZik7XHJcblxyXG4gICAgdGhpcy5uYXZpZ2F0aW9uID0gdHJ1ZTtcclxuICAgIHRoaXMud29ya3NwYWNlbGVhZiA9IGxlYWY7XHJcbiAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcclxuXHJcbiAgICB0aGlzLmRpc3BsYXlUZXh0ID0gKHRoaXMucGx1Z2luID09IHVuZGVmaW5lZCB8fCB0aGlzLnBsdWdpbi5ncmFkZVNldCA9PSB1bmRlZmluZWQgfHwgdGhpcy5wbHVnaW4uZ3JhZGVTZXQgPT0gbnVsbCkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnBsdWdpbi52ZXJzaW9uIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5wbHVnaW4uZ3JhZGVTZXQucHJvcGVydGllcy5nZXQoXCJ0aXRsZVwiKTtcclxuICAgIHRoaXMuZmlsZXR5cGVzID0gWyBcInBkZlwiLCBcImRvY3hcIiwgXCJ0eHRcIiwgXCJ4bHN4XCIgXTtcclxuXHJcbiAgICB0aGlzLmNvbG9yaXplZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5saXN0dmlldyA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMucmVnaXN0ZXIoXHJcbiAgICAgIHRoaXMuY29udGFpbmVyRWwub25XaW5kb3dNaWdyYXRlZCgoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ3aW5kb3dNaWdyYXRlZFwiKTtcclxuICAgICAgfSlcclxuICAgIClcclxuICB9XHJcblxyXG4gIGdldFZpZXdUeXBlKCkge1xyXG4gICAgcmV0dXJuIFZJRVdfVFlQRV9HUkFERUJPWDtcclxuICB9XHJcblxyXG4gIGdldERpc3BsYXlUZXh0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGlzcGxheVRleHQ7ICBcclxuICB9XHJcblxyXG4gIGVuZHNXaXRoKHN0cjogc3RyaW5nLCBzdWZmaXhlczogc3RyaW5nW10pOiBib29sZWFuIHtcclxuICAgICAgZm9yIChsZXQgaT0wOyBpPHN1ZmZpeGVzLmxlbmd0aDsgaSsrKSBcclxuICAgICAgICBpZiAoc3RyLmVuZHNXaXRoKHN1ZmZpeGVzW2ldKSkgcmV0dXJuIHRydWU7XHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvLyAxLiBPcGVuIHRoZSB2aWV3XHJcbiAgYXN5bmMgb25PcGVuKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJPcGVuaW5nIEdyYWRlQm94Vmlld1wiKTtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMpO1xyXG5cclxuICAgIHRoaXMucGx1Z2luLmdyYWRlQm94VmlldyA9IHRoaXM7XHJcblxyXG4gICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmNvbnRhaW5lckVsLmNoaWxkcmVuWzFdO1xyXG4gICAgdGhpcy5jb250YWluZXIuZW1wdHkoKTtcclxuICAgIHRoaXMuY29udGFpbmVyLmFkZENsYXNzKFwiY2xhc3Mtc3R5bGVcIik7XHJcbiBcclxuICAgICAgaWYgKG5ldyBFbWFpbGVyKCkuZW1haWxXb3Jrcykge1xyXG4gICAgdGhpcy5hZGRBY3Rpb24oXCJsdWNpZGUtbWFpbFwiLCBcIm1haWxcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBuZXcgRW1haWxlck1vZGFsKHRoaXMuYXBwLCB0aGlzLnBsdWdpbi5zZXR0aW5ncywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgYXN5bmMgKG1lc3NhZ2U6IHN0cmluZywgZnJvbTogc3RyaW5nLCBhZGRyZXNzOiBzdHJpbmcsIHN1YmplY3Q6IHN0cmluZywgaW5jbHVkZVNjb3JlczogYm9vbGVhbiwgZmlsZXNEaXI6IEZpbGVMaXN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFkZHJlc3MgPT0gXCIjY2xhc3NcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gbmV3IFByb2dyZXNzKHRoaXMucGx1Z2luLCBgU2VuZGluZyBlbWFpbGAsIFwiR3JhZGVCb3ggaXMgYSBwbHVnaW4gZm9yIE9ic2lkaWFuIEJ1ZGR5XCIsIFwiQWxsIGVtYWlsIG1lc3NhZ2VzIHNlbnQuXCIsIHRoaXMuZ3JhZGVTZXQuZ2V0U3R1ZGVudHMoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy5vcGVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZW5kaW5nRGVsYXkgPSBwYXJzZUludCh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWxheSkqMTAwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbWFwaG9yZSA9IG5ldyBTZW1hcGhvcmUoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYWRlU2V0LnN0dWRlbnRzLmZvckVhY2goIChzdHVkOiBTdHVkZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbWFwaG9yZS5jYWxsRnVuY3Rpb24oIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW1haWwgPSBuZXcgRW1haWxlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlc0RpciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGxhc3QgbmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxuYW1lID0gc3R1ZC5kYXRhLmdldChcIm5hbWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG5hbWUuY29udGFpbnMoJywnKSkgbG5hbWUgPSBsbmFtZS5zdWJzdHJpbmcoMCwgbG5hbWUuaW5kZXhPZignLCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsbmFtZS5jb250YWlucygnICcpKSBsbmFtZSA9IGxuYW1lLnN1YnN0cmluZyhsbmFtZS5pbmRleE9mKCcgJykrMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsbmFtZSA9IGxuYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxuYW1lID0gXCIrbG5hbWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDsgaSA8IGZpbGVzRGlyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuZHNXaXRoKGZpbGVzRGlyLml0ZW0oaSkubmFtZSwgdGhpcy5maWxldHlwZXMpICAmJiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZXNEaXIuaXRlbShpKS5uYW1lLnN0YXJ0c1dpdGgobG5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1haWwuYWRkQXR0YWNobWVudChmaWxlc0Rpci5pdGVtKGkpLnBhdGgsIGZpbGVzRGlyLml0ZW0oaSkubmFtZSwgXCJhcHBsaWNhdGlvbi9wZGZcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IChuZXcgVGVtcGxhdGUodGhpcy5ncmFkZVNldCkpLnByb2Nlc3MobWVzc2FnZSwgc3R1ZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgZW1haWwuc2VuZG1haWwoc3R1ZC5kYXRhLmdldChcImVtYWlsYWRkcmVzc1wiKSwgZnJvbSwgc3ViamVjdCwgbWVzc2FnZSwgdGhpcy5wbHVnaW4uc2V0dGluZ3MsIGNvbnNvbGUubG9nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBVdGlsaXRpZXMuc2xlZXAoc2VuZGluZ0RlbGF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy51cGRhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbWFpbCA9IG5ldyBFbWFpbGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhmaWxlc0Rpcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZXNEaXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7IGkgPCBmaWxlc0Rpci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW5kc1dpdGgoZmlsZXNEaXIuaXRlbShpKS5uYW1lLCB0aGlzLmZpbGV0eXBlcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWFpbC5hZGRBdHRhY2htZW50KGZpbGVzRGlyLml0ZW0oaSkucGF0aCwgZmlsZXNEaXIuaXRlbShpKS5uYW1lLCBcImFwcGxpY2F0aW9uL3BkZlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0dWQgPSB0aGlzLmdyYWRlU2V0LmdldFN0dWRlbnQoe2VtYWlsYWRkcmVzczogYWRkcmVzc30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0dWQgIT09IHVuZGVmaW5lZCkgbWVzc2FnZSA9IChuZXcgVGVtcGxhdGUodGhpcy5ncmFkZVNldCkpLnByb2Nlc3MobWVzc2FnZSwgc3R1ZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWFpbC5zZW5kbWFpbChhZGRyZXNzLCBmcm9tLCBzdWJqZWN0LCBtZXNzYWdlLCB0aGlzLnBsdWdpbi5zZXR0aW5ncywgY29uc29sZS5sb2cpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICkub3BlbigpO1xyXG4gICAgfSlcclxuICAgIH1cclxuICAgIHRoaXMuYWRkQWN0aW9uKFwibHVjaWRlLXNpZ25hbFwiLCBcInNvcnRcIiwgKGU6IE1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgbGV0IHNvcnRNZW51ID0gbmV3IE1lbnUoKTtcclxuICAgICAgc29ydE1lbnUuYWRkSXRlbSggKGl0ZW0pID0+IHtcclxuICAgICAgICBpdGVtLnNldFRpdGxlKFwiTmFtZSBBc2NlbmRpbmdcIilcclxuICAgICAgICAgIC5zZXRJY29uKFwibHVjaWRlLXNvcnQtYXNjZW5kaW5nXCIpXHJcbiAgICAgICAgICAub25DbGljayggKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdyYWRlU2V0LnNldFNvcnRNZXRob2QodGhpcy5ncmFkZVNldC5zdHVkZW50TmFtZXNBc2NlbmRpbmcpO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICBzb3J0TWVudS5hZGRJdGVtKCAoaXRlbSkgPT4ge1xyXG4gICAgICAgIGl0ZW0uc2V0VGl0bGUoXCJOYW1lIERlc2NlbmRpbmdcIilcclxuICAgICAgICAgIC5zZXRJY29uKFwibHVjaWRlLXNvcnQtYXNjZW5kaW5nXCIpXHJcbiAgICAgICAgICAub25DbGljayggKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdyYWRlU2V0LnNldFNvcnRNZXRob2QodGhpcy5ncmFkZVNldC5zdHVkZW50TmFtZXNEZXNjZW5kaW5nKTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5KCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgc29ydE1lbnUuYWRkSXRlbSggKGl0ZW0pID0+IHtcclxuICAgICAgICBpdGVtLnNldFRpdGxlKFwiU2NvcmUgQXNjZW5kaW5nXCIpXHJcbiAgICAgICAgICAuc2V0SWNvbihcImx1Y2lkZS1zb3J0LWFzY2VuZGluZ1wiKVxyXG4gICAgICAgICAgLm9uQ2xpY2soICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ncmFkZVNldC5zZXRTb3J0TWV0aG9kKHRoaXMuZ3JhZGVTZXQuc3R1ZGVudFNjb3Jlc0FzY2VuZGluZyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIHNvcnRNZW51LmFkZEl0ZW0oIChpdGVtKSA9PiB7XHJcbiAgICAgICAgaXRlbS5zZXRUaXRsZShcIlNjb3JlIERlc2NlbmRpbmdcIilcclxuICAgICAgICAgIC5zZXRJY29uKFwibHVjaWRlLXNvcnQtYXNjZW5kaW5nXCIpXHJcbiAgICAgICAgICAub25DbGljayggKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdyYWRlU2V0LnNldFNvcnRNZXRob2QodGhpcy5ncmFkZVNldC5zdHVkZW50U2NvcmVzRGVzY2VuZGluZyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc29ydE1lbnUuc2hvd0F0TW91c2VFdmVudChlKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5hZGRBY3Rpb24oXCJsdWNpZGUtcGFsZXR0ZVwiLCBcImNvbG9yaXplXCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgdGhpcy5jb2xvcml6ZWQgPSAhdGhpcy5jb2xvcml6ZWQ7XHJcbiAgICAgIHRoaXMuZGlzcGxheSgpO1xyXG4gICAgfSlcclxuICAgIHRoaXMuYWRkQWN0aW9uKFwibHVjaWRlLXBsdXMtY2lyY2xlXCIsIFwiQWRkIGEgc2NvcmVcIiwgKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5ncmFkZVNldC5jYXRlZ29yaWVzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgbmV3IEFsZXJ0KHRoaXMucGx1Z2luLCBcIk5vIENhdGVnb3JpZXNcIiwgXCJZb3UgbXVzdCBmaXJzdCBjcmVhdGUgYSBjYXRlZ29yeSBiZWZvcmUgYWRkaW5nIGEgc2NvcmUuXCIpLm9wZW4oKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHRcdCAgbmV3IE5ld1Njb3JlTW9kYWwodGhpcy5hcHAsIHRoaXMuZ3JhZGVTZXQsICgpID0+IHtcclxuICAgICAgICB0aGlzLmdyYWRlU2V0LndyaXRlR3JhZGVTZXQoKVxyXG4gICAgICAgIHRoaXMuZGlzcGxheSgpO1xyXG4gICAgICB9KS5vcGVuKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYWRkQWN0aW9uKFwibHVjaWRlLWNhbGVuZGFyLXBsdXNcIiwgXCJBZGQgYW4gYWJzZW5jZVwiLCAoKSA9PiB7XHJcblx0XHQgIG5ldyBBZGRBYnNlbmNlTW9kYWwodGhpcy5hcHAsIHRoaXMuZ3JhZGVTZXQsIChhYnNlbmNlczogRGF0ZVtdKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmdyYWRlU2V0LmFkZEFic2VuY2VzKGFic2VuY2VzKTtcclxuICAgICAgICAgIHRoaXMuZ3JhZGVTZXQud3JpdGVHcmFkZVNldCgpO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5KCk7XHJcbiAgICAgIH0pLm9wZW4oKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5hZGRBY3Rpb24oXCJsdWNpZGUtY2FsY3VsYXRvclwiLCBcIkFkZCBhIGNvdW50ZXJcIiwgKCkgPT4ge1xyXG5cdFx0ICBuZXcgTmV3Q291bnRlck1vZGFsKHRoaXMuYXBwLCB0aGlzLmdyYWRlU2V0LCAoY291bnRlcjogQ291bnRlcikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5ncmFkZVNldC5hZGRDb3VudGVyKGNvdW50ZXIpO1xyXG4gICAgICAgICAgdGhpcy5ncmFkZVNldC53cml0ZUdyYWRlU2V0KCk7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcclxuICAgICAgfSkub3BlbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5ncmFkZVNldCA9ICh0aGlzLnBsdWdpbiAhPT0gdW5kZWZpbmVkKSA/IHRoaXMucGx1Z2luLmdyYWRlU2V0IDogbnVsbDtcclxuICAgIGlmICh0aGlzLmdyYWRlU2V0ID09IHVuZGVmaW5lZCB8fCB0aGlzLmdyYWRlU2V0ID09IG51bGwpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SOiBHcmFkZVNldCBpcyB1bmRlZmluZWQsIGNsb3NpbmcgR0JWXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGx1Z2luKTtcclxuICAgICAgICB0aGlzLm9uQ2xvc2UoKTsgIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5kaXNwbGF5VGV4dCA9IHRoaXMuZ3JhZGVTZXQucHJvcGVydGllcy5nZXQoXCJ0aXRsZVwiKTtcclxuXHJcbiAgICAgIHRoaXMucGx1Z2luLnJlZ2lzdGVyRXZlbnQoXHJcbiAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLm9uKFwicmVzaXplXCIsICgpID0+IHtcclxuICAgICAgICAgICBsZXQgbmV3d2lkdGggPSB0aGlzLmNvbnRhaW5lckVsLndpbi5pbm5lcldpZHRoO1xyXG4gICAgICAgICAgIC8vY29uc29sZS5sb2coXCJSRVNJWkUgRVZFTlQ6IFwiK25ld3dpZHRoK1wiICYgXCIrd2lkdGgpO1xyXG4gICAgICAgICAgIGlmIChNYXRoLmFicyhuZXd3aWR0aC13aWR0aCkgPiAzMDApIHtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuZW1wdHkoKTtcclxuICAgICAgICAgICAgY29uc3QgZGl2ID0gdGhpcy5jb250YWluZXIuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwidmlldy1zdHlsZVwiIH0pO1xyXG4gICAgICAgICAgICBuZXd3aWR0aCA9IHRoaXMuY29udGFpbmVyRWwud2luLmlubmVyV2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JhZGVTZXQuZGlzcGxheShkaXYsIG5ld3dpZHRoKTtcclxuICAgICAgICAgICAgd2lkdGggPSBuZXd3aWR0aDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgXHJcbiAgICAgIHRoaXMucGx1Z2luLnJlZ2lzdGVyRXZlbnQoXHJcbiAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLm9uKFwiYWN0aXZlLWxlYWYtY2hhbmdlXCIsICgpID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLmdyYWRlU2V0ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5ncmFkZVNldC5tb2RpZmllZCkgdGhpcy5kaXNwbGF5KCk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBjb25zdCBkaXYgPSB0aGlzLmNvbnRhaW5lci5jcmVhdGVFbChcImRpdlwiLCB7IGNsczogXCJ2aWV3LXN0eWxlXCIgfSk7XHJcblxyXG4gICAgICAgIGxldCB3aWR0aCA9IHRoaXMuY29udGFpbmVyRWwud2luLmlubmVyV2lkdGg7ICAgIFxyXG4gICAgICAgIHRoaXMuc3RhdHVzYmFyRWxlbWVudCA9IHRoaXMucGx1Z2luLmFkZFN0YXR1c0Jhckl0ZW0oKVxyXG5cclxuICAgICAgICBpZiAodGhpcy5ncmFkZVNldCAhPSBudWxsKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXlUZXh0ID0gdGhpcy5ncmFkZVNldC50aXRsZTtcclxuICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xyXG4gICAgICAgICAgdGhpcy5zdGF0dXNiYXJFbGVtZW50LnNldFRleHQoXCJcIit0aGlzLmdyYWRlU2V0LmdldFN0dWRlbnRzKCkrXCIgc3R1ZGVudHNcIik7ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLndoZW5Ub0dlbmVyYXRlID09IFwib3BlblwiKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJHZW5lcmF0aW5nIHdlYiBzZXJ2ZXIgWE1MXCIpO1xyXG4gICAgICAgIGxldCBmaWxlbmFtZSA9IHRoaXMucGx1Z2luLnNldHRpbmdzLlhNTGZpbGVuYW1lO1xyXG4gICAgICAgIGlmIChmaWxlbmFtZS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAvL25ldyBBbGVydCh0aGlzLnBsdWdpbiwgXCJObyBGaWxlbmFtZVwiLCBcIk5vIFhNTCBmaWxlbmFtZSBzcGVjaWZpZWQgaW4gc2V0dGluZ3NcIikub3BlbigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBvZ2ZpbGVuYW1lID0gZmlsZW5hbWU7XHJcbiAgICAgICAgbGV0IHBvcyA9IGZpbGVuYW1lLmxhc3RJbmRleE9mKFwiL1wiKTtcclxuICAgICAgICBsZXQgcGF0aCA9IG51bGw7XHJcbiAgICAgICAgaWYgKHBvcyA+PSAwKSB7XHJcbiAgICAgICAgICBwYXRoID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGZpbGVuYW1lLnN1YnN0cmluZygwLCBwb3MpKTtcclxuICAgICAgICAgIGZpbGVuYW1lID0gZmlsZW5hbWUuc3Vic3RyaW5nKHBvcysxKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcGF0aCA9IHRoaXMuYXBwLnZhdWx0LmdldFJvb3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKFV0aWxpdGllcy5maWxlRXhpc3RzKGZpbGVuYW1lLCBwYXRoIGFzIFRGb2xkZXIpKSB7IFxyXG4gICAgICAgICAgbGV0IHRhZiA9IHRoaXMuYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChvZ2ZpbGVuYW1lKSBhcyBURmlsZTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiVHJ5aW5nIHRvIGRlbGV0ZSBcIit0YWYucGF0aClcclxuICAgICAgICAgIGlmICh0YWYgIT09IHVuZGVmaW5lZCkgYXdhaXQgdGhpcy5hcHAudmF1bHQuZGVsZXRlKHRhZik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB4bWwgPSB0aGlzLmdyYWRlU2V0LmdlbmVyYXRlWE1MRm9yV2ViU2VydmVyKCk7XHJcbiAgICAgICAgY29uc3QgeG1sRmlsZTogVEZpbGUgPSBhd2FpdCAoXHJcbiAgICAgICAgICBhcHAuZmlsZU1hbmFnZXIgYXMgYW55XHJcbiAgICAgICAgICApLmNyZWF0ZU5ld01hcmtkb3duRmlsZShhcHAud29ya3NwYWNlLmdldEFjdGl2ZUZpbGUoKT8ucGF0aCwgb2dmaWxlbmFtZSk7XHJcbiAgICAgICAgdGhpcy5hcHAudmF1bHQubW9kaWZ5KHhtbEZpbGUsIHhtbCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJlbWluZGVyc1xyXG4gICAgICBpZiAodGhpcy5ncmFkZVNldCAhPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5ncmFkZVNldC5yZW1pbmRlcnMuZm9yRWFjaCggKHJlbWluZGVyOiBSZW1pbmRlcikgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJDaGVja2luZyByZW1pbmRlcjogXCIrcmVtaW5kZXIudGV4dCk7XHJcbiAgICAgICAgICBpZiAocmVtaW5kZXIuaXNUcmlnZ2VyZWQoKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlbWluZGVyIHRyaWdnZXJlZDogXCIrcmVtaW5kZXIudGV4dCk7XHJcbiAgICAgICAgICAgIG5ldyBSZW1pbmRlclBvcHVwKHRoaXMucGx1Z2luLCByZW1pbmRlciwgKHJlbTogUmVtaW5kZXIpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmdyYWRlU2V0LmRlbGV0ZVJlbWluZGVyKHJlbSk7XHJcbiAgICAgICAgICAgICAgaWYgKHJlbS5yZXBlYXQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZW0ucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ3JhZGVTZXQuYWRkUmVtaW5kZXIocmVtKTtcclxuICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB9KS5vcGVuKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIFxyXG4gIH1cclxuXHJcbiAgYXN5bmMgb25DbG9zZSgpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiQ2xvc2luZyBHcmFkZUJveFZpZXdcIik7XHJcbiAgICBpZiAodGhpcy5ncmFkZVNldCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiTU9ESUZJRUQ6IFwiK3RoaXMuZ3JhZGVTZXQubW9kaWZpZWQpO1xyXG4gICAgICBpZiAodGhpcy5ncmFkZVNldC5tb2RpZmllZCkgdGhpcy5ncmFkZVNldC53cml0ZUdyYWRlU2V0KCk7XHJcbiAgICAgIHRoaXMuc3RhdHVzYmFyRWxlbWVudC5zZXRUZXh0KFwiXCIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hcHAud29ya3NwYWNlLmRldGFjaExlYXZlc09mVHlwZShWSUVXX1RZUEVfU1RVREVOVCk7XHJcbiAgICB0aGlzLmFwcC53b3Jrc3BhY2UuZGV0YWNoTGVhdmVzT2ZUeXBlKFZJRVdfVFlQRV9HUkFERVNFVF9TVU1NQVJZKTtcclxuICAgIHRoaXMuYXBwLndvcmtzcGFjZS5kZXRhY2hMZWF2ZXNPZlR5cGUoVklFV19UWVBFX0dSQURFQk9YKTtcclxuXHJcbiAgICBpZiAodGhpcy5ncmFkZVNldCA9PSB1bmRlZmluZWQpIHJldHVybjtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIldIRU4gVE8gR0VORVJBVEU6IFwiK3RoaXMucGx1Z2luLnNldHRpbmdzLndoZW5Ub0dlbmVyYXRlKTtcclxuICAgIGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy53aGVuVG9HZW5lcmF0ZSA9PSBcImNsb3NlXCIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJHZW5lcmF0aW5nIHdlYiBzZXJ2ZXIgWE1MXCIpO1xyXG4gICAgICBsZXQgZmlsZW5hbWUgPSB0aGlzLmdyYWRlU2V0LnByb3BlcnRpZXMuZ2V0KFwid2ViZmlsZVwiKTtcclxuICAgICAgaWYgKGZpbGVuYW1lID09IHVuZGVmaW5lZCB8fCBmaWxlbmFtZS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgLy9uZXcgQWxlcnQodGhpcy5wbHVnaW4sIFwiTm8gRmlsZW5hbWVcIiwgXCJObyBXZWIgZmlsZW5hbWUgc3BlY2lmaWVkIGluIHNldHRpbmdzXCIpLm9wZW4oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBsZXQgb2dmaWxlbmFtZSA9IGZpbGVuYW1lO1xyXG4gICAgICBsZXQgcG9zID0gZmlsZW5hbWUubGFzdEluZGV4T2YoXCIvXCIpO1xyXG4gICAgICBsZXQgcGF0aCA9IG51bGw7XHJcbiAgICAgIGlmIChwb3MgPj0gMCkge1xyXG4gICAgICAgIHBhdGggPSB0aGlzLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoZmlsZW5hbWUuc3Vic3RyaW5nKDAsIHBvcykpO1xyXG4gICAgICAgIGZpbGVuYW1lID0gZmlsZW5hbWUuc3Vic3RyaW5nKHBvcysxKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwYXRoID0gdGhpcy5hcHAudmF1bHQuZ2V0Um9vdCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChVdGlsaXRpZXMuZmlsZUV4aXN0cyhmaWxlbmFtZSwgcGF0aCBhcyBURm9sZGVyKSkgeyBcclxuICAgICAgICBsZXQgdGFmID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKG9nZmlsZW5hbWUpIGFzIFRGaWxlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVHJ5aW5nIHRvIGRlbGV0ZSBcIit0YWYucGF0aClcclxuICAgICAgICBpZiAodGFmICE9PSB1bmRlZmluZWQpIGF3YWl0IHRoaXMuYXBwLnZhdWx0LmRlbGV0ZSh0YWYpO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCB4bWwgPSB0aGlzLmdyYWRlU2V0LmdlbmVyYXRlWE1MRm9yV2ViU2VydmVyKCk7XHJcbiAgICAgIGNvbnN0IHhtbEZpbGU6IFRGaWxlID0gYXdhaXQgKFxyXG4gICAgICAgIGFwcC5maWxlTWFuYWdlciBhcyBhbnlcclxuICAgICAgICApLmNyZWF0ZU5ld01hcmtkb3duRmlsZShhcHAud29ya3NwYWNlLmdldEFjdGl2ZUZpbGUoKT8ucGF0aCwgb2dmaWxlbmFtZSk7XHJcbiAgICAgIHRoaXMuYXBwLnZhdWx0Lm1vZGlmeSh4bWxGaWxlLCB4bWwpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIGFzeW5jIENTVmltcG9ydChyZW50OiBHcmFkZWJveFZpZXcsIGdzOiBHcmFkZVNldCwgZmlsZTogc3RyaW5nKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIlVTSU5HIFwiK2ZpbGUrXCIgRk9SIElNUE9SVCwgQ29tcGFyaW5nIHRvIFwiK3RoaXMuYXBwLnZhdWx0LmFkYXB0ZXIuYmFzZVBhdGgpO1xyXG4gICAgLy8gUHJvY2Vzc1xyXG4gICAgbGV0IHBvcyA9IGZpbGUuaW5kZXhPZih0aGlzLmFwcC52YXVsdC5hZGFwdGVyLmJhc2VQYXRoKTtcclxuICAgIGlmIChwb3MgPCAwKSB7XHJcbiAgICAgIG5ldyBBbGVydChyZW50LnBsdWdpbiwgXCJFcnJvclwiLCBcIllvdSBtdXN0IGNob29zZSBhIGZpbGUgaW4gdGhlIHZhdWx0XCIpLm9wZW4oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZmlsZSA9IGZpbGUucmVwbGFjZSh0aGlzLmFwcC52YXVsdC5hZGFwdGVyLmJhc2VQYXRoK1wiXFxcXFwiLCBcIlwiKTtcclxuICAgIH1cclxuICAgIGZpbGUgPSBmaWxlLnJlcGxhY2UoL1xcXFwvZywgXCIvXCIpO1xyXG4gICAgY29uc29sZS5sb2coZmlsZSk7XHJcbiAgICBsZXQgdGZpbGUgPSB0aGlzLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoZmlsZSkgYXMgVEZpbGU7XHJcbiAgICBjb25zb2xlLmxvZyh0ZmlsZSk7XHJcbiAgICBsZXQgY3N2ZGF0YSA9IGF3YWl0IGFwcC52YXVsdC5yZWFkKCB0ZmlsZSApO1xyXG4gICAgY29uc29sZS5sb2coY3N2ZGF0YSk7XHJcbiAgICAvLyBsZXQgY3N2ZGF0YSA9IFxyXG4gICAgLy8gICAgICdcImppcHBpbmcsIE1pa2VcIiwgXCIwMTAxMDEwMVwiLCBcImppcHBpbmdAaG9wZS5lZHVcIiwgMjQsIDQyLCA1LjEsIEhlbGxvXFxuJyArXHJcbiAgICAvLyAgICAgJ1wiU2hhdG5lciwgV2lsbGlhbVwiLCBcIjAwMDExMTAwMVwiLCBcImtpcmtAZW50ZXJwcmlzZS5vcmdcIiwgMjIsMjIsNi4wLCBHbyc7XHJcbiAgICBjb25zdCBvYmpQYXR0ZXJuID0gbmV3IFJlZ0V4cCgoXCIoXFxcXCx8XFxcXHI/XFxcXG58XFxcXHJ8XikoPzpcXFwiKFteXFxcIl0qKD86XFxcIlxcXCJbXlxcXCJdKikqKVxcXCJ8KFteXFxcXCxcXFxcclxcXFxuXSopKVwiKSxcImdpXCIpO1xyXG4gICAgbGV0IGFyck1hdGNoZXMgPSBudWxsLCBhcnJEYXRhOiBzdHJpbmdbXVtdID0gW1tdXTtcclxuICAgIHdoaWxlIChhcnJNYXRjaGVzID0gb2JqUGF0dGVybi5leGVjKGNzdmRhdGEpKXtcclxuICAgICAgICBpZiAoYXJyTWF0Y2hlc1sxXS5sZW5ndGggJiYgYXJyTWF0Y2hlc1sxXSAhPT0gXCIsXCIpYXJyRGF0YS5wdXNoKFtdKTtcclxuICAgICAgICBhcnJEYXRhW2FyckRhdGEubGVuZ3RoIC0gMV0ucHVzaChhcnJNYXRjaGVzWzJdID8gXHJcbiAgICAgICAgICAgIGFyck1hdGNoZXNbMl0ucmVwbGFjZShuZXcgUmVnRXhwKCBcIlxcXCJcXFwiXCIsIFwiZ1wiICksIFwiXFxcIlwiKSA6XHJcbiAgICAgICAgICAgIGFyck1hdGNoZXNbM10pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENob29zZSBmaWVsZHNcclxuICAgIC8vIEJ1aWxkIGEgbW9kYWwsIFxyXG4gICAgbGV0IGZpZWxkTW9kYWwgPSBuZXcgTW9kYWwodGhpcy5hcHApO1xyXG4gICAgbGV0IHtjb250ZW50RWx9ID0gZmllbGRNb2RhbDtcclxuXHRcdFxyXG5cdFx0Y29udGVudEVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiAnQ2hvb3NlIGZpZWxkcyB0byBpbXBvcnQnIH0pO1xyXG5cclxuICAgIGxldCBzZXR0aW5nOiBTZXR0aW5nW10gPSBbXTtcclxuICAgIGxldCBwb3NpdGlvbnMgPSB7fTtcclxuICAgIGxldCBjb2x1bW4gPSAwO1xyXG4gICAgYXJyRGF0YVswXS5mb3JFYWNoKCAobGluZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHNldHRpbmdbY29sdW1uXSA9IFxyXG4gICAgICBuZXcgU2V0dGluZyhjb250ZW50RWwpIFxyXG5cdFx0XHQuc2V0TmFtZShsaW5lKVxyXG5cdFx0XHQuYWRkRHJvcGRvd24odGV4dCA9PiB0ZXh0XHJcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBwb3NpdGlvbnNbdmFsdWVdID0gY29sdW1uO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LmFkZE9wdGlvbihcImlnbm9yZWRcIiwgXCJpZ25vcmVkXCIpXHJcblx0XHRcdFx0LmFkZE9wdGlvbihcImZpcnN0IG5hbWVcIiwgXCJmaXJzdCBuYW1lXCIpXHJcblx0XHRcdFx0LmFkZE9wdGlvbihcImxhc3QgbmFtZVwiLCBcImxhc3QgbmFtZVwiKVxyXG5cdFx0XHRcdC5hZGRPcHRpb24oXCJmdWxsIG5hbWVcIiwgXCJmdWxsIG5hbWVcIilcclxuXHRcdFx0XHQuYWRkT3B0aW9uKFwiSURcIiwgXCJJRFwiKVxyXG5cdFx0XHRcdC5hZGRPcHRpb24oXCJlbWFpbCBhZGRyZXNzXCIsIFwiZW1haWwgYWRkcmVzc1wiKVxyXG5cdFx0XHRcdC5zZXRWYWx1ZShcImlnbm9yZWRcIilcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbHVtbiArKztcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBuZXcgU2V0dGluZyhjb250ZW50RWwpXHJcbiAgICAgICAgLmFkZEJ1dHRvbigoYnRuKSA9PlxyXG4gICAgICAgIGJ0blxyXG4gICAgICAgICAgLnNldEJ1dHRvblRleHQoXCJJbXBvcnRcIilcclxuICAgICAgICAgIC5zZXRDdGEoKVxyXG4gICAgICAgICAgLm9uQ2xpY2soKCkgPT4ge1xyXG4gICAgICAgICAgICBmaWVsZE1vZGFsLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIC8vIHNldCB1cCBwb3NpdGlvbnNcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZXR0aW5nLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgbGV0IHZhbDogc3RyaW5nID0gc2V0dGluZ1tpXS5jb21wb25lbnRzWzBdLmdldFZhbHVlKCk7XHJcbiAgICAgICAgICAgICAgaWYgKHZhbCAhPT0gXCJpZ25vcmVkXCIpIHBvc2l0aW9uc1t2YWxdID0gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLy8vIHBhcnNlIC8gaW1wb3J0IHRoZSBmaWxlXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cocG9zaXRpb25zKTtcclxuICAgICAgICAgICAgYXJyRGF0YS5mb3JFYWNoKCBhc3luYyAobGluZTogc3RyaW5nW10pID0+IHtcclxuICAgICAgICAgICAgICBsZXQgc3R1ZCA9IG5ldyBTdHVkZW50KG51bGwpO1xyXG4gICAgICAgICAgICAgIGxldCBzbmFtZSA9IGxpbmVbcG9zaXRpb25zW1wiZnVsbCBuYW1lXCJdXTtcclxuICAgICAgICAgICAgICBpZiAoc25hbWUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBzbmFtZSA9IGxpbmVbcG9zaXRpb25zW1wibGFzdCBuYW1lXCJdXSArIFwiLCBcIiArIGxpbmVbcG9zaXRpb25zW1wiZmlyc3QgbmFtZVwiXV07XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHN0dWQuZGF0YS5zZXQoXCJuYW1lXCIsIHNuYW1lLnJlcGxhY2VBbGwoJ1wiJywgJycpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgc3R1ZC5kYXRhLnNldChcImlkXCIsIGxpbmVbcG9zaXRpb25zW1wiSURcIl1dLnJlcGxhY2VBbGwoJ1wiJywgJycpLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgaWYgKGxpbmVbcG9zaXRpb25zW1wiZW1haWwgYWRkcmVzc1wiXV0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBzdHVkLmRhdGEuc2V0KFwiZW1haWxhZGRyZXNzXCIsIHN0dWQuZGF0YS5nZXQoXCJlbWFpbGFkZHJlc3NcIikucmVwbGFjZUFsbCgnXCInLCAnJykudHJpbSgpKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgc3R1ZC5kYXRhLnNldChcImltYWdlXCIsIFwiaHR0cHM6Ly9wbHVzLmhvcGUuZWR1L1Bob3Rvcy8wMDBcIitsaW5lW3Bvc2l0aW9uc1tcIklEXCJdXS5yZXBsYWNlQWxsKCdcIicsICcnKS50cmltKCkrJy5qcGcnKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzdHVkKTtcclxuXHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZ3Muc291cmNlRm9sZGVyKTtcclxuICAgICAgICAgICAgICBjb25zdCBzdHVkZW50RmlsZTogVEZpbGUgPSBhd2FpdCAoXHJcbiAgICAgICAgICAgICAgICBhcHAuZmlsZU1hbmFnZXIgYXMgYW55XHJcbiAgICAgICAgICAgICAgICApLmNyZWF0ZU5ld01hcmtkb3duRmlsZShncy5zb3VyY2VGb2xkZXIsIHN0dWQuZGF0YS5nZXQoXCJpZFwiKSk7XHJcbiAgICAgICAgICAgICAgdmFyIGRhdGFzdHIgPSBcIiNuYW1lIFwiK3N0dWQuZGF0YS5nZXQoXCJuYW1lXCIpK1wiXFxuXCIrXHJcbiAgICAgICAgICAgICAgICAgXCIjaWQgXCIrc3R1ZC5kYXRhLmdldChcImlkXCIpK1wiXFxuXCI7XHJcbiAgICAgICAgICAgICAgaWYgKHN0dWQuZGF0YS5nZXQoXCJuaWNrbmFtZVwiKSAhPT0gdW5kZWZpbmVkKSBcclxuICAgICAgICAgICAgICAgICBkYXRhc3RyICs9IFwiI25pY2tuYW1lIFwiK3N0dWQuZGF0YS5nZXQoXCJuaWNrbmFtZVwiKStcIlxcblwiO1xyXG4gICAgICAgICAgICAgIGlmIChzdHVkLmRhdGEuZ2V0KFwiZW1haWxhZGRyZXNzXCIpICE9PSB1bmRlZmluZWQpIFxyXG4gICAgICAgICAgICAgICAgIGRhdGFzdHIgKz0gXCIjZW1haWxhZGRyZXNzIFwiK3N0dWQuZGF0YS5nZXQoXCJlbWFpbGFkZHJlc3NcIikrXCJcXG5cIjtcclxuICAgICAgICAgICAgICBpZiAoc3R1ZC5kYXRhLmdldChcIm1vYmlsZVBob25lTnVtYmVyXCIpICE9PSB1bmRlZmluZWQpIFxyXG4gICAgICAgICAgICAgICAgIGRhdGFzdHIgKz0gXCIjbW9iaWxlUGhvbmVOdW1iZXIgXCIrc3R1ZC5kYXRhLmdldChcIm1vYmlsZVBob25lTnVtYmVyXCIpK1wiXFxuXCI7ICBcclxuICAgICAgICAgICAgICBpZiAoc3R1ZC5kYXRhLmdldChcImltYWdlXCIpICE9PSB1bmRlZmluZWQpIFxyXG4gICAgICAgICAgICAgICAgIGRhdGFzdHIgKz0gXCIjaW1hZ2UgXCIrc3R1ZC5kYXRhLmdldChcImltYWdlXCIpK1wiXFxuXCI7ICBcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhc3RyKSAgICAgIFxyXG4gICAgICAgICAgICAgIGFwcC52YXVsdC5hcHBlbmQoc3R1ZGVudEZpbGUsIGRhdGFzdHIpO1xyXG4gICAgICAgICAgICAgIHN0dWQuc2V0U291cmNlRmlsZShzdHVkZW50RmlsZSk7XHJcbiAgICAgICAgICAgICAgZ3MuYWRkU3R1ZGVudChzdHVkKTtcclxuICAgICAgICAgICAgfSApO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcclxuICAgICAgfSkpO1xyXG5cclxuICAgIGZpZWxkTW9kYWwub3BlbigpO1xyXG5cclxuICB9XHJcblxyXG4gIG9uUGFuZU1lbnUobWVudTogTWVudSwgc291cmNlOiBzdHJpbmcsIGNhbGxTdXBlcjogYm9vbGVhbiA9IHRydWUpIHtcclxuXHRcdGlmIChzb3VyY2UgIT09ICdtb3JlLW9wdGlvbnMnKSB7XHJcblx0XHQgIHN1cGVyLm9uUGFuZU1lbnUobWVudSwgc291cmNlKTtcclxuXHRcdCAgcmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0Ly8gQWRkIGEgbWVudSBpdGVtIHRvIGZvcmNlIHRoZSBib2FyZCB0byBtYXJrZG93biB2aWV3XHJcbiAgICBpZiAobmV3IEVtYWlsZXIoKS5lbWFpbFdvcmtzKSB7XHJcbiAgICAgIG1lbnVcclxuICAgIC5hZGRJdGVtKChpdGVtKSA9PiB7XHJcbiAgICBpdGVtXHJcbiAgICAgIC5zZXRUaXRsZSgnRW1haWwgc3R1ZGVudCBzY29yZXMnKVxyXG4gICAgICAuc2V0SWNvbignbHVjaWRlLWZpbGUtdGV4dCcpXHJcbiAgICAgIC5zZXRTZWN0aW9uKCdwYW5lJylcclxuICAgICAgLm9uQ2xpY2soIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIGxldCB0ZW1wbGF0ZSA9IHRoaXMucGx1Z2luLnNldHRpbmdzLnRlbXBsYXRlO1xyXG4gICAgICAgICAgaWYgKHRlbXBsYXRlICE9PSB1bmRlZmluZWQgJiYgdGVtcGxhdGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gdGVtcGxhdGUuaW5kZXhPZih0aGlzLmFwcC52YXVsdC5hZGFwdGVyLmJhc2VQYXRoKTtcclxuICAgICAgICAgICAgaWYgKHBvcyA+PSAwKSB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UodGhpcy5hcHAudmF1bHQuYWRhcHRlci5iYXNlUGF0aCtcIlxcXFxcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZSgvXFxcXC9nLCBcIi9cIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRlbXBsYXRlKTtcclxuICAgICAgICAgICAgbGV0IHRmaWxlID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKHRlbXBsYXRlKSBhcyBURmlsZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGZpbGUpO1xyXG4gICAgICAgICAgICBpZiAodGVtcGxhdGUgIT09IG51bGwpIFxyXG4gICAgICAgICAgICAgICB0ZW1wbGF0ZSA9ICBhd2FpdCBhcHAudmF1bHQucmVhZCggdGZpbGUgKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGUgPSBcIlwiO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGVtcGxhdGUgPSBcIlwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8gSGVyZSB3ZSBlbWFpbCB0aGUgc3R1ZGVudCBub3RlXHJcbiAgICAgICAgICBjb25zdCBzZW1hcGhvcmUgPSBuZXcgU2VtYXBob3JlKDEpO1xyXG4gICAgICAgICAgdGhpcy5ncmFkZVNldC5zdHVkZW50cy5mb3JFYWNoKCAoc3R1ZDogU3R1ZGVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzZW5kaW5nRGVsYXkgPSBwYXJzZUludCh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWxheSkqMTAwMDtcclxuICAgICAgICAgICAgc2VtYXBob3JlLmNhbGxGdW5jdGlvbiggYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGxldCBlbWFpbCA9IG5ldyBFbWFpbGVyKCk7XHJcbiAgICAgICAgICAgICAgbGV0IHN0dWRlbnROb3RlID0gXCJcIjtcclxuICAgICAgICAgICAgICBpZiAodGVtcGxhdGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc3R1ZGVudE5vdGUgPSAobmV3IFRlbXBsYXRlKHRoaXMuZ3JhZGVTZXQpKS5wcm9jZXNzKHRlbXBsYXRlLCBzdHVkKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3R1ZGVudE5vdGUgPSBzdHVkLmdlbmVyYXRlTWFya2Rvd24odGhpcy5ncmFkZVNldCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0dWRlbnROb3RlKTtcclxuICAgICAgICAgICAgICBsZXQgaHRtbCA9IG1hcmtkb3duKHN0dWRlbnROb3RlKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhodG1sKTtcclxuICAgICAgICAgICAgICBlbWFpbC5zZXRNZXNzYWdlSFRNTChodG1sKTsgXHJcbiAgICAgICAgICAgICAgbGV0IGR0ID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLXVzJywgeyB5ZWFyOlwibnVtZXJpY1wiLCBtb250aDpcInNob3J0XCIsIGRheTpcIm51bWVyaWNcIn0pO1xyXG4gICAgICAgICAgICAgIGxldCBzdWJqZWN0ID0gXCJZb3VyIHNjb3JlcyBpbiBcIit0aGlzLmdyYWRlU2V0LnByb3BlcnRpZXMuZ2V0KFwidGl0bGVcIikrXCIgYXMgb2YgXCIrZHQ7ICAgICAgICAgICBcclxuICAgICAgICAgICAgICBlbWFpbC5zZW5kbWFpbChzdHVkLmRhdGEuZ2V0KFwiZW1haWxhZGRyZXNzXCIpLCB0aGlzLnBsdWdpbi5zZXR0aW5ncy5mcm9tLCBzdWJqZWN0LCBcIlwiLCB0aGlzLnBsdWdpbi5zZXR0aW5ncywgY29uc29sZS5sb2cpO1xyXG4gICAgICAgICAgICAgIGF3YWl0IFV0aWxpdGllcy5zbGVlcChzZW5kaW5nRGVsYXkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuICAgIG1lbnVcclxuICAgIC5hZGRJdGVtKChpdGVtKSA9PiB7XHJcbiAgICBpdGVtXHJcbiAgICAgIC5zZXRUaXRsZSgnR2VuZXJhdGUgc2NvcmUgc2hlZXQnKVxyXG4gICAgICAuc2V0SWNvbignbHVjaWRlLWZpbGUtdGV4dCcpXHJcbiAgICAgIC5zZXRTZWN0aW9uKCdwYW5lJylcclxuICAgICAgLm9uQ2xpY2soIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIC8vIE9wZW4gYSBmaWxlIGFuZCBnZW5lcmF0ZSBtYXJrZG93biBmb3IgYSBzY29yZSBzaGVldFxyXG4gICAgICAgICAgLy9sZXQgZmlsZSA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aCh0aGlzLmdyYWRlU2V0LnNvdXJjZUZvbGRlcitcIi9cIit0aGlzLmdyYWRlU2V0LnByb3BlcnRpZXMuZ2V0KFwidGl0bGVcIikrXCJzaGVldC5tZFwiKTtcclxuICAgICAgICAgIGNvbnN0IGZpbGU6IFRGaWxlID0gYXdhaXQgKFxyXG4gICAgICAgICAgICBhcHAuZmlsZU1hbmFnZXIgYXMgYW55XHJcbiAgICAgICAgICAgICkuY3JlYXRlTmV3TWFya2Rvd25GaWxlKGFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlRmlsZSgpPy5wYXRoLCAvKnRoaXMuZ3JhZGVTZXQucHJvcGVydGllcy5nZXQoXCJ0aXRsZVwiKSovXCJzY29yZXNoZWV0Lm1kXCIpO1xyXG4gICAgICBcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGZpbGUgYXMgVEZpbGUpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBsZXQgc2hlZXQgPSBcIiMgU2NvcmUgU2hlZXQgZm9yIFwiK3RoaXMuZ3JhZGVTZXQucHJvcGVydGllcy5nZXQoXCJ0aXRsZVwiKStcIlxcblxcblwiO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBsZXQgZmlyc3QgPSBmYWxzZTtcclxuICAgICAgICAgIHNoZWV0ICs9IGB8ICB8IGA7XHJcbiAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8NzsgaSsrKSBzaGVldCArPSBcIiZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3AmbmJzcDsgfFwiO1xyXG4gICAgICAgICAgc2hlZXQgKz0gXCJcXG5cIjtcclxuICAgICAgICAgIHNoZWV0ICs9IGB8Oi0tLXw6LS0tfDotLS18Oi0tLXw6LS0tfDotLS18Oi0tLXw6LS0tfFxcbmA7XHJcbiAgICAgICAgICB0aGlzLmdyYWRlU2V0LnN0dWRlbnRzLmZvckVhY2goIChzdHVkOiBTdHVkZW50KSA9PiB7XHJcbiAgICAgICAgICAgICBzaGVldCArPSBgfCAke3N0dWQuZGF0YS5nZXQoXCJuYW1lXCIpfSB8IGA7XHJcbiAgICAgICAgICAgICBmb3IgKGxldCBpPTA7IGk8NzsgaSsrKSBzaGVldCArPSBcIiZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3AmbmJzcDsgfFwiO1xyXG4gICAgICAgICAgICAgc2hlZXQgKz0gXCJcXG5cIjtcclxuICAgICAgICAgICAgIGlmIChmaXJzdCkge1xyXG4gICAgICAgICAgICAgICAgc2hlZXQgKz0gYHw6LS0tfDotLS18Oi0tLXw6LS0tfDotLS18Oi0tLXw6LS0tfDotLS18XFxuYDtcclxuICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aGlzLmFwcC52YXVsdC5tb2RpZnkoZmlsZSwgc2hlZXQpO1xyXG4gICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIG1lbnVcclxuICAgIC5hZGRJdGVtKChpdGVtKSA9PiB7XHJcbiAgICAgIGl0ZW1cclxuICAgICAgLnNldFRpdGxlKCdHcmlkIHZpZXcnKVxyXG4gICAgICAuc2V0SWNvbignbHVjaWRlLWdyaXAnKVxyXG4gICAgICAuc2V0U2VjdGlvbigncGFuZScpXHJcbiAgICAgIC5vbkNsaWNrKCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5saXN0dmlldyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheSgpO1xyXG4gICAgICB9XHJcbiAgICApfSk7XHJcbiAgICBtZW51XHJcbiAgICAuYWRkSXRlbSgoaXRlbSkgPT4ge1xyXG4gICAgIGl0ZW1cclxuICAgICAgLnNldFRpdGxlKCdMaXN0IHZpZXcnKVxyXG4gICAgICAuc2V0SWNvbignbHVjaWRlLWxheW91dC1saXN0JylcclxuICAgICAgLnNldFNlY3Rpb24oJ3BhbmUnKVxyXG4gICAgICAub25DbGljayggYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubGlzdHZpZXcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUxpc3QoKTtcclxuICAgICAgfVxyXG4gICAgKX0pO1xyXG4gICAgbWVudVxyXG4gICAgLmFkZEl0ZW0oKGl0ZW0pID0+IHtcclxuICAgICBpdGVtXHJcbiAgICAgIC5zZXRUaXRsZSgnQWRkIGEgcmVtaW5kZXInKVxyXG4gICAgICAuc2V0SWNvbignbHVjaWRlLWxheW91dC1saXN0JylcclxuICAgICAgLnNldFNlY3Rpb24oJ3BhbmUnKVxyXG4gICAgICAub25DbGljayggYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG5ldyBOZXdSZW1pbmRlck1vZGFsKHRoaXMuYXBwLCAocmVtaW5kZXI6IFJlbWluZGVyKSA9PiB7XHJcbiAgICAgICAgICBpZiAocmVtaW5kZXIgIT09IHVuZGVmaW5lZCkgdGhpcy5ncmFkZVNldC5hZGRSZW1pbmRlcihyZW1pbmRlcik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmdyYWRlU2V0LnJlbWluZGVycyk7XHJcbiAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcclxuICAgICAgICB9KS5vcGVuKCk7XHJcbiAgICAgIH1cclxuICAgICl9KTtcclxuICAgIG1lbnVcclxuICAgIC5hZGRJdGVtKChpdGVtKSA9PiB7XHJcbiAgICAgaXRlbVxyXG4gICAgICAuc2V0VGl0bGUoJ0FkZCBhIGNhdGVnb3J5JylcclxuICAgICAgLnNldEljb24oJ2x1Y2lkZS1sYXlvdXQtbGlzdCcpXHJcbiAgICAgIC5zZXRTZWN0aW9uKCdwYW5lJylcclxuICAgICAgLm9uQ2xpY2soIGFzeW5jICgpID0+IHtcclxuICAgICAgICBuZXcgTmV3Q2F0ZWdvcnlNb2RhbCh0aGlzLmFwcCwgKGNhdGVnb3J5OiBDYXRlZ29yeSkgPT4ge1xyXG4gICAgICAgICAgaWYgKGNhdGVnb3J5ICE9PSB1bmRlZmluZWQpIHRoaXMuZ3JhZGVTZXQuYWRkQ2F0ZWdvcnkoY2F0ZWdvcnkpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy5ncmFkZVNldC5yZW1pbmRlcnMpO1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5KCk7XHJcbiAgICAgICAgfSkub3BlbigpO1xyXG4gICAgICB9XHJcbiAgICApfSk7XHJcbiAgICBtZW51XHJcbiAgICAuYWRkSXRlbSgoaXRlbSkgPT4ge1xyXG4gICAgIGl0ZW1cclxuICAgICAgLnNldFRpdGxlKCdHZW5lcmF0ZSBjbGFzcyBsaXN0JylcclxuICAgICAgLnNldEljb24oJ2x1Y2lkZS1sYXlvdXQtbGlzdCcpXHJcbiAgICAgIC5zZXRTZWN0aW9uKCdwYW5lJylcclxuICAgICAgLm9uQ2xpY2soIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIC8vIEhlcmUgd2UgZW1haWwgdGhlIHN0dWRlbnQgbm90ZVxyXG4gICAgICAgICAgY29uc3QgZmlsZTogVEZpbGUgPSBhd2FpdCAoXHJcbiAgICAgICAgICAgIGFwcC5maWxlTWFuYWdlciBhcyBhbnlcclxuICAgICAgICAgICAgKS5jcmVhdGVOZXdNYXJrZG93bkZpbGUoYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVGaWxlKCk/LnBhdGgsIC8qdGhpcy5ncmFkZVNldC5wcm9wZXJ0aWVzLmdldChcInRpdGxlXCIpKi9cImNsYXNzbGlzdC5tZFwiKTsgXHJcbiAgICAgICAgICBcclxuICAgICAgICAgIGxldCBsaXN0c3RyaW5nID0gXCIjIENsYXNzIExpc3QgZm9yIFwiK3RoaXMuZ3JhZGVTZXQucHJvcGVydGllcy5nZXQoXCJ0aXRsZVwiKStcIlxcblxcblwiO1xyXG4gICAgICAgICAgbGlzdHN0cmluZyArPSAnfCBOYW1lIHwgSUQgfCBFbWFpbCB8XFxuJ1xyXG4gICAgICAgICAgbGlzdHN0cmluZyArPSBgfDotLS18Oi0tLTp8Oi0tLXxcXG5gO1xyXG4gICAgICAgICAgdGhpcy5ncmFkZVNldC5zdHVkZW50cy5mb3JFYWNoKCAoc3R1ZDogU3R1ZGVudCkgPT4ge1xyXG4gICAgICAgICAgICBsaXN0c3RyaW5nICs9IGB8ICR7c3R1ZC5kYXRhLmdldChcIm5hbWVcIil9IGA7XHJcbiAgICAgICAgICAgIGxpc3RzdHJpbmcgKz0gYHwgJHtzdHVkLmRhdGEuZ2V0KFwiaWRcIil9IGA7XHJcbiAgICAgICAgICAgIGxpc3RzdHJpbmcgKz0gYHwgJHtzdHVkLmRhdGEuZ2V0KFwiZW1haWxhZGRyZXNzXCIpfSBgO1xyXG4gICAgICAgICAgICBsaXN0c3RyaW5nICs9ICd8XFxuJztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHRoaXMucGx1Z2luLmFwcC52YXVsdC5hcHBlbmQoZmlsZSwgbGlzdHN0cmluZyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIG1lbnVcclxuICAgIC5hZGRJdGVtKChpdGVtKSA9PiB7XHJcbiAgICAgaXRlbVxyXG4gICAgICAuc2V0VGl0bGUoJ0dlbmVyYXRlIHByaW50YWJsZXMnKVxyXG4gICAgICAuc2V0SWNvbignbHVjaWRlLWxheW91dC1saXN0JylcclxuICAgICAgLnNldFNlY3Rpb24oJ3BhbmUnKVxyXG4gICAgICAub25DbGljayggYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICBsZXQgdGVtcGxhdGUgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncy50ZW1wbGF0ZTtcclxuICAgICAgICAgIGlmICh0ZW1wbGF0ZSAhPT0gdW5kZWZpbmVkICYmIHRlbXBsYXRlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IHBvcyA9IHRlbXBsYXRlLmluZGV4T2YodGhpcy5hcHAudmF1bHQuYWRhcHRlci5iYXNlUGF0aCk7XHJcbiAgICAgICAgICAgIGlmIChwb3MgPj0gMCkgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIuYmFzZVBhdGgrXCJcXFxcXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UoL1xcXFwvZywgXCIvXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0ZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgIGxldCB0ZmlsZSA9IHRoaXMuYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aCh0ZW1wbGF0ZSkgYXMgVEZpbGU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRmaWxlKTtcclxuICAgICAgICAgICAgaWYgKHRlbXBsYXRlICE9PSBudWxsKSBcclxuICAgICAgICAgICAgICAgdGVtcGxhdGUgPSAgYXdhaXQgYXBwLnZhdWx0LnJlYWQoIHRmaWxlICk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gXCJcIjtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlID0gXCJcIjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBIZXJlIHdlIGVtYWlsIHRoZSBzdHVkZW50IG5vdGVcclxuICAgICAgICAgIGNvbnN0IGZpbGU6IFRGaWxlID0gYXdhaXQgKFxyXG4gICAgICAgICAgICBhcHAuZmlsZU1hbmFnZXIgYXMgYW55XHJcbiAgICAgICAgICAgICkuY3JlYXRlTmV3TWFya2Rvd25GaWxlKGFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlRmlsZSgpPy5wYXRoLCAvKnRoaXMuZ3JhZGVTZXQucHJvcGVydGllcy5nZXQoXCJ0aXRsZVwiKSovXCJzdHVkZW50cGFnZXMubWRcIik7ICBcclxuICAgICAgICAgIGNvbnN0IHNlbWFwaG9yZSA9IG5ldyBTZW1hcGhvcmUoMSk7XHJcbiAgICAgICAgICB0aGlzLmdyYWRlU2V0LnN0dWRlbnRzLmZvckVhY2goIChzdHVkOiBTdHVkZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbWFwaG9yZS5jYWxsRnVuY3Rpb24oIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICBsZXQgc3R1ZGVudE5vdGUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgIGlmICh0ZW1wbGF0ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBzdHVkZW50Tm90ZSA9IChuZXcgVGVtcGxhdGUodGhpcy5ncmFkZVNldCkpLnByb2Nlc3ModGVtcGxhdGUsIHN0dWQpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdHVkZW50Tm90ZSA9IHN0dWQuZ2VuZXJhdGVNYXJrZG93bih0aGlzLmdyYWRlU2V0KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uYXBwLnZhdWx0LmFwcGVuZChmaWxlLCAnXFxuXFxuPGRpdiBzdHlsZT1cInBhZ2UtYnJlYWstYWZ0ZXI6IGFsd2F5cztcIj48L2Rpdj5cXG5cXG4nKTtcclxuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5hcHAudmF1bHQuYXBwZW5kKGZpbGUsIHN0dWRlbnROb3RlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICAgIG1lbnVcclxuXHRcdCAgLmFkZEl0ZW0oKGl0ZW0pID0+IHtcclxuXHRcdFx0aXRlbVxyXG5cdFx0XHQgIC5zZXRUaXRsZSgnQWRkIGEgc3R1ZGVudCcpXHJcblx0XHRcdCAgLnNldEljb24oJ2x1Y2lkZS1zbWlsZS1wbHVzJylcclxuXHRcdFx0ICAuc2V0U2VjdGlvbigncGFuZScpXHJcblx0XHRcdCAgLm9uQ2xpY2soICgpID0+IHtcclxuICAgICAgICAgIG5ldyBOZXdTdHVkZW50TW9kYWwodGhpcy5hcHAsIGFzeW5jIChzdHVkZW50OiBTdHVkZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0dWRlbnRGaWxlOiBURmlsZSA9IGF3YWl0IChcclxuICAgICAgICAgICAgICBhcHAuZmlsZU1hbmFnZXIgYXMgYW55XHJcbiAgICAgICAgICAgICAgKS5jcmVhdGVOZXdNYXJrZG93bkZpbGUodGhpcy5ncmFkZVNldC5zb3VyY2VGb2xkZXIsIHN0dWRlbnQuZGF0YS5nZXQoXCJpZFwiKSk7XHJcbiAgICAgICAgICAgIHZhciBkYXRhc3RyID0gXCIjbmFtZSBcIitzdHVkZW50LmRhdGEuZ2V0KFwibmFtZVwiKStcIlxcblwiK1xyXG4gICAgICAgICAgICAgICBcIiNpZCBcIitzdHVkZW50LmRhdGEuZ2V0KFwiaWRcIikrXCJcXG5cIjtcclxuICAgICAgICAgICAgaWYgKHN0dWRlbnQuZGF0YS5nZXQoXCJuaWNrbmFtZVwiKSAhPT0gdW5kZWZpbmVkKSBcclxuICAgICAgICAgICAgICAgZGF0YXN0ciArPSBcIiNuaWNrbmFtZSBcIitzdHVkZW50LmRhdGEuZ2V0KFwibmlja25hbWVcIikrXCJcXG5cIjtcclxuICAgICAgICAgICAgaWYgKHN0dWRlbnQuZGF0YS5nZXQoXCJlbWFpbGFkZHJlc3NcIikgIT09IHVuZGVmaW5lZCkgXHJcbiAgICAgICAgICAgICAgIGRhdGFzdHIgKz0gXCIjZW1haWxhZGRyZXNzIFwiK3N0dWRlbnQuZGF0YS5nZXQoXCJlbWFpbGFkZHJlc3NcIikrXCJcXG5cIjtcclxuICAgICAgICAgICAgaWYgKHN0dWRlbnQuZGF0YS5nZXQoXCJtb2JpbGVQaG9uZU51bWJlclwiKSAhPT0gdW5kZWZpbmVkKSBcclxuICAgICAgICAgICAgICAgZGF0YXN0ciArPSBcIiNtb2JpbGVQaG9uZU51bWJlciBcIitzdHVkZW50LmRhdGEuZ2V0KFwibW9iaWxlUGhvbmVOdW1iZXJcIikrXCJcXG5cIjsgIFxyXG4gICAgICAgICAgICBsZXQgaW1hZ2V1cmwgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncy51cmw7XHJcbiAgICAgICAgICAgIGltYWdldXJsID0gaW1hZ2V1cmwucmVwbGFjZShcIiVpZCVcIiwgXCIwMDBcIitzdHVkZW50LmRhdGEuZ2V0KFwiaWRcIikpO1xyXG4gICAgICAgICAgICBkYXRhc3RyICs9IFwiI2ltYWdlIFwiK2ltYWdldXJsK1wiXFxuXCI7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFzdHIpICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLmFwcC52YXVsdC5hcHBlbmQoc3R1ZGVudEZpbGUsIGRhdGFzdHIpO1xyXG4gICAgICAgICAgICBzdHVkZW50LnNldFNvdXJjZUZpbGUoc3R1ZGVudEZpbGUpO1xyXG4gICAgICAgICAgICB0aGlzLmdyYWRlU2V0LmFkZFN0dWRlbnQoc3R1ZGVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXR1c2JhckVsZW1lbnQuc2V0VGV4dChcIlwiK3RoaXMuZ3JhZGVTZXQuZ2V0U3R1ZGVudHMoKStcIiBzdHVkZW50c1wiKTsgICAgXHJcbiAgICAgICAgICB9KS5vcGVuKCk7XHJcbiAgICBcclxuIFx0XHRcdCAgfSk7XHJcblx0XHQgIH0pO1xyXG4gICAgICBtZW51XHJcblx0XHQgIC5hZGRJdGVtKChpdGVtKSA9PiB7XHJcblx0XHRcdGl0ZW1cclxuXHRcdFx0ICAuc2V0VGl0bGUoJ0ltcG9ydCBkYXRhJylcclxuXHRcdFx0ICAuc2V0SWNvbignbHVjaWRlLWZpbGUtdGV4dCcpXHJcblx0XHRcdCAgLnNldFNlY3Rpb24oJ3BhbmUnKVxyXG5cdFx0XHQgIC5vbkNsaWNrKCAoKSA9PiB7XHJcbiAgICAgICAgICAvLyBDaG9vc2UgYSBmaWxlXHJcbiAgICAgICAgICAgIGNvbnN0IG1vZGFsID0gbmV3IEZpbGVTZWxlY3Rvck1vZGFsKHRoaXMuYXBwLCB0aGlzLmdyYWRlU2V0LCB0aGlzLkNTVmltcG9ydCk7XHJcbiAgICAgICAgICAgIG1vZGFsLm9wZW4oKTtcclxuXHJcbiBcdFx0XHQgIH0pO1xyXG5cdFx0ICB9KTtcclxuICAgICAgbWVudVxyXG5cdFx0ICAuYWRkSXRlbSgoaXRlbSkgPT4ge1xyXG5cdFx0XHRpdGVtXHJcblx0XHRcdCAgLnNldFRpdGxlKCdBYm91dCcpXHJcblx0XHRcdCAgLnNldEljb24oJ2x1Y2lkZS1maWxlLXRleHQnKVxyXG5cdFx0XHQgIC5zZXRTZWN0aW9uKCdwYW5lJylcclxuXHRcdFx0ICAub25DbGljayggKCkgPT4ge1xyXG4gICAgICAgICAgLy8gQ2hvb3NlIGEgZmlsZVxyXG4gICAgICAgICAgbmV3IEFsZXJ0KHRoaXMucGx1Z2luLCBgQWJvdXQgJHt0aGlzLnBsdWdpbi52ZXJzaW9ufWAsIFwiR3JhZGVCb3ggaXMgYSBwbHVnaW4gZm9yIE9ic2lkaWFuIEJ1ZGR5XCIpLm9wZW4oKTtcclxuIFx0XHRcdCAgfSk7XHJcblx0XHQgIH0pO1xyXG5cclxuICAgIC8vIEFkZCBhIFwiQ2xvc2VcIiBpZiB3ZSBhcmUgb24gYSBtb2JpbGUgZGV2aWNlXHJcbiAgICBpZiAoUGxhdGZvcm0uaXNNb2JpbGUpIHtcclxuICAgICAgbWVudVxyXG4gICAgICAgIC5hZGRJdGVtKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICBpdGVtXHJcbiAgICAgICAgICAgIC5zZXRUaXRsZSgnQ2xvc2UnKVxyXG4gICAgICAgICAgICAuc2V0SWNvbignY3Jvc3MnKVxyXG4gICAgICAgICAgICAub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgICBcclxuXHJcbiAgICAgIGlmIChjYWxsU3VwZXIpIHtcclxuICAgICAgICBzdXBlci5vblBhbmVNZW51KG1lbnUsIHNvdXJjZSk7XHJcbiAgICAgIH1cclxuICBcclxuICAgIH1cclxuXHJcbiAgZGlzcGxheSgpIHtcclxuICAgIGlmICh0aGlzLmxpc3R2aWV3KSB7XHJcbiAgICAgIHRoaXMuZGlzcGxheUxpc3QoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJESVNQTEFZSU5HLi4uY29sb3JpemVkID0gXCIrdGhpcy5jb2xvcml6ZWQpO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmVtcHR5KCk7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5VGV4dCA9IHRoaXMucGx1Z2luLnZlcnNpb247XHJcbiAgICAgICAgY29uc3QgZGl2ID0gdGhpcy5jb250YWluZXIuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwidmlldy1zdHlsZVwiIH0pO1xyXG4gICAgICAgIGxldCB3aWR0aCA9IHRoaXMuY29udGFpbmVyRWwud2luLmlubmVyV2lkdGg7XHJcbiAgICAgICAgaWYgKHRoaXMuZ3JhZGVTZXQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgdGhpcy5kaXNwbGF5VGV4dCA9IHRoaXMuZ3JhZGVTZXQucHJvcGVydGllcy5nZXQoXCJ0aXRsZVwiKTtcclxuICAgICAgICAgIGlmICh0aGlzLmNvbG9yaXplZCkge1xyXG4gICAgICAgICAgICB0aGlzLmdyYWRlU2V0LmRpc3BsYXkoZGl2LCB3aWR0aCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvckRpdmlkZXIxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JEaXZpZGVyMik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRJU1BMQVk6IFwiK3RoaXMuZ3JhZGVTZXQucmVtaW5kZXJzKTtcclxuICAgICAgICAgICAgdGhpcy5ncmFkZVNldC5kaXNwbGF5KGRpdiwgd2lkdGgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5zdGF0dXNiYXJFbGVtZW50LnNldFRleHQoXCJcIit0aGlzLmdyYWRlU2V0LmdldFN0dWRlbnRzKCkrXCIgc3R1ZGVudHNcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gIGRpc3BsYXlMaXN0KCkge1xyXG4gICAgdGhpcy5jb250YWluZXIuZW1wdHkoKTtcclxuICAgIHRoaXMuZGlzcGxheVRleHQgPSB0aGlzLnBsdWdpbi52ZXJzaW9uO1xyXG4gICAgY29uc3QgZGl2ID0gdGhpcy5jb250YWluZXIuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwidmlldy1zdHlsZVwiIH0pO1xyXG4gICAgbGV0IHdpZHRoID0gdGhpcy5jb250YWluZXJFbC53aW4uaW5uZXJXaWR0aDtcclxuICAgIGlmICh0aGlzLmdyYWRlU2V0ICE9IG51bGwpIHtcclxuICAgICAgdGhpcy5kaXNwbGF5VGV4dCA9IHRoaXMuZ3JhZGVTZXQucHJvcGVydGllcy5nZXQoXCJ0aXRsZVwiKTtcclxuICAgICAgdGhpcy5ncmFkZVNldC5kaXNwbGF5TGlzdChkaXYsIHdpZHRoKTtcclxuICAgICAgdGhpcy5zdGF0dXNiYXJFbGVtZW50LnNldFRleHQoXCJcIit0aGlzLmdyYWRlU2V0LmdldFN0dWRlbnRzKCkrXCIgc3R1ZGVudHNcIik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjbGVhcigpIHtcclxuXHJcbiAgfVxyXG5cclxuXHJcbn1cclxuXHJcbmNsYXNzIEZpbGVTZWxlY3Rvck1vZGFsIGV4dGVuZHMgTW9kYWwge1xyXG5cdFxyXG4gIGNhbGxiYWNrT25DbG9zZTtcclxuXHJcbiAgY2FsbGVyOiBPYmplY3Q7XHJcbiAgaGFuZGxlcjogRnVuY3Rpb247XHJcbiAgZ3JhZGVTZXQ6IEdyYWRlU2V0O1xyXG4gIHZpZXc6IEdyYWRlYm94VmlldztcclxuXHJcbmNvbnN0cnVjdG9yKGFwcDogQXBwLCBnczogR3JhZGVTZXQsIGNhbGxiYWNrT25DbG9zZTogKHZpZXc6IEdyYWRlYm94VmlldywgZ3M6IEdyYWRlU2V0LCBmaWxlOiBzdHJpbmcpID0+IHZvaWQpIHtcclxuICBzdXBlcihhcHApO1xyXG5cclxuICAgICAgdGhpcy5jYWxsYmFja09uQ2xvc2UgPSBjYWxsYmFja09uQ2xvc2U7XHJcbiAgICAgIHRoaXMuZ3JhZGVTZXQgPSBncztcclxufVxyXG5cclxub25PcGVuKCkge1xyXG4gICAgbmV3IFNldHRpbmcodGhpcy5jb250ZW50RWwpLnNldE5hbWUoXCJJbXBvcnRpbmcgaXMgdmVyeSBwaWNreSFcIikuXHJcbiAgICAgICBzZXREZXNjKFwiVGhlIGZpbGUgdG8gYmUgaW1wb3J0ZWQgbXVzdCBiZSBpbiB0aGUgdmF1bHQuICBUaGUgZmlsZSB3aWxsIGJlIGltcG9ydGVkIGFzIGEgQ1NWIGZpbGUuXCIpO1xyXG4gICAgY29uc3Qgc2V0dGluZzEgPSBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbCkuc2V0TmFtZShcIkNob29zZSBDU1YgRmlsZVwiKS5zZXREZXNjKFwiQ2hvb3NlIENTViBkYXRhIGZpbGUgdG8gaW1wb3J0XCIpO1xyXG4gICAgY29uc3QgaW5wdXREYXRhRmlsZSA9IHNldHRpbmcxLmNvbnRyb2xFbC5jcmVhdGVFbChcImlucHV0XCIsIHtcclxuICAgICAgICBhdHRyOiB7XHJcbiAgICAgICAgICB0eXBlOiBcImZpbGVcIixcclxuICAgICAgICAgIG11bHRpcGxlOiBmYWxzZSxcclxuICAgICAgICAgIC8vYWNjZXB0OiBcIi5qc29uLC5jc3YsLnRzdlwiXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3Qgc2V0dGluZzUgPSBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbCkuc2V0TmFtZShcIkltcG9ydFwiKS5zZXREZXNjKFwiUHJlc3MgdG8gc3RhcnQgdGhlIEltcG9ydCBQcm9jZXNzXCIpO1xyXG4gICAgY29uc3QgaW5wdXQ1ID0gc2V0dGluZzUuY29udHJvbEVsLmNyZWF0ZUVsKFwiYnV0dG9uXCIpO1xyXG4gICAgaW5wdXQ1LnRleHRDb250ZW50ID0gXCJJbXBvcnRcIjtcclxuXHJcbiAgICBpbnB1dDUub25jbGljayA9IGFzeW5jICgpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coaW5wdXREYXRhRmlsZS5maWxlc1swXSk7XHJcbiAgICAgIHRoaXMuY2FsbGJhY2tPbkNsb3NlKHRoaXMudmlldywgdGhpcy5ncmFkZVNldCwgaW5wdXREYXRhRmlsZS5maWxlc1swXS5wYXRoKTtcclxuICAgIFxyXG4gICAgICBuZXcgTm90aWNlKFwiSW1wb3J0IEZpbmlzaGVkXCIpO1xyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgIHRoaXMudmlldy5kaXNwbGF5KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkNsb3NlKCkge1xyXG4gICAgbGV0IHtjb250ZW50RWx9ID0gdGhpcztcclxuICAgIGNvbnRlbnRFbC5lbXB0eSgpO1xyXG4gIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBURmlsZSwgVEZvbGRlciB9IGZyb20gXCJvYnNpZGlhblwiXG5cbmltcG9ydCB7IEFsZXJ0IH0gZnJvbSBcInV0aWxpdGllcy9hbGVydFwiXG5pbXBvcnQgeyBDYXRlZ29yeSB9IGZyb20gXCIuL0NhdGVnb3J5XCJcbmltcG9ydCB7IENvdW50ZXIgfSBmcm9tIFwiLi9Db3VudGVyXCJcbmltcG9ydCB7IENvdW50ZXJUaWNrIH0gZnJvbSBcIm1vZGFscy9Db3VudGVyVGlja1wiXG5pbXBvcnQgIEdyYWRlYm94UGx1Z2luICBmcm9tIFwiLi4vbWFpblwiXG5pbXBvcnQgeyBSZW1pbmRlciB9IGZyb20gXCIuL1JlbWluZGVyXCJcbmltcG9ydCB7IFNjb3JlIH0gZnJvbSBcIi4vU2NvcmVcIlxuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCIuL1N0dWRlbnRcIlxuaW1wb3J0ICBVdGlsaXRpZXMgIGZyb20gXCIuLi91dGlsaXRpZXMvVXRpbGl0aWVzXCJcblxuLy9pbXBvcnQgeyBSZW1pbmRlciB9IGZyb20gXCIuL1JlbWluZGVyXCJcblxuZXhwb3J0IGNsYXNzIEdyYWRlU2V0IHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHNob3J0VGl0bGU6IHN0cmluZztcbiAgICBncmFkZVNldERhdGE6IGFueSA9IG51bGw7XG4gICAgcGx1Z2luOiBHcmFkZWJveFBsdWdpbjtcbiAgICBtb2RpZmllZDogYm9vbGVhbjtcbiAgICBsYXN0TW9kaWZpZWQ6IERhdGU7XG5cbiAgICBzdHVkZW50czogU3R1ZGVudFtdO1xuICAgIGNhdGVnb3JpZXM6IENhdGVnb3J5W107XG4gICAgdGFza3M6IFN0cmluZ1tdO1xuICAgIHJlbWluZGVyczogUmVtaW5kZXJbXTtcbiAgICBjb3VudGVyczogQ291bnRlcltdO1xuICAgIHByb3BlcnRpZXM6IE1hcDxzdHJpbmcsIHN0cmluZz47XG5cbiAgICBzb3VyY2VGb2xkZXI6IFRGb2xkZXI7XG4gICAgc291cmNlRmlsZTogVEZpbGU7XG5cbiAgICBsb25nZXN0TmFtZTogbnVtYmVyO1xuXG4gICAgc29ydE1ldGhvZDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocGx1Z2luOiBHcmFkZWJveFBsdWdpbikge1xuICAgICAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgICAgICAgdGhpcy5tb2RpZmllZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNhdGVnb3JpZXMgPSBbXTtcbiAgICAgICAgdGhpcy5zdHVkZW50cyA9IFtdO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICAgICAgICB0aGlzLnJlbWluZGVycyA9IFtdO1xuICAgICAgICB0aGlzLnRhc2tzID0gW107XG4gICAgICAgIHRoaXMuc291cmNlRm9sZGVyID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNvdW50ZXJzID0gW107XG4gICAgICAgIHRoaXMuZ3JhZGVTZXREYXRhID0gXCJcIjtcbiAgICAgICAgdGhpcy5sb25nZXN0TmFtZSA9IDA7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNvcnRNZXRob2QgPSB0aGlzLnN0dWRlbnROYW1lc0FzY2VuZGluZztcblxuICAgIH1cblxuICAgIHNldHNvdXJjZUZvbGRlcihmb2xkZXI6IFRGb2xkZXIpIHtcbiAgICAgICAgdGhpcy5zb3VyY2VGb2xkZXIgPSBmb2xkZXI7XG4gICAgfVxuXG4gICAgc2V0U291cmNlRmlsZShmaWxlOiBURmlsZSkge1xuICAgICAgICB0aGlzLnNvdXJjZUZpbGUgPSBmaWxlO1xuICAgIH1cblxuICAgIGFzeW5jIGRlZmluZUdyYWRlU2V0KGRhdGE6IHN0cmluZywgc291cmNlOiBURm9sZGVyLCBmaWxlOiBURmlsZSwgcmVkZWZpbmU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICB0aGlzLnNvdXJjZUZvbGRlciA9IHNvdXJjZTtcbiAgICAgICAgdGhpcy5zb3VyY2VGaWxlID0gZmlsZTtcbiAgICAgICAgbGV0IGNhdDogQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICB0aGlzLmdyYWRlU2V0RGF0YSA9IGRhdGE7XG5cbiAgICAgICAgaWYgKHJlZGVmaW5lKSB7XG4gICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMucHJvcGVydGllcyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gICAgICAgICAgICB0aGlzLnJlbWluZGVycyA9IFtdO1xuICAgICAgICAgICAgdGhpcy50YXNrcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5jb3VudGVycyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5tb2RpZmllZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbGluZXMgPSBkYXRhLnNwbGl0KFwiXFxuXCIpO1xuXG4gICAgICAgIGxpbmVzLmZvckVhY2goIChsaW5lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmIChsaW5lLmNoYXJBdCgwKSA9PT0gJyMnKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRhZyA9IGxpbmUuc3Vic3RyaW5nKDAsIGxpbmUuaW5kZXhPZihcIiBcIikpO1xuICAgICAgICAgICAgICAgIGxldCBkZWZpbml0aW9uID0gbGluZS5zdWJzdHJpbmcobGluZS5pbmRleE9mKFwiIFwiKSk7XG4gICAgICAgICAgICAgICAgZGVmaW5pdGlvbiA9IGRlZmluaXRpb24udHJpbSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gcHJvcGVydGllcyBvZiB0aGUgY2xhc3NcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRFRklOSU5HIEdTIHdpdGggXCIrdGFnKycgYXMgJytkZWZpbml0aW9uKTtcbiAgICAgICAgICAgICAgICAvLyBTY29yZSBzZXR1cFxuICAgICAgICAgICAgICAgIGlmICh0YWcgPT09IFwiI2NhdGVnb3J5XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb3BzID0gZGVmaW5pdGlvbi5zcGxpdChcInxcIik7XG4gICAgICAgICAgICAgICAgICAgIGNhdCA9IG5ldyBDYXRlZ29yeShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgY2F0Lm5hbWUgPSBwcm9wc1swXS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgIGNhdC53ZWlnaHQgPSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKHByb3BzLmxlbmd0aCA+IDEpID8gcGFyc2VGbG9hdChwcm9wc1sxXSkgOiAxO1xuICAgICAgICAgICAgICAgICAgICBjYXQucGVyY2VudE9mU2NvcmVzID0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChwcm9wcy5sZW5ndGggPiAyKSA/IHBhcnNlRmxvYXQocHJvcHNbMl0pIDogMTsgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgY2F0LnNjb3JpbmdNZXRob2QgPSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKHByb3BzLmxlbmd0aCA+IDMpID8gcGFyc2VJbnQocHJvcHNbM10pIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBDYXRlZ29yeS5TY29yaW5nTWV0aG9kLklORElWSURVQUxfU0NPUkVfUEVSQ0VOVEFHRTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXRlZ29yaWVzLnB1c2goY2F0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRhZyA9PT0gXCIjc2NvcmVcIikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvcHMgPSBkZWZpbml0aW9uLnNwbGl0KFwifFwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BzLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2MgPSBuZXcgU2NvcmUocHJvcHNbMF0udHJpbSgpLCBwYXJzZUZsb2F0KHByb3BzWzFdKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXQuYWRkU2NvcmUoc2MpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ID0gdGhpcy5nZXRDYXRlZ29yeSh7IG5hbWU6IHByb3BzWzBdLnRyaW0oKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQWRkaW5nIHNjb3JlIHRvIFwiK2NhdC5uYW1lK1wiIHdpdGggdmFsdWUgXCIrcHJvcHNbMl0pXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2F0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2MgPSBuZXcgU2NvcmUocHJvcHNbMV0udHJpbSgpLCBwYXJzZUZsb2F0KHByb3BzWzJdKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0LmFkZFNjb3JlKHNjKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFnID09PSBcIiNjb3VudGVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb3BzID0gZGVmaW5pdGlvbi5zcGxpdChcInxcIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3VudGVyID0gbmV3IENvdW50ZXIocHJvcHNbMF0udHJpbSgpKTsgXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXIudmFsdWUgPSBwYXJzZUludChwcm9wc1sxXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY291bnRlcnMucHVzaChjb3VudGVyKTsgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0YWcgPT09IFwiI2xhc3Rtb2RpZmllZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE1vZGlmaWVkID0gbmV3IERhdGUocGFyc2VJbnQoZGVmaW5pdGlvbikpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFnID09PSBcIiNyZW1pbmRlclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9wcyA9IGRlZmluaXRpb24uc3BsaXQoXCJ8XCIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZSAgPSBuZXcgRGF0ZShwcm9wc1sxXSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZW1pbmRlciA9IG5ldyBSZW1pbmRlcihwcm9wc1swXS50cmltKCksIGRhdGUsIHBhcnNlSW50KHByb3BzWzJdKSwgcGFyc2VJbnQocHJvcHNbM10pKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1pbmRlcnMucHVzaChyZW1pbmRlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZuYW1lID0gdGFnLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnNldCh2bmFtZSwgZGVmaW5pdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2V0dGluZyBcIit2bmFtZStcIiB0byBcIit0aGlzLnByb3BlcnRpZXMuZ2V0KHZuYW1lKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC8vaWYgKGNhdCAhPT0gbnVsbCkgdGhpcy5jYXRlZ29yaWVzLnB1c2goY2F0KTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcyk7XG4gICAgfVxuXG4gICAgYXN5bmMgZGVmaW5lU3R1ZGVudChkYXRhOiBzdHJpbmcsIHNvdXJjZTogVEZpbGUsIHJlZGVmaW5lOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgdmFyIHNPYmo6IE9iamVjdCA9IG5ldyBPYmplY3QoKTtcbiAgICAgICAgdmFyIHNjb3JlczogYW55W107XG4gICAgICAgIHZhciB0YWc6IHN0cmluZztcbiAgICAgICAgdmFyIGRlZmluaXRpb246IHN0cmluZztcbiAgICAgICAgdmFyIGFiczogRGF0ZVtdO1xuICAgICAgICB2YXIgY250ZXI6IENvdW50ZXI7XG4gICAgICAgIHZhciBjbnRlcnM6IENvdW50ZXJbXTtcbiAgICAgICAgdmFyIG5vdGVzOiBzdHJpbmc7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJERUZJTkUgU1RBUlQ6IFwiICsgZGF0YSAgKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBsaW5lcyA9IGRhdGEuc3BsaXQoXCJcXG5cIik7XG5cbiAgICAgICAgc2NvcmVzID0gW107XG4gICAgICAgIGFicyA9IFtdO1xuICAgICAgICBjbnRlcnMgPSBbXTtcbiAgICAgICAgbm90ZXMgPSBcIlwiO1xuICAgICAgICBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxpbmVzLmZvckVhY2goIChsaW5lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobGluZS5jaGFyQXQoMCkgPT09ICcjJyAmJiBsaW5lLmNoYXJBdCgxKSAhPT0gJyAnKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0YWcgPSBsaW5lLnN1YnN0cmluZygwLCBsaW5lLmluZGV4T2YoXCIgXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlZmluaXRpb24gPSBsaW5lLnN1YnN0cmluZyhsaW5lLmluZGV4T2YoXCIgXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvbiA9IGRlZmluaXRpb24udHJpbSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJERUZJTklORyBTVFVERU5UIHdpdGggXCIrdGFnKycgYXMgJytkZWZpbml0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGFnID09PSBcIiNub3RlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdGVzICs9IGRlZmluaXRpb24gKyBcIlxcblwiO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRhZyA9PT0gXCIjc2NvcmVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb3BzID0gZGVmaW5pdGlvbi5zcGxpdChcInxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2MgPSB7IFwibmFtZVwiOiBwcm9wc1swXS50cmltKCkrXCJ8XCIrcHJvcHNbMV0udHJpbSgpLCBcInZhbHVlXCI6IHBhcnNlRmxvYXQocHJvcHNbMl0pIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZXMucHVzaChzYyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFnID09PSBcIiNjb3VudGVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9wcyA9IGRlZmluaXRpb24uc3BsaXQoXCJ8XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ZXIgPSBuZXcgQ291bnRlcihwcm9wc1swXS50cmltKCkpOyBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXIudmFsdWUgPSBwYXJzZUludChwcm9wc1sxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbnRlcnMucHVzaChjb3VudGVyKTsgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFnID09PSBcIiNhYnNlbmNlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoZGVmaW5pdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgYWJzLnB1c2goZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdm5hbWUgPSB0YWcuc3Vic3RyaW5nKDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZhbChcInNPYmouXCIrdm5hbWUrJyA9IFwiJytkZWZpbml0aW9uKydcIicpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNPYmoubmFtZSAhPT0gdW5kZWZpbmVkICYmIHNPYmoubmFtZS5sZW5ndGggPiB0aGlzLmxvbmdlc3ROYW1lKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiU2V0dGluZyBsb25nZXN0IG5hbWUgdG8gXCIrc09iai5uYW1lLmxlbmd0aCtcIiBmb3IgXCIrc09iai5uYW1lKTtcbiAgICBcbiAgICAgICAgICAgIHRoaXMubG9uZ2VzdE5hbWUgPSBzT2JqLm5hbWUubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzdHVkZW50OiBTdHVkZW50ID0gbnVsbDtcbiAgICAgICAgaWYgKHJlZGVmaW5lKSB7XG4gICAgICAgICAgICBzdHVkZW50ID0gdGhpcy5wbHVnaW4uY3VycmVudFN0dWRlbnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHVkZW50ID0gbmV3IFN0dWRlbnQoc09iaik7XG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGlzIGlzIHJlYWwgc3R1ZGVudCBkYXRhXG4gICAgICAgICAgICBpZiAoc3R1ZGVudC5kYXRhLmdldChcIm5hbWVcIikgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGEgc3R1ZGVudCwgc2tpcHBpbmdcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN0dWRlbnQubm90ZURhdGEgPSBkYXRhO1xuICAgICAgICBzdHVkZW50LnNldFNvdXJjZUZpbGUoc291cmNlKTtcbiAgICAgICAgY250ZXJzLmZvckVhY2goIChjbnRlcikgPT4ge1xuICAgICAgICAgICAgc3R1ZGVudC5hZGRDb3VudGVyKGNudGVyLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBhYnMuZm9yRWFjaCggKGRhdGUpID0+IHtcbiAgICAgICAgICAgIHN0dWRlbnQuYWRkQWJzZW5jZShkYXRlLCBmYWxzZSk7XG4gICAgICAgIH0pXG4gICAgICAgIHNjb3Jlcy5mb3JFYWNoKCAocGFpcikgPT4ge1xuICAgICAgICAgICAgc3R1ZGVudC5zZXRGcm9tUGFpcihwYWlyLCBmYWxzZSk7XG4gICAgICAgIH0gKVxuICAgICAgICBpZiAobm90ZXMubGVuZ3RoID4gMCkgc3R1ZGVudC5zZXROb3Rlcyhub3Rlcyk7XG4gICAgICAgIHRoaXMuc3R1ZGVudHMucHVzaChzdHVkZW50KTtcbiAgICAgICAgdGhpcy5zdHVkZW50cy5zb3J0KHRoaXMuc29ydE1ldGhvZCk7XG4gICAgfVxuXG4gICAgYXN5bmMgd3JpdGVHcmFkZVNldChncmFkZVNldE9ubHk6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICAvLyBXcml0ZSB0aGUgY2xhc3MgZGVmaW5pdGlvblxuICAgICAgICBjb25zb2xlLmxvZyhcIldSSVRJTkcgR1JBREVTRVQgQ0xBU1NcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2F0ZWdvcmllcyk7XG4gICAgICAgIHRoaXMucGx1Z2luLmFwcC52YXVsdC5wcm9jZXNzKHRoaXMuc291cmNlRmlsZSwgKGRhdGE6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgbGV0IGxpbmVzID0gZGF0YS5zcGxpdChcIlxcblwiKTtcbiAgICAgICAgICAgIGxldCBuZXdEYXRhOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgICAgICAgICBsaW5lcy5mb3JFYWNoKCAobGluZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobGluZSk7XG4gICAgICAgICAgICAgICAgaWYgKGxpbmUuY2hhckF0KDApID09PSAnIycgJiYgbGluZS5jaGFyQXQoMSkgIT09ICcgJykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGFnID0gbGluZS5zdWJzdHJpbmcoMCwgbGluZS5pbmRleE9mKFwiIFwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkZWZpbml0aW9uID0gbGluZS5zdWJzdHJpbmcobGluZS5pbmRleE9mKFwiIFwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb24gPSBkZWZpbml0aW9uLnRyaW0oKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGFnID09PSBcIiN0aXRsZVwiKSBcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0RhdGEgKz0gdGFnICsgXCIgXCIgKyB0aGlzLnByb3BlcnRpZXMuZ2V0KFwidGl0bGVcIikrJ1xcbic7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0YWcgPT09IFwiI3Nob3J0dGl0bGVcIikgXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdEYXRhICs9IHRhZyArIFwiIFwiICsgdGhpcy5wcm9wZXJ0aWVzLmdldChcInNob3J0VGl0bGVcIikrJ1xcbic7ICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAvLyBGSVggVEhJU1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcGVydGllcy5nZXQoXCJ3ZWJmaWxlXCIpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBuZXdEYXRhICs9IFwiI3dlYmZpbGUgXCIrdGhpcy5wcm9wZXJ0aWVzLmdldChcIndlYmZpbGVcIikrJ1xcbic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdEYXRhICs9IFwiI2xhc3Rtb2RpZmllZCBcIiArIChuZXcgRGF0ZSgpLmdldFRpbWUoKSkrJ1xcbic7XG5cbiAgICAgICAgICAgIC8vIENvdW50ZXJzXG4gICAgICAgICAgICB0aGlzLmNvdW50ZXJzLmZvckVhY2goIChjb3VudGVyOiBDb3VudGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgbmV3RGF0YSArPSBcIiNjb3VudGVyIFwiK2NvdW50ZXIubmFtZStcIiB8IFwiK2NvdW50ZXIudmFsdWUrXCJcXG5cIjtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIC8vIFJlbWluZGVyc1xuICAgICAgICAgICAgdGhpcy5yZW1pbmRlcnMuZm9yRWFjaCggKHJlbWluZGVyOiBSZW1pbmRlcikgPT4ge1xuICAgICAgICAgICAgICAgIG5ld0RhdGEgKz0gXCIjcmVtaW5kZXIgXCIrcmVtaW5kZXIudG9TdHJpbmcoKStcIlxcblwiO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIENhdGVnb3JpZXNcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV1JJVElORyBDQVRFR09SSUVTXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jYXRlZ29yaWVzKVxuICAgICAgICAgICAgdGhpcy5jYXRlZ29yaWVzLmZvckVhY2goIChjYXQ6IENhdGVnb3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgbmV3RGF0YSArPSBcIiNjYXRlZ29yeSBcIitjYXQubmFtZSsnIHwgJytjYXQud2VpZ2h0KycgfCAnK2NhdC5wZXJjZW50T2ZTY29yZXMrJ1xcbic7XG4gICAgICAgICAgICAgICAgaWYgKGNhdC5zY29yZVNldCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICBjYXQuc2NvcmVTZXQuZm9yRWFjaCggKHNjOiBTY29yZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3RGF0YSArPSBcIiNzY29yZSBcIitzYy5uYW1lK1wiIHwgXCIrc2MudmFsdWUrXCJcXG5cIjtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5FVyBEQVRBXFxuXCIrbmV3RGF0YSk7XG5cbiAgICAgICAgICAgIHRoaXMuZ3JhZGVTZXREYXRhID0gbmV3RGF0YTtcbiAgICAgICAgICAgIHJldHVybiBuZXdEYXRhO1xuICAgICAgICB9ICk7XG5cbiAgICAgICAgdGhpcy5tb2RpZmllZCA9IGZhbHNlO1xuICAgICAgICBpZiAoZ3JhZGVTZXRPbmx5KSByZXR1cm47XG5cbiAgICAgICAgLy8gV3JpdGUgZWFjaCBzdHVkZW50IG5vdGVcbiAgICAgICAgdGhpcy5zdHVkZW50cy5mb3JFYWNoKCAoc3R1ZGVudDogU3R1ZGVudCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coc3R1ZGVudCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldSSVRJTkcgU1RVREVOVCBcIitzdHVkZW50LmRhdGEuZ2V0KFwibmFtZVwiKStcIiBhdCBcIitzdHVkZW50LnNvdXJjZUZpbGUubmFtZSlcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLmFwcC52YXVsdC5wcm9jZXNzKCBzdHVkZW50LnNvdXJjZUZpbGUsIChkYXRhOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbGluZXMgPSBkYXRhLnNwbGl0KFwiXFxuXCIpO1xuICAgICAgICAgICAgICAgIGxldCBuZXdEYXRhOiBzdHJpbmcgPSBcIlwiO1xuICAgIFxuICAgICAgICAgICAgICAgIGxpbmVzLmZvckVhY2goIChsaW5lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmUuY2hhckF0KDApID09PSAnIycgJiYgbGluZS5jaGFyQXQoMSkgIT09ICcgJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhZyA9IGxpbmUuc3Vic3RyaW5nKDAsIGxpbmUuaW5kZXhPZihcIiBcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhZ25hbWUgPSB0YWcuc3Vic3RyaW5nKDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlZmluaXRpb24gPSBsaW5lLnN1YnN0cmluZyhsaW5lLmluZGV4T2YoXCIgXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb24gPSBkZWZpbml0aW9uLnRyaW0oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhZyA9PT0gXCIjc2NvcmVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vdGhpbmcsIHNlZSBiZWxvd1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0YWcgPT09IFwiI2NvdW50ZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vdGhpbmcsIHNlZSBiZWxvd1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0YWcgPT09IFwiI2Fic2VuY2VcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vdGhpbmcsIHNlZSBiZWxvd1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0YWcgPT09IFwiI25vdGVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vdGhpbmcsIHNlZSBiZWxvd1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdEYXRhICs9IHRhZytcIiBcIitzdHVkZW50LmRhdGEuZ2V0KHRhZ25hbWUpK1wiXFxuXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISBsaW5lLnN0YXJ0c1dpdGgoXCJcXG5cIikpIG5ld0RhdGEgKz0gbGluZSArIFwiXFxuXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIER1bXAgY291bnRlcnNcbiAgICAgICAgICAgICAgICBzdHVkZW50LmNvdW50ZXJzLmZvckVhY2goIChjb3VudGVyOiBDb3VudGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0RhdGEgKz0gXCIjY291bnRlciBcIitjb3VudGVyLm5hbWUrXCIgfCBcIitjb3VudGVyLnZhbHVlK1wiXFxuXCI7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBEdW1wIHRoZSBhYnNlbmNlcyB0byBpbmNsdWRlIGFueSBjaGFuZ2VzXG4gICAgICAgICAgICAgICAgc3R1ZGVudC5hYnNlbmNlcy5mb3JFYWNoKCAoZGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLVVTJykgIT09ICdJbnZhbGlkIGRhdGUnKSBcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0RhdGEgKz0gXCIjYWJzZW5jZSBcIitkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tVVMnKSsnXFxuJztcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIER1bXAgdGhlIHNjb3JlcyBzbyB0aGF0IHdlIGluY2x1ZGUgYW55IGNoYW5nZXMgb3IgbmV3IFxuICAgICAgICAgICAgICAgIHN0dWRlbnQuc2NvcmVzLmZvckVhY2goICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0RhdGEgKz0gXCIjc2NvcmUgXCIra2V5K1wiIHwgXCIrdmFsdWUrJ1xcbic7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc3R1ZGVudC5ub3Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub3Rlc0FycmF5ID0gc3R1ZGVudC5ub3Rlcy5zcGxpdChcIlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgbm90ZXNBcnJheS5mb3JFYWNoKCAobm90ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3RGF0YSArPSBcIiNub3RlIFwiK25vdGUrXCJcXG5cIjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gaWYgbmV3IHN0dWRlbnQgd2l0aG91dCB0ZW1wbGF0ZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV1JJVElORyBzdHVkZW50IFwiK3N0dWRlbnQuZGF0YS5nZXQoXCJuYW1lXCIpK1wiXFxuTGVuZ3RoPVwiK25ld0RhdGEubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBpZiAobmV3RGF0YS5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBzdHVkZW50LmRhdGEuZm9yRWFjaCggKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid3JpdGluZyBrZXkgPSBcIitrZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsID0gc3R1ZGVudC5kYXRhLmdldChrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCAhPT0gXCJ1bmRlZmluZWRcIikgbmV3RGF0YSArPSBcIiNcIitrZXkrXCIgXCIrdmFsK1wiXFxuXCI7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHVkZW50LnNjb3Jlcy5zaXplID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R1ZGVudC5zY29yZXMuZm9yRWFjaCggKHZhbHVlLCBrZXkpID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzY29yZSA9IHN0dWRlbnQuc2NvcmVzLmdldChrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0RhdGEgKz0gXCIjc2NvcmUgXCIgKyBrZXkgKyBcIiB8IFwiICsgc3R1ZGVudC5zY29yZXMuZ2V0KGtleSkgKyBcIlxcblwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBuZXdEYXRhO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXRUaXRsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcGVydGllcy5nZXQoXCJ0aXRsZVwiKTtcbiAgICB9XG5cbiAgICBnZXRTdHVkZW50cygpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnN0dWRlbnRzPT1udWxsKT8wOnRoaXMuc3R1ZGVudHMubGVuZ3RoO1xuICAgIH1cblxuICAgIHJlbmFtZUNhdGVnb3J5KG9sZE5hbWU6IHN0cmluZywgbmV3TmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVuYW1pbmcgY2F0ZWdvcnkgXCIrb2xkTmFtZStcIiB0byBcIituZXdOYW1lKTtcbiAgICAgICAgdGhpcy5jYXRlZ29yaWVzLmZvckVhY2goIChjYXQpID0+IHtcbiAgICAgICAgICAgIGlmIChjYXQubmFtZSA9PT0gb2xkTmFtZSkge1xuICAgICAgICAgICAgICAgIGNhdC5uYW1lID0gbmV3TmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGlmaWVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGlzcGxheShkaXY6IEhUTUxEaXZFbGVtZW50LCB3aWR0aDogbnVtYmVyLFxuICAgICAgICAgICAgZGl2aWRlcjEgPSBudWxsLCBkaXZpZGVyMiA9IG51bGwpIHtcbiAgICAgICAgbGV0IHRpdGxlRGl2ID0gZGl2LmNyZWF0ZUVsKFwiZGl2XCIsIHsgY2xzOiBcInRpdGxlLXN0eWxlXCJ9KTtcbiAgICAgICAgbGV0IHN0dWRlbnREaXYgPSBkaXYuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwic2NvcmVzLXN0eWxlXCJ9KTtcblxuICAgICAgICAvLyBUaXRsZSBcbiAgICAgICAgbGV0IHRhYmxlID0gdGl0bGVEaXYuY3JlYXRlRWwoXCJ0YWJsZVwiLCB7IGNsczogXCJ0aXRsZS10YWJsZS1zdHlsZVwiIH0pO1xuICAgICAgICBsZXQgdGJvZHkgPSB0YWJsZS5jcmVhdGVFbChcInRib2R5XCIpO1xuICAgICAgICBsZXQgdGl0bGVyb3cgPSB0Ym9keS5jcmVhdGVFbChcInRyXCIpO1xuICAgICAgICBsZXQgdGl0bGVjZWxsID0gdGl0bGVyb3cuY3JlYXRlRWwoXCJ0ZFwiKTtcbiAgICAgICAgdGl0bGVjZWxsLmNyZWF0ZUVsKFwiaDFcIiwgeyB0ZXh0OiB0aGlzLnByb3BlcnRpZXMuZ2V0KFwidGl0bGVcIikgfSk7XG4gICAgICAgIHRoaXMucGx1Z2luLnJlZ2lzdGVyRG9tRXZlbnQodGl0bGVEaXYsIFwiY2xpY2tcIiwgKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ0xJQ0sgb24gXCIrdGhpcy5wcm9wZXJ0aWVzLmdldChcInRpdGxlXCIpKTtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLmRpc3BsYXlHcmFkZVNldFZpZXcoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMucmVtaW5kZXJzLmxlbmd0aCArIHRoaXMudGFza3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGl0bGVyb3cgPSB0Ym9keS5jcmVhdGVFbChcInRyXCIsIHsgY2xzOiBcInRpdGxlLWluZm8tc3R5bGVcIn0pO1xuICAgICAgICAgICAgaWYgKHRoaXMucmVtaW5kZXJzLmxlbmd0aCkgXG4gICAgICAgICAgICAgICAgdGl0bGVyb3cuY3JlYXRlRWwoXCJ0ZFwiLCB7IHRleHQ6IFwicmVtaW5kZXJzXCIgfSk7XG4gICAgICAgICAgICBpZiAodGhpcy50YXNrcy5sZW5ndGgpIFxuICAgICAgICAgICAgICAgIHRpdGxlcm93LmNyZWF0ZUVsKFwidGRcIiwgeyB0ZXh0OiBcInRhc2tzXCIgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdHVkZW50IGxpc3QgXG4gICAgICAgIC8vIDAuIERvIGFsbCBjYXRlZ29yaWVzIGhhdmUgc2NvcmVzIGluIHRoZW0/XG4gICAgICAgIGxldCBhbGxDYXRlZ29yaWVzSGF2ZVNjb3JlcyA9IHRoaXMuYWxsQ2F0ZWdvcmllc0hhdmVTY29yZXMoKTtcblxuICAgICAgICAvLyAxLiBTdGFydCBieSBjb21wdXRpbmcgdGhlIG51bWJlciBvZiBjb2x1bW5zIHdlIG5lZWRcbiAgICAgICAgbGV0IHJvdzogSFRNTEVsZW1lbnQgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgLy8gMi4gR2VuZXJhdGUgYSB0YWJsZSB3aXRoIHN0dWRlbnRzXG4gICAgICAgIHRhYmxlID0gc3R1ZGVudERpdi5jcmVhdGVFbChcInRhYmxlXCIsIHsgY2xzOiBcInN0dWRlbnQtdGFibGUtc3R5bGVcIiB9KTtcbiAgICAgICAgbGV0IGNvbHVtbldpZHRoID0gcGFyc2VJbnQodGFibGUuZ2V0Q3NzUHJvcGVydHlWYWx1ZShcIi0tY29sdW1uLXdpZHRoXCIpKTtcbiAgICAgICAgbGV0IG5hbWVGb250U2l6ZSA9IHBhcnNlSW50KHRhYmxlLmdldENzc1Byb3BlcnR5VmFsdWUoXCItLW5hbWUtZm9udC1zaXplXCIpKTtcbiAgICAgICAgbGV0IG5hbWVXaWR0aCA9IHRoaXMubG9uZ2VzdE5hbWUgKiBuYW1lRm9udFNpemUgKyAxMDAgLyppbWFnZSovO1xuICAgICAgICBpZiAobmFtZVdpZHRoID4gY29sdW1uV2lkdGgpIGNvbHVtbldpZHRoID0gbmFtZVdpZHRoO1xuICAgICAgICBsZXQgY29sdW1ucyA9IE1hdGgucm91bmQod2lkdGggLyBjb2x1bW5XaWR0aCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRm9yIHdpZHRoIFwiK3dpZHRoK1wiIHdlIG5lZWQgXCIrY29sdW1ucytcIiBjb2x1bW5zIG9mIHdpZHRoIFwiK2NvbHVtbldpZHRoKTtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgXG4gICAgICAgIHRib2R5ID0gdGFibGUuY3JlYXRlRWwoXCJ0Ym9keVwiKTtcbiAgICAgICAgdGhpcy5zdHVkZW50cy5mb3JFYWNoKChzdHVkOiBTdHVkZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoY291bnQgPT0gMCkge1xuICAgICAgICAgICAgICAgIHJvdyA9IHRib2R5LmNyZWF0ZUVsKFwidHJcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgc3R5bGUgPSBcInN0dWRlbnQtY2VsbC1zdHlsZVwiO1xuICAgICAgICAgICAgaWYgKGRpdmlkZXIxICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNoZWNrID0gYWxsQ2F0ZWdvcmllc0hhdmVTY29yZXMgPyB0aGlzLmZpbmFsU2NvcmUoc3R1ZCkgOiB0aGlzLmZpbmFsU2NvcmUoc3R1ZCkvdGhpcy53ZWlnaHRUb3RhbCgpO1xuICAgICAgICAgICAgICAgIGlmIChjaGVjayA+PSBkaXZpZGVyMSkge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IFwic3R1ZGVudC1jb2xvcml6ZWQtY2VsbC1zdHlsZS0xXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaGVjayA+PSBkaXZpZGVyMikge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IFwic3R1ZGVudC1jb2xvcml6ZWQtY2VsbC1zdHlsZS0yXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSBcInN0dWRlbnQtY29sb3JpemVkLWNlbGwtc3R5bGUtM1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBjZWxsID0gcm93LmNyZWF0ZUVsKFwidGRcIiwgeyBjbHM6IHN0eWxlIH0pO1xuICAgICAgICAgICAgY2VsbC53aWR0aCA9IFwiXCIrY29sdW1uV2lkdGg7XG4gICAgICAgICAgICBpZiAoYWxsQ2F0ZWdvcmllc0hhdmVTY29yZXMpIFxuICAgICAgICAgICAgICAgIHN0dWQuZGlzcGxheShjZWxsLCBzdHlsZSwgdGhpcy5maW5hbFNjb3JlKHN0dWQpKTtcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0dWQuZGlzcGxheShjZWxsLCBzdHlsZSwgdGhpcy5maW5hbFNjb3JlKHN0dWQpLCB0aGlzLmZpbmFsU2NvcmUoc3R1ZCkvdGhpcy53ZWlnaHRUb3RhbCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnJlZ2lzdGVyRG9tRXZlbnQoc3R1ZC5nZXREaXYoKSwgXCJjbGlja1wiLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ0xJQ0sgb24gXCIrc3R1ZC5kYXRhLmdldChcIm5hbWVcIikpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0dWQubm90ZURhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLmRpc3BsYXlTdHVkZW50KHN0dWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyB0aGlzLnBsdWdpbi5yZWdpc3RlckRvbUV2ZW50KHN0dWQuZ2V0SEVJKCksIFwiY2xpY2tcIiwgKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIkNMSUNLIG9uIFwiK3N0dWQuZGF0YS5nZXQoXCJuYW1lXCIpK1wiIGltYWdlXCIpO1xuICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHN0dWQubm90ZURhdGEpO1xuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgY291bnQgPSBjb3VudCAlIGNvbHVtbnM7XG4gICAgICAgIH0pOyAgICAgICAgXG4gICAgfVxuXG4gICAgZGlzcGxheUxpc3QoZGl2OiBIVE1MRGl2RWxlbWVudCwgd2lkdGg6IG51bWJlcikge1xuICAgICAgICBsZXQgdGl0bGVEaXYgPSBkaXYuY3JlYXRlRWwoXCJkaXZcIiwgeyBjbHM6IFwidGl0bGUtbGlzdC1zdHlsZVwifSk7XG4gICAgICAgIGxldCBzdHVkZW50RGl2ID0gZGl2LmNyZWF0ZUVsKFwiZGl2XCIsIHsgY2xzOiBcInNjb3Jlcy1saXN0LXN0eWxlXCJ9KTtcblxuICAgICAgICAvLyBUaXRsZSBcbiAgICAgICAgbGV0IHRhYmxlID0gdGl0bGVEaXYuY3JlYXRlRWwoXCJ0YWJsZVwiLCB7IGNsczogXCJ0aXRsZS1saXN0LXRhYmxlLXN0eWxlXCIgfSk7XG4gICAgICAgIGxldCB0Ym9keSA9IHRhYmxlLmNyZWF0ZUVsKFwidGJvZHlcIik7XG4gICAgICAgIGxldCB0aXRsZXJvdyA9IHRib2R5LmNyZWF0ZUVsKFwidHJcIik7XG4gICAgICAgIGxldCB0aXRsZWNlbGwgPSB0aXRsZXJvdy5jcmVhdGVFbChcInRkXCIpO1xuICAgICAgICB0aXRsZWNlbGwuY3JlYXRlRWwoXCJoMVwiLCB7IHRleHQ6IHRoaXMucHJvcGVydGllcy5nZXQoXCJ0aXRsZVwiKSB9KTtcbiAgICAgICAgdGhpcy5wbHVnaW4ucmVnaXN0ZXJEb21FdmVudCh0aXRsZURpdiwgXCJjbGlja1wiLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDTElDSyBvbiBcIit0aGlzLnByb3BlcnRpZXMuZ2V0KFwidGl0bGVcIikpO1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uZGlzcGxheUdyYWRlU2V0VmlldygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBUYWJsZSBzZXR1cFxuICAgICAgICB0YWJsZSA9IHN0dWRlbnREaXYuY3JlYXRlRWwoXCJ0YWJsZVwiLCB7IGNsczogXCJzdHVkZW50LWxpc3QtdGFibGUtc3R5bGVcIiB9KTtcbiAgICAgICAgbGV0IG5hbWVGb250U2l6ZSA9IHBhcnNlSW50KHRhYmxlLmdldENzc1Byb3BlcnR5VmFsdWUoXCItLW5hbWUtZm9udC1zaXplXCIpKTtcblxuICAgICAgICB0Ym9keSA9IHRhYmxlLmNyZWF0ZUVsKFwidGJvZHlcIik7XG4gICAgICAgIGxldCBjYXRyb3cgPSB0Ym9keS5jcmVhdGVFbChcInRyXCIpO1xuICAgICAgICBjYXRyb3cuY3JlYXRlRWwoXCJ0ZFwiKTsgLy8sIHsgY2xzOiBcInN0dWRlbnQtbGlzdC1jZWxsLXN0eWxlXCIgfSk7XG4gICAgICAgIGNhdHJvdy5jcmVhdGVFbChcInRkXCIpOyAvLywgeyBjbHM6IFwic3R1ZGVudC1saXN0LWNlbGwtc3R5bGVcIiB9KTtcbiAgICAgICAgY2F0cm93LmNyZWF0ZUVsKFwidGRcIik7XG4gICAgICAgIHRoaXMuY2F0ZWdvcmllcy5mb3JFYWNoKCAoY2F0KSA9PiB7XG4gICAgICAgICAgICBpZiAoY2F0LnNjb3JlU2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2F0bmFtZSA9IGNhdHJvdy5jcmVhdGVFbChcInRkXCIsIHsgY2xzOiBcInN0dWRlbnQtbGlzdC1jYXRlZ29yeS1zdHlsZVwiLCBhdHRyOiB7Y29sc3BhbjogY2F0LnNjb3JlU2V0Lmxlbmd0aH0gfSk7XG4gICAgICAgICAgICAgICAgY2F0bmFtZS5jcmVhdGVFbChcImg0XCIsIHsgdGV4dDogY2F0Lm5hbWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgc2NvcmVyb3cgPSB0Ym9keS5jcmVhdGVFbChcInRyXCIpO1xuICAgICAgICBzY29yZXJvdy5jcmVhdGVFbChcInRkXCIpOyAvLywgeyBjbHM6IFwic3R1ZGVudC1saXN0LWNlbGwtc3R5bGVcIiB9KTtcbiAgICAgICAgc2NvcmVyb3cuY3JlYXRlRWwoXCJ0ZFwiKTsgLy8sIHsgY2xzOiBcInN0dWRlbnQtbGlzdC1jZWxsLXN0eWxlXCIgfSk7XG4gICAgICAgIGxldCBmcyA9IHNjb3Jlcm93LmNyZWF0ZUVsKFwidGRcIiwgeyBjbHM6IFwic3R1ZGVudC1saXN0LWZpbmFsc2NvcmUtc3R5bGVcIiB9KTtcbiAgICAgICAgZnMuY3JlYXRlRWwoXCJoNFwiLCB7IHRleHQ6IFwiRmluYWwgU2NvcmVcIiB9KTtcbiAgICAgICAgdGhpcy5jYXRlZ29yaWVzLmZvckVhY2goIChjYXQpID0+IHtcbiAgICAgICAgICAgIGlmIChjYXQuc2NvcmVTZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNhdC5zY29yZVNldC5mb3JFYWNoKCAoc2NvcmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjb3JlbmFtZSA9IHNjb3Jlcm93LmNyZWF0ZUVsKFwidGhcIiwgeyBjbHM6IFwic3R1ZGVudC1saXN0LXNjb3JldGl0bGUtc3R5bGVcIiB9KTtcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVuYW1lLmNyZWF0ZUVsKFwiaDVcIiwgeyB0ZXh0OiBzY29yZS5uYW1lIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIHRoaXMuc3R1ZGVudHMuZm9yRWFjaCgoc3R1ZDogU3R1ZGVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJvdyA9IHRib2R5LmNyZWF0ZUVsKFwidHJcIiwgeyBjbHM6IFwic3R1ZGVudC1saXN0LWNlbGwtc3R5bGVcIiB9KTtcbiAgICAgICAgICAgIHN0dWQuZGlzcGxheVJvdyhyb3csIHRoaXMpO1xuICAgICAgICAgICAgbGV0IGNvbG9yID0gcm93LmdldENzc1Byb3BlcnR5VmFsdWUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIpO1xuICAgICAgICAgICAgaWYgKGNvdW50ICUgMiA9PSAwKVxuICAgICAgICAgICAgICAgIGNvbG9yID0gVXRpbGl0aWVzLnBTQkMoMC43NSwgY29sb3IsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjb2xvciA9IFV0aWxpdGllcy5wU0JDKC0wLjc1LCBjb2xvciwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgcm93LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xuICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnJlZ2lzdGVyRG9tRXZlbnQoc3R1ZC5nZXREaXYoKSwgXCJjbGlja1wiLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ0xJQ0sgb24gXCIrc3R1ZC5kYXRhLmdldChcIm5hbWVcIikpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0dWQubm90ZURhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLmRpc3BsYXlTdHVkZW50KHN0dWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldFNvcnRNZXRob2QobWV0aG9kOiBhbnkpIHtcbiAgICAgICAgdGhpcy5zb3J0TWV0aG9kID0gbWV0aG9kO1xuICAgICAgICB0aGlzLnN0dWRlbnRzLnNvcnQobWV0aG9kKTtcbiAgICB9ICAgICAgXG5cbiAgICBhZGRTdHVkZW50KHN0dWRlbnQ6IFN0dWRlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBZGRpbmcgc3R1ZGVudCBcIitzdHVkZW50LmRhdGEuZ2V0KFwibmFtZVwiKStcIiB0byBcIit0aGlzLnByb3BlcnRpZXMuZ2V0KFwidGl0bGVcIikpO1xuICAgICAgICAvLyBTZXQgdXAgdGhlIHN0ZGVudCB3aXRoIHRoZSBhcHByb3Byb2lhdGUgZGF0YVxuICAgICAgICAgaWYgKHRoaXMuY2F0ZWdvcmllcyAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY2F0ZWdvcmllcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jYXRlZ29yaWVzLmZvckVhY2goIChjYXQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2F0LmdldFNjb3JlU2V0KCkgIT09IHVuZGVmaW5lZCAmJiBjYXQuZ2V0U2NvcmVTZXQoKSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgY2F0LmdldFNjb3JlU2V0KCkuZm9yRWFjaCggKHNjb3JlOiBTY29yZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0dWRlbnQuZ2V0KGNhdCwgc2NvcmUubmFtZSkgPT09IHVuZGVmaW5lZCkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R1ZGVudC5zZXQoY2F0LCBzY29yZS5uYW1lLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY291bnRlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5jb3VudGVycy5mb3JFYWNoKCAoY291bnRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHN0dWRlbnQuYWRkQ291bnRlcihjb3VudGVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgXG4gICAgICAgIC8vIEFkZFxuICAgICAgICB0aGlzLnN0dWRlbnRzLnB1c2goc3R1ZGVudCk7XG4gICAgICAgIHRoaXMuc3R1ZGVudHMuc29ydCh0aGlzLnNvcnRNZXRob2QpO1xuXG4gICAgICAgIHRoaXMubW9kaWZpZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGdldFN0dWRlbnQoY3JpdGVyaW9uOiBhbnkpOiBTdHVkZW50IHtcbiAgICAgICAgdmFyIHN0dWRlbnQ6IFN0dWRlbnQ7XG5cbiAgICAgICAgaWYgKGNyaXRlcmlvbi5uYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHN0dWRlbnQgPSB0aGlzLnN0dWRlbnRzLmZpbmQoIChzdHVkKSA9PiBzdHVkLmRhdGEuZ2V0KFwibmFtZVwiKSA9PT0gY3JpdGVyaW9uLm5hbWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNyaXRlcmlvbi5pZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzdHVkZW50ID0gdGhpcy5zdHVkZW50cy5maW5kKCAoc3R1ZCkgPT4gc3R1ZC5kYXRhLmdldChcImlkXCIpID09PSBjcml0ZXJpb24uaWQpO1xuICAgICAgICB9IGVsc2UgaWYgKGNyaXRlcmlvbi5lbWFpbGFkZHJlc3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc3R1ZGVudCA9IHRoaXMuc3R1ZGVudHMuZmluZCggKHN0dWQpID0+IHN0dWQuZGF0YS5nZXQoXCJlbWFpbGFkZHJlc3NcIikgPT09IGNyaXRlcmlvbi5lbWFpbGFkZHJlc3MpO1xuICAgICAgICB9IFxuXG4gICAgICAgIHJldHVybiBzdHVkZW50O1xuICAgIH1cblxuICAgIGRlbGV0ZVN0dWRlbnQoc3R1ZGVudDogU3R1ZGVudCkge1xuICAgICAgICB0aGlzLnN0dWRlbnRzID0gdGhpcy5zdHVkZW50cy5maWx0ZXIoIChzdHVkKSA9PiBzdHVkLmRhdGEuZ2V0KFwibmFtZVwiKSAhPT0gc3R1ZGVudC5kYXRhLmdldChcIm5hbWVcIikpO1xuICAgICAgICB0aGlzLm1vZGlmaWVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBhZGRTY29yZShuYW1lOiBzdHJpbmcsIHBvc3NpYmxlOiBudW1iZXIsIGV4dHJhQ3JlZGl0OiBib29sZWFuLCBjYXRuYW1lOiBzdHJpbmcsIHNjb3JlczogTWFwPHN0cmluZywgbnVtYmVyPikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkFkZGluZyBTQ09SRSA9IFwiK25hbWUrJy8nK3Bvc3NpYmxlK1wiIGluIFwiK2NhdG5hbWUpXG4gICAgICAgIHZhciBjYXRlZ29yeTogQ2F0ZWdvcnk7XG5cbiAgICAgICAgLy8gRmluZCB0aGUgY2F0ZWdvcnlcbiAgICAgICAgY2F0ZWdvcnkgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5jYXRlZ29yaWVzICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jYXRlZ29yaWVzICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMuZm9yRWFjaCggKGNhdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjYXQubmFtZSA9PT0gY2F0bmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeSA9IGNhdDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjb3JlID0gbmV3IFNjb3JlKGNhdG5hbWUrXCJ8XCIrbmFtZSwgcG9zc2libGUsIGV4dHJhQ3JlZGl0KTtcbiAgICAgICAgICAgICAgICAgICAgY2F0LmFkZFNjb3JlKHNjb3JlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBRERJTkc6IFwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coY2F0LnNjb3JlU2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2F0ZWdvcnkgPT09IG51bGwpIHJldHVybjtcbiAgXG4gICAgICAgIC8vIGFkZCB0aGUgc2NvcmUgdG8gZWFjaCBzdHVkZW50XG4gICAgICAgIGlmICh0aGlzLnN0dWRlbnRzICE9PSB1bmRlZmluZWQgJiYgdGhpcy5zdHVkZW50cyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5zdHVkZW50cy5mb3JFYWNoKCAoc3R1ZDogU3R1ZGVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHN0dWQuc2V0KGNhdGVnb3J5LCBuYW1lLCBzY29yZXMuZ2V0KHN0dWQuZGF0YS5nZXQoXCJuYW1lXCIpKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNldCB0aGUgZ3JhZGVzZXQgdG8gd3JpdGUgd2hlbiBjbG9zZWRcbiAgICAgICAgdGhpcy5ncmFkZVNldERhdGEgPSB0aGlzLndyaXRlR3JhZGVTZXQodHJ1ZSk7XG4gICAgICAgIHRoaXMubW9kaWZpZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGFkZEFic2VuY2VzKGFic2VuY2VzOiBEYXRlW10pIHtcbiAgICAgICAgaWYgKHRoaXMuc3R1ZGVudHMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnN0dWRlbnRzICE9PSBudWxsKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpPTA7IGkgPCB0aGlzLnN0dWRlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFic2VuY2VzW2ldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICB0aGlzLnN0dWRlbnRzW2ldLmFkZEFic2VuY2UoYWJzZW5jZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQWRkaW5nIGFic2VuY2UgXCIrYWJzZW5jZXNbaV0rXCIgdG8gXCIrdGhpcy5zdHVkZW50c1tpXS5kYXRhLmdldChcIm5hbWVcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubW9kaWZpZWQgPSB0cnVlO1xuICAgICAgICB9IFxuICAgIH1cblxuICAgIGFkZENvdW50ZXIoY291bnRlcjogQ291bnRlcikge1xuICAgICAgICB0aGlzLmNvdW50ZXJzLnB1c2goY291bnRlcik7XG4gICAgICAgIGlmICh0aGlzLnN0dWRlbnRzICE9PSB1bmRlZmluZWQgJiYgdGhpcy5zdHVkZW50cyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaT0wOyBpIDwgdGhpcy5zdHVkZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3R1ZGVudHNbaV0uYWRkQ291bnRlcihjb3VudGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubW9kaWZpZWQgPSB0cnVlO1xuICAgICAgICB9IFxuICAgIH1cblxuICAgIGFkZFJlbWluZGVyKHJlbWluZGVyOiBSZW1pbmRlcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkFkZGluZyByZW1pbmRlciBcIityZW1pbmRlci50ZXh0KTtcbiAgICAgICAgdGhpcy5yZW1pbmRlcnMucHVzaChyZW1pbmRlcik7XG4gICAgICAgIHRoaXMuZ3JhZGVTZXREYXRhID0gdGhpcy53cml0ZUdyYWRlU2V0KHRydWUpO1xuICAgICAgICB0aGlzLm1vZGlmaWVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBkZWxldGVSZW1pbmRlcihyZW1pbmRlcjogUmVtaW5kZXIpIHtcbiAgICAgICAgdGhpcy5yZW1pbmRlcnMgPSB0aGlzLnJlbWluZGVycy5maWx0ZXIoIChyZW0pID0+IHJlbS50ZXh0ICE9PSByZW1pbmRlci50ZXh0KTtcbiAgICAgICAgdGhpcy5ncmFkZVNldERhdGEgPSB0aGlzLndyaXRlR3JhZGVTZXQodHJ1ZSk7XG4gICAgICAgIHRoaXMubW9kaWZpZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGdldENhdGVnb3J5KGNyaXRlcmlvbjogYW55KTogQ2F0ZWdvcnkge1xuICAgICAgICB2YXIgY2F0OiBDYXRlZ29yeTtcblxuICAgICAgICBpZiAoY3JpdGVyaW9uLm5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY2F0ID0gdGhpcy5jYXRlZ29yaWVzLmZpbmQoIChjKSA9PiBjLm5hbWUgPT09IGNyaXRlcmlvbi5uYW1lKTtcbiAgICAgICAgfSBcblxuICAgICAgICByZXR1cm4gY2F0O1xuICAgIH1cblxuICAgIGFkZENhdGVnb3J5KCBjYXQ6IENhdGVnb3J5ICkge1xuICAgICAgICB0aGlzLmNhdGVnb3JpZXMucHVzaChjYXQpO1xuICAgICAgICB0aGlzLm1vZGlmaWVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBkZWxldGVDYXRlZ29yeShjYXQ6IENhdGVnb3J5KSB7XG4gICAgICAgIHRoaXMuY2F0ZWdvcmllcyA9IHRoaXMuY2F0ZWdvcmllcy5maWx0ZXIoIChjKSA9PiBjLm5hbWUgIT09IGNhdC5uYW1lKTtcbiAgICAgICAgdGhpcy5tb2RpZmllZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFNvcnRpbmdcblxuICAgIHN0dWRlbnROYW1lc0FzY2VuZGluZyhzdHVkZW50MTogU3R1ZGVudCwgc3R1ZGVudDI6IFN0dWRlbnQpIHtcbiAgICAgICAgbGV0IG5hbWUxID0gc3R1ZGVudDEuZGF0YS5nZXQoXCJuYW1lXCIpO1xuICAgICAgICBpZiAobmFtZTEgPT09IHVuZGVmaW5lZCkgbmFtZTEgPSBcIlwiO1xuICAgICAgICBsZXQgbmFtZTIgPSBzdHVkZW50Mi5kYXRhLmdldChcIm5hbWVcIik7XG4gICAgICAgIGlmIChuYW1lMiA9PT0gdW5kZWZpbmVkKSBuYW1lMiA9IFwiXCI7XG4gICAgICAgIHJldHVybiBuYW1lMS5sb2NhbGVDb21wYXJlKG5hbWUyKTtcbiAgICB9XG5cbiAgICBzdHVkZW50TmFtZXNEZXNjZW5kaW5nKHN0dWRlbnQxOiBTdHVkZW50LCBzdHVkZW50MjogU3R1ZGVudCkge1xuICAgICAgICBsZXQgbmFtZTEgPSBzdHVkZW50MS5kYXRhLmdldChcIm5hbWVcIik7XG4gICAgICAgIGlmIChuYW1lMSA9PT0gdW5kZWZpbmVkKSBuYW1lMSA9IFwiXCI7XG4gICAgICAgIGxldCBuYW1lMiA9IHN0dWRlbnQyLmRhdGEuZ2V0KFwibmFtZVwiKTtcbiAgICAgICAgaWYgKG5hbWUyID09PSB1bmRlZmluZWQpIG5hbWUyID0gXCJcIjtcbiAgICAgICAgcmV0dXJuIG5hbWUyLmxvY2FsZUNvbXBhcmUobmFtZTEpO1xuICAgIH1cblxuICAgIHN0dWRlbnRTY29yZXNBc2NlbmRpbmcoc3R1ZGVudDE6IFN0dWRlbnQsIHN0dWRlbnQyOiBTdHVkZW50KSB7XG4gICAgICAgIGlmIChzdHVkZW50MSA9PT0gdW5kZWZpbmVkICYmIHN0dWRlbnQyID09PSB1bmRlZmluZWQpIHJldHVybiAwO1xuICAgICAgICBpZiAoc3R1ZGVudDEgPT09IHVuZGVmaW5lZCkgcmV0dXJuIC0xO1xuICAgICAgICBpZiAoc3R1ZGVudDIgPT09IHVuZGVmaW5lZCkgcmV0dXJuIDE7XG4gICAgICAgIHJldHVybiBzdHVkZW50MS5kaXNwbGF5ZWRGaW5hbFNjb3JlLXN0dWRlbnQyLmRpc3BsYXllZEZpbmFsU2NvcmU7XG4gICAgfVxuXG4gICAgc3R1ZGVudFNjb3Jlc0Rlc2NlbmRpbmcoc3R1ZGVudDE6IFN0dWRlbnQsIHN0dWRlbnQyOiBTdHVkZW50KSB7XG4gICAgICAgIGlmIChzdHVkZW50MSA9PT0gdW5kZWZpbmVkICYmIHN0dWRlbnQyID09PSB1bmRlZmluZWQpIHJldHVybiAwO1xuICAgICAgICBpZiAoc3R1ZGVudDEgPT09IHVuZGVmaW5lZCkgcmV0dXJuIC0xO1xuICAgICAgICBpZiAoc3R1ZGVudDIgPT09IHVuZGVmaW5lZCkgcmV0dXJuIDE7XG4gICAgICAgIHJldHVybiBzdHVkZW50Mi5kaXNwbGF5ZWRGaW5hbFNjb3JlLXN0dWRlbnQxLmRpc3BsYXllZEZpbmFsU2NvcmU7XG4gICAgfVxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFN0YXRpc3RpY3NcblxuICAgIGNsYXNzU2NvcmVBdmVyYWdlKGNhdDogQ2F0ZWdvcnksIHNjb3JlOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICB2YXIgdG90YWw6IG51bWJlciA9IDA7XG5cbiAgICAgICAgdGhpcy5zdHVkZW50cy5mb3JFYWNoKCAoc3R1ZCkgPT4ge1xuICAgICAgICAgICAgdG90YWwgKz0gc3R1ZC5nZXQoY2F0LCBzY29yZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0b3RhbCA9IHRvdGFsIC8gdGhpcy5zdHVkZW50cy5sZW5ndGg7XG5cbiAgICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH1cbiAgICBcbiAgICBjbGFzc0F2ZXJhZ2UoKTogbnVtYmVyIHtcbiAgICAgICAgdmFyIHRvdGFsOiBudW1iZXIgPSAwO1xuICAgICAgICB0aGlzLnN0dWRlbnRzLmZvckVhY2goIChzdHVkKSA9PiB7XG4gICAgICAgICAgICB0b3RhbCArPSB0aGlzLmZpbmFsU2NvcmUoc3R1ZCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0b3RhbCA9IHRvdGFsIC8gdGhpcy5zdHVkZW50cy5sZW5ndGg7XG4gICAgICAgIHJldHVybiB0b3RhbDtcbiAgICB9XG5cbiAgICBmaW5hbFNjb3JlKHN0dWRlbnQ6IFN0dWRlbnQpOiBudW1iZXIge1xuICAgICAgICAvLyBGb3IgZXZlcnkgY2F0ZWdvcnksIGdldCB0aGUgc3R1ZGVudCBwb2ludHMgYW5kIGFkZCB0aGUgY2F0ZWdvcmllc1xuICAgICAgICBpZiAodGhpcy5jYXRlZ29yaWVzID09IG51bGwgfHwgdGhpcy5jYXRlZ29yaWVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB0b3RhbCA9IDA7XG4gICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMuZm9yRWFjaCggKGNhdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRvdGFsICs9IGNhdC5zdHVkZW50U2NvcmUoc3R1ZGVudCk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNvdW50aW5nIFwiK3RvdGFsK1wiIGZvciBcIitzdHVkZW50LmRhdGEuZ2V0KFwibmFtZVwiKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0b3RhbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmFsUG9zc2libGUoKTogbnVtYmVyIHtcbiAgICAgICAgLy8gRm9yIGV2ZXJ5IGNhdGVnb3J5LCBnZXQgdGhlIHN0dWRlbnQgcG9pbnRzIGFuZCBhZGQgdGhlIGNhdGVnb3JpZXNcbiAgICAgICAgaWYgKHRoaXMuY2F0ZWdvcmllcyA9PSBudWxsIHx8IHRoaXMuY2F0ZWdvcmllcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgdG90YWwgPSAwO1xuICAgICAgICAgICAgdGhpcy5jYXRlZ29yaWVzLmZvckVhY2goIChjYXQpID0+IHtcbiAgICAgICAgICAgICAgICB0b3RhbCArPSBjYXQucG9zc2libGUoKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ291bnRpbmcgXCIrdG90YWwrXCIgZm9yIFwiK3N0dWRlbnQuZGF0YS5nZXQoXCJuYW1lXCIpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRvdGFsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd2VpZ2h0VG90YWwoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMuY2F0ZWdvcmllcyA9PSBudWxsIHx8IHRoaXMuY2F0ZWdvcmllcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgdG90YWwgPSAwO1xuICAgICAgICAgICAgdGhpcy5jYXRlZ29yaWVzLmZvckVhY2goIChjYXQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2F0LnNjb3JlU2V0ICE9PSB1bmRlZmluZWQgJiYgY2F0LnNjb3JlU2V0ICE9PSBudWxsICYmIGNhdC5zY29yZVNldC5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgICAgICB0b3RhbCArPSBjYXQud2VpZ2h0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdG90YWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbGxDYXRlZ29yaWVzSGF2ZVNjb3JlcygpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGFsbENhdGVnb3JpZXNIYXZlU2NvcmVzID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuY2F0ZWdvcmllcyAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY2F0ZWdvcmllcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jYXRlZ29yaWVzLmZvckVhY2goIChjYXQpID0+IHtcbiAgICAgICAgICAgICAgICBhbGxDYXRlZ29yaWVzSGF2ZVNjb3JlcyA9IGFsbENhdGVnb3JpZXNIYXZlU2NvcmVzICYmIFxuICAgICAgICAgICAgICAgICAgIChjYXQuZ2V0U2NvcmVTZXQoKSAhPT0gdW5kZWZpbmVkICYmIGNhdC5nZXRTY29yZVNldCgpICE9PSBudWxsICYmIGNhdC5nZXRTY29yZVNldCgpLmxlbmd0aCA+IDApO1xuICAgICAgICAgICAgfSkgIFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhbGxDYXRlZ29yaWVzSGF2ZVNjb3JlcztcbiAgICB9XG5cblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gV2ViIHNlcnZlciBkYXRhIGdlbmVyYXRpb25cbiAgICAvL1xuICAgIC8vIElkZWE6IEdlbmVyYXRlIHRoZSBYTUwgZmlsZSBhdCBhIGNlcnRhaW4gdGltZSAoc3BlYydkIGluIHNldHRpbmdzKS4gIFxuXG4gICAgZ2VuZXJhdGVYTUxGb3JXZWJTZXJ2ZXIoKSB7IFxuICAgICAgICBjb25zb2xlLmxvZyhcIkdlbmVyYXRpbmcgWE1MIGZvciB3ZWIgc2VydmVyXCIpOyAgICAgICAgICAgIFxuXG4gICAgICAgIGxldCB4bWwgPSAnPGNsYXNzJztcbiAgICAgICAgbGV0IHRpdGxlID0gdGhpcy5wcm9wZXJ0aWVzLmdldChcInRpdGxlXCIpO1xuICAgICAgICBpZiAodGl0bGUgIT09IHVuZGVmaW5lZCkgeG1sICs9IGAgbmFtZT1cIiR7dGl0bGV9XCIgYDtcbiAgICAgICAgbGV0IHNob3J0VGl0bGUgPSB0aGlzLnByb3BlcnRpZXMuZ2V0KFwic2hvcnRUaXRsZVwiKTtcbiAgICAgICAgaWYgKHNob3J0VGl0bGUgIT09IHVuZGVmaW5lZCkgeG1sICs9IGAgbmlja25hbWU9XCIke3Nob3J0VGl0bGV9XCIgYDtcbiAgICAgICAgeG1sICs9ICc+XFxuJztcblxuICAgICAgICBpZiAodGhpcy5jYXRlZ29yaWVzICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jYXRlZ29yaWVzICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMuZm9yRWFjaCggKGNhdGVnb3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgeG1sICs9IGNhdGVnb3J5LmdlbmVyYXRlWE1MKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc3R1ZGVudHMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnN0dWRlbnRzICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnN0dWRlbnRzLmZvckVhY2goIChzdHVkZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgeG1sICs9IHN0dWRlbnQuZ2VuZXJhdGVGaXJzdFhNTCgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhdGVnb3JpZXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNhdGVnb3JpZXMgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXRlZ29yaWVzLmZvckVhY2goIChjYXRlZ29yeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhdGVnb3J5LnNjb3JlU2V0ICE9PSB1bmRlZmluZWQgJiYgY2F0ZWdvcnkuc2NvcmVTZXQgIT09IG51bGwgJiYgY2F0ZWdvcnkuc2NvcmVTZXQubGVuZ3RoID4gMCApIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhtbCArPSBzdHVkZW50LmdlbmVyYXRlU2NvcmVYTUwoY2F0ZWdvcnkpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB4bWwgKz0gXCI8L3N0dWRlbnQ+XFxuXCI7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgeG1sICs9ICc8L2NsYXNzPlxcbic7XG5cbiAgICAgICAgcmV0dXJuIHhtbDtcbiAgICB9XG5cblxufSIsImltcG9ydCB7IEFwcCwgQnV0dG9uQ29tcG9uZW50LCBEcm9wZG93bkNvbXBvbmVudCwgTW9kYWwsIFNldHRpbmcsIFRGaWxlLCBUZXh0RmlsZVZpZXcsIFRvZ2dsZUNvbXBvbmVudCwgV29ya3NwYWNlTGVhZiB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5pbXBvcnQgeyBDYXRlZ29yeSB9IGZyb20gXCJkYXRhL0NhdGVnb3J5XCI7XG5pbXBvcnQgeyBDb3VudGVyIH0gZnJvbSBcImRhdGEvQ291bnRlclwiO1xuaW1wb3J0IHsgR3JhZGVTZXQgfSBmcm9tIFwiZGF0YS9HcmFkZVNldFwiO1xuaW1wb3J0IHsgU2NvcmUgfSBmcm9tIFwiZGF0YS9TY29yZVwiO1xuaW1wb3J0IHsgU3R1ZGVudCB9IGZyb20gXCJkYXRhL1N0dWRlbnRcIjtcblxuZXhwb3J0IGNsYXNzIFJlY2VudEZpbGVzTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG5cbiAgICBjYWxsYmFja09uQ2xvc2U7XG4gICAgZmlsZTE6IHN0cmluZztcbiAgICBmaWxlMjogc3RyaW5nO1xuICAgIGZpbGUzOiBzdHJpbmc7XG4gICAgZ3JhZGVTZXQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBcbiAgICAgICAgICAgICAgICBmaWxlMTogc3RyaW5nLCBmaWxlMjogc3RyaW5nLCBmaWxlMzogc3RyaW5nLCBcbiAgICAgICAgICAgICAgICBjYWxsYmFja09uQ2xvc2U6IChmaWxlUGF0aDogc3RyaW5nKSA9PiB2b2lkKSB7XG5cdFx0c3VwZXIoYXBwKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZmlsZTEgPSBmaWxlMTtcbiAgICAgICAgdGhpcy5maWxlMiA9IGZpbGUyO1xuICAgICAgICB0aGlzLmZpbGUzID0gZmlsZTM7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tPbkNsb3NlID0gY2FsbGJhY2tPbkNsb3NlO1xuXG4gICAgICAgIHRoaXMuZ3JhZGVTZXQgPSB0aGlzLmZpbGUxO1xuXHR9XG5cblx0b25PcGVuKCkge1xuXHRcdGxldCB7Y29udGVudEVsfSA9IHRoaXM7XG5cdFx0XG4gICAgICAgIGNvbnRlbnRFbC5jcmVhdGVFbChcImZvcm1cIiwge30sIChmb3JtKSA9PiB7XG5cbiAgICAgICAgZm9ybS5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogJ0Nob29zZSBhIEdyYWRlU2V0JyB9KTtcbiAgICAgICAgZm9ybS5jcmVhdGVFbChcImhyXCIpO1xuXG4gICAgICAgIGxldCBmaWxlc0Ryb3Bkb3duID0gbmV3IERyb3Bkb3duQ29tcG9uZW50KGZvcm0pXG4gICAgICAgICAgICAuYWRkT3B0aW9uKHRoaXMuZmlsZTEsIHRoaXMuZmlsZTEpXG4gICAgICAgICAgICAuYWRkT3B0aW9uKHRoaXMuZmlsZTIsIHRoaXMuZmlsZTIpXG4gICAgICAgICAgICAuYWRkT3B0aW9uKHRoaXMuZmlsZTMsIHRoaXMuZmlsZTMpXG4gICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5ncmFkZVNldCA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuXG4gICAgICAgIGZvcm0uY3JlYXRlRWwoXCJoclwiKTtcblxuICAgICAgICBuZXcgQnV0dG9uQ29tcG9uZW50KGZvcm0pXG4gICAgICAgICAgICAuc2V0QnV0dG9uVGV4dChcIk9wZW5cIilcbiAgICAgICAgICAgIC5zZXRDdGEoKVxuICAgICAgICAgICAgLm9uQ2xpY2soICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFja09uQ2xvc2UodGhpcy5ncmFkZVNldCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcdFxuXG4gICAgfVxuXG4gICAgb25DbG9zZSgpIHtcblx0XHRjb25zdCB7Y29udGVudEVsfSA9IHRoaXM7XG5cdFx0Y29udGVudEVsLmVtcHR5KCk7XG5cdH1cblxufSIsIi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy9cclxuLy8gR3JhZGVCb3ggcGx1Z2luIGZvciBPYnNpZGlhblxyXG4vL1xyXG4vLyBNaWtlIEppcHBpbmcsIFNwcmluZyAyMDI0XHJcbi8vXHJcbi8vIEFzIGEgd2F5IHRvIGxlYXJuIHBsdWdpbnMgZm9yIE9ic2lkaWFuIGFuZCBKYXZhc2NyaXB0LCB0aGlzIHBsdWdpbiB3YXMgd3JpdHRlbi4gIFxyXG4vLyBTZXZlcmFsIGNvbmNlcHR1YWwgY2hhbGxlbmdlczogc2hvdWxkIHBsdWdpbnMgYmUgdGhpcyBiaWc/ICBzaG91bGQgcGx1Z2lucyBcclxuLy8gcmVwcmVzZW50IGFuIGVudGlyZSBhcHA/ICB3aGF0IHdvdWxkIGEgc2NvcmUga2VlcGluZyBwcm9ncmFtIGxvb2sgbGlrZSBpZiBpdFxyXG4vLyB3ZXJlIGJhc2VkIG9uIG5vdGVzP1xyXG5cclxuaW1wb3J0IHtcclxuXHQgICAgIEFwcCxcclxuXHQgICAgIERyb3Bkb3duQ29tcG9uZW50LFxyXG5cdCAgICAgTWVudSxcclxuXHQgICAgIE1vZGFsLFxyXG5cdCAgICAgTm90aWNlLFxyXG5cdCAgICAgUGx1Z2luLFxyXG5cdCAgICAgUGx1Z2luU2V0dGluZ1RhYixcclxuXHQgICAgIFNldHRpbmcsXHJcblx0ICAgICBUQWJzdHJhY3RGaWxlLFxyXG5cdCAgICAgVEZpbGUsXHJcblx0ICAgICBURm9sZGVyLFxyXG5cdCAgICAgVGV4dENvbXBvbmVudCxcclxuXHQgICAgIFZpZXdTdGF0ZSxcclxuXHQgICAgIFdvcmtzcGFjZUxlYWZcclxufSBmcm9tICdvYnNpZGlhbic7XHJcbmltcG9ydCB7IEdyYWRlU2V0U3VtbWFyeVZpZXcsIFZJRVdfVFlQRV9HUkFERVNFVF9TVU1NQVJZIH0gZnJvbSBcIi4vR3JhZGVTZXRTdW1tYXJ5Vmlld1wiO1xyXG5pbXBvcnQgeyBHcmFkZWJveFZpZXcsIFZJRVdfVFlQRV9HUkFERUJPWCB9IGZyb20gXCIuL0dyYWRlYm94Vmlld1wiO1xyXG5pbXBvcnQgeyBTdHVkZW50VmlldywgVklFV19UWVBFX1NUVURFTlQgfSBmcm9tIFwiLi9TdHVkZW50Vmlld1wiXHJcblxyXG5pbXBvcnQgeyBEaWFsb2cgfSBmcm9tICcuL3V0aWxpdGllcy9EaWFsb2cnXHJcbmltcG9ydCB7IEdyYWRlU2V0IH0gZnJvbSBcIi4vZGF0YS9HcmFkZVNldFwiO1xyXG5pbXBvcnQgeyBOZXdHcmFkZVNldE1vZGFsMCB9IGZyb20gXCIuL21vZGFscy9OZXdHcmFkZVNldE1vZGFsXCI7XHJcbmltcG9ydCB7IFJlY2VudEZpbGVzTW9kYWwgfSBmcm9tIFwiLi9tb2RhbHMvUmVjZW50RmlsZXNNb2RhbFwiO1xyXG5pbXBvcnQgeyBTdHVkZW50IH0gZnJvbSBcIi4vZGF0YS9TdHVkZW50XCI7XHJcbmltcG9ydCBzZXJ2aWNlcyBmcm9tICcuL3NlcnZpY2VzLmpzb24nO1xyXG5cclxuaW50ZXJmYWNlIEdyYWRlQm94UGx1Z2luU2V0dGluZ3Mge1xyXG5cdG51bWJlck9mUmVjZW50RmlsZXM6IHN0cmluZztcclxuXHR1cmw6IHN0cmluZztcclxuXHR0ZW1wbGF0ZTogc3RyaW5nO1xyXG5cdGNvbG9yRGl2aWRlcjE6IHN0cmluZztcclxuXHRjb2xvckRpdmlkZXIyOiBzdHJpbmc7XHJcblxyXG5cdHVzZUF1dGhlbnRpY2F0aW9uOiBib29sZWFuO1xyXG5cdHVzZXJuYW1lOiBzdHJpbmc7XHJcblx0cGFzc3dvcmQ6IHN0cmluZztcclxuXHRzbXRwaG9zdDogc3RyaW5nO1xyXG5cdHNtdHBwb3J0OiBzdHJpbmc7XHJcblx0ZW5jcnlwdGlvbjogc3RyaW5nO1xyXG5cdHJlY2VpdmVyOiBzdHJpbmc7XHJcblx0ZnJvbTogc3RyaW5nO1xyXG5cdGRlZmF1bHR0bzogc3RyaW5nO1xyXG5cdHN1YmplY3Q6IHN0cmluZztcclxuXHRzZXJ2aWNlOiBzdHJpbmc7XHJcblx0c2VjdXJlOiBzdHJpbmc7XHJcblx0ZGVsYXk6IHN0cmluZztcclxuXHJcblx0WE1MZmlsZW5hbWU6IHN0cmluZztcclxuXHR3aGVuVG9HZW5lcmF0ZTogc3RyaW5nO1xyXG5cclxuXHRyZWNlbnRGaWxlMTogc3RyaW5nO1xyXG5cdHJlY2VudEZpbGUyOiBzdHJpbmc7XHJcblx0cmVjZW50RmlsZTM6IHN0cmluZztcclxuXHJcbn1cclxuXHJcbmNvbnN0IERFRkFVTFRfU0VUVElOR1M6IEdyYWRlQm94UGx1Z2luU2V0dGluZ3MgPSB7XHJcblx0bnVtYmVyT2ZSZWNlbnRGaWxlczogXCIzXCIsXHJcblx0dXJsOiAnJyxcclxuXHR0ZW1wbGF0ZTogJycsXHJcblx0Y29sb3JEaXZpZGVyMTogXCI5MFwiLFxyXG5cdGNvbG9yRGl2aWRlcjI6IFwiNjBcIixcclxuXHJcblx0dXNlQXV0aGVudGljYXRpb246IGZhbHNlLFxyXG5cdHVzZXJuYW1lOiAnbm9ib2R5JyxcclxuXHRwYXNzd29yZDogJycsXHJcblx0c210cGhvc3Q6ICdzbXRwLmdtYWlsLmNvbScsXHJcblx0c210cHBvcnQ6IFwiNDY1XCIsXHJcblx0ZW5jcnlwdGlvbjogXCJOb25lXCIsXHJcblx0cmVjZWl2ZXI6IFwiXCIsXHJcblx0ZnJvbTogXCJcIixcclxuXHRkZWZhdWx0dG86ICcnLFxyXG5cdHN1YmplY3Q6IFwiXCIsXHJcblx0c2VydmljZTogXCJcIixcclxuXHRzZWN1cmU6IFwiTm9uZVwiLFxyXG5cdGRlbGF5OiBcIjEwXCIsXHJcblxyXG5cdFhNTGZpbGVuYW1lOiBcImdyYWRlcy54bWxcIixcclxuXHR3aGVuVG9HZW5lcmF0ZTogXCJjbG9zZVwiLFxyXG5cclxuXHRyZWNlbnRGaWxlMTogXCJcIixcclxuXHRyZWNlbnRGaWxlMjogXCJcIixcclxuXHRyZWNlbnRGaWxlMzogXCJcIixcclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFkZWJveFBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XHJcblxyXG5cdHNldHRpbmdzOiBHcmFkZUJveFBsdWdpblNldHRpbmdzO1xyXG5cdFxyXG5cdGN1cnJlbnRTdHVkZW50OiBTdHVkZW50O1xyXG5cdGdyYWRlU2V0OiBHcmFkZVNldDtcclxuXHJcblx0Z3JhZGVCb3hWaWV3IDogR3JhZGVib3hWaWV3O1xyXG5cclxuXHR2ZXJzaW9uOiBzdHJpbmcgPSBcIjEuMi4xICgwODE1MjQpXCI7XHJcblxyXG5cdHJvdGF0ZVJlY2VudEZpbGVzKGZpbGVQYXRoOiBzdHJpbmcpIHtcclxuXHRcdGlmIChmaWxlUGF0aC5sZW5ndGggPT0gMCkgcmV0dXJuO1xyXG5cclxuXHRcdGlmIChmaWxlUGF0aCA9PT0gdGhpcy5zZXR0aW5ncy5yZWNlbnRGaWxlMSkgcmV0dXJuO1xyXG5cdFx0aWYgKGZpbGVQYXRoID09PSB0aGlzLnNldHRpbmdzLnJlY2VudEZpbGUyKSByZXR1cm47XHJcblx0XHRpZiAoZmlsZVBhdGggPT09IHRoaXMuc2V0dGluZ3MucmVjZW50RmlsZTMpIHJldHVybjtcclxuXHRcdFx0XHRcdFxyXG5cdFx0dGhpcy5zZXR0aW5ncy5yZWNlbnRGaWxlMyA9IHRoaXMuc2V0dGluZ3MucmVjZW50RmlsZTI7XHJcblx0XHR0aGlzLnNldHRpbmdzLnJlY2VudEZpbGUyID0gdGhpcy5zZXR0aW5ncy5yZWNlbnRGaWxlMTtcclxuXHRcdHRoaXMuc2V0dGluZ3MucmVjZW50RmlsZTEgPSBmaWxlUGF0aDtcclxuXHJcblx0XHR0aGlzLnNhdmVTZXR0aW5ncygpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgb25sb2FkKCkge1xyXG5cdFx0Y29uc29sZS5sb2coJ2xvYWRpbmcgcGx1Z2luJyk7XHJcblxyXG5cdFx0YXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcclxuXHJcblx0XHR0aGlzLnJlZ2lzdGVyVmlldyhcclxuXHRcdFx0VklFV19UWVBFX0dSQURFQk9YLFxyXG5cdFx0XHQobGVhZikgPT4gbmV3IEdyYWRlYm94VmlldyhsZWFmLCB0aGlzKVxyXG5cdFx0ICApO1x0ICBcclxuXHRcdHRoaXMucmVnaXN0ZXJWaWV3KFxyXG5cdFx0XHRWSUVXX1RZUEVfR1JBREVTRVRfU1VNTUFSWSxcclxuXHRcdFx0KGxlYWYpID0+IG5ldyBHcmFkZVNldFN1bW1hcnlWaWV3KGxlYWYsIHRoaXMpXHJcblx0XHQgICk7XHRcclxuXHRcdHRoaXMucmVnaXN0ZXJWaWV3KFxyXG5cdFx0XHRWSUVXX1RZUEVfU1RVREVOVCxcclxuXHRcdFx0KGxlYWYpID0+IG5ldyBTdHVkZW50VmlldyhsZWFmLCB0aGlzLCBudWxsKVxyXG5cdFx0ICApO1xyXG5cdFx0ICBcclxuXHRcdGNvbnN0IHJpYmJvbkljb25FbCA9IHRoaXMuYWRkUmliYm9uSWNvbigncGFja2FnZS1vcGVuJywgJ0dyYWRlQm94IFBsdWdpbicsIChldnQ6IE1vdXNlRXZlbnQpID0+IHtcclxuXHRcdFx0bmV3IFJlY2VudEZpbGVzTW9kYWwodGhpcy5hcHAsIHRoaXMuc2V0dGluZ3MucmVjZW50RmlsZTEsIHRoaXMuc2V0dGluZ3MucmVjZW50RmlsZTIsIHRoaXMuc2V0dGluZ3MucmVjZW50RmlsZTMsIGFzeW5jIChmaWxlUGF0aDogc3RyaW5nKSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgZm9sZGVyID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGZpbGVQYXRoKSBhcyBURm9sZGVyO1xyXG5cdFx0XHRcdHRoaXMucm90YXRlUmVjZW50RmlsZXMoZmlsZVBhdGgpO1xyXG5cdFx0XHRcdHRoaXMub3BlbkdyYWRlU2V0KGZvbGRlcik7XHJcblx0XHRcdH0pLm9wZW4oKTtcclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRpZDogJ29wZW4tZ3JhZGVzZXQnLFxyXG5cdFx0XHRuYW1lOiAnT3BlbiBHcmFkZVNldCcsXHJcblx0XHRcdGNhbGxiYWNrOiAoKSA9PiB7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdHRoaXMucmVnaXN0ZXJFdmVudChcclxuXHRcdFx0dGhpcy5hcHAud29ya3NwYWNlLm9uKFwiZmlsZS1tZW51XCIsIChtZW51LCBmaWxlLCBzb3VyY2UsIHZpZXcpID0+IHtcclxuXHRcdFx0XHRpZiAoZmlsZSBpbnN0YW5jZW9mIFRGb2xkZXIpIHtcclxuXHRcdFx0XHRcdG1lbnUuYWRkSXRlbSgoaXRlbSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRpdGVtXHJcblx0XHRcdFx0XHRcdC5zZXRUaXRsZShcIk9wZW4gYXMgR3JhZGVTZXRcIilcclxuXHRcdFx0XHRcdFx0LnNldEljb24oXCJwYWNrYWdlLW9wZW5cIilcclxuXHRcdFx0XHRcdFx0Lm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMucm90YXRlUmVjZW50RmlsZXMoZmlsZS5wYXRoKTtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLm9wZW5HcmFkZVNldChmaWxlKVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdCAgKTtcclxuXHJcblx0XHR0aGlzLmFkZFNldHRpbmdUYWIobmV3IEdyYWRlQm94U2V0dGluZ3NUYWIodGhpcy5hcHAsIHRoaXMpKTtcclxuXHJcblx0XHR0aGlzLmdyYWRlQm94VmlldyA9IG51bGw7XHJcblx0fVxyXG5cclxuXHRvbnVubG9hZCgpIHtcclxuXHRcdGNvbnNvbGUubG9nKCd1bmxvYWRpbmcgcGx1Z2luJyk7XHJcblx0XHR0aGlzLmFwcC53b3Jrc3BhY2UuZGV0YWNoTGVhdmVzT2ZUeXBlKFZJRVdfVFlQRV9TVFVERU5UKTtcclxuXHRcdHRoaXMuYXBwLndvcmtzcGFjZS5kZXRhY2hMZWF2ZXNPZlR5cGUoVklFV19UWVBFX0dSQURFU0VUX1NVTU1BUlkpO1xyXG5cdFx0dGhpcy5hcHAud29ya3NwYWNlLmRldGFjaExlYXZlc09mVHlwZShWSUVXX1RZUEVfR1JBREVCT1gpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgbG9hZFNldHRpbmdzKCkge1xyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfU0VUVElOR1MsIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBzYXZlU2V0dGluZ3MoKSB7XHJcblx0XHRhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xyXG5cdH1cclxuXHJcblx0ZmlsZUV4aXN0cyhmaWxlTmFtZTogc3RyaW5nLCBmb2xkZXI6IFRGb2xkZXIpOiBCb29sZWFuIHtcclxuXHRcdHZhciByZXM6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRcdGxldCBmaWxlID0gZm9sZGVyLmNoaWxkcmVuLmZpbmQoYWZpbGUgPT4gYWZpbGUubmFtZSA9PT0gZmlsZU5hbWUpO1xyXG5cdFx0cmV0dXJuIChmaWxlICE9PSB1bmRlZmluZWQpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgb3BlbkdyYWRlU2V0KGZvbGRlcjogVEZvbGRlcikge1xyXG5cdFx0aWYgKGZvbGRlci5jaGlsZHJlbi5sZW5ndGggPT0gMCB8fCAhIHRoaXMuZmlsZUV4aXN0cyhcIkNMQVNTLm1kXCIsIGZvbGRlcikpIHtcclxuXHRcdFx0dGhpcy5uZXdHcmFkZVNldEZpbGUoZm9sZGVyKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZ3JhZGVTZXQgPSBuZXcgR3JhZGVTZXQodGhpcyk7XHJcblx0XHR0aGlzLmdyYWRlU2V0LnNldHNvdXJjZUZvbGRlcihmb2xkZXIpO1xyXG5cdFx0aWYgKGZvbGRlci5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcblx0XHRcdGZvbGRlci5jaGlsZHJlbi5mb3JFYWNoKCBhc3luYyAoYWJzZmlsZTogVEFic3RyYWN0RmlsZSwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG5cdFx0XHRcdGxldCBmaWxlID0gYWJzZmlsZSBhcyBURmlsZTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIlBST0NFU1NJTkcgXCIrZmlsZS5uYW1lKTtcclxuXHRcdFx0XHRpZiAoZmlsZS5uYW1lICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdFx0bGV0IGRhdGEgPSBhd2FpdCBhcHAudmF1bHQucmVhZCggZmlsZSApO1xyXG5cdFx0XHRcdFx0aWYgKGZpbGUubmFtZSA9PT0gXCJDTEFTUy5tZFwiKSB7XHJcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuZ3JhZGVTZXQuZGVmaW5lR3JhZGVTZXQoZGF0YSwgZm9sZGVyLCBmaWxlKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGlmIChmaWxlLm5hbWUuZW5kc1dpdGgoXCIubWRcIikpXHJcblx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5ncmFkZVNldC5kZWZpbmVTdHVkZW50KGRhdGEsIGZpbGUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMuZ3JhZGVTZXQpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpbmRleCA9PSBmb2xkZXIuY2hpbGRyZW4ubGVuZ3RoLTEpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5hcHAud29ya3NwYWNlLmRldGFjaExlYXZlc09mVHlwZShWSUVXX1RZUEVfR1JBREVCT1gpO1xyXG5cdFx0XHRcdFx0XHR0aGlzLmFwcC53b3Jrc3BhY2UuZGV0YWNoTGVhdmVzT2ZUeXBlKFZJRVdfVFlQRV9TVFVERU5UKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5hcHAud29ya3NwYWNlLmRldGFjaExlYXZlc09mVHlwZShWSUVXX1RZUEVfR1JBREVTRVRfU1VNTUFSWSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdHRoaXMuYXBwLndvcmtzcGFjZS5nZXRMZWFmKCkuc2V0Vmlld1N0YXRlKHtcclxuXHRcdFx0XHRcdFx0XHR0eXBlOiBWSUVXX1RZUEVfR1JBREVCT1gsXHJcblx0XHRcdFx0XHRcdFx0c3RhdGU6IHsgZm9sZGVyOiBmb2xkZXIgfSxcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHRcdFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmFwcC53b3Jrc3BhY2UuZGV0YWNoTGVhdmVzT2ZUeXBlKFZJRVdfVFlQRV9HUkFERUJPWCk7XHJcblx0XHRcdHRoaXMuYXBwLndvcmtzcGFjZS5kZXRhY2hMZWF2ZXNPZlR5cGUoVklFV19UWVBFX1NUVURFTlQpO1xyXG5cdFx0XHR0aGlzLmFwcC53b3Jrc3BhY2UuZGV0YWNoTGVhdmVzT2ZUeXBlKFZJRVdfVFlQRV9HUkFERVNFVF9TVU1NQVJZKTtcclxuXHRcclxuXHRcdFx0dGhpcy5hcHAud29ya3NwYWNlLmdldExlYWYoKS5zZXRWaWV3U3RhdGUoe1xyXG5cdFx0XHRcdHR5cGU6IFZJRVdfVFlQRV9HUkFERUJPWCxcclxuXHRcdFx0XHRzdGF0ZTogeyBmb2xkZXI6IGZvbGRlciB9LFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0YXN5bmMgbmV3R3JhZGVTZXRGaWxlKGZvbGRlcjogVEZvbGRlcikge1xyXG5cdFx0Y29uc3QgdGFyZ2V0Rm9sZGVyID0gZm9sZGVyXHJcblx0XHQgID8gZm9sZGVyXHJcblx0XHQgIDogYXBwLmZpbGVNYW5hZ2VyLmdldE5ld0ZpbGVQYXJlbnQoXHJcblx0XHRcdCAgYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVGaWxlKCk/LnBhdGggfHwgJydcclxuXHRcdFx0KTtcclxuXHRcclxuXHRcdHRyeSB7XHJcblx0XHQgIHRoaXMuYXBwLndvcmtzcGFjZS5kZXRhY2hMZWF2ZXNPZlR5cGUoVklFV19UWVBFX0dSQURFQk9YKTtcclxuXHRcdCAgdGhpcy5hcHAud29ya3NwYWNlLmRldGFjaExlYXZlc09mVHlwZShWSUVXX1RZUEVfU1RVREVOVCk7XHJcblx0XHQgIHRoaXMuYXBwLndvcmtzcGFjZS5kZXRhY2hMZWF2ZXNPZlR5cGUoVklFV19UWVBFX0dSQURFU0VUX1NVTU1BUlkpO1xyXG5cclxuXHRcdCAgY29uc3QgZ3JhZGVzOiBURmlsZSA9IGF3YWl0IChcclxuXHRcdFx0YXBwLmZpbGVNYW5hZ2VyIGFzIGFueVxyXG5cdFx0ICApLmNyZWF0ZU5ld01hcmtkb3duRmlsZShmb2xkZXIsICdDTEFTUycpO1xyXG5cdFxyXG5cdFx0ICAvL25ldyBOZXdHcmFkZVNldE1vZGFsKHRoaXMuYXBwLCBncmFkZXMpLm9wZW4oKTtcclxuXHRcdCAgbmV3IERpYWxvZyh0aGlzLCBcIk5ldyBHcmFkZXNldFwiLCBcIkVudGVyIGNsYXNzIG5hbWVcIiwgXCJDcmVhdGVcIiwgXCJDYW5jZWxcIiwgYXN5bmMgKHN0cjogc3RyaW5nKSA9PiB7XHJcblxyXG5cdFx0XHR0aGlzLmFwcC52YXVsdC5hcHBlbmQoZ3JhZGVzLCBcIiN0aXRsZSBcIitzdHIrJ1xcbicpO1xyXG5cdFx0XHR0aGlzLm9wZW5HcmFkZVNldChmb2xkZXIpO1xyXG5cclxuXHRcdC8vICAgYXdhaXQgYXBwLndvcmtzcGFjZS5nZXRMZWFmKCkuc2V0Vmlld1N0YXRlKHtcclxuXHRcdC8vIFx0dHlwZTogVklFV19UWVBFX0dSQURFQk9YLFxyXG5cdFx0Ly8gXHRzdGF0ZTogeyBmaWxlOiBncmFkZXMucGF0aCB9LFxyXG5cdFx0Ly8gICB9KTtcclxuXHRcdH0pLm9wZW4oKTtcclxuXHJcblx0XHQgIC8vY29uc29sZS5sb2coYXBwLndvcmtzcGFjZS5nZXRSaWdodExlYWYoZmFsc2UpLmdldFZpZXdTdGF0ZSgpLnN0YXRlKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdCAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNyZWF0aW5nIGdyYWRlc2V0OicsIGUpO1xyXG5cdFx0fVxyXG5cdCAgfVxyXG5cclxuXHQgIGFzeW5jIGRpc3BsYXlHcmFkZVNldFZpZXcoKSB7XHJcblx0XHRhd2FpdCBhcHAud29ya3NwYWNlLmdldExlYWYodHJ1ZSkuc2V0Vmlld1N0YXRlKHtcclxuXHRcdFx0dHlwZTogVklFV19UWVBFX0dSQURFU0VUX1NVTU1BUlksXHJcblx0XHRcdHN0YXRlOiB7IGdyYWRlc2V0OiB0aGlzLmdyYWRlU2V0IH0sXHJcblx0XHR9KTtcclxuXHRcdHRoaXMuYXBwLndvcmtzcGFjZS5yZXZlYWxMZWFmKFxyXG5cdFx0IFx0dGhpcy5hcHAud29ya3NwYWNlLmdldExlYXZlc09mVHlwZShWSUVXX1RZUEVfR1JBREVTRVRfU1VNTUFSWSlbMF1cclxuXHRcdCk7XHJcblxyXG5cdCAgfVxyXG5cclxuXHQgIGFzeW5jIGRpc3BsYXlTdHVkZW50KHN0dWRlbnQ6IFN0dWRlbnQpIHtcclxuXHRcdGNvbnNvbGUubG9nKFwiRElTUExBWSBTVFVERU5UOiBcIitzdHVkZW50LmRhdGEuZ2V0KFwibmFtZVwiKSk7XHJcblx0XHR0aGlzLmN1cnJlbnRTdHVkZW50ID0gc3R1ZGVudDtcclxuXHJcblx0XHRhd2FpdCBhcHAud29ya3NwYWNlLmdldExlYWYodHJ1ZSkuc2V0Vmlld1N0YXRlKHtcclxuXHRcdFx0dHlwZTogVklFV19UWVBFX1NUVURFTlQsXHJcblx0XHRcdHN0YXRlOiB7IHN0dWRlbnQ6IHN0dWRlbnQgfSxcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5hcHAud29ya3NwYWNlLnJldmVhbExlYWYoXHJcblx0XHQgXHR0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0TGVhdmVzT2ZUeXBlKFZJRVdfVFlQRV9TVFVERU5UKVswXVxyXG5cdFx0KTtcclxuXHJcblx0ICB9XHJcblxyXG5cclxufVxyXG5cclxuY2xhc3MgTmV3R3JhZGVTZXRNb2RhbCBleHRlbmRzIE1vZGFsIHtcclxuXHRnbmFtZTogc3RyaW5nO1xyXG5cdGdyYWRlc0ZpbGU6IFRGaWxlO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihhcHA6IEFwcCwgZ3JhZGVzOiBURmlsZSkge1xyXG5cdFx0c3VwZXIoYXBwKTtcclxuXHRcdHRoaXMuZ3JhZGVzRmlsZSA9IGdyYWRlcztcclxuXHR9XHJcblxyXG5cdG9uT3BlbigpIHtcclxuXHRcdGxldCB7Y29udGVudEVsfSA9IHRoaXM7XHJcblx0XHRcclxuXHRcdGNvbnRlbnRFbC5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogJ05ldyBHcmFkZXNldCcgfSk7XHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGVudEVsKVxyXG5cdFx0LnNldE5hbWUoXCJHcmFkZXNldCBOYW1lXCIpXHJcblx0XHQuYWRkVGV4dCgodGV4dCkgPT5cclxuXHRcdCAgdGV4dFxyXG5cdFx0XHQgIC5zZXRWYWx1ZShcIlwiKVxyXG5cdFx0XHQgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcdFxyXG5cdFx0XHRcdHRoaXMuZ25hbWUgPSB2YWx1ZTtcclxuXHRcdFx0ICB9XHJcbiAgICAgICAgICAgICkpO1xyXG5cclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcclxuXHRcdFx0LmFkZEJ1dHRvbigoYnRuKSA9PlxyXG5cdFx0XHQgIGJ0blxyXG5cdFx0XHRcdC5zZXRCdXR0b25UZXh0KFwiT0tcIilcclxuXHRcdFx0XHQuc2V0Q3RhKClcclxuXHRcdFx0XHQub25DbGljaygoKSA9PiB7XHJcblx0XHRcdFx0ICBhcHAudmF1bHQuYXBwZW5kKHRoaXMuZ3JhZGVzRmlsZSwgXCIjdGl0bGUgXCIrdGhpcy5nbmFtZSsnXFxuJyk7XHJcblx0XHRcdFx0ICB0aGlzLmNsb3NlKCk7XHJcblx0XHRcdFx0XHJcblx0XHR9KSk7XHJcblx0fVxyXG5cclxuXHRvbkNsb3NlKCkge1xyXG5cdFx0bGV0IHtjb250ZW50RWx9ID0gdGhpcztcclxuXHRcdGNvbnRlbnRFbC5lbXB0eSgpO1xyXG5cdH1cclxuXHJcblx0XHJcbn1cclxuXHJcbmNsYXNzIEdyYWRlQm94U2V0dGluZ3NUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcclxuXHRwbHVnaW46IEdyYWRlYm94UGx1Z2luO1xyXG5cclxuXHRzZXJ2aWNlU2V0dGluZzogU2V0dGluZztcclxuXHRob3N0U2V0dGluZzogU2V0dGluZztcclxuXHRwb3J0U2V0dGluZzogU2V0dGluZztcclxuXHR1c2VybmFtZVNldHRpbmc6IFNldHRpbmc7XHJcblx0cGFzc3dvcmRTZXR0aW5nOiBTZXR0aW5nO1xyXG5cdHNlY3VyZVNldHRpbmc6IFNldHRpbmc7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IEdyYWRlYm94UGx1Z2luKSB7XHJcblx0XHRzdXBlcihhcHAsIHBsdWdpbik7XHJcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcclxuXHR9XHJcblxyXG5cdGRpc3BsYXkoKTogdm9pZCB7XHJcblx0XHRsZXQge2NvbnRhaW5lckVsfSA9IHRoaXM7XHJcblxyXG5cdFx0Y29udGFpbmVyRWwuZW1wdHkoKTtcclxuXHJcblx0XHRjb250YWluZXJFbC5jcmVhdGVFbCgnaDEnLCB7dGV4dDogJ0dyYWRlQm94IHZlcnNpb24gJyt0aGlzLnBsdWdpbi52ZXJzaW9ufSk7XHJcblx0XHRjb250YWluZXJFbC5jcmVhdGVFbCgnaHInKTtcclxuXHJcblx0XHRjb250YWluZXJFbC5jcmVhdGVFbCgnaDInLCB7dGV4dDogJ0dlbmVyYWwnfSk7XHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdOdW1iZXIgb2YgcmVjZW50IGZpbGVzJylcclxuXHRcdFx0LnNldERlc2MoJ1RoaXMgaXMgdGhlIG51bWJlciBvZiByZWNlbnQgZmlsZXMgdGhhdCB3aWxsIGJlIGRpc3BsYXllZCBmcm9tIHRoZSByaWJib24gaWNvbi4nKVxyXG5cdFx0XHQuYWRkVGV4dCh0ZXh0ID0+IHRleHQuc2V0UGxhY2Vob2xkZXIoJyMnKVxyXG5cdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5udW1iZXJPZlJlY2VudEZpbGVzKVxyXG5cdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLm51bWJlck9mUmVjZW50RmlsZXMgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHRcdH0pKTtcclxuXHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoJ1N0dWRlbnQgSW1hZ2UgVVJMJylcclxuXHRcdFx0LnNldERlc2MoJ1RoaXMgaXMgdGhlIFVSTCBmb3IgYSBzdHVkZW50IHdobyBpcyBjcmVhdGVkIHdpdGhvdXQgYW4gaW1hZ2UuJylcclxuXHRcdFx0LmFkZFRleHQodGV4dCA9PiB0ZXh0LnNldFBsYWNlaG9sZGVyKCdVUkwnKVxyXG5cdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51cmwpXHJcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MudXJsID0gdmFsdWU7XHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHR9KSk7XHJcblx0XHRcclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZSgnVGVtcGxhdGUgZm9yIEVtYWlsaW5nIFNjb3JlcycpXHJcblx0XHRcdC5zZXREZXNjKCdUaGlzIGlzIHRoZSB0ZW1wbGF0ZSBmaWxlIHVzZWQgd2hlbiBlbWFpbGluZyBzY29yZXMgdG8gc3R1ZGVudHMuJylcclxuXHRcdFx0LmFkZFRleHQodGV4dCA9PiB0ZXh0XHJcblx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnRlbXBsYXRlKVxyXG5cdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnRlbXBsYXRlID0gdmFsdWU7XHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHR9KSk7XHJcblx0XHRcdFxyXG5cdFx0XHRcdFx0XHRcclxuXHRcdGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdoMicsIHt0ZXh0OiAnQ29sb3JpemluZyd9KTtcclxuXHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoJ0RpdmlkZXI6IFRvcCB0byBNaWRkbGUnKVxyXG5cdFx0XHQuc2V0RGVzYygnVGhpcyBpcyB0aGUgc2NvcmUgdGhhdCBkaXZpZGVzIHRoZSB0b3Agc2NvcmVzIGZyb20gdGhlIG1pZGRsZSBzY29yZXMuJylcclxuXHRcdFx0LmFkZFRleHQodGV4dCA9PiB0ZXh0LnNldFBsYWNlaG9sZGVyKCcjJylcclxuXHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JEaXZpZGVyMSlcclxuXHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvckRpdmlkZXIxID0gdmFsdWU7XHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHR9KSk7XHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdEaXZpZGVyOiBNaWRkbGUgdG8gQm90dG9tJylcclxuXHRcdFx0LnNldERlc2MoJ1RoaXMgaXMgdGhlIHNjb3JlIHRoYXQgZGl2aWRlcyB0aGUgbWlkZGxlIHNjb3JlcyBmcm9tIHRoZSB0b3Agc2NvcmVzLicpXHJcblx0XHRcdC5hZGRUZXh0KHRleHQgPT4gdGV4dC5zZXRQbGFjZWhvbGRlcignIycpXHJcblx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmNvbG9yRGl2aWRlcjIpXHJcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JEaXZpZGVyMiA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdFx0fSkpO1x0XHRcclxuXHJcblx0XHRjb250YWluZXJFbC5jcmVhdGVFbCgnaDInLCB7dGV4dDogJ0VtYWlsIFNlcnZlcid9KTtcclxuXHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoJ0RlbGF5IGJldHdlZW4gc2VuZGluZyBtZXNzYWdlcycpXHJcblx0XHRcdC5zZXREZXNjKCdUaGlzIGlzIHRoZSBudW1iZXIgb2Ygc2Vjb25kIHRvIHdhaXQgYmV0d2VlbiBzZW5kaW5nIG1lc3NhZ2VzLicpXHJcblx0XHRcdC5hZGRUZXh0KHRleHQgPT4gdGV4dC5zZXRQbGFjZWhvbGRlcignIycpXHJcblx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmRlbGF5KVxyXG5cdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmRlbGF5ID0gdmFsdWU7XHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHR9KSk7XHJcblxyXG5cdFx0dGhpcy5zZXJ2aWNlU2V0dGluZyA9IG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZSgnRW1haWwgU2VydmljZSBUZW1wbGF0ZScpXHJcblx0XHRcdC5zZXREZXNjKCdUbyBwb3B1bGF0ZSBzZXR0aW5ncyBiZWxvdycpXHJcblx0XHRcdC5hZGREcm9wZG93bihkcm9wID0+IGRyb3BcclxuXHRcdFx0XHQuYWRkT3B0aW9uKFwibm9uZVwiLCBcIm5vbmVcIilcclxuXHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0XHRjb25zdCBzZXJ2aWNlID0gc2VydmljZXNbdmFsdWVdO1xyXG5cdFx0XHRcdFx0aWYgKHNlcnZpY2VbXCJob3N0XCJdID09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHQodGhpcy5ob3N0U2V0dGluZy5jb21wb25lbnRzWzBdIGFzIFRleHRDb21wb25lbnQpLnNldFZhbHVlKFwiXCIpO1xyXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5zbXRwaG9zdCA9IFwiXCI7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQodGhpcy5ob3N0U2V0dGluZy5jb21wb25lbnRzWzBdIGFzIFRleHRDb21wb25lbnQpLnNldFZhbHVlKHNlcnZpY2VbXCJob3N0XCJdKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3Muc210cGhvc3QgPSBzZXJ2aWNlW1wiaG9zdFwiXTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmIChzZXJ2aWNlW1wicG9ydFwiXSA9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRcdFx0KHRoaXMucG9ydFNldHRpbmcuY29tcG9uZW50c1swXSBhcyBUZXh0Q29tcG9uZW50KS5zZXRWYWx1ZShcIlwiKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3Muc210cHBvcnQgPSBcIlwiO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0KHRoaXMucG9ydFNldHRpbmcuY29tcG9uZW50c1swXSBhcyBUZXh0Q29tcG9uZW50KS5zZXRWYWx1ZShcIlwiK3NlcnZpY2VbXCJwb3J0XCJdKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3Muc210cHBvcnQgPSBcIlwiK3NlcnZpY2VbXCJwb3J0XCJdO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKHNlcnZpY2VbXCJzZWN1cmVcIl0gPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdCh0aGlzLnNlY3VyZVNldHRpbmcuY29tcG9uZW50c1swXSBhcyBEcm9wZG93bkNvbXBvbmVudCkuc2V0VmFsdWUoXCJOb25lXCIpO1xyXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5zZWN1cmUgPSBcIk5vbmVcIjtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGlmIChzZXJ2aWNlW1wic2VjdXJlXCJdID09IHRydWUpIHtcclxuXHRcdFx0XHRcdFx0XHQodGhpcy5zZWN1cmVTZXR0aW5nLmNvbXBvbmVudHNbMF0gYXMgRHJvcGRvd25Db21wb25lbnQpLnNldFZhbHVlKFwiU1NMXCIpO1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnNlY3VyZSA9IFwiU1NMXCI7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0KHRoaXMuc2VjdXJlU2V0dGluZy5jb21wb25lbnRzWzBdIGFzIERyb3Bkb3duQ29tcG9uZW50KS5zZXRWYWx1ZShcIk5vbmVcIik7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3Muc2VjdXJlID0gXCJOb25lXCI7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnNlcnZpY2UgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdCk7XHJcblx0XHRPYmplY3Qua2V5cyhzZXJ2aWNlcykuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0XHQodGhpcy5zZXJ2aWNlU2V0dGluZy5jb21wb25lbnRzWzBdIGFzIERyb3Bkb3duQ29tcG9uZW50KS5hZGRPcHRpb24oa2V5LGtleSk7XHJcblx0XHR9KTtcclxuXHRcdCh0aGlzLnNlcnZpY2VTZXR0aW5nLmNvbXBvbmVudHNbMF0gYXMgRHJvcGRvd25Db21wb25lbnQpLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnNlcnZpY2UpO1xyXG5cclxuXHRcdHRoaXMuaG9zdFNldHRpbmcgPSBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoJ0VtYWlsIEhvc3QnKVxyXG5cdFx0XHQuc2V0RGVzYygnVGhlIHNlcnZlciB0aGF0IGNvbGxlY3RzIHlvdXIgZW1haWwnKVxyXG5cdFx0XHQuYWRkVGV4dCh0ZXh0ID0+IHRleHRcclxuXHRcdFx0XHQuc2V0UGxhY2Vob2xkZXIoJ3NtdHAuZ21haWwuY29tJylcclxuXHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc210cGhvc3QpXHJcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ0VtYWlsIEhvc3Q6ICcgKyB2YWx1ZSk7XHJcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5zbXRwaG9zdCA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdFx0fSkpO1xyXG5cclxuXHRcdHRoaXMucG9ydFNldHRpbmcgPSBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoJ0VtYWlsIEhvc3QgUG9ydCcpXHJcblx0XHRcdC5zZXREZXNjKCdUaGUgcG9ydCB0aGUgc2VydmVyIHVzZXMgdG8gY29sbGVjdCB5b3VyIGVtYWlsJylcclxuXHRcdFx0LmFkZFRleHQodGV4dCA9PiB0ZXh0XHJcblx0XHRcdFx0LnNldFBsYWNlaG9sZGVyKCc0NjUnKVxyXG5cdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5zbXRwcG9ydClcclxuXHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnSG9zdCBQb3J0OiAnICsgdmFsdWUpO1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3Muc210cHBvcnQgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHRcdH0pKTtcclxuXHRcclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZSgnRG9lcyBFbWFpbCBIb3N0IE5lZWQgQXV0aGVudGljYXRpb24/JylcclxuXHRcdFx0LnNldERlc2MoJ0RvZXMgeW91ciBlbWFpbCBob3N0IHJlcXVpcmUgYSB1c2VybmFtZSAvIHBhc3N3b3JkPycpXHJcblx0XHRcdC5hZGRUb2dnbGUodGV4dCA9PiB0ZXh0XHJcblx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZUF1dGhlbnRpY2F0aW9uKVxyXG5cdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdVc2VBdXRoOiAnICsgdmFsdWUpO1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MudXNlQXV0aGVudGljYXRpb24gPSB2YWx1ZTtcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG5cclxuXHRcdFx0XHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnVzZXJuYW1lU2V0dGluZy5zZXREaXNhYmxlZChmYWxzZSk7XHJcblx0XHRcdFx0XHRcdHRoaXMucGFzc3dvcmRTZXR0aW5nLnNldERpc2FibGVkKGZhbHNlKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMudXNlcm5hbWVTZXR0aW5nLnNldERpc2FibGVkKHRydWUpO1xyXG5cdFx0XHRcdFx0XHR0aGlzLnBhc3N3b3JkU2V0dGluZy5zZXREaXNhYmxlZCh0cnVlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0fSkpO1xyXG5cclxuXHRcdHRoaXMudXNlcm5hbWVTZXR0aW5nID0gbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdVc2VybmFtZScpXHJcblx0XHRcdC5zZXREZXNjKCdVc2VybmFtZSBwcm92aWRlZCBmb3IgaG9zdCBhdXRoZW50aWNhdGlvbicpXHJcblx0XHRcdC5zZXREaXNhYmxlZCghIHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZUF1dGhlbnRpY2F0aW9uKVxyXG5cdFx0XHQuYWRkVGV4dCh0ZXh0ID0+IHRleHRcclxuXHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudXNlcm5hbWUpXHJcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ1VzZXJuYW1lOiAnICsgdmFsdWUpO1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MudXNlcm5hbWUgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHR9KSk7XHJcblxyXG5cdFx0dGhpcy5wYXNzd29yZFNldHRpbmcgPSBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoJ1Bhc3N3b3JkJylcclxuXHRcdFx0LnNldERlc2MoJ1Bhc3N3b3JkIHByb3ZpZGVkIGZvciBob3N0IGF1dGhlbnRpY2F0aW9uJylcclxuXHRcdFx0LnNldERpc2FibGVkKCEgdGhpcy5wbHVnaW4uc2V0dGluZ3MudXNlQXV0aGVudGljYXRpb24pXHJcblx0XHRcdC5hZGRUZXh0KHRleHQgPT4gdGV4dFxyXG5cdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5wYXNzd29yZClcclxuXHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnUGFzc3dvcmQ6ICcgKyB2YWx1ZSk7XHJcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5wYXNzd29yZCA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdH0pKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5zZWN1cmVTZXR0aW5nID0gbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdFbmNyeXB0aW9uJylcclxuXHRcdFx0LnNldERlc2MoJ1doYXQga2luZCBvZiBlbmNyeXB0aW9uIGRvZXMgdGhlIGhvc3QgdXNlPycpXHJcblx0XHRcdC5hZGREcm9wZG93bih0ZXh0ID0+IHRleHRcclxuXHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnRW5jcnlwdGlvbjogJyArIHZhbHVlKTtcclxuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmVuY3J5cHRpb24gPSB2YWx1ZTtcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LmFkZE9wdGlvbihcIk5vbmVcIiwgXCJOb25lXCIpXHJcblx0XHRcdFx0LmFkZE9wdGlvbihcIlRMU1wiLCBcIlRMU1wiKVxyXG5cdFx0XHRcdC5hZGRPcHRpb24oXCJTU0xcIiwgXCJTU0xcIilcclxuXHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5jcnlwdGlvbilcclxuXHRcdCk7XHJcblxyXG5cdFx0Y29udGFpbmVyRWwuY3JlYXRlRWwoJ2gyJywge3RleHQ6ICdFbWFpbCBNZXNzYWdlJ30pO1xyXG5cclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0LnNldE5hbWUoJ1NlbnQgZnJvbScpXHJcblx0XHQuc2V0RGVzYygnU2VudCBmcm9tIGFkZHJlc3MgZm9yIHByZS1maWxsaW5nIEZyb20gZmllbGQgKG9wdGlvbmFsKScpXHJcblx0XHQuYWRkVGV4dCh0ZXh0ID0+IHRleHRcclxuXHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmZyb20pXHJcblx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnRnJvbTogJyArIHZhbHVlKTtcclxuXHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5mcm9tID0gdmFsdWU7XHJcblx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcblx0XHR9KSk7XHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdEZWZhdWx0IFRvOiBhZGRyZXNzIGZvciBlbWFpbHMnKVxyXG5cdFx0XHQuc2V0RGVzYygnVGhpcyBpcyB0aGUgZGVmYXVsdCBkZXN0aW5hdGlvbiBhZGRyZXNzIGZvciBlbWFpbCBtZXNzYWdlcy4nKVxyXG5cdFx0XHQuYWRkVGV4dCh0ZXh0ID0+IHRleHQuc2V0UGxhY2Vob2xkZXIoJ0VtYWlsIGFkZHJlc3MnKVxyXG5cdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWZhdWx0dG8pXHJcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVmYXVsdHRvID0gdmFsdWU7XHJcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHR9KSk7XHJcblxyXG5cdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0LnNldE5hbWUoJ1JlY2VpdmVyJylcclxuXHRcdC5zZXREZXNjKCdSZWNlaXZlciBmb3IgcHJlLWZpbGxpbmcgVG8gZmllbGQgKG9wdGlvbmFsKScpXHJcblx0XHQuYWRkVGV4dCh0ZXh0ID0+IHRleHRcclxuXHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnJlY2VpdmVyKVxyXG5cdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ1JlY2VpdmVyOiAnICsgdmFsdWUpO1xyXG5cdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnJlY2VpdmVyID0gdmFsdWU7XHJcblx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcblx0XHR9KSk7XHJcblxyXG5cdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0LnNldE5hbWUoJ1N1YmplY3QnKVxyXG5cdFx0LnNldERlc2MoJ1N1YmplY3QgZm9yIHByZS1maWxsaW5nIHRoZSBzdWJqZWN0IGZpZWxkIChvcHRpb25hbCknKVxyXG5cdFx0LmFkZFRleHQodGV4dCA9PiB0ZXh0XHJcblx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdWJqZWN0KVxyXG5cdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ1N1YmplY3Q6ICcgKyB2YWx1ZSk7XHJcblx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3Muc3ViamVjdCA9IHZhbHVlO1xyXG5cdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0fSkpO1xyXG5cdFx0XHJcblx0XHRjb250YWluZXJFbC5jcmVhdGVFbCgnaDInLCB7dGV4dDogJ0dyYWRlcyBXZWIgU2VydmljZSd9KTtcclxuXHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoJ1doZW4gdG8gZ2VuZXJhdGUgV2ViIHNlcnZlciBmaWxlJylcclxuXHRcdFx0LnNldERlc2MoJ1doZW4gV2ViIHNlcnZlciBmaWxlIGlzIGdlbmVyYXRlcy4nKVxyXG5cdFx0XHQuYWRkRHJvcGRvd24odGV4dCA9PiB0ZXh0XHJcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3Mud2hlblRvR2VuZXJhdGUgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LmFkZE9wdGlvbihcIm9wZW5cIiwgXCJvcGVuXCIpXHJcblx0XHRcdFx0LmFkZE9wdGlvbihcImNsb3NlXCIsIFwiY2xvc2VcIilcclxuXHRcdFx0XHQuYWRkT3B0aW9uKFwibmV2ZXJcIiwgXCJuZXZlclwiKVxyXG5cdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy53aGVuVG9HZW5lcmF0ZSlcclxuXHRcdCk7XHJcblxyXG5cdH1cclxuXHJcblx0XHJcblxyXG59XHJcbiJdLCJuYW1lcyI6WyJTZXR0aW5nIiwiTW9kYWwiLCJQUkVWSUVXX01PREUiLCJFRElUSU5HX01PREUiLCJNYXJrZG93blJlbmRlcmVyIiwiVGV4dENvbXBvbmVudCIsIkJ1dHRvbkNvbXBvbmVudCIsIkl0ZW1WaWV3IiwiTm90aWNlIiwiVG9nZ2xlQ29tcG9uZW50IiwiVGV4dEFyZWFDb21wb25lbnQiLCJURmlsZSIsIlBsYXRmb3JtIiwiTWVudSIsIkRyb3Bkb3duQ29tcG9uZW50IiwiVEZvbGRlciIsIlBsdWdpbiIsIlBsdWdpblNldHRpbmdUYWIiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNuQyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztBQUN6QyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDcEYsUUFBUSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDMUcsSUFBSSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBQ0Y7QUFDTyxTQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2hDLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxLQUFLLElBQUk7QUFDN0MsUUFBUSxNQUFNLElBQUksU0FBUyxDQUFDLHNCQUFzQixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRywrQkFBK0IsQ0FBQyxDQUFDO0FBQ2xHLElBQUksYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4QixJQUFJLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUMzQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDekYsQ0FBQztBQW9GRDtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDdEcsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDdEgsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUUsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Q7QUFDTyxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0FBQzNDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNySCxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLE1BQU0sS0FBSyxVQUFVLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzdKLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDdEUsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDdEIsUUFBUSxJQUFJLENBQUMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDdEUsUUFBUSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSTtBQUN0RCxZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pLLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxZQUFZLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6QixnQkFBZ0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTTtBQUM5QyxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQ3hFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQjtBQUNoQixvQkFBb0IsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtBQUNoSSxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUMxRyxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFO0FBQ3pGLG9CQUFvQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7QUFDdkYsb0JBQW9CLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FB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LElBQUUsQ0FBQyxJQUFFLENBQUMsR0FBQyxDQUFDO0FBQUMsd0JBQUEsT0FBTyxJQUFJLENBQUM7b0JBQy9CLElBQUcsQ0FBQyxHQUFDLENBQUM7d0JBQUMsQ0FBQyxHQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUM7QUFDOUQsb0JBQUEsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ25CLG9CQUFBLElBQUcsQ0FBQyxJQUFFLENBQUMsSUFBRSxDQUFDLElBQUUsQ0FBQzt3QkFBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsSUFBRSxFQUFFLEdBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxJQUFFLEVBQUUsR0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLElBQUUsS0FBSyxDQUFDLEdBQUMsSUFBSSxDQUFDOztBQUM1RSx3QkFBQSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQTtBQUMvQyxpQkFBQTtBQUFBLGdCQUFBLE9BQU8sQ0FBQyxDQUFBO0FBQUEsYUFBQyxDQUFDO0FBQ2YsUUFBQSxDQUFDLEdBQUMsRUFBRSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsTUFBTSxHQUFDLENBQUMsR0FBQyxJQUFJLEdBQUMsRUFBRSxJQUFFLEdBQUcsR0FBQyxDQUFDLENBQUMsR0FBQyxLQUFLLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxFQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxFQUFFLElBQUUsRUFBRSxJQUFFLEdBQUcsR0FBQyxFQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFDLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO0FBQ3pLLFFBQUEsSUFBRyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUM7QUFBQyxZQUFBLE9BQU8sSUFBSSxDQUFDO0FBQ3RCLFFBQUEsSUFBRyxDQUFDO1lBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBQ25ELFlBQUEsQ0FBQyxHQUFDLENBQUMsQ0FBQyxVQUFDLENBQUMsR0FBQyxJQUFBLENBQUEsR0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBLEdBQUMsQ0FBQyxHQUFDLElBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUEsR0FBRyxHQUFHLENBQUEsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBQSxDQUFBLEdBQUEsRUFBQyxDQUFDLEdBQUMsSUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQSxHQUFDLENBQUMsR0FBQyxTQUFBLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBLEdBQUcsR0FBRyxDQUFBLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUEsQ0FBQSxHQUFBLEVBQUMsQ0FBQyxHQUFDLFNBQUEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUEsR0FBQyxDQUFDLEdBQUMsSUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQSxHQUFHLEdBQUcsQ0FBQSxDQUFDLENBQUM7UUFDL0YsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsSUFBRSxDQUFDLElBQUUsQ0FBQyxJQUFFLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7QUFDbkQsUUFBQSxJQUFHLENBQUM7WUFB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
