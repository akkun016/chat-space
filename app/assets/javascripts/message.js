$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="message-block" data-message-id=${message.id}>
                    <div class="message-block__message-title">
                      <div class="message-block__message-title__name">
                        ${message.user_name}
                      </div>
                      <div class="message-block__message-title__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message-block__lower-message">
                      <p class="message-block__lower-message__text">
                        ${message.text}
                      </p>
                    </div>
                    <img src=${message.image} >
                  </div>`
      return html;
    } else {
      var html = `<div class="message-block" data-message-id=${message.id}>
                    <div class="message-block__message-title">
                      <div class="message-block__message-title__name">
                        ${message.user_name}
                      </div>
                      <div class="message-block__message-title__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message-block__lower-message">
                      <p class="message-block__lower-message__text">
                        ${message.text}
                      </p>
                    </div>
                  </div>`
      return html;
    }
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.new_message')[0].reset();
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
    .always(function() {
      $('.submit-btn').prop("disabled", false);
    });
  });

  var reloadMessages = function(){
    var last_message_id = $('.message-block:last').data("message-id");
    $.ajax({
      data: {id: last_message_id},
      type: "get",
      dataType: "json",
      url: "api/messages"
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    })
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 1000);
  }
});