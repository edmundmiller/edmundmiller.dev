<template>
  <g-link class="logo no-underline bg-brand text-sm text-link-color" to="/">
    <span class="logo__text align-middle rounded-lg h-40px w-40px mr-2">
      &larr; {{ $static.metadata.siteName }}
    </span>
  </g-link>
</template>

<static-query>
  query {
    metadata {
      siteName
    }
  }
</static-query>
