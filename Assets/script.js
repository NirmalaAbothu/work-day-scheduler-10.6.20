// DOM reference variables
var rowTimeEL = $(".row");
var scheduleEL = $(".schedule");
let currentHour = moment().format("H");
console.log(currentHour);
let currentDayEL = $("#currentDay");
currentDayEL.text(moment().format("ll"));
var textAreaEL = $(".textarea");

// declare arraylist
var toDoList = [];

//function to set the colors depending on time
function setUpTimeBlockColors() {
     rowTimeEL.each(function () {
          var $thisBlock = $(this);
          var rowHour = parseInt($thisBlock.attr("data-hour"));
          if (rowHour == currentHour) {
               $thisBlock.addClass("present").removeClass("past future");
          }
          if (rowHour < currentHour) {
               $thisBlock.addClass("past").removeClass("present future");
          }
          if (rowHour > currentHour) {
               $thisBlock.addClass("future").removeClass("past present");
          }
     });
}

//initialize toDoList array
function initializeToDoList() {
     //iterating thru loop to retrieve time
     rowTimeEL.each(function () {
          var $thisBlock = $(this);
          var rowHour = parseInt($thisBlock.attr("data-hour"));
          // creating object
          var todoObj = {
               hour: rowHour,
               text: "",
          };
          //push this object to toDoList array
          toDoList.push(todoObj);
          console.log(toDoList);
     });
     // storing the arraylist in localstorage
     localStorage.setItem("events", JSON.stringify(toDoList));
}
//function renderSchedule to display time and corresponding events
function renderSchedule() {
     // retrieveing the arraylist from localstorage
     toDoListItems = localStorage.getItem("events");
     console.log(toDoListItems);
     // converting the arraylist from string to object
     var items = JSON.parse(toDoListItems);
     toDoList = items;
     //loop thru to retrieve time and corresponding textarea which is stored in
     // localstorage
     for (var i = 0; i < items.length; i++) {
          var itemHour = items[i].hour;
          console.log(itemHour);
          var itemTextArea = items[i].text;
          console.log(itemTextArea);
          $("[data-hour=" + itemHour + "]")
               .children()
               .children("textarea")
               .val(itemTextArea);
     }
     console.log(
          $("[data-hour=" + itemHour + "]")
               .children()
               .children("textarea")
               .val(itemTextArea)
     );
     console.log($("[data-hour=" + itemHour + "]"));
     console.log(toDoList);
}

//function saveItem will be called after user clicked save button
function saveItem() {
     var $thisBlock = $(this);
     var hourToUpdate = $(this).parent().parent().attr("data-hour");
     var itemToSave = $(this)
          .parent()
          .parent()
          .children()
          .children("textarea")
          .val();
     console.log("HERE", itemToSave);
     console.log("NOW", toDoList);
     //loop thru the arraylist to find the time block on which user saves event
     for (var i = 0; i < toDoList.length; i++) {
          //compare which item needs to be update based on hour clicked
          if (toDoList[i].hour == hourToUpdate) {
               toDoList[i].text = itemToSave;
          }
     }
     console.log("HERE", toDoList, typeof toDoList);
     //store the event in localstorage
     localStorage.setItem("events", JSON.stringify(toDoList));
     renderSchedule();
}
$(document).ready(function () {
     //calling setUPTimeBlockColors function
     setUpTimeBlockColors();
     //if there is no todoList in localstorage,then initialize list
     if (!localStorage.getItem("events")) {
          initializeToDoList();
     }
     // if there is todoList in localstorage,then display the list
     else {
          alert(localStorage.getItem("events"));
     }
     //render schedule from local storage
     renderSchedule();
     //when save button is clicked,calling saveItem function
     // to saves the event in localstorage
     scheduleEL.on("click", "button", saveItem);
});
