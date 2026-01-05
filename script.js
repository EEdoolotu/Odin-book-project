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

const addBtn = document.addEventListener("click", addBookToLibrary)

const myLibrary = []

function Book(title, author, pages, read) {
    id = this.crypto.randomUUID();
    this.title = title;
    this. author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(id,newTitle, newAuthor, newPages, newRead) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook)
}