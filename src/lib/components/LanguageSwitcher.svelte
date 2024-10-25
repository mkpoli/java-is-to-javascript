<script lang="ts">
  import { availableLanguageTags, languageTag } from '$lib/paraglide/runtime';
  import type { AvailableLanguageTag } from '$lib/paraglide/runtime';
  import { i18n } from '$lib/i18n';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const languageAutonyms = new Map<AvailableLanguageTag, string>(
    availableLanguageTags.map((lang) => [lang, new Intl.DisplayNames(lang, { type: 'language' }).of(lang) ?? lang])
  );
  const languageNameInCurrentLocale = new Intl.DisplayNames(languageTag() ?? 'en', { type: 'language' });

  function switchToLanguage(newLanguage: AvailableLanguageTag) {
    const canonicalPath = i18n.route($page.url.pathname);
    const localisedPath = i18n.resolveRoute(canonicalPath, newLanguage);
    goto(localisedPath);
  }
</script>

<div class="flex gap-2 justify-center">
  {#each availableLanguageTags as lang}
    <button
      title={`${languageNameInCurrentLocale.of(lang)} (${lang})`}
      class="text-blue-500 hover:underline"
      onclick={() => switchToLanguage(lang)}
    >
      {languageAutonyms.get(lang)}
    </button>
  {/each}
</div>
