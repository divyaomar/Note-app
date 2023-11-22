// If user adds a note, add it to the local storage
showNotes();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    //here we are initializing the js and getting the element by id both title and text inside titlebos and the textarea
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  //here we are read the items in loacaStorage and stores in the variable 'notes'.
  let notes = localStorage.getItem("notes"); // This string likely represents an array of notes or an object with note data in JSON format.

  //then checking it has or not if it is null then notesobj is a blank array otherwise it has then it stores in notesObj variable.
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes); //JSON.parse(notes) is a JavaScript function used to parse a JSON string and convert it into a JavaScript object.
  }
  console.log(notesObj);
  let myObj = {
    title: addTitle.value,
    text: addTxt.value
  }
  notesObj.push(myObj);
  //below line is a method call that sets the value associated with the key "notes" in the local storage. The value is the JSON string representation of your notesObj.
  localStorage.setItem("notes", JSON.stringify(notesObj));//JSON.stringify(notesObj) is a JavaScript function used to convert a JavaScript object (notesObj) into a JSON string. This is necessary because local storage can only store data as strings.

  console.log(myObj)
  console.log(notesObj)
  addTxt.value = "";
  addTitle.value = "";
  showNotes();
});

//function to show elements first it reads and then update.

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}
          </p>
          <button id=${index} onclick="deleteNotes(this.id)" class="btn btn-primary">Delete notes</button>
        </div>
      </div>`;
  });
  //this is for, when there is no notes in the "Your notes" section
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! "Add a note" section above to add notes.`;
  }
}
//function to delete notes
function deleteNotes(index, notesObj) {
  console.log("I am deleting.");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}
//Serach functionality
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();

  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
