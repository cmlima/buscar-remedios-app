import { Component, OnInit } from '@angular/core';
import { ReceitasService } from '../services/receitas.service';
import { Receita } from '../services/entities/receita';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalhes-receita',
  templateUrl: './detalhes-receita.page.html',
  styleUrls: ['./detalhes-receita.page.scss'],
})
export class DetalhesReceitaPage implements OnInit {
  public receita: Receita;
  public dataURL: string;
  // https://www.labnol.org/internet/direct-links-for-google-drive/28356/
  public downloadLink: string = 'https://drive.google.com/uc?export=download&id=1yfrXjlyzikuYsZai2sv-eoF0UuK9Srr-';

  constructor(private receitaService: ReceitasService, private router: Router) { }

  async ngOnInit() {
    // TODO: Eliminar mocks
    this.receita = this.receitaService.getSelecionada();
    console.log(this.receita);
    const response = await this.receitaService.gerarQRCode(this.receita._id);
    this.dataURL = response ? response : '';
  }
    
  public removerReceita() {
    this.receitaService.remover(this.receita._id);
    this.router.navigate(['/lista-receitas']);
  }

}