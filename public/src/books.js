function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let result = [];
  const filteredFalse = books.filter(
    ({ borrows }) => borrows[0].returned === false
  );
  const filteredTrue = books.filter(
    ({ borrows }) => borrows[0].returned === true
  );
  result.push(filteredFalse);
  result.push(filteredTrue);
  return result;
}

function getBorrowersForBook(book, accounts) {
  const result = book.borrows.map((borrow) => {
    const account = accounts.find((account) => account.id === borrow.id);
    return { ...borrow, ...account };
  });
  return result.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
