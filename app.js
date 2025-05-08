// importazione express
const express = require('express');

// funzione express
const app = express();

// importazione middlewares
const notFound = require('./middlewares/not-found.js');
const errorsHandler = require('./middlewares/errors-handler.js');

// registrazione body-parser => decodificare il body per far sì che venga letto
app.use(express.json()); // in formato json

// router 
const postsRouter = require('./routers/posts-router.js');
app.use('/posts', postsRouter);

// registrazione del middleware
app.use(notFound);
app.use(errorsHandler);

// porta 
const port = 4000;
app.listen(port, () => {
    console.log(`Server attivo sulla porta ${port}`);
})

// public assests
app.use(express.static('public'));

// homepage
app.get('/', (req, res) => {
    res.send('Homepage');
})


