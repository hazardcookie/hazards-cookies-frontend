<script lang="ts">
  import { fly } from 'svelte/transition';
  export let cookies: any;
  export let cookie: string;
  export let cookie_owners: string[];
  export let i: number;
</script>

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
  @media only screen and (min-width: 600px) {
    .cookie_display {
      width: 120px;
      height: 150px;
    }
  }
  /* mobile friendly for screens under 500px */
  @media only screen and (max-width: 600px) {
    .cookie_display {
      width: 120px;
      height: 150px;
      margin: auto;
      margin-bottom: 10px;
    }
  }
</style>
