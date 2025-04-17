$('#summernote').summernote({
    placeholder: '글을 작성해주세요.',
    tabsize: 2,
    height: 500,
    minHeight: null,  // 최소 높이
    maxHeight: null,  // 최대 높이
    focus: true, // 에디터 로딩후 포커스를 맞출지 여부( true, false )
    lang: "ko-KR",    // 한글 설정
    toolbar: [

        ['font', ['bold', 'underline', 'clear']],
        ['color', ['color']],
        ['insert', ['picture']]

    ],

    callbacks: {
        onImageUpload: function (files, editor, welEditable) {
            for (var i = 0; i < files.length; i++) {
                imageUploader(files[i], this);
            }
        }
    }

});

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

function getMarkupStr(){
    let markupStr = $('#summernote').summernote('code');
    return markupStr;
}