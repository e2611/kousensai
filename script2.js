const container = document.getElementById("container");
fetch("questions.json")
  .then(response => response.json()) 
  .then(data => {    
    data.forEach(question => {
      const questioncontainer = document.createElement("div");
      questioncontainer.id = question.questionnumber;
      container.appendChild(questioncontainer);
      const Newh2 = document.createElement("h2");
      Newh2.classList.add("text");
      Newh2.textContent = question.questionnumber;
      const Newp = document.createElement("p");
      Newp.classList.add("text");
      Newp.textContent = question.question;
      questioncontainer.appendChild(Newh2);
      questioncontainer.appendChild(Newp);
      question.options.forEach(option =>{
        const label = document.createElement("label");
        label.textContent= option.text;
        label.classList.add("reverse");
        label.classList.add("text");
        const input = document.createElement("input");
        input.type="radio";
        input.value=option.dep;
        input.name=question.questionnumber;
        input.required=true;
        questioncontainer.appendChild(label);
        label.appendChild(input);
      })
    });
  });
const resultcontainer = document.getElementById("resultcontainer");
const resultbtn = document.createElement("button");
resultcontainer.appendChild(resultbtn);
resultbtn.textContent="診断結果を見る";
resultbtn.classList.add("button-style");
resultbtn.addEventListener("click", () => {
  const questionDivs = container.querySelectorAll("div[id^='Q']");
  const selectedValues = [];
  questionDivs.forEach(div => {
    const checkedInput = div.querySelector('input[type="radio"]:checked');
    if (checkedInput) {
      selectedValues.push(checkedInput.value);
    }
  });
  if (selectedValues.length < questionDivs.length) {
    alert("すべての質問に回答してください。");
    return;
  }
  const counts = {};
  selectedValues.forEach(val => {
    counts[val] = (counts[val] || 0) + 1;
  });
  let maxCount = 0;
  let resultType = "";
  for (const type in counts) {
    if (counts[type] > maxCount) {
      maxCount = counts[type];
      resultType = type;
    }
  }
  const resultMessages = {
    "E": "E科",
    "A": "A科",
    "M": "M科",
    "C": "C科"
  };
  let resultDisplay = document.getElementById("result-display");
  if (!resultDisplay) {
  resultDisplay = document.createElement("p");
  resultDisplay.id = "result-display";
  resultcontainer.appendChild(resultDisplay);
  }
  resultDisplay.textContent = `診断結果：${resultMessages[resultType] }`;
  let sharex =document.getElementById("share-btn");
  if (!sharex) {
    sharex =document.createElement("button");
    sharex.id="share-btn";
  }
  const text = encodeURIComponent(resultMessages[resultType]);
  const url = encodeURIComponent('https://e2611.github.io/kousensai/');
  sharex.innerHTML = `<a href="https://twitter.com/intent/tweet?text=${text}&url=${url}" target="_blank">Xでシェア</a>`;
  resultcontainer.appendChild(sharex);
});