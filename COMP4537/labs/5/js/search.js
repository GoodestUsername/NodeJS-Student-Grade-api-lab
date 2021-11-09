let search = document.getElementById("submitSearch");
let errorMsgname = document.getElementById("errorMsgName");
const xhttp = new XMLHttpRequest();
const endPointRoot = "http://localhost:8080/COMP4537/labs/4/";
let resource = "search/";

function validateInput(name) {
    let regExp = /^[A-Za-z]+$/;
    if (name.match(regExp)) {
        return true;
    } else {
        return false;
    }
}

function getAll(){
    let name = document.getElementById("name").value;
    let valid = validateInput(name);
    if (!valid) {
        errorMsgname.style.display = "block";
        return;
    }
    else {
        errorMsgname.style.display = "none";
        let params = "?search=" + name;
        const url = endPointRoot + resource + params;
        xhttp.open("GET", url, true);
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                let response = this.responseText;
                let responseOBJ = JSON.parse(response);

                document.getElementById("foundscore").innerHTML = score;
            }
        };
    }
}

search.onclick = getAll;

document.getElementById("storeRedirectButton").onclick = function () {
    location.href = "../html/writeDB.html";
};