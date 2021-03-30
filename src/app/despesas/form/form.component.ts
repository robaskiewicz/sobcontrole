import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Lancamentos } from '../../model/lancamentos';
import { LancamentosService } from '../../services/lancamentos.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


import { ApiService } from '../../api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  repetirLancamento = false;
  lancamento:Lancamentos;
  @Input() key:string;
    private todo: FormGroup;

    corValor;

    tituloCode = String;
    tituloCodeIn = String;
    cotacaoHighDoDia = String;

  constructor(private formBuilder: FormBuilder, public modalController: ModalController, public lancamentosService:LancamentosService,
  private apiService: ApiService) {
    this.todo = this.formBuilder.group({
       descricao: ['ss', Validators.required],
       data: [new Date()],
       valor: [0, Validators.required],
       tipo: ['despesa'],
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
      this.lancamento = { key:'',
        descricao:'',
        valor: 0,
        tipo:'despesa',
        categoria:'Aluguel',
        data: new Date(),
        quantidadeVezes:0,
        situacao:true,
      repetirLancamento: false};
    }
  }

  excluirLancamentos(){
   if(this.key!=undefined){
     this.lancamentosService.removerLancamento(this.key);
     this.fecharModal();
     }
   }


   salvarLancamento() {

     if (this.lancamento.valor > 0) {
       if (this.key == undefined) {
         this.lancamentosService.criarLancamento(this.lancamento).then(res => {

           if (this.repetirLancamento == true) {
             let ultimoRegistro = false;
             for (let x = 0; x < this.lancamento.quantidadeVezes; x++) {
               if (x == (this.lancamento.quantidadeVezes - 1)) {
                 ultimoRegistro = true;
               }

               let novoLancamento:Lancamentos=new Lancamentos();
               Object.assign(novoLancamento, this.lancamento);
               var novaData = new Date();

               novaData = this.addMonths((x + 1));
               novoLancamento.data = novaData;

               this.lancamentosService.criarLancamento(novoLancamento).then(res => {

                 if (ultimoRegistro) {
                   this.fecharModal();
                 }
               }).catch(error => console.log(error));
             }
           } else {
             this.fecharModal();
           }


         }).catch(error => console.log(error));


       } else {
         this.lancamentosService.atualizarLancamento(this.key, this.lancamento).then(res => {
           //  console.log('Deu certo alterar');
           //    console.log(res);
           this.fecharModal();
         }).catch(error => console.log(error));
       }
     } else {
       this.corValor = "red";
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
