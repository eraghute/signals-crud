import { Routes } from '@angular/router';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';

export const routes: Routes = [
    {
        path: '',
        component: ContactsListComponent,
        pathMatch: 'full'
    },
    {
        path: 'edit/:id',
        component: EditContactComponent,
    },
    {
        path: 'add',
        component: AddContactComponent,
    }
];
