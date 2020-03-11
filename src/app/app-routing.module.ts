import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuctionsComponent } from './auctions/auctions.component';

const routes: Routes = [
  {path: 'auctions', component: AuctionsComponent},
  {path: '',redirectTo:'auctions',pathMatch:'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
