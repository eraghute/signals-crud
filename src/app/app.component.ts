import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChildComponent } from './child/child.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ChildComponent, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'signals-crud';
  apiService = inject(ApiService);
  totalContacts = computed(() => this.apiService.contacts().length);
}
