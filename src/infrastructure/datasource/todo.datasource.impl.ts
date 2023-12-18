import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from "../../domain";




export class TodoDatasourceImpl implements TodoDataSource{
    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }
    
    getAll(): Promise<TodoEntity[]> {
        throw new Error("Method not implemented.");
    }
    
    findById(id: number): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }
    
    updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }
    
    deleteById(id: number): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }

}

