INSERT INTO dream_images (user_id, image_url, image_text) VALUES ($1, $2, $3);
SELECT * FROM dream_images WHERE user_id = $1;