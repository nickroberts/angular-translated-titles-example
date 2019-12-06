import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {
  L10nConfig,
  L10nLoader,
  LocalizationModule,
  LocalizationExtraModule,
  ProviderType,
  ISOCode
} from 'angular-l10n';

import { HelloComponent } from './hello.component';

const routes: Routes = [
  {
    path: '',
    component: HelloComponent,
    data: { title: 'HELLO.TITLE' }
  },
  {
    path: 'lazy',
    loadChildren: () => import('./lazy.module').then(mod => mod.LazyModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
