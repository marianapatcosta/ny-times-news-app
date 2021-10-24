<template>
  <div class="pagination" data-cy="pagination">
    <button
      id="button-to-first-page"
      class="pagination__button"
      :aria-label="`Click to select first page`"
      :disabled="selectedPage === 0"
      @click="handlePaginationUpdate(0)"
      @keydown.enter="handlePaginationUpdate(0)"
    >
      &lt; &lt;
    </button>
    <button
      id="button-to-previous-page"
      class="pagination__button"
      :aria-label="`Click to select the previous page`"
      :disabled="selectedPage === 0"
      @click="handlePaginationUpdate(selectedPage - 1)"
      @keydown.enter="handlePaginationUpdate(selectedPage - 1)"
    >
      &lt;
    </button>
    <button
      v-for="number in paginationNumbers"
      class="pagination__button"
      :class="{
        'pagination__button--active': number === selectedPage,
      }"
      :key="`button-${number}`"
      :aria-label="`Click to select page ${number + 1}`"
      @click="handlePaginationUpdate(number)"
      @keydown.enter="handlePaginationUpdate(number)"
    >
      {{ number + 1 }}
    </button>
    <button
      id="button-to-next-page"
      class="pagination__button"
      :aria-label="`Click to select the next page`"
      :disabled="selectedPage === pageCount"
      @click="handlePaginationUpdate(selectedPage + 1)"
      @keydown.enter="handlePaginationUpdate(selectedPage + 1)"
    >
      &gt;
    </button>
    <button
      id="button-to-last-page"
      class="pagination__button"
      :aria-label="`Click to select last page`"
      :disabled="selectedPage === pageCount"
      @click="handlePaginationUpdate(pageCount)"
      @keydown.enter="handlePaginationUpdate(pageCount)"
    >
      &gt;&gt;
    </button>
  </div>
</template>

<script src="./Pagination.js"></script>

<style scoped lang="scss" src="./Pagination.scss"></style>
