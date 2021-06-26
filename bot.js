console.log("the code is running?! howwdy");

var Twit = require('twit');
var Config = require('./config');
var KnockJokes = require('./knockjokes');

//OAUTH baby
var T = new Twit(Config);
//done OAUTH

var LastTweetid = 1408251027262898200;

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

/*
setInterval(TweetIt, 1000*20);

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

console.log('here are the jokes!!!');
//console.log(KnockJokes);

KnockJokes.completeJoke();
