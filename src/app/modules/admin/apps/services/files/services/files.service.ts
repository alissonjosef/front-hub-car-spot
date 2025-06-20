import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IAPIResponse } from 'app/models/api.model';
import { env } from 'environments/env';
import moment from 'moment';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileService {
    private _http = inject(HttpClient);
    private _url = `${env.api.url}/File`;

   
}
