DROP DATABASE IF EXISTS StoreManager;

CREATE DATABASE StoreManager;

USE StoreManager;

CREATE TABLE products (
    id INT NOT NULL auto_increment,
    name VARCHAR(30) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE sales (
    id INT NOT NULL auto_increment,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE sales_products (
    sale_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (sale_id)
        REFERENCES sales (id)
        ON DELETE CASCADE,
    FOREIGN KEY (product_id)
        REFERENCES products (id)
        ON DELETE CASCADE
)  ENGINE=INNODB;

-- INSERT INTO products (name, quantity)
-- VALUES
--   ('Camiseta', 5),
--   ('Bola', 6),
--   ('Luva', 8),
--   ('Gorro', '10');

-- INSERT INTO sales (date)
-- VALUES
--   (NOW()),
--   (NOW()),
--   (NOW());
  
-- INSERT INTO sales_products (sale_id, product_id, quantity)
-- VALUES
--   (1, 4, 3),
--   (2, 2, 1),
--   (2, 1, 1),
--   (3, 3, 2);

SET SQL_SAFE_UPDATES = 0;
