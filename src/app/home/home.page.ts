import { Component, OnInit, signal } from '@angular/core';
import { FotoGeoService } from '../services/foto-geo-service';
import { LocationService } from '../services/location';
import { FotoGeo } from '../services/foto-geo-service';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';
import { Camera } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  latitude = signal<number | null>(null);
  longitude = signal<number | null>(null);
  errorMsg = signal<string | null>(null);
  watchId: string | null = null;
  fotoGeo = signal<FotoGeo | null>(null);

  constructor(
    private loc: LocationService,
    private fgService: FotoGeoService
  ) { }


  async ngOnInit() {
    await this.loc.ensurePermissions();
    await this.fgService.pedirPermisosCamara();

    const { value } = await Preferences.get({ key: 'ultima_foto_geo' });
    if (value) {
      const data: FotoGeo = JSON.parse(value);
      this.fotoGeo.set(data);
      this.latitude.set(data.lat);
      this.longitude.set(data.lng);
    }
  }

  async tomarFotoGeo() {
    try {
      const result = await this.fgService.tomarFotoConUbi();
      this.fotoGeo.set(result);
      this.latitude.set(result.lat);
      this.longitude.set(result.lng);

      await Preferences.set({
        key: 'ultima_foto_geo',
        value: JSON.stringify(result)
      });
    } catch (err) {
      this.errorMsg.set('Error al tomar foto con ubicación');
      console.error(err);
    }
  }
}