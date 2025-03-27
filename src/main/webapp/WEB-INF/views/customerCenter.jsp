<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>


<!DOCTYPE html>
<html lang="ko" dir="ltr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>고객센터</title>

    <!-- css -->
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/customerCenter.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
        integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
        crossorigin="anonymous" />

    <!--favicon--->
    <link href="img/favicon.ico" rel="icon">

    <!--js-->
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>

    <script src = "${pageContext.request.contextPath}/js/customerCenter.js"></script>



</head>
<body>


<!-- header -->
<jsp:include page="header.jsp"></jsp:include>
    
<div class="container">
    <div class="content">
        <div class="basic-type">
            <%-- pc --%>
            <div class="pc-type">
                <h1>자주 찾는 질문</h1>
            </div>
            <%-- mobile --%>
            <div class="mobil-type">
                <div class="tit-wrap">
                    <a href="/" class="btn-back">
                        <i class="hidden">닫기</i>
                    </a> 
                    <h1 class="header-sub-tit">자주 찾는 질문</h1>
                </div>
                <div class="header-util">
                    <a href="/" class="btn-home">
                        <img src="img/홈.svg" alt="home">
                    </a> 
                </div>
            </div>
        </div>

        <div class="section-cont">
            <div class="form-area">
                <span class="search">
                        <input type="text" placeholder="검색어를 입력하세요" class="tf">
                        <button type="button" class="btn-search"><span class="hidden">검색</span></button>
                </span>
            </div>

            <div class="faq-category">
            
                <div class="tab_but"  role="tablist">
                    <button  class="all tab-button" role="tab" aria-controls="all"  tabindex="0">전체</button>
                    <button  class="tab-button" role="tab" aria-controls="tab-content-1"  tabindex="0">교환/환불</button>
                    <button  class="tab-button" role="tab" aria-controls="tab-content-2"  tabindex="0">주문</button>
                    <button  class="tab-button" role="tab" aria-controls="tab-content-3"  tabindex="0">배송</button>
                    <button  class="tab-button" role="tab" aria-controls="tab-content-4"  tabindex="0">제품</button>
                </div>  
                
                <div class="tab_area list">
                    <div class="tab-content" id="tab-content-1" role="tabpanel" >
                        <div class="faq-box">
                            <div class="faq-question">
                                <strong class="faq-tit">Q</strong>
                                <div>
                                    <span class="faq-subject">[교환/환불]</span>
                                    <span class="faq-tet">상품을 교환/반품하고 싶어요.</span>
                                </div>
                            </div>

                            <div class="faq-answer">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="50px" valign="top">
                                                <strong class="faq-tit">A</strong>
                                            </td>
                                            <td valign="top">
                                                <div class="faq-tet">
                                                    <p>
                                                        <span>교환 및 반품은 사용하지 않은 상품에 한하여 가능하며, 고객님께서 직접 쉽고 빠르게 교환/반품을 신청할 수 있습니다. 상품을 회수한 후 검수 단계에서 문제가 발견되면 고객님께
                                                            연락을 드릴 수 있습니다. 교환은 기본적으로 구매 상품과 동일한 상품으로만 가능합니다. 색상 및 사이즈 변경을 원하시면 반품 후 재구매를 해 주시기 바랍니다.</span>
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>    

                        <div class="faq-box">
                            <div class="faq-question">
                                <strong class="faq-tit">Q</strong>
                                <div>
                                    <span class="faq-subject">[교환/환불]</span>
                                    <span class="faq-tet">상품을 교환/반품하고 싶어요.</span>
                                </div>
                            </div>

                            <div class="faq-answer">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="50px" valign="top">
                                                <strong class="faq-tit">A</strong>
                                            </td>
                                            <td valign="top">
                                                <div class="faq-tet">
                                                    <p>
                                                        <span>교환 및 반품은 사용하지 않은 상품에 한하여 가능하며, 고객님께서 직접 쉽고 빠르게 교환/반품을 신청할 수 있습니다. 상품을 회수한 후 검수 단계에서 문제가 발견되면 고객님께
                                                            연락을 드릴 수 있습니다. 교환은 기본적으로 구매 상품과 동일한 상품으로만 가능합니다. 색상 및 사이즈 변경을 원하시면 반품 후 재구매를 해 주시기 바랍니다.</span>
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>    

                        <div class="faq-box">
                                <div class="faq-question">
                                    <strong class="faq-tit">Q</strong>
                                    <div>
                                        <span class="faq-subject">[교환/환불]</span>
                                        <span class="faq-tet">상품을 교환/반품하고 싶어요.</span>
                                    </div>
                                </div>
                                <div class="faq-answer">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td width="50px" valign="top">
                                                    <strong class="faq-tit">A</strong>
                                                </td>
                                                <td valign="top">
                                                    <div class="faq-tet">
                                                        <p>교환 및 반품 절차는 고객님의 요청에 따라 진행됩니다. 고객센터를 통해 교환 신청을 하시면 빠르게 처리됩니다.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                        </div>
                    </div>
                    
                    <div class="tab-content" id="tab-content-2" role="tabpanel" >
                        <div class="faq-box">
                            <div class="faq-question">
                                <strong class="faq-tit">Q</strong>
                                <div>
                                    <span class="faq-subject">[주문]</span>
                                    <span class="faq-tet">주문한 내역은 어디에서 확인하나요?</span>
                                </div>
                            </div>

                            <div class="faq-answer">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="50px" valign="top">
                                                <strong class="faq-tit">A</strong>
                                            </td>
                                            <td valign="top">
                                                <div class="faq-tet">
                                                    <p><span>주문 내역은 주문목록에서 직접 확인할 수 있습니다.</span>
                                                        </p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>    
                    </div>

                    <div class="tab-content" id="tab-content-3" role="tabpanel" >
                        <div class="faq-box">
                            <div class="faq-question">
                                <strong class="faq-tit">Q</strong>
                                <div>
                                    <span class="faq-subject">[배송]</span>
                                    <span class="faq-tet">질문</span>
                                </div>
                            </div>

                            <div class="faq-answer">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="50px" valign="top">
                                                <strong class="faq-tit">A</strong>
                                            </td>
                                            <td valign="top">
                                                <div class="faq-tet">
                                                    <p><span>주문 내역은 주문목록에서 직접 확인할 수 있습니다.</span>
                                                        </p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>    
                    </div>

                    <div class="tab-content" id="tab-content-4" role="tabpanel" >
                        <div class="faq-box">
                            <div class="faq-question">
                                <strong class="faq-tit">Q</strong>
                                <div>
                                    <span class="faq-subject">[제품]</span>
                                    <span class="faq-tet">질문</span>
                                </div>
                            </div>

                            <div class="faq-answer">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width="50px" valign="top">
                                                <strong class="faq-tit">A</strong>
                                            </td>
                                            <td valign="top">
                                                <div class="faq-tet">
                                                    <p><span>주문 내역은 주문목록에서 직접 확인할 수 있습니다.</span>
                                                        </p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>    
                    </div>


                    <div class="paging type-more">
                        <button type="button" id="load">
                            <span>더보기<img src="../img/arrowdown.svg"></span>
                        </button>
                    </div>

                </div>

            </div>

        </div>

        
    </div>
</div>


<!-- footer -->
<jsp:include page="footer.jsp"></jsp:include>    
</body>
</html>    