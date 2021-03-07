
$('.save').on('click', function(e){
   
    e.preventDefault();
    let noteTitle = $('.note-title').val()
    let noteTextarea = $('.note-textarea').val()
    let del = $("<i class ='fas fa-trash remove'</i>")
    
    
 
    $.ajax({
        url:'/api/notes',
        type: 'POST',
        data:{
            noteTitle: noteTitle,
            noteTextarea: noteTextarea,
    }, 
    success: function(res){
        console.log("success", noteTitle, res);
        $('.list-group').append($(`<li class='note-icon'>${noteTitle}</li>`))
     
        $('.note-icon').append(del);
        $('.note-title').val('')
        $('.note-textarea').val('')
    } 
})
})

$('.list-group').on('click', '.remove', (e) =>{
    let rowEl = $(this).closest('li');
    let id =rowEl.find('.note-icon').text();
 

   $.ajax({
    url: "/api/notes/" +id,
    type: "DELETE",

success: function(res){
      console.log("success", res);
   $(e.target).fadeOut()
} 
})
})