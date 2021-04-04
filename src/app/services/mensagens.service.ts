import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MensagensService {

  constructor(private alertController: AlertController) { }

  async erro(titulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: 'Erro',
      subHeader: titulo,
      message: mensagem,
      buttons: ['FECHAR']
    });

    await alert.present();
  }

}
