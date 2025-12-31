const Post = require('../app/model/postModel')
const { create, getById, getAll } = require('../app/model/postModel')
const db = require('../config/dbConnect')

const mockData = {
    title: 'title',
    content: 'content',
    category: 'category',
    tags: 'tags'
}

jest.mock('../config/dbConnect.js', () => ({
    result: jest.fn(),
    query: jest.fn()
}))


describe('Create static-method', () => {
    test('returns 400 if required fields are missing', async () => {
        const copyMockData = {}

        jest.spyOn(db, 'query').mockResolvedValue([{
            title: 'title',
            content: 'content',
            category: 'category',
            tags: 'tags'
        }])

        const createdData = await create(copyMockData)
        expect(createdData).toEqual(400)
        expect(db.query).not.toHaveBeenCalled()
    })
    
    test('return query data', async () => {
        await create(mockData)

        jest.spyOn(db, 'query').mockResolvedValue([{
            title: 'title',
            content: 'content',
            category: 'category',
            tags: 'tags'
        }])

        expect(db.query).toHaveBeenCalledTimes(2)
        expect(db.query).toHaveReturned()
    })

    test('catch() block to log and throw error', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
        // jest.spyOn(db, 'query').mockRejectedValue(new Error('DB eror')) // works
        db.query.mockRejectedValue(new Error("DB Error")); - // works as well
        
        await expect(create(mockData)).rejects.toThrow('Error creating post')
        expect(console.error).toHaveBeenCalled()
            //reason for asserting 'await expect(...)' before 'expect(console.error)... ' 
            // Because the promise rejection hasn’t been handled yet when you assert console.error.
    })
})




describe('Update static-method', () => {
    const mockId = 1

    test('returns 400 if required fields are missing', async () => {
        const copyMockData = {}

        jest.spyOn(db, 'query').mockResolvedValue([{
            title: 'title',
            content: 'content',
            category: 'category',
            tags: 'tags'
        }])

        const updatedData = await Post.update(mockId, copyMockData)
        expect(updatedData).toEqual(400)
        expect(db.query).not.toHaveBeenCalled()
    })
    
    test('return query data', async () => {
        await Post.update(mockId, mockData)

        db.query.mockResolvedValue([{
            title: 'title',
            content: 'content',
            category: 'category',
            tags: 'tags'
        }])

        expect(db.query).toHaveBeenCalledTimes(2)
        expect(db.query).toHaveReturned()
    })

    test('catch() block to log and throw error', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
        db.query.mockRejectedValue(new Error("DB Error")); - // works as well
        
        await expect(Post.update(mockId, mockData)).rejects.toThrow() // just throws without the Error message
        expect(console.error).toHaveBeenCalledWith('Error updating post:', new Error('DB Error'))
    })
})


describe('Delete data', () => {
    const mockId = 1;

    test('return a 404 error mesage when there is no data', async () => {
        db.query.mockResolvedValue([[]])
        const deleteData = await Post.delete(mockId)

        expect(db.query.length).toBe(0)
        expect(deleteData).toBe(404)
    })

    test('return 204 when deleted successfully', async () => {
        db.query.mockResolvedValue([[{"data": "Deleted data"}]])
        const deletedData = await Post.delete(mockId)

        expect(db.query).toHaveBeenCalledTimes(2)
        expect(db.query).toHaveBeenCalledWith("SELECT * FROM posts WHERE id=?;", [mockId])
        expect(db.query).toHaveBeenCalledWith("DELETE FROM posts WHERE id=?;", [mockId])
        expect(deletedData).toBe(204)
    })

    test('catch() block to cacth errors', async () => {
        db.query.mockRejectedValue(new Error())
        // jest.spyOn(console, 'error').mockReturnValue('Error deleting post')
        
        await expect(Post.delete(mockId)).rejects.toThrow(new Error('Error deleting post')) // throws with the error message
        expect(console.error).toHaveBeenCalledWith('Error deleting post:', new Error())
    })
})


describe('GetByid() method', () => {
    const mockId = 10;

    test('data array is returned', async () => {
        db.query.mockResolvedValue([[], []])
        const returnGetById = await getById(mockId)

        expect(db.query).toHaveBeenCalledWith(`SELECT * FROM posts WHERE id=?;`, [mockId])
        expect(db.query).resolves.toEqual([[], []])
        expect(returnGetById).toEqual([])
    })

    test('catch() block to log and throw caught errors', async () => {
        db.query.mockRejectedValue(new Error())

        await expect(getById(mockId)).rejects.toThrow(new Error("Error fetching post by ID"))
        expect(console.error).toHaveBeenCalledWith('Error fetching post by ID:', new Error())
    }) 
})


describe('GetAll() method', () => {
    const mockLimit = 10;
    const mockOffset = 2;

    test('data array is returned', async () => {
        db.query.mockResolvedValue([[], []])
        const returnGetAll = await getAll(mockLimit, mockOffset)

        expect(db.query).toHaveBeenCalledWith(`SELECT * FROM posts LIMIT ? OFFSET ?`, [mockLimit, mockOffset])
        expect(db.query).resolves.toEqual([[], []])
        expect(returnGetAll).toEqual([])
    })

    test('catch() block to log and throw caught errors', async () => {
        db.query.mockRejectedValue(new Error())

        await expect(getAll(mockLimit, mockOffset)).rejects.toThrow(new Error("Error fetching all posts"))
        expect(console.error).toHaveBeenCalledWith('Error fetching all posts:', new Error())
    }) 
})