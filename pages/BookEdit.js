import { bookService } from '../services/book.service.js'
import { eventBusService } from '../services/event-bus.service.js'

export default {
  template: `
        <section class="book-edit">
            <h2>{{(book.id)? 'Edit' : 'Add'}} a book</h2>
            <form @submit.prevent="save">
                <input type="text" v-model="book.title" placeholder="Title">
                <span>onSale?</span>
                <input type="checkbox" id="sale" placeholder="onSale?" v-model="book.listPrice.isOnSale" name="onsale">
                <button>Save</button>
            </form>
        </section>
    `,

  created() {
    const { bookId } = this.$route.params
    if (bookId) {
      bookService.get(bookId).then(book => (this.book = book))
    }
  },

  data() {
    return {
      book: bookService.getEmptybook(),
    }
  },
  methods: {
    save() {
      bookService
        .save(this.book)
        .then(savedbook => {
          this.book = bookService.getEmptybook()
          this.$emit('book-saved', savedbook)
          eventBusService.emit('show-msg', {
            txt: 'Book saved',
            type: 'success',
          })
          this.$router.push('/book')
        })
        .catch(err => {
          eventBusService.emit('show-msg', {
            txt: 'Book save failed',
            type: 'error',
          })
        })
    },
  },
}
