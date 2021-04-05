import { Injectable } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';


@Injectable({
  providedIn: 'root'
})
export class CallNumberService {

  constructor(private callNumber: CallNumber) { }

   public call(tel: string){
      this.callNumber.callNumber(tel,true)
        .then(res => console.log("Chamando...", res))
        .catch(err => console.log("Erro ao tentar realizar chamada", err));
    }
}
