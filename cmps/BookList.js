import bookPreview from './bookPreview.js'

export default {
  props: ['books'],
  template: `
        <section class="book-list">
            <ul>
                <li class="list" v-for="book in books" :key="book.id">
                    <bookPreview  :book="book"/>
            
                    <i @click="remove(book.id)" class="fa-solid fa-xmark remove-book"></i>
                </li>
            </ul>
         
        </section>
    `,
  methods: {
    remove(bookId) {
      this.$emit('remove', bookId)
    },
  },
  components: {
    bookPreview,
  },
}
