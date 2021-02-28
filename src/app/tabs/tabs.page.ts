import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public router:Router) {}


  ngOnInit(){}


  chamarRecebidos(){
    this.router.navigate(['recebidos']);
  }


  chamarDespesas(){
    this.router.navigate(['despesas']);
  }

}