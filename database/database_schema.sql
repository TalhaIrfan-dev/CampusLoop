CREATE DATABASE IF NOT EXISTS campusloop_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE campusloop_db;

CREATE TABLE users (
    user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    student_id VARCHAR(50) NOT NULL UNIQUE,
    department VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    terms_accepted_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;


USE campusloop_db;

CREATE TABLE listings (
    listing_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    `condition` VARCHAR(50),
    description TEXT NOT NULL,
    listing_type ENUM(
        'sell',
        'exchange',
        'donate',
        'request'
    ) NOT NULL,
    price DECIMAL(10, 2) DEFAULT NULL,
    weight_kg DECIMAL(8, 2),
    item_size VARCHAR(50),
    is_fragile BOOLEAN DEFAULT FALSE,
    image_path VARCHAR(255),
    status ENUM(
        'active',
        'sold',
        'exchanged',
        'donated',
        'fulfilled',
        'expired',
        'removed'
    ) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_listings_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    INDEX idx_listing_user (user_id),
    INDEX idx_listing_category (category),
    INDEX idx_listing_type (listing_type),
    INDEX idx_listing_status (status)
) ENGINE=InnoDB;


select * from users;
select * from listings;


