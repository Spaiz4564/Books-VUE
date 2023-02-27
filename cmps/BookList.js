import bookPreview from './bookPreview.js'

export default {
  props: ['books'],
  template: `
        <section class="book-list">
            <ul>
                <li v-for="book in books" :key="book.id">
                    <bookPreview :book="book"/>
                    <RouterLink :to="'/book/'+book.id">Details</RouterLink><br />
                    <RouterLink :to="'/book/edit/'+book.id">Edit</RouterLink> <br />
                    <button hidden @click="showDetails(book.id)">Details</button>
                    <button @click="remove(book.id)">x</button>
                </li>
            </ul>
        </section>
    `,
  methods: {
    remove(bookId) {
      this.$emit('remove', bookId)
    },
    showDetails(bookId) {
      this.$emit('show-details', bookId)
    },
  },
  components: {
    bookPreview,
  },
}
