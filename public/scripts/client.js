$(document).ready(function() {

  const renderTweets = function(tweets) {
    console.log(tweets);
      tweets.forEach(function(element) {
        const $tweet = createTweetElement(element);
        $('#tweets-container').append($tweet);
      });
  }
  
  const timePosted = function(time) {
    //returns an array of number and string ex.[10, minutes]
    if (time / 1000 < 60) return [Math.floor(time / 1000), "seconds"];
    else if (time / ( 1000 * 60 ) < 60) return [Math.floor(time / ( 1000 * 60 )), "minutes"];
    else if (time / ( 1000 * 60 * 60 ) < 24) return [Math.floor(time / ( 1000 * 60 * 60 )), "hours"]
    else return [Math.floor(time / (1000 * 60 * 60 * 24)), 'days'];
  }

  const createTweetElement = function(tweetObj) {
    const time = timePosted(new Date().getTime() - new Date(tweetObj.created_at).getTime());

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
        <span>Posted ${time[0]} ${time[1]} ago</span>
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

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

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
    $(this)[0][0].value = escape($(this)[0][0].value);
    if (isTweetValidated($(this)[0][0])) {
      $.ajax({
        url: '/tweets',
        type: 'POST',
        data: $(this).serialize()
      }).then(() => {
        $.ajax("/tweets", { method: 'GET'})
        .then(function(tweetPost) {
          renderTweets([tweetPost[tweetPost.length - 1]]);
        })
      })
      $('form textarea').val('');
    }
  })
});
