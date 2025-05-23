document.addEventListener("DOMContentLoaded", function () {


});


$('#summernote').summernote({
    placeholder: '글을 작성해주세요.',
    tabsize: 2,
    height: 300,
    minHeight: null,  // 최소 높이
    maxHeight: null,  // 최대 높이
    focus: true, // 에디터 로딩후 포커스를 맞출지 여부( true, false )
    lang: "ko-KR",    // 한글 설정
    toolbar: [
        ['style', ['style']],
        ['font', ['bold', 'underline', 'clear']],
        ['color', ['color']],
        ['insert', ['picture']],
    ],
    styleTags: ['p', 'h1', 'h2', 'h3', 'blockquote'],
    callbacks: {
        onImageUpload: function (files, editor, welEditable) {
            for (var i = 0; i < files.length; i++) {
                imageUploader(files[i], this);
            }
        }
    }

});

function imageUploader(file, el) {
    var formData = new FormData();
    formData.append('file', file);

    $.ajax({
        data: formData,
        type: "POST",
        // url 이미지 업로드 처리 컨트롤러 경로
        url: '/file/uploadBoardImage',
        contentType: false,
        processData: false,
        enctype: 'multipart/form-data',
        success: function (data) {

            // 파일 생성이 완료되는데 대략 4초
            $(".spinner-border").css("display", "inline-block");
            setTimeout(function () {
                $(".spinner-border").css("display", "none");
                $(el).summernote('editor.insertImage', "/img/upload/" + data);
            }, 4000);
        }
    });
}

function getUsedImageList() {
    let usedImages = [];
    let content = $('#summernote').summernote('code');

    // DOMParser로 HTML 문자열 파싱
    let parser = new DOMParser();
    let doc = parser.parseFromString(content, 'text/html');

    // 이미지 태그를 모두 찾고
    let imgTags = doc.querySelectorAll('img');

    imgTags.forEach(img => {
        let src = img.getAttribute('src');
        // 폴더 경로
        if (src && src.startsWith('/img/upload/')) {
            // 파일명만 추출
            let fileName = src.split('/').pop();
            usedImages.push(fileName);
        }
    });

    return usedImages;
}

function getMarkupStr() {
    let markupStr = $('#summernote').summernote('code');
    return markupStr;
}