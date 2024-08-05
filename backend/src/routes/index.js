const authRoutes = require('./auth');
const contentRoutes = require('./content');

module.exports = (app) => {
  app.use('/auth', authRoutes);
  app.use('/content', contentRoutes);
};