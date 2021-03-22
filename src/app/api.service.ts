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


  getUltimaCotacao(){
    return this.httpClient.get('https://economia.awesomeapi.com.br/json/USD-BRL');
  }

  getCotacaoPorData(dataInicial : string, dataFinal : string){
    return this.httpClient.get('https://economia.awesomeapi.com.br/json/daily/USD-BRL/?start_date='+dataInicial+'&end_date='+dataFinal);
  }




}
