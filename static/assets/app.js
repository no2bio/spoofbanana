function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#img-preview').css("background","url('" +
		e.target.result + "') 50% 50% no-repeat");
         }
        reader.readAsDataURL(input.files[0]);
    }
}

$(function() {
  $("#image").change(function(){
    readURL(this);
  });
});
