const signInBtn = document.querySelector('.signin-btn');
const signUpBtn = document.querySelector('.signup-btn');
const formBox = document.querySelector('.form-box');
const auth = document.getElementById('auth_form');
const reg = document.getElementById('reg_form');
const body = document.body;

signUpBtn.addEventListener('click', function(){
    formBox.classList.add('active'); //Присваиваем formBox класс active
    body.classList.add('active'); //Присваиваем body класс active
}) //Обработчик нажатия кнопки регистрации

signInBtn.addEventListener('click', function(){
    formBox.classList.remove('active'); //Удаляем formBox класс active
    body.classList.remove('active'); //Удаляем body класс active
})  //Обработчик нажатия кнопки входа 

auth.addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем отправку формы

    const formData = {}; // Объект для хранения данных формы

    // Проходимся по всем элементам формы
    auth.querySelectorAll('input').forEach(input => {
        const name = input.name;
        const value = input.value;

        // Добавляем данные в объект formData
        if (name) {
            formData[name] = value;
        }
    });

    let users = JSON.parse(localStorage.getItem("users")); //Преобразовываем данные из localStorage в объект

    if(users.login == formData.login && users.password == formData.password) //Проверяем данные из формы с данными из localStorage
    {
        window.location.href = '../lobby/index.html';
        localStorage.setItem("uslog", users.login);
    }
    else //В случае несоотвествия данных из формы с данными из localStorage
    {
        fetch('../database/accounts.json') //Вытаскиваем данные из файла accounts.json
        .then(response => response.json())
        .then(user => {
            for(let i = 0; i < user.length; i++){
            if(formData.login == user[i].login && formData.password == user[i].password) {
                window.location.href = '../lobby/index.html';
                localStorage.setItem("uslog", user[i].login);
                return;
            }
        } //Пробегаемся циклом по данным файла accounts.json
        alert('Неверный логин или пароль!'); //При полном несоотвествии
        })
    }
});

reg.addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем отправку формы

    const formData = {}; // Объект для хранения данных формы

    // Проходимся по всем элементам формы
    reg.querySelectorAll('input').forEach(input => {
        const name = input.name;
        const value = input.value;

        // Добавляем данные в объект formData
        if (name) {
            formData[name] = value;
        }
    });

    let jsonData = JSON.stringify(formData); // Преобразуем объект в JSON строку
    localStorage.setItem('users', jsonData); // Сохраняем в localStorage
    window.location.href = './logining.html';
});