/*global require, module */
var ApiBuilder = require('claudia-api-builder'),
  api = new ApiBuilder();
var rp = require('request-promise');
var cheerio = require('cheerio');

api.get('/test', function(request) {
  'use strict';

  return request;
});

api.get('/calendar', function() {
  'use strict';

  var url = "http://itp.nyu.edu/camp2016/calendar";
  return rp(url)
    .then(function(html) {
      // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
      var $ = cheerio.load(html);

      var sessions = {};
      var dateHeaders = $('.dateHeader');
      dateHeaders.each(function(i, elem) {
        //console.log($(elem).text());
        var date = $(elem).text();
        sessions[date] = [];
        var times = $(elem).nextAll('.sessionListItem');
        times.each(function(i, elem) {
          //console.log($(elem).find('.sessionInfo b').text());
          var time_string = $(elem).find('.sessionInfo b').text();
          var start_time = time_string.split('-')[0];
          var start_time_ampm = start_time.indexOf('am');
          start_time = start_time.replace(/\D/, '').replace('30', '.5');
          if (start_time_ampm === -1) {
            // we're in pm
            start_time = parseFloat(start_time) + 12;
          }

          var end_time = time_string.split('-')[1];
          var end_time_ampm = end_time.indexOf('am');
          end_time = end_time.replace(/\D/, '').replace('30', '.5');
          if (end_time_ampm === -1) {
            // we're in pm
            end_time = parseFloat(end_time) + 12;
          }
          sessions[date].push(start_time);

          //console.log('Breakdown', time_string, " : ", start_time, " : ", end_time);
        });
      });
      return JSON.stringify(sessions);
    })
    .catch(function(err) { return 'fail'; });
})

module.exports = api;
