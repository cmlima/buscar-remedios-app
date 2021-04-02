import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Injectable({
  providedIn: 'root'
})
export class ScannerService {
  private scanner;

  constructor() {
    this.scanner = BarcodeScanner;
   }

   public async scan() {
    try {
      const data = await this.scanner.scan();
      if (data.cancelled) return false;
      if (data.format !== 'QR_CODE') {
        throw new Error('Formato não reconhecido!');
      }
      return data.text;
    } catch (e) {
      throw new Error('Erro de leitura!');
    }
  }   
}
