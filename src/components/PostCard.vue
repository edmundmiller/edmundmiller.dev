<template>
  <div
    class="max-w-4xl px-10 py-6 bg-background rounded-lg shadow-md transition duration-500 transform hover:-translate-y-4 transition duration-500 hover:shadow-xl"
  >
    <div class="mt-2">
      <h2
        class="text-2xl text-gray-700 font-bold hover:text-gray-600"
        v-html="post.title"
      />
      <p class="mt-2 text-gray-600" v-html="post.description" />
    </div>
    <div class="flex justify-between items-center">
      <span class="font-light text-gray-600">
        <PostMeta class="post-card__meta" :post="post" />
      </span>
    </div>
    <div class="flex justify-between items-center mt-4">
      <PostTags class="post-card__tags" :post="post" />
    </div>
    <g-link class="post-card__link" :to="post.path">Link</g-link>
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
