package com.osd.web.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.osd.web.app.dao.Faq_CategoryDao;
import com.osd.web.app.dto.Faq_CategoryDto;

@Service
public class FaqService {

    @Autowired
    private Faq_CategoryDao faq_CategoryDao;

    public List<Faq_CategoryDto> getCategoryList(){
        return faq_CategoryDao.selectAll();
    }
    
}
