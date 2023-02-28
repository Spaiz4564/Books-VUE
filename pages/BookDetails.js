import LongTxt from '../cmps/LongTxt.js'
import AddReview from '../cmps/AddReview.js'
import { bookService } from '../services/book.service.js'

export default {
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
            <nav class="nav-paging">
          <RouterLink :to="'/book/' + book.prevbookId">&#x2190 Prev book </RouterLink>
        <RouterLink :to="'/book/' + book.nextbookId">Next book &#x2192</RouterLink>
        </nav>
          </div>
        </div>    
        <div className="review-box">

        
        <AddReview @save-review="saveReview" :book="book" />
        <RouterLink class="back-to-list" to="/book">Back to list <span style="padding-bottom: 5px;">&#x2192</span></RouterLink> 
       
       
        </div>   
        </section>
       <div className="reviews">
        <div class="review" v-for="review in displayReviews">
          <span @click="removeReview(review.id)" class="remove">X</span>
          <h3 class="name">{{ review.name }}</h3>
          <h3 class="rate">{{ displayStars(review.rating) }}</h3>
          <h3 class="date">{{ review.date }}</h3>
          
        </div>
       </div>
        
       
    `,

  data() {
    return {
      book: null,
    }
  },
  created() {
    console.log('Params:', this.$route.params)
    // const { bookId } = this.$route.params
    // bookService.get(bookId).then(book => (this.book = book))
    console.log('BookDetails Params:', this.$route.params)
    this.loadBook()
  },

  watch: {
    bookId() {
      console.log('BookId Changed!')
      this.loadBook()
    },
  },

  methods: {
    displayStars(rate) {
      console.log(rate)
      let strHTML = ''
      for (let i = 0; i < rate; i++) {
        strHTML += `☆`
      }
      return strHTML
    },

    removeReview(id) {
      const idx = this.book.reviews.findIndex(r => r.id === id)
      this.book.reviews.splice(idx, 1)
      bookService.save(this.book)
    },

    saveReview(review) {
      bookService
        .addReview(this.book.id, { ...review })
        .then(() => this.loadBook())
    },

    loadBook() {
      bookService.get(this.bookId).then(book => (this.book = book))
    },
  },

  computed: {
    bookId() {
      return this.$route.params.bookId
    },

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

    displayReviews() {
      if (!this.book) return
      return this.book.reviews !== [] ? this.book.reviews : ''
    },
  },

  components: {
    AddReview,
    LongTxt,
  },
}
