console.log("starting bot.js bois...");

var Twit = require('twit');
const prompt = require('prompt-sync')({sigint: true});
var Config = require('./config');
var KnockJokes = require('./knockjokes');
var Content = require('./content.json');
var fs = require('fs');
//OAUTH baby
var T = new Twit(Config);
//done OAUTH

var dailyCounter = 0;

setInterval(DailyTweet, 1000*60*3);
//var string = prompt('give me a string');
//console.log('guns and butts' + string);

function DailyTweet(){

  //define tweet content, post function, log statuses, dailyCounter++
  var tweet = {status: Content[dailyCounter].text}
  function post(){
    T.post('statuses/update', tweet, function(err, data, response){
    console.log("posting: " + Content[dailyCounter].text);
    console.log("posting image: " + Content[dailyCounter].imagePath);
    console.log("timestamp: " + data.created_at);
    console.log("id_string: " + data.id_str);
    dailyCounter++
  })
  }

  //if there is an image in the tweet, upload it, then post
  var b64content;
  if(Content[dailyCounter].imagePath){
    //init b64 content with our image
    b64content = fs.readFileSync(Content[dailyCounter].imagePath, { encoding: 'base64' });
    //T.post upload fuction with our callback
    T.post('media/upload', {media_data: b64content}, uploadCallback);
    function uploadCallback(err, data, response){
      mediaIdArray = [data.media_id_string];
      //put the media_ids into the tweet object and give it a value vvv
      tweet.media_ids = mediaIdArray;
      post();
    }
  }
  else { post(); }
}

//KnockJokes.completeJoke();

exports.completeJokeIndex = KnockJokes.completeJoke;

//keep track of certain tweeters and repost everything that is 2 standard deviations above their average engagement rate.
// neil degrass tyson, byu, byui, holland, 