

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
    
}