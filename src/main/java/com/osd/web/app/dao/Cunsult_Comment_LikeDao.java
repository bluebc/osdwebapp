package com.osd.web.app.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Cunsult_Comment_LikeDto;

@Repository
public class Cunsult_Comment_LikeDao {

    @Autowired
    private SqlSession session;

    public int insert(Cunsult_Comment_LikeDto cunsult_Comment_LikeDto){
        return session.insert("Cunsult_Comment_Like.insert", cunsult_Comment_LikeDto);
    }
    public int delete(Cunsult_Comment_LikeDto cunsult_Comment_LikeDto){
        return session.delete("Cunsult_Comment_Like.delete", cunsult_Comment_LikeDto);
    }
    public int selectByCommentAndUser(Cunsult_Comment_LikeDto cunsult_Comment_LikeDto){
        return session.selectOne("Cunsult_Comment_Like.selectByCommentAndUser", cunsult_Comment_LikeDto);
    }

}
