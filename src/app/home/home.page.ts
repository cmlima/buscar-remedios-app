import { Component } from '@angular/core';
import { ScannerService } from '../services/scanner.service';
import { ReceitasService } from '../services/receitas.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private scannerService: ScannerService, private receitasService: ReceitasService) { }

  public async lerQRCode() {
    const hash = await this.scannerService.scan();
    if (hash) this.receitasService.buscar(hash);
  }

}
