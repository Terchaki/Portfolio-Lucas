import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit {
  menuAtivo = false;
  temaAtual: 'dark' | 'light' = 'dark';

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    const temaSalvo = localStorage.getItem('portfolio-theme');
    this.aplicarTema(temaSalvo === 'light' ? 'light' : 'dark');
  }

  alternarMenu(event?: Event) {
    if (event && event.type === 'touchstart') {
      event.preventDefault();
    }
    this.menuAtivo = !this.menuAtivo;
  }

  fecharMenu() {
    this.menuAtivo = false;
  }

  alternarTema() {
    this.aplicarTema(this.temaAtual === 'dark' ? 'light' : 'dark');
  }

  private aplicarTema(tema: 'dark' | 'light') {
    this.temaAtual = tema;
    this.document.body.setAttribute('data-theme', tema);
    localStorage.setItem('portfolio-theme', tema);
  }
}
