export default {
  template: `
        <section class="book-filter">
            <input 
                v-model="filterBy.title"
                @input="filter" 
                placeholder="Search"
                type="text" />
                <input 
                v-model="filterBy.price"
                @input="filter" 
                placeholder="Price"
                type="number" />
        </section>
    `,
  data() {
    return {
      filterBy: { title: '', price: '' },
    }
  },
  methods: {
    filter() {
      this.$emit('filter', this.filterBy)
    },
  },
}
