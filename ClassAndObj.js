// text, created_at, id_str, retweet_count, fav_count

class tweet_Class{
    constructor(text, created_at, id_str, retweet_count, fav_count){
        this.text = text;
        this.created_at = created_at;
        this.id_str = id_str;
        this.retweet_count = retweet_count;
        this.fav_count = fav_count;
    }
}

const users = [
    {name: 'Elon Musk', user_id: 44196397},
    {name: 'Neil deGrasse Tyson', user_id: 19725644},
    {name: 'Deiter F. Uchtdorf', user_id: 1444693544},
    {name: 'NASA', user_id: 24919888},
    {name: 'CNN Breaking News', user_id: 428333},
    {name: 'Ellen DeGeneres', user_id: 15846407},
    {name: 'Barrak Obama', user_id: 813286}
]

module.exports.Tweeto = tweet_Class;
module.exports.retweetUsers = users;