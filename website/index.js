import Cookies from "./_cookies";
import { send } from "./_utils";

/**@type {HTMLTitleElement} */
let previewsContainer = document.getElementById("previewsContainer");

/**
 * @typedef Preview
 * @property {number} UserId
 * @property {string} Day
 */

/**@type {Preview[]} */
let previews = await send("/getAppoitment");
console.log(previews);
let id = Cookies.get("id");
let user = await send("/getUsername", id);
let logout = document.getElementById("out");
let sigh = document.getElementById("sign");
let log = document.getElementById("log");
let welcome=document.getElementById("welcome");
welcome.innerText="welcome "+user+"!!!!";


for (let i = 0; i < previews.length; i++) {
    let button = document.getElementById((i + 1).toString());


    if (previews[i].UserId == Cookies.get("id")) {
        let button = document.getElementById((i + 1).toString());
        button.style.backgroundColor = "green";
        button.onclick = function () {
            window.location.href = "cancel.html?day=" + (i + 1);
        }
    }
    else if (previews[i].UserId != '') {
        button.style.backgroundColor = "red";
        button.onclick = function () {
            alert("you cant get an appoitment in this date");
        }

    }
    else if (Cookies.get("id") == undefined) {
        logout.style.display = 'none'
        welcome.style.display='none'
        button.onclick = function () {
            alert("you neet to login");
        }

    }
    else {
        sigh.style.display = 'none'
        log.style.display = 'none'

        button.onclick = function () {
            window.location.href = "chack.html?day=" + (i + 1);
        }
    }
}
