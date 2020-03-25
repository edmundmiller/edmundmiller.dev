<template>
  <div class="post-meta text-sm text-title-color opacity-75">
    Posted {{ post.date }}.
    <template v-if="post.timeToRead">
      <strong>{{ post.timeToRead }} min read.</strong>
    </template>
  </div>
</template>

<script>
export default {
  props: ['post']
};
</script>
