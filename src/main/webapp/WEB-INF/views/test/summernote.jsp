<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko" dir="ltr">
<head>
    <title>오생단</title>


 <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.9.0/dist/summernote-lite.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/summernote@0.9.0/dist/summernote-lite.min.js"></script>
    <%-- <link href="summernote.css" rel="stylesheet"> --%>
<%-- <script src="summernote.min.js"></script> --%>

<!-- include summernote-ko-KR -->
<script src="/js/summernote/lang/summernote-ko-KR.js"></script>

</head>
<body>

 <div id="summernote">
 <%-- <textarea id = "summernote"></textarea> --%>
 </div>
    <%-- <script>
      $('#summernote').summernote({
        placeholder: 'Hello stand alone ui',
        tabsize: 2,
        height: 1200,
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'underline', 'clear']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['table', ['table']],
          ['insert', ['link', 'picture', 'video']],
          ['view', ['fullscreen', 'codeview', 'help']]
        ]
      });
    </script> --%>
        <script>
      $('#summernote').summernote({
        placeholder: 'Hello stand alone ui',
        tabsize: 2,
        height: 1200,
        toolbar: [

          ['font', ['bold', 'underline', 'clear']],
          ['color', ['color']],
          ['insert', [ 'picture']]
       
        ]
      });



function text(){
    var markupStr = $('#summernote').summernote('code');
    // var text = document.getElementById("summernote").value;
    alert(markupStr);
}


//$(document).ready(function() {
//$('#summernote').summernote({
//lang: 'ko-KR' // default: 'en-US'
//});
//});

    </script>


<div>

<input type = "button" value = "글 내용" onclick = "text()">
<script>

</script>
</div>

</body>
</html>