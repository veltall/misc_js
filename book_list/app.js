function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

function BookList() {}

BookList.prototype.addBook = (book) => {
  const list = document.getElementById("book-list");
  // create UI element
  const row = document.createElement("tr");
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">x</a></td>
  `;
  list.appendChild(row);
};

BookList.prototype.removeBook = (target) => {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

BookList.prototype.showAlert = function (msg, type) {
  const div = document.createElement("div");
  div.className = `alert ${type}`;
  div.appendChild(document.createTextNode(msg));
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");

  container.insertBefore(div, form);

  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
};

BookList.prototype.clearFields = () => {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

function initialize() {
  const title = "Triangle Strategy, Octopath, Bravely Default".split(",");
  const author = "Akira Senju, Yasunori Nishiki, Sound Horizon".split(",");
  const isbn = "1112, 1132, 1234".split(",");

  // const book = new Book(title, author, isbn);

  const list = new BookList();
  title.forEach((t, i) => {
    list.addBook(new Book(t, author[i], isbn[i]));
  });
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
    list.addBook(book);
    list.showAlert("Book added", "success");
    list.clearFields();
  }

  e.preventDefault();
});

initialize();

document.querySelector("#book-list").addEventListener("click", (e) => {
  const list = new BookList();
  list.removeBook(e.target);
  list.showAlert("Book removed", "success");
  e.preventDefault();
});
