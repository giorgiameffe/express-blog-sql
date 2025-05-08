// dichiarazione funzione middleware 

function notFound (req, res, next) {

    res.status(404).json ({
        error: "Not Found",
        message: "Pagina non trovata"
    })
}

module.exports = notFound;