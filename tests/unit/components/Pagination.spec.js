import { mount } from "@vue/test-utils";
import "../match-media-mock";
import Pagination from "@/components/pagination/Pagination.vue";

describe("Pagination.vue", () => {
  const pageCount = 10;
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Pagination, {
      props: { pageCount },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it("should render without errors and match snapshot renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should emit 'update-pagination' event when a pagination bar button is clicked", async () => {
    const paginationButtons = wrapper.findAll("button");
    await paginationButtons.at(3).trigger("click");
    expect(wrapper.emitted()).toHaveProperty("update-pagination");
  });

  it("should emit 'update-pagination' event with pageCount value when 'button-to-last-page' is clicked", async () => {
    const button = wrapper.find("#button-to-last-page");
    await button.trigger("click");
    expect(wrapper.emitted()["update-pagination"][0]).toEqual([10]);
  });

  it("should emit 'update-pagination' event with pageCount value when 'button-to-last-page' is clicked", async () => {
    const button = wrapper.find("#button-to-last-page");
    await button.trigger("click");
    expect(wrapper.emitted()["update-pagination"][0]).toEqual([10]);
  });

  it("display 0, 1, 2, 3, 4 buttons when 'button-to-last-page' is clicked", async () => {
    expect(wrapper.vm.paginationNumbers).toEqual([0, 1, 2, 3, 4]);
  });

  it("display 1, 2, 3, 4, 5 buttons when 'button-to-next-page' is clicked", async () => {
    const button = wrapper.find("#button-to-next-page");
    await button.trigger("click");
    await button.trigger("click");
    await button.trigger("click");
    expect(wrapper.vm.paginationNumbers).toEqual([1, 2, 3, 4, 5]);
  });

  it("display 6, 7, 8, 9, 10 buttons when 'button-to-last-page' is clicked", async () => {
    const button = wrapper.find("#button-to-last-page");
    await button.trigger("click");
    expect(wrapper.vm.paginationNumbers).toEqual([6, 7, 8, 9, 10]);
  });
});
