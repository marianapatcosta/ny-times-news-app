import { mount } from "@vue/test-utils";
import Modal from "@/components/modal/Modal.vue";

describe("Modal.vue", () => {
  const header = "Modal header";
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Modal, {
      props: {
        header,
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it("should render without errors and match snapshot renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render props.header when passed", () => {
    expect(wrapper.text()).toContain(header);
  });

  it("should emit 'close' event when x is clicked", async () => {
    const closeButton = wrapper.find(".modal__close-button");
    await closeButton.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("close");
  });

  it("should emit 'close' event when 'ok' is clicked", async () => {
    const closeButton = wrapper.find(".modal__ok-button");
    await closeButton.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("close");
  });

  it("should not emit 'close' event when modal area is clicked", async () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const handleClickOutsideFn = jest.spyOn(
      Modal.methods,
      "handleClickOutside"
    );
    await wrapper.trigger("click");
    expect(handleClickOutsideFn).not.toHaveBeenCalled();
  });

  it("should emit 'close' event when any area outside the modal is clicked", async () => {
    const handleClickOutsideFn = jest.spyOn(
      Modal.methods,
      "handleClickOutside"
    );
    await document.dispatchEvent(new Event("click"));
    expect(handleClickOutsideFn).toHaveBeenCalled();
  });

  it("should remove close event listener when beforeMounted is executed", async () => {
    Object.defineProperty(document, "removeEventListener", {
      value: jest.fn(),
    });
    await wrapper.unmount();
    expect(document.removeEventListener).toHaveBeenCalled();
    expect(document.removeEventListener).toHaveBeenCalledWith(
      "click",
      wrapper.vm.handleClickOutside
    );
  });
});
