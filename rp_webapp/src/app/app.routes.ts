import { Routes } from '@angular/router';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { BooksComponent } from './features/books/books.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'read',
    component: DashboardComponent,
    children: [

    ],

  },
  {
    path: 'books',
    component: BooksComponent,
    data: { title: 'Books' },
  },
  { path: '**', redirectTo: 'books' },
  // { path: '**', component: PageNotFoundComponent },
];
