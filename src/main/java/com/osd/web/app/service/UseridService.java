package com.osd.web.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.osd.web.app.dao.UseridDao;
import com.osd.web.app.dto.UseridDto;

@Service
public class UseridService {

    @Autowired
    public UseridDao useridDao;

    public UseridDto getUserid(){
        return useridDao.getUserid();
    }

    public List<UseridDto> getUseridAll(){
        return useridDao.getUseridAll();
    }
}
