<template>
  <div class="news-list" data-cy="news-list">
    <div class="news-list__toolbar">
      <Search @search="handleSearch" />
      <Filter
        data-cy="filter"
        :options="SECTION_NAMES"
        placeholder="Search section..."
        @select-option="handleFilterOptionSelection"
      />
    </div>

    <ul class="news-list__list" v-if="isLoading">
      <news-placeholder
        v-for="(news, index) in numberOfPlaceholder"
        :key="`news-placeholder-${index}`"
      />
    </ul>
    <p v-else-if="!newsList.length" class="news-list__list-no-news">
      There is no news to display!
    </p>
    <ul class="news-list__list" v-else>
      <News v-for="news in newsList" :key="news.id" :newsInfo="news" />
    </ul>
    <div class="news-list__pagination">
      <Pagination
        v-if="newsList.length"
        :pageCount="pageCount"
        @update-pagination="handlePaginationUpdate"
      />
    </div>

    <Modal
      data-cy="modal"
      v-if="errorMessage"
      header="An error occurred!"
      :message="errorMessage"
      @close="handleClearError"
    />
  </div>
</template>

<script src="./NewsList.js"></script>
<style scoped lang="scss" src="./NewsList.scss"></style>
