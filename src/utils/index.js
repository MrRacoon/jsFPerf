module.exports = (size) => ({
  object: require('./object')[size],
  list: require('./list')[size],
});
