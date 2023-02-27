import LongTxt from '../cmps/LongTxt.js'
import { bookService } from '../services/book.service.js'

export default {
  props: ['book'],
  template: `
        <section class="book-details" v-if="book">
            <h1>{{ book.title }}</h1>
            <h2>{{ book.publishedDate }}</h2>
            <h3>{{ readType }}</h3>
            <h3>{{ publishDate }}</h3>
            <h4 :class="bgColor">{{ book.listPrice.amount }}</h4>
            <div className="img-container">
              <span class="sale" v-if="book.listPrice.isOnSale">SALE</span>
            <img :src="book.thumbnail" alt="">
            <RouterLink to="/book">Back to list</RouterLink>
            </div>
          <h5><LongTxt :txt="book.description"  :length="40"/></h5>
            <button @click="closeDetails">Close</button>
        </section>
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
  },

  components: {
    LongTxt,
  },
}
