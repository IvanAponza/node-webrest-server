export class UpdateTodoDto {

    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly createAt?: Date,
    ) { }

    //Crear un obj que actualice solo las property que nos manden
    get values() {

        const returnObj: { [key: string]: any } = {};

        if (this.text) returnObj.text = this.text;
        if (this.createAt) returnObj.createAt = this.createAt;

        return returnObj;
    }

    static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {

        const { id, text, createAt } = props;
        let newCreateAt = createAt; //si viene un valor 

        if (!id || isNaN(Number(id))) {
            return ['id must be a valid number']
        }

        //Validacion fecha
        if (createAt) {
            newCreateAt = new Date(createAt); //actualiza valor
            if (newCreateAt.toString() === 'Invalid Date') {
                return ['CreateAt must be a valid date'];
            }
        }

        return [undefined, new UpdateTodoDto(id, text, newCreateAt)];
    }
}