<template>
  <input
    class="search"
    type="search"
    v-model="keyword"
    placeholder="Search by..."
    aria-label="Search New York time News"
    @search="handleOnEnter"
    @keydown.enter="handleOnEnter"
  />
</template>

<script src="./Search.js"></script>

<style scoped lang="scss" src="./Search.scss"></style>
