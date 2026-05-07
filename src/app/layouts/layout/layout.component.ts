import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

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

type Lang = 'pt' | 'en';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: false,
})
export class LayoutComponent implements OnInit, OnDestroy {
  private readonly experienceStartYear = 2023;
  private langSubscription?: Subscription;

  lang: Lang = 'pt';

  displayedRole = '';
  isTypingDone = false;
  showScrollTop = false;
  showAllSkills = false;

  readonly ui = {
    pt: {
      heroKicker: 'Portfólio',
      heroHighlightYears: '+3 anos em produtos web',
      heroHighlightStack: 'Angular como stack principal',
      ctaProjects: 'Ver Projetos',
      ctaContact: 'Falar Comigo',
      aboutLabel: 'Sobre mim',
      aboutTitle: 'Perfil profissional',
      aboutParagraphs: [
        'Sou desenvolvedor Front-end com foco em Angular e experiência na construção de aplicações corporativas com alto nível de regra de negócio. Gosto de transformar requisitos complexos em interfaces intuitivas, performáticas e sustentáveis no longo prazo.',
        'Sou formado em Análise e Desenvolvimento de Sistemas, o que fortalece minha base para construir soluções consistentes, com visão de produto e boas práticas de engenharia.',
        'Tenho experiência em times ágeis, atuando desde a concepção técnica até o deploy. Sou apaixonado por aprender novas tecnologias e metodologias, e estou sempre buscando evoluir como profissional.',
        'Fora do código, gosto de viajar, conhecer novas culturas e passar tempo com minha família e amigos. Acredito que um bom equilíbrio entre vida pessoal e profissional é essencial para manter a criatividade e a motivação no trabalho.',
      ],
      skillsLabel: 'Habilidades',
      skillsTitle: 'Stack e ferramentas',
      skillsShowLess: 'Ver menos',
      skillsShowAllPrefix: 'Ver todas',
      companiesLabel: 'Experiência',
      companiesTitle: 'Trajetória corporativa onde atuei',
      projectsLabel: 'Projetos',
      projectsTitle: 'Principais Projetos',
      projectLinkLive: 'Projeto',
      projectLinkCode: 'Código',
      projectsTechLabel: 'Tecnologias:',
      experienceLabel: 'Experiência',
      experienceTitle: 'Minha jornada profissional',
      experienceCurrent: 'Atualmente',
      certLabel: 'Certificações',
      certTitle: 'Cursos e formações',
      contactLabel: 'Contato',
      contactTitle: 'Vamos conversar sobre sua próxima iniciativa?',
      contactDescription:
        'Estou disponível para oportunidades em desenvolvimento front-end Angular. Se fizer sentido para sua equipe, será um prazer trocar uma ideia.',
      scrollTopAria: 'Voltar ao topo',
    },
    en: {
      heroKicker: 'Portfolio',
      heroHighlightYears: '+3 years building web products',
      heroHighlightStack: 'Angular as my core stack',
      ctaProjects: 'View Projects',
      ctaContact: 'Contact Me',
      aboutLabel: 'About me',
      aboutTitle: 'Professional profile',
      aboutParagraphs: [
        'I am a Front-end developer focused on Angular, with hands-on experience building enterprise applications with complex business rules. I enjoy turning complex requirements into intuitive, high-performance, and maintainable interfaces.',
        'I hold a degree in Systems Analysis and Development, which strengthens my foundation to build consistent solutions with a product mindset and solid engineering practices.',
        'I have experience working in agile teams, from technical design to deployment. I am passionate about learning new technologies and methodologies, and I am constantly improving as a professional.',
        'Outside of coding, I enjoy traveling, discovering new cultures, and spending time with family and friends. I believe a healthy work-life balance is key to staying creative and motivated.',
      ],
      skillsLabel: 'Skills',
      skillsTitle: 'Stack and tools',
      skillsShowLess: 'Show less',
      skillsShowAllPrefix: 'Show all',
      companiesLabel: 'Experience',
      companiesTitle: 'Companies where I worked',
      projectsLabel: 'Projects',
      projectsTitle: 'Featured Projects',
      projectLinkLive: 'Live',
      projectLinkCode: 'Code',
      projectsTechLabel: 'Technologies:',
      experienceLabel: 'Experience',
      experienceTitle: 'My professional journey',
      experienceCurrent: 'Current role',
      certLabel: 'Certifications',
      certTitle: 'Courses and training',
      contactLabel: 'Contact',
      contactTitle: 'Let us talk about your next initiative?',
      contactDescription:
        'I am open to Angular front-end opportunities. If it makes sense for your team, I would be glad to connect.',
      scrollTopAria: 'Back to top',
    },
  };

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

  readonly profileEn = {
    firstName: 'Lucas Henrique',
    role: 'Angular Front-end Developer',
    city: 'Caldas Novas - GO, Brazil',
    email: 'lucas.dev.contato@outlook.com',
    headline:
      'I transform complex processes into clear, high-performance web products ready to scale.',
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

  readonly projectsEn: Project[] = [
    {
      title: 'Portal do Cartao - CredSystem',
      description:
        'Self-service portal for debt renegotiation, invoice consultation, bill duplicate generation, and other credit card related services.',
      technologies:
        'HTML, SCSS, JavaScript, TypeScript, Angular, Bootstrap, Azure DevOps',
      liveUrl: 'https://www.portaldocartao.com.br/',
      highlight:
        'Financial self-service experience focused on customer autonomy and support efficiency.',
    },
    {
      title: 'SGGP - Albert Einstein',
      description:
        'Enterprise platform for project governance with forms, dashboards, recommendations, reports, and cross-team integrations.',
      technologies:
        'Angular, TypeScript, SCSS, Bootstrap, Docker, MySQL, Azure DevOps',
      liveUrl:
        'https://sggp-webclient-stg.apps.ocp-rosa-hml.einstein.br/auth/login',
      highlight:
        'Strategic platform for hospital project management, integrating teams and accelerating decisions.',
    },
    {
      title: 'Hotel CTC Admin Platform',
      description:
        'Hotel management platform with reservations, discount coupons, collaborator control, and partner administration.',
      technologies: 'HTML, SCSS, JavaScript, TypeScript, Angular',
      liveUrl: 'https://app.hotelctc.com.br/auth/login',
      highlight:
        'Administrative panel focused on operational efficiency and full control of hotel routines.',
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

  readonly experiencesEn: Experience[] = [
    {
      company: 'Air Company',
      period: 'Aug/2025',
      role: 'Mid Front-end Angular',
      description:
        'Working on large-scale products, contributing to front-end initiatives and continuous product evolution.',
      isActual: true,
    },
    {
      company: 'Cyber Computing',
      period: 'Jul/2023 - Mar/2025',
      role: 'Angular Front-end Developer',
      description:
        'End-to-end contribution to robust products, including SGGP for Albert Einstein, leading front-end implementations and improvements.',
      isActual: false,
    },
    {
      company: 'Epigrafo Solucoes',
      period: 'Feb/2023 - Jul/2023',
      role: 'Front-end Developer',
      description:
        'First formal IT experience, contributing to Hotel CTC admin panel and Adtur website improvements.',
      isActual: false,
    },
    {
      company: 'Freelancer',
      period: 'Jun/2022 - Jan/2023',
      role: 'Software Developer',
      description:
        'Career transition start with functional projects used in real environments, consolidating front-end fundamentals and value delivery.',
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

  readonly statsEn: Stat[] = [
    {
      label: 'Years of experience',
      value: this.getExperienceYears(),
      suffix: '+',
    },
    { label: 'Delivered projects', value: 10, suffix: '+' },
    { label: 'Systems in production', value: 4, suffix: '' },
  ];

  animatedStats = this.statsView.map(() => ({ current: 0 }));

  readonly certifications: Certification[] = [
    { title: 'Azure Pipelines - CI/CD', platform: 'Udemy', year: '2025' },
    {
      title: 'GenAI Techinical Certification',
      platform: 'Udemy',
      year: '2025',
    },
    {
      title: 'Testes Unitários com Angular - Jasmine e Karma',
      platform: 'Udemy',
      year: '2025',
    },
    {
      title: 'Angular - Boas práticas de desenvolvimento',
      platform: 'Udemy',
      year: '2024',
    },
  ];

  readonly certificationsEn: Certification[] = [
    { title: 'Azure Pipelines - CI/CD', platform: 'Udemy', year: '2025' },
    {
      title: 'GenAI Technical Certification',
      platform: 'Udemy',
      year: '2025',
    },
    { title: 'Tests with Angular', platform: 'Udemy', year: '2025' },
    {
      title: 'Angular - Best Practices',
      platform: 'Udemy',
      year: '2025',
    },
  ];

  readonly featuredCertification: FeaturedCertification = {
    title: 'GitHub Copilot Certification',
    issuer: 'Microsoft',
    status: 'GH - 300',
    note: ' Certificação oficial do GitHub Copilot, validando habilidades avançadas em desenvolvimento assistido por IA e integração de ferramentas modernas.',
    image: 'assets/images/github-copilot.svg',
  };

  readonly featuredCertificationEn: FeaturedCertification = {
    title: 'GitHub Copilot Certification',
    issuer: 'Microsoft',
    status: 'GH - 300',
    note: 'Official GitHub Copilot certification validating advanced skills in AI-assisted development and modern tooling integration.',
    image: 'assets/images/github-copilot.svg',
  };

  get text() {
    return this.ui[this.lang];
  }

  get profileView() {
    return this.lang === 'en' ? this.profileEn : this.profile;
  }

  get projectsView(): Project[] {
    return this.lang === 'en' ? this.projectsEn : this.projects;
  }

  get experiencesView(): Experience[] {
    return this.lang === 'en' ? this.experiencesEn : this.experiences;
  }

  get statsView(): Stat[] {
    return this.lang === 'en' ? this.statsEn : this.stats;
  }

  get certificationsView(): Certification[] {
    return this.lang === 'en' ? this.certificationsEn : this.certifications;
  }

  get featuredCertificationView(): FeaturedCertification {
    return this.lang === 'en'
      ? this.featuredCertificationEn
      : this.featuredCertification;
  }

  private countersAnimated = false;
  private typingTimer?: ReturnType<typeof setTimeout>;
  private typingVersion = 0;
  private scrollObserver?: IntersectionObserver;
  private counterObserver?: IntersectionObserver;

  constructor(
    private el: ElementRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.syncLanguage(this.router.url);
    this.setupScrollReveal();
    this.setupCounterObserver();
    this.langSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const nav = event as NavigationEnd;
        this.syncLanguage(nav.urlAfterRedirects);
      });
  }

  private startTypingEffect(): void {
    const text = this.profileView.role;
    const currentVersion = ++this.typingVersion;
    let i = 0;
    const type = () => {
      if (currentVersion !== this.typingVersion) {
        return;
      }
      if (i < text.length) {
        this.displayedRole += text[i++];
        this.typingTimer = setTimeout(type, 85);
      } else {
        this.isTypingDone = true;
      }
    };
    this.typingTimer = setTimeout(type, 1100);
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
    this.statsView.forEach((stat, i) => {
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
    const wasExpanded = this.showAllSkills;
    this.showAllSkills = !this.showAllSkills;

    // Ao recolher as skills no mobile, reposiciona a viewport na seção.
    if (wasExpanded) {
      setTimeout(() => this.scrollToSkillsSection(), 0);
    }
  }

  private scrollToSkillsSection(): void {
    const section = this.el.nativeElement.querySelector(
      '#habilidades',
    ) as HTMLElement | null;
    if (!section) return;

    const headerOffset = 90;
    const top =
      section.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top, behavior: 'smooth' });
  }

  private syncLanguage(url: string): void {
    const nextLang: Lang = url.startsWith('/en') ? 'en' : 'pt';
    if (
      nextLang === this.lang &&
      this.displayedRole.length > 0 &&
      this.isTypingDone
    ) {
      return;
    }

    this.lang = nextLang;
    this.showAllSkills = false;
    this.countersAnimated = false;
    this.animatedStats = this.statsView.map(() => ({ current: 0 }));
    this.restartTypingEffect();
  }

  private restartTypingEffect(): void {
    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
    }
    this.typingVersion++;
    this.displayedRole = '';
    this.isTypingDone = false;
    this.startTypingEffect();
  }

  ngOnDestroy(): void {
    if (this.typingTimer) clearTimeout(this.typingTimer);
    this.langSubscription?.unsubscribe();
    this.scrollObserver?.disconnect();
    this.counterObserver?.disconnect();
  }
}
