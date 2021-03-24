CREATE DATABASE kiosk_db;

CREATE TABLE product_info(
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE,
    price DECIMAL(12,2) NOT NULL,
    description VARCHAR(255),
    category VARCHAR(255)
);


-- -- INSERT INTO product_info (name, price, description, category) VALUES ( 'Grilled Cheese Sandwich', 7.50, 'Cheese on Toast. It''s salty, gooey, crisp, buttery, and comforting in all the right ways.', 'MAIN' );
-- INSERT INTO product_info (name, price, description, category) VALUES ( 'Spicy Egg & Chicken Ramen', 8.99, 'So spicy you can''t think.', 'MAIN' );

-- -- INSERT INTO product_info (name, price, description, category) VALUES ( 'Chocolate Chip Cookies', 4.99, 'You''ll love these gooey chocolatey treats!', 'DESSERT' );
-- -- INSERT INTO product_info (name, price, description, category) VALUES ( 'Chocolate Banoffee Pie', 15.99, 'Chocolate, Toffee, Bananas. That''s it. That''s the dessert. It''s great. You''ll love it. Definitely worth this price.', 'DESSERT' );
-- -- INSERT INTO product_info (name, price, description, category) VALUES ( 'Basque Cheesecake', 4.99, 'It boasts a creamy center and a deeply caramelized "burnt" top and bottom.', 'DESSERT' );


-- INSERT INTO product_info (name, price, description, category) VALUES ( 'Blue Cheese Dip', 1.49, 'Pairs well with great tasting wings!', 'SIDE' );
-- -- INSERT INTO product_info (name, price, description, category) VALUES ( '7 Chicken Wings', 7.99, 'Great tasting chicken wings.', 'SIDE' );

-- -- INSERT INTO product_info (name, price, description, category) VALUES ( 'Fantasta', 4.99, 'A zesty orange flavoured soft drink', 'DRINK' );
-- -- INSERT INTO product_info (name, price, description, category) VALUES ( 'Cola', 4.99, ' A nutty classic cola ', 'DRINK' );
