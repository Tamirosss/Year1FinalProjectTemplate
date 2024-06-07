import { getQuery, send } from "./_utils";
import Cookies from "./_cookies";

let yescancel = document.getElementById("yescancel");

let query = getQuery();

yescancel.onclick = function() {
    send("/cancelAppoitment", {
        day: parseInt(query.day),
        userId: Cookies.get("id")
    });

    window.location.href =  'index.html';
};

