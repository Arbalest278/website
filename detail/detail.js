const tov = document.getElementById('tov');
const logout = document.getElementById('logout');
const bak = document.getElementById('bak');
const img = document.getElementById('img');

let data = [];
let uslog = localStorage.getItem("uslog");
let cardname = localStorage.getItem("cardname");
let list = document.querySelectorAll('form > div');
console.log(list);
let arr =Array.from(list);

//Загрузка страницы и обновление кнопок
window.onload = function(){
  if(uslog){
    logout.textContent = uslog;
    logout.href = "../profile/profile.html";
    bak.href = "../basket/basket.html"
  }
};

//Получение данных
let response = await fetch('../database/cards.json');
if (response.ok) { 
  data = await response.json();
}

for(let i = 0; i < data.length; i++){
    if(cardname == data[i].name) {
        for (const item of arr) {
            const namval = item.getAttribute("id");
            item.textContent = item.textContent + " " + data[i][namval];
        }
        img.src = data[i].image;
        break;
    }
} //Пробегаемся циклом по данным файла accounts.json