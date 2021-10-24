import { defineComponent } from "vue";
import { Image } from "@/components";
import { formatDate } from "@/utils/utils";

export default defineComponent({
  name: "NewsDetails",
  components: {
    Image,
  },
  computed: {
    newsInfo() {
      return this.$store.getters.newsInfo;
    },
  },
  data() {
    return {
      formatDate,
    };
  },
});
