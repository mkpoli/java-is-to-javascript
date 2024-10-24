<script lang="ts">
  import DATA from '../data.json';
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
      <ul class="grid grid-cols-[1fr_auto_1fr] gap-x-2">
        {#each item.items as i}
          <li class="contents">
            <span class="text-right">{i.java}</span>
            <span>🆚</span>
            <span class="text-left">{i.javascript}</span>
          </li>
        {/each}
      </ul>
    </section>
  {/each}
</main>

<footer class="text-center my-4">
  <p>
    All data in this project is licensed under <a
      class="text-blue-500 hover:underline"
      href="https://creativecommons.org/publicdomain/zero/1.0/legalcode"
      target="_blank">CC0 1.0 Universal License</a
    >
    (CC0-1.0).
  </p>
  <p>
    The source code of the website is licensed under <a
      class="text-blue-500 hover:underline"
      href="https://opensource.org/license/0bsd"
      target="_blank">Zero-Clause BSD License</a
    >
    (0BSD).
  </p>
  <p>
    Copyright &copy; 2024 <a class="text-blue-500 hover:underline" href="https://mkpo.li/" target="_blank">mkpoli</a>.
  </p>
</footer>
