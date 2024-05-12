import { getQuery, send } from "./_utils";

let yesButton = document.getElementById("yesButton");

let query = getQuery();

yesButton.onclick = function() {
    send("/setAppoitment", {
        day: parseInt(query.day),
        userId: 
    });
};





query.id;
