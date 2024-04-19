const filters = document.querySelector('#filters');
const logout = document.getElementById('logout');
const bak = document.getElementById('bak');

let data = [];
let uslog = localStorage.getItem("uslog");
let dataconf = [];

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

//Попытка перебора массива в алфавитном порядке
// data.sort(function(a,b){
//   return a.name.localeCompare(b.name);
// });
// console.log(data);

filters.addEventListener('input', filterGoods);

function filterGoods() {
  const
    organization = filters.querySelector('#organization').value,
    types = [...filters.querySelectorAll('#type input:checked')].map(n => n.value),
    priceMin = document.querySelector('#price-min').value,
    priceMax = document.querySelector('#price-max').value;

  outputGoods(data.filter(n => (
    (!organization || n.organization === organization) &&
    (!types.length || types.includes(n.type)) &&
    (!priceMin || priceMin <= n.cost) &&
    (!priceMax || priceMax >= n.cost)
  )));
}

function outputGoods(goods) {
  document.getElementById('goods').innerHTML = goods.map(n => `
    <div class="single-goods">
      <h3>${n.name}</h3>
      <img width="250" height="120" src="${n.image}">
      <p>Организация ${n.organization}</p>
      <p>Тип корабля: ${n.type}</p>
      <p>Цена: ${n.cost}</p>
      <a class="batton btn-pr basket" data-id="${n.dataid}">Купить<span></span></a>
      <div> </div>
      <div> ---------------------------------------- </div>
      <a class="batton btn-pr detail" data-id="${n.dataid}" href="../detail/detail.html">Подробнее<span></span></a>
    </div>
  `).join('');
}

  outputGoods(data);

//Получение id карточки при клике на кнопку
document.onclick = event => {
    if(event.target.classList.contains('basket')){
      sending(event.target.dataset.id);
    }
    else   if(event.target.classList.contains('detail')){
      localStorage.setItem("cardname", data[event.target.dataset.id].name);
    }
}

//Добавление товара в корзину
const sending = id => {
  //Проверка на наличие данных корзины пользователя
  console.log(id);
  
  if (localStorage.getItem(uslog) == null){
    dataconf = JSON.parse(localStorage.getItem(uslog));
    dataconf =[data[id]];
  }
  else{
    var check = true;
    dataconf = JSON.parse(localStorage.getItem(uslog));
    //Перебор localstorage на наличие одинаковых элементов в ячейке
    for(let i = 0; i != dataconf.length; i++){
      if(dataconf[i].name == data[id].name){
        dataconf[i].quantity++;
        console.log(dataconf[i].quantity);
        check = false;
        break;
      }
    }
    //Добавление нового предмета при отсуствии совпадений
    if(check==true){
      let info = [data[id]];
      dataconf.push(...info);
    }
  }
  
  let jsonData = JSON.stringify(dataconf); // Преобразуем объект в JSON строку
  localStorage.setItem(uslog, jsonData); // Сохраняем в localStorage
}
