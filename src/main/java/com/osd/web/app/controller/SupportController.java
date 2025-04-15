package com.osd.web.app.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.osd.web.app.dto.Faq_CategoryDto;
import com.osd.web.app.dto.Faq_ListDto;
import com.osd.web.app.dto.Qna_PostDto;
import com.osd.web.app.dto.User_InfoDto;
import com.osd.web.app.service.FaqService;
import com.osd.web.app.service.QnaService;
import com.osd.web.app.service.User_InfoService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RequestMapping("/support")
@Controller
public class SupportController {

    @Autowired
    private FaqService faqService;
    @Autowired
    private QnaService qnaService;
    @Autowired
    private User_InfoService user_InfoService;

    @RequestMapping("")
    public String supportPage(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();

        String login_user_id;
         if(session.getAttribute("login_user_id")!=null){
            login_user_id = (String) session.getAttribute("login_user_id");
         }


        return "support";
    }

    @RequestMapping("/")
    public String supportPage2() {
        return "redirect:/support";
    }

    @RequestMapping("/faq")
    public String faqPage() {
        return "supportFaq";
    }

    @ResponseBody
    @PostMapping("/faq/getFaqListByCateIdAndKeyword")
    public List<Faq_ListDto> getFaqListByCateIdAndKeyword(@RequestBody Map<String, Object> parameterMap) {
        int cate_id = (int) parameterMap.get("cate_id");
        String keyword = (String) parameterMap.get("keyword");
        List<Faq_ListDto> list = faqService.getFaqListByCateIdAndKeyword(cate_id, keyword);
        return list;
    }

    // ========================================

    @ResponseBody
    @PostMapping("/faq/getFaqCategory")
    public List<Faq_CategoryDto> getCategoryList() {
        List<Faq_CategoryDto> list = faqService.getCategoryList();
        return list;
    }

    @RequestMapping("/faq/write")
    public String faqWritePage(HttpServletRequest request) {

        // 관리자 권한 확인
        try {
            HttpSession session = request.getSession();
            String user_id = (String) session.getAttribute("login_user_id");

            User_InfoDto user_InfoDto = new User_InfoDto();
            user_InfoDto.setUser_id(user_id);
            User_InfoDto user_InfoFromDb = user_InfoService.getUser_InfoById(user_InfoDto);
            String user_role = user_InfoFromDb.getUser_role();
            if (!user_role.equals("ADMIN")) {
                return "redirect:/wrongPath";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "redirect:/wrongPath";
        }

        // 관리자 권한 확인 로직 필요

        return "supportFaqWrite";
    }

    @ResponseBody
    @PostMapping("/faq/insertFaqList")
    public Map<String, Object> insertFaqList(HttpServletRequest request, @RequestBody Faq_ListDto faq_ListDto) {

        Map<String, Object> resultMap = new HashMap<>();

        // 관리자 권한 확인
        try {
            HttpSession session = request.getSession();
            String user_id = (String) session.getAttribute("login_user_id");

            User_InfoDto user_InfoDto = new User_InfoDto();
            user_InfoDto.setUser_id(user_id);
            User_InfoDto user_InfoFromDb = user_InfoService.getUser_InfoById(user_InfoDto);
            String user_role = user_InfoFromDb.getUser_role();
            if (!user_role.equals("ADMIN")) {
                return resultMap;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return resultMap;
        }

        int inserted = faqService.insertFaqList(faq_ListDto);
        resultMap.put("inserted", inserted);
        return resultMap;
    }

    // ========================================

    @RequestMapping("/faq/list")
    public String faqListPage() {
        return "supportFaqList";
    }

    // QNA

    @RequestMapping("/qna")
    public String qnaPage() {

        return "supportQna";
    }

    @ResponseBody
    @PostMapping("/qna/getQnaPostByKeywordAndPage")
    public Map<String, Object> getQnaPostByKeywordAndPage(@RequestBody Map<String, Object> parameterMap) {
        Map<String, Object> resultMap = new HashMap<>();

        String keyword = (String) parameterMap.get("keyword");
        int page = (int) parameterMap.get("page");

        // 페이지당 글 개수
        int limit = 10;

        // 전체 글 개수
        int postCount = qnaService.getQnaPostCountByKeyword(keyword);

        int maxPage = postCount / limit;
        if (postCount % limit > 0) {
            maxPage += 1;
        }

        if (page < 1) {
            page = 1;

        }
        if (page > maxPage) {
            page = maxPage;
        }

        List<Qna_PostDto> list = qnaService.getQnaPostByKeywordAndPage(keyword, page, limit);
        int count = postCount;
        resultMap.put("list", list);
        resultMap.put("count", count);
        resultMap.put("limit", limit);
        resultMap.put("maxPage", maxPage);

        return resultMap;
    }

    @RequestMapping("/qna/write")
    public String supportQnaWritePage(HttpServletRequest request, Model model) {

        HttpSession session = request.getSession();
        String user_id = (String) session.getAttribute("login_user_id");

        model.addAttribute("user_id", user_id);

        return "supportQnaWrite";
    }

    @ResponseBody
    @PostMapping("/qna/postQnaPost")
    public Map<String, Object> postQnaPost(@RequestBody Qna_PostDto qna_PostDto) {
        Map<String, Object> resultMap = new HashMap<>();
        int inserted = 0;

        Qna_PostDto qna_PostDtoFromDb = qnaService.insertQnaPost(qna_PostDto);

        if (qna_PostDtoFromDb != null) {
            inserted = 1;
            resultMap.put("qna_post", qna_PostDtoFromDb);
        }

        resultMap.put("inserted", inserted);
        return resultMap;
    }

    @RequestMapping("/qna/read")
    public String qnaReadPage(@RequestParam(required = true, defaultValue = "0", name = "post_id") int post_id,
            Model model) {

        Qna_PostDto qna_PostDtoFromDb = qnaService.getQnaPostById(post_id);
        if (qna_PostDtoFromDb == null) {
            return "redirect:/wrongPath";
        }

        model.addAttribute("qna_post", qna_PostDtoFromDb);

        return "supportQnaRead";
    }

    @RequestMapping("/qna/list")
    public String qnaListPage() {
        return "supportQnaList";
    }

    @RequestMapping("/qna/modify")
    public String qnaModifyPage() {
        return "supportQnaModify";
    }

}