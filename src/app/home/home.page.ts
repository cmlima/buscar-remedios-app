import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ScannerService } from '../services/scanner.service';
import { ReceitasService } from '../services/receitas.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private scannerService: ScannerService, private receitasService: ReceitasService, private actionSheetController: ActionSheetController, private router: Router) { }

  public async lerQRCode() {
    const hash = await this.scannerService.scan();
    if (hash) this.receitasService.buscar(hash);
  }

  // TODO: remover em produção
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Acessar Diretamente:',
      buttons: [
        {
          text: 'Letícia (Lista de Receitas)',
          role: 'navigation',
          icon: 'open',
          handler: () => this.router.navigate(['/lista-receitas'])
        }, {
          text: 'Caio (Detalhes da Receita)',
          role: 'navigation',
          icon: 'open',
          handler: () => this.router.navigate(['/detalhes-receita'])
        }, {
          text: 'Pedro (Posto de Saúde - Mapa)',
          role: 'navigation',
          icon: 'open',
          handler: () => this.router.navigate(['/mapa'])
        }, {
          text: 'Álef (Posto de Saúde - Detalhes)',
          role: 'navigation',
          icon: 'open',
          handler: () => this.router.navigate(['/lista-postos'])
        }
      ]
    });
  
    await actionSheet.present();
  }

}
