import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';

@Component({
  selector: 'app-cancion',
  templateUrl: './cancion.page.html',
  styleUrls: ['./cancion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, NavbarComponent]
})
export class CancionPage implements OnInit {
  cancion: any;
  volverUrl: string = '/home'; // valor por defecto si no viene de ninguna lista

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const fromList = this.route.snapshot.queryParamMap.get('fromList'); // 👈 capturamos el fromList

    if (fromList) {
      this.volverUrl = `/lista/${fromList}`; // 👈 si viene de una lista, volveremos a esa lista
    }

    if (id) {
      this.apiService.getCancion(Number(id)).subscribe(data => {
        this.cancion = data;
      });
    }
  }
}
