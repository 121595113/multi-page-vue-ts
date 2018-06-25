<template>
  <span class="tag">{{ tagName }}</span>
</template>

<script>
export default {
  props: {
    tagName: {
      required: false,
      default: 'world.',
    }
  }
}
</script>
