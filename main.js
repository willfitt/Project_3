let holes = [];
let courseData = [];
let teeIndex;
let playerCount;
let teeName;
let nameArray = [];
let scoreArray = [];
loadDoc();

function loadDoc() {
    let xhttp = new XMLHttpRequest();
    $('.modal').modal({ backdrop: 'static', keyboard: false });
    $('.modal').modal('show');
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let courseList = JSON.parse(this.responseText);
            console.log(courseList);
            for (let i = 0; i < courseList.courses.length; i++) {
                $("#modal-container").append(
                    `<div class="card text-center course-select" style="width: 18rem;">  
                    <h5 class="card-title">${courseList.courses[i].name}</h5>
                    <img src="${courseList.courses[i].image}" class="card-img-top" alt="Golf Course Picture">
                    <div class="card-body">
                    <button class="btn btn-dark" data-dismiss="modal" onclick="getCourseById(${courseList.courses[i].id})">Select</button>
                    </div></div>`);
            }
        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
    xhttp.send();
}

function getCourseById(id) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let course = JSON.parse(this.responseText);
            holes = course.data.holes;
            courseData = course.data;
            console.log("Holes:", holes);
            console.log("Course Data:", courseData);

            loadTeeById();
        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses/" + id, true);
    xhttp.send();
    $(".card-container").empty();
}

function loadTeeById() {
    tees = courseData.holes[0].teeBoxes;
    $("#modal-container").empty();
    for (let i = 0; i < tees.length && i < 4; i++) {
        $("#modal-title").html(`${courseData.name}, Tee Select`)
        $("#modal-container").append(
            `<div class="card text-center course-select">  
             <div class="card-body">
             <h5 class="card-title">${tees[i].teeType}</h5>
             <button class="btn btn-dark text-center" id="${tees.indexOf(tees[i])}" onclick="choosePlayerCount(${tees.indexOf(tees[i])})">Select</button>
             </div></div>`);
    }

}

function choosePlayerCount(id) {
    teeIndex = id;
    teeName = tees[id].teeType;
    $("#modal-container").empty();
    playerCount = [1, 2, 3, 4];
    for (let i = 0; i < playerCount.length; i++) {
        $("#modal-title").html(`${courseData.name}, ${tees[id].teeType}'s Tee, Player Amount Select`)
        $("#modal-container").append(
            `<div class="card text-center course-select">  
             <div class="card-body">
             <h5 class="card-title">${playerCount[i]}</h5>
             <button class="btn btn-dark" onclick="choosePlayerNames(${playerCount[i]})">Select</button>
             </div></div>`);
    }
}

function choosePlayerNames(players) {
    playerCount = players;
    $("#modal-container").empty();
    for (let i = 0; i < playerCount; i++) {
        $("#modal-container").append(
            `<form><div class="form-group">            
            <label for="exampleInputPassword1">Player ${i+1}</label>
            <input type="text" class="playerNameInput form-control " id="playerName${i+1}" placeholder="Name..."></div>
            </form>`
        );
    }
    $("#modal-container").append(
        `<div class="modal-footer">
        <button  type="submit" class="btn btn-dark text-center playerBtn" onclick="grabNames()">Play Golf!</button></div>`
        );
}

function grabNames() {
    if( addNames() ) {
        $(".modal-content").append(`<div class="modal-footer"><button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span></button></div>`); 
        $("#modal-container").empty();

        $('#modal-box').modal('hide')
        buildTable();
    }
}

function buildTable() {
    console.log(nameArray);
    buildTitle();
    buildHoles();
    buildPar();
    buildYardage();
    buildHandicap();
    buildPlayer();
    buildTotalButton();
}