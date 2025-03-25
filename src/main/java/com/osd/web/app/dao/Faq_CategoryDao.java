package com.osd.web.app.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Faq_CategoryDto;

@Repository
public class Faq_CategoryDao {

    @Autowired
    private SqlSession session;

public List<Faq_CategoryDto> selectAll(){
    return session.selectList("Faq_Category.selectAll");
}

}
