const container =document.getElementById("container");
fetch("questions.json")
  .then(response => response.json)()
  .then(data =>{
    data.forEach(question =>{
      const questioncontainer = document.createElement("div");
      questioncontainer.id = question.questionnumber;
      const Newh2 =document.createElement("h2");
      Newh2.textContent=question.questionnumer;
      const Newp = document.cretaeElement("p");
      Newp.textContent = question.question;
          })

  })