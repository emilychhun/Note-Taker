$(document).ready(function(){
   $('form').submit(function(e)
   {e.preventDefault();
    let noteTitle = $('note-title').val();
    $.ajax({
        url: "/api/notes",
        data: {
            text : noteTitle
         },
         method :"POST",
         contentType: "application/x-www-form-urlencoded",
         success : function(res){
             alert(res.form)
         }, error : function(err){
             console.log(err);
         }
    })

   })
});