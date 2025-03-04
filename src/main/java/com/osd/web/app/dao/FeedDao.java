package com.osd.web.app.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.FeedDto;

@Repository
public class FeedDao {

    @Autowired
    private SqlSession session;

    public List<FeedDto> getAllFeed() {
        return session.selectList("Feed.getAllFeed");
    }

}
