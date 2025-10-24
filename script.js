
let Question = document.getElementById("Question");
let nextquestion = document.querySelector('#nextquestion');
let options = document.getElementsByClassName("option");
let labels = document.getElementsByClassName("label");
let paragraph = document.querySelector('p');
let percentage = document.getElementById('percentage')

let Questionnumber = 0;
let score = 0;
let questiondata = [];

let Qizequestion = () => {
    fetch('./Data.json')
        .then((res) => res.json())
        .then((data) => {

            questiondata = data;
            showquestion();

        }).catch((error) =>
            console.error("Error:", error));
};


function showquestion() {
    if (Questionnumber >= questiondata.length) {
        showresult();
        return;
    }

    let currentq = questiondata[Questionnumber];

    Question.innerHTML = `Question ${Questionnumber + 1} : ${currentq.Question}`
    nextquestion.textContent = `Next Question`;
    paragraph.style.fontSize = "20px";

    for (let i = 0; i < options.length; i++) {
        if (currentq.Option[i]) {
            options[i].style.display = "inline-block";
            options[i].value = currentq.Option[i];
            labels[i].textContent = currentq.Option[i]
            options[i].checked = false;
            labels[i].style.display = "inline-block";
        }
        else {
            options[i].style.display = "none";
            labels[i].style.display = "none";
        }
    }
}


nextquestion.addEventListener("click", () => {
    let answer = "";
    for (i of options) {
        if (i.checked) {
            answer = i.value
            break;
        }
    }
    if (!answer) {
        alert('Please Chooise The Any Option : ')
        return;
    }

    let correctanswer = questiondata[Questionnumber]?.Answer;
    if (answer === correctanswer) {
        score++
    }
    if (Questionnumber >= questiondata.length) {
        // console.log("tasdjf")
        window.location.reload();
    }
    if (Questionnumber == questiondata.length - 1) {
        nextquestion.innerHTML = `Try Again `
    }


    Questionnumber++;
    showquestion();
});


function showresult() {
    Question.innerHTML = `Your Quiz Over!`;
    paragraph.innerHTML = `Your Score: <strong>${score}</strong> / ${questiondata.length}`;
    for (let i = 0; i < options.length; i++) {
        options[i].style.display = "none";
        labels[i].style.display = "none";
    }

    let percent = (score / questiondata.length) * 100;
    percentage.innerHTML = `Your Percentage : <strong> ${percent}% <strong> `
}