<script>
  import { beforeUpdate } from 'svelte'
  import { fade } from 'svelte/transition'
  import { quadInOut } from 'svelte/easing'
  import loadingBarSVG from '../assets/icons/loading-bar.svg'

  export let isIdle
  let message = 'signing in'
</script>

<style>
  @font-face {
    font-family: "MerriweatherBold";
    src: url("../assets/fonts/Merriweather-Bold.ttf") format("truetype");
  }
  .loader {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 100;
    background: rgba(0,0,0,0.5);
    padding: 30px;
  }
  .loader img {
    width: 75px;
  }
  .loader span {
    font-size: 1.6em;
    font-family: "MerriweatherBold", "Times New Roman", "Open Sans", serif;
    color: var(--c3);
    margin-top: 30px;
  }
</style>

{#if isIdle === false}
  <div
    class='loader'
    transition:fade={{ easing: quadInOut }}
  >
    <img src={loadingBarSVG} alt='loading' />
    <span>{message}</span>
  </div>
{/if}
