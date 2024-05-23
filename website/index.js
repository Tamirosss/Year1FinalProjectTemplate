/**@type {HTMLTitleElement} */
let previewsContainer= document.getElementById("previewsContainer");

/**
 * @typedef Preview
 * @property {number} id
 * @property {string} day
 */

/**@type {Preview[]} */
let previews=await send("/getAppoitment");

for(let i=0;i<previews.length;i++){
    let previewA=createPreviewA(previews[i]);
    previewsContainer.appendChild(previewA)
}

/**
 * @param{Preview} pre
 */