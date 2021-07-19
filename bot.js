console.log("starting bot.js bois...");

var Twit = require('twit');
const prompt = require('prompt-sync')({sigint: true});
//var string = prompt('give me a string'); ^^^
var Config = require('./config');
var KnockJokes = require('./knockjokes');
//KnockJokes.tellJoke(); ^^^
var ClassyObj = require('./ClassAndObj');
var Content = require('./content.json');
var fs = require('fs');
const { report } = require('process');
var T = new Twit(Config); //oauth <<<

// *** Global Vars ***
var dailyCounter = 0;
var tmCount = 10;
//var userTweetArray = []; <<< i don't think this has to be a global var anymore, it's now initiated in buildRetweet()
var selectedRetweetUser;
var previousRetweetUser;
// *** End Global Vars ***

function selectUser(){
  //console.log(JSON.stringify(ClassyObj.retweetUsers));
  selectedRetweetUser = ClassyObj.retweetUsers[Math.floor(Math.random() * ClassyObj.retweetUsers.length)];
  if(selectedRetweetUser === previousRetweetUser){
    console.log('repeat user, recalculating...');
    selectUser();
  }else{
    console.log(selectedRetweetUser);
    previousRetweetUser = selectedRetweetUser;
    buildRetweet(selectedRetweetUser.name, selectedRetweetUser.user_id);
  }
}

function buildRetweet(nameParam, idParam){
  userTweetArray = [];
  T.get('statuses/user_timeline', 
  {name: nameParam, user_id: idParam, count: tmCount}, 
  function (err, data, response){
    if(err){console.log('error! in the t.get...')}else{
      console.log('getting user_timeline...')
      //console.log('data:\n' + JSON.stringify(data,null,2))
      //he builds an object and pushes it to an array.
      for (let i = 0; i < data.length; i++) {
        var userTweet = new ClassyObj.Tweeto(
          data[i].text,
          data[i].created_at,
          data[i].id_str,
          data[i].retweet_count,
          data[i].favorite_count
        );
        userTweetArray.push(userTweet);
      }
      chooseRetweet(userTweetArray);
    }
  });
}
function chooseRetweet(retweetArray){
  console.log(JSON.stringify(retweetArray));
  var strongestTweet = retweetArray[0];
  for(let i = 0; i < retweetArray.length; i++){
    if(retweetArray[i].retweet_count > strongestTweet.retweet_count){
      strongestTweet = retweetArray[i];
      console.log('the strongest tweet is number...' + i);
      console.log(strongestTweet.retweet_count);
    }
    // He needs to compare this list to his own previous tweet list. Have him delete parts of the array if he's already tweeted it and choose again.
    // after he chooses he needs one more callback to retweet the thing he chose.
  }
}

//setInterval(selectUser, 1000*60);
selectUser();

//he's going to need to get other users, maybe like a set of 5 or so just to start.
// he's going to need to select one, build an array with it, select the most retweetable tweet, and then tweet that.

/** 
setInterval(DailyTweet, 1000*60*3);
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
  })}
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
};
*/

//write some code to get the data that you are looking for.

//keep track of certain tweeters and repost everything that is 2 standard deviations above their average engagement rate.
// neil degrass tyson, byu, byui, holland 