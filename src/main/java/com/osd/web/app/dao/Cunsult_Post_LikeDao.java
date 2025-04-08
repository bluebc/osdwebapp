package com.osd.web.app.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Cunsult_Post_LikeDto;

@Repository
public class Cunsult_Post_LikeDao {

    @Autowired
    private SqlSession session;

    public int insert(Cunsult_Post_LikeDto cunsult_Post_LikeDto){
        return session.insert("Cunsult_Post_Like.insert", cunsult_Post_LikeDto);
    }
    public int delete(Cunsult_Post_LikeDto cunsult_Post_LikeDto){
        return session.delete("Cunsult_Post_Like.delete", cunsult_Post_LikeDto);
    }

    public int selectByPostAndUser(Cunsult_Post_LikeDto cunsult_Post_LikeDto){
        return session.selectOne("Cunsult_Post_Like.selectByPostAndUser", cunsult_Post_LikeDto);
    }

}
