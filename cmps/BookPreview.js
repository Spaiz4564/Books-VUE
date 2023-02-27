export default {
  props: ['book'],
  template: `
        <article class="book-preview">
            <h2>{{ book.title }}</h2>
            <img :src="book.thumbnail" alt="" />
        </article>
    `,
}
