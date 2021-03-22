import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FormComponent } from './form/form.component';

import {LancamentosService} from '../services/lancamentos.service';
import  {Lancamentos} from '../model/lancamentos';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-recebidos',
  templateUrl: './recebidos.page.html',
  styleUrls: ['./recebidos.page.scss'],
})
export class RecebidosPage implements OnInit {

  dataSaldo = Date();
  listaLancamentos = [];


  constructor(public modalController: ModalController,
    public lancamentoService:LancamentosService,
    public datepipe: DatePipe) {

      
  }

  ngOnInit(){

    this.dataSaldo;
    let lancamentos= this.lancamentoService.buscarTodos();

    lancamentos.snapshotChanges().subscribe(res => {
        this.listaLancamentos = [];
        res.forEach(item => {
          let a = item.payload.toJSON();

          if(this.datepipe.transform(a['data'], 'MM-yyyy') == this.datepipe.transform(this.dataSaldo, 'MM-yyyy') && a['tipo'] == 'recebido'){

                  a['key'] = item.key;
                  this.listaLancamentos.push(a as Lancamentos);
          }
        })
      })



  }




    rebuscarData() {
      this.ngOnInit();
      // buscarData();
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

//   buscarDatalista(){
//
//     this.saldoMes= 0;
//     this.valorRecebido = 0;
//     this.valorReceber = 0;
//     this.valorDespesa = 0;
//     this.valorPagar = 0;
//     this.datinha1 = this.datepipe.transform(this.dataSaldo, 'yyyy-MM');
//     this.datinha2 = this.datepipe.transform(this.dataSaldo, 'yyyy-MM');
//
//
//     let lancamentos= this.lancamentoService.buscarTodos();
//       lancamentos.snapshotChanges().subscribe(res => {
//         this.listaLancamentos = [];
//         res.forEach(item => {
//           let a = item.payload.toJSON();
//
//             if(this.datepipe.transform(a['data'], 'yyyy-MM') >= this.datinha1 && this.datepipe.transform(a['data'], 'yyyy-MM') <= this.datinha2){
//             if(a['tipo'] == 'recebido'){
//               this.valorRecebido+=parseFloat(a['valor']);
//             a['key'] = item.key;
//             this.listaLancamentos.push(a as Lancamentos);
//           }
//
//         }
//         })
//       })
//
//
// }


}
