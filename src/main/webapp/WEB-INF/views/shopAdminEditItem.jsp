<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <!DOCTYPE html>
        <html lang="ko" dir="ltr">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <title>쇼핑몰</title>

            <script src="${pageContext.request.contextPath}/js/shopAdminEditItem.js"></script>

        </head>

        <body>

            항목 선택

            <br>
            <input type="button" value="제품" onclick="changeField('product')">
            <input type="button" value="품목" onclick="changeField('item')">
            <input type="button" value="그룹" onclick="changeField('group')">
            <input type="button" value="카테고리" onclick="changeField('category')">



            <select>
                <option>항목 1</option>
                <option>항목 2</option>
                <option>항목 3</option>
                <option>항목 4</option>
            </select>


            <div id="fieldContainer"></div>

            <input type="button" id = "applyChangesButton" value="적용" onclick="">
        </body>

        <!-- 임시 스타일 태그 -->
        <style>
            .item {
                display: table;
                border-collapse: collapse;
            }

            .item.row {
                display: table-row;
            }

            .item.row>div {
                display: table-cell;
                border: 1px solid #ccc;
                padding: 4px;
                /* width: 120px; */
            }
        </style>