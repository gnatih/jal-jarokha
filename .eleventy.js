module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addFilter('sortByOrder', (values) => {
    let vals = [...values];
    return vals.sort((a, b) => Math.sign(a.data.order - b.data.order));
  });

  eleventyConfig.addCollection('stories_en', function (collection) {
    return collection.getFilteredByGlob('./src/en/stories/*.njk');
  });

  eleventyConfig.addCollection('stories_hi', function (collection) {
    return collection.getFilteredByGlob('./src/hi/stories/*.njk');
  });

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
