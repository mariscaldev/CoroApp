import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // << Importa todo Ionic de una sola vez
import { ApiService } from '../../services/api.service';
import { trigger, transition, style, animate } from '@angular/animations'; // 👈 Importar Angular Animations
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ],
  imports: [IonicModule, CommonModule, FormsModule, NavbarComponent
  ]
})
export class HomePage implements OnInit {
  songs: any[] = [];
  filteredSongs: any[] = [];
  searchTerm: string = '';
  loading = true;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.apiService.getCanciones().subscribe({
      next: (data) => {
        this.songs = data.sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));
        this.filteredSongs = this.songs;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando canciones:', error);
        this.loading = false;
      }
    });
  }

  filterSongs() {
    this.filteredSongs = this.searchTerm
      ? this.songs.filter(song =>
        song.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      : this.songs;
  }

  openSongPage(id: number) {
    // Scroll hacia arriba antes de navegar (más elegante)
    const content = document.querySelector('ion-content');
    if (content) {
      (content as HTMLIonContentElement).scrollToTop(300); // 300ms scroll up
    }

    setTimeout(() => {
      this.router.navigate(['/cancion', id]);
    }, 200); // Espera breve para ver el efecto
  }

}
