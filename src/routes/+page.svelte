<script lang="ts">
  import DATA_EN from '../../data/en.json';
  import DATA_ZH from '../../data/zh.json';
  import DATA_JA from '../../data/ja.json';
  import DATA_FR from '../../data/fr.json';

  import GitHub from '~icons/simple-icons/github';

  const AVAILABLE_LANGUAGES = ['en', 'zh', 'ja', 'fr'];

  const LANGUAGES: Record<string, string> = Object.fromEntries(
    AVAILABLE_LANGUAGES.map((lang) =>
    [lang, 
    lang === languageTag() ? getAutonym(lang) : `${getXenonymInCurrentLocale(lang)} (${getAutonym(lang)})`])
  );

  const DATA = [DATA_EN, DATA_ZH, DATA_JA, DATA_FR];

  import * as m from '$lib/paraglide/messages';
  import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
  import { languageTag } from '$lib/paraglide/runtime';
  import ParaglideInterpolation from '$lib/components/ParaglideInterpolation.svelte';
  import { getAutonym, getXenonymInCurrentLocale } from '$lib/language';

  const entries = DATA.toSorted((a, b) => {
    if (languageTag() === a.language) return -1;
    if (languageTag() === b.language) return 1;
    return 0;
  });
</script>

<svelte:head>
  <title>{m.title()}</title>
  <meta name="description" content={m.description()} />
  <meta name="author" content="mkpoli" />
  <meta name="robots" content="index, follow" />

  <meta name="og:title" content={m.title()} />
  <meta
    name="og:description"
    content="This is a list of things that are just like the different between Java and JavaScript in world's languages."
  />
  <meta name="og:author" content="mkpoli" />
  <meta name="og:url" content="https://js.mkpo.li" />
  <meta name="og:image" content="https://js.mkpo.li/screenshot.png" />
  <meta name="og:type" content="website" />
  <meta name="og:site_name" content={m.title()} />
  <meta name="og:locale" content="en_US" />
  <meta name="og:image:alt" content={m.title()} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:creator" content="@mkpoli" />
  <meta name="twitter:title" content={m.title()} />
  <meta name="twitter:description" content={m.description()} />
  <meta name="twitter:image" content="https://js.mkpo.li/screenshot.png" />
</svelte:head>

<header class="flex justify-center my-4">
  <LanguageSwitcher />
</header>

<main class="max-w-screen-md mx-auto text-center">
  <h1 class="text-2xl font-bold my-4 text-red-500">{m.title()}</h1>

  <a class="text-blue-500 hover:underline" href="http://javascriptisnotjava.com/">
    {m.jsIsNotJava()}
  </a>

  <p class="my-4 max-w-md mx-auto">
    {m.description()}
  </p>

  {#each entries as item}
    <section class="my-4">
      <h2 class="text-xl font-bold capitalize">{LANGUAGES[item.language]}</h2>
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

  <h2 class="text-xl font-bold my-4">{m.addNewEntry()}</h2>
  <p class="my-4 max-w-md mx-auto">
    <ParaglideInterpolation text={m.addNewEntryDescription() }>
      {#snippet link()}
        <a
          class="text-blue-500 hover:underline"
          href="https://github.com/mkpoli/java-is-to-javascript/blob/main/CONTRIBUTING.md"
          target="_blank">{m.addNewEntryDescriptionLinkLabel()}</a
        >
      {/snippet}
    </ParaglideInterpolation>
  </p>
</main>
<hr class="border-orange-300" />
<footer class="text-center my-4">
  <p>
    <ParaglideInterpolation text={m.licenseOfData()}>
      {#snippet license()}
        <a
          class="text-blue-500 hover:underline"
          href="https://creativecommons.org/publicdomain/zero/1.0/legalcode"
          target="_blank">{m.licenseOfDataLinkLabel()}</a
        > (CC0-1.0)
      {/snippet}
    </ParaglideInterpolation>
  </p>
  <p>
    <ParaglideInterpolation text={m.licenseOfCode()}>
      {#snippet license()}
        <a
          class="text-blue-500 hover:underline"
          href="https://opensource.org/license/0bsd"
          target="_blank">{m.licenseOfCodeLinkLabel()}</a
        > (0BSD)
      {/snippet}
    </ParaglideInterpolation>
  </p>
  <p>
    Copyright &copy; 2024 <a class="text-blue-500 hover:underline" href="https://mkpo.li/" target="_blank">mkpoli</a>.
  </p>
  <hr class="my-4 border-orange-300" />
  <p class="py-2">
    <a
      class="text-blue-500 hover:underline flex gap-2 items-center justify-center"
      href="https://github.com/mkpoli/java-is-to-javascript"
      target="_blank"
    >
      <span> Source Code at GitHub </span>
      <GitHub />
    </a>
  </p>
</footer>
