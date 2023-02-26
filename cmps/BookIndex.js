import { bookService } from '../services/book.service.js'

import bookFilter from './bookFilter.js'
import bookList from './bookList.js'

import bookDetails from './bookDetails.js'
import bookEdit from './bookEdit.js'

export default {
  template: `
        <section class="book-index">
            <bookFilter @filter="setFilterBy"/>
            <bookList 
                :books="filteredbooks" 
                v-if="books"
                @remove="removebook" 
                @show-details="showbookDetails" />
            <bookEdit @book-saved="onSavebook"/>
            <bookDetails 
                v-if="selectedbook" 
                @hide-details="selectedbook = null"
                :book="selectedbook"/>
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
      bookService.remove(bookId).then(() => {
        const idx = this.books.findIndex(book => book.id === bookId)
        this.books.splice(idx, 1)
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
    filteredbooks() {
      const regex = new RegExp(this.filterBy.vendor, 'i')
      return this.books.filter(book => regex.test(book.vendor))
    },
  },
  created() {
    bookService.query().then(books => (this.books = books))
  },
  components: {
    bookFilter,
    bookList,
    bookDetails,
    bookEdit,
  },
}
