function interact() {
  const notesContainer = document.querySelector(".notes-container");
  const newNoteBtn = document.querySelector(".btn");
  let notes = document.querySelectorAll(".input-box");

  function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes");
  }
  showNotes();

  function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
  }

  function addNewNote() {
    newNoteBtn.addEventListener("click", () => {
      let inputBox = document.createElement("p");
      let deleteIcon = document.createElement("img");
      deleteIcon.src = "image/delete_icon.png";

      inputBox.className = "input-box";
      inputBox.setAttribute("contenteditable", "true");

      notesContainer.appendChild(inputBox).appendChild(deleteIcon);

      // Re-adding icon if accidentally removed
      inputBox.addEventListener("input", () => {
        if (!inputBox.contains(deleteIcon)) {
          inputBox.appendChild(deleteIcon);
        }
      });
    });
  }

  function deleteNote() {
    notesContainer.addEventListener("click", function (e) {
      if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
      } else if (e.target.tagName === "P") {
        notes = document.querySelectorAll(".input-box");
        notes.forEach((nt) => {
          nt.onkeyup = function () {
            updateStorage();
          };
        });
      }
    });
  }

  addNewNote();
  deleteNote();
}
interact();
