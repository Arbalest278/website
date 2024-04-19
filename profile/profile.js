const prof = document.getElementById('prof_form');
const logout = document.getElementById('logout');
const sell = document.getElementById('sell');
const bak = document.getElementById('bak');

window.onload = function(){
    let users = JSON.parse(localStorage.getItem("users"));
    let uslog = localStorage.getItem("uslog");
    let list = document.querySelectorAll('form > div');
    console.log(list);
    let arr =Array.from(list);
    let score = localStorage.getItem("score");
    sell.textContent = (sell.textContent + " " + score/25 +"%")
    bak.href = "../basket/basket.html"

    if(uslog){
        if(uslog==users.login){
            for (const item of arr) {
                 item.textContent = (item.textContent + " " + users[item.getAttribute("id")])
            }
        }
        else{
        fetch('../database/accounts.json') //Вытаскиваем данные из файла accounts.json
            .then(response => response.json())
            .then(user => {
                for(let i = 0; i < user.length; i++){
                if(uslog == user[i].login) {
                    console.log(user[i]);
                    console.log(arr)
                    for (const item of arr) {
                        const namval = item.getAttribute("id");
                        item.textContent = item.textContent + " " + user[i][namval];
                    }
                }
                } //Пробегаемся циклом по данным файла accounts.json
            })
    }
    }
};

logout.addEventListener('click', e => {
    localStorage.setItem("uslog", "");
    localStorage.setItem("score", "0");
});
