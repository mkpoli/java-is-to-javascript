<script lang="ts">
  let DATA = [
    {
      language: 'English',
      items: [
        {
          java: 'Ham',
          javascript: 'Hamster',
        },
      ],
    },
    {
      language: 'Chinese',
      items: [
        {
          java: '雷锋',
          javascript: '雷峰塔',
        },
      ],
    },
    {
      language: 'Japanese',
      items: [
        {
          java: 'インド',
          javascript: 'インドネシア',
        },
      ],
    },
  ] as const;
</script>

<h1>Java is to JavaScript as X is to Y...</h1>

<a href="http://javascriptisnotjava.com/">JavaScript is not Java.</a>

<p>This is a list of things that are just like the different between Java and JavaScript in world's languages.</p>

{#each DATA as item}
  <h2>{item.language}</h2>
  <ul>
    {#each item.items as i}
      <li>{i.java} 🆚 {i.javascript}</li>
    {/each}
  </ul>
{/each}
