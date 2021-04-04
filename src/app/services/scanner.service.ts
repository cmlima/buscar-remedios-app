import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Injectable({
  providedIn: 'root'
})
export class ScannerService {

  constructor(private scanner: BarcodeScanner) { }

   public scan(): Promise<string | boolean> {
     return new Promise((resolve, reject) => {
      this.scanner.scan().then(data => {
        if (data.cancelled) resolve(false);
        if (data.format !== 'QR_CODE') {
          reject('Formato não reconhecido!');
        }
        resolve(data.text);
      }).catch(e => {
        console.error(e);
        reject('Erro de leitura!');
      });
     })
  }   
}
