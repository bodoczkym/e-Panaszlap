var nameTextBox = document.querySelector("#nameTextBox");
var lakcimTextBox = document.querySelector("#lakcimTextBox");
var radioButton = document.querySelectorAll(".radioButton");

var previewNameTextBox = document.getElementById("previewNameTextBox");
var previewLakcimTextBox = document.getElementById("previewLakcimTextBox");

var panaszJsonString = {};
var num;

$('.dropdown-inverse li > a').click(function(e){
    $('.szomszedok').text(this.innerHTML);
});

$('.dropdown-inverse li').click(function() {
    num = $(this).text();
    var placeholder = "placeholder=\"Kérem ide írja  a panaszát\"" // gets text contents of clicked li
    $("#panaszContainer").html(insertComplaintsFields(false ,num, "", placeholder));
    //$(window.console&&console.log("text"));
});


/*
$( document ).ready(function() {
    $('.dropdown-inverse li > a').click(function( event ) {
 
        alert( "Thanks for visiting!" );
    
    });
});
*/

function insertComplaintsFields(hasId, numbers, placeholder, modifier) {
    var modifier = modifier;
    var currentNum = numbers;
    var fullInnerHTML = "";
    for (var i = 0; i < currentNum; i++) {
        var index = i+1;
        var id = "";
        if (hasId) {
            id = "id=\"panasz";
            id += index;
            id += "\" ";
        }
        fullInnerHTML += "<div class=\"input-group\"><span class=\"input-group-addon\">" +index+ ". Szomszéd</span><textarea "+ id +"type=\"text\" class=\"form-control\" name=\"panasz"+index+"\"" +modifier + placeholder+"></textarea></div><br>";
    }
    return fullInnerHTML; 
}

function fillComplaintFields(panaszJsonObject, num) {
    for (var i = 0; i < num; i++) {
        var currentComplaint = "panasz" + (i+1);
        $("#" + currentComplaint).html(panaszJsonObject[currentComplaint]);
    }
}


function previewEventHandler(){

    panaszJsonString = JSON.stringify(createDataArray(getUrlString()));
    displayPreview(panaszJsonString);
}

function hideSubmitButton() {
    document.getElementById('submitButton').style.display="none";
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
    console.log(panaszJsonObject);
    previewNameTextBox.value = panaszJsonObject.nev;
    previewLakcimTextBox.value = panaszJsonObject.lakcim;
    num = Object.size(panaszJsonObject) - 2;
    $("#previewPanaszContainer").html("");
    $("#previewPanaszContainer").html(insertComplaintsFields(true, num, "", "readonly"));
    fillComplaintFields(panaszJsonObject, num);
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


