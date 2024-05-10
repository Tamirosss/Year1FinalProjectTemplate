import { getQuery, send } from "./_utils";

let yesButton = document.getElementById("yesButton");

let query = getQuery();

yesButton.onclick = function() {
    send("/appoi", parseInt(query.day));
};





query.id;
