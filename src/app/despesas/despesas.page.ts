import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { FormComponent } from './form/form.component';

import {LancamentosService} from '../services/lancamentos.service';
import  {Lancamentos} from '../model/lancamentos';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.page.html',
  styleUrls: ['./despesas.page.scss'],
})
export class DespesasPage implements OnInit {

  dataSaldo = Date();
  listaLancamentos = [];
  constructor(public modalController: ModalController, public lancamentoService: LancamentosService, public datepipe: DatePipe) {
  }

  ngOnInit() {

      this.dataSaldo;
      let lancamentos= this.lancamentoService.buscarTodos();

      lancamentos.snapshotChanges().subscribe(res => {
          this.listaLancamentos = [];
          res.forEach(item => {
            let a = item.payload.toJSON();

            if(this.datepipe.transform(a['data'], 'MM-yyyy') == this.datepipe.transform(this.dataSaldo, 'MM-yyyy') && a['tipo'] == 'despesa'){

                    a['key'] = item.key;
                    this.listaLancamentos.push(a as Lancamentos);
            }
          })
        })
  }

  async abreFormulario() {
    const modal = await this.modalController.create({
      component: FormComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async alterarLancamento(key) {
    const modal = await this.modalController.create({
      component: FormComponent,
      componentProps:{
        'key':key
      }
    });
    return await modal.present();
  }



rebuscarData() {
  this.ngOnInit();
}

}
