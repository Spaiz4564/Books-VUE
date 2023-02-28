import { bookService } from '../services/book.service.js'
import { eventBusService } from '../services/event-bus.service.js'

export default {
  template: `
  <section className="add-book-section">
  <h1>Search books</h1>
  <form @submit.prevent="searchBooks" action="">
  <input v-model="searchStr"  class="search-book" type="text" placeholder="Search book" />
  </form>
    <div v-for="book in books" className="books-container">
        <div><i class="fa-solid fa-book"></i> &nbsp {{ book.volumeInfo.title }} &nbsp <i @click="addBook(book)" class="fa-solid fa-plus"></i></div>
    </div>
  </section>
    `,

  data() {
    return {
      searchStr: '',
      books: [],
    }
  },

  methods: {
    searchBooks() {
      bookService
        .getBooksAPI(this.searchStr)
        .then(res => (this.books = [...res.data.items]))
      setTimeout(() => {
        console.log(this.books)
      }, 1500)
    },

    addBook(book) {
      bookService.addGoogleBook(book)
      eventBusService.emit('show-msg', {
        txt: 'Book saved',
        type: 'success',
      })
      console.log(book)
    },
  },

  computed: {},
}
