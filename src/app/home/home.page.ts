import { Component } from '@angular/core';
import { ScannerService } from '../services/scanner.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private scannerService: ScannerService) { }

  public async lerQRCode() {
    const hash = await this.scannerService.scan();
    if (hash) {
      console.log('QRCode: ', hash);
    }
  }

}
