package com.example.BudgetTracker;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class BudgetTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BudgetTrackerApplication.class, args);
	}

	@PostConstruct
	public void clearConsoleOnStart() {
		// Clear console (works in most terminals)
		System.out.print("\033[H\033[2J");
		System.out.flush();
		System.out.println("App running");
	}
}
