const list = [];

function imageUploader(file, el) {
	var formData = new FormData();
	formData.append('file', file);

	// const contextPath = '${pageContext.request.contextPath}';

	$.ajax({
		data: formData,
		type: "POST",
		// url은 자신의 이미지 업로드 처리 컨트롤러 경로로 설정해주세요.
		url: '/file/uploadBoardImage',
		contentType: false,
		processData: false,
		enctype: 'multipart/form-data',
		success: function (data) {
			list.push(data);
			// $(el).summernote('insertImage', "${pageContext.request.contextPath}/img/upload/"+data, function($image) {
			// 	$image.css('width', "100%");
			// });
			// $(el).summernote('insertImage', '/img/upload/' + data, function ($image) {
			// 	$image.css('width', "100%");
			// });
			//파일 생성이 완료되는데 대략 4초가 걸려서 4초를 주고 사용자에게 업로드중인걸 알리기위해 스피너를 사용했다. (좋은 방법 아님)
			$(".spinner-border").css("display","inline-block");
			setTimeout(function() {
				$(".spinner-border").css("display","none");
				$(el).summernote('editor.insertImage', "/img/upload/" + data);
			}, 4000);



			// 값이 잘 넘어오는지 콘솔 확인 해보셔도됩니다.
			console.log(data);
		}
	});
}