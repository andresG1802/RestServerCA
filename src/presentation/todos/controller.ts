import { Request, Response, response } from "express";
import { prisma } from "../../data/postgres";

export class TodosController{

    //* DI
    constructor(){}

    public getTodos = async(req:Request,res:Response) => {
        //Para todos
        const todos = await prisma.todo.findMany(); 
        res.json(todos);
    }
    
    public getTodoById = async(req:Request,res:Response)=>{
        
        const id = +req.params.id;
        
        if (isNaN(id)) return res.status(400).json({error:'ID argument is not a number'});
        
        const todo = await prisma.todo.findFirst({
            where:{id}
        });
        
        (todo)
            ? res.json(todo)
            : res.status(404).json({error:`TODO with id ${id} not found`});
    }

    public createTodo = async(req:Request, res:Response)=>{
        const { text } = req.body;

        if(!text) res.status(400).json({error:'Text property is required'});

        const todo = await prisma.todo.create({
            data:{ text }
        });
        
        res.json(todo);
    };

    public updateTodo = async(req: Request, res:Response )=>{

        const id= +req.params.id;
        const {text,completedAt} = req.body;
        
        const todo = await prisma.todo.findFirst({
            where:{id}
        });

        if(!todo) return res.status(400).json({error:'ID argument did not found'});
        
        const todoUpdated = await prisma.todo.update({
            where:{id},
            data:{
                text,
                completedAt:(completedAt) ? new Date (completedAt) : null
            }
        });

        res.json(todoUpdated);
    }

    public deleteTodo = async(req : Request , res:Response)=>{
        
        const id= +req.params.id;
        
        const todo = await prisma.todo.findFirst({
            where:{id}
        });

        if(!todo) return res.status(404).json({error:`TODO with id ${id} not found`});

        //Suave si no pones el where en este metodo del delete
        //te puedes cargar la base de datos
        const deleted = await prisma.todo.delete({
            where:{id}
        });

        (deleted)
            ? res.json(deleted)
            : res.status(400).json({error:`Todo with id ${ id } not found`})

        res.json({todo,deleted});
    
    }
}