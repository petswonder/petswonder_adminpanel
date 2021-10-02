export const queries = {
    user : {
        all_products : "SELECT * from products",
        product_by_id : 'SELECT * FROM products WHERE product_dbId = ?',
        product_by_brand : 'SELECT * FROM products WHERE product_brand = ?',
        product_by_pet : 'SELECT * FROM products WHERE product_pet_category = ?',
        product_by_category : 'SELECT * FROM products WHERE product_category = ?',
        product_by_sub_category : 'SELECT * FROM products WHERE product_category = ? AND product_pet_category =? ',
        add_pet : 'INSERT INTO pets user_id, pet_name, pet_dob, pet_gender, pet_address, pet_mobile, pet_category ) VALUES(?, ?, ?, ?, ?, ?, ?)',
        get_user_pets : 'SELECT * FROM pets WHERE pet_id = ?',
        edit_pet_details : 'UPDATE pets SET pet_name = ?, pet_dob = ?, pet_gender = ?, pet_address = ?, pet_mobile = ?, pet_category WHERE (pet_id = ?)',
        user_login : "SELECT * FROM user WHERE user_mobile = ?",
        user_register : "INSERT INTO user (user_name, user_email, user_mobile, user_pwd) VALUES (?, ?, ?, ?)",
        store_otp: "INSERT into authentication (auth_otp, auth_user, auth_created, auth_trials) VALUES (?, ?, NOW(), 0)",
        validate_otp: "SELECT * from authentication where auth_user=? AND auth_otp = ?",
        add_to_cart : "INSERT INTO cart_details (user_mobile, product_quantity, product_id, cart_id) values (?, 1, ?, (SELECT cart_id from cart where user_mobile=? AND status='Not Ordered')) ON DUPLICATE KEY UPDATE product_quantity = product_quantity + 1",
        create_user_cart : "INSERT INTO cart (user_mobile,createdAt) VALUES ( ? , NOW())",
        get_user_cart : "SELECT * FROM cart_details INNER JOIN products ON cart_details.product_id=products.product_id WHERE cart_details.user_mobile = ?",
        // update_user_cart : "UPDATE cart SET product_quantity = ? WHERE user_mobile = ? AND product_id = ?",
        delete_item : "DELETE from cart where user_mobile = ? AND product_id = ? ",
        delete_cart : "DELETE from cart where user_mobile = ?",
        cart_summary: "SELECT SUM(product_quantity * product_price) as mrp, SUM(product_quantity * product_price * product_discount/100) as discount,SUM(product_price * product_gst/100) as gst, 50 as delivery, 0 as plus_points FROM cart_details INNER JOIN products ON cart_details.product_id=products.product_id WHERE cart_details.user_mobile = ?",
        get_profile : "SELECT * from user where user_mobile = ?",
        edit_user_profile : "UPDATE user SET user_name = ?, user_email = ?, user_mobile = ?, user_address = ?, user_district = ?, user_city = ?, user_state = ?, user_pincode = ? WHERE user_mobile = ?",
        create_pet : "INSERT INTO pets (pet_name, pet_breed, pet_gender, pet_dob, pet_category, user_mobile) VALUES (?, ?, ?, ?, ?, ?)",
        get_pet : "SELECT * from pets where user_mobile = ?",
        edit_pet_profile : "UPDATE pets SET pet_name = ?, pet_breed = ?, pet_gender = ?,pet_dob = ?,pet_category = ? WHERE user_mobile = ?"

    },
    admin : {
        add_product : 'INSERT INTO products (product_brand, product_category, product_description, product_discount, product_inventory, product_price, product_id, product_images, product_sellerNumber, product_pet_category, product_title) VALUES (?, ? , ?, ?, ? ,? ,?, ?, ?, ?, ?)',
        delete_product : 'DELETE FROM products WHERE product_dbId = ?'
    }
}

