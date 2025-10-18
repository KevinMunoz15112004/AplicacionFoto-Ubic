import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { LocationService } from './location';
import { Capacitor } from '@capacitor/core';

export interface FotoGeo {
  imageWebPath: string;
  lat: number;
  lng: number;
  linkMapa: string;
  nombreArchivo: string;
}

@Injectable({ providedIn: 'root' })
export class FotoGeoService {
  constructor(private loc: LocationService) { }

    async pedirPermisosCamara(): Promise<void> {
    if (Capacitor.getPlatform() !== 'web') {
      const camPerms = await Camera.checkPermissions();
      if (camPerms.camera !== 'granted') {
        await Camera.requestPermissions();
      }
    }
  }

  async tomarFotoConUbi(): Promise<FotoGeo> {

    const foto: Photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 90,
      allowEditing: false
    });

    const pos = await this.loc.getCurrentPosition();
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const webPath = foto.webPath!;

    const linkMapa = `https://www.google.com/maps/@${lat},${lng}`;
    const nombreArchivo = new Date().getTime() + '.txt';
    const contenido = `lat: ${lat}\nlng: ${lng}\nmapLink: ${linkMapa}\nphotoPath: ${webPath}`;

    await Filesystem.writeFile({
      path: `Download/${nombreArchivo}`,
      data: contenido,
      directory: Directory.ExternalStorage,
      encoding: Encoding.UTF8
    });

    return { imageWebPath: webPath, lat, lng, linkMapa, nombreArchivo };
  }
}
