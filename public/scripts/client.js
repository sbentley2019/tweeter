$(document).ready(function() {


  $('button#compose-tweet').on('click', function() {
    // Toggles the tweet box visibility
    if ($('.new-tweet').css('display') === 'none') {
      $('.new-tweet').slideDown('slow');
      $("textarea").focus();
    } else {
      $('.new-tweet').slideUp('slow');
    }
  });

  const renderTweets = function(tweets) {
    tweets.forEach(function(element) {
      const $tweet = createTweetElement(element);
      $('#tweets-container').prepend($tweet);
    });
  };
  
  const timePosted = function(time) {
    if (time / 1000 < 60) {
      return [Math.floor(time / 1000), 'seconds'];
    } else if (time / (1000 * 60) < 60) {
      return [Math.floor(time / (1000 * 60)), 'minutes'];
    } else if (time / (1000 * 60 * 60) < 24) {
      return [Math.floor(time / (1000 * 60 * 60)), 'hours'];
    } else {
      return [Math.floor(time / (1000 * 60 * 60 * 24)), 'days'];
    }
  };

  const createTweetElement = function(tweetObj) {
    const time = timePosted(new Date().getTime() - new Date(tweetObj.created_at).getTime());
      
    const $tweet =
    `<article class='tweet'>
      <header>
        <div>
          <img src='${tweetObj.user.avatars}'>
          <p>${tweetObj.user.name}</p>
        </div>
        <h3>${tweetObj.user.handle}</h3>
      </header>
      <p class='message'>${tweetObj.content.text}</p>
      <footer>
        <span>Posted ${time.join(' ')} ago</span>
        <div>
          <a href='#' title='flag'><i class='fas fa-flag'></i></a>
          <a href='#' title='retweet'><i class='fas fa-retweet'></i></a>
          <a href='#' title='like'><i class='fas fa-heart'></i></a>
        </div>
      </footer>
    </article>`;
    return $tweet;
  };

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(tweetPost) {
        renderTweets(tweetPost);
      });
  };
  loadTweets();

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const isTweetValidated = function(tweet) {
    if (!tweet.value) {
      $('#error-message span').text(' Tweet has to have at least one character. ');
      $('#error-message').slideDown('slow');
      return false;
    }
    if (tweet.value.length > 140) {
      $('#error-message span').text('The number of characters cannot exceed 140.');
      $('#error-message').slideDown('slow');
      return false;
    } else {
      return true;
    }
  };

  $('#form-tweet').submit(function(e) {
    e.preventDefault();
    $('#error-message').slideUp('slow');
    $(this)[0][0].value = escape($(this)[0][0].value);
    if (isTweetValidated($(this)[0][0])) {
      $.ajax({
        url: '/tweets',
        type: 'POST',
        data: $(this).serialize()
      }).then(() => {
        $.ajax('/tweets', { method: 'GET'})
          .then(function(tweetPost) {
            renderTweets([tweetPost[tweetPost.length - 1]]);
          });
      });
      $('form textarea').val('');
      $('.counter').text('140');
    }
  });
});
