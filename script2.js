const container = document.getElementById("container");
fetch("questions.json")
  .then(response => response.json()) 
  .then(data => {    
    data.forEach(question => {
      const questioncontainer = document.createElement("div");
      questioncontainer.id = question.questionnumber;
      container.appendChild(questioncontainer);
      const Newh2 = document.createElement("h2");
      Newh2.textContent = question.questionnumber;
      const Newp = document.createElement("p");
      Newp.textContent = question.question;
      questioncontainer.appendChild(Newh2);
      questioncontainer.appendChild(Newp);
      question.options.forEach(option =>{
        const label = document.createElement("label");
        label.textContent= option.text;
        label.classList.add("reverse");
        const input = document.createElement("input");
        input.type="radio";
        input.value=option.dep;
        input.name=question.questionnumber;
        questioncontainer.appendChild(label);
        label.appendChild(input);
      })
    });
  });