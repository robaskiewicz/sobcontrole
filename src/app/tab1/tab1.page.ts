import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LancamentosService} from '../services/lancamentos.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  saldoMes= 0;
  valorRecebido = 0;
  valorReceber = 0;
  valorDespesa = 0;
  valorPagar = 0;
  dataSaldo = Date();

  // dataAtual = new Date();

 // primeiroDia = new Date();
 // ultimoDia = new Date();

 // datinha1 =  Date();
 // datinha2 =  Date();




  constructor(public router:Router, public lancamentoService:LancamentosService, public datepipe: DatePipe) {

  }


  ngOnInit(){
    let lancamentos= this.lancamentoService.buscarTodos();
      lancamentos.snapshotChanges().subscribe(res => {

        this.saldoMes= 0;
        this.valorRecebido = 0;
        this.valorReceber = 0;
        this.valorDespesa = 0;
        this.valorPagar = 0;
        this.dataSaldo;
        // this.primeiroDia = new Date(this.dataSaldo.getFullYear(), this.dataSaldo.getMonth(), 1);
        // this.ultimoDia = new Date(this.dataSaldo.getFullYear(), this.dataSaldo.getMonth() + 1, 0);

        // this.dataAtual = this.datepipe.transform(this.dataSaldo, 'MM-yyyy')



        res.forEach(item => {
          let a = item.payload.toJSON();

          // this.datinha2 = this.datepipe.transform(this.dataSaldo, 'MM-yyyy');
          // this.datinha1 = this.datepipe.transform(a['data'], 'MM-yyyy');


          if(this.datepipe.transform(a['data'], 'MM-yyyy') == this.datepipe.transform(this.dataSaldo, 'MM-yyyy') ){

            if(a['tipo']=='recebido' && a['situacao']==1){
              this.valorRecebido+=parseFloat(a['valor']);

            }else if(a['tipo']=='recebido' && a['situacao']==0){
              this.valorReceber+=parseFloat(a['valor']);
            }

            if(a['tipo']=='despesa' && a['situacao']==1){
              this.valorDespesa+=parseFloat(a['valor']);

            }else if(a['tipo']=='despesa' && a['situacao']==0){
              this.valorPagar+=parseFloat(a['valor']);
            }

            }

        })

        this.saldoMes = (this.valorRecebido + this.valorReceber) - (this.valorDespesa + this.valorPagar);

      })
  }

  chamarRecebidos(){
    this.router.navigate(['recebidos']);

  }

  chamarDespesas(){
    this.router.navigate(['despesas']);
  }


  rebuscarData() {
    this.ngOnInit();
    // buscarData();
  }



//   buscarData(){
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
//
//       lancamentos.snapshotChanges().subscribe(res => {
//
//         res.forEach(item => {
//           let a = item.payload.toJSON();
//
//           if(this.datepipe.transform(a['data'], 'yyyy-MM') >= this.datinha1 && this.datepipe.transform(a['data'], 'yyyy-MM') <= this.datinha2){
//             if(a['tipo']=='recebido' && a['situacao']==1){
//               this.valorRecebido+=parseFloat(a['valor']);
//
//             }else if(a['tipo']=='recebido' && a['situacao']==0){
//               this.valorReceber+=parseFloat(a['valor']);
//             }
//
//             if(a['tipo']=='despesa' && a['situacao']==1){
//               this.valorDespesa+=parseFloat(a['valor']);
//
//             }else if(a['tipo']=='despesa' && a['situacao']==0){
//               this.valorPagar+=parseFloat(a['valor']);
//             }
//
//
//
//             }
//
//         })
//
//   this.saldoMes = (this.valorRecebido + this.valorReceber) - (this.valorDespesa + this.valorPagar);
//
//       })
//
//
// }


}
