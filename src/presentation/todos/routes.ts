import { Router } from "express";
import { TodoController } from "./controller.todo";


export class TodoRoutes {

    public static get routes(): Router {
        const router = Router();

        const todoController = new TodoController()

        router.get('/', todoController.getTodo);
        router.get('/:id', todoController.getTodoById);
        router.post('/', todoController.createTodo);
        router.put('/:id', todoController.updateTodo);
        router.delete('/:id', todoController.deleteTodo);

        return router;
    }
}