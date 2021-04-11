import { Injectable } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { MensagensService } from './mensagens.service';


@Injectable({
  providedIn: 'root'
})
export class CallNumberService {

  constructor(private callNumber: CallNumber, private mensagensService: MensagensService) { }

   public call(tel: string){
      this.callNumber.callNumber(tel,true)
        .then(res => console.log('Chamando...', res))
        .catch(err => {
          this.mensagensService.erro('', 'Erro ao tentar realizar chamada!');
          console.error(err)
        });
    }
}
