<template>
  <div id="app" class="bg-brand">
    <header
      class="header flex justify-between items-center min-h-50 p-3 top-0 z-10 lg:sticky lg:w-full"
    >
      <div class="header__left flex items-center">
        <Logo v-if="showLogo" />
      </div>

      <div class="header__right flex items-center">
        <ToggleTheme />
      </div>
    </header>

    <main class="main m-0 m-auto px-15 p-0">
      <slot />
    </main>

    <footer
      class="footer flex items-center justify-center p-2 text-center text-sm transition duration-500 text-title-color"
    >
      <span class="footer__copyright"
        >Copyright © {{ new Date().getFullYear() }}.
      </span>
      <span class="footer__links m-1"
        >Powered by <a class="brand" href="//gridsome.org"> Gridsome </a></span
      >
    </footer>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue';
import ToggleTheme from '~/components/ToggleTheme.vue';

export default {
  props: {
    showLogo: { default: true }
  },
  components: {
    Logo,
    ToggleTheme
  }
};
</script>
