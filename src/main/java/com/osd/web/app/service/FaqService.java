package com.osd.web.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.osd.web.app.dao.Faq_CategoryDao;
import com.osd.web.app.dao.Faq_ListDao;
import com.osd.web.app.dto.Faq_CategoryDto;
import com.osd.web.app.dto.Faq_ListDto;

@Service
public class FaqService {

    @Autowired
    private Faq_CategoryDao faq_CategoryDao;

    @Autowired
    private Faq_ListDao faq_ListDao;

    public List<Faq_CategoryDto> getCategoryList() {
        return faq_CategoryDao.selectAll();
    }

    public List<Faq_ListDto> getFaqListByCateIdAndKeyword(int cate_id, String keyword) {
        return faq_ListDao.selectByCateIdAndKeyword(cate_id, keyword);
    }

    public List<Faq_ListDto> getFaqListByCateIdAndKeyword(int cate_id) {
        String keyword = "";
        return getFaqListByCateIdAndKeyword(cate_id, keyword);
    }
}
