const notfound=(req,res)=>{
    return res.status(400).send(`<h1>404 NOT FOUND </h1>`)
}
module.exports = notfound