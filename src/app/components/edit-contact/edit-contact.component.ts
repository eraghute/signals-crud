import { Component, computed, inject, input, linkedSignal, resource, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-contact',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.scss'
})
export class EditContactComponent {
  id = input.required<string>();
  apiService = inject(ApiService);
  router = inject(Router);
  loading = computed(() => this.contactResource.isLoading() || this.saving());
  saving = signal(false);
  contactResource = resource({
    request: this.id,
    loader: ({ request: id }) => this.apiService.getContactById(id),
  });
  name = linkedSignal(() => this.contactResource.value()?.name ?? '');
  phone = linkedSignal(() => this.contactResource.value()?.phone ?? '');
  email = linkedSignal(() => this.contactResource.value()?.email ?? '');  

  async saveContact() {
    this.saving.set(true);
    const updatedContact = {
      id: this.id(),
      name: this.name(),
      phone: this.phone(),
      email: this.email(),
    }; 
    await this.apiService.updateContact(updatedContact);
      this.saving.set(false);
      this.router.navigate(['/']);
  }
}
