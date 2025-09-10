import { environment } from "src/environments/environment.prod";

export default class ApiRoutes {
    private static apiEventRouter = '/api/eventos/';
    static apiEvents = (): string => environment.baseUrl + this.apiEventRouter;
    static apiEventWith = (identifier: string): string => environment.baseUrl + this.apiEventRouter + identifier;
}
