const newTitle = document.getElementById("title")
const newAuthor = document.getElementById("author")
const newPages = document.getElementById("pages")
const newRead = document.getElementById("read-status")
const modal = document.querySelector("#book-modal")
const btn = document.querySelector("#new-book-btn")
const closebtn = document.getElementById("close-button")

btn.onclick = function() {
    modal.style.display = "block"
}

closebtn.onclick = function() {
    modal.style.display = "none"
}

const addBtn = document.getElementById("add-button")
addBtn.onclick = function(e) {
    e.preventDefault()
    addBookToLibrary()
}

const myLibrary = []

function Book(id, title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this. author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    const titleVal = newTitle.value;
    const authorVal = newAuthor.value;
    const pagesVal = newPages.value
    const readVal = newRead.value

    let newBook = new Book(titleVal, authorVal, pagesVal, readVal);
    myLibrary.push(newBook)

    modal.style.display = "none";
}

function showBook() {
    const div = document.createElement("div")

    div.textContent = `<span></span>`;
}