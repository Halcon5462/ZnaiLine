'use strict';
//plus
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
  mousewheel: true,
  keyboard: true,
});
//teachers
let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.jsonstorage.net/v1/json/bfc96661-8056-4b1c-ae5c-2cab58097544/3d7614dc-c837-4fdb-ba9a-e4bd6d03a8e9', true);
xhr.send();
xhr.addEventListener('readystatechange', function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    let teacherArr = JSON.parse(xhr.responseText);
    let templateCode = `
        <div class="teacher">
            <img src="{{img}}">
            <h3>{{name}}</h3>
            <p>{{description}}</p>
        </div>
    `
    let template = Handlebars.compile(templateCode)
    let teacherContainer = document.querySelector('#teachers');
    for (let teacher of teacherArr) {
        teacherContainer.innerHTML += template(teacher);
    }
  }
});
//students
let xhrStudents = new XMLHttpRequest();
xhrStudents.open('GET', 'https://api.jsonstorage.net/v1/json/bfc96661-8056-4b1c-ae5c-2cab58097544/7954da22-e097-495b-bf9c-fb68c4c33010', true);
xhrStudents.send();
xhrStudents.addEventListener('readystatechange', function () {
  if (xhrStudents.readyState == 4 && xhrStudents.status == 200) {
    let nameBtnArr = JSON.parse(xhrStudents.responseText);
    let templateCode = `
      <button class="nameBtn"><h3>{{shortName}}</h3></button>
    `
    let template = Handlebars.compile(templateCode)
    let nameNav = document.querySelector('#nameList');
    for (let nameBtn of nameBtnArr) {
        nameNav.innerHTML += template(nameBtn);
    }
    let BtnArr = document.querySelectorAll('.nameBtn');
      for (let btn of BtnArr){
        btn.addEventListener('click', function(){
          let studentsArr = JSON.parse(xhrStudents.responseText);
          let templateCode = `
            <img src="{{img}}">
            <h2>{{fullName}}</h2>
            <p>{{text1}}</p>
            <p>{{text2}}<p>
          `
          let template = Handlebars.compile(templateCode)
          let studentContainer = document.querySelector('#description');
          for (let student of studentsArr) {
            if (student.shortName == btn.firstChild.innerHTML){
              studentContainer.innerHTML = template(student);
            }
          }
        });
      }
  }
});

