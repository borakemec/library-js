const myLibrary = [];
let bookCard;
let bookText;
let removeButton;
let readButton;
const addButton = document.querySelector(".add-book");
const container = document.querySelector('.main-container');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close');
const bookForm  = document.querySelector('.book-form');

function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`);
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function createCard() {
    container.innerHTML = '';
    for(let i = 0; i < myLibrary.length; i++) {
        let currentBook = myLibrary[i];

        bookCard = document.createElement('div');
        bookCard.classList.add('card');

        bookText = document.createElement('p');
        bookText.innerHTML = `<span class="first-lines"><span class="book-title">${currentBook.title}</span><br>by<br>${currentBook.author}</span>
                                Pages: ${currentBook.pages}<br>Read: ${currentBook.read ? "Yes" : "No"}`;

        removeButton = document.createElement('div');
        removeButton.classList.add('remove-button');
        removeButton.innerText = "Remove";
        removeButton.addEventListener('click', () => removeBook(i))

        readButton  = document.createElement('div');
        readButton.classList.add('read-button');
        readButton.innerText = `${currentBook.read ? "Read" : "Not Read"}`;
        readButton.classList.add(`${currentBook.read ? "readTrue" : "readFalse"}`);
        readButton.addEventListener('click', () => toggleReadStatus(i));

        function toggleReadStatus(index) {
            myLibrary[index].read = !myLibrary[index].read;
            container.innerHTML = '';
            createCard();
        }

        bookCard.appendChild(bookText);
        bookCard.appendChild(removeButton);
        bookCard.appendChild(readButton);

        container.appendChild(bookCard);
    }
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    createCard();
}

function showForm() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

function addBook(event) {
    event.preventDefault();
    const title = document.querySelector('#book-name').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#checkbox').checked;
    let newBook = new book(title, author, pages, read);
    addBookToLibrary(newBook);
    createCard();
    closeModal();
    bookForm.reset();
}

let theHobbit = new book('The Hobbit', 'J.R.R. Tolkien', 320, false);
let harryPotter = new book('Harry Potter', 'J.K. Rowling', 734, true);
let lordOfTheRings = new book('Lord of the Rings', 'J.R.R. Tolkien', 1216, true);

addBookToLibrary(theHobbit);
addBookToLibrary(harryPotter);
addBookToLibrary(lordOfTheRings);

createCard();

addButton.addEventListener('click', showForm);
closeButton.addEventListener('click', closeModal);
bookForm.addEventListener('submit', addBook);

if (window.history.replaceState) {
    window.history.replaceState( null, null, window.location.href);
}
