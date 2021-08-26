<script>
  import { fade } from 'svelte/transition'
  import Clock from './Clock.svelte'

  export let isIdle

  let userOptions = {
    hibernate: false,
    restart: lightdm.can_restart,
    shutdown: lightdm.can_shutdown,
    suspend: false
  }

  function executeAction(option) {
    lightdm[option]()
  }
</script>

<style>
  div {
    background: white;
    display: flex;
    color: var(--c5);
    font-family: Arial, Helvetica, sans-serif;
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 15px;
    user-select: none;
    /*border-bottom-left-radius: 4px;*/
    box-shadow: var(--shadow-l);
    z-index: 100;
  }
  .action {
    cursor: pointer;
    transition: all 300ms ease-in-out;
  }
  .action:hover {
    opacity: 1;
  }
  .divider {
    margin: 0 10px;
  }
</style>

{#if isIdle}
  <div
    in:fade
    out:fade
  >
    {#each Object.keys(userOptions) as option, index}
      {#if userOptions[option]}
        <span
          class='action'
          on:click={() => executeAction(Object.keys(userOptions)[index])}
        >
          {Object.keys(userOptions)[index]}
        </span>
        <span class='divider'>—</span>
      {/if}
    {/each}
    <Clock />
  </div>
{/if}