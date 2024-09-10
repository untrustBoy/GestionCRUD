import { Routes } from '@angular/router';
import { ListCustomersComponent } from './components/list-customers/list-customers.component';
import { AddeditCustomersComponent } from './components/addedit-customers/addedit-customers.component';
import { ListPostComponent } from './components/list-post/list-post.component';
import { AddeditPostComponent } from './components/addedit-post/addedit-post.component';

export const routes: Routes = [
    { path: '', component: ListCustomersComponent },
    { path: 'add', component: AddeditCustomersComponent },
    { path: 'edit/:id', component: AddeditCustomersComponent },
    { path: 'posts', component: ListPostComponent },
    { path: 'addPost', component: AddeditPostComponent },
    { path: 'editPost/:id', component: AddeditPostComponent },    
    { path: '**', redirectTo: '', pathMatch: 'full' },

];
