
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
        getAllNote();
    } 
})
})

$('.list-group').on('click', '.remove', function(e){

    let rowEl = $(this).closest('li');
    let id = rowEl.attr('id');
 
    console.log("id" + id);

   $.ajax({
    url: "/api/notes/" +id,
    type: "DELETE",

success: function(res){
    console.log("success", res);
   $(rowEl).fadeOut()
} 
})
})

var getAllNote = function()
{

    $('.list-group').empty();

    let noteTitle = $('.note-title').val();
    let noteTextarea = $('.note-textarea').val();


    $.ajax({
        url:'/api/notes',
        type: 'GET',
        data:{
            noteTitle: noteTitle,
            noteTextarea: noteTextarea,
    }, 
    success: function(res){

       for (var i = 0; i < res.length; i++) {
            $('.list-group').append($(`<li id=${res[i].id} class='note-icon'>${res[i].noteTitle} <i class ='fas fa-trash remove'</i> </li>`));
     
            $('.note-title').val('');
            $('.note-textarea').val('');
      
        }

        } 
})
};

getAllNote();