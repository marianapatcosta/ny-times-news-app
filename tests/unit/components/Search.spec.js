import { shallowMount } from "@vue/test-utils";
import Search from "@/components/search/Search.vue";

describe("Search.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Search);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render without errors and match snapshot renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should handle search event", async () => {
    const search = wrapper.find('input[type="search"]');
    await search.setValue("search keyword");
    await wrapper.trigger("keydown.enter");
    expect(search.element.value).toMatch("search keyword");
    expect(wrapper.emitted()).toHaveProperty("search");
    expect(wrapper.emitted().search[0]).toEqual(["search keyword"]);
  });
});
