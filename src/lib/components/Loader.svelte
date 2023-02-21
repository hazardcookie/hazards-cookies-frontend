<script lang="ts">
  import { onMount } from 'svelte';

  let loader: any;
  let Component: any;

  onMount(async () => {
    Component = (await loader()).default;
  });

  export { loader as this };
</script>

<svelte:component this={Component} {...$$restProps}>
  <slot />
</svelte:component>

{#if !Component}
  <slot name="fallback" />
{/if}
