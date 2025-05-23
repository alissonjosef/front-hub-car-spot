import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IInstitution } from '../models/institution';
import { institutions } from '../mock/institution';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  constructor(private _http: HttpClient) { }

  getInstitutions(): Promise<IInstitution[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(institutions);
    }, 500);
  });
}

 getRepresentativeById(id: number): Promise<IInstitution | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const institutionData = institutions.find((inst) => inst.id === id);
        resolve(institutionData);
      }, 500);
    });
  }

}
