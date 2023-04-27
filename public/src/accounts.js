function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((personA, personB) =>
    personA.name.last.toLowerCase() > personB.name.last.toLowerCase() ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  return books.reduce((counter, { borrows }) => {
    for (let i = 0; i < borrows.length; i++) {
      if (borrows[i].id === accountId) {
        counter++;
      }
    }
    return counter;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  let result = [];
  books.forEach((book) => {
    const borrows = book.borrows;
    borrows.forEach((borrowed) => {
      if (borrowed.returned === false && borrowed.id === account.id) {
        authors.forEach((author) => {
          if (author.id === book.authorId) {
            const allInfo = { ...book, author: author };
            result.push(allInfo);
          }
        });
      }
    });
  });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
