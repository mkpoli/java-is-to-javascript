<script lang="ts">
  import { availableLanguageTags, languageTag } from '$lib/paraglide/runtime';
  import type { AvailableLanguageTag } from '$lib/paraglide/runtime';
  import { i18n } from '$lib/i18n';
  import { page } from '$app/stores';
  const languageNames = new Intl.DisplayNames(languageTag() ?? 'en', { type: 'language' });
  import { goto } from '$app/navigation';

  function switchToLanguage(newLanguage: AvailableLanguageTag) {
    const canonicalPath = i18n.route($page.url.pathname);
    const localisedPath = i18n.resolveRoute(canonicalPath, newLanguage);
    goto(localisedPath);
  }
</script>

<div class="flex gap-2 justify-center">
  {#each availableLanguageTags as lang}
    <button class="text-blue-500 hover:underline" onclick={() => switchToLanguage(lang)}>
      {languageNames.of(lang)}
    </button>
  {/each}
</div>
