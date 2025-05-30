'use strict';
if (localStorage.getItem('mail')!=""){
    mail.value = localStorage.getItem('mail');
}
else{
    mail.value="Введите свою почту";
}
if (localStorage.getItem('password')!=""){
    password.value = localStorage.getItem('password');
}
else{
    password.value="Введите свой пароль";
}
mail.addEventListener('click', function(){
    if (mail.value=="Введите свою почту"){
        mail.value="";
    }
});
password.addEventListener('click', function(){
    if (password.value=="Введите свой пароль"){
        password.value="";
    }
});
signIn.addEventListener('click', function(){
    localStorage.setItem('mail', mail.value);
    localStorage.setItem('password', password.value);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.jsonstorage.net/v1/json/bfc96661-8056-4b1c-ae5c-2cab58097544/3ec06c49-a3b8-438a-a74c-26b62a831f4e', true);
    xhr.send();
    xhr.addEventListener('readystatechange', function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        let accountArr = JSON.parse(xhr.responseText);
        let templateCode = `
            <nav>
                <div>Основное</div>
                <div>Безопасность</div>
                <div>Оплата</div>
                <div>Курсы</div>
                <div>Конфиденциальность</div>
                <div>Результаты</div>
                <div>Общение</div>
                <div>Регион</div>
            </nav>
            <div id="about">
                <img src="{{img}}" id="avatar">
                <div id = "imgContainIn">
                    <img src="../img/account1.jpg" class="imgInP">
                    <img src="../img/account2.jpg" class="imgInP">
                    <img src="../img/account3.jpg" class="imgInP">
                    <img src="../img/account4.jpg" class="imgInP">
                    <img src="../img/account5.jpg" class="imgInP">
                    <img src="../img/account6.jpg" class="imgInP">
                    <img src="../img/account7.jpg" class="imgInP">
                    <img src="../img/avatarAnton.jpg" class="imgInP">
                </div>
                <h2>ФИО</h2>
                <div class="bio">
                <input type="text" id="namePut">
                <button id="nameChange">Изменить</button>
                </div>
                <h2>Почта</h2>
                <div class="bio">
                <input type="text" id="mailPut">
                <button id="mailChange">Изменить</button>
                </div>
                <h2>Пароль</h2>
                <div class="bio">
                <input type="text" id="passwordPut">
                <button id="passwordChange">Изменить</button>
                </div>
            </div>
        `
        let template = Handlebars.compile(templateCode)
        let accountContainer = document.querySelector('#accounts');
        for (let account of accountArr) {
            if (account.mail == mail.value && account.password == password.value){
                main.innerHTML = template(account);
                namePut.value = account.name;
                mailPut.value = account.mail;
                passwordPut.value = account.password; 
                localStorage.setItem('name', namePut.value);
                localStorage.setItem('mail', mailPut.value);
                localStorage.setItem('img', account.img);
                let imgPPick = "../img/avatarAnton.jpg";
                let imgPArr = document.querySelectorAll('.imgInP');
                for (let imgPA of imgPArr){
                    imgPA.addEventListener('click', function(){
                        account.img = imgPA.getAttribute('src');
                        avatar.src = account.img;
                        let xhrSender = new XMLHttpRequest();
                        xhrSender.open('PUT', 'https://api.jsonstorage.net/v1/json/bfc96661-8056-4b1c-ae5c-2cab58097544/3ec06c49-a3b8-438a-a74c-26b62a831f4e?apiKey=d3745f85-e940-42b1-bbc3-81530398383b', true);
                        xhrSender.setRequestHeader('Content-type','application/json; charset=utf-8');
                        xhrSender.send(JSON.stringify(accountArr));
                        xhrSender.addEventListener('readystatechange', function () { 
                            if (xhrSender.readyState == 4) {
                                if (xhrSender.status == 200) {
                                    alert('Вы сменили аватара!');
                                    localStorage.setItem('img', account.img);
                                } else {
                                    alert('Ошибка изменения. Попробуйте еще раз.');
                                }
                            }
                        });
                    });
                }
                nameChange.addEventListener('click', function(){
                    account.name = namePut.value;
                    let xhrSender = new XMLHttpRequest();
                    xhrSender.open('PUT', 'https://api.jsonstorage.net/v1/json/bfc96661-8056-4b1c-ae5c-2cab58097544/3ec06c49-a3b8-438a-a74c-26b62a831f4e?apiKey=d3745f85-e940-42b1-bbc3-81530398383b', true);
                    xhrSender.setRequestHeader('Content-type','application/json; charset=utf-8');
                    xhrSender.send(JSON.stringify(accountArr));
                    xhrSender.addEventListener('readystatechange', function () { 
                        if (xhrSender.readyState == 4) {
                            if (xhrSender.status == 200) {
                                alert('Вы изменили имя!');
                                localStorage.setItem('name', namePut.value);
                            } else {
                                alert('Ошибка изменения. Попробуйте еще раз.');
                            }
                        }
                    })
                });
                mailChange.addEventListener('click', function(){
                    account.mail = mailPut.value;
                    let xhrSender = new XMLHttpRequest();
                    xhrSender.open('PUT', 'https://api.jsonstorage.net/v1/json/bfc96661-8056-4b1c-ae5c-2cab58097544/3ec06c49-a3b8-438a-a74c-26b62a831f4e?apiKey=d3745f85-e940-42b1-bbc3-81530398383b', true);
                    xhrSender.setRequestHeader('Content-type','application/json; charset=utf-8');
                    xhrSender.send(JSON.stringify(accountArr));
                    xhrSender.addEventListener('readystatechange', function () { 
                        if (xhrSender.readyState == 4) {
                            if (xhrSender.status == 200) {
                                alert('Вы изменили почту!');
                                localStorage.setItem('mail', mailPut.value);
                            } else {
                                alert('Ошибка изменения. Попробуйте еще раз.');
                            }
                        }
                    })
                });
                passwordChange.addEventListener('click', function(){
                    account.password = passwordPut.value;
                    let xhrSender = new XMLHttpRequest();
                    xhrSender.open('PUT', 'https://api.jsonstorage.net/v1/json/bfc96661-8056-4b1c-ae5c-2cab58097544/3ec06c49-a3b8-438a-a74c-26b62a831f4e?apiKey=d3745f85-e940-42b1-bbc3-81530398383b', true);
                    xhrSender.setRequestHeader('Content-type','application/json; charset=utf-8');
                    xhrSender.send(JSON.stringify(accountArr));
                    xhrSender.addEventListener('readystatechange', function () {
                        if (xhrSender.readyState == 4) {
                            if (xhrSender.status == 200) {
                                alert('Вы изменили пароль!');
                                localStorage.setItem('password', passwordPut.value);
                            } else {
                                alert('Ошибка изменения. Попробуйте еще раз.');
                            }
                        }
                    });
                });
                main.style.textAlign = "unset";
                main.style.marginTop = "7%";
            }
            else if(account.mail == mail.value && account.password != account.value){
                alert("Пароль неверный!");
            }
        }
    }
    });
});

signUp.addEventListener('click', function(){
    let templateCode = `
        <h2>Зарегистрируйте <br> Свой акаунт</h2>
        <input type="text" id="nameInput">
        <input type="text" id="mail">
        <input type="text" id="password">
        <div id="imgContain">
            <img src="../img/account1.jpg" class="imgIn">
            <img src="../img/account2.jpg" class="imgIn">
            <img src="../img/account3.jpg" class="imgIn">
            <img src="../img/account4.jpg" class="imgIn">
            <img src="../img/account5.jpg" class="imgIn">
            <img src="../img/account6.jpg" class="imgIn">
            <img src="../img/account7.jpg" class="imgIn">
            <img src="../img/avatarAnton.jpg" class="imgIn">
        </div>
        <button id="signUpReg">Зарегистрироваться</button>
    `
    let template = Handlebars.compile(templateCode)
    contain.innerHTML = template();
    nameInput.value="Введите ФИО";
    mail.value="Введите свою почту";
    password.value="Введите свой пароль";
    nameInput.addEventListener('click', function(){
        if (nameInput.value=="Введите ФИО"){
            nameInput.value="";
        }
    });
    mail.addEventListener('click', function(){
        if (mail.value=="Введите свою почту"){
            mail.value="";
        }
    });
    password.addEventListener('click', function(){
        if (password.value=="Введите свой пароль"){
            password.value="";
        }
    });
    let imgPick = "../img/avatarAnton.jpg";
    let imgArr = document.querySelectorAll('.imgIn');
    for (let imgA of imgArr){
        imgA.addEventListener('click', function(){
            imgPick = imgA.getAttribute('src');
            localStorage.setItem('img', imgPick);
        });
    }
    

    signUpReg.addEventListener('click', function(){
        if (nameInput.value!='Введите ФИО' && mail.value!='Введите свою почту' && password.value!='Введите свой пароль'){
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://api.jsonstorage.net/v1/json/bfc96661-8056-4b1c-ae5c-2cab58097544/3ec06c49-a3b8-438a-a74c-26b62a831f4e', true);
            xhr.send();
            xhr.addEventListener('readystatechange', function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    let accountArr = JSON.parse(xhr.responseText);
                    let newAccount = {
                        name: nameInput.value,
                        mail: mail.value,
                        password: password.value,
                        img: imgPick
                    }
                    accountArr.push(newAccount);
                    localStorage.setItem('mail', newAccount.mail);
                    localStorage.setItem('password', newAccount.password);
                    let xhrSender = new XMLHttpRequest();
                    xhrSender.open('PUT', 'https://api.jsonstorage.net/v1/json/bfc96661-8056-4b1c-ae5c-2cab58097544/3ec06c49-a3b8-438a-a74c-26b62a831f4e?apiKey=d3745f85-e940-42b1-bbc3-81530398383b', true);
                    xhrSender.setRequestHeader('Content-type','application/json; charset=utf-8');
                    xhrSender.send(JSON.stringify(accountArr));
                    xhrSender.addEventListener('readystatechange', function () {
                        if (xhrSender.readyState == 4) {
                            if (xhrSender.status == 200) {
                                alert('Вы зарегестрировались!');
                            } else {
                                alert('Ошибка регистрации. Попробуйте еще раз.');
                            }
                        }
                        location.reload();
                    });
                }
            });
        }
        else{
            alert("Заполните все поля!");
        }
    });
});
forget.addEventListener('click', function(){
    alert('Плохо!');
})