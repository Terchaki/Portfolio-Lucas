import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout/layout.component';

const routes: Routes = [
  // Redirecionamento inicial para map/tracking equipment
  {
    path: '',
    redirectTo: 'abaut',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'abaut',
        loadChildren: () =>
          import('./features/abaut/abaut.module').then((m) => m.AbautModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'abaut',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
