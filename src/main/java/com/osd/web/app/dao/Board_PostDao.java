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

    public List<Board_PostDto> selectCunsultPostByKeywordAndPage(String keyword, int page, int limit) {
        Map<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("keyword", keyword);
        parameterMap.put("page", page);
        parameterMap.put("limit", limit);
        return session.selectList("Board_Post.selectCunsultPostByKeywordAndPage", parameterMap);
    }

}
