# New York Times News App

Simple News Web App fetching news data from the New York Times API. Developed using Vue3 with JavaScript SCSS, Vuex, JEST and Cypress.

![Picture1](https://user-images.githubusercontent.com/43031902/139539130-09de4dd0-6322-413c-9088-4567c88ba97a.png)

## Project setup
```
yarn install
```

Be sure that the following files and renamed and fulfilled with your NY times api key:
- rename `env.example` to `env` and assign your NY times api key to *VUE_APP_NY_TIMES_API_KEY*.
- rename `cypress.env.example.json` to `cypress.env.json` and assign your NY times api key to *nyTimesApiKey*.

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
