var nodeBalSzomszed = document.querySelectorAll("div")[1];
var nodeJobbSzomszed = document.querySelectorAll("div")[2];
var nameTextBox = document.querySelector("#nameTextBox");
var lakcimTextBox = document.querySelector("#lakcimTextBox");
var radioButton = document.querySelectorAll(".radioButton");
var balpanaszTextBox = document.getElementById("balpanaszTextBox");
var jobbpanaszTextBox = document.getElementById("jobbpanaszTextBox");

var nameTextBoxPreview = document.getElementById("nevPreview");
var lakcimTextBoxPreview = document.getElementById("lakcimPreview");
var balPanaszTextBoxPreview = document.getElementById('balPanaszTextBoxPreview');
var jobbPanaszTextBoxPreview = document.getElementById("jobbPanaszTextBoxPreview");
var panaszJsonString = {};

$('.dropdown-inverse li > a').click(function(e){
    $('.szomszedok').text(this.innerHTML);

});

$('.dropdown-inverse li').click(function() {
    var num = $(this).text(); // gets text contents of clicked li
    $( "#panaszContainer").html(function() {
        var currentNum = num;
        var fullInnerHTML = "";
        for (var i = 0; i < currentNum; i++) {
            var index = i+1;
            fullInnerHTML += "<div class=\"input-group\"><span class=\"input-group-addon\">"+index+". Szomszéd</span><textarea id=\"panasz"+ index +"\" type=\"text\" class=\"form-control\" name=\"panasz"+index+"\" placeholder=\"Kérem ide írja  a panaszát\"></textarea></div><br>";
        }
        return fullInnerHTML; 
    });
    //$(window.console&&console.log("text"));
});

/*
$( document ).ready(function() {
    $('.dropdown-inverse li > a').click(function( event ) {
 
        alert( "Thanks for visiting!" );
 
    });
});
*/

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




