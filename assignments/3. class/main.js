class BookList {
    constructor(allBooks = []) {
        this.books = allBooks;
        this.noOfBooksRead = 0;
        this.noOfbooksNotRead = this.books.length;
        this.currentBook = this.books[0];
        this.nextBook = this.books[1];
        this.lastReadBook = null;
    }
    addBook(book) {
        this.books.push(book);
        ++this.noOfBooksRead;
    }
    finishCurrentBook() {
        ++this.noOfBooksRead;
        ++this.noOfbooksNotRead;
        this.lastReadBook = this.currentBook;
        this.currentBook = this.nextBook;
        this.nextBook = this.books[this.books.indexOf(this.currentBook) + 1];
        this.currentBook.read = true;
        this.currentBook.readDate = new Date(Date.now());
    }
}

class Book {
    constructor(title, genre, author) {
        this.title = title;
        this.genre = genre;
        this.author = author;
        this.read = false;
        this.readDate = new Date();
    }
}

let b1 = new Book("Brave New World",
    "Science fiction, dystopian fiction",
    "Aldous Huxley");

let b2 = new Book("The Time Machine",
"Science fiction",
"H. G. Wells");

let b3 = new Book("Wuthering Heights",
"Tragedy, gothic",
"Emily Brontë");

let b4 = new Book("Fahrenheit 451",
"Dystopian",
"Ray Bradbury");

let bookList = new BookList([b1, b2, b3, b4]);