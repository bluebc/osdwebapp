package com.osd.web.app.controller;

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

import com.osd.web.app.dto.Cunsult_PostDto;
import com.osd.web.app.dto.Qna_PostDto;
import com.osd.web.app.service.CunsultService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RequestMapping("/cunsult")
@Controller
public class CunsultBoardController {

    @Autowired
    private CunsultService cunsultService;

    @RequestMapping("/write")
    public String cunsultWritePage(HttpServletRequest request, Model model) {

        HttpSession session = request.getSession();
        String user_id = (String) session.getAttribute("login_user_id");
        model.addAttribute("user_id", user_id);

        return "cunsultWrite";
    }

    @RequestMapping("/list")
    // int => Integer (int null 허용 X)
    // public String cunsultListPage(@RequestParam(required = false, name = "post_id") Integer post_id, Model model) {
    public String cunsultListPage(){

        // if (post_id == null) {
        //     post_id = 0;
        // }

        // model.addAttribute("post_id", post_id);

        return "cunsultList";
    }

    @ResponseBody
    @PostMapping("/postCunsultPost")
    public Map<String, Object> postCunsultPost(@RequestBody Cunsult_PostDto cunsult_PostDto) {
        Map<String, Object> resultMap = new HashMap<>();

        Cunsult_PostDto cunsult_PostFromDb = cunsultService.insertCunsultPost(cunsult_PostDto);

        resultMap.put("cunsult_post", cunsult_PostFromDb);

        return resultMap;
    }

    @ResponseBody
    @PostMapping("/getCunsultPostByKeywordAndPage")
    public Map<String, Object> getCunsultPostByKeywordAndPage(@RequestBody Map<String, Object> parameterMap) {
        Map<String, Object> resultMap = new HashMap<>();

        String keyword = (String) parameterMap.get("keyword");
        int page = (int) parameterMap.get("page");

        // 페이지당 글 개수
        int limit = 10;

        // 전체 글 개수
        int postCount = cunsultService.getCunsultPostCountByKeyword(keyword);

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

        List<Cunsult_PostDto> list = cunsultService.getCunsultPostByKeywordAndPage(keyword, page, limit);
        int count = postCount;
        resultMap.put("list", list);
        resultMap.put("count", count);
        resultMap.put("limit", limit);
        resultMap.put("maxPage", maxPage);

        return resultMap;
    }

    @RequestMapping("/read")
    public String cunsultReadPage(@RequestParam(required = true, defaultValue = "0", name = "post_id") int post_id,
            Model model) {

        Cunsult_PostDto cunsult_PostDtoFromDb = cunsultService.getCunsultPostById(post_id);
        if (cunsult_PostDtoFromDb == null) {
            return "redirect:/wrongPath";
        }

        model.addAttribute("cunsult_post", cunsult_PostDtoFromDb);

        return "cunsultRead";
    }

    @RequestMapping("/modify")
    public String cunsultModifyPage(HttpServletRequest request,
            @RequestParam(required = true, defaultValue = "0", name = "post_id") int post_id, Model model) {

        // 글 번호 오류
        Cunsult_PostDto cunsult_PostDto = cunsultService.getCunsultPostById(post_id);
        if (cunsult_PostDto == null) {
            return "redirect:/wrongPath";
        }

        HttpSession session = request.getSession();
        String login_user_id = (String) session.getAttribute("login_user_id");

        // 세션 X
        if (login_user_id == null || login_user_id == "") {
            return "redirect:/wrongPath";
        }

        // 세션과 작성자 불일치
        if (!cunsult_PostDto.getUser_id().equals(login_user_id)) {
            return "redirect:/wrongPath";
        }

        model.addAttribute("cunsult_post", cunsult_PostDto);

        return "cunsultModify";
    }

    @ResponseBody
    @PostMapping("/modifyCunsultPost")
    public Map<String, Object> modifyCunsultPost(@RequestBody Cunsult_PostDto cunsult_PostDto) {
        Map<String, Object> resultMap = new HashMap<>();

        int updated = cunsultService.updateCunsultPost(cunsult_PostDto);

        resultMap.put("updated", updated);

        return resultMap;
    }

    @ResponseBody
    @PostMapping("/deleteCunsultPost")
    public Map<String, Object> deleteCunsultPost(HttpServletRequest request,
            @RequestBody Cunsult_PostDto cunsult_PostDto) {
        Map<String, Object> resultMap = new HashMap<>();
        int deleted = 0;
        resultMap.put("deleted", deleted);

        HttpSession session = request.getSession();
        String login_user_id = (String) session.getAttribute("login_user_id");

        // 로그인 정보 불일치
        if (!login_user_id.equals(cunsult_PostDto.getUser_id())) {
            return resultMap;
        }

        deleted = cunsultService.deleteCunsultPost(cunsult_PostDto);

        resultMap.put("deleted", deleted);

        return resultMap;
    }

    // @ResponseBody
    // @PostMapping("/getRownumById")
    // public Map<String, Object> getRownumById(@RequestBody Cunsult_PostDto cunsult_PostDto) {
    //     Map<String, Object> resultMap = new HashMap<>();

    //     int rownum = cunsultService.getRownumById(cunsult_PostDto);
    //     resultMap.put("rownum", rownum);

    //     return resultMap;
    // }

    @ResponseBody
    @PostMapping("/setRownumSession")
    public Map<String, Object> setRownumSession(HttpServletRequest request,
            @RequestBody Cunsult_PostDto cunsult_PostDto) {
        Map<String, Object> resultMap = new HashMap<>();

        int rownum = cunsultService.getRownumById(cunsult_PostDto);
        resultMap.put("rownum", rownum);

        HttpSession session = request.getSession();
        session.setAttribute("post_rownum", rownum);

        return resultMap;
    }

    @ResponseBody
    @PostMapping("/getRownumSession")
    public Map<String, Object> getRownumSession(HttpServletRequest request) {
        Map<String, Object> resultMap = new HashMap<>();

        HttpSession session = request.getSession();

        int rownum = 0;
        if (session.getAttribute("post_rownum") != null) {
            rownum = (int) session.getAttribute("post_rownum");
        }

        resultMap.put("rownum", rownum);

        session.setAttribute("post_rownum", null);

        return resultMap;
    }

}
