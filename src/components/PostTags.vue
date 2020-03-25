<template>
  <div class="post-tags m-4">
    <g-link
      class="post-tags__link mr-3 text-sm text-link-color no-underline transition duration-700 bg-brand p-2 rounded"
      v-for="tag in post.tags"
      :key="tag.id"
      :to="tag.path"
    >
      <span>#</span> {{ tag.title }}
    </g-link>
  </div>
</template>

<script>
export default {
  props: ['post']
};
</script>
