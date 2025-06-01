import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from 'environments/env';
import { IUsuarioInstituicao } from '../../services/files/models/usuario-instituicao.model';

export type EntityArrayResponseType = HttpResponse<IUsuarioInstituicao[]>;

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  protected _http = inject(HttpClient);
  private _url = `${env.api.url}api/usuario-instituicaos`;
  constructor() { }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this._http.get<IUsuarioInstituicao[]>(this._url, { params: options, observe: 'response' });
  }
}

export function createRequestOption(req?: Record<string, any>): HttpParams {
  let options = new HttpParams();

  if (req) {
    for (const [key, value] of Object.entries(req)) {
      if (value !== undefined && value !== null) {
        const values = Array.isArray(value) ? value : [value];
        values
          .filter(v => v !== '')
          .forEach(v => {
            options = options.append(key, v);
          });
      }
    }
  }

  return options;
}

