// importare posts
const posts = require('../data/posts.js');

// importare mysql 
const mysql = require('../data/db.js');
// importare connection
const connection = require('../data/db.js');

// funzioni operazioni CRUD

function index(req, res) {

    // salvare in una variabile la query da utilizzare
    const sql = 'SELECT * FROM posts';

    // eseguire la query per mostrare i post
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    })
}

function show(req, res) {

    const id = parseInt(req.params.id);
    // cercare il post tramite l'id
    const post = posts.find(post => post.id === id);

    // controllare che esista il post con l'id inserito
    if (!post) {

        return res.status(404).json({
            status: 404,
            error: 'Not Found',
            message: 'Post non trovato'
        })
    }
    // restituire il post in formato JSON
    res.json(post);
}

function store(req, res) {
    console.log(req.body);
    // incrementare l'id dell'ultimo oggetto dell'array
    const newId = posts.at(-1).id + 1;
    const { title, content, image, tags } = req.body;

    // creare un nuovo post
    const newPost = {
        id: newId,
        title,
        content,
        image,
        tags
    }

    // aggiungere il nuovo post all'array di post
    posts.push(newPost);
    console.log(posts);

    // restituire lo status corretto (201=Created)
    res.status(201);
    // restituire il post creato in formato json
    res.json(newPost);

}

function update(req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    console.log(post);

    // controllare che esista il post con l'id inserito
    if (!post) {

        return res.status(404).json({
            status: 404,
            error: 'Not Found',
            message: 'Post non trovato'
        })
    }

    // modificare interamente un oggetto post
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;

    console.log(post);
    // restituire il post modificato in formato json
    res.json(post);
}

function modify(req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    // controllare che esista il post con l'id inserito
    if (!post) {

        return res.status(404).json({
            status: 404,
            error: 'Not Found',
            message: 'Post non trovato'
        })
    }

    // modificare un post in base al campo che si vuole aggiornare
    if (req.body.title) {
        post.title = req.body.title
    }

    if (req.body.content) {
        post.content = req.body.content;
    }

    if (req.body.image) {
        post.title = req.body.image;
    }

    if (req.body.tags) {
        post.tags = req.body.tags;
    }

    // restituire il post in formato json
    res.json(post);

}

function destroy(req, res) {

    // recuperare id dall'URL
    const id = parseInt(req.params.id);

    // salvare in una variabile la query da utilizzare
    const sql = 'DELETE FROM posts WHERE id = ?';

    // eseguire la query per eliminare il post
    connection.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: 'Eliminazione del post non avvenuta' });
        res.sendStatus(204);
    })

}

// esportazione 
module.exports = { index, show, store, update, modify, destroy };
