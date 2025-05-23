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

    getUFFilterTransactions(fileId: number): Observable<IAPIResponse<string[]>> {
        const params = new HttpParams().set('arquivo_id', fileId);
        return this._http
            .get<IAPIResponse<string[]>>(`${this._url}/GetArquivoFiltroUF`, { params })
            .pipe(map((resp) => ({ ...resp, data: resp.data.filter((el) => el) })));
    }

    getDateFilterTransactions(fileId: number, ufs: string[]): Observable<IAPIResponse<Date[]>> {
        let params = new HttpParams().set('arquivo_id', fileId.toString());

        ufs.forEach((uf) => {
            params = params.append('Ufs', uf);
        });

        return this._http
            .get<IAPIResponse<Date[]>>(`${this._url}/GetArquivoFiltroData`, {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
                params,
            })
            .pipe(
                map((resp) => {
                    const sorted = resp.data.sort(
                        (a, b) => moment(a).toDate().getTime() - moment(b).toDate().getTime()
                    );
                    return {
                        ...resp,
                        data: sorted,
                    };
                })
            );
    }

    getTransactions(fileId: number, filters?: { ufs?: string[]; dates?: Date[] }): Observable<IAPIResponse<any[]>> {
        let params = new HttpParams().set('arquivo_id', fileId.toString());

        if (filters?.ufs) {
            params = params.set('ufs', filters.ufs.join(','));
        }

        if (filters?.dates) {
            params = params.set('dates', filters.dates.join(','));
        }

        return this._http.get<IAPIResponse<any[]>>(`${this._url}/GetArquivosSumarioDia`, { params });
    }

    getArquivoFiltroTipoArquivo(): Observable<IAPIResponse<any[]>> {
        return this._http.get<IAPIResponse<any[]>>(`${this._url}/GetArquivoFiltroTipoArquivo`);
    }

    listFiles(
        StatusId: number,
        UltimosQtdDias: number,
        page: number,
        size: number,
        TipoArquivosId: number[],
        orderBy?: string,
        ascDesc?: string,
        fileName?: string
    ): Observable<IAPIResponse<any[]>> {
        let params = new HttpParams()
            .set('StatusId', StatusId.toString())
            .set('UltimosQtdDias', UltimosQtdDias.toString())
            .set('page', page.toString())
            .set('size', size.toString());
        (TipoArquivosId ?? []).forEach((id) => {
            params = params.append('TipoArquivosId', id.toString());
        });

        if (orderBy) {
            params = params.set('orderBy', orderBy);
        }
        if (ascDesc) {
            params = params.set('ascDesc', ascDesc);
        }
        if (fileName) {
            params = params.set('buscarPorNome', fileName);
        }

        return this._http.get<IAPIResponse<any[]>>(`${this._url}/GetArquivosAsync`, { params });
    }

    downloadInconsistences(fileId: number) {
        return this._http.get(`${this._url}/DownloadArquivosErros/${fileId}`, {
            observe: 'response',
            responseType: 'arraybuffer',
        });
    }
}
