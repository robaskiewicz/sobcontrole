import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Lancamentos } from '../../model/lancamentos';
import { LancamentosService } from '../../services/lancamentos.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { ApiService } from '../../api.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  repetirLancamento = false;
  lancamento : Lancamentos;
  @Input() key : string;
  private todo: FormGroup;
  corValor;

  tituloCode = String;
  tituloCodeIn = String;
  cotacaoHighDoDia = String;

  constructor(private formBuilder: FormBuilder, public modalController: ModalController, public lancamentosService:LancamentosService,
  private apiService: ApiService,
  public datepipe: DatePipe) {
    this.todo = this.formBuilder.group({
       descricao: ['ss', Validators.required],
       data: [new Date()],
       valor: [0, Validators.required],
       tipo: ['recebido'],
       categoria: ['Salário'],
       quantidadeVezes: [1],
       situacao: [true],
       repetirLancamento: [false]
     });


     this.buscaCotacaoAtual();
    }

  ngOnInit() {

    if(this.key!=undefined){
      this.lancamentosService.buscarPorId(this.key).valueChanges().subscribe(res=>{
        this.lancamento = res;
      })
    }else{
      this.lancamento = {
        key:'',
        descricao:'',
        valor: 0,
        tipo:'recebido',
        categoria:'Salário',
        data: new Date(),
        quantidadeVezes:1,
        situacao:true,
        repetirLancamento: false};
    }

  }

 excluirLancamento(){
  if(this.key!=undefined){
    this.lancamentosService.removerLancamento(this.key);
    this.fecharModal();
    }
  }

  addMonths(m) {
    var d = new Date(this.lancamento.data);
    var years = Math.floor(m / 12);
    var months = m - (years * 12);
    if (years) d.setFullYear(d.getFullYear() + years);
    if (months) d.setMonth(d.getMonth() + months);
    return d;
  }

  salvarLancamento(){
     if (this.lancamento.valor > 0) {
   if(this.key==undefined){
     this.lancamentosService.criarLancamento(this.lancamento).then(res => {
       console.log("DEU CERTO!!!!!");
       console.log(res);
         this.fecharModal();
     }).catch(error=> console.log(error));

   }else{

     this.lancamentosService.atualizarLancamento(this.key, this.lancamento).then(res => {
       console.log("DEU CERTO Alterar!!!!!");
       console.log(res);
         this.fecharModal();
     }).catch(error=> console.log(error));
   }
 }else {
      this.corValor = "red";
    }
}



  fecharModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  buscaCotacaoAtual(){
    this.apiService.getUltimaCotacao().subscribe(data=>{
        this.cotacaoHighDoDia = data[0]['high'];
        this.tituloCode = data[0]['code'];
        this.tituloCodeIn = data[0]['codein'];
    })
  }



}
