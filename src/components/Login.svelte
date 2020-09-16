<script>
  import { onMount } from 'svelte'
  import Form from './Form.svelte'
  import Loading from './Loading.svelte'
  import PowerOptions from './PowerOptions.svelte'
  import '../assets/background.jpg'

  let isIdle = null

  onMount(() => {
    const imgpath = './assets/background.jpg'
    const img = new Image()
    img.onload = () => {
      const bg = document.querySelector('.background')
      bg.src = img.src
      bg.classList.add('imageReady')
    }
    img.src = imgpath
  })

  function toggleIdle() {
    isIdle = !isIdle
  }

  function logIn() {
    document.querySelector('body').classList.add('logged-in')
  }
</script>

<style>
  :global(:root) {
    --c1: #FFCD00;
    --c2: #FFCD00;
    --c3: #fff;
    --c4: #000;
    --shadow: 0 14px 28px rgba(4, 3, 15, 0.25),
      0 10px 10px rgba(4, 3, 15, 0.22);
    --shadow-h: 0 19px 38px rgba(4, 3, 15, 0.30),
      0 15px 12px rgba(4, 3, 15, 0.22);
  }
  :global(*) {
    box-sizing: border-box;
  }
  :global(html, body) {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    overflow: hidden;
    transition: opacity 300ms ease-out;
  }
  :global(main) {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  :global(.imageReady) {
    opacity: 1 !important;
  }
  :global(.error-show) {
    height: 35px;
  }
  :global(.logged-in) {
    background: black !important;
    opacity: 0;
  }
  :global(.show-error) {
    height: 35px;
  }
  :global(.hide-error) {
    height: 0px;
  }
  .background {
    position: absolute;
    width: 100%;
    height: auto;
    opacity: 0;
    transition: opacity 300ms ease-in;
  }
</style>

<img class='background' alt='background' />
<Form {isIdle} {toggleIdle} {logIn} />
<Loading {isIdle} />
<PowerOptions {isIdle} />
