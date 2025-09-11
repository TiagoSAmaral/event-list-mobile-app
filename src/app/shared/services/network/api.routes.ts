import { buildURL } from "@shared/logic/query.params";
import { environment } from "src/environments/environment.prod";

export default class ApiRoutes {
    private static apiEventRouter = '/api/eventos/';
    static apiEvents = (): string => buildURL(environment.baseUrl, this.apiEventRouter);
    static apiEventWith = (identifier: string): string => buildURL(environment.baseUrl, this.apiEventRouter, { id: identifier });
}
