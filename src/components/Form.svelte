<script>
  import { onMount } from 'svelte'
  import { fly, fade } from 'svelte/transition'
  import { quadInOut } from 'svelte/easing'
  import rightArrowSVG from '../assets/icons/right-arrow.svg'

  export let isIdle
  export let toggleIdle
  export let logIn
  let error
  let selectedSession
  let username = ""

  const lightdm = window.lightdm || {}

  onMount(() => {
    toggleIdle()
    if (lightdm.default_session !== 'default') {
      selectedSession = lightdm.sessions.find(s => s.name === lightdm.default_session)
    }

    if (typeof selectedSession === "undefined") {
      selectedSession = lightdm.sessions[0]
    }
  })

  function focusContainer() {
    document.querySelector('.container')
      .classList
      .toggle('container__active')
  }

  function clearError() {
    error = undefined
  }

  function handleLogin() {
    document.querySelector('#login-btn').blur()
    const { value: secret } = document.querySelector('#user-secret')

    if (!username || !secret) {
      if (!username && !secret) error = 'Missing username and password'
      else if (!username) error = 'Missing username'
      else error = 'Missing password'
      return
    }
    lightdm.authenticate(username)
    toggleIdle()
  }

  window.show_prompt = (text, type) => {
    const { value: secret } = document.querySelector('#user-secret')
    if (type === 'password') {
      lightdm.respond(secret)
    }
  }

  window.authentication_complete = () => {
    if (lightdm.is_authenticated) {
      lightdm.login(lightdm.authentication_user, selectedSession.name.toLowerCase())
      logIn()
    }
    else {
      toggleIdle()
      error = 'Invalid username/password'
    }
  }

  window.show_message = (text) => {
    error = text
  }
</script>

<style>
  @font-face {
    font-family: "MerriweatherBold";
    src: url("../assets/fonts/Merriweather-Bold.ttf") format("truetype");
  }
  ::placeholder {
    color: #666;
  }
  .container {
    background: var(--c3);
    width: 100%;
    max-width: 400px;
    min-width: 300px;
    max-height: 500px;
    margin: 50px;
    padding: 20px 30px 30px;
    /*border-radius: 4px;*/
    box-shadow: var(--shadow);
    transition: all 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
    user-select: none;
    z-index: 100;
  }
  h1 {
    color: var(--c5);
    letter-spacing: 2px;
    margin: 0 0 20px 0;
    font-family: "MerriweatherBold", "Times New Roman", "Open Sans", serif;
    font-weight: bold;
  }
  p {
    margin-bottom: 20px;
    color: var(--c7)
  }
  input {
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    font-weight: 400;
    color: var(--c5);
    padding: 10px 15px;
    width: 100%;
    z-index: 100;
    position: relative;
  }
  form {
    display: flex;
    flex-direction: column;
    margin: 0;
  }
  .form-group {
    position: relative;
    margin-bottom: 20px;
  }
  .form-group > input[type=text],
  .form-group > input[type=password] {
    border: 1px solid var(--c6);
    transition: all 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
  }
  .form-group > input[type=text]:focus,
  .form-group > input[type=password]:focus {
    border: 1px solid var(--c1);
  }
  .form-group > span {
    position: absolute;
    width: 100%;
    border-radius: 6px;
    top: 95%;
    bottom: 0;
    left: 0;
    background: var(--c1);
    background: transparent;
    z-index: 1;
  }
  .error-group {
    text-align: center;
    color: red;
    position: relative;
    overflow: hidden;
    transition: all 300ms ease-in-out;
  }
  .error-group p {
    margin: 0 0 10px 0;
    position: absolute;
    color: red;
    left: 0;
    right: 0;
  }
  button {
    background: var(--c1);
    border: none;
    width: auto;
    flex: 1 1 auto;
    font-weight: 700;
    letter-spacing: 0;
    height: 40px;
    cursor: pointer;
    padding: 0 20px;
    color: black;
    transition: all 300ms cubic-bezier(0.39, 0.575, 0.565, 1);
  }
  .bottom {
    display: flex;
    justify-content: center;
  }
  .session {
    display: flex;
    padding: 10px 0;
    align-items: flex-end;
    flex: 1 0 auto;
  }
  .session > span {
    color: var(--c7);
    margin-right: 5px;
  }
  .session-list {
    color: var(--c7);
    box-sizing: border-box;
    margin: 0;
    padding-right: 15px;
    border: none;
    -webkit-appearance: none;
    background-color: transparent;
    background-image: url('../assets/icons/dropdown-arrow.svg');
    background-repeat: no-repeat;
    background-position: right;
    background-size: contain;
    cursor: pointer;
  }
  .session-list option {
    background: var(--c3);
    font-size: 1em;
  }
</style>

{#if isIdle}
  <div
    class='container'
    on:focusin={focusContainer}
    on:focusout={focusContainer}
    in:fly={{ y: 40, easing: quadInOut }}
    out:fade
  >
    <h1>Welcome</h1>
    <p>Please login using your Solis-ID and password</p>
    <form
      on:submit|preventDefault={handleLogin}
      autocomplete='off'
    >
      <div
              id='error-message'
              class="error-group {error ? 'show-error' : 'hide-error'}"
      >
        <p>{error || ''}</p>
      </div>
      <div class='form-group'>
        <input
          id='user-name'
          type=text
          placeholder='Solis-ID'
          autofocus='autofocus'
          bind:value={username}
        />
      </div>
      <div class='form-group'>
        <input
          id='user-secret'
          type=password
          placeholder='Password'
          on:focus={clearError}
        />
      </div>
      <div class='bottom'>
        {#if lightdm.sessions.length > 1}
          <div class='session'>
            <span>session:</span>
            <select
              class='session-list'
              bind:value={selectedSession}
            >
              {#each lightdm.sessions as session}
                <option value={session}>{session.name}</option>
              {/each}
            </select>
          </div>
        {/if}
        <button id='login-btn'>
          Log in
        </button>
      </div>
    </form>
  </div>
{/if}
