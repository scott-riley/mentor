var mentor = mentor || {},
    ENTER_KEY = 13,
    maxCharacters = 140;

$(function(){
  console.log('Uname: ' + session.username);
  var appRoute = new mentor.Router($('#content'));
  Backbone.history.start();
  console.log('Advice: ' + sessionStorage.getItem("advice"));

  $('.submit-modal textarea').hide();
  $('[data-hide-on-load]').hide();

  // var dropletModel = new mentor.Droplet();
  // var dropletView = new mentor.DropletView({model: dropletModel});
  $('body').on('click', '.button__primary', function(e){
    e.preventDefault();
    e.stopPropagation();
    var dropletEl = $('#droplet');
    // var dropletHeight = dropletEl.outerHeight();
    // dropletEl.height(dropletHeight);
    dropletEl.animate({opacity:0}, 500, function(){
      appRoute.switchView(appRoute.randomDroplet);
    });
  });

  $('.show-modal').on('keyup',function(e){
    if(e.keyCode == 27) {
      $('.modal .close').click();
    }
  });

  $('.modal-overlay').on('click',function(e){
      $('.modal .close').click();
  });

  $('.modal').on('click', function(e){
    e.stopPropagation();
  });

  if(sessionStorage.getItem("advice")) {
    $('#advice-replacer').text(sessionStorage.getItem("advice"));
    $('.modal').show();
    $('.modal-overlay').show();
    $('body').addClass('show-modal');
    $('#advice-replacer').click();
    generateOverspill($('#advice-replacer'), maxCharacters);
  }

  $('[data-toggle]').on('click', function(e){
    e.preventDefault();
    var toggler = $(this).attr('data-toggle');
    toggler = $(toggler);
    if($(this).attr('data-toggle-method') == 'fade') {
      $(toggler).fadeToggle(300);
    }
    else {
      $(toggler).slideToggle(300);
    }
    if(toggler.find('[contenteditable]').length) {
     toggler.find('[contenteditable]').focus();
    }
  });

  $('[data-toggle-body]').click(function(e){
    e.preventDefault();
    var classToggle = $(this).attr('data-toggle-body');
    $('body').toggleClass(classToggle);
  });

  var originalText;
  $('.advice-replacer').on('keydown', function(){
    originalText = $(this).text();

  }).on('keyup', function(){
    generateOverspill($(this), maxCharacters);
    sessionStorage.setItem('advice', $(this).text());
  }).on('paste', function(){
    var element = $(this);
    window.setTimeout(
      function(){
        element.html(element.text());
        generateOverspill(element, maxCharacters);
        sessionStorage.setItem('advice', $(this).text());
      }, 0);
  });

  $('#advice-form .submit').click(function(e){
    e.preventDefault();
    $('#advice-form').submit();
  });

  $('#advice-form').submit(function(e){
    e.preventDefault();
    if(checkIsValid()) {
      $('#advice-form .submit').addClass('processing')
                               .text('Sending')
                               .prepend('<i class="ss-emptyheart"></i>');
      var newDroplet = new mentor.Droplet();
      var dropletContent = $('#advice-replacer').text();
      var dropletAuthor = $('.twitter-user').text();
      newDroplet.save({
        content: dropletContent,
        user: dropletAuthor
      }, {
        success: function(model, response) {
          window.setTimeout(
            function(){
              $('#advice-form .submit').removeClass('processing')
                                       .text('Thank you!')
                                       .addClass('done')
                                       .prepend('<i class="ss-heart" style="display: none"></i>')
                                       .find('i')
                                       .fadeIn(200);
              $('#advice-form input, #advice-form textarea, #advice-form [contenteditable]').text('').val('');
              $('#advice-form [contenteditable]').focus();
            },
          500);
          window.setTimeout(
            function(){
              $('.droplet h1').text(dropletContent);
              $('.details a').text(dropletAuthor + ' (thanks!)');
              $('.details a').attr('href', 'http://twitter.com/' + dropletAuthor);
              sessionStorage.removeItem('advice');
              $('.modal .close').click();
            },
          1500);
        }
      });
    }
  });

  function generateOverspill(element, max) {
    var val = element.text();
    var length = element.text().length;
    $('.max-chars').text(max - length);
    if(length > max && val != originalText) {
      var goBackBy = max - length;
      var overspill = val.substr(goBackBy);
      overspill = $('<i class="overspill">' + overspill + '<i>');
      var newText = val.slice(0,goBackBy);
      element.text(newText);
      element.append(overspill);
      setEndOfContenteditable();
      $('.max-chars').removeClass('valid').addClass('exceeded');
      $('#advice-form .submit').addClass('disabled');
    }
    else if(length > 0 && length <= max) {
      $('.max-chars').removeClass('exceeded').addClass('valid');
      $('#advice-form .submit').removeClass('disabled');
    }
    else if(length == 0) {
      $('.max-chars').removeClass('valid').removeClass('exceeded');
      $('#advice-form .submit').addClass('disabled');
    }
  }

  function checkIsValid() {
    var adviceLength = $('#advice-replacer').text().length;
    if(adviceLength > 0 && adviceLength <= maxCharacters) {
      return true;
    }
    else {
      return false;
    }
  }

  function setEndOfContenteditable() {
    var range,
        selection,
        contentEditableElement = document.getElementById('advice-replacer');
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if(document.selection)//IE 8 and lower
    {
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
  }


});
