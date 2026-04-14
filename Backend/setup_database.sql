-- Create Database and disaster_records table for Disaster Management System
CREATE DATABASE IF NOT EXISTS DisasterReliefManagement;
USE DisasterReliefManagement;

-- Create the disaster_records table (flat structure for compatibility)
CREATE TABLE IF NOT EXISTS disaster_records (
    DisasterID VARCHAR(50) PRIMARY KEY,
    DisasterName VARCHAR(100),
    DisasterType VARCHAR(100),
    Severity VARCHAR(50),
    Date DATE,
    CountryName VARCHAR(100),
    State VARCHAR(100),
    City VARCHAR(100),
    Deaths INT DEFAULT 0,
    Injured INT DEFAULT 0,
    Homeless INT DEFAULT 0,
    TotalDamage_USD DECIMAL(15,2) DEFAULT 0,
    AgencyID VARCHAR(50),
    AgencyName VARCHAR(100),
    AgencyContact VARCHAR(100),
    ResourceID VARCHAR(50),
    ResourcesProvided VARCHAR(255),
    ResourceQuantity INT DEFAULT 0,
    ResourceCost_USD DECIMAL(10,2) DEFAULT 0,
    StartDate DATE,
    EndDate DATE,
    Status VARCHAR(50)
);

-- Show confirmation
SELECT 'Database and table created successfully!' AS Status;
SELECT COUNT(*) AS 'Current Records' FROM disaster_records;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
