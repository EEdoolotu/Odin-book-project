let myLibrary = JSON.parse(localStorage.getItem("myLibrary") || []);

myLibrary = myLibrary.map((book) => {
    const newBook = new Book(book.title, book.author, book.pages, book.read);
    newBook.id = book.id;
    return newBook;
})

displayLibrary()


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



function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this. author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read
}

function addBookToLibrary() {
    const titleVal = newTitle.value;
    const authorVal = newAuthor.value;
    const pagesVal = newPages.value
    const readVal = newRead.checked

    let newBook = new Book(titleVal, authorVal, pagesVal, readVal);
    myLibrary.push(newBook)
    savelocal()

    modal.style.display = "none";

    displayLibrary()
    document.getElementById("book-form").reset()
}
function displayLibrary() {

    const container = document.querySelector("#container")
    container.innerHTML = "";

    myLibrary.forEach((book) => {
        const div = document.createElement("div")
        div.classList.add("book-card")

        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "Delete"
        deleteBtn.classList.add("delete-btn");

        deleteBtn.onclick = function () {
            deleteBook(book.id)
        }

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = book.read ? "Read" : "Not-Read";
        toggleBtn.classList.add(book.read ? "read-btn" : "not-read-btn")

        toggleBtn.onclick = function() {
            book.toggleRead();
            savelocal()

            displayLibrary()
        }
        
        const bookInfo = document.createElement("p")
        bookInfo.classList.add("book-info")
        bookInfo.textContent = `${book.title} by ${book.author} with ${book.pages} pages`;
        div.appendChild(bookInfo)
        div.appendChild(deleteBtn)
        div.appendChild(toggleBtn)
        div.setAttribute("data-id", book.id)
        container.appendChild(div)
        
    });
}


function deleteBook(idToDelete) {
    myLibrary = myLibrary.filter(book => book.id !== idToDelete);
    savelocal();
    displayLibrary();

}

function savelocal() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}
