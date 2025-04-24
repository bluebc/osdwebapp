package com.osd.web.app.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Community_Comment_LikeDto;

@Repository
public class Community_Comment_LikeDao {

    @Autowired
    private SqlSession session;

    public int insert(Community_Comment_LikeDto community_Comment_LikeDto){
        return session.insert("Community_Comment_Like.insert", community_Comment_LikeDto);
    }
    public int delete(Community_Comment_LikeDto community_Comment_LikeDto){
        return session.delete("Community_Comment_Like.delete", community_Comment_LikeDto);
    }
    public int selectByCommentAndUser(Community_Comment_LikeDto community_Comment_LikeDto){
        return session.selectOne("Community_Comment_Like.selectByCommentAndUser", community_Comment_LikeDto);
    }
    public List<Community_Comment_LikeDto> selectByUserAndIdByPost(Map<String, Object> parameterMap){
        return session.selectList("Community_Comment_Like.selectByUserAndIdByPost", parameterMap);
    }


}
