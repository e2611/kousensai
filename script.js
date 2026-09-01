"use strict";
const moreinfobtn = document.getElementById("moreinfobtn");
moreinfobtn.addEventListener("click",()=>{
    window.open("https://www.akashi.ac.jp/departments.html","_blank");
})
const starttestbtn = document.getElementById("starttestbtn");
starttestbtn.addEventListener("click",()=>{
    location.href="test.html";
})
fetch("questions.json")
    .then(response => response.json())
  .then(data => {
    console.log(data.name);
  })
  .catch(error => console.error('エラー:', error));
