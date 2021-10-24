import { defineComponent } from "vue";

export default defineComponent({
  name: "Search",
  emits: ["search"],
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    handleOnEnter(event) {
      const target = event.target;
      this.$emit("search", this.keyword);
      target.blur();
    },
  },
});
