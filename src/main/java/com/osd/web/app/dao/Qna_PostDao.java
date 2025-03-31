package com.osd.web.app.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Qna_PostDto;

@Repository
public class Qna_PostDao {

    @Autowired
    private SqlSession session;

    public int insert(Qna_PostDto qna_PostDto) {
        return session.insert("Qna_Post.insert", qna_PostDto);
    }

    public Qna_PostDto selectBySubjectAndContentAndUserIdAndCreated(Qna_PostDto qna_PostDto) {
        return session.selectOne("Qna_Post.selectBySubjectAndContentAndUserIdAndCreated", qna_PostDto);
    }

    public Qna_PostDto selectById(Qna_PostDto qna_PostDto) {
        return session.selectOne("Qna_Post.selectById", qna_PostDto);
    }

    public Qna_PostDto selectById(int post_id) {
        Qna_PostDto qna_PostDto = new Qna_PostDto();
        qna_PostDto.setPost_id(post_id);
        return selectById(qna_PostDto);
    }

    public List<Qna_PostDto> selectByKeyword(String keyword){
        Map<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("keyword", keyword);
        return session.selectList("Qna_Post.selectByKeyword", parameterMap);
    }
    public List<Qna_PostDto> selectByKeywordAndPage(String keyword, int page, int limit){
        Map<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("keyword", keyword);
        parameterMap.put("page", page);
        parameterMap.put("limit", limit);
        return session.selectList("Qna_Post.selectByKeywordAndPage", parameterMap);
    }
}
