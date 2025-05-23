import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IAPIResponse } from 'app/models/api.model';
import { env } from 'environments/env';
import { Observable, delay, map, of } from 'rxjs';
import { IFile } from '../../files/models/file.model';
import { MOCK_REQUESTS_DIMP } from '../dimp/dimp-notification/requestDimp.model';
import { IDimpMovement, IDimpMovementMonthly } from '../dimp/models/dimp-movement.model';
import { IStatusNavigationHistoricItem } from '../models/movement-model';
import { EStatusMovement } from '../models/movement.enum';

@Injectable({
    providedIn: 'root',
})
export class TransactionMovementService {
    private _httpClient = inject(HttpClient);
    private _baseUrl = `${env.api.url}/Moviment`;

    getTransactionMovement(req: any): Observable<IAPIResponse<IDimpMovement>> {
        return this._httpClient.get<IAPIResponse<IDimpMovement>>(`${this._baseUrl}/GetMovimentsAsync`, {
            params: {
                ...req,
            },
        });
    }

    getTransactionMovementById(movementId: number): Observable<IAPIResponse<IDimpMovement>> {
        return this._httpClient.get<IAPIResponse<IDimpMovement>>(`${this._baseUrl}/GetMovimentById/${movementId}`).pipe(
            map((el) => {
                const somaEstabelecimentoLinhasErro = el.data.quantidadeEstabelecimentoElegivelPendencia + el.data.quantidadeEstabelecimentoNaoElegivelPendencia;
                return {
                    ...el,
                    data: {
                        ...el.data,
                        somaEstabelecimentoLinhasErro,
                        somaEstabelecimentoPendencia: somaEstabelecimentoLinhasErro + el.data.quantidadeEstabelecimentoNaoEncontrado,
                        somaTransacaoPendencia: el.data.quantidadeTransacaoPendencia + el.data.quantidadeTransacaoSemEstabelecimento,
                        somaValorTransacaoPendencia: el.data.valorTransacaoPendencia + el.data.valorTransacaoSemEstabelecimento,
                        sumCancelamentoPendencia: el.data.quantidadeCancelamentoPendencia + el.data.quantidadeCancelamentoSemEstabelecimento,
                        sumValorCancelamentoPendencia: el.data.valorCancelamentoPendencia + el.data.valorCancelamentoSemEstabelecimento,
                        sumExtemporaneoPendencia: el.data.quantidadeExtemporaneoPendencia + el.data.quantidadeExtemporaneoSemEstabelecimento,
                        sumValorExtemporaneoPendencia: el.data.valorExtemporaneoPendencia + el.data.valorExtemporaneoSemEstabelecimento,
                    },
                };
            })
        );
    }

    getMovimentDetailsByMovimentId(movementId: number): Observable<IAPIResponse<IDimpMovementMonthly[]>> {
        return this._httpClient.get<IAPIResponse<IDimpMovementMonthly[]>>(`${this._baseUrl}/GetMovimentDetailsByMovimentId/${movementId}`);
    }

    updateStatusMoviment(req: { movimentoId: number; statusId: EStatusMovement; retificadora?: boolean }[]) {
        return this._httpClient.put<IAPIResponse<IDimpMovement>>(`${this._baseUrl}/UpdateStatusMovimento`, req);
    }

    getStatusNavigationHistory(movementId: number) {
        return this._httpClient.get<IAPIResponse<IStatusNavigationHistoricItem[]>>(
            `${this._baseUrl}/GetMovimentStatusHistoricoAsync/${movementId}`,
            {
                params: {
                    page: 1,
                    size: 1000,
                },
            }
        );
    }

    getFilesFromMovementId(id: number) {
        return this._httpClient.get<IAPIResponse<IFile[]>>(`${this._baseUrl}/GetArquivoByMovimentoIdAsync/${id}`, {
            params: {
                page: 1,
                size: 1000,
            },
        });
    }

    getNotificationDimp() {
        /* return this._httpClient.get<IAPIResponse<any>>(`${this._baseUrl}/GetNotificationDimp`); */
        return of(MOCK_REQUESTS_DIMP).pipe(delay(300));
    }

    getFilesFromMovementMonthyId(id: number) {
        return this._httpClient.get<IAPIResponse<IFile[]>>(`${this._baseUrl}/GetArquivoByMovimentoDiaIdAsync/${id}`, {
            params: {
                page: 1,
                size: 1000,
            },
        });
    }

    downloadMovimentoErros(movimento_id: number): Observable<HttpResponse<ArrayBuffer>> {
        return this._httpClient.get(`${this._baseUrl}/DownloadMovimentoErros/${movimento_id}`, {
            observe: 'response',
            responseType: 'arraybuffer',
        });
    }

    downloadMovimentoDimp(dimpArquivoId: number): Observable<HttpResponse<ArrayBuffer>> {
        return this._httpClient.get(`${this._baseUrl}/DownloadMovimentoDimp/${dimpArquivoId}`, {
            observe: 'response',
            responseType: 'arraybuffer',
        });
    }
}
