export default {
  props: ['book'],
  template: `
<div className="img-preview">
  <img :src="book.thumbnail" alt="" />
  </div>
        
            <div className="book-info">
            <div>
            <h2>{{ book.title }}</h2>
            <hr style="max-width: 50px" />
            <RouterLink :to="'/book/'+book.id">Details</RouterLink><br />
           </div>

            <div>
            <RouterLink :to="'/book/edit/'+book.id"><i class="fa-regular fa-pen-to-square"></i></RouterLink> <br />
          
            </div>
                   
            </div>
    `,

  methods: {},
}
