const express =  require('express')
const { getAll, postTask, updTask, deleteTask, getSingle } = require('../controller/taskc')
const route = express.Router()
route.route("/").get(getAll).post(postTask)
route.route("/:taskID").patch(updTask).delete(deleteTask).get(getSingle)
module.exports = route
