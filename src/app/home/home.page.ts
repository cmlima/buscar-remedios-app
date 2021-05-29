import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ScannerService } from '../services/scanner.service';
import { ReceitasService } from '../services/receitas.service';
import { Receita } from '../services/entities';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private scannerService: ScannerService, private receitasService: ReceitasService, private actionSheetController: ActionSheetController, private router: Router) { }

  public async lerQRCode() {
    const hash = await this.scannerService.scan();
    let receita: Receita | false = false;
    if (hash) {
      receita = await this.receitasService.buscar(hash);
    }
    if (receita) this.router.navigate(['lista-receitas']);
  }
}
