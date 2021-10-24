import { defineComponent } from "vue";

export default defineComponent({
  name: "Filter",
  emits: ["select-option"],
  props: {
    name: {
      type: String,
      required: false,
    },
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      selectedOption: "",
      showOptions: false,
      searchKeyword: "",
    };
  },
  computed: {
    filteredOptions() {
      return this.options.filter((option) =>
        option.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    },
  },
  methods: {
    toggleShowOptions() {
      this.showOptions = !this.showOptions;
    },
    handleOptionSelection(option) {
      this.selectedOption = option === "All" ? "" : option;
      this.showOptions = false;
      this.searchKeyword = "";
      this.$emit("select-option", this.selectedOption);
    },
  },
});
