import { bookService } from '../services/book.service.js'

export default {
  props: ['book'],
  template: `
  <section className="review">
    <h2>Add review</h2>
  <form class="isform" @submit.prevent="saveReview()" action="">
    <input v-model="review.name" type="text" placeholder="Full name" />
    <input v-model="review.date" type="date" placeholder="date" />
    <div class="rating"  >
  <input v-model="review.rating" type='radio' name='rating' value='5' id='5'><label for='5'>☆</label>
  <input v-model="review.rating" type='radio' name='rating' value='4' id='4'><label for='4'>☆</label>
  <input v-model="review.rating" type='radio' name='rating' value='3' id='3'><label for='3'>☆</label>
  <input v-model="review.rating" type='radio' name='rating' value='2' id='2'><label for='2'>☆</label>
  <input v-model="review.rating" type='radio' name='rating' value='1' id='1'><label for='1'>☆</label>
</div>
    <button class="submit" >Submit</button>
  </form>
  </section>
  
    
    `,

  data() {
    return {
      review: {
        name: '',
        date: '',
        rating: '',
      },
    }
  },

  methods: {
    saveReview() {
      bookService.addReview(this.book.id, { ...this.review })
    },
  },
}
