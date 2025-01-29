document.addEventListener("DOMContentLoaded", function () {

    const startbutton = document.querySelector(".startbutton");
    const williamtitle = document.querySelector(".williamtitle");
    const firstimage = document.querySelector(".firstimage");
    const secondimage = document.querySelector(".secondimage");
    const firstanswer = document.querySelector("[data-firstanswer]");
    const secondanswer = document.querySelector("[data-secondanswer]");
    const question = document.querySelector("[data-question]");
    const correctSound = document.getElementById("correctSound");
    const wrongSound = document.getElementById("wrongSound");
    let startpage = document.getElementById("startpage");
    let questionsArray = [];
    let correctAnswerArray = [];
    let currentQuestionIndex = 0;
    let answer = "";
    let points = 0;
    let wrongquestions = 0;
    let previousTrueImage = "";
    let previousFalseImage = "";

    const trueImages = [
        "Images/true1.gif",
        "Images/true2.gif",
        "Images/true3.gif",
        "Images/true4.gif",
        "Images/true5.gif"
    ];
    
    const falseImages = [
        "Images/false1.gif",
        "Images/false2.gif",
        "Images/false3.gif",
        "Images/false4.gif",
        "Images/false5.gif"
    ];

    startpage.classList.add("hidden");

    startbutton.addEventListener("click",function(){
        startbutton.classList.add("fadeOut");
        williamtitle.classList.add("fadeOut");
        setTimeout(() => {
            startbutton.style.display = "none";
            williamtitle.style.display = "none";
            startpage.classList.remove("hidden");
            startpage.classList.add("fadeIn");
            currentQuestionIndex=0;
            updateImages();
        }, 1000);
    });

    firstanswer.addEventListener("click",function(){
        answer = "true";
        checkAnswer();
    });

    
    secondanswer.addEventListener("click",function(){
        answer = "false";
        checkAnswer();
    });


    fetch("./questions.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch questions.json");
            }
            return response.json();
        })
        .then((data) => {
            questionsArray = data.questions; 
            correctAnswerArray = data.correctanswer;
            shuffleQuestions();
            displayQuestion();
        })
      
    function displayQuestion() {
        if (currentQuestionIndex < questionsArray.length) {
            question.textContent = questionsArray[currentQuestionIndex];
        } else {
            shuffleQuestions(); 
            location.href = 'win.html';
        }
    };

    function checkAnswer() {
        if (answer === correctAnswerArray[currentQuestionIndex]) {
            currentQuestionIndex++;
            displayQuestion();
            updateImages();
            updatePoints();
            correct();
        } else {
            currentQuestionIndex++;
            displayQuestion();
            updateImages();
            updateWrong();
            wrong();
            if(wrongquestions >= questionsArray.length/3){
                shuffleQuestions(); 
                location.href = 'lose.html';
            };
        }
    };

    function updateImages() {
        let newTrueImage, newFalseImage;
    
        do {
            newTrueImage = trueImages[Math.floor(Math.random() * trueImages.length)];
        } while (newTrueImage === previousTrueImage);
    
        do {
            newFalseImage = falseImages[Math.floor(Math.random() * falseImages.length)];
        } while (newFalseImage === previousFalseImage);
    
        firstimage.src = newTrueImage;
        secondimage.src = newFalseImage;
    
        previousTrueImage = newTrueImage;
        previousFalseImage = newFalseImage;
    }
    

    function updatePoints() {
        points += 1;
        document.getElementById("points").textContent = points;
    };

    function updateWrong() {
        wrongquestions +=1;
        document.getElementById("wrong").textContent = wrongquestions;
    }

    function correct(){
        correctSound.currentTime = 0;
        correctSound.play();
    };
    
    function wrong(){
        wrongSound.currentTime = 1;
        wrongSound.play();
    };
    
    function shuffleQuestions() {
        for (let i = questionsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questionsArray[i], questionsArray[j]] = [questionsArray[j], questionsArray[i]];
            [correctAnswerArray[i], correctAnswerArray[j]] = [correctAnswerArray[j], correctAnswerArray[i]];
        }
    }
        
});