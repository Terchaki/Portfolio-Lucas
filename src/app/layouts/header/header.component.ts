import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit {
  menuAtivo = false;
  temaAtual: 'dark' | 'light' = 'dark';
  lang: 'pt' | 'en' = 'pt';

  readonly i18n = {
    pt: {
      menuOpen: 'Abrir menu',
      about: 'Sobre mim',
      skills: 'Habilidades',
      projects: 'Projetos',
      experience: 'Experiência',
      contact: 'Contato',
      switchLanguageAria: 'Mudar para inglês',
      languageButton: 'EN',
      themeLightAria: 'Ativar tema claro',
      themeDarkAria: 'Ativar tema escuro',
    },
    en: {
      menuOpen: 'Open menu',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact',
      switchLanguageAria: 'Switch to Portuguese',
      languageButton: 'PT',
      themeLightAria: 'Enable light theme',
      themeDarkAria: 'Enable dark theme',
    },
  };

  get t() {
    return this.i18n[this.lang];
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const temaSalvo = localStorage.getItem('portfolio-theme');
    this.aplicarTema(temaSalvo === 'light' ? 'light' : 'dark');
    this.syncLanguage(this.router.url);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const nav = event as NavigationEnd;
        this.syncLanguage(nav.urlAfterRedirects);
      });
  }

  alternarIdioma() {
    this.fecharMenu();
    this.router.navigate([this.lang === 'en' ? '/' : '/en']);
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

  private syncLanguage(url: string) {
    this.lang = url.startsWith('/en') ? 'en' : 'pt';
  }
}
