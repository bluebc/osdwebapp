package com.osd.web.app.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Faq_ListDto;

@Repository
public class Faq_ListDao {

    @Autowired
    private SqlSession session;

    public List<Faq_ListDto> selectByCateIdAndKeyword(int cate_id, String keyword) {
        Map<String, Object> parameterMap = new HashMap<>();
        parameterMap.put("cate_id", cate_id);
        parameterMap.put("keyword", keyword);
        return session.selectList("Faq_List.selectByCateIdAndKeyword", parameterMap);
    }

}
