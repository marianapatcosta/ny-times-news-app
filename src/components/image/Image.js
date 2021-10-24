import { defineComponent } from "vue";

export default defineComponent({
  name: "Image",
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isLoaded: false,
    };
  },
  methods: {
    handleLoad() {
      this.isLoaded = true;
    },
  },
});
