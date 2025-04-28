import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage {
  constructor(private router: Router) {}

  goToHome() {
    const content = document.querySelector('ion-content');
    if (content) {
      content.classList.add('fade-out'); // Agregamos la clase de animación
    }

    // Esperamos que termine la animación (0.5s aprox) y luego navegamos
    setTimeout(() => {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    }, 500);
  }
}
