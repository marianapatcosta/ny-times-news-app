import { shallowMount } from "@vue/test-utils";
import Header from "@/components/header/Header.vue";

describe("Header.vue", () => {
  const title = "Header Title";
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Header, {
      props: { title },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it("should render without errors and match snapshot renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render props.title when passed", () => {
    expect(wrapper.text()).toMatch(title);
  });
});
