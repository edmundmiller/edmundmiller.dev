<template>
  <div id="app">
    <header class="header">
      <div class="header__left">
        <Logo v-if="showLogo" />
      </div>

      <div class="header__right">
        <ToggleTheme />
      </div>
    </header>

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <span class="footer__copyright"
        >Copyright © {{ new Date().getFullYear() }}.
      </span>
      <span class="footer__links"
        >Powered by <a href="//gridsome.org"> Gridsome </a></span
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
