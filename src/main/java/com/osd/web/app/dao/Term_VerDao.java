package com.osd.web.app.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Term_VerDto;

@Repository
public class Term_VerDao {

    @Autowired
    private SqlSession session;

    public Term_VerDto getTerm_Ver(String ver_Id) {
        return session.selectOne("Term_Ver.getTerm_Ver", ver_Id);

    }

    public List<Term_VerDto> getTerm_VerAll() {
        return session.selectList("Term_Ver.getTerm_VerAll");

    }

}
