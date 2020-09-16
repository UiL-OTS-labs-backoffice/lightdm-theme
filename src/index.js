import Login from './components/Login.svelte'

if (process.env.NODE_ENV === 'development') {
  require('./utils/lightDM.dev.js')
}

const app = new Login({
  target: document.querySelector('main')
})
