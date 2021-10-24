import { mount } from "@vue/test-utils";
import ImageComponent from "@/components/image/Image.vue";

describe("Image.vue", () => {
  const image = new Image();
  const src = image.src;
  const alt = "image description";
  const handleLoad = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ImageComponent, {
      props: {
        props: { src, alt },
        methods: { handleLoad },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it("should render without errors and match snapshot renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should not show image before loading", async () => {
    const image = wrapper.find("img");
    expect(image.isVisible()).toBe(false);
  });

  it("should show image after loading", async () => {
    const image = wrapper.find("img");
    await image.trigger("load");
    expect(image.isVisible()).toBe(true);
  });
});
