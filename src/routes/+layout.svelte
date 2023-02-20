<script lang="ts">
  import '../app.css';
  import { contract } from '../constants';
  import cookies from './cookie_data.json';
  import { fly } from 'svelte/transition';

  export const optimistic = true;

  // loads cookie titles and instruction data from json file
  const cookie_titles = Object.keys(cookies.cookies);
  const cookie_data = Object.values(cookies.cookies);
</script>

<div class="dapp_container">
  <div class="rules" transition:fly={{ y: -200, duration: 2000 }}>
    <p class="cookie_title">Hazard's Cookies 🍪</p>
    {#each cookie_titles as cookie, i}
      <p>
        <span class="cookie_titles">{cookie}</span>: {cookie_data[i]}
      </p>
    {/each}

    <p>
      <a href="https://evm-sidechain.xrpl.org/address/{contract}">{contract}</a>
    </p>
  </div>

  <slot class="cookie_cards" />
</div>

<style>
  a {
    color: white;
    text-decoration: none;
    transition: 0.5s;
    font-size: 0.9rem;
  }
  a:hover {
    color: #c1c1c1;
    text-decoration: none;
  }
  .cookie_title {
    font-size: 2.5rem;
    font-weight: 700;
  }
  .rules {
    border-radius: 10px;
    margin: 10px;
  }
  .cookie_titles {
    margin: 0;
    padding: 0;
    font-size: 1.2rem;
    font-weight: 700;
  }
  .dapp_container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }
  .cookie_cards {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }
  /* mobile friendly */
  @media only screen and (min-width: 900px) {
    .dapp_container {
      flex-direction: row;
    }
    .cookie_cards {
      flex-direction: row;
      flex-direction: column;
    }
    .rules {
      width: 100%;
    }
  }
  @media only screen and (max-width: 600px) {
    .cookie_title {
      font-size: 1.7rem;
    }
    a {
      font-size: 0.8rem;
    }
  }
</style>
