import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from 'environments/env';
import { IUsuarioInstituicao, NewUsuarioInstituicao } from '../../services/files/models/usuario-instituicao.model';

export type EntityResponseType = HttpResponse<IUsuarioInstituicao>;
export type EntityArrayResponseType = HttpResponse<IUsuarioInstituicao[]>;

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  protected _http = inject(HttpClient);
  private _url = `${env.api.url}api/usuario-instituicaos`;

  constructor() {}

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this._http.get<IUsuarioInstituicao[]>(this._url, { params: options, observe: 'response' });
  }

  getUserById(id: string): Observable<EntityResponseType> {
    return this._http.get<IUsuarioInstituicao>(`${this._url}/${id}`, { observe: 'response' });
  }

  create(usuarioInstituicao: NewUsuarioInstituicao): Observable<EntityResponseType> {
    return this._http.post<IUsuarioInstituicao>(this._url, usuarioInstituicao, { observe: 'response' });
  }

  update(usuarioInstituicao: IUsuarioInstituicao): Observable<EntityResponseType> {
    return this._http.put<IUsuarioInstituicao>(
      `${this._url}/${this.getUsuarioInstituicaoIdentifier(usuarioInstituicao)}`,
      usuarioInstituicao,
      { observe: 'response' }
    );
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this._http.delete(`${this._url}/${id}`, { observe: 'response' });
  }

  private getUsuarioInstituicaoIdentifier(usuario: Pick<IUsuarioInstituicao, 'id'>): string {
    return usuario.id;
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
