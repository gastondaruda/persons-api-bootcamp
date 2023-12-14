module.exports = (error, req, res, next) => {
    console.error(error)
    console.log(error.name)
    if(error.name === "CastError"){
        res.status(400).send({ error: 'malformatted id' })
    }else if (error.name === 'ValidationError') {
            return response.status(400).json({ error: error.message })
        }

}