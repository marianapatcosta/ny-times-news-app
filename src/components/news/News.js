import { defineComponent } from "vue";
import { formatDate } from "@/utils/utils";

export default defineComponent({
  name: "News",
  props: {
    newsInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formatDate,
    };
  },
  methods: {
    handleOnClick() {
      this.$store.dispatch("setNewsInfo", this.newsInfo);
      this.$router.push(`/news/${this.newsInfo.id}`);
    },
  },
});
