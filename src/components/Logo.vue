<template>
  <g-link class="logo" to="/">
    <span class="logo__text"> &larr; {{ $static.metadata.siteName }} </span>
  </g-link>
</template>

<static-query>
  query {
    metadata {
      siteName
    }
  }
</static-query>
