import { Todo } from "../models/todos.model.js"


export async function createTodo(req,res){

    try {

        const {title, description, priority, dueDate} = req.body;

        if(!title){
            return res.status(400).json({
                success: false,
                message: "Title is Required"
            });
        }

        const newTodo = new Todo({
            title,
            description,
            priority,
            dueDate: dueDate ?? null,
        });
        await newTodo.save();

        res.status(201).json({
            success: true,
            message: "Todo Created Successfully",
            todo: newTodo
        });
        
    } catch (error) {
        console.error("Internal Server Error:"+error.message);
        res.status(500).json({
            success: false,
            message : "Internal Server Error"
        });
    }

}