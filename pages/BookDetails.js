import LongTxt from '../cmps/LongTxt.js'
import { bookService } from '../services/book.service.js'

export default {
  props: ['book'],
  template: `
        <section class="book-details" v-if="book">

          <div className="details">
          <h1>{{ book.title }}</h1>
          <h4>Author: {{ book.authors[0] }}</h4>
          <h4>Categories: {{ displayCategories }}</h4>
            <h4>Publish date: {{ book.publishedDate }} <span>{{ publishDate }}</span></h4>
            <h4>Pages: {{ book.pageCount }} <span>{{ readType }}</span></h4>
            
            <h5><LongTxt :txt="book.description"  :length="40"/></h5>
            <h4 :class="bgColor">Price:  {{ book.listPrice.amount }}$</h4>
          </div>

          <div className="book">
          <div className="img-container">
              <span class="sale" v-if="book.listPrice.isOnSale">SALE</span>
            <img :src="book.thumbnail" alt="">
          </div>
          </div>

        </section>
        <RouterLink class="back-to-list" to="/book">Back to list</RouterLink>
    `,

  data() {
    return {
      book: null,
    }
  },
  created() {
    console.log('Params:', this.$route.params)
    const { bookId } = this.$route.params
    bookService.get(bookId).then(book => (this.book = book))
  },

  methods: {
    closeDetails() {
      this.$emit('hide-details')
    },
  },

  computed: {
    readType() {
      let txt = ''
      if (this.book.pageCount > 500) txt = 'Serious Reading'
      else if (this.book.pageCount > 200) txt = 'Decent Reading'
      else if (this.book.pageCount < 100) {
        txt = 'Light Reading'
      }
      return txt
    },

    publishDate() {
      let txt = ''
      const yearsAgo = 2023 - this.book.publishedDate
      if (yearsAgo > 10) txt = 'Vintage'
      else if (yearsAgo < 1) txt = 'New'
      return txt
    },

    bgColor() {
      let color = 'price '
      if (this.book.listPrice.amount > 150) color += 'red'
      else if (this.book.listPrice.amount < 20) color += 'green'
      return color
    },

    displayCategories() {
      return this.book.categories.join(', ')
    },
  },

  components: {
    LongTxt,
  },
}
