import { Router } from "express";
import { TodoRoutes } from "./todos/routes";

export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/todos', TodoRoutes.routes);
        // router.use('/api/todos', TodoRoutes.routes);
        // router.use('/api/auth', AuthRoutes.routes);
        // router.use('/api/user', UserRoutes.routes);
        // router.use('/api/product', ProductRoutes.routes);
        // router.use('/api/clients', ClientsRoutes.routes);


        return router;
    }
}