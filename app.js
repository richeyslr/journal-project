jornalEntries = [];

let addButton = document.getElementById("add-entry");
addButton.addEventListener("click", getUserEntry);

function getUserEntry(evt) {
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
          if (confirmation != null) {
            let newEntry = new JournalEntry(
              entryDate,
              confidenceLevel,
              journalText
            );
            jornalEntries.push(newEntry);
            postEntry();
          } else {
            doneEntering = true;
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

function postEntry() {
  for (let i = 0; i < jornalEntries.length; i++) {
    let entryContainer = document.querySelector("#entries");
    let newEntryUl = document.createElement("ul");
    let dateLi = document.createElement('li');
    let confiLi = document.createElement('li');
    let textLi = document.createElement('li');
    dateLi.textContent = this.dateOf;
    confiLi.textContent = this.confidence;
    textLi.textContent = this.entryText;
    newEntryUl.appendChild(dateLi);
    newEntryUl.appendChild(confiLi);
    newEntryUl.appendChild(textLi);
    entryContainer.appendChild(newEntryUl);
  }
}
console.log(jornalEntries);

function JournalEntry(entryDate, confidenceLevel, journalText) {
  this.dateOf = entryDate;
  this.confidence = confidenceLevel;
  this.entryText = journalText;
}
