import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { DPSFilter, IFile } from '../models/file.model';

@Injectable({ providedIn: 'root' })
export class DPSService {
    private _http = inject(HttpClient);
    private _urlDps = `/services/dps-crivo-batch/dps/validation`;

    fetchValidations(filter: DPSFilter) {
        let q = new HttpParams();

        q = q.append('idInstPagamento', filter.paymentInstitutionId);
        let regulatoryValue = filter.regulatory.toString().toLowerCase().replace('_', '');

        q = q.append('regulatory', regulatoryValue === 'decred' ? 'dimp' : regulatoryValue);
        q = q.append('dataAte', filter.period.format());

        if (filter.filename) {
            q = q.append('filename', filter.filename);
        }

        if (filter.status) {
            q = q.append('status', filter.status);
        }

        filter.fileTypes.forEach((el) => (q = q.append('filetype', el)));

        return this._http.get<IFile[]>(this._urlDps, { params: q });
    }
}
