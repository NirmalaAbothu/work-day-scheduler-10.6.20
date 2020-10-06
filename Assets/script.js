var rowTimeEL = $(".row");
var scheduleEL = $(".schedule");
// console.log(rowTimeEL);
let currentHour = moment().format("H");
console.log(currentHour);
let currentDayEL = $("#currentDay");
// currentDayEL.text(moment().format("LLLL"));
currentDayEL.text(moment().format("ll"));
var textAreaEL = $(".textarea");
// $("#currentDay").text(moment().format('ddd, MMM Do')
//each object has a hour property and textArea property
var toDoList = [];
// $.each(rowTimeEL, function (i, rowtime) {
//      let rowIdString = rowtime.id;
//      console.log(rowIdString);
//      if (rowIdString) var rowHour = parseInt(rowIdString);
//      if (rowHour) {
//           if (rowHour === currentHour) {
//                //    console.log(currentHour);
//                setColor(rowtime, "red");
//                //   let rowHour = moment(rowId,"HH")
//           } else if (currentHour < rowHour) {
//                setColor(rowtime, "green");
//           } else if (currentHour > rowHour) {
//                setColor(rowtime, "lightgrey");
//           }
//      }
// });
function setColor(element, color) {
     element.style.backgroundColor = color;
}
var startTime = "10 am";
var endTime = "1 pm";
var result = moment
     .utc(moment(endTime, "HH:mm:ss").diff(moment(startTime, "HH:mm:ss")))
     .format("HH");
console.log(result);
//set the colors depending on time
function setUpTimeBlockColors() {
     rowTimeEL.each(function () {
          var $thisBlock = $(this);
          // let rowIdString = rowtime.id;
          // console.log(rowIdString);
          var rowHour = parseInt($thisBlock.attr("data-hour"));
          // let thisBlockHour = parseInt(rowIdString);
          console.log(rowHour);
          console.log(currentHour);
          if (rowHour == currentHour) {
               $thisBlock.addClass("present").removeClass("past future");
               console.log("green");
          }
          if (rowHour < currentHour) {
               $thisBlock.addClass("past").removeClass("present future");
               console.log("red");
          }
          if (rowHour > currentHour) {
               $thisBlock.addClass("future").removeClass("past present");
               console.log("gray");
          }
     });
}
//initialize toDoList
function initializeToDoList() {
     rowTimeEL.each(function () {
          var $thisBlock = $(this);
          // let rowIdString = rowtime.id;
          // console.log(rowIdString);
          var rowHour = parseInt($thisBlock.attr("data-hour"));
          //set related hour as id(hour)
          //set text to accept input string
          var todoObj = {
               hour: rowHour,
               text: "",
          };
          console.log("functioncalled");
          //pust this object to toDoList array
          toDoList.push(todoObj);
          console.log(toDoList);
     });
     localStorage.setItem("events", JSON.stringify(toDoList));
}
//function
function renderSchedule() {
     toDoListItems = localStorage.getItem("events");
     console.log(toDoListItems);
     var items = JSON.parse(toDoListItems);
     toDoList = items;
     //loop thru
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
     // .val(itemTextArea);
     // console.log(result);
     console.log($("[data-hour=" + itemHour + "]"));
     console.log(toDoList);
}
//saveItem
function saveItem() {
     var $thisBlock = $(this);
     console.log($thisBlock);
     var hourToUpdate = $(this).parent().parent().attr("data-hour");
     // console.log($(this).parent());
     // console.log($(this).parent().parent());
     // console.log($(this).parent().parent().parent().children("textarea"));
     console.log(hourToUpdate);
     var itemToSave = $(this)
          .parent()
          .parent()
          .children()
          .children("textarea")
          .val();
     console.log("HERE", itemToSave);
     // var hourToUpdate = $(this).parent().attr("data-hour");
     // console.log(hourToUpdate);
     // var itemToAdd = $(this).parent().children("textarea").val();
     // console.log(itemToAdd);
     // event.preventDefault();
     // // var $thisBlock = $(this).parent();
     // var hourToUpdate = $(this).parent().attr("data-hour");
     // console.log(hourToUpdate);
     // var itemToAdd = $(this).parent().children("textarea").val();
     // console.log(itemToAdd);
     // console.log(itemToSave);
     console.log(this);
     console.log("NOW", toDoList);
     //loop thru
     for (var i = 0; i < toDoList.length; i++) {
          //compare which item needs to be update based on hour clicked
          if (toDoList[i].hour == hourToUpdate) {
               toDoList[i].text = itemToSave;
          }
     }
     console.log("HERE", toDoList, typeof toDoList);
     localStorage.setItem("events", JSON.stringify(toDoList));
     renderSchedule();
}
$(document).ready(function () {
     //calling setUPTimeBlockColors function
     setUpTimeBlockColors();
     //if there isn no todoList in localstorage,then initialize list
     // console.log(localStorage.getItem("todos"));
     if (!localStorage.getItem("events")) {
          initializeToDoList();
     } else {
          alert(localStorage.getItem("events"));
     }
     //render schedule from local storage
     renderSchedule();
     //when item save button is clicked, save it
     scheduleEL.on("click", "button", saveItem);
});
