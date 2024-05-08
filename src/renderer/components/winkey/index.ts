import Card from './card/index.vue'
import Menu from './menu/index.vue'

export default {
  instapp(app) {
    app.component('wk-card', Card)
    app.component('wk-menu', Menu)
  }
}
