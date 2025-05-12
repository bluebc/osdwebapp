<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <!DOCTYPE html>
        <html lang="ko" dir="ltr">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <title>쇼핑몰</title>
        </head>

        <body>

            관리자 페이지

            <input type = "button" value = "판매글 편집" onclick = "goWritePostPage()">
            <input type = "button" value = "제품 편집" onclick = "goEditProductPage()">
            <input type = "button" value = "품목 편집" onclick = "goEditItemPage()">
            <input type = "button" value = "그룹 편집" onclick = "goEditGroupPage()">
            <input type = "button" value = "카테고리 편집" onclick = "goEditCategoryPage()">
            

        </body>