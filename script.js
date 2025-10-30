let Question = document.getElementById("Question");
// ye line id ko call kara rahi hai html page ki andar se kyu ki html ki andar kuch change kar na hai tu id ki madat se kar sekti hai or ye work kar ghi ahi <p> tag par

let nextquestion = document.querySelector("#nextquestion");
// ye line id ki class ko call kar rhi hai or  yhi work kar rhi hai button par

let options = document.getElementsByClassName("option");
// ye line class ko call kar rhi hai har <input> par or ye all input pe ek hi class name hai

let labels = document.getElementsByClassName("label");
// ye line class ko call kar rhi hai <lable> ki andar se lable ki andar class hai us ka name hai lable

let paragraph = document.querySelector("p");
// ye line html ki element ko render kar rhi hai

let percentage = document.getElementById("percentage");
// ye line ek id ko call kar rhi hai jika name percentage hai or ye ek <p> tag ki andar hai or yhi user ki percentage ko show kar rhi hai

let start = document.getElementById("start");
// ye line hai jo ek id call kar rhi hai or yhi <button> ki andar ek id hai jo <button> tag ko show kar rhi hai start now ka

let Questionnumber = 0;
// ye line question  ka number ko check kar ki 0 set kar rhi hai
let score = 0;
// ye line user ki correct answer ko check ki aur use count kar rhi hai

let questiondata = [];
// ye line JSON file se question ka data aayega , or all the question store for json file
let Qizequestion = () => {
  // ye line ek arrow function jo button par work kar rhi hai or ye game ko start kar ne ka bhi function hai
  fetch("./Data.json") // ye line data.json file ko fetch kar rhi hai
    .then((res) => res.json()) // ye line res ko json file me convert kar rhi hai
    .then((data) => {
      questiondata = data;
      // ye line converted data ko json file me questiondata ko array me store kar rhi hai

      showquestion(); // ye line pehla question ko show kar rhi hai
    })
    .catch((error) => console.error("Error:", error)); // ye line agar data ko fetch kar ti time koi error aayi tu jo tu jo error console me show kare ga

  start.style.display = "none"; // ye line "Start Now" <button> ko hidden kar rhi hai jo html file me show kar rha hai

  nextquestion.style.display = "block"; // ye line "Next Question" <button> ko show kar rhi hai jo html file hidden hai
};

function showquestion() {
  // ye line ek function hai jo current question ko html me show karega

  if (Questionnumber >= questiondata.length) {
    // ye line ek if condition hai agar Questionnumber ki length questiondata.length se zyada ho gahi tu showresult show kar de gha

    showresult(); // ye line showresult function() ko call kar rha rhi hai
    return;
  }

  let currentq = questiondata[Questionnumber]; // ye line current question ko data array se  nikal rhi hai

  Question.innerHTML = `Question ${Questionnumber + 1} : ${currentq.Question}`; // ye line Questiontext ko html me likh rhi hai

  nextquestion.textContent = `Next Question`; // ye line next <button> ka text set kar rhi hai

  paragraph.style.fontSize = "20px"; // ye line paragraph ki size ko large kar rhi hai 20px se

  for (let i = 0; i < options.length; i++) {
    // ye line ek for loop ko chala rhi hai or all option and lable ko show kar rhi hai

    if (currentq.Option[i]) {
      // ye line if condition hai , jo ki current question ki ith option exist karta hai

      options[i].style.display = "inline-block";
      // ye line options ko show kar rhi hai

      options[i].value = currentq.Option[i];
      // ye line option ki value ko set kar rhi hai

      labels[i].textContent = currentq.Option[i];
      // ye line <lable> tage me option ka txt show kar rhi hai

      options[i].checked = false;
      // ye line check kar rhi hai ki phela se koi option select nhi ho tu le false hai

      labels[i].style.display = "inline-block";
      // ye line <lable> ko bhi show kar rhi hai
    } else {
      options[i].style.display = "none";
      labels[i].style.display = "none";
      // ye lines option exist nhi karti hai tu <option> or <lable> ko hidden kar do
    }
  }
}

nextquestion.addEventListener("click", () => {
  // ye line jab user next question par click kare jah tab  addEventListener chalega

  let answer = ""; // ye line answer ko store kar rhi hai , or answer ko store kar ne ki liye ye variable banna ya hai

  for (i of options) {
    // ye line for loop hai jo check kar rahi hai ki sare option ko check kar rahi hai ki kon sa option select huva hai

    if (i.checked) {
      answer = i.value;
      break;
      // ye lines select wali option ki value ko le rha hai
    }
  }
  if (!answer) {
    alert("Please Choosie The Option");
    return;
    // ye lines user ne koi option ko select nhi kya hai tu ek alert show kari gha "Please Choosie The Option"
  }

  let correctanswer = questiondata[Questionnumber]?.Answer;
  // ye line correct answer ko currentquestion se le raha hai

  if (answer === correctanswer) {
    score++;
    // ye lines agar select kiya huva answer correct hai tu score is increase
  }

  if (Questionnumber >= questiondata.length) {
    // console.log("tasdjf")
    window.location.reload();
    // ye lines hai ki agar question ki length zyada ho tu page ko wapas reload kar do
  }
  if (Questionnumber == questiondata.length - 1) {
    nextquestion.innerHTML = `Try Again `;
    // ye lines hai ki agar question last ye tu us ki paas Try again ka <button> show
  }

  Questionnumber++; // ye line hai ki jo next question dekh ne ki liye next question ko show karo

  showquestion(); // ye line next question ko show kar de ga
});

function showresult() {
  // ye line qize ki result ko show kar raha hai ye function()

  Question.innerHTML = `Your Quiz Over!`;
  // ye line question ki jagah ye line show kar rhi hai

  paragraph.innerHTML = `Your Score: <strong>${score}</strong> / ${questiondata.length}`;
  // ye line paragraph ki jagaha score show kar rhi hai

  for (let i = 0; i < options.length; i++) {
    options[i].style.display = "none";
    labels[i].style.display = "none";
    // ye lines all "options" and "lables" ko show kar rhi hai
  }

  let percent = (score / questiondata.length) * 100; // ye line  percentage ko calculate kar rhi hai or

  percentage.innerHTML = `Your Percentage : <strong> ${percent}% <strong> `; // ye line percentage ko calculate kar ki percentage show hu raha hai
}
