class Quiz {
    constructor(questions) {
        this.allQuestion = questions;
        this.activeIndex = 0;
        this.score = 0;
    }
    getCurrentQuestion() {
        return this.allQuestion[this.activeIndex];
    }
    next() {
        if (this.activeIndex < this.allQuestion.length - 1) {
            this.activeIndex = this.activeIndex + 1;
        }
    }
    previous() {
        if (this.activeIndex) {
            this.activeIndex = this.activeIndex - 1;
        }
    }
    render() {
        this.getCurrentQuestion().render(root);
    }
}

class Question {
    constructor(title, options, correctAnswerIndex) {
        this.title = title;
        this.options = options;
        this.correctAnswerIndex = correctAnswerIndex;
    }
    isCorrectAnswer(answer){
        return this.options[this.correctAnswerIndex] === answer;
    }
    getCorrectAnswer() {
        return this.options[this.correctAnswerIndex];
    }
    render(root) {
        root.innerText = "";
        let title = document.createElement("h2");
        let optionBox = document.createElement("fieldsset");

        title.classList.add("question-title");
        title.innerText = `${this.title}`;
        optionBox.setAttribute("id", "options");

        this.options.forEach(option => {
            let label = document.createElement("label");
            let radioInput = document.createElement("input");
            label.innerText = `${option}`;
            label.classList.add("option-label");
            radioInput.setAttribute("type", "radio");
            radioInput.setAttribute("name", "options");
            radioInput.style.display = "none";

            label.prepend(radioInput);
            optionBox.append(label);
        });
        
        root.append(title, optionBox);
        optionBox.addEventListener("click", (event) => {
            answerShowcase(event, optionBox, this);
            addScore(event, this)
        });
    }
}

let q1 = new Question(
    "JavaScript Code can be called by using _____.",
    ["RMI", "Triggering Event", "Preprocessor", "Function/Method"],
    3);

let q2 = new Question(
    "The type of a variable that is volatile is _____.",
    ["Volatile variable", "Mutable variable", "Immutable variable", "Dynamic variable"],
    1);

let q3 = new Question(
    "A hexadecimal literal begins with _____.",
    ["00", "0x", "0X", "Both 0x and 0X"],
    3);

let q4 = new Question(
    "Which of the following is not considered as an error in JavaScript?",
    ["Syntax error", "Missing of semicolons", "Division by zero", "Missing of Bracket"],
    2);

let quiz = new Quiz([q1, q2, q3, q4]);
let root = document.querySelector("#root");
quiz.render();

let nextBtn = document.querySelector("#btn-next");
nextBtn.addEventListener("click", () => {
    quiz.next();
    quiz.render();
});

let prevBtn = document.querySelector("#btn-previous");
prevBtn.addEventListener("click", () => {
    quiz.previous();
    quiz.render();
});

function answerShowcase(event, optionBox, obj) {
    if (event.target.tagName == "LABEL") {
        if (!obj.isCorrectAnswer(event.target.innerText)) {
            event.target.classList.add("red");
        }
        optionBox.children[obj.correctAnswerIndex].classList.add("green");
    }
}

function addScore(event, obj) {
    let score = document.querySelector("#score");
    if (obj.isCorrectAnswer(event.target.innerText)) {
        score.innerText = +score.innerText + 1;
    }
}