module.exports = function (app, express, cors) {
  app.use(cors())
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
}