const Post = require('../model/postModel')

exports.create = async (req, res) => {
    try {
        const { title, content, category, tags } = req.body;

        if (!title || !content || !category || !tags) {
            return res.sendStatus(400);
        }
        const data = await Post.create(req.body)
        res.status(201).send(data)
    } catch (error) {
        console.log(error)
    }
}

exports.update = async (req, res) => {
    const {postID} = req.params;
    const { title, content, category, tags } = req.body;

    if (!title || !content || !category || !tags) {
        return res.sendStatus(400);
    }
    const data = await Post.update(postID, req.body)
    res.status(200).send(data)
}

exports.delete = async (req, res) => {
    const {postID} = req.params
    const data = await Post.delete(postID)
    
    if (data === 204) {
        return res.sendStatus(data)
    } else {
        return res.sendStatus(data)
    }
}

exports.getById = async (req, res) => {
    const {postID} = req.params;
    const data = await Post.getById(postID)

    if (data.length === 0) {
        res.sendStatus(404)
    } else {
        res.status(200).send(data)
    }
}

exports.getAll = async (req, res) => {
    const term = req.query.term
    const page = parseInt(req.query.page, 10) || 1; // Current page (default: 1)
    const limit = parseInt(req.query.limit, 10) || 10; // Items per page (default: 10)
    const offset = (page - 1) * limit;
    
    const data = await Post.getAll(limit, offset)
    // const [data, total] = await Promise.all([
    //     await Post.getAll(limit, offset),
    //     await Post.getCount()
    // ])

    if (!term) {
        res.status(200).send(data) // if no search term is provided return all the posts
    } else {
        const filterdPosts = data.filter((post) => {
            return post.title.toLowerCase().includes(term.toLowerCase()) ||
            post.content.toLowerCase().includes(term.toLowerCase()) ||
            post.category.toLowerCase().includes(term.toLowerCase())
        })

       filterdPosts.length === 0 ?
        res.sendStatus(404) // if filterd posts is not present send not found status 
        : res.status(200).send(filterdPosts) // send the filterd posts
    }
}

exports.redirectToGetAll = async (req, res) => {
    res.redirect('/posts')
}