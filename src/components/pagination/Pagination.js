import { defineComponent } from "vue";

export default defineComponent({
  name: "Pagination",
  emits: ["update-pagination"],
  props: {
    pageCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      selectedPage: 0,
    };
  },
  computed: {
    paginationNumbers() {
      const nrButtonsToDisplay = window?.matchMedia("(min-width: 525px)")
        .matches
        ? 10
        : 5;
      const numbersOffset = 3;
      const numbers = Array(nrButtonsToDisplay).fill("");
      let firstNumberToDisplay = this.selectedPage;
      // determine the number option to display when selectedPage is near to pageCount (last page)
      if (this.selectedPage >= this.pageCount - numbersOffset) {
        firstNumberToDisplay = this.pageCount - nrButtonsToDisplay + 1;
      } else if (this.selectedPage >= nrButtonsToDisplay - numbersOffset) {
        firstNumberToDisplay =
          this.selectedPage - (nrButtonsToDisplay - numbersOffset);
      }

      return numbers.map((number, index) => firstNumberToDisplay + index);
    },
  },
  methods: {
    handlePaginationUpdate(newPage) {
      this.selectedPage = newPage;
      this.$emit("update-pagination", newPage);
    },
  },
});
