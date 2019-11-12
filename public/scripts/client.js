$(document).ready(function() {

  $('button#compose-tweet').on('click', function() {
    // Toggles the tweet box visibility.
    if ($('.new-tweet').css('display') === 'none') {
      $('.new-tweet').slideDown('slow');
      $("textarea").focus();
    } else {
      $('.new-tweet').slideUp('slow');
    }
  });

  const renderTweets = function(tweets) {
    // A function that loops over the tweets array, calls createTweet and prepends it to the tweet container.
    tweets.forEach(function(element) {
      const $tweet = createTweetElement(element);
      $('#tweets-container').prepend($tweet);
    });
  };
  
  const timePosted = function(time) {
    // A function that takes in a time in milliseconds and returns an array of time and time units.
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
    // A function that creates and returns the html of the tweets using a tweet object.
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
    // ajax get request that uses renderTweets function to loads the tweets.
    $.ajax('/tweets', { method: 'GET' })
      .then(function(tweetPost) {
        renderTweets(tweetPost);
      });
  };
  loadTweets();

  const escape = function(str) {
    // escape str so there's no cross-site scripting, returns text.
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const isTweetValidated = function(tweet) {
    // This function displays an error message/returns false if tweet is empty or length is > 140 else it returns true. 
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

  const postAjax = function(obj) {
    // This function does an ajax post request separate from form submit logic.
    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: $(obj).serialize()
    }).then(() => {
      $.ajax('/tweets', { method: 'GET'})
        .then(function(tweetPost) {
          renderTweets([tweetPost[tweetPost.length - 1]]);
        });
    });
  }

  $('#form-tweet').submit(function(e) {
    // This catches the submit on the tweet post, prevents submit default, escapes cross-site scripting a gets ajax request.
    e.preventDefault();
    $('#error-message').slideUp('slow');
    $(this)[0][0].value = escape($(this)[0][0].value);
    if (isTweetValidated($(this)[0][0])) {
      postAjax(this);
      $('form textarea').val('');
      $('.counter').text('140').css('color', '#545149');
    }
  });
});
