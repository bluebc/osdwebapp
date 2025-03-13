package com.osd.web.app.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Term_ListDto;

@Repository
public class Term_ListDao {

    @Autowired
    private SqlSession session;

    public Term_ListDto getTerm_List(String term_Id) {
        return session.selectOne("Term_List.getTerm_List", term_Id);

    }

    public List<Term_ListDto> getTerm_ListAll() {
        return session.selectList("Term_List.getTerm_ListAll");

    }

}
