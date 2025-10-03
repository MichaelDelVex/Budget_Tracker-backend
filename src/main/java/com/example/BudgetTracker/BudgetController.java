package com.example.BudgetTracker;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BudgetController {
    @GetMapping("/budgettracker")
    public String budget() {
        System.out.println("Testing our error functionality");
        return "Welcome to Budget Tracker!";
    }
}