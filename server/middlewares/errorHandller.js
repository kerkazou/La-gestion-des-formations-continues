const errorHandller = async (error, req, res, next) => {
    res.status(202).send(error.message)
}

module.exports = errorHandller;