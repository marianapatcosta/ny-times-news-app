<template>
  <li
    class="news"
    data-cy="news"
    role="button"
    tabIndex="0"
    aria-label="Click to check news details."
    @click.prevent="handleOnClick"
    @keydown.enter="handleOnClick"
  >
    <img
      v-if="newsInfo.imageUrl"
      class="news__image"
      :src="`https://www.nytimes.com/${newsInfo.imageUrl}`"
      :alt="newsInfo.headline"
    />
    <div v-else class="news__image news__image-placeholder" />
    <div class="news__content">
      <h2 class="news__header" data-cy="news-header">
        {{ newsInfo.headline }}
      </h2>
      <div class="news__subheader">
        <time class="news__date" :datetime="newsInfo.pubDate">
          {{ formatDate(newsInfo.pubDate) }}
        </time>
        <div class="news__section-name">
          {{ newsInfo.sectionName }}
        </div>
      </div>

      <div class="news__main">
        <div class="news__details">{{ newsInfo.abstract }}</div>
      </div>

      <div class="news__footer" v-if="newsInfo.source">
        Source: {{ newsInfo.source }}
      </div>
    </div>
  </li>
</template>

<script src="./News.js"></script>

<style scoped lang="scss" src="./News.scss"></style>
