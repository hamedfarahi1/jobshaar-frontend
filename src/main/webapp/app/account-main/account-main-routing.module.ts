import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountMainComponent } from './account-main.component';


const routes: Routes = [
  {
    path: 'account',
    component: AccountMainComponent,
    loadChildren: () => import('@app/account-main/account/account.module').then(m => m.AccountModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
