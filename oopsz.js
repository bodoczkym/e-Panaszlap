var nodeBalSzomszed = document.querySelectorAll("div")[1];
var nodeJobbSzomszed = document.querySelectorAll("div")[2];
var nameTextBox = document.querySelector("#nameTextBox");
var lakcimTextBox = document.querySelector("#lakcimTextBox");
var radioButton = document.querySelectorAll(".radioButton");
var balpanaszTextBox = document.querySelector("#balpanaszTextBox");
var jobbpanaszTextBox = document.querySelector("#jobbpanaszTextBox");

var nameTextBoxPreview = document.getElementById("nevPreview");
var lakcimTextBoxPreview = document.getElementById("lakcimPreview");
var balPanaszTextBoxPreview = document.getElementById('balPanaszTextBoxPreview');
var jobbPanaszTextBoxPreview = document.getElementById("jobbPanaszTextBoxPreview");
var panaszJsonString = {};


function baloldaliSzomszed(){
    nodeBalSzomszed.style.display = "block";
    nodeJobbSzomszed.style.display = "none";
}

function jobboldaliSzomszed (){
    nodeBalSzomszed.style.display = "none";
    nodeJobbSzomszed.style.display = "block";
}

function mindketSzomszed (){
    nodeBalSzomszed.style.display = "block";
    nodeJobbSzomszed.style.display = "block";
}

function previewEventHandler(){

    panaszJsonString = JSON.stringify(createDataArray(getUrlString()));
    console.log(panaszJsonString);
    displayPreview(panaszJsonString);

}

function createDataArray(urlString) {
    var sliced = urlString.slice(1).split("&");
    var processed = [];
    for (var i = 0; i < sliced.length; i++) {
        var temp = sliced[i].split("=");
        processed.push(temp);
    }
    var final = {};
    for (var i = 0; i < processed.length; i++) {
        var key = processed[i][0];
        final[key] = processed[i][1];
    }
    return final;
}

function getUrlString() {
    var url = new URL(document.URL);
    var urlData = url.search;
    return urlData;
}

function displayPreview(panaszJsonString) {
    panaszJsonObject = JSON.parse(panaszJsonString);
    balPanaszTextBoxPreview.value = panaszJsonObject.balpanasz;
    jobbPanaszTextBoxPreview.value = panaszJsonObject.jobbpanasz;
    nameTextBoxPreview.value = panaszJsonObject.nev;
    lakcimTextBoxPreview.value = panaszJsonObject.lakcim;
}




