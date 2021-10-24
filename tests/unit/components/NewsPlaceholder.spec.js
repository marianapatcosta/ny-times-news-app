import { shallowMount } from "@vue/test-utils";
import NewsPlaceholder from "@/components/news-placeholder/NewsPlaceholder.vue";

describe("NewsPlaceholder.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(NewsPlaceholder);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render without errors and match snapshot renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
