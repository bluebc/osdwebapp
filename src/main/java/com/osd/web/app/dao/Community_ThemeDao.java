package com.osd.web.app.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.Community_ThemeDto;

@Repository
public class Community_ThemeDao {

    @Autowired
    private SqlSession session;

    public List<Community_ThemeDto> selectAll() {
        return session.selectList("Community_Theme.selectAll");
    }

    public String selectNameById(int theme_id){
          return session.selectOne("Community_Theme.selectNameById", theme_id);
    }

}
