package com.osd.web.app.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.osd.web.app.dto.User_InfoDto;

@Repository
public class User_InfoDao {

    @Autowired
    private SqlSession session;


    public int existsUser_InfoById(String user_id) {
        return session.selectOne("User_Info.existsById", user_id);
    }

    public int insertUser_Info(User_InfoDto user_InfoDto) {
        return session.insert("User_Info.insert", user_InfoDto);
    }

    public User_InfoDto getUser_InfoById(User_InfoDto user_InfoDto) {
        return session.selectOne("User_Info.getUser_InfoById", user_InfoDto);
    }
    public User_InfoDto getUser_InfoById(String user_id) {
        User_InfoDto user_InfoDto = new User_InfoDto();
        user_InfoDto.setUser_id(user_id);
        return getUser_InfoById(user_InfoDto);
    }
    public User_InfoDto getUser_InfoForAuth(User_InfoDto user_InfoDto){
        return session.selectOne("User_Info.getUser_InfoForAuth", user_InfoDto);
    }

    public int deleteUser_InfoByIdAndPw(User_InfoDto user_InfoDto) {
        return session.delete("User_Info.deleteUser_InfoByIdAndPw", user_InfoDto);
    }

    public int updateUser_Info(User_InfoDto user_InfoDto){
        return session.update("User_Info.update", user_InfoDto);
    }
    public int updateUser_Pw(User_InfoDto user_InfoDto){
        return session.update("User_Info.updateUser_Pw", user_InfoDto);
    }
    public User_InfoDto getUser_IdByEmail(User_InfoDto user_InfoDto){
        return session.selectOne("User_Info.getUser_IdByEmail", user_InfoDto);
    }
    public User_InfoDto selectRoleById(String user_id){
        return session.selectOne("User_Info.selectRoleById",user_id);
    }

}
