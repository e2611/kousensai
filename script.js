"use strict";

const title = document.getElementById("title");
if (title) {
  title.addEventListener("click", () => {
    location.href = "index.html";
    
  });
}

const pathname = window.location.pathname;
if (pathname.includes("test.html")) {
  const container = document.getElementById("container");
  const answercontainer = document.getElementById("answercontainer");
  const buttoncontainer = document.getElementById("b");
  const resultcontainer = document.getElementById("resultcontainer");

  fetch("questions.json")
    .then((response) => response.json())
    .then((data) => {
      const questionContainers = [];

      data.forEach((question, index) => {
        const questioncontainer = document.createElement("div");
        questioncontainer.id = question.questionnumber;
        questioncontainer.hidden = index !== 0;

        const qTitle = document.createElement("h2");
        qTitle.classList.add("text");
        qTitle.textContent = question.questionnumber;

        const qText = document.createElement("p");
        qText.classList.add("text");
        qText.textContent = question.question;

        questioncontainer.appendChild(qTitle);
        questioncontainer.appendChild(qText);

        question.options.forEach((option) => {
          const label = document.createElement("label");
          label.classList.add("reverse");
          label.classList.add("text");

          const input = document.createElement("input");
          input.type = "radio";
          input.value = option.dep;
          input.name = question.questionnumber;
          input.required = true;

          const textNode = document.createTextNode(option.text);
          label.appendChild(input);
          label.appendChild(textNode);
          questioncontainer.appendChild(label);
        });

        const actionButton = document.createElement("button");
        actionButton.type = "button";
        actionButton.classList.add("button-style");
        actionButton.textContent = index === data.length - 1 ? "診断結果を見る" : "次へ";

        actionButton.addEventListener("click", () => {
          const checkedInput = questioncontainer.querySelector('input[type="radio"]:checked');
          if (!checkedInput) {
            alert("回答を選択してください。");
            return;
          }

          if (index < data.length - 1) {
            questioncontainer.hidden = true;
            questionContainers[index + 1].hidden = false;
            questionContainers[index + 1].scrollIntoView({ behavior: "smooth" });
            return;
          }

          const selectedValues = [];
          questionContainers.forEach((div) => {
            const selected = div.querySelector('input[type="radio"]:checked');
            if (selected) selectedValues.push(selected.value);
          });

          if (selectedValues.length < questionContainers.length) {
            alert("すべての質問に回答してください。");
            return;
          }

          const counts = {};
          selectedValues.forEach((value) => {
            counts[value] = (counts[value] || 0) + 1;
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
            E: "E科（電気情報工学科）",
            A: "A科（建築学科）",
            M: "M科（機械工学科）",
            C: "C科（都市システム工学科）"
          };

          let resultDisplay = document.getElementById("result-display");
          if (!resultDisplay) {
            resultDisplay = document.createElement("p");
            resultDisplay.id = "result-display";
            buttoncontainer.appendChild(resultDisplay);
          }

          let suburl = "";
          switch (resultType) {
            case "E":
              suburl = "https://www.akashi.ac.jp/electrical.html";
              break;
            case "A":
              suburl = "https://www.akashi.ac.jp/architecture.html";
              break;
            case "M":
              suburl = "https://www.akashi.ac.jp/mechanical.html";
              break;
            case "C":
              suburl = "https://www.akashi.ac.jp/civil.html";
              break;
          }

          resultDisplay.textContent = `診断結果：${resultMessages[resultType]}`;
          resultDisplay.classList.add("text", "result");

          let learnmore = document.getElementById("learnmore");
          if (!learnmore) {
            learnmore = document.createElement("div");
            learnmore.id = "learnmore";
            buttoncontainer.appendChild(learnmore);
          }
          learnmore.innerHTML = `<div id="learnmore" class="learn-btn" onclick="window.open('${suburl}')"><i class="fa-solid fa-arrow-up-right-from-square"></i>この学科について</div>`;

          let sharex = document.getElementById("share-btn");
          if (!sharex) {
            sharex = document.createElement("a");
            sharex.id = "share-btn";
            sharex.classList.add("sharex-btn");
            resultcontainer.appendChild(sharex);
          }

          const text = encodeURIComponent(resultMessages[resultType]);
          const url = encodeURIComponent("https://e2611.github.io/kousensai/");
          sharex.innerHTML = `<a href="https://twitter.com/intent/tweet?text=${text}&url=${url}" target="_blank" style="text-decoration:none;color:#F4F4F4;">結果を<i class="fa-brands fa-x-twitter"></i>でポスト</a>`;

          let restartbtn = document.getElementById("restart-btn");
          if (!restartbtn) {
            restartbtn = document.createElement("button");
            restartbtn.id = "restart-btn";
            restartbtn.classList.add("restart-btn");
            restartbtn.innerHTML = "<i class=\"fa-solid fa-rotate-right\"></i>もう一度診断する";
            resultcontainer.appendChild(restartbtn);
          }

          restartbtn.scrollIntoView({ behavior: "smooth" });
          restartbtn.onclick = () => {
            location.reload();
            window.scrollTo(0, 0);
          };
        });

        questioncontainer.appendChild(actionButton);
        container.appendChild(questioncontainer);
        questionContainers.push(questioncontainer);
      });
    })
    .catch((error) => {
      console.error("質問の読み込みに失敗しました:", error);
    });
}