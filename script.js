const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Tech Modern Language", correct: false },
            { text: "Hyperlink Text Management Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },
    {
        question: "Which language is mainly used to style web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "Python", correct: false },
            { text: "SQL", correct: false }
        ]
    },
    {
        question: "Which language adds interactivity to a webpage?",
        answers: [
            { text: "CSS", correct: false },
            { text: "HTML", correct: false },
            { text: "JavaScript", correct: true },
            { text: "XML", correct: false }
        ]
    },
    {
        question: "Which Git command creates a new Git repository?",
        answers: [
            { text: "git push", correct: false },
            { text: "git init", correct: true },
            { text: "git clone", correct: false },
            { text: "git start", correct: false }
        ]
    },
    {
        question: "What is GitHub mainly used for?",
        answers: [
            { text: "Image editing", correct: false },
            { text: "Video streaming", correct: false },
            { text: "Hosting and collaborating on code", correct: true },
            { text: "Creating operating systems", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const quizElement = document.getElementById("quiz");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

let currentQuestion = 0;
let score = 0;
let answerSelected = false;

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    quizElement.classList.remove("hidden");
    resultElement.classList.add("hidden");
    showQuestion();
}

function showQuestion() {
    resetState();

    const question = questions[currentQuestion];
    questionElement.textContent = `${currentQuestion + 1}. ${question.question}`;

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer");
        button.addEventListener("click", () => selectAnswer(button, answer.correct));
        answersElement.appendChild(button);
    });
}

function resetState() {
    answersElement.innerHTML = "";
    nextButton.disabled = true;
    answerSelected = false;
}

function selectAnswer(button, correct) {
    if (answerSelected) return;

    answerSelected = true;
    nextButton.disabled = false;

    if (correct) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
    }

    document.querySelectorAll(".answer").forEach(answer => {
        answer.disabled = true;
    });
}

function showResult() {
    quizElement.classList.add("hidden");
    resultElement.classList.remove("hidden");
    scoreElement.textContent =
        `You scored ${score} out of ${questions.length}.`;
}

nextButton.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

restartButton.addEventListener("click", startQuiz);

startQuiz();
