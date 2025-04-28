import { Component, HostListener, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() title: string = '';
  @Input() showBack: boolean = false;
  @Input() backUrl: string = '/home';

  scrolled = false;

  constructor(private router: Router) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 10;
  }

  goBack() {
    if (this.backUrl) {
      this.router.navigateByUrl(this.backUrl);
    } else {
      history.back();
    }
  }
}
