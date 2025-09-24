-- Fix EMAIL column size in PLAYER table
-- This will increase the EMAIL column from VARCHAR(20) to VARCHAR(100)

USE p_dbms;

-- Increase EMAIL column size to accommodate longer email addresses
ALTER TABLE PLAYER MODIFY COLUMN EMAIL VARCHAR(100) DEFAULT NULL;

-- Verify the change
DESCRIBE PLAYER;