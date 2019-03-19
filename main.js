loadDoc();
let holes = [];

function loadDoc() {
   let xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function () {
       if (this.readyState == 4 && this.status == 200) {
        let courseList = JSON.parse(this.responseText);
           console.log(courseList);
           for(let i = 0; i < courseList.courses.length; i++) {
               $(".course-select").append(`<option value="${courseList.courses[i].id}">${courseList.courses[i].name}</option>`);
           } //turn for loop into function?
        //    $(".course-select") to do some sort of select to load info for default selection
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
            console.log(holes); 
            //Build html function  
        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses/" + id, true);
    xhttp.send();
}

// calc score use holes array 

/*
CODE ABOVE gets the courses, next, get ID of selected course
use a select button, use onchange() so it knows to grab the selected ID when it happens   onchange(this.value)
select a course, select a tee, populate scorecard

http://uxcobra.com/golfapi/courses/19002
 example of the link for a course id, insert that into the same thing as line 16 but make the 19002 
section a dynamic variable depending on course picked
*/