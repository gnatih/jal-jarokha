module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('images');

  return {
    dir: {
      input: 'src',
      output: 'src',
      includes: '_components',
      layouts: '_layouts',
    },
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateEngineOverride: 'njk',
  };
};
