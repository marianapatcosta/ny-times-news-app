import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
  emits: ["close"],
  props: {
    header: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
  },
  methods: {
    handleClickOutside(event) {
      const target = event.target;
      const modal = this.$refs.modal;
      if (modal && !modal.contains(target)) {
        this.$emit("close");
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
});
