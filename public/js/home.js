$(document).ready(()=>{
// alert('its working');
$.get('/api/posts', results => {

    outputposts(results,$(".postContainer"));
 

  })
});

function outputposts(results, container)
{
    container.html("");

    results.forEach(result => {
        var html = createPostHtml(result)
        container.append(html);
        
    });    
    if (results.length == 0) {
        container.append("<span class='noresult'> nothing to show</span>")
        
    } 
}