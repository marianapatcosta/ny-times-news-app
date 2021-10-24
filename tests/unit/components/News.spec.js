import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import News from "@/components/news/News.vue";
import { newsInfoMock } from "../../mocks";

describe("News.vue", () => {
  let store;
  let wrapper;
  let mockRouter;
  const mockedSetNewsInfo = jest.fn();
  beforeEach(() => {
    const actions = {
      setNewsInfo: mockedSetNewsInfo,
    };

    store = createStore({
      actions,
    });

    mockRouter = {
      push: jest.fn(),
    };
    const mockRoute = {
      params: {
        id: newsInfoMock.id,
      },
    };
    wrapper = mount(News, {
      props: { newsInfo: newsInfoMock },
      global: {
        mocks: {
          $store: store,
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });
  });
  it("should render without errors and match snapshot renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render news info", () => {
    expect(wrapper.text()).toContain(newsInfoMock.headline);
  });

  it("should dispatch newsInfo to the store and redirect to 'News Details' page when item is clicked", async () => {
    await wrapper.trigger("click");
    expect(mockedSetNewsInfo).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith(`/news/${newsInfoMock.id}`);
  });
});
