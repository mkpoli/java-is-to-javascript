<script lang="ts">
  // The author's portrait, what a tip pays for, three steps ending at the tip buttons (Ko-fi and
  // OFUSE, OFUSE first in Japanese), a company line and the supporters roll. The contents and the
  // roll's script load when the dialog first opens, so a page view asks the supporters service for
  // nothing.
  import * as m from '$lib/paraglide/messages';
  import { languageTag } from '$lib/paraglide/runtime';

  let { open = $bindable(false) }: { open: boolean } = $props();

  let dialog = $state<HTMLDialogElement | null>(null);
  let rollLoaded = false;
  let pressedOutside = false;

  const app = $derived(m.title());
  const ofuseFirst = $derived(languageTag() === 'ja');

  $effect(() => {
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (open && !rollLoaded) {
      rollLoaded = true;
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://supporters.mkpo.li/roll.js';
      document.head.append(script);
    }
  });

  // A drag that leaves the box, or the box's own scrollbar, also targets the dialog, so the test is by position.
  function outside(event: MouseEvent) {
    const box = dialog!.getBoundingClientRect();
    return (
      event.clientX < box.left ||
      event.clientX > box.right ||
      event.clientY < box.top ||
      event.clientY > box.bottom
    );
  }
</script>

{#snippet arrow()}
  <svg class="arrow" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"
    ><path
      d="M4 10h12M11 5l5 5-5 5"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      stroke-linejoin="round"
    /></svg
  >
{/snippet}

{#snippet kofi()}
  <a class="tip kofi" href="https://ko-fi.com/mkpoli" target="_blank" rel="noreferrer">
    <img class="mark" src="/brand/kofi-symbol.svg" alt="" width="34" height="27" />
    <span class="copy"><strong>Ko-fi</strong><small>{m.sponsorKofi()}</small></span>
    {@render arrow()}
  </a>
{/snippet}

{#snippet ofuse()}
  <a class="tip ofuse" href="https://ofuse.me/mkpoli" target="_blank" rel="noreferrer">
    <img class="mark" src="/brand/ofuse-icon.svg" alt="" width="26" height="28" />
    <span class="copy"><strong>OFUSE</strong><small>{m.sponsorOfuse()}</small></span>
    {@render arrow()}
  </a>
{/snippet}

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
  class="sponsor-dialog"
  bind:this={dialog}
  aria-labelledby="sponsor-title"
  onclose={() => {
    open = false;
  }}
  onpointerdown={(event) => {
    pressedOutside = outside(event);
  }}
  onclick={(event) => {
    if (pressedOutside && event.target === dialog && outside(event)) open = false;
    pressedOutside = false;
  }}
>
  {#if open}
    <header>
      <h2 id="sponsor-title">{m.sponsorLabel()}</h2>
      <button
        class="close"
        type="button"
        aria-label={m.sponsorClose()}
        onclick={() => {
          open = false;
        }}
      >
        <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"
          ><path d="M5 5l10 10M15 5L5 15" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" /></svg
        >
      </button>
    </header>
    <div class="sheet">
      <div class="hero" aria-hidden="true">
        <span class="portrait">
          <img src="/sponsor-portrait.webp" alt="" width="112" height="112" decoding="async" />
          <svg class="heart" viewBox="0 0 24 24">
            <path d="M12 21s-8.5-5.1-8.5-11.3A4.7 4.7 0 0 1 12 6.9a4.7 4.7 0 0 1 8.5 2.8C20.5 15.9 12 21 12 21Z" />
            <ellipse class="shine" cx="7.6" cy="9.6" rx="1.5" ry="2.1" transform="rotate(-30 7.6 9.6)" />
          </svg>
        </span>
        <span class="spark s1">✦</span><span class="spark s2">✦</span><span class="spark s3">✦</span>
      </div>
      <p class="lead">{m.sponsorLead({ app })}</p>
      <p class="ask">{m.sponsorAsk({ app })}</p>
      <section class="how">
        <h3>{m.sponsorHowTo()}</h3>
        <ol class="steps" role="list">
          <li>{m.sponsorStep1()}</li>
          <li>{m.sponsorStep2()}</li>
          <li>{m.sponsorStep3()}</li>
        </ol>
      </section>
      <div class="tips">
        {#if ofuseFirst}{@render ofuse()}{@render kofi()}{:else}{@render kofi()}{@render ofuse()}{/if}
      </div>
      <a class="company" href="mailto:mkpoli@mkpo.li?subject=Sponsorship%20on%20js.mkpo.li">
        <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"
          ><path d="M3 5h14v10H3zM3 6l7 5 7-5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" /></svg
        >
        <span class="copy"><strong>{m.sponsorCompany()}</strong><small>{m.sponsorCompanyHint()}</small></span>
      </a>
      <supporters-roll label={m.sponsorSupporters()} anonymous={m.sponsorAnonymous()}></supporters-roll>
      <p class="thanks">{m.sponsorThanks({ app })}</p>
    </div>
  {/if}
</dialog>

<style>
  .sponsor-dialog {
    --ink: #1f2937;
    --muted: #6b7280;
    --line: #fed7aa;
    --sp-ink: #c2185b;
    --sp-heart: #ff4f88;
    --sp-soft: #fff1f5;
    --sp-line: #ffd0de;
    inline-size: min(480px, calc(100vw - 32px));
    max-block-size: min(86dvh, 760px);
    margin: auto;
    padding: 0;
    overflow: auto;
    overscroll-behavior: contain;
    border: 1px solid var(--line);
    border-radius: 16px;
    background: #fefce8;
    color: var(--ink);
  }
  .sponsor-dialog::backdrop {
    background: rgb(0 0 0 / 0.45);
  }
  header {
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 16px 10px 20px;
    background: #fefce8;
    border-bottom: 1px solid var(--line);
  }
  h2 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 700;
  }
  .close {
    display: grid;
    place-items: center;
    inline-size: 32px;
    block-size: 32px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: var(--muted);
    cursor: pointer;
  }
  .close:hover {
    background: rgb(0 0 0 / 0.06);
    color: var(--ink);
  }
  .close:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }
  .sheet {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 16px 20px 20px;
  }
  .hero {
    position: relative;
    display: grid;
    place-items: center;
    block-size: 136px;
    border-radius: 16px;
    background: radial-gradient(closest-side, #ffd9e5, transparent);
  }
  .portrait {
    position: relative;
    inline-size: 112px;
    block-size: 112px;
  }
  .portrait img {
    display: block;
    inline-size: 100%;
    block-size: 100%;
    border-radius: 50%;
    object-fit: cover;
    box-shadow:
      0 0 0 4px #fefce8,
      0 0 0 6px var(--sp-line),
      0 10px 24px rgb(255 79 136 / 0.3);
  }
  .heart {
    position: absolute;
    right: -2px;
    bottom: 2px;
    inline-size: 34px;
    block-size: 34px;
    fill: var(--sp-heart);
    stroke: #fefce8;
    stroke-width: 2;
    paint-order: stroke;
    overflow: visible;
    transform-origin: 50% 60%;
    animation: beat 2.8s ease-in-out infinite;
    filter: drop-shadow(0 3px 6px rgb(255 79 136 / 0.35));
  }
  .heart .shine {
    fill: #fff;
    opacity: 0.6;
  }
  .spark {
    position: absolute;
    color: var(--sp-heart);
    opacity: 0.75;
    animation: twinkle 2.4s ease-in-out infinite;
  }
  .s1 {
    top: 22px;
    left: calc(50% - 84px);
    font-size: 14px;
  }
  .s2 {
    top: 12px;
    left: calc(50% + 66px);
    font-size: 10px;
    animation-delay: 0.8s;
  }
  .s3 {
    bottom: 20px;
    left: calc(50% - 76px);
    font-size: 11px;
    animation-delay: 1.6s;
  }
  @keyframes beat {
    0%, 70%, 100% { transform: scale(1); }
    78% { transform: scale(1.18); }
    86% { transform: scale(0.96); }
    93% { transform: scale(1.1); }
  }
  @keyframes twinkle {
    0%, 100% { opacity: 0.2; transform: scale(0.7); }
    50% { opacity: 0.9; transform: scale(1); }
  }
  .lead,
  .ask,
  .thanks {
    margin: 0;
    line-height: 1.65;
  }
  .ask {
    font-weight: 700;
    color: var(--sp-ink);
  }
  .lead:lang(ko),
  .ask:lang(ko),
  .steps:lang(ko),
  .company small:lang(ko),
  .thanks:lang(ko) {
    word-break: keep-all;
  }
  .how {
    padding: 12px 16px;
    border: 1px dashed var(--sp-line);
    border-radius: 16px;
    background: var(--sp-soft);
  }
  h3 {
    margin: 0 0 8px;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--sp-ink);
  }
  .steps {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin: 0;
    padding: 0;
    list-style: none;
    counter-reset: step;
  }
  .steps li {
    display: flex;
    align-items: baseline;
    gap: 8px;
    font-size: 0.875rem;
    line-height: 1.45;
    counter-increment: step;
  }
  .steps li::before {
    content: counter(step);
    display: grid;
    place-items: center;
    flex: none;
    inline-size: 20px;
    block-size: 20px;
    border-radius: 50%;
    background: var(--sp-ink);
    color: var(--sp-soft);
    font-size: 0.6875rem;
    font-weight: 700;
    line-height: 1;
    transform: translateY(-1px);
  }
  .tips {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .tip {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px 12px 12px;
    border-radius: 999px;
    color: #fff;
    text-decoration: none;
    box-shadow: 0 6px 16px var(--tip-glow);
    transition:
      transform 0.15s ease,
      box-shadow 0.15s ease;
  }
  .kofi {
    --tip-glow: rgb(32 32 32 / 0.28);
    --tip-glow-hover: rgb(32 32 32 / 0.38);
    background: #202020;
    border: 1px solid #202020;
  }
  /* OFUSE Blue (#2882a7) taken 4% darker, so the white labels reach 4.5:1. */
  .ofuse {
    --tip-glow: rgb(38 125 160 / 0.3);
    --tip-glow-hover: rgb(38 125 160 / 0.42);
    background: #267da0;
    border: 1px solid #267da0;
  }
  .tip:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 22px var(--tip-glow-hover);
  }
  .tip:active {
    transform: scale(0.98);
  }
  .tip:focus-visible,
  .company:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }
  .tip .mark {
    display: block;
    flex: none;
    inline-size: 38px;
    block-size: 30px;
    object-fit: contain;
  }
  .tip .arrow {
    flex: none;
  }
  .tip .copy strong {
    font-size: 1.125rem;
  }
  .tip .copy small {
    color: #fff;
  }
  .copy {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 1px;
    min-inline-size: 0;
  }
  .copy strong {
    font-weight: 700;
  }
  .copy small {
    font-size: 0.75rem;
    line-height: 1.4;
  }
  .company {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 12px;
    color: var(--muted);
    text-decoration: none;
  }
  .company:hover {
    background: rgb(0 0 0 / 0.05);
    color: var(--ink);
  }
  .company svg {
    flex: none;
    margin-top: 2px;
  }
  .company .copy strong {
    font-size: 0.875rem;
    color: var(--ink);
  }
  supporters-roll {
    --sp-text: var(--ink);
    --sp-muted: var(--muted);
  }
  .thanks {
    font-size: 0.875rem;
    color: var(--muted);
    text-align: center;
  }
  @media (max-width: 640px) {
    .sponsor-dialog {
      inset: auto 0 0;
      margin: 0;
      inline-size: 100%;
      max-inline-size: none;
      max-block-size: 85dvh;
      border-radius: 16px 16px 0 0;
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .heart,
    .spark,
    .tip {
      animation: none;
      transition: none;
    }
  }
</style>
