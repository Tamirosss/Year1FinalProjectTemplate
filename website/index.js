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
for (let i = 0; i < previews.length; i++) {
    let button = document.getElementById((i + 1).toString());
    if (previews[i].UserId != '') {
        let button = document.getElementById((i + 1).toString());
        button.style.backgroundColor = "red";


    }
    if (previews[i].UserId == Cookies.get("id")) {
        let button = document.getElementById((i + 1).toString());
        button.style.backgroundColor = "green";
    }
    if (button.backgroundColor="green") {
        button.href = 'cancel.html';
        }

}





/**
 * @param{Preview} pre
 */