package com.example.BudgetTracker;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AppLogger {
    private static final Logger logger = LoggerFactory.getLogger(AppLogger.class);
    private static final String APP_NAME = "[Budget Tracker] ";
    private static final String ERROR_PREFIX = APP_NAME + "[ERROR] ";
    private static final String WARN_PREFIX = APP_NAME + "[WARN] ";
    private static final String DEBUG_PREFIX = APP_NAME + "[DEBUG] ";
    private static final String INFO_PREFIX = APP_NAME + "[INFO] ";

    public static void error(String message, Throwable t) {
        logger.error(ERROR_PREFIX + message, t);
    }

    public static void warn(String message) {
        logger.warn(WARN_PREFIX + message);
    }

    public static void debug(String message) {
        logger.debug(DEBUG_PREFIX + message);
    }

    public static void info(String message) {
        logger.info(INFO_PREFIX + message);
    }
}
