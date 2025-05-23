package com.osd.web.app.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
import com.osd.web.app.dto.Community_PostDto;
import com.osd.web.app.dto.Cunsult_CommentDto;
import com.osd.web.app.dto.Cunsult_Comment_LikeDto;
import com.osd.web.app.dto.Cunsult_PostDto;
import com.osd.web.app.dto.Cunsult_Post_LikeDto;
import com.osd.web.app.dto.User_InfoDto;
import com.osd.web.app.service.CunsultService;
import com.osd.web.app.service.LoginService;
import com.osd.web.app.service.User_InfoService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RequestMapping("/cunsult")
@Controller
public class CunsultBoardController {

    @Autowired
    private CunsultService cunsultService;

    @Autowired
    private User_InfoService user_InfoService;

    @RequestMapping("/write")
    public String cunsultWritePage(HttpServletRequest request, Model model) {

        HttpSession session = request.getSession();

        String user_id = (String) session.getAttribute("login_user_id");
        model.addAttribute("user_id", user_id);

        return "cunsultWrite";
    }

    @RequestMapping("/list")
    public String cunsultListPage() {

        return "cunsultList";
    }

    @ResponseBody
    @PostMapping("/postCunsultPost")
    public Map<String, Object> postCunsultPost(@RequestBody Cunsult_PostDto cunsult_PostDto) {
        Map<String, Object> resultMap = new HashMap<>();

        // 줄내림 처리
        cunsult_PostDto.setPost_content(cunsult_PostDto.getPost_content().replace("\n", "<br>"));

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

        List<Board_PostDto> list = cunsultService.getCunsultPostListByKeywordAndPage(keyword, page, limit);

        int count = postCount;
        resultMap.put("list", list);
        resultMap.put("count", count);
        resultMap.put("limit", limit);
        resultMap.put("maxPage", maxPage);

        return resultMap;
    }

    @RequestMapping("/read")
    public String cunsultReadPage(@RequestParam(required = true, defaultValue = "0", name = "post_id") int post_id,
            HttpServletRequest request,
            Model model) {

        Board_PostDto board_PostDto = cunsultService.getPostById(post_id);
        if (board_PostDto == null) {
            return "redirect:/wrongPath";
        }

        // 조회 수 업데이트
        int viewcntUpdated = cunsultService.updateViewcnt(post_id);

        // 좋아요 여부 확인
        int liked = 0;

        HttpSession session = request.getSession();
        String login_user_id = (String) session.getAttribute("login_user_id");
        if (login_user_id != null && !login_user_id.equals("")) {
            Cunsult_Post_LikeDto cunsult_Post_LikeDto = new Cunsult_Post_LikeDto();
            cunsult_Post_LikeDto.setPost_id(post_id);
            cunsult_Post_LikeDto.setUser_id(login_user_id);
            liked = cunsultService.checkPostLiked(cunsult_Post_LikeDto);
        }

        User_InfoDto login_user_Info = user_InfoService.getUser_InfoById(login_user_id);

        if (login_user_Info != null) {
            String login_user_nickname = login_user_Info.getUser_nickname();
            model.addAttribute("login_user_nickname", login_user_nickname);
        }

        model.addAttribute("cunsult_post", board_PostDto);
        model.addAttribute("liked", liked);
        model.addAttribute("login_user_id", login_user_id);

        LocalDateTime post_created_at = board_PostDto.getPost_created_at();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        String formatted = post_created_at.format(formatter);
        model.addAttribute("postCreatedAt", formatted);

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
    public Map<String, Object> modifyCunsultPost(HttpServletRequest request,
            @RequestBody Cunsult_PostDto cunsult_PostDto) {
        Map<String, Object> resultMap = new HashMap<>();

        int status = 0;

        HttpSession session = request.getSession();
        String login_user_id = (String) session.getAttribute("login_user_id");
        if (login_user_id == null || login_user_id.equals("")) {
            status = -1;
            resultMap.put("status", status);
            return resultMap;
        }
        if (cunsult_PostDto == null) {
            status = -101;
            resultMap.put("status", status);
            return resultMap;
        }

        int post_id = cunsult_PostDto.getPost_id();
        Board_PostDto cunsult_PostFromDb = cunsultService.getPostById(post_id);
        if (!login_user_id.equals(cunsult_PostFromDb.getUser_id())) {
            status = -2;
            resultMap.put("status", status);
            return resultMap;
        }

        int updated = cunsultService.updateCunsultPost(cunsult_PostDto);
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

    // 글 읽기 화면에서 페이지 목록 이동
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

    // 글 읽기 화면에서 페이지 목록 이동
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
        Cunsult_Post_LikeDto cunsult_Post_LikeDto = new Cunsult_Post_LikeDto();
        cunsult_Post_LikeDto.setPost_id(post_id);
        cunsult_Post_LikeDto.setUser_id(user_id);

        if (like == 1) {
            result = cunsultService.insertLike(cunsult_Post_LikeDto);
        } else if (like == -1) {
            result = cunsultService.deleteLike(cunsult_Post_LikeDto);
        }

        return result;
    }

    @Autowired
    private LoginService loginService;

    // 댓글
    @ResponseBody
    @PostMapping("/postComment")
    public Map<String, Object> postComment(HttpServletRequest request,
            @RequestBody Cunsult_CommentDto cunsult_CommentDto) {
        Map<String, Object> resultMap = new HashMap<>();
        // 코드 미실행
        int status = 0;
        // -1 로그인 오류
        // 객체 정보 오류
        // -100
        // -200 절차 순 ++
        // DB 오류
        // -300

        Map<String, Object> loginSessionInfo = loginService.getLoginSessionInfo(request);
        String login_user_id = (String) loginSessionInfo.get("login_user_id");
        // 로그인 세션 확인
        if (login_user_id == null || login_user_id.equals("")) {
            status = -1;
            resultMap.put("status", status);
            return resultMap;
        }
        String user_id = cunsult_CommentDto.getUser_id();
        if (!user_id.equals(login_user_id)) {
            status = -2;
            resultMap.put("status", status);
            return resultMap;
        }

        int inserted = cunsultService.insertComment(cunsult_CommentDto);
        if (inserted == 0) {
            status = -201;
            resultMap.put("status", status);
            return resultMap;
        }

        // 댓글 카운트
        int post_id = cunsult_CommentDto.getPost_id();
        int updated = cunsultService.plusChildcnt(post_id);

        status = inserted;

        resultMap.put("status", status);

        return resultMap;
    }

    @ResponseBody
    @PostMapping("/getCommentListByPost")
    public Map<String, Object> getCommentListByPost(@RequestBody int post_id) {
        Map<String, Object> resultMap = new HashMap<>();

        // List<Cunsult_CommentDto> list = cunsultService.getCommentByPost(post_id);
        List<Board_CommentDto> list = cunsultService.getCommentByPost(post_id);

        resultMap.put("list", list);

        return resultMap;
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
        Cunsult_Comment_LikeDto cunsult_Comment_LikeDto = new Cunsult_Comment_LikeDto();
        cunsult_Comment_LikeDto.setCmt_id(cmt_id);
        cunsult_Comment_LikeDto.setUser_id(user_id);

        if (like == 1) {
            result = cunsultService.insertCommentLike(cunsult_Comment_LikeDto);
        } else if (like == -1) {
            result = cunsultService.deleteCommentLike(cunsult_Comment_LikeDto);
        }
        return result;
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

        List<Cunsult_Comment_LikeDto> list = cunsultService.getCommentMyLike(parameterMap);

        resultMap.put("list", list);

        return resultMap;
    }

    // 댓글 수정
    @ResponseBody
    @PostMapping("/updateComment")
    public Map<String, Object> updateComment(HttpServletRequest request,
            @RequestBody Cunsult_CommentDto cunsult_CommentDto) {
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
        cunsult_CommentDto.setUser_id(login_user_id);

        int updated = cunsultService.updateCommentByIdAndUser(cunsult_CommentDto);

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
            @RequestBody Cunsult_CommentDto cunsult_CommentDto) {
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

        cunsult_CommentDto.setUser_id(login_user_id);

        int deleted = cunsultService.deleteCommentByIdAndUser(cunsult_CommentDto);
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
        int post_id = cunsult_CommentDto.getPost_id();
        cunsultService.minusChildcnt(post_id);

        resultMap.put("status", status);

        return resultMap;
    }

}
