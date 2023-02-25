<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import { eth_address_shortener } from '../lib/utils';
  import Display from '../lib/components/Display.svelte';
  import Rules from '../lib/components/Rules.svelte';
  import content from '../lib/constants/content.json';

  // 1. Get the data from the page
  export let data: PageData;
  $: ({ cookies } = data);
  // 2. Create the state variables
  let visible = false;
  let cookie_owners: string[] = [];

  // NFT transition effect triggers. Also shortens the owner's eth addresses.
  onMount(async () => {
    let i = 0;
    // Loop through all cookies in the contract
    for (const cookie in cookies) {
      // Get the owner of the cookie
      cookie_owners[i] = eth_address_shortener(cookies[cookie].owner);
      i++;
    }
    visible = true;
  });
</script>

<Rules {content} />
<Display {cookies} {cookie_owners} {visible} />
