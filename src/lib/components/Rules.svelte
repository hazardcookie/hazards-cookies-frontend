<script lang="ts">
  import '../../app.css';
  import { fly } from 'svelte/transition';
  import { contract } from '../constants';
  export let content: any;
  export const ssr = true;
  const cookie_titles = Object.keys(content.cookies);
  const cookie_data = Object.values(content.cookies);
</script>

<div class="rules" transition:fly={{ y: -200, duration: 2000 }}>
  <p class="header_title">{content.name}</p>
  <p>
    Need funds? Visit the <a href="https://bridge.devnet.xrpl.org/">Faucet</a> for devnet
    XRP.
  </p>
  {#each cookie_titles as cookie, i}
    <p>
      <span class="cookie_titles">{cookie}</span>: {cookie_data[i]}
    </p>
  {/each}
  <p>
    <a href="https://evm-sidechain.xrpl.org/address/{contract}">{contract}</a>
  </p>
</div>

<style>
  a {
    color: #2bd2ef;
    text-decoration: none;
    transition: 0.5s;
    font-size: 0.9rem;
  }
  a:hover {
    color: #f578ba;
    text-decoration: none;
  }
  .header_title {
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
    font-size: 1.1rem;
    font-weight: 700;
  }
  @media only screen and (min-width: 900px) {
    .rules {
      width: 100%;
    }
  }
  @media only screen and (max-width: 600px) {
    .header_title {
      font-size: 1.7rem;
    }
    a {
      font-size: 0.8rem;
    }
  }
</style>
