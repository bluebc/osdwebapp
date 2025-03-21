package com.osd.web.app.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.osd.web.app.dao.Board_InfoDao;
import com.osd.web.app.dto.Board_InfoDto;

@Service
public class BoardService {

    @Autowired
    private Board_InfoDao board_InfoDao;

    public Board_InfoDto insertBoard(Board_InfoDto board_InfoDto) {
        int result = 0;

        LocalDateTime board_created_at = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        board_InfoDto.setBoard_created_at(board_created_at);
        board_InfoDto.setBoard_updated_at(board_created_at);

        result = board_InfoDao.insert(board_InfoDto);

        Board_InfoDto board_InfoFromDb = new Board_InfoDto();
        if (result == 1) {
            board_InfoFromDb = board_InfoDao.selectByIdAndTitleAndCreated(board_InfoDto);
        }

        return board_InfoFromDb;
    }

    public Board_InfoDto getBoardByNo(int board_no) {
        return board_InfoDao.selectByNo(board_no);
    }

    public Board_InfoDto updateBoard(Board_InfoDto board_InfoDto) {
        LocalDateTime board_updated_at = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        board_InfoDto.setBoard_updated_at(board_updated_at);

        int updated = board_InfoDao.update(board_InfoDto);
        Board_InfoDto board_InfoFromDb = new Board_InfoDto();
        if (updated == 1) {
            board_InfoFromDb = board_InfoDao.selectByNo(board_InfoDto);
        }
        return board_InfoFromDb;
    }

    public List<Board_InfoDto> getBoardList(int limit, int page) {

        return board_InfoDao.selectAllList(limit, page);
    }

    public int getBoardCount() {
        return board_InfoDao.selectCountAll();
    }
    public int deleteBoard(Board_InfoDto board_InfoDto){
        return board_InfoDao.deleteBoard(board_InfoDto);
    }

}