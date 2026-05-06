import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';

interface Project {
  title: string;
  description: string;
  technologies: string;
  liveUrl?: string;
  codeUrl?: string;
  highlight?: string;
}

interface Experience {
  company: string;
  period: string;
  role: string;
  description: string;
  isActual: boolean;
}

interface Company {
  name: string;
  logo: string;
  url?: string;
}

interface Stat {
  label: string;
  value: number;
  suffix: string;
}

interface Certification {
  title: string;
  platform: string;
  year: string;
}

interface FeaturedCertification {
  title: string;
  issuer: string;
  status: string;
  note: string;
  image: string;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: false,
})
export class LayoutComponent implements OnInit, OnDestroy {
  private readonly experienceStartYear = 2023;

  displayedRole = '';
  isTypingDone = false;
  showScrollTop = false;
  showAllSkills = false;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.showScrollTop = window.scrollY > 400;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  readonly profile = {
    firstName: 'Lucas Henrique',
    role: 'Desenvolvedor Front-end Angular',
    city: 'Caldas Novas - GO, Brasil',
    email: 'lucas.dev.contato@outlook.com',
    headline:
      'Transformo processos complexos em produtos web claros, performáticos e prontos para escalar.',
    photo: 'assets/images/photo-profile.jpeg',
    cvUrl: 'assets/docs/curriculo-lucas-henrique.pdf',
  };

  readonly skills = [
    'Angular',
    'TypeScript',
    'JavaScript',
    'SCSS',
    'HTML',
    'Bootstrap',
    'karma',
    'Jasmine',
    'RxJS',
    'Git e GitHub',
    'Docker',
    'Azure DevOps',
    'Scrum',
    'MySQL',
    'Figma',
    'AdobeXD',
  ];

  readonly projects: Project[] = [
    {
      title: 'Portal do Cartão - CredSystem',
      description:
        'portal de autoatendimento, para renegociaco de dividas, consulta de faturas, segunda via de boletos, entre outros serviços relacionados a cartões de crédito.',
      technologies:
        'HTML, SCSS, JavaScript, TypeScript, Angular, Bootstrap, Azure DevOps',
      liveUrl: 'https://www.portaldocartao.com.br/',
      highlight:
        'Projeto de grande escala com foco em experiência e produtividade.',
    },
    {
      title: 'SGGP - Albert Einstein',
      description:
        'Aplicação corporativa para governança de projetos com formulários, dashboards, recomendações, laudos e integrações entre áreas.',
      technologies:
        'Angular, TypeScript, SCSS, Bootstrap, Docker, MySQL, Azure DevOps',
      liveUrl:
        'https://sggp-webclient-stg.apps.ocp-rosa-hml.einstein.br/auth/login',
      highlight:
        'Plataforma estratégica para gestão de projetos hospitalares, integrando áreas e acelerando decisões.',
    },
    {
      title: 'Plataforma administrativa do Hotel CTC',
      description:
        'Sistema de gestão hoteleira para o Hotel CTC, com funcionalidades de reservas, cupons de desconto, controle de colaboradores e parceiros.',
      technologies: 'HTML, SCSS, JavaScript, TypeScript, Angular',
      liveUrl: 'https://app.hotelctc.com.br/auth/login',
      highlight:
        'Painel administrativo voltado para eficiência operacional e controle completo da rotina do hotel.',
    },
  ];

  readonly experiences: Experience[] = [
    {
      company: 'Air Company',
      period: 'Ago/2025',
      role: 'Mid Front-end Angular',
      description:
        'Atuação em projetos de grande escala, colaborando em iniciativas de front-end e contribuindo para a evolução contínua dos produtos da empresa.',
      isActual: true,
    },
    {
      company: 'Cyber Computing',
      period: 'Jul/2023 - Mar/2025',
      role: 'Desenvolvedor Front-end Angular',
      description:
        'Atuação ponta a ponta em produtos robustos, incluindo o SGGP para o Albert Einstein, liderando implementações e evoluções do front-end.',
      isActual: false,
    },
    {
      company: 'Epígrafo Soluções',
      period: 'Fev/2023 - Jul/2023',
      role: 'Desenvolvedor Front-end',
      description:
        'Primeira experiência formal em TI, colaborando no painel administrativo do Hotel CTC e em melhorias no site da Adtur.',
      isActual: false,
    },
    {
      company: 'Freelancer',
      period: 'Jun/2022 - Jan/2023',
      role: 'Desenvolvedor de Software',
      description:
        'Início da transição de carreira com projetos funcionais usados em ambiente real, consolidando fundamentos de front-end e entrega de valor.',
      isActual: false,
    },
  ];

  readonly companies: Company[] = [
    {
      name: 'Air Company',
      logo: 'assets/company/logo-air-company.svg',
      url: 'https://aircompany.ai/en/about-us/',
    },
    {
      name: 'Invillia',
      logo: 'assets/company/logo-invillia.jpg',
      url: 'https://aircompany.ai/en/about-us/',
    },
    {
      name: 'CredSystem',
      logo: 'assets/company/logo-credsystem.png',
      url: 'https://www.credsystem.com.br/',
    },
    {
      name: 'Hospital Albert Einstein',
      logo: 'assets/company/logo-albert-einstein.svg',
      url: 'https://www.einstein.br/n',
    },
    {
      name: 'Cyber Computing',
      logo: 'assets/company/logo-cyber-computing.png',
      url: 'https://cybercomputing.com.br/',
    },
    {
      name: 'Epígrafo Soluções',
      logo: 'assets/company/logo-epigrafo.svg',
    },
    {
      name: 'Hotel CTC',
      logo: 'assets/company/logo-hotel-ctc.png',
      url: 'https://hotelctc.com.br/',
    },
  ];

  readonly stats: Stat[] = [
    {
      label: 'Anos de experiência',
      value: this.getExperienceYears(),
      suffix: '+',
    },
    { label: 'Projetos entregues', value: 10, suffix: '+' },
    { label: 'Sistema em produção', value: 4, suffix: '' },
  ];

  animatedStats = this.stats.map(() => ({ current: 0 }));

  // Atualize com seus cursos e certificados reais
  readonly certifications: Certification[] = [
    { title: 'Angular — O Guia Completo', platform: 'Udemy', year: '2023' },
    {
      title: 'TypeScript para Desenvolvedores',
      platform: 'Udemy',
      year: '2023',
    },
    { title: 'RxJS na prática com Angular', platform: 'Udemy', year: '2024' },
    {
      title: 'Bootstrap 5 — UI e Responsividade',
      platform: 'Udemy',
      year: '2022',
    },
  ];

  readonly featuredCertification: FeaturedCertification = {
    title: 'GitHub Copilot Certification',
    issuer: 'Microsoft',
    status: 'GH - 300',
    note: ' Certificação oficial do GitHub Copilot, validando habilidades avançadas em desenvolvimento assistido por IA e integração de ferramentas modernas.',
    image: 'assets/images/github-copilot.svg',
  };

  private countersAnimated = false;
  private typingTimer?: ReturnType<typeof setTimeout>;
  private scrollObserver?: IntersectionObserver;
  private counterObserver?: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.startTypingEffect();
    this.setupScrollReveal();
    this.setupCounterObserver();
  }

  private startTypingEffect(): void {
    const text = this.profile.role;
    let i = 0;
    const type = () => {
      if (i < text.length) {
        this.displayedRole += text[i++];
        this.typingTimer = setTimeout(type, 55);
      } else {
        this.isTypingDone = true;
      }
    };
    this.typingTimer = setTimeout(type, 900);
  }

  private setupScrollReveal(): void {
    this.scrollObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('revealed');
        }),
      { threshold: 0.1 },
    );
    this.el.nativeElement
      .querySelectorAll('.scroll-reveal')
      .forEach((el: Element) => this.scrollObserver!.observe(el));
  }

  private setupCounterObserver(): void {
    this.counterObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting && !this.countersAnimated) {
            this.countersAnimated = true;
            this.animateCounters();
          }
        }),
      { threshold: 0.5 },
    );
    const section = this.el.nativeElement.querySelector('.stats-section');
    if (section) this.counterObserver.observe(section);
  }

  private animateCounters(): void {
    const duration = 1400;
    const steps = 40;
    this.stats.forEach((stat, i) => {
      const inc = stat.value / steps;
      let step = 0;
      const timer = setInterval(() => {
        step++;
        this.animatedStats[i].current = Math.min(
          Math.round(inc * step),
          stat.value,
        );
        if (step >= steps) clearInterval(timer);
      }, duration / steps);
    });
  }

  private getExperienceYears(): number {
    const currentYear = new Date().getFullYear();
    return Math.max(currentYear - this.experienceStartYear, 0);
  }

  toggleSkills(): void {
    this.showAllSkills = !this.showAllSkills;
  }

  ngOnDestroy(): void {
    if (this.typingTimer) clearTimeout(this.typingTimer);
    this.scrollObserver?.disconnect();
    this.counterObserver?.disconnect();
  }
}
