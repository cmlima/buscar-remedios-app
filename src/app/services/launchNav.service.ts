import { Injectable } from '@angular/core';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';

@Injectable({
  providedIn: 'root'
})
export class LaunchNavigatorService {

  constructor(private launchNavigator: LaunchNavigator) { }

   public nav(nomeUBS: string){
      this.launchNavigator.navigate(nomeUBS)
        .then(res => console.log("Abrindo aplicativo de mapas...", res))
        .catch(err => console.log("Erro ao tentar abrir aplicativo de mapas", err));
    }
}
