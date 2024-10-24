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

<main class="max-w-screen-md mx-auto text-center">
  <h1 class="text-2xl font-bold my-4">Java is to JavaScript as X is to Y...</h1>

  <a class="text-blue-500 hover:underline" href="http://javascriptisnotjava.com/">JavaScript is not Java.</a>

  <p class="my-4 max-w-md mx-auto">
    This is a list of things that are just like the different between Java and JavaScript in world's languages.
  </p>

  {#each DATA as item}
    <section class="my-4">
      <h2 class="text-xl font-bold">{item.language}</h2>
      <ul>
        {#each item.items as i}
          <li class="list-item">{i.java} 🆚 {i.javascript}</li>
        {/each}
      </ul>
    </section>
  {/each}
</main>
