export default {
  template: `
        <header class="app-header">
            <img class="logo" src="./../assets/img/logo.png" alt="" />
            <nav>
            <RouterLink to="/">HOME</RouterLink> 
                <RouterLink to="/book">OUR BOOKS</RouterLink> 
                <RouterLink to="/about">ABOUT US</RouterLink>
            </nav>
        </header>
    `,
  methods: {},
}
