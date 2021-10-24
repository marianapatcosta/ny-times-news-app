import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import NewsDetails from "@/views/news-details/NewsDetails.vue";
import { newsInfoMock } from "../../mocks";

describe("NewsDetails.vue", () => {
  let wrapper;
  let store;
  const mockedNewsInfoGetter = jest.fn();
  mockedNewsInfoGetter.mockReturnValue(newsInfoMock);
  beforeEach(() => {
    const getters = {
      newsInfo: mockedNewsInfoGetter,
    };

    store = createStore({
      getters,
    });

    wrapper = mount(NewsDetails, {
      global: {
        mocks: {
          $store: store,
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render without errors and match snapshot renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should call newsInfo getter to get newsInfo from the store when rendered", () => {
    expect(wrapper.vm.newsInfo).toBeTruthy();
    expect(mockedNewsInfoGetter).toHaveBeenCalled();
  });
});
