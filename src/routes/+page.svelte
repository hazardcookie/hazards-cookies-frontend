<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import type { PageData } from './$types';

  // shortens eth address
  function eth_address_shortener(address: string) {
    return address.slice(0, 7) + '...' + address.slice(-3);
  }

  // fetches data from server
  export let data: PageData;

  // destructures data
  $: ({ cookies } = data);

  // sets visible to false to hide cookies with transition
  let visible = false;

  // array to store shortened eth addresses
  let cookie_owners: string[] = [];

  // fetch cookies and shortens eth address
  // sets visible to true to show cookies with transition
  onMount(async () => {
    let i = 0;
    for (const cookie in cookies) {
      cookie_owners[i] = eth_address_shortener(cookies[cookie].owner);
      i++;
    }
    visible = true;
  });
</script>

<div class="cookie_card_holder">
  {#if visible}
    {#each Object.keys(cookies) as cookie, i}
      <div class="cookie_display" transition:fly={{ y: 200, duration: 2000, delay: i * 200 }}>
        <div class="cookie_data">
          <img src={cookies[cookie].metadata.image} alt={cookies[cookie].metadata.name} />
        </div>
        <div class="cookie_data">
          <h4>{cookies[cookie].metadata.name}</h4>
        </div>
        <div class="cookie_data">
          {cookie_owners[i]}
        </div>
      </div>
    {/each}
  {/if}
</div>

<style>
  .cookie_data {
    display: flex;
    justify-content: center;
  }
  .cookie_display {
    border: 3px outset #4cc9f0;
    border-radius: 20px;
    padding: 10px;
    margin: 10px;
  }

  .cookie_display:hover {
    border: 3px inset #4cc9f0;
  }
  .cookie_display h4 {
    margin: 0;
    padding: 0;
    font-size: 1.3rem;
  }
  .cookie_card_holder {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
  }
  @media only screen and (min-width: 600px) {
    .cookie_card_holder {
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      justify-content: center;
      padding-top: 5%;
    }
    .cookie_display {
      width: 120px;
      height: 150px;
    }
  }
  /* mobile friendly for screens under 500px */
  @media only screen and (max-width: 600px) {
    .cookie_card_holder {
      flex-direction: column;
      flex-wrap: wrap;
      width: 100%;
      justify-content: center;
    }
    .cookie_display {
      width: 120px;
      height: 150px;
      margin: auto;
      margin-bottom: 10px;
    }
  }
</style>
