module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "~normalize.css/normalize.css";
          @import "@/styles/variables.scss";
        `
      }
    }
  }
}
