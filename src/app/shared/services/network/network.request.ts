
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import INetworkRequest from '@shared/interfaces/network.request.interface';
import { HttpRequestMethod } from '@shared/types/http.methods.type';

import { RequestHeaders } from '@shared/types/http.headers.type';

@Injectable({
    providedIn: 'root'
})
export default class NetworkRequest implements INetworkRequest  {

    constructor(private http: HttpClient) {}

    // request = <T>(urlPath: string, method: HttpRequestMethod, payload?: any, headers?: RequestHeaders): Observable<T> | undefined => this.http.request<T>(method, urlPath, { headers: headers, body: payload });

    request = <T>(urlPath: string, method: HttpRequestMethod, body?: any, headers?: RequestHeaders): Observable<T> => this.http.request<T>(method, urlPath, {  body, headers, responseType: 'json' }) as Observable<T>;

}