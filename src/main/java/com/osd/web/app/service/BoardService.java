package com.osd.web.app.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.osd.web.app.dao.Board_InfoDao;
import com.osd.web.app.dto.Board_InfoDto;

@Service
public class BoardService {

    @Autowired
    private Board_InfoDao board_InfoDao;

    public int insertBoard(Board_InfoDto board_InfoDto) {
        int result = 0;

        LocalDateTime board_created_at = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        board_InfoDto.setBoard_created_at(board_created_at);
        board_InfoDto.setBoard_updated_at(board_created_at);

        board_InfoDao.insert(board_InfoDto);
        return result;
    }

}