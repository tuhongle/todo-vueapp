import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.scss'

import 'bootstrap'
import '@popperjs/core'
import { Dropdown } from 'bootstrap'
window.Dropdown = Dropdown

createApp(App).mount('#app')
