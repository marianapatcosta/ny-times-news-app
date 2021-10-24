<template>
  <div class="image__wrapper">
    <div class="image__placeholder" v-if="!isLoaded" />
    <img
      v-show="isLoaded"
      class="image"
      :src="src"
      :alt="alt"
      loading="lazy"
      @load="handleLoad"
    />
  </div>
</template>

<script src="./Image.js"></script>

<style scoped lang="scss" src="./Image.scss"></style>
