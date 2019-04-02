let holes = [];
let courseData = [];
let teeIndex;
let playerCount;
loadDoc();

function loadDoc() {
   let xhttp = new XMLHttpRequest();
   $('.modal').modal({backdrop: 'static', keyboard: false});
   $('.modal').modal('show');
   xhttp.onreadystatechange = function () {
       if (this.readyState == 4 && this.status == 200) {
        let courseList = JSON.parse(this.responseText);
           console.log(courseList);
           for(let i = 0; i < courseList.courses.length; i++) {
               $("#modal-container").append(
                   `<div class="card course-select" style="width: 18rem;">  
                    <img src="${courseList.courses[i].image}" class="card-img-top" alt="Golf Course Picture">
                    <div class="card-body">
                    <h5 class="card-title">${courseList.courses[i].name}</h5>
                    <a class="btn btn-primary" data-dismiss="modal" onclick="getCourseById(${courseList.courses[i].id})">Select</a>
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
    for(let i = 0; i < tees.length && i < 4; i++) {
        $("#modal-title").html(`${courseData.name}, Tee Select`)
        $("#modal-container").append(
            `<div class="card w-50 course-select">  
             <div class="card-body">
             <h5 class="card-title">${tees[i].teeType}</h5>
             <a class="btn btn-primary" id="${tees.indexOf(tees[i])}" onclick="choosePlayerCount(${tees.indexOf(tees[i])})">Select</a>
             </div></div>`);
    } 

}

function choosePlayerCount(id) {
    teeIndex = id;
    console.log("Tee Index:", teeIndex);
    $("#modal-container").empty();
    playerCount = [1, 2, 3, 4];
    for(let i = 0; i < playerCount.length; i++) {
        $("#modal-title").html(`${courseData.name}, ${tees[id].teeType}'s Tee, Player Amount Select`)
        $("#modal-container").append(
            `<div class="card w-50 course-select">  
             <div class="card-body">
             <h5 class="card-title">${playerCount[i]}</h5>
             <buton class="btn btn-primary" data-dismiss="modal" onclick="buildTable(${playerCount[i]})">Select</buton>
             </div></div>`);
    } 
}

function buildTable(players) {
    playerCount = players;
    // buildTitle();  IMPLEMENT THIS
    buildHoles();
    buildPar();
    buildYardage();
    buildHandicap();
    buildPlayer(); 
}



