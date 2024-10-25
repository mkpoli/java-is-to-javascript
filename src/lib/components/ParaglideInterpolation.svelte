<script lang="ts">
  import { type Snippet } from 'svelte';

  type Props = {
    text: string;
    [key: string]: Snippet<[]> | string;
  } & unknown;

  let { text, ...rest }: Props = $props();

  let parts: ({
    type: 'text';
    value: string;
  } | {
    type: 'snippet';
    value: Snippet<[]>;
  })[] = text.split(/(\$\$.*?\$\$)/).map((part) => {
    if (part.startsWith('$$') && part.endsWith('$$')) {
      if (!(part.slice(2, -2) in rest)) {
        throw new Error(`Snippet ${part.slice(2, -2)} not found`);
      }
      return { type: 'snippet', value: rest[part.slice(2, -2) as keyof typeof rest] as Snippet<[]> };
    }
    return { type: 'text', value: part };
  });
</script>

{#each parts as part}
  {#if part.type === 'text'}
    <span>{part.value}</span>
  {:else if part.type === 'snippet'}
    <span>{@render part.value()}</span>
  {/if}
{/each}
