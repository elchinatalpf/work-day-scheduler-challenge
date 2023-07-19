// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var currentTime = dayjs();

  // userInput gets the user's text from description class and sets it into the local storage as key and value.
  function userInput () {
    $(".saveBtn").on("click", function () {
      var key = $(this).parent().attr("id");
      var value = $(this).siblings(".description").val();
      localStorage.setItem(key, value);
    });

  }
  // 
  $(".time-block").each(function () {
    var userKey = $(this).attr("id");
    var userValue = localStorage.getItem(userKey);
    $(this).find(".description").val(userValue);
    console.log(userKey, userValue);
  });


  // Here we toggle the class. This is not working propperly yet.
  function presentHour() {
    var currentHour = currentTime.hour();
    $(".time-block").each(function () {
      var entryTextHour = parseInt($(this).attr("id").split("hour")[1]);

      if (entryTextHour < currentHour) {
        $(this).addClass("past").removeClass("present future");
      } else if (entryTextHour === currentHour) {
        $(this).addClass("present").removeClass("past future");
      } else {
        $(this).addClass("future").removeClass("past present");
      }
    });
  }

  // Here we display the time
  function onrealTime() {
    $("#currentDay").text(currentTime.format("dddd, MMMM D, YYYY hh:mm:ss a"));
    var interval = setInterval(function () {
      currentTime = dayjs();
      $("#currentDay").text(
        currentTime.format("dddd, MMMM D, YYYY hh:mm:ss a")
      );
    }, 1000);
  }
  
  userInput();
  onrealTime();
  presentHour();
});

  // 4. enter an event
  // 5. save event with block button in the local storage
  // 6. refresh page, the event persist.


  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page. Done.
