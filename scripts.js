let body = document.body;
let box = document.createElement("div");
let login = document.getElementById("login");
let form = document.createElement("form");
let user = document.createElement("input");
let psw = document.createElement("input");
let btnLog = document.createElement("button");
let error = document.createElement("p");
let btnOut = document.createElement("a");
let userName;
let userPass;
let userFromStorage = localStorage.getItem("user");
let userForRequests = JSON.parse(userFromStorage);
let nick = document.createElement("a");

box.classList.add("box");
form.classList.add("form");
btnLog.classList.add("btnLog");
psw.type = "password";
user.placeholder = "Введите логин";
psw.placeholder = "Введите пароль";
btnLog.textContent = "Войти";
btnOut.classList.add("OUT");

form.append(error, user, psw, btnLog);
box.append(form);

login.addEventListener("click", () => {
  body.prepend(box);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  userName = user.value.trim();
  userPass = psw.value.trim();

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((json) => {
      let flag = true;
      for (const uInf of json) {
        if (uInf.username == userName && uInf.address.zipcode == userPass) {
          check();
          localStorage.setItem("user", JSON.stringify(userName));
        }
      }
      if (flag) {
        error.style.color = "red";
        error.textContent = "Неверно ввели данные";
      }
    });
});

if (userForRequests) {
  userName = userForRequests;
  check();
}

function check() {
  box.remove();
  flag = false;
  let log = document.getElementById("log");
  let img = document.createElement("img");
  log.innerHTML = "";
  nick.textContent = userName;
  btnOut.textContent = "Выйти";
  btnOut.href = "./index.html";
  img.src =
    "https://images.assetsdelivery.com/compings_v2/viktorijareut/viktorijareut1708/viktorijareut170800034.jpg";
  nick.classList.add("nick");
  img.classList.add("ava");
  log.append(nick, img, btnOut);
}

btnOut.addEventListener("click", () => {
  localStorage.clear();
});

// let res = arr.filter((item) => item < 8);
// console.log(res);

nick.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((json) => {
      let title = document.head;
      title.children[2].innerHTML = `${userName} profile`;
      let nickInfo = json.filter((user) => user.username == userName);
      console.log(nickInfo);
    });
});
