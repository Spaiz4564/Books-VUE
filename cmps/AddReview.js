import { bookService } from '../services/book.service.js'

export default {
  props: ['book'],
  template: `
  <section className="review">
    <h2>Add review</h2>
    
    <select class="select-review" v-model="renderBy">
      <option value="stars">stars</option>
      <option value="txt">text</option>
      <option value="number">number</option>
    </select>
  <form class="isform" @submit.prevent="saveReview()" action="">
    <input v-model="review.name" type="text" placeholder="Full name" />
    <input v-model="review.date" type="date" placeholder="date" />

    <div>
    <select class="rate-number" v-model="review.rating" v-if="renderBy === 'number'" >
      <option type='number' value="1">1</option>
      <option type='number' value="2">2</option>
      <option type='number' value="3">3</option>
      <option type='number' value="4">4</option>
      <option type='number' value="5">5</option>
    </select>
    </div>

    <div v-if="renderBy === 'txt'"><input v-model="review.rating" type='txt' name='txt' placeholder="1-5"></div>

    <div v-if="renderBy === 'stars'" class="rating"  >
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

      renderBy: 'stars',
    }
  },

  methods: {
    saveReview() {
      this.$emit('save-review', this.review)
    },
  },
}
