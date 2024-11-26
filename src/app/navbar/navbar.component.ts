import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FontAwesomeModule,
    FormsModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  searchTerm: string = "";

  router = inject(Router);

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    if(this.searchTerm.length >= 1) {
      this.router.navigate(['search'], { queryParams: { q: this.searchTerm } });
    } else if(this.searchTerm.length === 0) {
      this.router.navigate(['']);
    }
  }

}
