import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-contact',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, FormsModule, MatProgressSpinnerModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})
export class AddContactComponent {
  apiService = inject(ApiService);
  router = inject(Router);
  loading = signal(false);
  
  name = signal('');
  phone = signal('');
  email = signal('');

  async saveContact() {
    this.loading.set(true);
    await this.apiService.addContact({
      id: Date.now().toString(),
      name: this.name(),
      phone: this.phone(),
      email: this.email()
    });
    this.loading.set(false);
    this.router.navigate(['/']);
  }
}
