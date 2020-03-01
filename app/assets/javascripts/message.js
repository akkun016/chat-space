$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="message-block">
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
      var html = `<div class="message-block">
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
      $(`.chat-main__message-list`).append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.new_message')[0].reset();
      $('.submit-btn').prop("disabled", false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('.submit-btn').prop("disabled", false);
    });
  });
});