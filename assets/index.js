
$('.save').on('click', function(e){
    let count =0;
    e.preventDefault();
    let noteTitle = $('.note-title').val()
    let noteTextarea = $('.note-textarea').val()
    
 
    $.ajax({
        url:'/api/notes',
        Method: 'post',
        data:{
            noteTitle: noteTitle,
            noteTextarea: noteTextarea,
    }, 
    success: function(res){
        console.log("success", noteTitle, res);
        count ++;
        $('#list-group').append($('<li><div class="left-cont"> + <input type="checkbox" id="check-'+ noteTitle +'" name=""><label for="check-'+count+'"></label><span>'+noteTitle+'</span></div><span class ="remove"><i class="material-icons">delete</i></span></li>').text(noteTitle))
        $('#list-group').append($('<li><div class="left-cont"> + <input type="checkbox" id="check-'+count+'" name=""><label for="check-'+count+'"></label><span>'+noteTitle+'</span></div><span class ="remove"><i class="material-icons">delete</i></span></li>').text(noteTitle))
        $('.note-title').val('')
        $('.note-textarea').val('')
    } 
})
})
 $(document).on('click', 'remove', function(){

 })