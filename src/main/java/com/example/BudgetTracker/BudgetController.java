
package com.example.BudgetTracker;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.BudgetTracker.AppLogger;

@RestController
public class BudgetController {
    @GetMapping("/budgettracker")
    public String budget() {
        AppLogger.info("Accessed /budgettracker endpoint");
        return "Welcome to Budget Tracker, Jade!";
    }
}