<script lang="ts">
  import DATA from '../../data/data.json';

  const LANGUAGES: Record<string, string> = {
    en: 'English',
    zh: 'Chinese',
    ja: 'Japanese',
  };

  import * as m from '$lib/paraglide/messages';
  import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
  import { languageTag } from '$lib/paraglide/runtime';

  const entries = DATA.toSorted((a, b) => {
    if (languageTag() === a.language) return -1;
    if (languageTag() === b.language) return 1;
    return 0;
  });
</script>

<svelte:head>
  <title>{m.title()}</title>
  <meta
    name="description"
    content="This is a list of things that are just like the different between Java and JavaScript in world's languages."
  />
  <meta name="author" content="mkpoli" />
  <meta name="robots" content="index, follow" />

  <meta name="og:title" content="Java is to JavaScript as X is to Y" />
  <meta
    name="og:description"
    content="This is a list of things that are just like the different between Java and JavaScript in world's languages."
  />
  <meta name="og:author" content="mkpoli" />
  <meta name="og:url" content="https://js.mkpo.li" />
  <meta name="og:image" content="https://js.mkpo.li/screenshot.png" />
  <meta name="og:type" content="website" />
  <meta name="og:site_name" content="Java is to JavaScript as X is to Y" />
  <meta name="og:locale" content="en_US" />
  <meta name="og:image:alt" content="Java is to JavaScript as X is to Y" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:creator" content="@mkpoli" />
  <meta name="twitter:title" content="Java is to JavaScript as X is to Y" />
  <meta
    name="twitter:description"
    content="This is a list of things that are just like the different between Java and JavaScript in world's languages."
  />
  <meta name="twitter:image" content="https://js.mkpo.li/screenshot.png" />
</svelte:head>

<header class="flex justify-center my-4">
  <LanguageSwitcher />
</header>

<main class="max-w-screen-md mx-auto text-center">
  <h1 class="text-2xl font-bold my-4 text-red-500">{m.title()}</h1>

  <a class="text-blue-500 hover:underline" href="http://javascriptisnotjava.com/">JavaScript is not Java.</a>

  <p class="my-4 max-w-md mx-auto">
    This is a list of things that are just like the different between Java and JavaScript in world's languages.
  </p>

  {#each entries as item}
    <section class="my-4">
      <h2 class="text-xl font-bold">{LANGUAGES[item.language]}</h2>
      <ul class="grid grid-cols-[1fr_auto_1fr] gap-x-2">
        {#each item.items as i}
          <li class="contents">
            <a
              class="text-right hover:underline"
              href={`https://${item.language}.wikipedia.org/wiki/${i.java}`}
              target="_blank">{i.java}</a
            >
            <span>🆚</span>
            <a
              class="text-left hover:underline"
              href={`https://${item.language}.wikipedia.org/wiki/${i.javascript}`}
              target="_blank">{i.javascript}</a
            >
          </li>
        {/each}
      </ul>
    </section>
  {/each}

  <h2 class="text-xl font-bold my-4">Add new entry/language</h2>
  <p class="my-4 max-w-md mx-auto">
    If you know an entry that is not in the list, please help us to add it by <a
      class="text-blue-500 hover:underline"
      href="https://github.com/mkpoli/java-is-to-javascript/blob/main/CONTRIBUTING.md"
      target="_blank">contributing to the project</a
    >.
  </p>
</main>
<hr />
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
  <p>
    <a class="text-blue-500 hover:underline" href="https://github.com/mkpoli/java-is-to-javascript" target="_blank"
      >Source Code at GitHub</a
    >
  </p>
</footer>
