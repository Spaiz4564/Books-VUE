export default {
  props: ['txt', 'length'],
  template: `
    <p v-if="isLong === false">{{ subString }}...</p>
    <p v-else="isLong === true"> {{ txt }}  </p>
    <button class="read-more" @click="isLong = !isLong">{{ isLong ? 'Read Less' : 'Read More' }}</button>
    
    `,

  data() {
    return {
      isLong: false,
    }
  },

  computed: {
    subString() {
      return this.txt.substring(0, this.length)
    },
  },
}
