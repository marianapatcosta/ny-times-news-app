<template>
  <article v-if="newsInfo" class="news-details" data-cy="news-details">
    <header>
      <div class="news-details__section-name">
        {{ newsInfo.sectionName }}
      </div>
      <h1 class="news-details__title">{{ newsInfo.headline }}</h1>
      <time class="news-details__date" :datetime="newsInfo.pubDate">
        {{ formatDate(newsInfo.pubDate) }}
      </time>
      <div class="news-details__abstract">{{ newsInfo.abstract }}</div>
      <Image
        class="news-details__image"
        v-if="newsInfo.imageUrl"
        :src="`https://www.nytimes.com/${newsInfo.imageUrl}`"
        :alt="newsInfo.headline"
      />
    </header>
    <div class="news-details__content">
      <div class="news-details__details">{{ newsInfo.leadParagraph }}</div>
      <div class="news-details__source" v-if="newsInfo.source">
        Source: {{ newsInfo.source }}
      </div>
      <div class="news-details__read-more">
        <a
          data-cy="read-more-button"
          :href="newsInfo.webUrl"
          target="_blank"
          rel="nofollow noopener noreferrer"
          >read more
        </a>
      </div>
    </div>
  </article>
  <p v-else class="news-details__no-data">There is no news data to display.</p>
</template>
<script src="./NewsDetails.js"></script>
<style scoped lang="scss" src="./NewsDetails.scss"></style>
