loadDoc();
let holes = [];
courseData = [];

function loadDoc() {
   let xhttp = new XMLHttpRequest();
   $('.modal').modal({backdrop: 'static', keyboard: false});
   $('.modal').modal('show');
   xhttp.onreadystatechange = function () {
       if (this.readyState == 4 && this.status == 200) {
        let courseList = JSON.parse(this.responseText);
           console.log(courseList);
           for(let i = 0; i < courseList.courses.length; i++) {
               $(".card-container").append(
                   `<div class="card course-select" style="width: 18rem;">  
                    <img src="${courseList.courses[i].image}" class="card-img-top" alt="Golf Course Picture">
                    <div class="card-body">
                    <h5 class="card-title">${courseList.courses[i].name}</h5>
                    <a class="btn btn-primary" onclick="getCourseById(${courseList.courses[i].id})">Select</a>
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
            console.log(course);
            holes = course.data.holes;
            courseData = course.data;
            console.log(holes); 
            console.log("courseData", courseData);
            //Build html function  
        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses/" + id, true);
    xhttp.send();
    $(".card-container").empty();
    loadTeeById()
}


function loadTeeById() {
    teeBoxArray = ["Pro", "Champion", "Men", "Women"]
    for(let i = 0; i < teeBoxArray.length; i++) {
        $(".modal-title").html("Tee Select")
        $(".card-container").append(
            `<div class="card w-50 course-select">  
             <div class="card-body">
             <h5 class="card-title">${teeBoxArray[i]}</h5>
             <a class="btn btn-primary" onclick="choosePlayerCount()">Select</a>
             </div></div>`);
    } 
    //return teeIndex

}

function choosePlayerCount() {
    $(".card-container").empty();
    playerCount = [1, 2, 3, 4];
    for(let i = 0; i < playerCount.length; i++) {
        $(".modal-title").html("Player Select")
        $(".card-container").append(
            `<div class="card w-50 course-select">  
             <div class="card-body">
             <h5 class="card-title">${playerCount[i]}</h5>
             <a class="btn btn-primary">Select</a>
             </div></div>`);
    } 
    //return player count
}

// calc score use holes array 

/*
CODE ABOVE gets the courses, next, get ID of selected course
use a select button, use onchange() so it knows to grab the selected ID when it happens   onchange(this.value)
select a course, select a tee, populate scorecard
*/