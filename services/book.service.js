'use strict'

import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import booksDB from './../data/books.json' assert { type: 'json' }
console.log(booksDB)

const book_KEY = 'bookDB'

_createbooks()

export const bookService = {
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

function getEmptybook(vendor = '', maxSpeed = 0) {
  return { id: '', vendor, maxSpeed }
}

function _createbooks() {
  let books = utilService.loadFromStorage(book_KEY)
  if (!books || !books.length) {
    books = booksDB

    utilService.saveToStorage(book_KEY, books)
  }
}

// function _createbook(vendor, maxSpeed = 250) {
//   const book = getEmptybook(vendor, maxSpeed)
//   book.id = utilService.makeId()
//   return book
// }
