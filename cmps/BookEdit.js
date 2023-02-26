import { bookService } from '../services/book.service.js'

export default {
  template: `
        <section class="book-edit">
            <h2>Add a book</h2>
            <form @submit.prevent="save">
                <input type="text" v-model="book.vendor" placeholder="Vendor">
                <input type="number" v-model.number="book.maxSpeed">
                <button>Save</button>
            </form>
        </section>
    `,
  data() {
    return {
      book: bookService.getEmptybook(),
    }
  },
  methods: {
    save() {
      bookService.save(this.book).then(savedbook => {
        this.book = bookService.getEmptybook()
        this.$emit('book-saved', savedbook)
      })
    },
  },
}
