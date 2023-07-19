// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {  
  // userInput gets the user's text from description class and sets it into the local storage as key and value by being safe in  the saveBtn button.
  function userInput () {
    $(".saveBtn").on("click", function () {
// .parent select the parent element and .attr select its id.
      var key = $(this).parent().attr("id");
// Select the sibling selector within the same element. Then we select the value with .val to sets it in the local storage.
      var value = $(this).siblings(".description").val();
      localStorage.setItem(key, value);
    });
  }  
  // We select the block class 
  $(".time-block").each(function () {
    var userKey = $(this).attr("id");
    var userValue = localStorage.getItem(userKey);
    // This .find() will search through the element's descendants to find the value of the user's input.
    $(this).find(".description").val(userValue);
  });

  // Here we toggle the class. This is not working propperly yet.
  function presentHour() {
    // global currentTime var is updated with the hour to compare 
    var currentHour = dayjs().hour();
    // Loop over each block of sections.
    $(".time-block").each(function () {
// Here we parseInt the id which is hour9 (hourNumber). The split method takes the string and divided into substrings. By selecting [1], the second part of the string is being taken. In this case the hour's number.      
      var entryTextHour = parseInt($(this).attr("id").split("hour")[1]);
// Condition to compare the block where the user will intro the data with the hour to change its block color.
      if (entryTextHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (entryTextHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }  
  // Display the time. The function updateCurrentTime call every second the var currentTime with dayjs and its format.
  function onrealTime() {
    function updateCurrentTime() {
      var currentTime = dayjs();
      // This format shows the weekday, month and day number, year, hour-minute-second and am or pm time.
      $("#currentDay").text(currentTime.format("dddd, MMMM D, YYYY hh:mm:ss a"));
    }
    // the function updateCurrentTime is call to be updated every second with setInterval.
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
  }
// We call the three main functions since inside the jQuery function they are not being self called.
  presentHour();
  userInput();
  onrealTime();
});


  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage? Done.
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time? Done.
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this? Done.
  //
  // TODO: Add code to display the current date in the header of the page. Done.
