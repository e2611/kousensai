"use strict";
const moreinfobtn = document.getElementById("moreinfobtn");
moreinfobtn.addEventListener("click",()=>{
    window.open("https://www.akashi.ac.jp/departments.html","_blank");
})
const starttestbtn = document.getElementById("starttestbtn");
starttestbtn.addEventListener("click",()=>{
    location.href="test.html";
})
const title= document.getElementById("title");
title.addEventListener("click",()=>{
    location.href="index.html";
})
