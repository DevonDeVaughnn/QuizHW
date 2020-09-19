function askQuestions(text, choices, answers) {
    this.text = text;
    this.choices = choices;
    this.answers = answers;
}
askQuestions.prototype.correctAnswer = function (choices) {
    return choices === this.answers;
}
function quizQue(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
quizQue.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex];
}
quizQue.prototype.isOver = function () {
    return this.questions.length === this.questionIndex;
}
quizQue.prototype.guessAnswer = function (answer) {
    if (this.getQuestionIndex().correctAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

function populate() {
    if (quiz.isOver()) {
        showScore();
    } else {
        //show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        //show choices
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guessAnswer("btn" + i, choices[i]);
        }
        showProgress();
    }
};



function guessAnswer(id, guessAnswer) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guessAnswer(guessAnswer);
        populate();
    }

};

function showProgress() {
    var currentQuestion = quiz.questionIndex + 1;
    var element = document.getElementById("prog");
    element.innerHTML = "Question " + currentQuestion + " of " + quiz.questions.length;
};

function showScore() {
    var quizOver = "<h1>Result</h1>"
    quizOver += "<h4 id = 'score'> Your score: " + quiz.score + "<h4>";
    var element = document.getElementById("quiz");
    element.innerHTML = quizOver;

 
};
let questions = [
    new askQuestions("Who is the actor that plays Doctor Strange?", ["Beneficial Cucumber", "Benadryl Crumplestick", "Benjamin Cuddlefish", "Benevolent Chickenstrip"], "Benevolent Chickenstrip"),

    new askQuestions("Who won a Primetime Emmy for their role in Sherlock?", ["Blasphemy Clickbait", "Benadryl Coughsyrup", "Butterfree Crumplesnap", "Burlington Coatfactory"], "Blasphemy Clickbait"),

    new askQuestions("Which actor has a tough time pronouncing the word 'Penguin'?", ["Sofia Vergara", "Timothy Chalamet", "Bendystraw Constable", "Broccoli Coddlesworth"], "Bendystraw Constable"),

    new askQuestions("Who won the British Academy Television Award for Best Actor in 2019?", ["Benedict Cumberbatch", "Idris Elbows", "Chiwetel Ejiofor", "Bendyboot Coffeecup"], "Benedict Cumberbatch"),

    new askQuestions("Which actor has an eye condition called heterochromia meaning their eyes are different colors?", ["Boilerdang Crimpysnitch", "Bendybobert Cackleboon", "Bonaparte Curdlesnoot", "Ben Ten"], "Bonaparte Curdlesnoot"),
]
var quiz = new quizQue(questions);
populate();


