const todoModel = require('../models/todo.model');

module.exports = {
    insertToDo, 
    getToDo, 
    deleteToDo, 
    batchDelete, 
    updateToDo
}
/**
 * 
 * @param {*} req  = {
 *      title -> String todo title
 *      todo -> String description of the todo task
 * }
 */
async function insertToDo(req, res){
    var username = req.user.username;
    var {title, todo} = req.body;
    var todoData = new todoModel({
        title: title,
        todo: todo, 
        user: username, 
    });
    try{
        var result = await todoData.save();
        res.send({
            "status": "success",
            "result": result
        });
    } catch(e){
        res.status(500).send({
            "status": "failed",
            "result": e.toString()
        });
    }
}
/**
 * 
 * @param {*} req.query = {
 *      pageSize -> length of allowable array
 *      pageIndex -> page number
 *      id -> for specific search of the todo items, nullable
 * }    
 */
async function getToDo(req, res){
    var {
        pageSize, 
        pageIndex,
        id 
    } = req.query;
    var username =req.user.username;
    var page = parseInt(pageIndex)|| 1;
    var limit = parseInt(pageSize)||0;
    var searchParams = id != null? {user: username, _id: id} : {user: username}
    var skipIndex=  (page -1) * limit;
    var count = await todoModel.countDocuments(searchParams);
    var data = await todoModel.find(searchParams).limit(limit).skip(skipIndex);
    res.json({
        "status": "success", 
        "result": {
            "data": data, 
            "count": count, 
            "pageSize": limit, 
            "pageIndex": page
        }
    });
}
/**
 * 
 * @param req.body.id -> mongodb _id of the todo item 
 */
async function deleteToDo(req, res){
    var username =req.user.username;
    var id = req.body.id;
    try {
        await todoModel.findOneAndDelete({_id: id, user: username});
        res.json({
            "status": "success",
            "result": `Deleting ${id} is a success!`
        })
    } catch(e){
        res.status(500).json({
            "status": "failed", 
            "result": e.toString()
        })
    }
}
/**
 * @param req.body = {
 *      id -> mongodb _id of the todo item, 
 *      todo -> string description of the todo item
 *      done -> boolean indicating if the todo item is already done.
 *      }
 */
async function updateToDo(req, res){
    try{
        var {
            id, todo, done, title
        } = req.body;
        var result = await todoModel.findOneAndUpdate({_id: id}, {$set: {todo: todo, done: done, title: title}}, {new: true});
        if(result == null){
            res.status(404).send({
                "status": "failed", 
                "result": "ToDo not found"
            });
        } else {
            res.send({
                "status": "success", 
                "result": result
            });
        }
    }catch(e){
        res.status(500).send({
            "status": "success", 
            "result": e.toString()
        })
    }
}
/**
 * req.body.idList -> Array List of strings pointing to the ids of the todo items. 
 */
async function batchDelete(req, res){
    var idList = req.body.idList;
    var username = req.user.username;
    try{
        await todoModel.deleteMany({_id: {$in: idList}, user: username})
        res.send({
            "status": "success",
            "result": `Deleting the following todos is a success: ${idList}`
        });
    }catch(e){
        res.status(500).send({
            'status': "failed", 
            "result": e.toString()
        })
    }
}