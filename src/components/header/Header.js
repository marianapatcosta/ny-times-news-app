import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
