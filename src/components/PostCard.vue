<template>
  <div
    class="content-box max-w-screen-md my-0 mx-auto transition duration-700 bg-content-color p-12 rounded-md shadow-md"
  >
    <div
      class="post-card mb-6 relative transition duration-150 hover:-translate-y-4"
      :class="{ 'post-card--has-poster': post.poster }"
    >
      <!-- TODO empty display none -->
      <div
        class="post-card__header -mx-12 -mt-12 mb-6 overflow-hidden rounded-t-md"
      >
        <g-image
          alt="Cover image"
          v-if="post.cover_image"
          class="post-card__image min-w-full"
          :src="post.cover_image"
        />
      </div>
      <div class="post-card__content">
        <h2 class="post-card__title mt-0" v-html="post.title" />
        <p class="post-card__description" v-html="post.description" />

        <PostMeta class="post-card__meta" :post="post" />
        <PostTags class="post-card__tags z-10 relative" :post="post" />

        <g-link
          class="post-card__link absolute top-0 left-0 w-full h-full opacity-0 overflow-hidden z-0"
          :to="post.path"
          >Link</g-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import PostMeta from '~/components/PostMeta';
import PostTags from '~/components/PostTags';

export default {
  components: {
    PostMeta,
    PostTags
  },
  props: ['post']
};
</script>
