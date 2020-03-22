<template>
  <div class="author">
    <!-- <g-image alt="Author image" class="author__image" src="~/assets/images/author.jpg" width="180" height="180" blur="5" /> -->

    <h1 v-if="showTitle" class="author__site-title">
      {{ $static.metadata.siteName }}
    </h1>

    <p class="author__intro">
      Welcome! I'm a Computational Biologist with a passion for Data.
    </p>

    <p class="author__links">
      <a href="//github.com/emiller88">GitHub</a>
    </p>
  </div>
</template>

<static-query>
  query {
    metadata {
      siteName
    }
  }
</static-query>

<script>
export default {
  props: ['showTitle']
};
</script>
