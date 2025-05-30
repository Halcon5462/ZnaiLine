'use strict';
yourAvatar.src  = localStorage.getItem('img');
yourName.innerHTML = localStorage.getItem('name');
if (yourName.innerHTML == ""){
    alert('Войдите или зарегистрируйте аккаунт!');
}
let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.jsonstorage.net/v1/json/bfc96661-8056-4b1c-ae5c-2cab58097544/f6837b9d-60c6-4ebf-b53d-d9bc5b169510', true);
xhr.send();
xhr.addEventListener('readystatechange', function(){
    if (xhr.readyState == 4 && xhr.status == 200) {
        let fbArr = JSON.parse(xhr.responseText);
        let templateCode = `
            <div class="FB">
                <img src="{{img}}">
                <div id="text">
                    <h3>{{name}}</h3>
                    <p>{{text}}</p>
                </div>
            </div>
        `
        let template = Handlebars.compile(templateCode);
        for (let fb of fbArr){
            main.innerHTML += template(fb);
        }
        sendBtn.addEventListener('click', function(){
            let xhrSender = new XMLHttpRequest();
            xhrSender.open('PUT', 'https://api.jsonstorage.net/v1/json/bfc96661-8056-4b1c-ae5c-2cab58097544/f6837b9d-60c6-4ebf-b53d-d9bc5b169510?apiKey=d3745f85-e940-42b1-bbc3-81530398383b', true);
            xhrSender.setRequestHeader('Content-type','application/json; charset=utf-8');
            let newFb = {
                img: localStorage.getItem('img'),
                name: localStorage.getItem('name'),
                text: yourText.value
            }
            fbArr.push(newFb);
            xhrSender.send(JSON.stringify(fbArr));
            xhrSender.addEventListener('readystatechange', function () {
                if (xhrSender.readyState == 4) {
                    if (xhrSender.status == 200) {
                        alert('Ваш отзыв отправлен');
                    } else {
                        alert('Ошибка отправки. Попробуйте еще раз.');
                    }
                }
                location.reload();
            });
        });
    }
});
