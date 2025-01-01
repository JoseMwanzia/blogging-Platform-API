const db = require('../../config/dbConnect');

class Post {
    static async create(data) {
        const { title, content, category, tags } = data
        if (!title || !content || !category || !tags) {
            return 400;
        }
        try {
            const sql = 'INSERT INTO posts (title, content, category, tags) VALUES (?, ?, ?, ?);'
            const result = await db.query(sql, [title, content, category, tags])
            const querydData = await db.query('SELECT * FROM posts WHERE id=?;', [result[0].insertId])
            return querydData[0]
        } catch (error) {
            console.error('Error creating post:', error)
            throw new Error('Error creating post')
        }
    }

    static async update(id, data) {
        const { title, content, category, tags } = data
        if (!title || !content || !category || !tags) {
            return 400;
        }
        try {
            const sql = 'UPDATE posts SET title=?, content=?, category=?, tags=? WHERE id=?;'
            await db.query(sql, [title, content, category, tags, id]);
            const querydData = await db.query('SELECT * FROM posts WHERE id=?;', [id])        
            return querydData[0]
        } catch (error) {
            console.error('Error updating post:', error)
            throw new Error('Error updating post')
        }
    }

    static async delete(id) {
        try {
            const querydData = await db.query('SELECT * FROM posts WHERE id=?;', [id])

            if (querydData[0].length === 0) {
                // throw new Error('Post not found')
                return 404
            } else {
                await db.query('DELETE FROM posts WHERE id=?;', [id])
                return 204
            }
        } catch (error) {
            console.error('Error deleting post:', error)
            throw new Error('Error deleting post')
        }
    }

    static async getById(id) {
        try {
            const data = await db.query('SELECT * FROM posts WHERE id=?;', [id])
            return data[0]
        } catch (error) {
            console.error('Error fetching post by ID:', error)
            throw new Error('Error fetching post by ID')
        }
    }

    static async getAll( limit, offset) {
        try {
            const data = await db.query('SELECT * FROM posts LIMIT ? OFFSET ?', [limit, offset])
            return data[0]
        } catch (error) {
            console.error('Error fetching all posts:', error)
            throw new Error('Error fetching all posts')
        }
    }
}

module.exports = Post;