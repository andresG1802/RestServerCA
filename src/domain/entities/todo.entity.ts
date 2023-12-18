
export class TodoEntity {
    constructor(
        public id: number,
        public text: string,
        public completeAt?: Date|null
    ){}

    get isCompleted(){
        //Doble negacion para hacer 
        //Para el true
        return !!this.completeAt;
    }
    
    public static fromObject( object: {[key:string]:any})
    {
        const {id,text,completeAt} = object;
        if(!id) throw 'Id is required';
        if(!text) throw 'text is required';

        let newCompletedAt;
        if(completeAt)
        {
            newCompletedAt = new Date(completeAt);
            //validamos que es una fecha valida
            if( isNaN(newCompletedAt.getTime()))
            {
                throw 'CompletedAt is not a valid date';
            }
        }

        return new TodoEntity(id,text,completeAt)
    }
}