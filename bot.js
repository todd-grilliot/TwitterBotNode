console.log("starting bot.js bois...");

var Config = require('./config');
var Twit = require('twit');
var ClassyObj = require('./ClassAndObj');
var T = new Twit(Config); //oauth <<<

// *** Global Vars ***
var tmCount = 10;
var myTweetsArray = [];
var selectedRetweetUser;
var previousRetweetUser;
var tries = 0;
const trylimit = 100;
// *** End Global Vars ***

//selectUser() looks at the user Array in ClassyObj and selects a random user from the array, 
//as long as that's not the same as the previousRetweetUser.
//he takes that user, remembers them for next time, and plugs them into buildRetweetArray()
function selectUser(){
  console.log('selecting user for retweet...');
  selectedRetweetUser = ClassyObj.retweetUsers[Math.floor(Math.random() * ClassyObj.retweetUsers.length)];
  if(selectedRetweetUser === previousRetweetUser){
    console.log('repeat user, recalculating...');
    selectUser();
  }else{
    console.log(selectedRetweetUser);
    previousRetweetUser = selectedRetweetUser;
    buildRetweetArray(selectedRetweetUser.name, selectedRetweetUser.user_id);
  }
}

//buildRetweetArray() takes the user from selectUser() and T.gets their recent (tmCount) # of posts. 
//He builds an array of Tweet Objects with that data, and then hands the array to chooseRetweet()
function buildRetweetArray(nameParam, idParam){
  console.log(`building an array of their ${tmCount} most recent tweets...`);
  userTweetArray = [];
  T.get('statuses/user_timeline', 
  {name: nameParam, user_id: idParam, count: tmCount}, 
  function (err, data, response){
    if(err){console.log('error! in the t.get...')}else{
      //he builds an object and pushes it to an array.
      for (let i = 0; i < data.length; i++) {
        var userTweet = new ClassyObj.Tweeto(data[i].text, data[i].created_at, data[i].id_str, data[i].retweet_count, data[i].favorite_count); //new tweet obj
        userTweetArray.push(userTweet);
      }
      chooseRetweet(userTweetArray);
    }
  });
}

//chooseRetweet() takes the array from buildRetweetArray() and compares all the tweets to eachother.
//the one with the most .retweet_count is assigned to strongestTweet.
//You want to then compare the strongest tweet with the recent tweets that you have made. jeez.
async function chooseRetweet(retweetArray){
  console.log('choosing something from the array to retweet...');
  var strongestTweet = retweetArray[0];
  var myRecentTweetsArray = await myRecentTweets();

  if(retweetArray.length < tmCount/3 ){
    console.log('the retweet array is too small, probably because we retweeted all of their content already, reselecting...');
    tries++;
    if(tries > tryLimit){
      console.log('too many failed attempts. Shutting down... *err in chooseRetweet()*');
      return
    };
    return selectUser();
  }

  //comparing the array to find the strongestTweet
  for(let i = 0; i < retweetArray.length; i++){
    if(retweetArray[i].retweet_count > strongestTweet.retweet_count){
      strongestTweet = retweetArray[i];
    }
  }

  //comparing myRecentTweetsArray to the strongest tweet to check for duplicates
  for(let i = 0; i < myRecentTweetsArray.length; i++){
    if(myRecentTweetsArray[i].retweet_id_str === strongestTweet.id_str){
      console.log('one of your recent tweets is the same one that we chose!!!');
      console.log("we'll have to chose again...");
      let strongTweetIndex = retweetArray.indexOf(strongestTweet);
      retweetArray.splice(strongTweetIndex, 1);
      return chooseRetweet(retweetArray); // <<< run it again.
      }
    }
    //we made it! let's retweet this son of a gun
    retweet(strongestTweet);
  }

//myRecentTweets() T.gets my own user timeline, my last tmCount # of posts. it builds an array (myTweetsArray) with reTweetIdStr
// and then it gives that array back to chooseRetweet.
function myRecentTweets(){
  return new Promise((resolve, reject) => {
    T.get('statuses/user_timeline', {count: tmCount * 3}, (err, data, response) => {
      //returns an array of my (tmCount) most recent tweets
      for (let i = 0; i < data.length; i++) {
        //if var retweetIdStr is unidentified then we set it to null
        var retweetIdStr;
        if (data[i].retweeted_status){retweetIdStr = data[i].retweeted_status.id_str;} else {retweetIdStr = null;}
        
        var myTweet = new ClassyObj.Tweeto(data[i].text, data[i].created_at, data[i].id_str, data[i].retweet_count, data[i].favorite_count, retweetIdStr); //new tweet obj
        myTweetsArray.push(myTweet);
      }
      resolve(myTweetsArray);
    });
  })
};
function retweet(theTweet){
  console.log('Retweeting!!!');
  console.log(theTweet);
  tries = 0;
  
  T.post('statuses/retweet', {id: theTweet.id_str}, function(err, data, response){
    if(err){console.log(err);}
    else{console.log(theTweet); };   
    })
  }

setInterval(selectUser, 1000*60*60*8);
//selectUser();

/*
//uses a tweets id_str to find and return the user.
function findUserIdFromTweet(tweetId){
  T.get('statuses/show', {id: tweetId}, function(err, data, response){
    if(err){console.log(err)}
    else{
      console.log(`user id: ${data.user.id}`);
      return data.user.id;
    }
  })
}
findUserIdFromTweet('1421540186287218690');
*/