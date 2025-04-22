package com.osd.web.app.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.osd.web.app.dto.Board_PostDto;
import com.osd.web.app.dto.Community_PostDto;
import com.osd.web.app.service.CommunityService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RequestMapping("/community")
@Controller
public class CommunityBoardController {

    @Autowired
    private CommunityService communityService;

    @RequestMapping("/list")
    public String communityListPage() {
        return "communityList";
    }

    @RequestMapping("/write")
    public String communityWritePage(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        String login_user_id = (String) session.getAttribute("login_user_id");

        // 로그인 정보 없으면 로그인 화면으로 이동
        if (login_user_id == null || login_user_id.equals("")) {
            return "redirect:/login";
        }

        model.addAttribute("user_id", login_user_id);

        return "communityWrite";
    }

    @ResponseBody
    @PostMapping("/postCommunityPost")
    public Map<String, Object> postCommunityPost(HttpServletRequest request,
            @RequestBody Community_PostDto community_PostDto) {
        Map<String, Object> resultMap = new HashMap<>();
        int status = 0;

        HttpSession session = request.getSession();
        String login_user_id = (String) session.getAttribute("login_user_id");

        // 로그인 정보 없음
        if (login_user_id == null || login_user_id.equals("")) {
            status = -1;
            resultMap.put("status", status);
            return resultMap;
        }
        String post_user_id = community_PostDto.getUser_id();
        // 게시글 정보 로그인 정보 불일치
        if (post_user_id == null || !post_user_id.equals(login_user_id)) {
            status = -2;
            resultMap.put("status", status);
            return resultMap;
        }

        Community_PostDto community_PostFromDb = communityService.insertPost(community_PostDto);

        if (community_PostFromDb == null) {
            status = -301;
            resultMap.put("status", status);
            return resultMap;
        }

        resultMap.put("community_post", community_PostFromDb);
        status = 1;
        resultMap.put("status", status);

        return resultMap;
    }

    @RequestMapping("/read")
    public String communityReadPage(@RequestParam(required = true, defaultValue = "0", name = "post_id") int post_id,
            HttpServletRequest request,
            Model model) {

        HttpSession session = request.getSession();
        String login_user_id = (String) session.getAttribute("login_user_id");
        if (login_user_id != null) {
            model.addAttribute("login_user_id", login_user_id);
        }

        // 글 존재 여부 확인
        Community_PostDto community_PostDto = communityService.getPostById(post_id);
        if (community_PostDto == null) {
            return "redirect:/community/none";
        }

        communityService.updatePostViewcnt(post_id);

        Board_PostDto board_PostDto = communityService.getBoardById(post_id);

        // 작성 시간 포맷
        LocalDateTime post_created_at = board_PostDto.getPost_created_at();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        String formatted = post_created_at.format(formatter);
        model.addAttribute("postCreatedAt", formatted);

        model.addAttribute("community_post", board_PostDto);

        return "communityRead";
    }

    @ResponseBody
    @PostMapping("/deleteCommunityPost")
    public Map<String, Object> deletePost(HttpServletRequest request,
            @RequestBody Community_PostDto community_PostDto) {
        Map<String, Object> resultMap = new HashMap<>();
        int status = 0;

        HttpSession session = request.getSession();
        String login_user_id = (String) session.getAttribute("login_user_id");

        // 로그인
        if (login_user_id == null || login_user_id.equals("")) {
            status = -1;
            resultMap.put("status", status);
            return resultMap;
        }

        int post_id = community_PostDto.getPost_id();
        String post_user_id = community_PostDto.getUser_id();

        // 로그인 ID = 글 작성자
        Community_PostDto community_PostFromDb = communityService.getPostById(post_id);
        if (!post_user_id.equals(community_PostFromDb.getUser_id())) {
            status = -100;
            resultMap.put("status", status);
            return resultMap;
        }

        // 삭제
        int deleted = communityService.deletePostById(post_id);
        if (deleted != 1) {
            status = -300;
            resultMap.put("status", status);
            return resultMap;
        }

        status = deleted;

        resultMap.put("status", status);
        return resultMap;
    }

    @RequestMapping("/none")
    public String communityNonePage() {
        return "communityNone";
    }

}
