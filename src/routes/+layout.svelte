<script lang="ts">
  import '../app.css';
</script>

<div class="dapp_container">
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
