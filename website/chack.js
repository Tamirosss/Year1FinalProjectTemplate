import { getQuery, send } from "./_utils";
import Cookies from "./_cookies";

let yesButton = document.getElementById("yesButton");

let query = getQuery();

yesButton.onclick = function() {
    send("/setAppoitment", {
        day: parseInt(query.day),
        userId: Cookies.get("id")
    });

    window.location.href =  'index.html';
};

