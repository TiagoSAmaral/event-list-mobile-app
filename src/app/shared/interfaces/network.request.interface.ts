import { RequestHeaders } from "@shared/types/http.headers.type"
import { HttpRequestMethod } from "@shared/types/http.methods.type"
import { Observable } from "rxjs"

export default interface INetworkRequest {

    request: <T>(urlPath: string, method: HttpRequestMethod, payload?: any, headers?: RequestHeaders) => Observable<T>
}