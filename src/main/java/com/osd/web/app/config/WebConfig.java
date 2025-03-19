package com.osd.web.app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.osd.web.app.interceptor.AuthInterceptor;
import com.osd.web.app.interceptor.FindLoginInfoInterceptor;
import com.osd.web.app.interceptor.LoginInterceptor;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final LoginInterceptor loginInterceptor;
    private final FindLoginInfoInterceptor findLoginInfoInterceptorl;
    private final AuthInterceptor authInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginInterceptor)
                .addPathPatterns("/**"); // 모든 경로에 적용

        registry.addInterceptor(findLoginInfoInterceptorl)
                .addPathPatterns("/find/result/**");

        registry.addInterceptor(authInterceptor)
                .addPathPatterns("/auth/email/**");
    }
}
