package com.osd.web.app.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

import com.osd.web.app.dto.Board_CommentDto;
import com.osd.web.app.dto.Board_PostDto;
import com.osd.web.app.dto.Community_CommentDto;
import com.osd.web.app.dto.Community_Comment_LikeDto;
import com.osd.web.app.dto.Community_PostDto;
import com.osd.web.app.dto.Community_Post_LikeDto;
import com.osd.web.app.dto.Community_TypeDto;
import com.osd.web.app.service.CommunityService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RequestMapping("/community")
@Controller
public class CommunityBoardController {

    @Autowired
    private CommunityService communityService;

    @RequestMapping("/")
    public String communityPage() {
        return "redirect:/community/list";
    }

    @RequestMapping("")
    public String communityPage2() {
        return "redirect:/community/";
    }

    @RequestMapping("/list")
    public String communityListPage() {
        return "communityList";
    }

    @ResponseBody
    @PostMapping("/getPostListByKeywordAndPage")
    public Map<String, Object> getCommunityList(@RequestBody Map<String, Object> parameterMap) {
        Map<String, Object> resultMap = new HashMap<>();
        int status = 0;
        // List<Board_PostDto> list = new ArrayList<>();

        String keyword = (String) parameterMap.get("keyword");
        int page = (int) parameterMap.get("page");

        // 페이지당 글 개수
        int limit = 10;

        // 전체 글 개수
        int postCount = communityService.getPostCountByKeyword(keyword);

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

        List<Board_PostDto> list = communityService.getPostListByKeywordAndPage(keyword, page, limit);

        int count = postCount;
        resultMap.put("list", list);
        resultMap.put("count", count);
        resultMap.put("limit", limit);
        resultMap.put("maxPage", maxPage);

        return resultMap;
    }

    @ResponseBody
    @PostMapping("/getCommunityType")
    public Map<String, Object> getCommunityType() {
        Map<String, Object> resultMap = new HashMap<>();

        List<Community_TypeDto> list = communityService.getTypeList();

        resultMap.put("list", list);

        return resultMap;
    }

    // 게시글 분류
    @ResponseBody
    @PostMapping("/getPostListByTypeAndKeywordAndPage")
    public Map<String, Object> getCommunityListByType(@RequestBody Map<String, Object> parameterMap) {
        Map<String, Object> resultMap = new HashMap<>();
        int status = 0;
        // List<Board_PostDto> list = new ArrayList<>();

        String keyword = (String) parameterMap.get("keyword");
        int page = (int) parameterMap.get("page");
        int type_id = (int) parameterMap.get("type_id");

        // 페이지당 글 개수
        int limit = 10;

        // 전체 글 개수
        int postCount = communityService.getPostCountByTypeAndKeyword(type_id, keyword);

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

        List<Board_PostDto> list = communityService.getPostListByTypeAndKeywordAndPage(type_id, keyword, page, limit);

        int count = postCount;
        resultMap.put("type_id", type_id);
        resultMap.put("list", list);
        resultMap.put("count", count);
        resultMap.put("limit", limit);
        resultMap.put("maxPage", maxPage);

        return resultMap;
    }

    @ResponseBody
    @PostMapping("/setRownumSession")
    public Map<String, Object> setRownumSession(HttpServletRequest request,
            @RequestBody Community_PostDto community_PostDto) {
        Map<String, Object> resultMap = new HashMap<>();

        int type_id = community_PostDto.getType_id();
        int post_id = community_PostDto.getPost_id();
        int rownum = communityService.getPostRownumByTypeAndId(type_id, post_id);

        resultMap.put("rownum", rownum);

        HttpSession session = request.getSession();
        session.setAttribute("post_rownum", rownum);
        session.setAttribute("post_type", type_id);

        return resultMap;
    }

    @ResponseBody
    @PostMapping("/getRownumSession")
    public Map<String, Object> getRownumSession(HttpServletRequest request) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpSession session = request.getSession();
        int status = 0;

        int rownum = 0;
        if (session.getAttribute("post_rownum") == null) {
            status = -201;
            resultMap.put("status", status);
            return resultMap;
        }
        rownum = (int) session.getAttribute("post_rownum");
        resultMap.put("rownum", rownum);

        if (session.getAttribute("post_type") == null) {
            status = -202;
            resultMap.put("status", status);
            return resultMap;
        }
        int type_id = (int) session.getAttribute("post_type");
        resultMap.put("type_id", type_id);

        status = 1;
        resultMap.put("rownum", rownum);
        resultMap.put("status", status);

        session.setAttribute("post_rownum", null);

        return resultMap;
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

        // 조회수 업데이트
        communityService.updatePostViewcnt(post_id);

        Board_PostDto board_PostDto = communityService.getBoardById(post_id);

        int liked = 0;
        if (login_user_id != null && !login_user_id.equals("")) {
            Community_Post_LikeDto community_Post_LikeDto = new Community_Post_LikeDto();
            community_Post_LikeDto.setPost_id(post_id);
            community_Post_LikeDto.setUser_id(login_user_id);
            liked = communityService.checkPostLiked(community_Post_LikeDto);
        }

        // 작성 시간 포맷
        LocalDateTime post_created_at = board_PostDto.getPost_created_at();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        String formatted = post_created_at.format(formatter);
        model.addAttribute("postCreatedAt", formatted);
        model.addAttribute("liked", liked);
        model.addAttribute("community_post", board_PostDto);

        return "communityRead";
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

    @RequestMapping("/modify")
    public String communityModifyPage(HttpServletRequest request,
            @RequestParam(required = true, defaultValue = "0", name = "post_id") int post_id, Model model) {

        HttpSession session = request.getSession();
        String login_user_id = (String) session.getAttribute("login_user_id");

        // 글 번호 오류
        Community_PostDto community_PostDto = communityService.getPostById(post_id);
        if (community_PostDto == null) {
            return "redirect:/none";
        }

        // 세션 X
        if (login_user_id == null || login_user_id == "") {
            return "redirect:/wrongPath";
        }

        // 세션과 작성자 불일치
        if (!community_PostDto.getUser_id().equals(login_user_id)) {
            return "redirect:/wrongPath";
        }

        model.addAttribute("community_post", community_PostDto);

        return "communityModify";
    }

    @ResponseBody
    @PostMapping("/modifyCommunityPost")
    public Map<String, Object> modifyCommunityPost(HttpServletRequest request,
            @RequestBody Community_PostDto community_PostDto) {
        Map<String, Object> resultMap = new HashMap<>();
        int status = 0;

        HttpSession session = request.getSession();
        String login_user_id = (String) session.getAttribute("login_user_id");
        if (login_user_id == null || login_user_id.equals("")) {
            status = -1;
            resultMap.put("status", status);
            return resultMap;
        }

        if (community_PostDto == null) {
            status = -101;
            resultMap.put("status", status);
            return resultMap;
        }

        int post_id = community_PostDto.getPost_id();
        Community_PostDto community_PostFromDb = communityService.getPostById(post_id);
        if (!login_user_id.equals(community_PostFromDb.getUser_id())) {
            status = -2;
            resultMap.put("status", status);
            return resultMap;
        }

        int updated = communityService.updatePost(community_PostDto);
        if (updated != 1) {
            status = -301;
            resultMap.put("status", status);
            return resultMap;
        }

        status = updated;
        resultMap.put("status", status);
        resultMap.put("updated", updated);

        return resultMap;
    }

    // ================================================== 댓글

    @ResponseBody
    @PostMapping("/postComment")
    public Map<String, Object> postCommunityComment(HttpServletRequest request,
            @RequestBody Community_CommentDto community_CommentDto) {
        Map<String, Object> resultMap = new HashMap<>();
        int status = 0;

        HttpSession session = request.getSession();
        String login_user_id = (String) session.getAttribute("login_user_id");

        // 로그인 세션 확인
        if (login_user_id == null || login_user_id.equals("")) {
            status = -1;
            resultMap.put("status", status);
            return resultMap;
        }

        // 로그인 정보 불일치
        String user_id = community_CommentDto.getUser_id();
        if (!user_id.equals(login_user_id)) {
            status = -2;
            resultMap.put("status", status);
            return resultMap;
        }

        int inserted = communityService.insertComment(community_CommentDto);
        if (inserted == 0) {
            status = -201;
            resultMap.put("status", status);
            return resultMap;
        }

        // 댓글 카운트
        int post_id = community_CommentDto.getPost_id();
        int updated = communityService.plusCmtcnt(post_id);

        status = inserted;

        resultMap.put("status", status);

        return resultMap;
    }

    @ResponseBody
    @PostMapping("/getCommentListByPost")
    public Map<String, Object> getCommentListByPost(@RequestBody int post_id) {
        Map<String, Object> resultMap = new HashMap<>();

        List<Board_CommentDto> list = communityService.getCommentByPost(post_id);

        resultMap.put("list", list);

        return resultMap;
    }

    // 좋아요 누른 댓글 리스트
    @ResponseBody
    @PostMapping("/getCommentMyLike")
    public Map<String, Object> getCommentMyLike(HttpServletRequest request, @RequestBody int post_id) {
        Map<String, Object> resultMap = new HashMap<>();

        int status = 0;

        HttpSession session = request.getSession();

        if (session.getAttribute("login_user_id") == null
                || ((String) session.getAttribute("login_user_id")).equals("")) {
            status = -1;
            resultMap.put("status", status);
            return resultMap;
        }

        String user_id = (String) session.getAttribute("login_user_id");

        Map<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("user_id", user_id);
        parameterMap.put("post_id", post_id);

        List<Community_Comment_LikeDto> list = communityService.getCommentMyLike(parameterMap);

        resultMap.put("list", list);

        return resultMap;
    }

    // 댓글 수정
    @ResponseBody
    @PostMapping("/updateComment")
    public Map<String, Object> updateComment(HttpServletRequest request,
            @RequestBody Community_CommentDto community_CommentDto) {
        Map<String, Object> resultMap = new HashMap<>();
        int status = 0;

        // 로그인 정보 없음
        HttpSession session = request.getSession();
        String login_user_id = (String) session.getAttribute("login_user_id");
        if (login_user_id == null || login_user_id.equals("")) {
            status = -1;
            resultMap.put("status", status);
            return resultMap;
        }
        community_CommentDto.setUser_id(login_user_id);

        int updated = communityService.updateCommentByIdAndUser(community_CommentDto);

        if (updated != 1) {
            status = -301;
            resultMap.put("status", status);
            return resultMap;
        }
        if (updated == 1) {
            status = 1;
        }
        resultMap.put("status", status);

        return resultMap;
    }

    // 댓글 삭제
    @ResponseBody
    @PostMapping("/deleteComment")
    public Map<String, Object> deleteComment(HttpServletRequest request,
            @RequestBody Community_CommentDto community_CommentDto) {
        Map<String, Object> resultMap = new HashMap<>();
        int status = 0;

        // 로그인 정보 없음
        HttpSession session = request.getSession();
        String login_user_id = (String) session.getAttribute("login_user_id");
        if (login_user_id == null || login_user_id.equals("")) {
            status = -1;
            resultMap.put("status", status);
            return resultMap;
        }

        community_CommentDto.setUser_id(login_user_id);

        int deleted = communityService.deleteCommentByIdAndUser(community_CommentDto);
        if (deleted == 0) {
            status = -301;
            resultMap.put("status", status);
            return resultMap;
        }
        status = deleted;

        if (deleted == 1) {
            // 대댓글 없음, 좋아요 삭제
        }

        // 게시글 정보 댓글 수 감소
        int post_id = community_CommentDto.getPost_id();
        communityService.minusCmtcnt(post_id);

        resultMap.put("status", status);

        return resultMap;
    }

    // 좋아요
    @ResponseBody
    @PostMapping("/postLike")
    public int likePost(@RequestBody Map<String, Object> requestMap, HttpServletRequest request) {
        int result = 0;

        int post_id = (int) requestMap.get("post_id");
        int like = (int) requestMap.get("like");

        HttpSession session = request.getSession();

        if (session.getAttribute("login_user_id") == null
                || ((String) session.getAttribute("login_user_id")).equals("")) {
            result = -1;
            return result;
        }

        String user_id = (String) session.getAttribute("login_user_id");
        Community_Post_LikeDto community_Post_LikeDto = new Community_Post_LikeDto();
        community_Post_LikeDto.setPost_id(post_id);
        community_Post_LikeDto.setUser_id(user_id);

        if (like == 1) {
            result = communityService.insertLike(community_Post_LikeDto);
        } else if (like == -1) {
            result = communityService.deleteLike(community_Post_LikeDto);
        }

        return result;
    }

    // 댓글 좋아요
    @ResponseBody
    @PostMapping("/postLikeComment")
    public int postLikeComment(HttpServletRequest request, @RequestBody Map<String, Object> requestMap) {
        int result = 0;

        int cmt_id = (int) requestMap.get("cmt_id");
        int like = (int) requestMap.get("like");

        HttpSession session = request.getSession();

        if (session.getAttribute("login_user_id") == null
                || ((String) session.getAttribute("login_user_id")).equals("")) {
            result = -1;
            return result;
        }

        String user_id = (String) session.getAttribute("login_user_id");
        Community_Comment_LikeDto community_Comment_LikeDto = new Community_Comment_LikeDto();
        community_Comment_LikeDto.setCmt_id(cmt_id);
        community_Comment_LikeDto.setUser_id(user_id);

        if (like == 1) {
            result = communityService.insertCommentLike(community_Comment_LikeDto);
        } else if (like == -1) {
            result = communityService.deleteCommentLike(community_Comment_LikeDto);
        }
        return result;
    }

}
