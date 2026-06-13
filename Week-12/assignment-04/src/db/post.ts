import { client } from '../index';

export async function createPost(userId: number, content: string) {
 const res = await client.query(`INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING *`, [userId, content]);
 return res.rows[0];
}

export async function likePost(userId: number, postId: number) {
 const res = await client.query(`INSERT INTO likes (user_id, post_id) VALUES ($1, $2) RETURNING *`, [userId, postId]);
 return res.rows[0]
}

export async function getFeed() {
 const res = await client.query(`SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.created_at DESC`);
 return res.rows
}