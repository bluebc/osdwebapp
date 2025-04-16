<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko" dir="ltr">
<head>
    <title>오생단</title>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>


	<link href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet">
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
	
	<!-- include summernote css/js -->
	<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">
	<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>

<script src="/js/test/summernote.js"></script>
<%-- ================================================ --%>

 <%-- <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.9.0/dist/summernote-lite.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/summernote@0.9.0/dist/summernote-lite.min.js"></script> --%>


<%-- =================================================================== --%>
    <%-- <link href="summernote.css" rel="stylesheet"> --%>
<%-- <script src="summernote.min.js"></script> --%>


<%-- =================================================================== --%>

<!-- include summernote-ko-KR -->
<%-- <script src="/js/summernote/lang/summernote-ko-KR.js"></script>
 --%>

<%-- =================================================================== --%>



<%-- <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script> --%>
<%-- =================================================================== --%>
</head>
<body>

 <%-- <div id="summernote"> --%>
 <%-- <textarea id = "summernote"></textarea> --%>
 <%-- </div> --%>
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

<form method="post">
  <textarea id="summernote" name="editordata"></textarea>
</form>

        <script>

 //const contextPath = '${pageContext.request.contextPath}';



      $('#summernote').summernote({
        placeholder: 'Hello stand alone ui',
        tabsize: 2,
        height: 500,
        toolbar: [

          ['font', ['bold', 'underline', 'clear']],
          ['color', ['color']],
          ['insert', [ 'picture']]
       
        ],


callbacks : {                                                    
			onImageUpload : function(files, editor, welEditable) {   
                // 다중 이미지 처리를 위해 for문을 사용했습니다.
				for (var i = 0; i < files.length; i++) {
					imageUploader(files[i], this);
				}
			}
		}

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