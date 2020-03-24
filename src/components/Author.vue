<template>
  <div
    class="author my-0 mx-auto max-w-sm text-center py-6 px-0 text-title-color"
  >
    <g-image
      alt="Author image"
      class="author__image rounded-full w-90px h-90x mb-4"
      src="~/assets/images/author.jpg"
      width="180"
      height="180"
      blur="5"
    />

    <h1 v-if="showTitle" class="author__site-title text-2xl">
      {{ $static.metadata.siteName }}
    </h1>

    <p class="author__intro opacity-75">
      Welcome! I'm a Computational Biologist with a passion for Data.
    </p>

    <p class="author__links mt-2">
      <a class="m-2" href="//github.com/emiller88">GitHub</a>
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
