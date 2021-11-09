let submit = document.getElementById("submit");
const xhttp = new XMLHttpRequest();
const endPointRoot = "http://localhost:8080/COMP4537/labs/5/";
let resource = "store/";
let errorMsgname = document.getElementById("errorMsgName");
let errorMsgscore = document.getElementById("errorMsgScore");
let successMessage = document.getElementById("successMessage");

function validateInput(name) {
    let regExp = /^[A-Za-z]+$/;
    if (name.match(regExp)) {
        return true;
    } else {
        return false;
    }
}

// source https://stackoverflow.com/questions/14636536/how-to-check-if-a-variable-is-an-integer-in-javascript
function isInt(value) {
    return !isNaN(value) && 
           parseInt(Number(value)) == value && 
           !isNaN(parseInt(value, 10));
}

function post() {
    let name = document.getElementById("name").value;
    let score = document.getElementById("score").value;
    let validname = validateInput(name);
    let validDesc = true;
    if (!validname) {
        errorMsgname.style.display = "block";
    }
    else { errorMsgname.style.display = "none"; }

    if (score == "" || !isInt(score)) {
        errorMsgscore.style.display = "block";
        validDesc = false;
    }
    else {
        errorMsgscore.style.display = "none"; 
        validDesc = true;
    }

    if (!validname || !validDesc) {
        successMessage.style.display = "none";
        return;
    }
    else {
        let params = "?name=" + name +"&&score=" + score;
        xhttp.open("POST", endPointRoot + resource, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(params);
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                successMessage.style.display = "block";
                errorMsgname.style.display = "none";
                errorMsgscore.style.display = "none";
            }
        }
    }
}
submit.onclick = post;