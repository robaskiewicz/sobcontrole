import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

lista = [];
nomeMoeda =  String;
moedaCode = String;
moedaCodeIn =  String;
moedaData =  String;

dataAtual = new Date();
dataInicial = Date();
dataFim = Date();
dataString = String;


  constructor(private apiService: ApiService,
  public datepipe: DatePipe) {

    this.listaDados(this.datepipe.transform(this.dataInicial, 'yyyyMM01'), this.datepipe.transform(this.dataFim, 'yyyyMMdd'));
  }

rebuscarData() {
      this.listaDados(this.datepipe.transform(this.dataInicial, 'yyyyMMdd'), this.datepipe.transform(this.dataFim, 'yyyyMMdd'));
}

  listaDados(dataInicial : string, dataFinal : string){
    this.apiService.getCotacaoPorData(dataInicial, dataFinal).subscribe(data=>{

        for (var i in data) {

          if(i==='0'){
            this.nomeMoeda = data[i]['name'];
            this.moedaCode = data[i]['code'];
            this.moedaCodeIn = data[i]['codein'];
          }

          const date = new Date(data[i]['timestamp']*1000);
          //console.log(this.datepipe.transform(date, 'yyyyMMdd'));

          data[i]['timestamp'] = this.datepipe.transform(date, 'dd/MM/yyyy');

          this.lista.push(data[i]);
        }

    })
  }



}
