package com.example.weather_forecast;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
public class HelloWorld {

    @GetMapping(path = "/datetime2")
    public String helloWorld() {
        return "현재 시간은 " + new Date() + "입니다!";
    }

    @GetMapping(path = "hello-world-bean")
    public HelloWorldBean helloWorldBean(){
        return new HelloWorldBean("hello-world-bean");
    }
}
