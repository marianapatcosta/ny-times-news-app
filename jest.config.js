module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transform: {
    "^.+\\.vue$": "vue-jest",
  },
  snapshotSerializers: ["jest-serializer-vue"],
  collectCoverage: true,
  coverageReporters: ["text"],
};
