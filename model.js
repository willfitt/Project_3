// function buildTitle() {
//     $("#title-bar").html(`'s Tee`)
// }

function buildHoles() {
    $("#holes").append(`<div class="title">Hole</div>`);
    for(let i = 0; i < courseData.holes.length; i++) {
        $("#holes").append(`<div class="column" id="col_${courseData.holes[i].hole}">${i + 1}</div>`)
        if(i === 8){
            $("#holes").append(`<div class="column">OUT</div>`)    
        }
        if(i === 17){
            $("#holes").append(`<div class="column">IN</div>`)    
        }
    }
    $("#holes").append(`<div class="column">Total</div>`)
}

function buildPar() {
    let parTotal = 0;
    let parOutTotal = 0;
    let parInTotal = 0;
    $("#par").append(`<div class="title">Par</div>`);
    for(let i = 0; i < courseData.holes.length; i++) {
        let parValue = courseData.holes[i].teeBoxes[teeIndex].par;
        parTotal += parValue;
        $("#par").append(`<div class="column" id="par_${i}">${parValue}</div>`);

        if(i < 9) {
            parOutTotal += parValue;
        }
        else{
            parInTotal += parValue;
        }
        if(i === 8){        
            $("#par").append(`<div class="column">${parOutTotal}</div>`)    
        }
        if(i === 17){
            $("#par").append(`<div class="column">${parInTotal}</div>`)    
        }
    }
    $("#par").append(`<div class="column">${parTotal}</div>`)
}

function buildYardage() {
    let yardageTotal = 0;
    let yardageOutTotal = 0;
    let yardageInTotal = 0;
    $("#yardage").append(`<div class="title">Yardage</div>`);
    for(let i = 0; i < courseData.holes.length; i++) {
        let yardageValue = courseData.holes[i].teeBoxes[teeIndex].yards;
        yardageTotal += yardageValue;
        $("#yardage").append(`<div class="column" id="yardage_${i}">${yardageValue}</div>`);

        if(i < 9) {
            yardageOutTotal += yardageValue;
        }
        else{
            yardageInTotal += yardageValue;
        }
        if(i === 8){
            $("#yardage").append(`<div class="column">${yardageOutTotal}</div>`)    
        }
        if(i === 17){
            $("#yardage").append(`<div class="column">${yardageInTotal}</div>`)    
        }
    }
    $("#yardage").append(`<div class="column">${yardageTotal}</div>`)
}

function buildHandicap() {
    let handicapTotal = 0;
    let handicapOutTotal = 0;
    let handicapInTotal = 0;
    $("#handicap").append(`<div class="title">Handicap</div>`);
    for(let i = 0; i < courseData.holes.length; i++) {
        let handicapValue = courseData.holes[i].teeBoxes[teeIndex].hcp;
        handicapTotal += handicapValue;
        $("#handicap").append(`<div class="column" id="handicap_${i}">${handicapValue}</div>`);

        if(i < 9) {
            handicapOutTotal += handicapValue;
        }
        else{
            handicapInTotal += handicapValue;
        }
        if(i === 8){
            $("#handicap").append(`<div class="column">${handicapOutTotal}</div>`)    
        }
        if(i === 17){
            $("#handicap").append(`<div class="column">${handicapInTotal}</div>`)    
        }
    }
    $("#handicap").append(`<div class="column">${handicapTotal}</div>`)
}


function buildPlayer() {
    for(let i = 0; i < playerCount; i++){
        $("#players").append(`<div  id="player${i}" class="player-container>"<div class="title"><input onkeyup="addPlayer(this.value, event)" type="text"></div></div>`);
        buildScore(i);
    }
}

function buildScore(index) {
    let playerIdDiv = "#player" + index;
    for(let i = 0; i < courseData.holes.length; i++) {
        $(playerIdDiv).append(`<input onkeyup="calculateTotal(this)" class="column" type>`);
        if(i === 8){
            //fix later
            $(playerIdDiv).append(`<input class="column"></input>`)    
        }
        if(i === 17){
            //fix later
            $(playerIdDiv).append(`<input class="column"></input>`)    
        }
    }
    $(playerIdDiv).append(`<span class="column total">Total</span>`)
    
}

function calculateTotal(event) {
    let id = "#" + ($(event).parent().attr("id")) + " :input";
    let totalId = "#" + ($(event).parent().attr("id")) + " .total";
    let total = 0;
    $(id).each(function(index) {
        let value = Number($(this).val());
        total += value;
        console.log("index:", $(this).val() );
      });
      console.log("totalid", );
      $(totalId).text(total)
    //   DO THIS FOR OUT AND INS
}


//NEEDS WORK
function addPlayer() {

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