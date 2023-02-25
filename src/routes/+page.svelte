<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import { eth_address_shortener } from '../lib/utils';
  import Display from '../lib/components/Display.svelte';
  import Rules from '../lib/components/Rules.svelte';
  import content from '../lib/constants/content.json';
  import { browser } from '$app/environment';
  // fetches data from server and destructures it
  // onMount: NFT transition effect triggers. Also shortens the owner's eth addresses.
  export let data: PageData;
  $: ({ cookies } = data);
  let visible = false;
  let cookie_owners: string[] = [];

  onMount(async () => {
    let i = 0;
    for (const cookie in cookies) {
      cookie_owners[i] = eth_address_shortener(cookies[cookie].owner);
      i++;
    }
    visible = true;
  });
</script>

{#if !browser}
  <div class="loading"><Rules {content} /></div>
{:else}
  <div class="dapp_container">
    <Rules {content} />
    <Display {cookies} {cookie_owners} {visible} />
  </div>
{/if}

