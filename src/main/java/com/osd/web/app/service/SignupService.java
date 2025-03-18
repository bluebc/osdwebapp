package com.osd.web.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.osd.web.app.dao.Term_ListDao;
import com.osd.web.app.dao.User_InfoDao;
import com.osd.web.app.dto.Term_ListDto;
import com.osd.web.app.dto.User_InfoDto;


@Service
public class SignupService {


    @Autowired
    private User_InfoDao user_InfoDao;

    @Autowired
    private Term_ListDao term_ListDao;

    //아이디 중복 여부 체크
    public int existsUser_InfoById(User_InfoDto user_InfoDto) {
        int result = 0;

        if (user_InfoDao.existsUser_InfoById(user_InfoDto.getUser_id()) == 0) {
            result = 1;
        } else if (user_InfoDao.existsUser_InfoById(user_InfoDto.getUser_id()) > 0) {
            result = -1;
        }
        return result;
    }
    
    //회원 정보 입력
    public int insertUser_Info(User_InfoDto user_InfoDto) {
        int result = 0;

        if (user_InfoDao.existsUser_InfoById(user_InfoDto.getUser_id()) == 0) {
            result = user_InfoDao.insertUser_Info(user_InfoDto);
        } else if (user_InfoDao.existsUser_InfoById(user_InfoDto.getUser_id()) > 0) {
            result = -1;
        }
        return result;
    }

    //회원 정보 삭제
    public int deleteUser_Info(User_InfoDto user_InfoDto) {
        int result = 0;

        result = user_InfoDao.deleteUser_InfoByIdAndPw(user_InfoDto);

        return result;
    }

    //약관 정보 리스트
    public List<Term_ListDto> getTerm_ListAll() {

        System.out.println(term_ListDao.getTerm_ListByAll());
        
        return term_ListDao.getTerm_ListByAll();

    }


    //약관 정보 리스트
    public Term_ListDto getTerm_ListOne() {
        
        System.out.println(term_ListDao.getTerm_ListByOne());

        return term_ListDao.getTerm_ListByOne();

    }
}
    
