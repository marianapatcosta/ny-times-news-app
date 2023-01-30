import { mount } from "@vue/test-utils";
import Filter from "@/components/filter/Filter.vue";

describe("Filter.vue", () => {
  const options = ["All", "Option 1", "Option 2"];
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Filter, {
      props: { options },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it("should render without errors and match snapshot renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should not show filter option when rendered", async () => {
    const filterOptions = wrapper.find("ul");
    expect(filterOptions.isVisible()).toBe(false);
  });

  it("should not show filter option when rendered", async () => {
    const filterOptions = wrapper.find("ul");
    const button = wrapper.find(".filter__button");
    await button.trigger("click");
    expect(filterOptions.isVisible()).toBe(true);
  });

  it("should render 'Filter by' when no option is selected", () => {
    const button = wrapper.find(".filter__button");
    expect(button.text()).toMatch("Filter by");
  });

  it("should render option when a filter option is selected", async () => {
    const filterOptions = wrapper.find("ul").findAll("li");
    const button = wrapper.find(".filter__button");
    await button.trigger("click");
    await filterOptions.at(2).trigger("click");
    expect(button.text()).toMatch("Option 1");
  });

  it("should render 'Filter by' when 'All' option is selected", async () => {
    const filterOptions = wrapper.find("ul").findAll("li");
    const button = wrapper.find(".filter__button");
    await button.trigger("click");
    await filterOptions.at(1).trigger("click");
    expect(button.text()).toMatch("Filter by");
  });

  it("should render 'Search by' in search box when props.placeholder is not passed", () => {
    const search = wrapper.find(".filter__search input");
    expect(search.attributes("placeholder")).toMatch("Search...");
  });

  it("should render props.placeholder in search box", () => {
    const placeholder = "Search by";
    const wrapper = mount(Filter, {
      props: { options, placeholder },
    });
    const search = wrapper.find(".filter__search input");
    expect(search.attributes("placeholder")).toMatch(placeholder);
  });

  it("should emit 'select-option' event when a filter option is selected", async () => {
    const filterOptions = wrapper.find("ul").findAll("li");
    const button = wrapper.find(".filter__button");
    await button.trigger("click");
    await filterOptions.at(2).trigger("click");
    expect(wrapper.emitted()).toHaveProperty("select-option");
    expect(wrapper.emitted()["select-option"][0]).toEqual(["Option 1"]);
  });
});
