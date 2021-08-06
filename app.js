// create an empty array to eventually store all journal entries created
allJournalEntries = [];

// make a Journal Entry class and set parameters
function JournalEntry(entryDate, confidenceLevel, journalText) {
  this.dateOf = entryDate;
  this.confidence = confidenceLevel;
  this.entryText = journalText;
}
// make a render method using prototype
JournalEntry.prototype.render = function () {
  // select entries div and make uls with lis and append
  let entryContainer = document.querySelector("#entries");
  let newEntryUl = document.createElement("ul");
  let dateLi = document.createElement("li");
  let confiLi = document.createElement("li");
  let textLi = document.createElement("li");
  dateLi.textContent = `DATE: ${this.dateOf}`;
  confiLi.textContent = `CONFIDENCE LEVEL: ${this.confidence.toUpperCase()}`;
  textLi.textContent = `THOUGHTS: ${this.entryText}`;
  newEntryUl.appendChild(dateLi);
  newEntryUl.appendChild(confiLi);
  newEntryUl.appendChild(textLi);
  entryContainer.appendChild(newEntryUl);
};

// add event listeners to all buttons and tie functions to them
let addButton = document.getElementById("add-entry");
addButton.addEventListener("click", getUserEntry);

let deleteButton = document.getElementById("delete-entry");
deleteButton.addEventListener("click", getDeleteEntries);

let editButton = document.getElementById("edit-entry");
editButton.addEventListener("click", getEditEntries);

// create entry function. starts prompt sequence to create new Journal Entry class and push to permanent and temporary arrays
function getUserEntry(evt) {
  // make a temporary array for holding all new entries in one session
  let journalEntries = [];
  // set up conditions for continuous loop
  let doneEntering = false;
  while (doneEntering == false) {
    // get user answers with prompts unless the press cancel or type quit
    let entryDate = prompt(`What is today's date?`);
    if (entryDate != null && entryDate !== "quit") {
      let confidenceLevel = prompt(
        `What is your confidence level? Enter High, Medium, or Low.`
      ).toLowerCase();
      if (
        confidenceLevel == "high" ||
        confidenceLevel == "medium" ||
        confidenceLevel == "low"
      ) {
        let journalText = prompt(`What did you learn today?`);
        if (journalText != null && journalText != "quit") {
          let confirmation = confirm(`Do you want to post this entry?`);
          if (confirmation != false) {
            let newEntry = new JournalEntry(
              entryDate,
              confidenceLevel,
              journalText
            );
            journalEntries.push(newEntry);
            allJournalEntries.push(newEntry);
          }
        } else {
          doneEntering = true;
        }
      } else if (confidenceLevel == null || confidenceLevel == "quit") {
        doneEntering = true;
      } else {
        // alert if they dont enter high medium or low
        alert("Enter High, Medium, or Low only!");
      }
    } else {
      doneEntering = true;
    }
  }
  // call the function to loop through the temporary entries array and render them and log them
  postEntries(journalEntries);
  logEntries(journalEntries);
}
function postEntries(journalEntries) {
  for (let i = 0; i < journalEntries.length; i++) {
    journalEntries[i].render();
  }
}
function logEntries(journalEntries) {
  for (let i = 0; i < journalEntries.length; i++) {
    console.log(journalEntries[i]);
  }
}

// create a function to select and delete entries
function getDeleteEntries(evt) {
  // get the entry the user wants to delete
  let elToDelete = prompt("Which entry would you like to delete?");
  let elToDeleteInt = parseInt(elToDelete);
  // loop through permanent entries array and for each number target the ul corresponding to it
  for (let i = 0; i < allJournalEntries.length; i++) {
    let entries = document.querySelector("#entries");
    let ulToDelete = entries.childNodes[i];
    // if the user's number is equal to the index of the array item + 1 remove it
    if (i + 1 === elToDeleteInt) {
      entries.removeChild(ulToDelete);
    }
  }
}

// make a function for editing entries. combination of delete and render functions/methods
function getEditEntries(evt) {
  let elToEdit = prompt("Which entry would you like to edit?");
  let elToEditInt = parseInt(elToEdit);
  for (let i = 0; i < allJournalEntries.length; i++) {
    let entries = document.querySelector("#entries");
    let ulToEdit = entries.childNodes[i];
    if (i + 1 === elToEditInt) {
      let entryDate = prompt(`What is today's date?`);
      if (entryDate != null && entryDate != "quit") {
        let confidenceLevel = prompt(
          `What is your confidence level? Enter High, Medium, or Low.`
        ).toLowerCase();
        if (
          confidenceLevel == "high" ||
          confidenceLevel == "medium" ||
          confidenceLevel == "low"
        ) {
          let journalText = prompt(`What did you learn today?`);
          if (journalText != null && journalText != "quit") {
            let confirmation = confirm(`Do you want to post this entry?`);
            if (confirmation != false) {
              let newEditUl = document.createElement("ul");
              let newDateLi = document.createElement("li");
              let newConfiLi = document.createElement("li");
              let newTextLi = document.createElement("li");
              newDateLi.textContent = `DATE: ${entryDate}`;
              newConfiLi.textContent = `CONFIDENCE LEVEL: ${confidenceLevel.toUpperCase()}`;
              newTextLi.textContent = `REFLECTIONS: ${journalText}`;
              newEditUl.appendChild(newDateLi);
              newEditUl.appendChild(newConfiLi);
              newEditUl.appendChild(newTextLi);
              entries.replaceChild(newEditUl, ulToEdit);
            }
          } else {
            doneEntering = true;
          }
        } else if (confidenceLevel == null || confidenceLevel == "quit") {
          doneEntering = true;
        } else {
          alert("Enter High, Medium, or Low only!");
        }
      } else {
        doneEntering = true;
      }
    }
  }
}
