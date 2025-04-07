package com.osd.web.app.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Cunsult_PostDto;

@Repository
public class Cunsult_PostDao {

    @Autowired
    private SqlSession session;

    public int insert(Cunsult_PostDto cunsult_PostDto) {
        return session.insert("Cunsult_Post.insert", cunsult_PostDto);
    }

    public Cunsult_PostDto selectBySubjectAndContentAndUserIdAndCreated(Cunsult_PostDto cunsult_PostDto) {
        return session.selectOne("Cunsult_Post.selectBySubjectAndContentAndUserIdAndCreated", cunsult_PostDto);
    }

    public Cunsult_PostDto selectById(Cunsult_PostDto cunsult_PostDto) {
        return session.selectOne("Cunsult_Post.selectById", cunsult_PostDto);
    }

    public Cunsult_PostDto selectById(int post_id) {
        Cunsult_PostDto cunsult_PostDto = new Cunsult_PostDto();
        cunsult_PostDto.setPost_id(post_id);
        return selectById(cunsult_PostDto);
    }

    public List<Cunsult_PostDto> selectByKeyword(String keyword) {
        Map<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("keyword", keyword);
        return session.selectList("Cunsult_Post.selectByKeyword", parameterMap);
    }

    public List<Cunsult_PostDto> selectByKeywordAndPage(String keyword, int page, int limit) {
        Map<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("keyword", keyword);
        parameterMap.put("page", page);
        parameterMap.put("limit", limit);
        return session.selectList("Cunsult_Post.selectByKeywordAndPage", parameterMap);
    }

    public int selectCountByKeyword(String keyword) {
        return session.selectOne("Cunsult_Post.selectCountByKeyword", keyword);
    }

    public int update(Cunsult_PostDto cunsult_PostDto) {
        return session.update("Cunsult_Post.update", cunsult_PostDto);
    }

    public int delete(Cunsult_PostDto cunsult_PostDto) {
        return session.delete("Cunsult_Post.delete", cunsult_PostDto);
    }

    public int selectRownumById(Cunsult_PostDto cunsult_PostDto) {
        return session.selectOne("Cunsult_Post.selectRownumById", cunsult_PostDto);
    }

    public int selectRownumById(int post_id) {
        Cunsult_PostDto cunsult_PostDto = new Cunsult_PostDto();
        cunsult_PostDto.setPost_id(post_id);
        return selectRownumById(cunsult_PostDto);
    }

    public int updateViewcnt(int post_id){
        return session.update("Cunsult_Post.updateViewcnt", post_id);
    }

}
