import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LazyComponent } from './lazy.component';
import { LazyChildComponent } from './lazy-child.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'LAZY.TITLE' },
    component: LazyComponent
  },
  {
    path: 'child',
    data: { title: 'LAZY.CHILD.TITLE' },
    component: LazyChildComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LazyRoutingModule {}
