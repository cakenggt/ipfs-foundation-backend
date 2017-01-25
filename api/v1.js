'use strict';
const prefix = '/api/v1/';

module.exports = function(options){

  //This is your express app object
  let app = options.app;
  //This is the map of all of your sequelize models
  let models = options.models;

  /**
   * All of your api routes go here.
   * Format them in the following way:
   * app.post(prefix+'endpoint', callback);
   * app.get(prefix+'endpoint', callback);
   */
  app.get(prefix+'dump', function (req, resp) {
    var results = {
      files: [],
      comments: []
    };
    models.File.findAll()
    .then(function (files) {
      results.files = files;
      return models.Comment.findAll()
      .then(function (comments) {
        results.comments = comments;
      })
    })
    .then(function () {
      resp.json(results);
      resp.end();
    });
  });

  app.post(prefix+'file', function (req, res) {
    var body = req.body;
    if (body) {
      models.File.create(body);
    }
    res.end();
  });

  app.post(prefix+'comment', function (req, res) {
    var body = req.body;
    if (body) {
      models.Comment.create(body);
    }
    res.end();
  });

};
