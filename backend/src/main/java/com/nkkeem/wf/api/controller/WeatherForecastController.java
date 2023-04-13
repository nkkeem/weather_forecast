package com.wf.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WeatherForecastController {
    @GetMapping("/api/wf")
    public String welcome(){
        return "welcome";
    }
}
