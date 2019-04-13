function buildTitle() {
    let teeNameCap = teeName.charAt(0).toUpperCase() + teeName.slice(1);
    $("#title-bar").append(`<span>${courseData.name} - ${teeNameCap}'s Tee</span>`)
}

function buildHoles() {
    $("#holes").append(`<div class="title border-top border-dark">Hole</div>`);
    for (let i = 0; i < courseData.holes.length; i++) {
        $("#holes").append(`<div class="col-sm bg-info border border-dark" id="col_${courseData.holes[i].hole}">${i + 1}</div>`)
        if (i === 8) {
            $("#holes").append(`<div class="col-sm bg-secondary text-white">Out</div>`)
        }
        if (i === 17) {
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
    for (let i = 0; i < courseData.holes.length; i++) {
        let parValue = courseData.holes[i].teeBoxes[teeIndex].par;
        parTotal += parValue;
        $("#par").append(`<div class="col-sm bgColor border border-dark" id="par_${i}">${parValue}</div>`);

        if (i < 9) {
            parOutTotal += parValue;
        }
        else {
            parInTotal += parValue;
        }
        if (i === 8) {
            $("#par").append(`<div class="col-sm border-top border-white bg-secondary text-white">${parOutTotal}</div>`)
        }
        if (i === 17) {
            $("#par").append(`<div class="col-sm border-top border-right border-white bg-secondary text-white">${parInTotal}</div>`)
        }
    }
    $("#par").append(`<div class="col-sm border-top border-white bg-dark text-white parTotal">${parTotal}</div>`)
}

function buildYardage() {
    let yardageTotal = 0;
    let yardageOutTotal = 0;
    let yardageInTotal = 0;
    $("#yardage").append(`<div class="title">Yardage</div>`);
    for (let i = 0; i < courseData.holes.length; i++) {
        let yardageValue = courseData.holes[i].teeBoxes[teeIndex].yards;
        yardageTotal += yardageValue;
        $("#yardage").append(`<div class="col-sm bgColor border border-dark" id="yardage_${i}">${yardageValue}</div>`);

        if (i < 9) {
            yardageOutTotal += yardageValue;
        }
        else {
            yardageInTotal += yardageValue;
        }
        if (i === 8) {
            $("#yardage").append(`<div class="col-sm border-top border-white bg-secondary text-white">${yardageOutTotal}</div>`)
        }
        if (i === 17) {
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
    for (let i = 0; i < courseData.holes.length; i++) {
        let handicapValue = courseData.holes[i].teeBoxes[teeIndex].hcp;
        handicapTotal += handicapValue;
        $("#handicap").append(`<div class="col-sm bgColor border border-dark" id="handicap_${i}">${handicapValue}</div>`);

        if (i < 9) {
            handicapOutTotal += handicapValue;
        }
        else {
            handicapInTotal += handicapValue;
        }
        if (i === 8) {
            $("#handicap").append(`<div class="col-sm border-top border-white bg-secondary text-white">${handicapOutTotal}</div>`)
        }
        if (i === 17) {
            $("#handicap").append(`<div class="col-sm border-top border-right border-white bg-secondary text-white">${handicapInTotal}</div>`)
        }
    }
    $("#handicap").append(`<div class="col-sm bg-dark border-top border-white text-white">${handicapTotal}</div>`)
}


function buildPlayer() {
    for (let i = 0; i < nameArray.length; i++) {
        $("#players").append(`<div id="nameArray${i}" class="player-container"><div class="title playerTitle">${nameArray[i]}</div></div>`);
        buildScore(i);
    }
}

function buildScore(index) {
    let playerIdDiv = "#nameArray" + index;
    for (let i = 0; i < courseData.holes.length; i++) {
        $(playerIdDiv).append(`<input type="number" tabindex="${i + 2}" onkeyup="appendScores(this)" class="col-sm border border-dark">`);
        if (i === 8) {
            $(playerIdDiv).append(`<div class="col-sm out border-top border-white bg-secondary text-white"></div>`)
        }
        if (i === 17) {
            $(playerIdDiv).append(`<div class="col-sm in border-top border-right border-white bg-secondary text-white"></div>`)
        }
    }
    $(playerIdDiv).append(`<div class="col-sm total border-top border-white bg-dark text-white"></div>`);
}

function buildTotalButton() {
    $(".scorecard-container").append(`<button type="button" class="btn btn-sm btn-dark finalBtn" data-toggle="modal" onclick="calculateTotal()">Finalize Match</button>`)

}

function appendScores(event) {
    let inputId = "#" + ($(event).parent().attr("id")) + " :input";
    let totalId = "#" + ($(event).parent().attr("id")) + " .total";
    let outId = "#" + ($(event).parent().attr("id")) + " .out";
    let inId = "#" + ($(event).parent().attr("id")) + " .in";
    let total = 0;
    let outValue = 0;
    let inValue = 0;

    $(inputId).each(function (index, testVal) {
        let value = Number($(this).val());

        total += value;
        if (index <= 8) {
            let currentOutValue = Number($(this).val());
            outValue += currentOutValue;
            $(outId).text(outValue);
        }
    });
    $(totalId).text(total);
    inValue = total - outValue;
    $(inId).text(inValue);
}

function calculateTotal() {
    scoreArray = [];
    let totalPlayerScore = 0;
    let parTotal = $(".parTotal").text();
    $(".total").each(function (index) {
        let value = $(this).text();
        console.log("value:", value)
        scoreArray.push(value);
    })
    console.log(scoreArray);

    $("#modal-box").modal('show');
    $("#modal-title").html(`Final Scores`);
    $("#modal-container").empty();

    for (let i = 0; i < nameArray.length; i++) {
        totalPlayerScore = scoreArray[i] - parTotal;
        
        
        if (totalPlayerScore >= 0 && totalPlayerScore < 5) {
            $("#modal-container").append(
                `<div class="card text-center course-select finalScoreCard">  
             <div class="card-body">
             <h5 class="card-title">${nameArray[i]}</h5>
             
             <p class="card-text">Your score is ${totalPlayerScore} over par, better luck next time!</p>
             </div></div>`);
        }
        if (totalPlayerScore >= 5) {
            $("#modal-container").append(
                `<div class="card text-center course-select finalScoreCard">  
             <div class="card-body">
             <h5 class="card-title">${nameArray[i]}</h5>
             
             <p class="card-text">Your score is ${totalPlayerScore} over par, you may need some more practice!</p>
             </div></div>`);
        }
        if (totalPlayerScore < 0) {
            $("#modal-container").append(
                `<div class="card text-center course-select finalScoreCard">  
             <div class="card-body">
             <h5 class="card-title">${nameArray[i]}</h5>
             
             <p class="card-text">Your score is ${totalPlayerScore} under par, great job!</p>
             </div></div>`);
        }
    }


}

function addNames() {

    nameArray = [];
    let validated = true;

    $(".playerNameInput").each(function (index) {
        $(this).css('border', 'none');
        let value = $(this).val();
        let nameCheck = nameArray.includes(value);
        if (value.length === 0) {
            validated = false;
            $(this).css('border', '2px solid red');
            alert("Please add all player names.");
            return false;
        }
        if (nameCheck) {
            validated = false;
            $(this).css('border', '2px solid red');
            alert(`Players cannot have the same name - ${value}`);
            return false;
        }
        else {
            nameArray.push(value);
        }
    })
    console.log(nameArray);
    return validated;

}




// ////josh



// $(inputId).each(function (index, testVal) {
//     let value = $(this).val();
//     let nameCheck = nameArray.has(value) // true/false
// array.includes
//     if(nameCheck)
//     {
//        validated = false;

//     }
//     else
//     {
//         nameArray.set(value)
//     }
//     if(validated)
//     {
//         move onabort
//     }

//     else
//     {
//         alert("Player names...")
//     }


// }



////

// NEEDS WORK
// function addPlayer(name) {
//     if (playerSet.has($(name).text())) {
//         $(".playerTitle").text("")
//     }
//     else {
//         playerSet.add($(name).text());
//         console.log(playerSet)
//     }
// }

// // needs to be fixed and added to above function
// function addPlayer(name, event) {
//     $(".playerTitle").typeWatch({
//         callback:function(name) {
//             if(playerSet.has(nameInput)) {

//             }
//             else {
//                 playerSet.add($(name).text());
//                 console.log(playerSet)
//             }
//         }})
// }

// class PlayerGenerator {
//     constructor() {
//         this.players = [];
//     }

//     add(id, name) {
//         this.players.push(new Player(id, name, scoreArray));
//     }

// }

// class Player {
//     constructor(id, name, scoreArray) {
//         this.scoreArray = [];
//         this.name = name;
//         this.id = id;
//     }
// }

//on focus for adding player, use set for name management