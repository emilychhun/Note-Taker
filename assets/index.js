
$('.save').on('click', function(e){
   
    e.preventDefault();
    let noteTitle = $('.note-title').val()
    let noteTextarea = $('.note-textarea').val()
    let del = $("<span class='remove><i class ='material-icons'>delete</i></span>")
    let check =$("<i class ='material-icons'>check</i>")
    
 
    $.ajax({
        url:'/api/notes',
        Method: 'post',
        data:{
            noteTitle: noteTitle,
            noteTextarea: noteTextarea,
    }, 
    success: function(res){
        console.log("success", noteTitle, res);
        $('.list-group').append($('<li></li>').text(noteTitle))
        $('.note-title').append(del,check);
        $('.note-title').val('')
        $('.note-textarea').val('')
    } 
})
})
 $(document).on('click', 'remove', function(){

 })