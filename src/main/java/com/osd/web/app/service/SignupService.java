package com.osd.web.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.osd.web.app.dao.Term_ListDao;
import com.osd.web.app.dao.User_InfoDao;
import com.osd.web.app.dao.User_TermDao;
import com.osd.web.app.dto.Term_ListDto;
import com.osd.web.app.dto.User_InfoDto;
import com.osd.web.app.dto.User_TermDto;


@Service
public class SignupService {


    @Autowired
    private User_InfoDao user_InfoDao;


    @Autowired
    private Term_ListDao term_ListDao;

    @Autowired
    private User_TermDao user_TermDao;


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

        user_InfoDto.setUser_role("GENERAL");

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

     //   System.out.println(term_ListDao.getTerm_ListByAll());
        
        return term_ListDao.getTerm_ListByAll();

    }

   //약관 정보 리스트 하나
   public Term_ListDto getTerm_ListOne() {
        
   // System.out.println(term_ListDao.getTerm_ListByOne());

    return term_ListDao.getTerm_ListByOne();

}

    //해당 약관 내용 
    public Term_ListDto getTerm_ListByid(String term_id) {
        
        System.out.println(term_ListDao.getTerm_ListByid(term_id));

        return term_ListDao.getTerm_ListByid(term_id);

    }

    //사용자 약관 동의 여부 등록
    public int insertUser_Term(User_TermDto user_termDto) {
        int result = 0;

        result = user_TermDao.insertUser_Term(user_termDto);

        return result;
    }

  
    //사용자 약관 동의 여부 등록 멀티
    public int insertMuitiUser_Term(List<User_TermDto> user_termDto) {
        int result = 0;

        result = user_TermDao.insertMuitiUser_Term(user_termDto);

        return result;
    }
        
}
    