<script lang="ts">
  import Nft from './Nft.svelte';
  export let cookies: any;
  export let cookie_owners: string[];
  export let visible: boolean;
</script>

<div class="cookie_card_holder">
  {#if visible}
    {#each Object.keys(cookies) as cookie, i}
      <Nft {cookies} {cookie} {cookie_owners} {i} />
    {/each}
  {/if}
</div>

<style>
  .cookie_card_holder {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }
  @media only screen and (min-width: 600px) {
    .cookie_card_holder {
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      justify-content: center;
      padding-top: 5%;
    }
  }
  @media only screen and (max-width: 600px) {
    .cookie_card_holder {
      flex-direction: column;
      flex-wrap: wrap;
      width: 100%;
      justify-content: center;
      flex-direction: column;
    }
  }
</style>
