import { Injectable } from '@angular/core';
import { Geolocation, PermissionStatus, Position } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';

@Injectable({ providedIn: 'root' })
export class LocationService {
  async ensurePermissions(): Promise<PermissionStatus | void> {
     if (Capacitor.getPlatform() === 'web') {
      return;
    }
    const perm = await Geolocation.checkPermissions();
    if (perm.location === 'granted' || perm.coarseLocation === 'granted') return perm;
    return Geolocation.requestPermissions();
  }

  
  async getCurrentPosition(): Promise<Position> {
    return Geolocation.getCurrentPosition({ enableHighAccuracy: true });
  }

  async watchPosition(onPos: (p: Position) => void, onErr?: (e: any) => void): Promise<string> {
    const id = await Geolocation.watchPosition(
      { enableHighAccuracy: true },
      (pos, err) => {
        if (pos) onPos(pos);
        else if (err && onErr) onErr(err);
      }
    );
    return id as unknown as string;
  }
}   