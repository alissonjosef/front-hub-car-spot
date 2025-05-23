import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { establishmentsMockData } from '../../registrations/mock/establishment';
import { IEstablishments } from '../../registrations/models/establishment';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  constructor(private _http: HttpClient) { }

  getInstitutions(): Promise<IEstablishments[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(establishmentsMockData);
    }, 500);
  });
}
}
