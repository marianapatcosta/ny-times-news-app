<template>
  <div class="filter" v-if="options">
    <button
      class="filter__button"
      aria-label="Click to check filter options"
      @click="toggleShowOptions()"
      @keydown.enter="toggleShowOptions()"
    >
      {{ selectedOption || "Filter by" }}
    </button>
    <ul class="filter__content" v-show="showOptions">
      <li class="filter__search">
        <input
          :disabled="disabled"
          :placeholder="placeholder || 'Search...'"
          :aria-label="placeholder || 'Search...'"
          v-model="searchKeyword"
        />
      </li>
      <li
        class="filter__option"
        :class="{ 'filter__option--active': option === selectedOption }"
        v-for="option in filteredOptions"
        :key="`option-${option}`"
        role="button"
        tabIndex="0"
        :aria-label="`Click to filter ${option}`"
        @click="handleOptionSelection(option)"
        @keydown.enter="handleOptionSelection(option)"
      >
        {{ option || "-" }}
      </li>
    </ul>
  </div>
</template>

<script src="./Filter.js"></script>

<style scoped lang="scss" src="./Filter.scss"></style>
