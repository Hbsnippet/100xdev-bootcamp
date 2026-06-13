import { client } from '../index';



export async function createProject(userId: number, title: string, description: string) {
  const res = await client.query(`INSERT INTO projects (user_id,title,description) VALUES ($1,$2,$3) RETURNING *`, [userId, title, description]);
  return res.rows[0]
}

export async function getProjects(userId: number) {
    const res = await client.query(`SELECT * FROM projects where user_id = $1`, [userId]);
    return res.rows
}