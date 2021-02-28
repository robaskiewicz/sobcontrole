import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getResultados(){
    return this.httpClient.get('https://economia.awesomeapi.com.br/json/daily/USD-BRL');
  }
}
