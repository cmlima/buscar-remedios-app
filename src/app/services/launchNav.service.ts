import { Injectable } from '@angular/core';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { MensagensService } from './mensagens.service';

@Injectable({
  providedIn: 'root'
})
export class LaunchNavigatorService {

  constructor(private launchNavigator: LaunchNavigator, private mensagensService: MensagensService) { }

   public nav(nomeUBS: string){
      this.launchNavigator.navigate(nomeUBS)
        .then(res => console.log("Abrindo aplicativo de mapas...", res))
        .catch(err => {
          this.mensagensService.erro("Erro ao tentar abrir aplicativo de mapas", "");
          console.error(err)
        });
    }
}
