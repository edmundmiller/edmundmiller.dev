<template>
  <div class="post-tags">
    <g-link
      class="post-tags__link"
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
