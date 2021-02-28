import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

lista = [];
nomeMoeda = String;
moedaCode = String;
moedaCodeIn = String;

  constructor(private apiService: ApiService) {
    this.listaDados();
  }

  listaDados(){
    this.apiService.getResultados().subscribe(data=>{
      this.nomeMoeda = data[0]['name'];
      this.moedaCode = data[0]['code'];
      this.moedaCodeIn = data[0]['codein'];
      this.lista = data;
      console.log(data);
    })
  }



}
