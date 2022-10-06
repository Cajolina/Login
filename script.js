const body = document.querySelector("body")
const message = document.querySelector(".message");
const text = document.querySelector(".gate p");
const form = document.querySelector(".form");
const input = document.querySelector("input");
const rubrik = document.querySelector("#rubrik")
const loginBtn = document.querySelector(".loginBtn")
const newUserBtn = document.querySelector(".newUserBtn");
const newUserContainer = document.querySelector(".newUserContainer")

const createBtn = document.querySelector(".createBtn")
const userName = document.getElementById("userN");
const passWord = document.getElementById("passW");
const logout = document.createElement("button");
const newUserN = document.getElementById("newUserN");
const newPassW = document.getElementById("newPassW");

checkLog()

//kontrollerar om nyckeln "loggedInUser" finns i localStorage. så fort någon loggar in skapas nyckeln, (när någon loggar ut tar vi bort den i whenLogOut.) Om nyckeln finns är någon inloggad, då vill jag visa den sidan som använderna ser när man har loggat in. Refresha
function checkLog() {
    if (localStorage.getItem("loggedInUser"))  //*finns loggInUser som nyckel i localstorag 
    { //Hämtar värdet från angiven nyckel & visar  
        const pungsvett = localStorage.getItem("loggedInUser")
        loginSuccess(pungsvett);

    }
   
} 


//En array med sparade användarnamn och lösen
const users = [
    {
       username: "fredrik",
        password: "12345",
    },
    {
        username: "Carro",
        password: "123456",
    },
]; 



//Kontrollerar om myList finns i localStorage. !=tvärtom OM det INTE finns något i mylist så skapar den mylist i local storage. (När någon annan användare ska kolla på sidan) 

if (!localStorage.getItem("myList")){ //om den redan finns vill man inte skriva över hela tiden 
    localStorage.setItem("myList", JSON.stringify(users)) 
} //om den inte finns lägger vi till den



newUserContainer.style.display = "none"

//Dölj create form
newUserBtn.addEventListener("click", newUserScreen)

//När man klickar på join now kommer denna sida upp
function newUserScreen (){
message.innerText = `Want ot join us?`
rubrik.innerText = "Create account"
form.style.display = "none"
message.style.color ="black";
newUserContainer.style.display ="block"


}


loginBtn.addEventListener("click", check);
logout.addEventListener("click", whenLogout)

//
function check () {
    //Hämtar den senaste versionen av användarlistan
    const users = JSON.parse(localStorage.getItem("myList"))
    for ( const user of users) {
       
        if (userName.value === user.username && passWord.value === user.password) { 
            
        loginSuccess(user.username);
        return;
    }  
    //Varför man inte har en elsesats i - Om du skulle logga in med fel lösen/namn eller ett korrekt namn o lösen men inte första på listan så sparar sidan felmeddelandet. Därför vill man lägga loginFail utanför returnen. Så det kommer bara lyckas om jag tar första namnet i listan
    }
    loginFail();
   
}

//skickar med info från anrop username rad 67 och sparar i username rad 105
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
     //sätt ett värde till local storage//
    //Hämtar information från function loginSuccess >>(username).<<  loggedInUser är en nyckel och username är värdet. (Behöver ingen stringify för vi sparar ett användarnamn (inget vi behöver översätta)Den som loggar in nu har sitt användarnamn sparat i localstorage.
   
    localStorage.setItem("loggedInUser", username) 
}

function loginFail () {
    message.innerText = "Oops! Wrong username or password"
    message.style.color = "red"
    userName.value="";
    passWord.value="";
}

function whenLogout () {
    
    message.innerText = "Vänligen logga in"
    loginBtn.style.display = "block"; 
    rubrik.style.display = "block";
    form.style.display = "block";
    logout.style.display = "none"
    newUserContainer.style.display = "none"
    rubrik.innerText = "Login"
    localStorage.removeItem("loggedInUser");
    
}

createBtn.addEventListener("click", createNewUser)

//
function createNewUser () {
    //om jag inte har denna så skriver myList över hela tiden och bara den senaste nya användaren sparas.Hämtar listan myList . users behöver inte heta users*
const users = JSON.parse(localStorage.getItem("myList"))

//Skapar ett objekt- (Måste ligga inuti fuktionen, för att push letar efter newUser men den letar bara i sin egen funktion) 
const newUser = {username: newUserN.value, password: newPassW.value}
//Lägger in objekt i min array users*
users.push(newUser)
//skapar en lista med sparade "users" i myList .här skickar vi in listan igen. users*
localStorage.setItem("myList", JSON.stringify(users))

whenLogout()
}
