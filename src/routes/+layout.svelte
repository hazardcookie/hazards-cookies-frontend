<script lang="ts">
  import '../app.css';
  import Rules from '../lib/components/Rules.svelte';
</script>

<div class="dapp_container">
  <Rules />

  <slot />
</div>

<style>
  .dapp_container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }
  @media only screen and (min-width: 900px) {
    .dapp_container {
      flex-direction: row;
    }
  }
</style>
