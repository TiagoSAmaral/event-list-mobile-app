import { HttpRequestHeaders } from "@shared/types/http.request.headers.type";
import { HttpRequestMethod } from "@shared/types/http.methods.type";

export default interface ApiBlock {
    url: string;
    method: HttpRequestMethod,
    headers?: HttpRequestHeaders,
    body?: any,
}

