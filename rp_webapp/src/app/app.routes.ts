import { Routes } from '@angular/router';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { BooksComponent } from './components/books/books.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [

    ],

  },
  {
    path: 'books',
    component: BooksComponent,
    data: { title: 'Dashboard' },
  },
  { path: '**', component: PageNotFoundComponent },
];
