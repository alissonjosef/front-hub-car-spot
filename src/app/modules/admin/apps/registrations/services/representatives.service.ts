import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { representativesMockData } from '../mock/representatives';
import { IRepresentatives } from '../models/representatives';

@Injectable({
  providedIn: 'root'
})
export class RepresentativesService {

  constructor(private _http: HttpClient) { }

  getRepresentatives(): Promise<IRepresentatives[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(representativesMockData);
    }, 500);
  });
}

getRepresentativesById(id: number): Promise<IRepresentatives | undefined> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const representatives = representativesMockData.find((inst) => inst.id === id);
                resolve(representatives);
            }, 500);
        });
    }
}
