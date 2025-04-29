package com.osd.web.app.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Board_PostDto;

@Repository
public class Board_PostDao {

    @Autowired
    private SqlSession session;

    public List<Board_PostDto> selectCunsultPostListByKeywordAndPage(String keyword, int page, int limit) {
        Map<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("keyword", keyword);
        parameterMap.put("page", page);
        parameterMap.put("limit", limit);
        return session.selectList("Board_Post.selectCunsultPostListByKeywordAndPage", parameterMap);
    }

    public Board_PostDto selectCunsultPostById(int post_id) {
        return session.selectOne("Board_Post.selectCunsultPostById", post_id);
    }

    // community ==================================================

    public Board_PostDto selectCommunityPostById(int post_id) {
        return session.selectOne("Board_Post.selectCommunityPostById", post_id);
    }

    public List<Board_PostDto> selectCommunityPostListByKeywordAndPage(String keyword, int page, int limit) {
        Map<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("keyword", keyword);
        parameterMap.put("page", page);
        parameterMap.put("limit", limit);
        return session.selectList("Board_Post.selectCommunityPostListByKeywordAndPage", parameterMap);
    }

    public List<Board_PostDto> selectCommunityPostListByTypeAndKeywordAndPage(int type_id, String keyword, int page, int limit) {
        Map<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("type_id", type_id);
        parameterMap.put("keyword", keyword);
        parameterMap.put("page", page);
        parameterMap.put("limit", limit);
        return session.selectList("Board_Post.selectCommunityPostListByTypeAndKeywordAndPage", parameterMap);
    }


}
