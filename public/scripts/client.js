$(document).ready(function() {

const createTweetElement = function(tweetObj) {
  
  const $tweet = 
  `<article class="tweet">
    <header>
      <div>
        <img src="${tweetObj.user.avatars}">
        <p>${tweetObj.user.name}</p>
      </div>
      <h3>${tweetObj.user.handle}</h3>
    </header>
    <p class="message">${tweetObj.content.text}</p>
    <footer>
      <span>Posted ${tweetObj.created_at} ms ago</span>
      <div>
        <a href="#"><i class="fas fa-flag"></i></a>
        <a href="#"><i class="fas fa-retweet"></i></a>
        <a href="#"><i class="fas fa-heart"></i></a>
      </div>
    </footer>
  </article>`;
  return $tweet;
};

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

  const $tweet = createTweetElement(tweetData);
  $('#tweets-container').append($tweet);

});
