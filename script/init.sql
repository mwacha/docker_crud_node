CREATE DATABASE persondb;

USE persondb;

CREATE TABLE person (
    id integer not null auto_increment,    
    person_name varchar(200),
    PRIMARY KEY (id)
);

SET character_set_client = utf8;
SET character_set_connection = utf8;
SET character_set_results = utf8;
SET collation_connection = utf8_general_ci;