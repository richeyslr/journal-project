allJournalEntries = [];

function JournalEntry(entryDate, confidenceLevel, journalText) {
  this.dateOf = entryDate;
  this.confidence = confidenceLevel;
  this.entryText = journalText;
}
JournalEntry.prototype.render = function () {
  let entryContainer = document.querySelector("#entries");
  let newEntryUl = document.createElement("ul");
  let dateLi = document.createElement("li");
  let confiLi = document.createElement("li");
  let textLi = document.createElement("li");
  dateLi.textContent = `Date: ${this.dateOf}`;
  confiLi.textContent = `Confidence Level: ${this.confidence.toUpperCase()}`;
  textLi.textContent = `Thoughts: ${this.entryText}`;
  newEntryUl.appendChild(dateLi);
  newEntryUl.appendChild(confiLi);
  newEntryUl.appendChild(textLi);
  entryContainer.appendChild(newEntryUl);
};

let addButton = document.getElementById("add-entry");
addButton.addEventListener("click", getUserEntry);

let deleteButton = document.getElementById("delete-entry");
deleteButton.addEventListener("click", getDeleteEntries);

let editButton = document.getElementById("edit-entry");
editButton.addEventListener("click", getEditEntries);

function getUserEntry(evt) {
  let journalEntries = [];
  let doneEntering = false;
  while (doneEntering == false) {
    let entryDate = prompt(`What is today's date?`);
    if (entryDate != null) {
      let confidenceLevel = prompt(
        `What is your confidence level? Enter High, Medium, or Low.`
      ).toLowerCase();
      if (
        confidenceLevel == "high" ||
        confidenceLevel == "medium" ||
        confidenceLevel == "low"
      ) {
        let journalText = prompt(`What did you learn today?`);
        if (journalText != null) {
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
      } else if (confidenceLevel == null) {
        doneEntering = true;
      } else {
        alert("Enter High, Medium, or Low only!");
      }
    } else {
      doneEntering = true;
    }
  }
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

function getDeleteEntries(evt) {
  let elToDelete = prompt("Which entry would you like to delete?");
  let elToDeleteInt = parseInt(elToDelete);
  for (let i = 0; i < allJournalEntries.length; i++) {
    let entries = document.querySelector("#entries");
    console.log(entries);
    let ulToDelete = entries.childNodes[i];
    if (i + 1 === elToDeleteInt) {
      entries.removeChild(ulToDelete);
    }
  }
}

function getEditEntries(evt) {
  let elToEdit = prompt("Which entry would you like to edit?");
  let elToEditInt = parseInt(elToEdit);
  for (let i = 0; i < allJournalEntries.length; i++) {
    let entries = document.querySelector("#entries");
    let ulToEdit = entries.childNodes[i];
    if (i + 1 === elToEditInt) {
      let entryDate = prompt(`What is today's date?`);
      if (entryDate != null) {
        let confidenceLevel = prompt(
          `What is your confidence level? Enter High, Medium, or Low.`
        ).toLowerCase();
        if (
          confidenceLevel == "high" ||
          confidenceLevel == "medium" ||
          confidenceLevel == "low"
        ) {
          let journalText = prompt(`What did you learn today?`);
          if (journalText != null) {
            let confirmation = confirm(`Do you want to post this entry?`);
            if (confirmation != false) {
              let newEditUl = document.createElement("ul");
              let newDateLi = document.createElement("li");
              let newConfiLi = document.createElement("li");
              let newTextLi = document.createElement("li");
              newDateLi.textContent = `Date: ${entryDate}`;
              newConfiLi.textContent = `Confidence Level: ${confidenceLevel.toUpperCase()}`;
              newTextLi.textContent = `Thoughts: ${journalText}`;
              newEditUl.appendChild(newDateLi);
              newEditUl.appendChild(newConfiLi);
              newEditUl.appendChild(newTextLi);
              entries.replaceChild(newEditUl, ulToEdit);
            }
          } else {
            doneEntering = true;
          }
        } else if (confidenceLevel == null) {
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
