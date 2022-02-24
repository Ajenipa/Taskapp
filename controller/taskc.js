const {products} = require("../products")
const asyncWrapper = require("../middleware/asyncWrapper")
const Task = require('../model/task')
const {createCustomError} = require("../errors/custom-error")
const getAll= asyncWrapper(async(req,res)=>{
        const tasks = await Task.find({})
        res.status(200).json({tasks})
})
const postTask=asyncWrapper(async(req,res)=>{
    
        const body = req.body
        const task = await Task.create(body)
        res.status(200).json(task)

    
})
const updTask=asyncWrapper(async(req,res,next)=>{
    
        const {taskID} = req.params
        const body = req.body
        const tasks = await Task.findOneAndUpdate({_id:taskID}, body,{runValidators:true, new:true})
        if(!tasks){
            const error = new Error('Task Does Not Exist')
            error.status = 404
            return next(error)
            return res.status(200).json({data:`${taskID} does not exist` })
         }
        res.status(200).json({tasks})
        
    
   
    
})
const deleteTask=asyncWrapper(async(req,res)=>{
    
        const {taskID} = req.params
        const deleteTask = await Task.findOneAndDelete({_id:taskID})
        if(!deleteTask){
           return res.status(200).json({msg:`${taskID} does not exist`})

        }
        res.status(200).json({success:true, data:deleteTask})

    
    
    
})
const getSingle=asyncWrapper(async(req,res,next)=>{
        
    
        const {taskID} =  req.params
        console.log(taskID)
        const tasks = await Task.findOne({_id:taskID})
        if(!tasks){
        //     const error = new Error('NOT FOUNDO');
        //     error.status = 404
        //     return next(error)
        //     return res.status(200).json({data:`${taskID} does not exist` })
               return next (createCustomError(`${taskID} does not exist`, 404))
        } 
        res.status(200).json({tasks})
    
    

})
module.exports = {getAll,postTask,updTask,deleteTask,getSingle}