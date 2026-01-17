const savedData = JSON.parse(localStorage.getItem("myLibrary")) || [];

let myLibrary = savedData.map(bookData => {
    const book = new Book(bookData.title, bookData.author, bookData.pages, bookData.read);
    book.id = bookData.id;
    return book;
});

const modal = document.getElementById("book-modal");
const btn = document.getElementById("new-book-btn");
const closeBtn = document.getElementById("close-button");
const form = document.getElementById("book-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read-status");

btn.onclick = () => modal.style.display = "block";
closeBtn.onclick = () => modal.style.display = "none";

const addBtn = document.getElementById("add-button")
addBtn.addEventListener("click", (e) => {
    e.preventDefault()
    addBookToLibrary()
})



class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = !!read;
  }

  toggleRead() { this.read = !this.read; }
  get readStatus() { return this.read ? "Read" : "Not Read"; }
  set readStatus(val) { this.read = !!val; }
}

function addBookToLibrary() {
  const book = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
  myLibrary.push(book);
  saveLocal();
  displayLibrary();
  form.reset();
  modal.style.display = "none";
}

function displayLibrary() {
  const container = document.getElementById("container");
  container.innerHTML = "";
  myLibrary.forEach(book => {
    const div = document.createElement("div");
    div.classList.add("book-card");

    const info = document.createElement("span");
    info.textContent = `${book.title} by ${book.author} (${book.pages} pages)`;
    div.appendChild(info);

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = book.readStatus;
    toggleBtn.className = book.readStatus === "Read" ? "read-btn" : "not-read-btn";
    toggleBtn.onclick = () => { book.toggleRead(); saveLocal(); displayLibrary(); };
    div.appendChild(toggleBtn);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => { myLibrary = myLibrary.filter(b => b.id !== book.id); saveLocal(); displayLibrary(); };
    div.appendChild(delBtn);

    container.appendChild(div);
  });
}

function saveLocal() {
  const plain = myLibrary.map(book => ({
    id: book.id,
    title: book.title,
    author: book.author,
    pages: book.pages,
    read: book.readStatus === "Read"
  }));
  localStorage.setItem("myLibrary", JSON.stringify(plain));
}

displayLibrary();