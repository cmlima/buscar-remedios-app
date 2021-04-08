import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MensagensService {

  constructor(private alertController: AlertController, private loadingController: LoadingController) { }

  public async erro(titulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      cssClass: 'app-msg-danger',
      header: 'Erro',
      subHeader: titulo,
      message: mensagem,
      buttons: [{
        cssClass: 'danger',
        text: 'FECHAR'
      }]
    });

    await alert.present();
  }

  public async confirmar(titulo: string, mensagem: string, callback: Function) {
    const alert = await this.alertController.create({
      cssClass: 'app-msg-danger',
      header: titulo,
      message: mensagem,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'medium',
          handler: () => {
            callback(false);
          }
        }, {
          text: 'OK',
          cssClass: 'danger',
          handler: () => {
            callback(true);
          }
        }
      ]
    });

    await alert.present();
  }

  public async carregando(mensagem: string = 'Carregando...', duracao: number = 5000, callback: Function) {
    const loading = await this.loadingController.create({
      message: mensagem,
      duration: duracao,
    });
    await loading.present();
    callback(loading);
  }

}
