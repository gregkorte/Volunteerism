// var students;
function getJSON(url, cb){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function() {
    cb(JSON.parse(xhr.responseText));
  };
  xhr.send();
}

// getJSON('https://volunteerism-gregkor.firebaseio.com/students.json');

// From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
}

function addItemToList($list, itemText){
  var $li = document.createElement("li");
  $li.innerHTML = itemText;
  $list.appendChild($li);
}

function neighborGroup(list, groupSize, target){
  var listClone = list.slice(0);
  while( listClone.length > 0 ){
  var listItems = listClone.splice(0, groupSize);
  addItemToList(target, listItems.join(" &amp; "));
  }
}

function arrayShuffle(array) {
  var arrayClone = array.slice(0);
  var temp;
  for(var i = 0; i < arrayClone.length; i++) {
    var random = getRandomInt(0, arrayClone.length);
    temp = arrayClone[i];
    arrayClone[i] = arrayClone[random];
    arrayClone[random] = temp;
  }
  return arrayClone;
}

function show(element) {
element.classList.remove("hidden");
}

function hide(element) {
element.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", function(){
  var $form = document.getElementById("generate-group");
  var students;
  getJSON('https://volunteerism-gregkor.firebaseio.com/students.json', function(data){
    students = data;
  });
  // var students = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"]; ---This is now called into the JSON function

  var $select = $form.querySelector("select");
  var $numBox = $form.querySelector("input[type='number']");
  $select.addEventListener("change", function(event){
    if (event.currentTarget.value === "random-n-pairing") {
      show($numBox);
    } 
    else {
      hide($numBox);
    }
  });

  $form.addEventListener("submit", function(event){
    event.preventDefault();
    var $ul = document.getElementById("results");
    $ul.innerHTML = "";

    var groupCriteria = $form.querySelector("select").value;

    if(groupCriteria === "random-student"){
      var studentNumber = getRandomInt(0, students.length);
      var studentName = students[studentNumber];
      addItemToList($ul, studentName);
    }  
      else if(groupCriteria === "neighbor-pairing") {
        neighborGroup(students, 2, $ul);
      }
      else if(groupCriteria === "teams-of-three") {
        neighborGroup(students, 3, $ul);
      }
      else if(groupCriteria === "random-pairing") {
        var shuffledStudents = arrayShuffle(students);
        neighborGroup(shuffledStudents, 2, $ul);
      }
      else if(groupCriteria === "random-n-pairing") {
        var shuffledStudents = arrayShuffle(students);
        var numberOfGroups = $form.querySelector("input[type='number']").value;
        neighborGroup(shuffledStudents, numberOfGroups, $ul);
          // if(numberOfGroups >= 2 || numberOfGroups <= 11) {
          //   neighborGroup(shuffledStudents, numberOfGroups, $ul);
          // }
          // else {alert("Please select a number of groups between 2 and 11.")
          // }
      }
  });    
});  