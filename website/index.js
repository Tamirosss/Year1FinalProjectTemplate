import { send } from "./_utils";

/**@type {HTMLTitleElement} */
let previewsContainer= document.getElementById("previewsContainer");

/**
 * @typedef Preview
 * @property {number} id
 * @property {string} day
 */

/**@type {Preview[]} */
let previews = await send("/getAppoitment");
console.log(previews);
for(let i=0;i<previews.length;i++){
    if (previews[i].id!=''){
        let button = document.getElementByid(i.toString());
        button.style.backgroundColor = "red";

    }
}

/**
 * @param{Preview} pre
 */