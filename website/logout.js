import Cookies from "https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.mjs";
import { send } from "./_utils";

let out = document.getElementById("out");

out.onclick = async function () {
    let id = await send("/logout");
    Cookies.remove("id", id);
    console.log(id);
}

