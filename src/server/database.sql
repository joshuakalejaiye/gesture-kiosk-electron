CREATE DATABASE kiosk_db;

CREATE TABLE product_info(
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    description VARCHAR(255)
);