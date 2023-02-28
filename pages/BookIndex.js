import { bookService } from '../services/book.service.js'

import bookFilter from './../cmps/bookFilter.js'
import bookList from './../cmps/bookList.js'
import AddBook from './../pages/AddBook.js'
import { eventBusService } from '../services/event-bus.service.js'

export default {
  template: `
        <section class="book-index">
          <div className="add-search-books">
            <RouterLink class="a-search-book" to="/book/addBook">Search books</RouterLink>
        <RouterLink to="/book/edit">Add a book</RouterLink>
      </div>
            <bookFilter @filter="setFilterBy"/>
            <bookList 
                :books="filteredBooks" 
                v-if="books"
                @remove="removebook" 
                @show-details="showbookDetails" />
        </section>
    `,
  data() {
    return {
      books: null,
      selectedbook: null,
      filterBy: {},
    }
  },
  methods: {
    removebook(bookId) {
      bookService
        .remove(bookId)
        .then(() => {
          const idx = this.books.findIndex(book => book.id === bookId)
          this.books.splice(idx, 1)
          eventBusService.emit('show-msg', {
            txt: 'Book removed',
            type: 'success',
          })
        })
        .catch(err => {
          eventBusService.emit('show-msg', {
            txt: 'Book remove failed',
            type: 'error',
          })
        })
    },
    showbookDetails(bookId) {
      this.selectedbook = this.books.find(book => book.id === bookId)
    },
    onSavebook(newbook) {
      this.books.unshift(newbook)
    },
    setFilterBy(filterBy) {
      this.filterBy = filterBy
    },
  },
  computed: {
    filteredBooks() {
      if (!this.filterBy.title && !this.filterBy.price) return this.books
      const searchStr = this.filterBy.title.toLowerCase()
      const filteredBooks = this.books.filter(book => {
        return (
          book.title.toLowerCase().includes(searchStr) &&
          book.listPrice.amount >= this.filterBy.price
        )
      })
      return filteredBooks
    },
  },
  created() {
    bookService.query().then(books => (this.books = books))
  },
  components: {
    AddBook,
    bookFilter,
    bookList,
  },
}
