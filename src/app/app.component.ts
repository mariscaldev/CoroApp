import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // << Importa todo Ionic de una sola vez
import { addIcons } from 'ionicons';
import { musicalNotesOutline, musicalNotesSharp, listOutline, settingsOutline, arrowBackCircleOutline, chevronDownOutline, chevronUpOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    NgForOf,
    IonicModule,
    RouterLink, RouterLinkActive,
  ],
})
export class AppComponent {
  public appPages = [
    { title: 'Canciones', url: '/home', icon: 'musical-notes-outline' },
    { title: 'Lista Semanal', url: '/listas', icon: 'list-outline' },
    // { title: 'Configuración', url: '/configuracion', icon: 'settings-outline' },
  ];

  constructor() {
    addIcons({ 
      musicalNotesOutline, 
      musicalNotesSharp, 
      listOutline, 
      settingsOutline,
      arrowBackCircleOutline,
      chevronDownOutline,
      chevronUpOutline
    });
  }
}
