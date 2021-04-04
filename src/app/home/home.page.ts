import { Component } from '@angular/core';
import { ScannerService } from '../services/scanner.service';
import { MensagensService } from '../services/mensagens.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private scannerService: ScannerService, private mensagensService: MensagensService) { }

  public async lerQRCode() {
    try {
      const hash = await this.scannerService.scan();
      // se a função retorna falso, o usuário cancelou a leitura
      // nesse caso, finalizar silenciosamente
      if (hash === false) {
        console.log('QRCode: ', hash);
      }
    } catch (e) {
      this.mensagensService.erro('Falha na leitura', e.message);
    }
  }

}
