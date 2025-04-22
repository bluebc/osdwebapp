package com.osd.web.app.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.osd.web.app.dao.Board_PostDao;
import com.osd.web.app.dao.Community_PostDao;
import com.osd.web.app.dto.Board_PostDto;
import com.osd.web.app.dto.Community_PostDto;

@Service
public class CommunityService {

    @Autowired
    private Community_PostDao community_PostDao;

    @Autowired
    private Board_PostDao board_PostDao;

    public Community_PostDto insertPost(Community_PostDto community_PostDto) {
        LocalDateTime post_created_at = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        community_PostDto.setPost_created_at(post_created_at);
        community_PostDto.setPost_updated_at(post_created_at);
        community_PostDao.insert(community_PostDto);
        community_PostDto = community_PostDao.selectBySubjectAndUserAndCreated(community_PostDto);
        return community_PostDto;
    }

    public Board_PostDto getBoardById(int post_id) {
        return board_PostDao.selectCommunityPostById(post_id);
    }

    public int updatePostViewcnt(int post_id){
        return community_PostDao.updateViewcnt(post_id);
    }

    public int deletePostById(int post_id){
        return community_PostDao.deleteById(post_id);
    }

    public Community_PostDto getPostById(int post_id){
        return community_PostDao.selectById(post_id);
    }


}
