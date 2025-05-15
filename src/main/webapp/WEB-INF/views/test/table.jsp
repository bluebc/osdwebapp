<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <!DOCTYPE html>
    <html lang="ko" dir="ltr">

    </html>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>

    </head>

    <body>

        table test

        <table border="1">

            <tr>
                <td>
                    td1
                </td>
                <td colspan="2">
                    td2
                </td>

                <td>
                    td4
                </td>
            </tr>

            <tr>
                <td>
                    td1
                </td>
                <td>
                    td2
                </td>
                <td>
                    td3
                </td>
                <td rowspan="1">
                    td4
                </td>
            </tr>

            <tr>
                <td>
                    td1
                </td>
                <td>
                    td2
                </td>
                <td>
                    td3
                </td>
                <td>
                    td3
                </td>

            </tr>

        </table>




        <br>
        <br>

        <br>

        <br>

        제작 목표

        <table border="1">
            <tr>
                <th>품목</th>
                <th>가격</th>
                <th>제품</th>
            </tr>
            <tr>
                <td>품목1</td>
                <td>100</td>
                <td>제품1</td>
            </tr>
            <tr>
                <td rowspan="3">
                    품목 2
                </td>
                <td rowspan="3">200</td>
                <td>
                    <select>
                        <option>제품1</option>
                        <option>제품2</option>
                        <option>제품3</option>
                    </select>
                    <input type="number" id="quantity" min="1" max="100" value="1">
                </td>
            </tr>
            <!-- id값 ??? -->
            <tr>
                <td>
                    <select>
                        <option>제품1</option>
                        <option>제품2</option>
                        <option>제품3</option>
                    </select>
                    <input type="number" id="quantity" min="1" max="100" value="1">
                </td>
            </tr>
            <tr>
                <td><input type="button" value="추가" onclick=""></td>
            </tr>
            <tr>
                <td>품목3</td>
                <td>150</td>
                <td>제품3</td>
            </tr>
        </table>

        <br>
        <br>
        <br>
        <br>
        <br>

        <div name="table3">
            <div>
                <div>품목</div>
                <div>가격</div>
                <div>제품</div>
            </div>
            <div>
                <div>품목1</div>
                <div>100</div>
                <div>제품1</div>
            </div>
            <div name="row1">
                <div rowspan="3">
                    품목 2
                </div>
                <div>200</div>
                <div>
                    <div>
                        <select>
                            <option>제품1</option>
                            <option>제품2</option>
                            <option>제품3</option>
                        </select>
                        <input type="number" id="quantity" min="1" max="100" value="1">
                    </div>
                    <div>
                        <select>
                            <option>제품1</option>
                            <option>제품2</option>
                            <option>제품3</option>
                        </select>
                        <input type="number" id="quantity" min="1" max="100" value="1">
                    </div>
                </div>
            </div>
        </div>

        <style>
            [name="table3"] {
                display: table;
                border-collapse: collapse;
                width: 100%;
                border: 1px solid #ccc;
            }

            [name="table3"]>div {
                display: table-row;
            }

            [name="table3"]>div>div {
                display: table-cell;
                border: 1px solid #ccc;
                padding: 8px;
                vertical-align: middle;
                text-align: center;
            }

            select,
            input[type="number"] {
                margin: 4px 0;
            }
        </style>

<br>
<br>
<br>
<br>


<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

<select id="searchable-select" style="width: 200px;">
  <option value="1">사과</option>
  <option value="2">바나나</option>
  <option value="3">포도</option>
  <option value="4">딸기</option>
</select>

<script>
  $(document).ready(function() {
    $('#searchable-select').select2();
  });
</script>

<br>
<br>
<br>
<br>

<br>
<br>
<br>
<br>

<br>
<br>
<br>
<br>


    </body>