const question = document.getElementById ("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const scoreText = document.getElementById("score");


let currentQuestion = {};
let acceptingAnswers = true;
let score =0;
let questionCounter =0;
let availableQuestions = [];

let questions = [
    {
        question: "Commonly used data types DO NOT include",
        choice1:"strings",
        choice2:"booleans",
        choice3:"alerts",
        choice4:"numbers",
        answer: 4
    },
    {
        question: "The condition in an if/else statement is enclosed with ____.",
        choice1:"quotes",
        choice2:"curly brackets",
        choice3:"parenthesis",
        choice4:"square brackets",
        answer: 3
    },
    {
        question: "Arrays in Javascript can be used to store ___.",
        choice1:"numbers and strings",
        choice2:"other arrays",
        choice3:"booleans",
        choice4:"all of the above",
        answer: 4
    },
    {
        question: "String values must be enclosed within ___ when being assigned to variables.",
        choice1:"commas",
        choice2:"curly brackets",
        choice3:"quotes",
        choice4:"parenthesis",
        answer: 2
    },
]

const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
        return window.location.assign("/end.html");
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
choices.forEach( choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
})

availableQuestions.splice(questionIndex, 1);

acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click" , (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = 
        selectedAnswer == currentQuestion.answer ? 'correct'  : 'incorrect';

        if(classToApply == "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

         setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
        })
        

        

    });

incrementScore = num => {
    score += num;
    scoreText.innerText = score;

};


startGame();