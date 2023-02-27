const { createApp } = Vue
import { router } from './routes.js'
import AppHeader from './cmps/AppHeader.js'
import AppFooter from './cmps/AppFooter.js'

const options = {
  template: `
        <section class="container">
            <AppHeader @setRoute="route = $event"/>
            <hr />
            <main class="router-view">
            <RouterView />
            </main>
            <AppFooter />
        </section>
    `,
  data() {
    return {
      route: 'HomePage',
    }
  },
  components: {
    AppHeader,
    AppFooter,
  },
}
const app = createApp(options)
app.use(router)
app.mount('#app')
