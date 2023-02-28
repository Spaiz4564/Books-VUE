'use strict'

import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import booksDB from './../data/books.json' assert { type: 'json' }
console.log(booksDB)

const book_KEY = 'bookDB'

_createbooks()

export const bookService = {
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
  return storageService.get(book_KEY, bookId)
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
  storageService.get(book_KEY, bookId).then(book => {
    review.id = utilService.makeId(4)
    book.reviews.push(review)
    save(book)
  })
}

function _createbooks() {
  let books = utilService.loadFromStorage(book_KEY)
  if (!books || !books.length) {
    books = booksDB

    utilService.saveToStorage(book_KEY, books)
  }
}
