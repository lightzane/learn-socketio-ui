import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { BehaviorSubject } from 'rxjs';

const SOUND_URL = '../../assets/sounds';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  private defaultVolume = 0.5;

  private volume = this.defaultVolume;
  /** Max volume is 1.0 */
  volume$ = new BehaviorSubject<number>(this.volume);
  /** Sounds like a chat popup */
  message?: Howl;

  constructor() {
    this.getVolume();
    this.initSounds();
    this.volume$.subscribe((n) => {
      this.volume = n;
      this.initSounds();
      localStorage.setItem('volume', n.toString());
    });
  }

  /**
   * WHEN NO saved volume, THEN use default volume
   * 
   * WHEN saved volume is NOT a number, THEN use default volume
   * 
   * WHEN saved volume is between 0.0 and 1.0, THEN use it
   */
  getVolume(): void {
    // Convert to number later (since isNan(0) === false)
    let v = localStorage.getItem('volume') as number | string;
    v = v ? v : this.defaultVolume;

    if ((v !== 0 && isNaN(+v)) || v < 0 || v > 1) {
      v = this.defaultVolume;
    }
    localStorage.setItem('volume', v.toString());
    this.volume$.next(+v);
  }

  initSounds(): void {
    const volume = this.volume;

    this.message = new Howl({
      src: [`${SOUND_URL}/message.mp3`],
      volume
    });
  }
}
