-- ============================================
-- Disaster and Relief Management System Database
-- Full MySQL Script
-- ============================================

DROP DATABASE IF EXISTS DisasterReliefManagement;
CREATE DATABASE DisasterReliefManagement;
USE DisasterReliefManagement;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    failed_attempts INT DEFAULT 0,
    lock_until DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_users_email (email)
);

DESCRIBE users;

SELECT id, name, email, failed_attempts, lock_until
FROM users;
-- ============================================
-- MAIN DISASTER TABLES
-- ============================================

CREATE TABLE Disaster (
    DisasterID VARCHAR(10) PRIMARY KEY,
    DisasterName VARCHAR(100) NOT NULL,
    DisasterType VARCHAR(50),
    Severity VARCHAR(20),
    DisasterDate DATE
);

CREATE TABLE Classification (
    ClassificationID INT AUTO_INCREMENT PRIMARY KEY,
    DisasterID VARCHAR(10),
    Type VARCHAR(50),
    SubType VARCHAR(50),
    `Group` VARCHAR(50),
    SubGroup VARCHAR(50),
    Year YEAR,
    FOREIGN KEY (DisasterID) REFERENCES Disaster(DisasterID)
);

CREATE TABLE Timeline (
    TimelineID INT AUTO_INCREMENT PRIMARY KEY,
    DisasterID VARCHAR(10),
    EventName VARCHAR(100),
    Date DATE,
    FOREIGN KEY (DisasterID) REFERENCES Disaster(DisasterID)
);

CREATE TABLE EmergencyDeclaration (
    DeclarationID INT AUTO_INCREMENT PRIMARY KEY,
    DisasterID VARCHAR(10),
    Date DATE,
    Authority VARCHAR(100),
    Level VARCHAR(50),
    FOREIGN KEY (DisasterID) REFERENCES Disaster(DisasterID)
);

CREATE TABLE Impact (
    ImpactID INT AUTO_INCREMENT PRIMARY KEY,
    DisasterID VARCHAR(10),
    Deaths INT,
    Injured INT,
    Homeless INT,
    TotalDamage DECIMAL(15,2),
    FOREIGN KEY (DisasterID) REFERENCES Disaster(DisasterID)
);

CREATE TABLE Damage (
    DamageID INT AUTO_INCREMENT PRIMARY KEY,
    ImpactID INT,
    ReconstructionCost DECIMAL(15,2),
    InsuredDamage DECIMAL(15,2),
    TotalDamage DECIMAL(15,2),
    FOREIGN KEY (ImpactID) REFERENCES Impact(ImpactID)
);

CREATE TABLE Country (
    CountryID INT AUTO_INCREMENT PRIMARY KEY,
    CountryName VARCHAR(100),
    CountryCode VARCHAR(10),
    Continent VARCHAR(50),
    Region VARCHAR(50)
);

CREATE TABLE Location (
    LocationID INT AUTO_INCREMENT PRIMARY KEY,
    DisasterID VARCHAR(10),
    CountryName VARCHAR(100),
    StateName VARCHAR(100),
    CityName VARCHAR(100),
    FOREIGN KEY (DisasterID) REFERENCES Disaster(DisasterID)
);

CREATE TABLE Resource (
    ResourceID VARCHAR(10) PRIMARY KEY,
    ResourceType VARCHAR(100),
    ResourceQuantity INT,
    ResourceCost DECIMAL(10,2)
);

CREATE TABLE ReliefAgency (
    AgencyID VARCHAR(10) PRIMARY KEY,
    AgencyName VARCHAR(100),
    AgencyContact VARCHAR(30)
);

CREATE TABLE ReliefOperation (
    OperationID INT AUTO_INCREMENT PRIMARY KEY,
    DisasterID VARCHAR(10),
    AgencyID VARCHAR(10),
    ResourceID VARCHAR(10),
    StartDate DATE,
    EndDate DATE,
    Status VARCHAR(30),
    FOREIGN KEY (DisasterID) REFERENCES Disaster(DisasterID),
    FOREIGN KEY (AgencyID) REFERENCES ReliefAgency(AgencyID),
    FOREIGN KEY (ResourceID) REFERENCES Resource(ResourceID)
);

CREATE TABLE AidContribution (
    ContributionID INT AUTO_INCREMENT PRIMARY KEY,
    DisasterID VARCHAR(10),
    AgencyID VARCHAR(10),
    ResourceID VARCHAR(10),
    Date DATE,
    Status VARCHAR(50),
    FOREIGN KEY (DisasterID) REFERENCES Disaster(DisasterID),
    FOREIGN KEY (AgencyID) REFERENCES ReliefAgency(AgencyID),
    FOREIGN KEY (ResourceID) REFERENCES Resource(ResourceID)
);

-- ============================================
-- STAGING TABLE
-- ============================================

CREATE TABLE disaster_staging (
    DisasterID VARCHAR(50),
    DisasterName VARCHAR(100),
    DisasterType VARCHAR(100),
    Severity VARCHAR(50),
    Date VARCHAR(50),
    CountryName VARCHAR(100),
    State VARCHAR(100),
    City VARCHAR(100),
    Deaths INT,
    Injured INT,
    Homeless INT,
    TotalDamage_USD DECIMAL(15,2),
    AgencyID VARCHAR(50),
    AgencyName VARCHAR(100),
    AgencyContact VARCHAR(100),
    ResourceID VARCHAR(50),
    ResourcesProvided VARCHAR(255),
    ResourceQuantity INT,
    ResourceCost_USD DECIMAL(15,2),
    StartDate VARCHAR(50),
    EndDate VARCHAR(50),
    Status VARCHAR(50)
);

-- ============================================
-- FINAL DATA TABLE USED BY YOUR NODE PROJECT
-- ============================================

CREATE TABLE disaster_records (
    DisasterID VARCHAR(50) PRIMARY KEY,
    DisasterName VARCHAR(100),
    DisasterType VARCHAR(100),
    Severity VARCHAR(50),
    Date DATE,
    CountryName VARCHAR(100),
    State VARCHAR(100),
    City VARCHAR(100),
    Deaths INT,
    Injured INT,
    Homeless INT,
    TotalDamage_USD DECIMAL(15,2),
    AgencyID VARCHAR(50),
    AgencyName VARCHAR(100),
    AgencyContact VARCHAR(100),
    ResourceID VARCHAR(50),
    ResourcesProvided VARCHAR(255),
    ResourceQuantity INT,
    ResourceCost_USD DECIMAL(15,2),
    StartDate DATE,
    EndDate DATE,
    Status VARCHAR(50)
);

-- ============================================
-- OPTIONAL CSV IMPORT
-- Uncomment and change file path if needed
-- ============================================

-- LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/dataset.csv'
-- INTO TABLE disaster_staging
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;

-- ============================================
-- MOVE DATA FROM STAGING TO FINAL TABLE
-- ============================================

INSERT INTO disaster_records
SELECT 
    DisasterID,
    DisasterName,
    DisasterType,
    Severity,
    STR_TO_DATE(Date, '%Y-%m-%d'),
    CountryName,
    State,
    City,
    Deaths,
    Injured,
    Homeless,
    TotalDamage_USD,
    AgencyID,
    AgencyName,
    AgencyContact,
    ResourceID,
    ResourcesProvided,
    ResourceQuantity,
    ResourceCost_USD,
    STR_TO_DATE(StartDate, '%Y-%m-%d'),
    STR_TO_DATE(EndDate, '%Y-%m-%d'),
    Status
FROM disaster_staging;

-- ============================================
-- INSERT NORMALIZED DATA
-- ============================================

INSERT INTO Disaster (DisasterID, DisasterName, DisasterType, Severity, DisasterDate)
SELECT DISTINCT DisasterID, DisasterName, DisasterType, Severity, Date
FROM disaster_records;

INSERT INTO Location (DisasterID, CountryName, StateName, CityName)
SELECT DISTINCT DisasterID, CountryName, State, City
FROM disaster_records;

INSERT INTO ReliefAgency (AgencyID, AgencyName, AgencyContact)
SELECT DISTINCT AgencyID, AgencyName, AgencyContact
FROM disaster_records
WHERE AgencyID IS NOT NULL;

INSERT INTO Resource (ResourceID, ResourceType, ResourceQuantity, ResourceCost)
SELECT 
    ResourceID,
    MAX(ResourcesProvided) AS ResourceType,
    MAX(ResourceQuantity) AS ResourceQuantity,
    MAX(ResourceCost_USD) AS ResourceCost
FROM disaster_records
WHERE ResourceID IS NOT NULL
GROUP BY ResourceID;

INSERT INTO Impact (DisasterID, Deaths, Injured, Homeless, TotalDamage)
SELECT DisasterID, Deaths, Injured, Homeless, TotalDamage_USD
FROM disaster_records;

INSERT INTO ReliefOperation (DisasterID, AgencyID, ResourceID, StartDate, EndDate, Status)
SELECT DisasterID, AgencyID, ResourceID, StartDate, EndDate, Status
FROM disaster_records
WHERE AgencyID IS NOT NULL AND ResourceID IS NOT NULL;

-- ============================================
-- PROCEDURE
-- ============================================

DELIMITER //
CREATE PROCEDURE AddDisaster(
    IN d_id VARCHAR(10),
    IN d_name VARCHAR(100),
    IN d_type VARCHAR(50),
    IN d_severity VARCHAR(20),
    IN d_date DATE
)
BEGIN
    INSERT INTO Disaster (DisasterID, DisasterName, DisasterType, Severity, DisasterDate)
    VALUES (d_id, d_name, d_type, d_severity, d_date);
END //
DELIMITER ;

-- ============================================
-- TRIGGER
-- ============================================

DELIMITER //
CREATE TRIGGER update_total_damage
AFTER INSERT ON Damage
FOR EACH ROW
BEGIN
    UPDATE Impact
    SET TotalDamage = TotalDamage + NEW.TotalDamage
    WHERE ImpactID = NEW.ImpactID;
END //
DELIMITER ;

-- ============================================
-- VIEW
-- ============================================

CREATE OR REPLACE VIEW DisasterSummary AS
SELECT 
    d.DisasterName,
    d.DisasterType,
    l.CountryName,
    SUM(i.Deaths) AS TotalDeaths,
    SUM(i.TotalDamage) AS TotalDamage,
    COUNT(ro.OperationID) AS TotalOperations
FROM Disaster d
LEFT JOIN Location l ON d.DisasterID = l.DisasterID
LEFT JOIN Impact i ON d.DisasterID = i.DisasterID
LEFT JOIN ReliefOperation ro ON d.DisasterID = ro.DisasterID
GROUP BY d.DisasterName, d.DisasterType, l.CountryName;

-- ============================================
-- SAMPLE QUERIES
-- ============================================

SELECT * FROM disaster_records LIMIT 10;

SELECT DisasterName, SUM(Deaths) AS TotalDeaths, SUM(TotalDamage_USD) AS TotalDamage
FROM disaster_records
GROUP BY DisasterName;

SELECT DisasterName, AgencyName, ResourcesProvided
FROM disaster_records
WHERE DisasterName = 'Flood 2024';

SELECT DisasterName, TotalDamage_USD
FROM disaster_records
ORDER BY TotalDamage_USD DESC
LIMIT 5;

SELECT ResourceID, ResourcesProvided, StartDate, EndDate
FROM disaster_records
WHERE StartDate BETWEEN '2024-01-01' AND '2024-12-31';

SELECT COUNT(*) FROM disaster_records;

SELECT DISTINCT DisasterName FROM disaster_records;

SELECT * FROM DisasterSummary LIMIT 10;

SELECT CountryName, COUNT(DISTINCT DisasterID) AS TotalDisasters
FROM disaster_records
GROUP BY CountryName;

SELECT AgencyName, AVG(ResourceCost_USD) AS AvgResourceCost
FROM disaster_records
GROUP BY AgencyName;

SELECT DisasterName, MAX(Deaths) AS MaxDeaths
FROM disaster_records
GROUP BY DisasterName;

SELECT Severity, COUNT(*) AS CountBySeverity
FROM disaster_records
GROUP BY Severity;

SELECT DisasterName, SUM(ResourceQuantity) AS TotalResourcesUsed
FROM disaster_records
GROUP BY DisasterName;

SHOW TABLES;