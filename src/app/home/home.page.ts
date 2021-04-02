import { Component } from '@angular/core';
import { ScannerService } from '../services/scanner.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private scannerService: ScannerService) { }

  public lerQRCode() {
    try {
      const hash = this.scannerService.scan();
      console.log('QRCode: ', hash);
    } catch (e) {
      console.log(e);
    }
  }

}
