const body = document.querySelector("body")
const message = document.querySelector(".message");
const text = document.querySelector(".gate p");
const form = document.querySelector(".form");
const input = document.querySelector("input");
const rubrik = document.querySelector("#rubrik")
const loginBtn = document.querySelector(".loginBtn")
const newUserBtn = document.querySelector(".newUserBtn");

const userName = document.getElementById("userN");
const passWord = document.getElementById("passW");
const logout = document.createElement("button");



const users = [
    {
       username: "Fredrik",
        password: "123",
    },
    {
        username: "Carro",
        password: "12345",
    },

];



loginBtn.addEventListener("click", check);

function check () {
    for ( const user of users) {
      if (userName.value === user.username && passWord.value === user.password) {
        loginSuccess(user.username);
        return;
    }   else {
        loginFail();
    }
    }
   
   
}


function loginSuccess (username) {
    message.innerText = `Welcome, ${username} !`;
    userName.value="";
    passWord.value="";
    
    body.appendChild(logout)
    logout.innerText = "Logout";
    logout.style.display = "block"
    loginBtn.style.display = "none"; 
    rubrik.style.display = "none";
    form.style.display = "none";
    message.style.color ="black";
    
}

function loginFail () {
    message.innerText = "Oops! Wrong username or password"
    message.style.color = "red"
    userName.value="";
    passWord.value="";
}

function whenLogout () {
    console.log("hejehej")
    message.innerText = "Vänligen logga in"
    loginBtn.style.display = "block"; 
    rubrik.style.display = "block";
    form.style.display = "block";
    logout.style.display = "none"
    
}

logout.addEventListener("click", whenLogout)