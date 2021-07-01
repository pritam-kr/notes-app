const newNote = document.querySelector(".new-notes");

newNote.addEventListener("click", () => addNewNote());

function addNewNote(text = "") {
  const notBox = document.createElement("div");
  notBox.classList.add("note");
  notBox.innerHTML = `
    
                <div class="tools">
                    <button class="btn-edit"><i class="far fa-edit"></i></button>
                    <button class="btn-delete"><i class="fas fa-trash-alt"></i></button>
                </div>

                <div class="main ${text ? "hidden": ""}"></div>
                <textarea class="textarea ${text ? "" : "hidden"}"></textarea>

    `;

  const delBtn = notBox.querySelector(".btn-delete");
  delBtn.addEventListener("click", () => {
    notBox.remove();
    mylocalStorage();
  });
  const editBtn = notBox.querySelector(".btn-edit");
  const main = notBox.querySelector(".main");
  const textArea = notBox.querySelector(".textarea");
  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked(value);
    mylocalStorage();
  });

  document.querySelector(".notes-container").appendChild(notBox);
}

//local storage

function mylocalStorage() {
  const allTextArea = document.querySelectorAll("textarea");
  const myNotes = [];

  allTextArea.forEach((el) => {
    myNotes.push(el.value);
  });

  localStorage.setItem('notes', JSON.stringify(myNotes));
}

const showNotes = JSON.parse(localStorage.getItem('notes'));

if(showNotes){
    showNotes.forEach((note) => {
     addNewNote(note)
    })
}