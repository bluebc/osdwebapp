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

import com.osd.web.app.dto.Board_InfoDto;
import com.osd.web.app.service.BoardService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class BoardController {

    @Autowired
    private BoardService boardService;

    @RequestMapping("/boardwrite")
    public String testBoardWritePage(HttpServletRequest request, Model model) {

        HttpSession session = request.getSession();
        String user_id = (String) session.getAttribute("login_user_id");

        model.addAttribute("user_id", user_id);

        return "boardWrite";
    }

    @ResponseBody
    @PostMapping("/postBoard")
    public Map<String, Object> testPostBoard(@RequestBody Board_InfoDto board_InfoDto) {
        Map<String, Object> result = new HashMap<>();
        int code = 0;

        Board_InfoDto board_InfoFromDb = boardService.insertBoard(board_InfoDto);
        if (board_InfoFromDb != null) {
            result.put("board_info", board_InfoFromDb);
            code = 1;
        }

        result.put("code", code);

        return result;
    }

    @RequestMapping("/boardread")
    public String boardReadPage(@RequestParam(required = true, defaultValue = "0", name = "board_no") int board_no,
            Model model) {

        Board_InfoDto board_InfoFromDb = boardService.getBoardByNo(board_no);
        if (board_InfoFromDb == null) {
            return "redirect:/wrongPath";
        }

        model.addAttribute("board_info", board_InfoFromDb);

        return "boardRead";
    }

    // 수정 페이지
    @RequestMapping("/boardmodify")
    public String boardModifyPage(
            HttpServletRequest request,
            @RequestParam(required = true, defaultValue = "0", name = "board_no") int board_no, Model model) {

        HttpSession session = request.getSession();

        Board_InfoDto board_InfoFromDb = boardService.getBoardByNo(board_no);

        // 글 정보 없음
        if (board_InfoFromDb == null) {
            return "redirect:/wrongPath";
        }
        // 세션 정보 불일치
        if (!board_InfoFromDb.getUser_id().equals((String) session.getAttribute("login_user_id"))) {
            return "redirect:/wrongPath";
        }

        model.addAttribute("board_info", board_InfoFromDb);

        return "boardModify";
    }

    @ResponseBody
    @PostMapping("/postModifiedBoard")
    public Map<String, Object> modifyBoard(@RequestBody Board_InfoDto board_InfoDto) {
        Map<String, Object> result = new HashMap<>();
        int code = 0;

        Board_InfoDto board_InfoFromDb = boardService.updateBoard(board_InfoDto);
        if (board_InfoFromDb != null) {
            result.put("board_info", board_InfoFromDb);
            code = 1;
        }

        result.put("code", code);

        return result;
    }

    // 리스트
    @RequestMapping("/boardlist")
    public String boardListPage(@RequestParam(name = "page", defaultValue = "1") int page, Model model) {

        int limit = 10;
        int boardCount = boardService.getBoardCount();
        int maxPage = boardCount / limit;
        if (boardCount % limit > 0) {
            maxPage += 1;
        }

        if (page < 1) {
            page = 1;
            return "redirect:/boardlist?page=" + String.valueOf(page);
        }
        if (page > maxPage) {
            page = maxPage;
            return "redirect:/boardlist?page=" + String.valueOf(page);
        }

        List<Board_InfoDto> boardList = boardService.getBoardList(limit, page);

        model.addAttribute("boardList", boardList);
        model.addAttribute("currentPage", page);
        model.addAttribute("boardCount", boardCount);
        model.addAttribute("maxPage", maxPage);

        return "boardList";
    }

    @ResponseBody
    @PostMapping("/getListPage")
    public Map<String, Object> getListPage(@RequestBody Map<String, Object> requestMap) {
        Map<String, Object> result = new HashMap<>();
        int board_no = (int) requestMap.get("board_no");

        Board_InfoDto board_InfoDto = new Board_InfoDto();
        board_InfoDto.setBoard_no(board_no);
        int rownum = boardService.selectRownumByNo(board_InfoDto);

        int limit = 10;
        int page = rownum / limit;
        if (rownum % limit > 0) {
            page += 1;
        }

        result.put("page", page);
        result.put("board_no", board_no);

        return result;
    }

    // 삭제
    @ResponseBody
    @PostMapping("/deleteBoard")
    public Map<String, Object> deleteBoard(HttpServletRequest request, @RequestBody Board_InfoDto board_InfoDto) {
        Map<String, Object> result = new HashMap<>();
        int code = 0;

        // 오류 1. 게시물 정보 없음
        if (board_InfoDto == null) {
            code = -1;
            result.put("code", code);
            return result;
        }

        // 오류 2. 세션 정보 없음
        HttpSession session = request.getSession();
        String login_user_id = (String) session.getAttribute("login_user_id");
        if (login_user_id == null) {
            code = -2;
            result.put("code", code);
            return result;
        }

        // 오류 3. 게시물 작성자와 로그인 정보 불일치
        String board__user_id = board_InfoDto.getUser_id();
        if (!login_user_id.equals(board__user_id)) {
            code = -3;
            result.put("code", code);
            return result;
        }

        // 오류 4. DB 삭제 실패
        // int deleted = boardService.deleteBoard(board_InfoDto);
        int deleted = boardService.updateBoardDeleted(board_InfoDto);
        if (deleted != 1) {
            code = -4;
            result.put("code", code);
            return result;
        }

        code = deleted;
        result.put("code", code);
        return result;
    }

}
