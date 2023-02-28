'use strict'

import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import booksDB from './../data/books.json' assert { type: 'json' }
console.log(booksDB)

const book_KEY = 'bookDB'

_createbooks()

export const bookService = {
  addGoogleBook,
  getBooksAPI,
  addReview,
  query,
  get,
  remove,
  save,
  getEmptybook,
}

function query(filterBy = {}) {
  return storageService.query(book_KEY).then(books => {
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, 'i')
      books = books.filter(book => regex.test(book.vendor))
    }
    if (filterBy.minSpeed) {
      books = books.filter(book => book.maxSpeed >= filterBy.minSpeed)
    }
    return books
  })
}

function get(bookId) {
  return storageService.get(book_KEY, bookId).then(_setNextPrevBookId)
}

function remove(bookId) {
  return storageService.remove(book_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(book_KEY, book)
  } else {
    return storageService.post(book_KEY, book)
  }
}

function getEmptybook() {
  return {
    id: '',
    title: 'new book',
    reviews: [],
    subtitle: 'mi est eros dapibus himenaeos',
    authors: ['Barbara Cartland'],
    publishedDate: 1999,
    description: 'placerat nisi sodales suscipit tellus',
    pageCount: 713,
    categories: ['Computers', 'Hack'],
    thumbnail: 'http://coding-academy.org/books-photos/16.jpg',
    language: 'en',
    listPrice: {
      amount: 109,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  }
}

function addReview(bookId, review) {
  console.log(bookId)
  review.id = utilService.makeId(4)
  return storageService.get(book_KEY, bookId).then(book => {
    book.reviews.push(review)
    return storageService.put(book_KEY, book)
  })
}

function _createbooks() {
  let books = utilService.loadFromStorage(book_KEY)
  if (!books || !books.length) {
    books = booksDB

    utilService.saveToStorage(book_KEY, books)
  }
}

function _setNextPrevBookId(book) {
  return storageService.query(book_KEY).then(books => {
    const bookIdx = books.findIndex(currbook => currbook.id === book.id)
    book.nextbookId = books[bookIdx + 1] ? books[bookIdx + 1].id : books[0].id
    book.prevbookId = books[bookIdx - 1]
      ? books[bookIdx - 1].id
      : books[books.length - 1].id
    return book
  })
}

function getBooksAPI(search) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${search}`
  return axios
    .get(url)
    .then(res => {
      return res
    })
    .catch(err => {
      console.log('err: ', err)
      throw 'Had a problem'
    })
}

function addGoogleBook(googleBook) {
  const book = _createGoogleBook(googleBook)
  save(book)
  console.log(book)
}

function _createGoogleBook(googleBook) {
  const book = {
    id: '',
    title: googleBook.volumeInfo.title,
    subtitle: googleBook.volumeInfo.subtitle,
    authors: googleBook.volumeInfo.authors,
    publishedDate: googleBook.volumeInfo.publishedDate,
    description: googleBook.searchInfo.textSnippet,
    pageCount: googleBook.volumeInfo.pageCount,
    categories: googleBook.volumeInfo.categories,
    thumbnail: googleBook.volumeInfo.imageLinks.thumbnail,
    language: googleBook.volumeInfo.language,
    listPrice: {
      amount: utilService.getRandomIntInclusive(10, 100),
      currencyCode: 'USD',
      isOnSale: false,
    },
    reviews: [],
  }
  return book
}
