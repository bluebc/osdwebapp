package com.osd.web.app.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Community_Post_LikeDto;

@Repository
public class Community_Post_LikeDao {

    @Autowired
    private SqlSession session;

    public int insert(Community_Post_LikeDto community_Post_LikeDto) {
        return session.insert("Community_Post_Like.insert", community_Post_LikeDto);
    }

    public int delete(Community_Post_LikeDto community_Post_LikeDto) {
        return session.delete("Community_Post_Like.delete", community_Post_LikeDto);
    }

    public int selectByPostAndUser(Community_Post_LikeDto community_Post_LikeDto) {
        return session.selectOne("Community_Post_Like.selectByPostAndUser", community_Post_LikeDto);
    }

}
