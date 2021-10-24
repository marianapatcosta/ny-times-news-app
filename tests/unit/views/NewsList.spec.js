import { mount } from "@vue/test-utils";
import { mockNewsResponse } from "../../mocks";
import "../match-media-mock";
import axios from "axios";
import Filter from "@/components/filter/Filter.vue";
import NewsList from "@/views/news-list/NewsList.vue";
import News from "@/components/news/News.vue";
import Modal from "@/components/modal/Modal.vue";
import Pagination from "@/components/pagination/Pagination.vue";

jest.mock("axios");
const fetchNewsFn = jest.spyOn(NewsList.methods, "fetchNews");

describe("NewsList.vue with successful GET request", () => {
  let wrapper;

  beforeEach(() => {
    const mockedGetResponse = {
      data: mockNewsResponse,
    };

    axios.get.mockResolvedValue(mockedGetResponse);
    wrapper = mount(NewsList);
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("should render without errors and match snapshot renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should fetch news list on mount", async () => {
    const news = wrapper.findAllComponents(News);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(news.length).toBeTruthy();
    expect(wrapper.vm.newsList.length).toBe(10);
  });

  it("should change current page and fetch new data on 'next page' button click", async () => {
    const news = wrapper.findAllComponents(News);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(news.length).toBeTruthy();
    expect(wrapper.vm.newsList.length).toBe(10);
    const pagination = wrapper.findComponent(Pagination);
    const nextButton = pagination.find("#button-to-next-page");
    await nextButton.trigger("click");
    expect(wrapper.vm.currentPage).toBe(1);
    expect(fetchNewsFn).toHaveBeenCalledTimes(2);
  });

  it("should change searchKeyword and fetch new data on add keyword on search box and press 'Enter'", async () => {
    const news = wrapper.findAllComponents(News);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(news.length).toBeTruthy();
    expect(wrapper.vm.newsList.length).toBe(10);
    const searchInput = wrapper.find('input[type="search"]');
    await searchInput.setValue("search keyword");
    await searchInput.trigger("keydown.enter");
    expect(wrapper.vm.searchKeyword).toMatch("search keyword");
    expect(fetchNewsFn).toHaveBeenCalledTimes(2);
  });

  it("should change selected filter option and fetch new data on selecting a option in filter component", async () => {
    const news = wrapper.findAllComponents(News);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(news.length).toBeTruthy();
    expect(wrapper.vm.newsList.length).toBe(10);
    const filter = wrapper.findComponent(Filter);
    const filterOptions = filter.find("ul").findAll("li");
    const filterButton = filter.find(".filter__button");
    await filterButton.trigger("click");
    await filterOptions.at(2).trigger("click");
    expect(wrapper.vm.filterOption).toMatch("Arts");
    expect(fetchNewsFn).toHaveBeenCalledTimes(2);
  });

  it("should change selected filter option and searchKeyword and fetch new data combining this information in api url", async () => {
    const news = wrapper.findAllComponents(News);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(news.length).toBeTruthy();
    expect(wrapper.vm.newsList.length).toBe(10);
    const searchInput = wrapper.find('input[type="search"]');
    await searchInput.setValue("search keyword");
    await searchInput.trigger("keydown.enter");
    expect(wrapper.vm.searchKeyword).toMatch("search keyword");
    const filter = wrapper.findComponent(Filter);
    const filterOptions = filter.find("ul").findAll("li");
    const filterButton = filter.find(".filter__button");
    await filterButton.trigger("click");
    await filterOptions.at(2).trigger("click");
    expect(wrapper.vm.filterOption).toMatch("Arts");
    expect(fetchNewsFn).toHaveBeenCalledTimes(3);
  });
});

describe("NewsList.vue with error GET request", () => {
  let wrapper;

  beforeEach(() => {
    axios.get.mockRejectedValue(new Error("BAD REQUEST"));

    wrapper = mount(NewsList);
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("should show error message when data fetching fails", async () => {
    const modal = wrapper.findComponent(Modal);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(modal.exists()).toBe(true);
    expect(wrapper.vm.errorMessage).toBeTruthy();
  });

  it("should clear error message showed data fetching fails, after modal click", async () => {
    const modal = wrapper.findComponent(Modal);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(modal.exists()).toBe(true);
    expect(wrapper.vm.errorMessage.length).toBeTruthy();
    const closeButton = modal.find(".modal__ok-button");
    await closeButton.trigger("click");
    expect(wrapper.vm.errorMessage).toBeFalsy();
    expect(wrapper.findComponent(Modal).exists()).toBe(false);
  });
});
