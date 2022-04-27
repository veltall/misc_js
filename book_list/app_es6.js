class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class BookStore {
  static getBooks() {
    let list;
    if (localStorage.getItem("books") === null) {
      list = [];
    } else {
      list = JSON.parse(localStorage.getItem("books"));
    }
    return list;
  }
  static displayBooks() {
    const list = BookStore.getBooks();
    list.forEach((book) => {
      const bookList = new BookList();
      bookList.addBook(book);
    });
  }

  static addBook(book) {
    const list = BookStore.getBooks();
    list.push(book);
    localStorage.setItem("books", JSON.stringify(list));
  }

  static removeBook(isbn) {
    const list = BookStore.getBooks();
    console.log(`removing book ${isbn}`);
    list.forEach((book, index) => {
      if (book.isbn === isbn) {
        list.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(list));
  }
}

class BookList {
  addBook(book) {
    const list = document.getElementById("book-list");
    // create UI element
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="btitle">${book.title}</td>
      <td class="bauthor">${book.author}</td>
      <td class="bisbn">${book.isbn}</td>
      <td><a href="#" class="delete">x</a></td>
    `;
    list.appendChild(row);
    this.clearFields();
  }
  removeBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
      this.showAlert("Book removed", "success");
    }
  }
  showAlert(msg, status) {
    const div = document.createElement("div");
    div.className = `alert ${status}`;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");

    container.insertBefore(div, form);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

function initialize() {
  // const title = "Triangle Strategy, Octopath, Bravely Default".split(",");
  // const author = "Akira Senju, Yasunori Nishiki, Sound Horizon".split(",");
  // const isbn = "1112, 1132, 1234".split(",");

  // // const book = new Book(title, author, isbn);

  // const list = new BookList();
  // title.forEach((t, i) => {
  //   const b = new Book(t, author[i], isbn[i]);
  //   // list.addBook(b);
  //   BookStore.addBook(b);
  // });
  document.addEventListener("DOMContentLoaded", BookStore.displayBooks);
}

// listeners
document.getElementById("book-form").addEventListener("submit", (e) => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);

  const list = new BookList();
  // validate
  if (title === "" || author === "" || isbn === "") {
    list.showAlert("Check all inputs", "error");
  } else {
    BookStore.addBook(book);
    list.showAlert("Book added", "success");
    document.location.reload();
  }

  e.preventDefault();
});

initialize();

document.querySelector("#book-list").addEventListener("click", (e) => {
  const list = new BookList();
  list.removeBook(e.target);
  const td = e.target.parentElement.previousElementSibling;
  if (td !== null && td.className.indexOf("bisbn") != -1) {
    BookStore.removeBook(td.textContent);
  }
  e.preventDefault();
});
