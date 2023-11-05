const questions=[
    {
        question:"which is the first movie of Prabhas?",
        answer:[
            {text:"Chakram",correct:false},
            {text:"Eswar",correct:true},
            {text:"Pournami",correct:false},
            {text:"Rebel",correct:false}
        ]
    },
    {
        question:"How many seconds in a minute?",
        answer:[
            {text:"10sec",correct:false},
            {text:"40sec",correct:false},
            {text:"70sec",correct:false},
            {text:"60sec",correct:true}
        ]
    },
    {
        question:"What is India's National animal?",
        answer:[
            {text:"Lion",correct:false},
            {text:"Rabbit",correct:false},
            {text:"Elepant",correct:false},
            {text:"Tiger",correct:true}
        ]
    },
    {
        question:"Who is King of Kotha?",
        answer:[
            {text:"Raju",correct:true},
            {text:"KannaBhai",correct:false},
            {text:"Ranjith",correct:false},
            {text:"Jinnu",correct:false}
        ]
    }
    
];

const questionArea=document.getElementById("question");
const answersBtn=document.querySelector(".answers-btn");
const nextBtn=document.querySelector(".next-btn");


let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextBtn.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetQuiz();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionArea.innerHTML=questionNo+"."+currentQuestion.question;
    nextBtn.style.display="none";
    currentQuestion.answer.forEach(answer => {
        const ansButton=document.createElement("button");
        ansButton.innerHTML=answer.text;
        ansButton.classList.add("btn");
        answersBtn.appendChild(ansButton);
        if(answer.correct){
            ansButton.dataset.correct=answer.correct;
        }
        ansButton.addEventListener("click",selectAnswer);
    });
}
function selectAnswer(ele){
    const selectedBtn=ele.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answersBtn.children).forEach(ansButton=>{
        if(ansButton.dataset.correct==="true"){
            ansButton.classList.add("correct");
        }
        ansButton.disabled=true;
    });
    nextBtn.style.display="block";
};


function resetQuiz(){
    nextBtn.style.display="none";
    while(answersBtn.firstChild){
        answersBtn.removeChild(answersBtn.firstChild);
    }
}
function showScore(){
    resetQuiz();
    questionArea.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML="Play Again";
    nextBtn.style.display="block";
}
function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextBtn.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }
    else{
        startQuiz();
    }
})

startQuiz();

