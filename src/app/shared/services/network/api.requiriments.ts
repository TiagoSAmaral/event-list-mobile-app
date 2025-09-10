import ApiRoutes from "./api.routes";
import ApiBlock from "./apiblock.config";

export default class ApiRequiriments  {
    static listEvent = (): ApiBlock => { return { url: ApiRoutes.apiEvents(), method: 'get', headers: undefined, body: undefined } };
    static createEvent = (body: any): ApiBlock => { return { url: ApiRoutes.apiEvents(), method: 'post', headers: undefined, body } };
    static detailEvent = (identifier: string): ApiBlock => { return { url: ApiRoutes.apiEventWith(identifier), method: 'get', headers: undefined, body: undefined } };
    static deleteEvent = (identifier: string): ApiBlock => { return { url: ApiRoutes.apiEventWith(identifier), method: 'delete', headers: undefined, body: undefined } };
}
