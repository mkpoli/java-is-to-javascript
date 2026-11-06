<script lang="ts">
  import DATA_EN from '../../data/en.json';
  import DATA_ZH from '../../data/zh.json';
  import DATA_JA from '../../data/ja.json';
  import DATA_FR from '../../data/fr.json';
  import DATA_KO from '../../data/ko.json';

  import GitHub from '~icons/simple-icons/github';

  const DATA = [DATA_EN, DATA_ZH, DATA_JA, DATA_FR, DATA_KO];

  import * as m from '$lib/paraglide/messages';
  import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
  import { languageTag } from '$lib/paraglide/runtime';
  import ParaglideInterpolation from '$lib/components/ParaglideInterpolation.svelte';
  import { getAutonym, getXenonymInCurrentLocale } from '$lib/language';
  import GitHubMark from '$lib/components/GitHubMark.svelte';
  import SponsorDialog from '$lib/components/SponsorDialog.svelte';

  let sponsorOpen = $state(false);

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

<GitHubMark />

<header class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 my-4 px-4">
  <LanguageSwitcher />
  <button
    type="button"
    class="sponsor"
    aria-haspopup="dialog"
    aria-expanded={sponsorOpen}
    onclick={() => {
      sponsorOpen = true;
    }}
  >
    <span class="sponsor-face" aria-hidden="true">
      <img src="/sponsor-face.webp" alt="" width="24" height="24" decoding="async" />
      <svg class="sponsor-heart" viewBox="0 0 24 24"
        ><path d="M12 21s-8.5-5.1-8.5-11.3A4.7 4.7 0 0 1 12 6.9a4.7 4.7 0 0 1 8.5 2.8C20.5 15.9 12 21 12 21Z" /></svg
      >
    </span>
    <span>{m.sponsorLabel()}</span>
  </button>
</header>

<SponsorDialog bind:open={sponsorOpen} />

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
      <h2 class="text-xl font-bold capitalize">
        <span>
          {#if item.language === languageTag()}
            {getAutonym(item.language)}
          {:else}
            {getXenonymInCurrentLocale(item.language)} (<span lang={item.language}>{getAutonym(item.language)}</span>)
          {/if}
        </span>
      </h2>
      <ul class="grid grid-cols-[1fr_auto_1fr] gap-x-2">
        {#each item.items as i}
          <li class="contents">
            <a
              class="text-right hover:underline"
              href={`https://${item.language}.wikipedia.org/wiki/${i.java}`}
              target="_blank"
              lang={item.language}
              hreflang={item.language}  
            >{i.java}</a
            >
            <span>🆚</span>
            <a
              class="text-left hover:underline"
              href={`https://${item.language}.wikipedia.org/wiki/${i.javascript}`}
              target="_blank"
              lang={item.language}
              hreflang={item.language}
            >{i.javascript}</a
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
      <span> {m.sourceCodeAtGitHub()} </span>
      <GitHub />
    </a>
  </p>
  <LanguageSwitcher />
</footer>

<style>
  /* A soft pink pill led by the author's face, with a small heart on it that beats. */
  .sponsor {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    flex: none;
    block-size: 32px;
    padding: 0 12px 0 4px;
    border: 1px solid #ffd0de;
    border-radius: 999px;
    background: linear-gradient(120deg, #ffe6ef, #fff0e0);
    color: #c2185b;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    transition:
      transform 0.15s ease,
      box-shadow 0.15s ease;
  }
  .sponsor:hover,
  .sponsor:focus-visible {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgb(255 79 136 / 0.28);
  }
  .sponsor:active {
    transform: scale(0.97);
  }
  .sponsor:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }
  .sponsor-face {
    position: relative;
    flex: none;
    inline-size: 24px;
    block-size: 24px;
  }
  .sponsor-face img {
    display: block;
    inline-size: 100%;
    block-size: 100%;
    border-radius: 50%;
    object-fit: cover;
    box-shadow:
      0 0 0 1.5px #fff,
      0 0 0 2.5px #ffd0de;
  }
  .sponsor-heart {
    position: absolute;
    right: -4px;
    bottom: -3px;
    inline-size: 12px;
    block-size: 12px;
    fill: #ff4f88;
    stroke: #fff;
    stroke-width: 2.5;
    paint-order: stroke;
    overflow: visible;
    transform-origin: 50% 60%;
    animation: sponsor-beat 2.8s ease-in-out infinite;
  }
  @keyframes sponsor-beat {
    0%, 70%, 100% { transform: scale(1); }
    78% { transform: scale(1.22); }
    86% { transform: scale(0.96); }
    93% { transform: scale(1.12); }
  }
  @media (prefers-reduced-motion: reduce) {
    .sponsor,
    .sponsor-heart {
      animation: none;
      transition: none;
    }
  }
</style>
