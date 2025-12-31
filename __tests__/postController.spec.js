const Post = require('../app/model/postModel')
const { create, update, getById, getAll } = require('../app/controller/postController');

jest.mock('../app/model/postModel', () => ({
    create: jest.fn(),
    update: jest.fn(),
    getById: jest.fn().mockResolvedValue([]),
    getAll: jest.fn(),
}));
const mockReq = {
    params: {
        postID: expect.any(Number)
    },
    body: {
        title: 'title',
        content: 'content',
        category: 'category',
        tags: 'tags'
    },
    query: {
        term: 'term',
        page: 1,
        limit: 10,
    }
}
const mockRes = {
    sendStatus: jest.fn(),
    send: jest.fn(),
    status: jest.fn().mockReturnThis(),
}


describe('Create function', () => {

    test('returns a 400 status when body is missing any property', async () => {
        const copyMockReq = { body: {} }
        await create(copyMockReq, mockRes);

        expect(mockRes.sendStatus).toHaveBeenCalledWith(400)
    })

    test('created data and sent with 201 status', async () => {
        await create(mockReq, mockRes)

        expect(Post.create).toHaveBeenCalledWith(mockReq.body)
        expect(mockRes.status).toHaveBeenCalledWith(201)
        expect(mockRes.send).toHaveBeenCalled()
    })

    test('catch() block to log error', async () => {
        jest.spyOn(console, 'log').mockImplementation(() => {})
        
        await Post.create.mockRejectedValue(new Error())
        await create(mockReq, mockRes)

        expect(console.log).toHaveBeenCalledWith(new Error())
    })

})


describe('Update function', () => {
    test('returns a 400 status when body is missing properties', async () => {
        const copyMockReq = { body: {} };
        await update(copyMockReq, mockRes);

        expect(mockRes.sendStatus).toHaveBeenCalledWith(400)
    })

    test('return updated post', async () => {
        const post_id = mockReq.params.postID
        await update(mockReq, mockRes);

        expect(Post.update).toHaveBeenCalledWith(post_id, mockReq.body)
        expect(mockRes.status).toHaveBeenCalledWith(200)
        expect(mockRes.send).toHaveBeenCalled()
    })
})

describe('GetById function', () => {

    test('returns a 400 status when body is missing properties', async () => {
        const post_id = mockReq.params.postID;
        await getById(mockReq, mockRes)
        const data = await Post.getById(post_id)

        if (data.length == 0) {
            expect(mockRes.sendStatus).toHaveBeenCalled()
        } else {
            expect(mockRes.status).toHaveBeenCalledWith(200)
            expect(mockRes.send).toHaveBeenCalledWith(data)
        }

    })

})

describe('getAll posts', () => {
    const limit = mockReq.query.limit

    test('send all unfiltered posts', async () => {
        const copyMockReq = { query: { term: null } }
        const offset = (mockReq.query.page - 1) * limit;
        await getAll(copyMockReq, mockRes);
        const data = await Post.getAll(limit, offset)

        expect(Post.getAll).toHaveBeenCalled()
        expect(mockRes.status).toHaveBeenCalledWith(200)
        expect(mockRes.send).toHaveBeenCalled(data)
    })

    test('return 404 status', async () => {
        const term = mockReq.query.term
        const offset = (mockReq.query.page - 1) * limit;


        // jest.spyOn(Post, 'getAll').mockResolvedValue([{
        //     title: 'title',
        //     content: 'content',
        //     category: 'category',
        //     tags: 'tags'
        // },])

        await Post.getAll.mockResolvedValue([{
            title: 'title',
            content: 'content',
            category: 'category',
            tags: 'tags'
        }]);

        await getAll(mockReq, mockRes);

        expect(mockRes.sendStatus).toHaveBeenCalledWith(404);
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.send).not.toHaveBeenCalled();
    })

    // test('return 20 status, filtered posts by search term', async () => {
    //     await Post.getAll.mockResolvedValue([]);

    //     await getAll(mockReq, mockRes);

    //     expect(mockRes.sendStatus).not.toHaveBeenCalled();
    //     expect(mockRes.status).toHaveBeenCalled();
    //     expect(mockRes.send).toHaveBeenCalled();
    // })
}) 