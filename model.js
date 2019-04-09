function buildTitle() {
    $("#title-bar").append(`<span>${courseData.name}</span>`)
}

function buildHoles() {
    $("#holes").append(`<div class="title">Hole</div>`);
    for(let i = 0; i < courseData.holes.length; i++) {
        $("#holes").append(`<div class="col-sm bg-info border border-dark" id="col_${courseData.holes[i].hole}">${i + 1}</div>`)
        if(i === 8){
            $("#holes").append(`<div class="col-sm bg-secondary text-white">Out</div>`)
        }
        if(i === 17){
            $("#holes").append(`<div class="col-sm border-right border-white bg-secondary text-white">In</div>`)
        }
    }
    $("#holes").append(`<div class="col-sm bg-dark text-white">Total</div>`)
}

function buildPar() {
    let parTotal = 0;
    let parOutTotal = 0;
    let parInTotal = 0;
    $("#par").append(`<div class="title">Par</div>`);
    for(let i = 0; i < courseData.holes.length; i++) {
        let parValue = courseData.holes[i].teeBoxes[teeIndex].par;
        parTotal += parValue;
        $("#par").append(`<div class="col-sm bgColor border border-dark" id="par_${i}">${parValue}</div>`);

        if(i < 9) {
            parOutTotal += parValue;
        }
        else{
            parInTotal += parValue;
        }
        if(i === 8){        
            $("#par").append(`<div class="col-sm border-top border-white bg-secondary text-white">${parOutTotal}</div>`)
        }
        if(i === 17){
            $("#par").append(`<div class="col-sm border-top border-right border-white bg-secondary text-white">${parInTotal}</div>`)
        }
    }
    $("#par").append(`<div class="col-sm border-top border-white bg-dark text-white">${parTotal}</div>`)
}

function buildYardage() {
    let yardageTotal = 0;
    let yardageOutTotal = 0;
    let yardageInTotal = 0;
    $("#yardage").append(`<div class="title">Yardage</div>`);
    for(let i = 0; i < courseData.holes.length; i++) {
        let yardageValue = courseData.holes[i].teeBoxes[teeIndex].yards;
        yardageTotal += yardageValue;
        $("#yardage").append(`<div class="col-sm bgColor border border-dark" id="yardage_${i}">${yardageValue}</div>`);

        if(i < 9) {
            yardageOutTotal += yardageValue;
        }
        else{
            yardageInTotal += yardageValue;
        }
        if(i === 8){
            $("#yardage").append(`<div class="col-sm border-top border-white bg-secondary text-white">${yardageOutTotal}</div>`)
        }
        if(i === 17){
            $("#yardage").append(`<div class="col-sm border-top border-right border-white bg-secondary text-white">${yardageInTotal}</div>`)
        }
    }
    $("#yardage").append(`<div class="col-sm bg-dark  border-top border-white text-white">${yardageTotal}</div>`)
}

function buildHandicap() {
    let handicapTotal = 0;
    let handicapOutTotal = 0;
    let handicapInTotal = 0;
    $("#handicap").append(`<div class="title">Handicap</div>`);
    for(let i = 0; i < courseData.holes.length; i++) {
        let handicapValue = courseData.holes[i].teeBoxes[teeIndex].hcp;
        handicapTotal += handicapValue;
        $("#handicap").append(`<div class="col-sm bgColor border border-dark" id="handicap_${i}">${handicapValue}</div>`);

        if(i < 9) {
            handicapOutTotal += handicapValue;
        }
        else{
            handicapInTotal += handicapValue;
        }
        if(i === 8){
            $("#handicap").append(`<div class="col-sm border-top border-white bg-secondary text-white">${handicapOutTotal}</div>`)
        }
        if(i === 17){
            $("#handicap").append(`<div class="col-sm border-top border-right border-white bg-secondary text-white">${handicapInTotal}</div>`)
        }
    }
    $("#handicap").append(`<div class="col-sm bg-dark border-top border-white text-white">${handicapTotal}</div>`)
}


function buildPlayer() {
    for(let i = 0; i < playerCount; i++){
        //fix player input, change to span or div?
        $("#players").append(`<div id="player${i}" class="player-container"><div class="title" data-text="Player ${i + 1}..." contenteditable="true" onkeyup="addPlayer(this.value, event)"></div></div>`);
        buildScore(i);
    }
}

function buildScore(index) {
    let playerIdDiv = "#player" + index;
    for(let i = 0; i < courseData.holes.length; i++) {
        $(playerIdDiv).append(`<input type="number" tabindex="${i + 2}" onkeyup="calculateTotal(this)" class="col-sm border border-dark">`);
        if(i === 8){
            $(playerIdDiv).append(`<div class="col-sm out border-top border-white bg-secondary text-white"></div>`)
        }
        if(i === 17){
            $(playerIdDiv).append(`<div class="col-sm in border-top border-right border-white bg-secondary text-white"></div>`)
        }
    }
    $(playerIdDiv).append(`<span class="col-sm total border-top border-white bg-dark text-white">Total</span>`)
    
}

function calculateTotal(event) {
    let inputId = "#" + ($(event).parent().attr("id")) + " :input";
    let totalId = "#" + ($(event).parent().attr("id")) + " .total";
    let outId = "#" + ($(event).parent().attr("id")) + " .out";
    let inId = "#" + ($(event).parent().attr("id")) + " .in";

    let total = 0;
    let outValue = 0;
    let inValue = 0;
    
    $(inputId).each(function(index, testVal) {
        let value = Number($(this).val());
        
        total += value;
        if(index <= 8){
            let currentOutValue = Number($(this).val());
            outValue += currentOutValue;
            $(outId).text(outValue);
        }
      });
      $(totalId).text(total);
      inValue = total - outValue;
      $(inId).text(inValue);
}

//NEEDS WORK
function addPlayer(event) {

}

class PlayerGenerator {
    constructor() {
        this.players = [];
    }

    add(id, name) {
        this.players.push(new Player(id, name, scoreArray));
    }   

}

class Player {
    constructor(id, name, scoreArray) {
        this.scoreArray = [];
        this.name = name;
        this. id = id;
    }
}