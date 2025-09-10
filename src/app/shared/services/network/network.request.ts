
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import INetworkRequest from '@shared/interfaces/network.request.interface';
import ApiBlock from './apiblock.config';

@Injectable()
export default class NetworkRequest implements INetworkRequest  {

    constructor(private http: HttpClient) {}
    request = <T>({method, url, body, headers}: ApiBlock): Observable<T> => this.http.request<T>(method, url, {  body, headers, responseType: 'json' }) as Observable<T>;
}