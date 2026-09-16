import { Component, computed, inject, resource, signal } from '@angular/core';
import { Contact } from '../../model/contacts';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ApiService } from '../../services/api.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-contacts-list',
  imports: [MatListModule, MatProgressSpinnerModule, RouterLink, MatIconModule, RouterOutlet],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss'
})
export class ContactsListComponent {
  isDeleting = signal(false);
  apiService = inject(ApiService);
  loading = computed(() => this.contactResource.isLoading());
  contactResource = resource({
    loader: () => this.apiService.getContacts(),
  });

  async deleteContact(contactId: string) {
    this.isDeleting.set(true);
    await this.apiService.deleteContact(contactId);
    this.contactResource.reload();
    this.isDeleting.set(false);
  }
  
}
