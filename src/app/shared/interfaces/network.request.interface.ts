import { Observable } from "rxjs"
import { InjectionToken } from "@angular/core";
import ApiBlock from "@shared/services/network/apiblock.config";

export const NETWORK_REQUEST = new InjectionToken<INetworkRequest>('NETWORK_REQUEST');

export default interface INetworkRequest {
    request: <T>(requirements: ApiBlock) => Observable<T>
}
