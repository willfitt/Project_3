function buildHoles() {
    $(".holes").append(`<div class="title">Hole</div>`);
    for(let i = 0; i < courseData.holes.length; i++) {
        $(".holes").append(`<div class="column" id="col_${courseData.holes[i].hole}">${i + 1}</div>`)
    }
}

function buildPar() {
    $(".par").append(`<div class="title">Par</div>`);
    for(let i = 0; i < courseData.holes.length; i++) {
        $(".par").append(`<div class="column" id="col_">${courseData.holes[i].teeBoxes[teeIndex].par}</div>`)
    }
}

function buildYardage() {
    $(".yardage").append(`<div class="title">Yardage</div>`);
    for(let i = 0; i < courseData.holes.length; i++) {
        $(".yardage").append(`<div class="column" id="col_">${courseData.holes[i].teeBoxes[teeIndex].yards}</div>`)
    }
}

function buildPlayer() {

}

function buildHandicap() {
    $(".handicap").append(`<div class="title">Handicap</div>`);
    for(let i = 0; i < courseData.holes.length; i++) {
        $(".handicap").append(`<div class="column" id="col_">${courseData.holes[i].teeBoxes[teeIndex].hcp}</div>`)
    }
}