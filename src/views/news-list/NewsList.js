import axios from "axios";
import { defineComponent } from "vue";
import {
  Modal,
  News,
  NewsPlaceholder,
  Pagination,
  Search,
  Filter,
} from "@/components";
import { SECTION_NAMES } from "../../utils/utils";

export default defineComponent({
  name: "NewsList",
  components: {
    Filter,
    Modal,
    News,
    NewsPlaceholder,
    Pagination,
    Search,
  },
  data() {
    return {
      count: 0,
      currentPage: 0,
      errorMessage: "",
      isLoading: false,
      newsList: [],
      numberOfPlaceholder: window.matchMedia("(min-width: 1023px)").matches
        ? 5
        : 2,
      searchKeyword: "",
      filterOption: "",
      SECTION_NAMES,
    };
  },
  computed: {
    searchOrFilterQueryParams() {
      if (this.searchKeyword && this.filterOption) {
        return `fq=section_name:("${this.filterOption}") AND ${this.searchKeyword}`;
      }

      if (this.filterOption) {
        return `fq=section_name:("${this.filterOption}")`;
      }

      return `fq=${this.searchKeyword}`;
    },
    newsUrl() {
      return `https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&${this.searchOrFilterQueryParams}&page=${this.currentPage}&api-key=${process.env.VUE_APP_NY_TIMES_API_KEY}`;
    },
    pageCount() {
      // number of news retrieved by NYTimes per page
      const apiOffset = 10;
      // limit of page query parameter allowed by NYtimes api
      const maxApiPageNumber = 200;
      const pageCount = Math.ceil(this.count / apiOffset);
      return pageCount <= maxApiPageNumber ? pageCount : maxApiPageNumber;
    },
  },
  methods: {
    async fetchNews() {
      try {
        this.isLoading = true;
        const response = await axios.get(this.newsUrl);
        this.newsList = response.data.response.docs.map((doc) =>
          this.extractNewsInfo(doc)
        );
        this.count = response.data.response.meta.hits;
      } catch (error) {
        this.errorMessage = "It is not possible to show the news.";
      } finally {
        this.isLoading = false;
      }
    },
    extractNewsInfo(newsData) {
      const newsInfo = {
        id: this.getId(newsData._id),
        headline: newsData.headline?.main,
        pubDate: newsData.pub_date,
        sectionName: newsData.section_name,
        abstract: newsData.abstract,
        imageUrl: newsData.multimedia.length ? newsData.multimedia[0].url : "",
        source: newsData.source,
        leadParagraph: newsData.lead_paragraph,
        webUrl: newsData.web_url,
      };
      return newsInfo;
    },

    getId(id) {
      const splittedId = id.split("/");
      return splittedId[splittedId.length - 1];
    },
    handleSearch(keyword) {
      this.searchKeyword = keyword;
      this.fetchNews();
    },
    handleFilterOptionSelection(option) {
      this.filterOption = option;
      this.fetchNews();
    },
    handleClearError() {
      this.errorMessage = "";
    },
    handlePaginationUpdate(page) {
      this.currentPage = page;
      this.fetchNews();
    },
  },
  mounted() {
    this.fetchNews();
  },
});
