package com.osd.web.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.osd.web.app.dao.FeedDao;
import com.osd.web.app.dto.FeedDto;

@Service
public class FeedService {

    @Autowired
    private FeedDao feedDao;

    public List<FeedDto> getAllFeed() {
        return feedDao.getAllFeed();
    }

}
