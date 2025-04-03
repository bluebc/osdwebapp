package com.osd.web.app.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
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

    public int insertFaqList(Faq_ListDto faq_ListDto) {

        // LocalDateTime faq_created_at = LocalDateTime.now().truncatedTo(ChronoUnit.MILLIS);
        LocalDateTime faq_created_at = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        faq_ListDto.setFaq_created_at(faq_created_at);
        faq_ListDto.setFaq_updated_at(faq_created_at);

        return faq_ListDao.insert(faq_ListDto);
    }
}
