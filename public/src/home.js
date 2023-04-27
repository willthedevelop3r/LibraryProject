const getTopFive = (arr) => arr.slice(0, 5);

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((counter, { borrows }) => {
    borrows.forEach((borrowed) => {
      if (borrowed.returned === false) {
        counter++;
      }
    });
    return counter;
  }, 0);
}

function getMostCommonGenres(books) {
  let result = [];
  let genreObj = {};
  books.forEach((book) => {
    if (!genreObj[book.genre]) {
      genreObj[book.genre] = 1;
    } else {
      genreObj[book.genre]++;
    }
  });
  for (let genre in genreObj) {
    result.push({
      name: genre,
      count: genreObj[genre],
    });
  }
  result.sort((sortA, sortB) => sortB.count - sortA.count);

  return getTopFive(result);
}

function getMostPopularBooks(books) {
  const mostPopularBooks = books
    .sort((sortA, sortB) => sortB.borrows.length - sortA.borrows.length)
    .map(({ title, borrows }) => {
      return { name: title, count: borrows.length };
    });
  return getTopFive(mostPopularBooks);
}

function getMostPopularAuthors(books, authors) {
  let authorCount = {};
  let result = [];
  books.forEach((book) => {
    if (!authorCount[book.authorId]) {
      authorCount[book.authorId] = book.borrows.length;
    }
  });
  for (let authorId in authorCount) {
    const authorFind = authors.find((author) => {
      return author.id === Number(authorId);
    });
    result.push({
      name: `${authorFind.name.first} ${authorFind.name.last}`,
      count: authorCount[authorId],
    });
  }
  result.sort((sortA, sortB) => {
    return sortB.count - sortA.count;
  });

  return getTopFive(result);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
