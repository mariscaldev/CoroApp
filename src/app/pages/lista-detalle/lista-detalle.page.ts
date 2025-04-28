import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // << Importa todo Ionic de una sola vez
import { trigger, transition, style, animate, query, stagger, animateChild } from '@angular/animations';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';

@Component({
  selector: 'app-lista-detalle',
  templateUrl: './lista-detalle.page.html',
  styleUrls: ['./lista-detalle.page.scss'],
  standalone: true,
  animations: [
    trigger('expandCollapse', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 })),
        query('@fadeInStagger', [
          stagger(100, animateChild())
        ], { optional: true })
      ]),
      transition(':leave', [
        query('@fadeInStagger', [
          stagger(50, animateChild())
        ], { optional: true }),
        animate('300ms ease-in', style({ height: 0, opacity: 0 }))
      ])
    ]),
    trigger('fadeInStagger', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  imports: [
    IonicModule, // 👈 Esto cubre TODOS los componentes de Ionic
    CommonModule,
    NgIf,
    NgForOf,
    NavbarComponent
  ]   
})
export class ListaDetallePage implements OnInit {
  lista: any;
  cancionesAgrupadas: { [key: number]: any[] } = {};
  sections: { name: string, songs: any[], open: boolean }[] = [];
  loading = true;

  categorias: { [key: number]: string } = {
    0: 'Todas las canciones',
    1: 'Entrada',
    2: 'Canto de Perdón',
    3: 'Gloria',
    4: 'Salmo',
    5: 'Antes del Evangelio',
    6: 'Después del Evangelio',
    7: 'Ofertorio',
    8: 'Santo',
    9: 'Prefacio',
    10: 'Padre Nuestro',
    11: 'Canto de Paz',
    12: 'Cordero',
    13: 'Comunión',
    14: 'Canto Final'
  };

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getLista(Number(id)).subscribe({
        next: (data) => {
          this.lista = data;
          this.obtenerCancionesMultiples();
        },
        error: (error) => {
          console.error('Error cargando lista:', error);
          this.loading = false;
        }
      });
    }
  }

  obtenerCancionesMultiples() {
    if (!this.lista || !this.lista.id_canciones) {
      this.loading = false;
      return;
    }

    const ids = this.lista.id_canciones.split('~').map((entry: string) => entry.split('/')[0]);

    if (ids.length === 0) {
      this.loading = false;
      return;
    }

    this.apiService.getMultiplesCanciones(ids.join('~')).subscribe({
      next: (canciones) => {
        this.agruparCanciones(canciones);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando canciones:', error);
        this.loading = false;
      }
    });
  }

  agruparCanciones(canciones: any[]) {
    const idCategoriaMap: { [key: number]: number } = {};

    for (let entry of this.lista.id_canciones.split('~')) {
      const [idStr, catStr] = entry.split('/');
      const id = Number(idStr);
      const cat = Number(catStr);
      idCategoriaMap[id] = cat;
    }

    for (let cancion of canciones) {
      const categoria = idCategoriaMap[cancion.id];
      if (categoria !== undefined) {
        if (!this.cancionesAgrupadas[categoria]) {
          this.cancionesAgrupadas[categoria] = [];
        }
        this.cancionesAgrupadas[categoria].push(cancion);
      }
    }

    this.sections = Object.entries(this.categorias).map(([key, name]) => ({
      name,
      songs: this.cancionesAgrupadas[+key] || [],
      open: true
    }));
  }

  cancionesDisponibles(): boolean {
    return this.sections.some(section => section.songs.length > 0);
  }

  verCancion(id: number) {
    const idLista = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/cancion', id], { queryParams: { fromList: idLista } });
  }
  

  goBack() {
    history.back();
  }
}

