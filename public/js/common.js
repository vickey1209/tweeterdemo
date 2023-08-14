$(document).ready(() => {
  $('#postTextarea').keyup((event) => {
    var textbox = $(event.target);
    var value = textbox.val().trim();
    //   console.log(value);

    var submitbutton = $('#submitPostButton');
    if (submitbutton.length === 0) return alert('No submit button found');
    if (value === '') {
      submitbutton.prop('disabled', true);
      return;
    }
    submitbutton.prop('disabled', false);
  });

  $('#submitPostButton').click(() => {
    var textbox = $('#postTextarea');
    var button = $(event.target)

    var data = {
      content: textbox.val(),
    };


    $.post('/api/posts', data, (postData, status, xhr) => {

      console.log(postData);

     var html = createPostHtml(postData)
      $(".postContainer").prepend(html)
      textbox.val("")
      button.prop("disabled", true)

    })


    $(document).on("click", ".likebutton", (event) => {
      //  alert("buttton clicked")
      var button = $(event.target)
      var postId = getpostIdfromelement(button)
      //  console.log(postId);
      if (postId === undefined) return;

      $.ajax({
        url: `/api/posts/${postId}/like`,
        type: 'PUT',
        success: (postData) => {
          console.log(postData.likes.length);
          button.find("span").text(postData.likes.length || "");
          console.log(postData);
        }
      })
    })




    function getpostIdfromelement(element) {
      var isRoot = element.hasClass("post")
      var rootElement = isRoot == true ? element : element.closest(".post");
      var postId = rootElement.data().id;

      if (postId === undefined)
        alert("postid is undefined")
      return postId
    }

  });
  function createPostHtml(postData) {
    // return postData.content;
    var postedBy = postData.postedBy;
    var Displayname = postedBy.firstname +''+ postedBy.lastname
    var timestamps = new Date(postData.createdAt).toLocaleString();

    return `<div class="post" data-id= '${postData._id}'>
                  <div class= 'maincontentcontainer'>
                      <div class= 'userimagecontainer'>
                      <span>${postedBy.firstname}</span>
                    
                      <img src="${postedBy.profilepicture}" alt="user profile picture">

                        </div>    
                        <br>     
                        <div class = 'postcontentcontainer'>
                        <div class = 'header'>
                        <a href='/profile/${postedBy.username}'>${Displayname}</a>
                        <span class='username'>${postedBy.username}</span>
                        <span class= 'date'>${timestamps}</span>
                        </div>
                        <div class="postbody">
                        <span>${postData.content}</span>
                        </div>
                               
                        <div class="postfooter">
                
                        <div class="postbuttoncontainer">
                        <button type="button" data-toggle="modal" data-target="#replyModal">
                       
                          <i class="fa fa-comment-o" aria-hidden="true"></i>
                     
                        </button>
                        </div>
                        <div class="postbuttoncontainer">
                        <button class="likebutton">
              
                          <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                          <span>${postData.likes.length || ""}</span>
                        </button>
                        </div>
                        </div>
                        
                        </div> 
                      </div>
  
                  </div>      
              </div>`
  }

});
