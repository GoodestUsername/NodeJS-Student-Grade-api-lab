const xhttp = new XMLHttpRequest();
const endPointRoot = "http://localhost:8080/COMP4537/labs/5/";
let resource = "search/";

const url = endPointRoot + resource;

function InfoBlock(info) {
    this.div = document.createElement("div");
    this.p = document.createElement("p");
    this.p.innerText = info.name + ": " + info.score;
    this.div.appendChild(this.p);
    document.getElementById("table").appendChild(this.div);
}
setInterval(function () {
    xhttp.open("GET", url, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let response = this.responseText;
            let responseOBJ = JSON.parse(response);

            responseOBJ.forEach(element => {
                InfoBlock(element);
            });
        }
    };
}, 2000);
