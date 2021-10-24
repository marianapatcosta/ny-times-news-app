import { mockNewsResponseUSFilter } from "../../mocks";

describe("News List", () => {
  const baseUrl = (Cypress.config().baseUrl || "").replace(/\/$/, "");
  const PAGE_SIZE = 10;
  const searchParams = `fq=`;
  const currentPage = 0;
  const apiUrl = (searchOrFilterQueryParams, page) =>
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&${
      searchOrFilterQueryParams || searchParams
    }&page=${page || currentPage}&api-key=${Cypress.env("nyTimesApiKey")}`;

  it("should visit app root url and render news list view", () => {
    cy.visit("/");
    cy.get('[data-cy="news-list"]').should("exist");
    cy.contains("h1", "New York Times News");
    cy.url().should("eq", `${baseUrl}/`);
  });

  it("should show a list of news placeholders while fetching data", () => {
    cy.visit("/");
    cy.server().route({
      method: "GET",
      url: apiUrl(),
      onRequest: () =>
        cy
          .get('[data-cy="news-placeholder"]')
          .should("have.length.greaterThan", 0),
    });
  });

  it("should show a list of news", () => {
    cy.visit("/");
    cy.get('[data-cy="news"]').should("have.length.greaterThan", 0);
    cy.get('[data-cy="news"]').should("not.have.length.greaterThan", PAGE_SIZE);
    cy.get('[data-cy="news-placeholder"]').should("not.exist");
  });

  it("should go to page 2 and render other news", () => {
    cy.visit("/");
    const page1FirstNewsHeadline = cy.get('[data-cy="news-header"]').first();
    cy.get('[data-cy="pagination"]').contains("button", "2").click();
    page1FirstNewsHeadline.should(
      "not.eq",
      cy.get('[data-cy="news-header"]').first()
    );
  });

  it("should get only news matching a section, after selecting a section filter", () => {
    const sectionFilter = "U.S.";
    // mock response to avoid using the hack cy.wait(1000) to wait for data fetching when a filter is selected
    // and be able to asset section_name of news in the page
    cy.server()
      .route({
        method: "GET",
        url: apiUrl(`fq=section_name:("${sectionFilter}")`),
        response: mockNewsResponseUSFilter,
      })
      .as("getFilteredNews");
    cy.visit("/");
    const filter = cy.get('[data-cy="filter"]');
    filter.contains("button", "Filter by").click();
    cy.get('[data-cy="filter"]').contains("li", sectionFilter).click();
    cy.wait("@getFilteredNews");
    cy.get('[data-cy="news"]')
      .should("have.length.greaterThan", 0)
      .each((item) =>
        cy.wrap(item).contains(".news__section-name", sectionFilter)
      );
  });

  it("should navigate to the first news detail", () => {
    cy.visit("/");
    cy.get('[data-cy="news"]').first().click();
    cy.url().should("contain", `${baseUrl}/news/`);
    cy.get('[data-cy="news-details"]').should("exist");
  });

  it("should navigate to the first news detail and go to the external url on 'read more click'", () => {
    cy.visit("/");
    cy.get('[data-cy="news"]').first().click();
    cy.url().should("contain", `${baseUrl}/news/`);
    cy.get('[data-cy="news-details"]').should("exist");
    cy.get('[data-cy="read-more-button"]').then((link) => {
      // to simulate the load of a new page on a tag click;
      // avoids CORS issues and the use of different base urls (app url and external page) in the same text
      cy.request(link.prop("href")).its("body").and("include", "</html>");
    });
  });

  it("should show an error message when data fetching fails", () => {
    cy.server().route({
      method: "GET",
      url: apiUrl(),
      status: 500,
      response: {},
    });

    cy.visit("/");
    cy.get('[data-cy="modal"]').should("exist");
    cy.contains("h4", "An error occurred!");
  });

  it("should show 'There is no news to display!' message when theres is no news", () => {
    cy.server().route({
      method: "GET",
      url: apiUrl(),
      status: 200,
      response: { response: { docs: [] } },
    });
    cy.visit("/");
    cy.contains("p", "There is no news to display!");
  });
});
