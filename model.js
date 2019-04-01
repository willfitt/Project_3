// function buildTitle() {
//     $("#title-bar").html(`'s Tee`)
// }

function buildHoles() {
    $("#holes").append(`<div class="title">Hole</div>`);
    for(let i = 0; i < courseData.holes.length; i++) {
        $("#holes").append(`<div class="column" id="col_${courseData.holes[i].hole}">${i + 1}</div>`)
    }
    $("#holes").append(`<div class="column">Total</div>`)
}

function buildPar() {
    $("#par").append(`<div class="title">Par</div>`);
    for(let i = 0; i < courseData.holes.length; i++) {
        $("#par").append(`<div class="column" id="par_${i}">${courseData.holes[i].teeBoxes[teeIndex].par}</div>`)
    }
}

function buildYardage() {
    $("#yardage").append(`<div class="title">Yardage</div>`);
    for(let i = 0; i < courseData.holes.length; i++) {
        $("#yardage").append(`<div class="column" id="yardage_${i}">${courseData.holes[i].teeBoxes[teeIndex].yards}</div>`)
    }
}

function buildPlayer() {
    for(let i = 0; i < playerCount; i++){
        $("#player").append(`<div class="title">John</div>`)
    }
    console.log("RUNNING")
}

function buildHandicap() {
    $("#handicap").append(`<div class="title">Handicap</div>`);
    for(let i = 0; i < courseData.holes.length; i++) {
        $("#handicap").append(`<div class="column" id="handicap_${i}">${courseData.holes[i].teeBoxes[teeIndex].hcp}</div>`)
    }
}

class Player {
    constructor(id, name, scores) {
        this.scoreArray = scores;
        this.name = name;
        this. id = id;
    }
}