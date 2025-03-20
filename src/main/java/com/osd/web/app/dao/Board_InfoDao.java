package com.osd.web.app.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Board_InfoDto;

@Repository
public class Board_InfoDao {
    
private SqlSession session;

public int insert(Board_InfoDto board_InfoDto){
    return session.insert("Board_Info.insert", board_InfoDto);
}


}
