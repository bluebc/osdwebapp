package com.osd.web.app.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Board_PostDto;
import com.osd.web.app.dto.Community_PostDto;

@Repository
public class Community_PostDao {

    @Autowired
    private SqlSession session;

    public int insert(Community_PostDto community_PostDto) {
        return session.insert("Community_Post.insert", community_PostDto);
    }

    // after Insert
    public Community_PostDto selectBySubjectAndUserAndCreated(Community_PostDto community_PostDto) {
        return session.selectOne("Community_Post.selectBySubjectAndUserAndCreated", community_PostDto);
    }

    public int updateViewcnt(int post_id) {
        return session.update("Community_Post.updateViewcnt", post_id);
    }

    public int deleteById(int post_id) {
        return session.delete("Community_Post.deleteById", post_id);
    }

    public Community_PostDto selectById(int post_id) {
        return session.selectOne("Community_Post.selectById", post_id);
    }

    public int updateContent(Community_PostDto community_PostDto) {
        return session.update("Community_Post.update", community_PostDto);
    }

    public int plusCmtcnt(int post_id) {
        return session.update("Community_Post.plusCmtcnt", post_id);
    }

    public int minusCmtcnt(int post_id) {
        return session.update("Community_Post.minusCmtcnt", post_id);
    }

    public int plusLikecnt(int post_id) {
        return session.update("Community_Post.plusLikecnt", post_id);
    }

    public int minusLikecnt(int post_id) {
        return session.update("Community_Post.minusLikecnt", post_id);
    }

    public int selectCountByKeyword(String keyword) {
        return session.selectOne("Community_Post.selectCountByKeyword", keyword);
    }

    public List<Board_PostDto> selectByKeywordAndPage(String keyword, int page, int limit) {
        Map<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("keyword", keyword);
        parameterMap.put("page", page);
        parameterMap.put("limit", limit);
        return session.selectList("Board_Post.selectCommunityPostListByKeywordAndPage", parameterMap);
    }
}
