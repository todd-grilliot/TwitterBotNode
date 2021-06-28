console.log("starting bot.js bois...");

var Twit = require('twit');
var Config = require('./config');
var KnockJokes = require('./knockjokes');
var Content = require('./content.json');
var fs = require('fs');
//OAUTH baby
var T = new Twit(Config);
//done OAUTH

var dailyCounter = 0;

//search for posts
/*
T.get('search/tweets', { q: 'banana since:2011-07-11', count: 2 }, function(err, data, response) {
    console.log(data.statuses[1].text)

    console.log(data);

  })
  */
/*
  T.get('statuses/show/:id', {
      name: 'hello world tweet',
      id:  '1408251027262898176'
    },
    function(err,data,response) {
      console.log(data);
    })
*/

/*function DailyTweet(){
  var tweet = {
    status: Content[dailyCounter].text;
    attachment_url:Content[dailyCounter].image
  }

  T.post('statuses/update', tweet, function(err, data, response){
  console.log("posting " + Content[dailyCounter].text);
  console.log("posting " + Content[dailyCounter].image);
  })

dailyCounter++
}*/

//setInterval(DailyTweet, 1000*60*60*24);



/*
function TweetIt(){
  var randy = Math.floor(Math.random() * 100);
  
  var tweet = {
    status: 'Woah! Look at this wild number!! ' + randy,
    in_reply_to_status_id: '1408251027262898176'
  }

  T.post('statuses/update', tweet, function(err, data, response) {
    //console.log(data)
    console.log('We tweeted something!')
    console.log(data)
  })
  
}
*/

//KnockJokes.completeJoke();


//keep track of certain tweeters and repost everything that is 2 standard deviations above their average engagement rate.
// neil degrass tyson, byu, byui, holland, 