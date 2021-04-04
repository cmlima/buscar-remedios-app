import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-voltar',
  templateUrl: './btn-voltar.component.html',
  styleUrls: ['./btn-voltar.component.scss'],
})
export class BtnVoltarComponent implements OnInit {
  @Input() rota: string;
  @Input() pagina: string;

  constructor() { }

  ngOnInit() {}

}
