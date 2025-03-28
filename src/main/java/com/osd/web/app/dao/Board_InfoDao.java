package com.osd.web.app.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Board_InfoDto;

@Repository
public class Board_InfoDao {

    @Autowired
    private SqlSession session;

    public int insert(Board_InfoDto board_InfoDto) {
        return session.insert("Board_Info.insert", board_InfoDto);
    }

    public Board_InfoDto selectByNo(int board_no) {
        return session.selectOne("Board_Info.selectByNo", board_no);
    }

    public Board_InfoDto selectByNo(Board_InfoDto board_InfoDto) {
        return selectByNo(board_InfoDto.getBoard_no());
    }

    public Board_InfoDto selectByIdAndTitleAndCreated(Board_InfoDto board_InfoDto) {
        return session.selectOne("Board_Info.selectByIdAndTitleAndCreated", board_InfoDto);
    }

    public int update(Board_InfoDto board_InfoDto) {
        return session.update("Board_Info.update", board_InfoDto);
    }

    public List<Board_InfoDto> selectAllList(int limit, int page) {
        Map<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("limit", limit);
        parameterMap.put("page", page);
        // return session.selectList("Board_Info.selectAllList", parameterMap);
        return session.selectList("Board_Info.selectNotDeletedList", parameterMap);
    }

    public int selectCountAll() {
        return session.selectOne("Board_Info.selectCountAll");
    }

    public int deleteBoard(Board_InfoDto board_InfoDto) {
        return session.delete("Board_Info.delete", board_InfoDto);
    }

    public int deleteBoard(int board_no) {
        Board_InfoDto board_InfoDto = new Board_InfoDto();
        board_InfoDto.setBoard_no(board_no);
        return deleteBoard(board_InfoDto);
    }

    public int updateDeleted(Board_InfoDto board_InfoDto) {
        return session.update("Board_Info.updateDeleted", board_InfoDto);
    }

    public int selectRownumByNo(Board_InfoDto board_InfoDto) {
        return session.selectOne("Board_Info.selectRownumByNo", board_InfoDto);
    }
}
