import Cookies from "https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.mjs";
import { send } from "./_utils";

let out = document.getElementById("out");

out.onclick = async function () {
    Cookies.remove("id");
    top.location.href = "index.html";

}

