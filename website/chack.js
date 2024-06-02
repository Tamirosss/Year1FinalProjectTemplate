import { getQuery, send } from "./_utils";
import Cookies from "./_cookies";

let yesButton = document.getElementById("yesButton");

let query = getQuery();

yesButton.onclick = function() {
    send("/setAppoitment", {
        day: parseInt(query.day),
        userId: Cookies.get("id")
    });
};

await send("/Mark", {
    day: parseInt(query.day),
    userId: Cookies.get("id")
});




query.id;
