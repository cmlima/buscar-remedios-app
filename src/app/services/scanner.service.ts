import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { MensagensService } from './mensagens.service';
@Injectable({
  providedIn: 'root'
})
export class ScannerService {

  constructor(private scanner: BarcodeScanner, private mensagensService: MensagensService) { }

   public async scan(): Promise<string | false> {
     try {
      const response = await this.scanner.scan();
      if (response.cancelled) return false;
      if (response.format !== 'QR_CODE') {
        this.mensagensService.erro('Falha de Leitura', 'Formato não permitido!');
        return false;
      }
      return response.text;
     } catch (e) {
      this.mensagensService.erro('Falha de Leitura', e.message);
     }
  }   
}
