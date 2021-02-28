import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';

// import { FormComponent } from './recebidos/form/form.component';



const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'recebidos',
    loadChildren: () => import('./recebidos/recebidos.module').then( m => m.RecebidosPageModule)
  },
  {
    path: 'despesas',
    loadChildren: () => import('./despesas/despesas.module').then( m => m.DespesasPageModule)
  }
 //  ,
 //  {
 //    path: 'formulario',
 //    component: FormComponent
 // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
