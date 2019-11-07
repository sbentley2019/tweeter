$(document).ready(function() {

  const renderTweets = function(tweets) {
    console.log(tweets);
      tweets.forEach(function(element) {
        const $tweet = createTweetElement(element);
        $('#tweets-container').append($tweet);
      });
  }
  
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

  const loadTweets = function() {
    $.ajax("/tweets", { method: 'GET' })
    .then(function(tweetPost) {
      renderTweets(tweetPost);
    })
  }();

  const isTweetValidated = function(tweet) {
    if (tweet.value === "" || tweet.value === undefined) {
      alert('Tweet has to have at least one character.');
      return false;
    } 
    if (tweet.value === null) {
      alert('Tweet cannot be null.');
      return false;
    }
    if (tweet.value.length > 140) {
      alert('The number of characters cannot exceed 140.');
      return false;
    }
    return true;
  }

  $("#form-tweet-id").submit(function(e) {
    e.preventDefault();
    if (isTweetValidated($(this)[0][0])) {
      $.ajax({
        url: '/tweets',
        type: 'POST',
        data: $(this).serialize()
      })
    }
  })
});
