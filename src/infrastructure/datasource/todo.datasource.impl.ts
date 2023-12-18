import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from "../../domain";




export class TodoDatasourceImpl implements TodoDataSource{
    
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {    
        const todo = await prisma.todo.create({
            data:createTodoDto!
        });

        return TodoEntity.fromObject(todo);
    }
    
    async getAll(): Promise<TodoEntity[]> {
        
        const todos = await prisma.todo.findMany();
        //Tenemos que hacer el mapeo

        return todos.map(todo=>TodoEntity.fromObject(todo));
    }
    
    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({
            where:{ id }
        });

        if( !todo) throw `Todo with id ${ id } not found`;

        //El fromObject no es metodo del mismo nodejs 
        //Se creo en
        return TodoEntity.fromObject(todo);
    }
    
    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        const todo = await this.findById( updateTodoDto.id);
        const updatedTodo = await prisma.todo.update({
            where: {id: updateTodoDto.id},
            data: updateTodoDto!.values
        });

        return TodoEntity.fromObject((updateTodoDto));
    }
    
    async deleteById(id: number): Promise<TodoEntity> {
        await this.findById(id);
        
        const deleted = await prisma.todo.delete({
            where:{id}
        });

        return TodoEntity.fromObject(deleted);
    }

}

