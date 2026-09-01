fetch("questions.json")
    .then(response => response.json())
  .then(data => {
    const q1Element = document.getElementById("q1");
    const questionData = data.find(q => q.questionnumber === "q1");
    if (questionData) {
      q1Element.textContent = questionData.question;
    } else {
      q1Element.textContent="ちょっとやばい"
    }
  })
  .catch(error => console.error('エラー:', error));