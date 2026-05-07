import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: false,
})
export class FooterComponent {
  public currentYear: number = new Date().getFullYear();
  lang: 'pt' | 'en' = 'pt';

  readonly i18n = {
    pt: {
      navigation: 'Navegação',
      about: 'Sobre mim',
      skills: 'Habilidades',
      projects: 'Projetos',
      experience: 'Experiência',
      connect: 'Conectar',
      tagline: 'Desenvolvedor Front-end Angular',
      brandDescription:
        'Transformando ideias em produtos web escaláveis e modernos.',
      developedBy: 'Desenvolvido por',
    },
    en: {
      navigation: 'Navigation',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      experience: 'Experience',
      connect: 'Connect',
      tagline: 'Angular Front-end Developer',
      brandDescription: 'Turning ideas into scalable, modern web products.',
      developedBy: 'Developed by',
    },
  };

  get t() {
    return this.i18n[this.lang];
  }

  constructor(private router: Router) {
    this.syncLanguage(this.router.url);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const nav = event as NavigationEnd;
        this.syncLanguage(nav.urlAfterRedirects);
      });
  }

  private syncLanguage(url: string): void {
    this.lang = url.startsWith('/en') ? 'en' : 'pt';
  }
}
