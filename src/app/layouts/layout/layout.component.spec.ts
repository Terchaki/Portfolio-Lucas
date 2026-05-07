/// <reference types="jasmine" />

import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { LayoutComponent } from './layout.component';

class MockIntersectionObserver {
  observe = jasmine.createSpy('observe');
  disconnect = jasmine.createSpy('disconnect');
  unobserve = jasmine.createSpy('unobserve');
  takeRecords = jasmine.createSpy('takeRecords').and.returnValue([]);
  constructor(
    _cb?: IntersectionObserverCallback,
    _options?: IntersectionObserverInit,
  ) {}
}

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let routerEvents$: Subject<unknown>;
  let routerStub: { url: string; events: Subject<unknown> };

  beforeEach(async () => {
    (window as any).IntersectionObserver = MockIntersectionObserver;

    routerEvents$ = new Subject<unknown>();
    routerStub = {
      url: '/',
      events: routerEvents$,
    };

    await TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      providers: [{ provide: Router, useValue: routerStub }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use PT as default language for "/"', () => {
    expect(component.lang).toBe('pt');
    expect(component.text.heroKicker).toBe('Portfólio');
  });

  it('should switch language to EN from route "/en"', () => {
    routerStub.url = '/en';
    component.ngOnInit();
    expect(component.lang).toBe('en');
    expect(component.text.heroKicker).toBe('Portfolio');
  });

  it('should update language when NavigationEnd event is emitted', () => {
    routerEvents$.next(new NavigationEnd(1, '/en', '/en'));
    expect(component.lang).toBe('en');

    routerEvents$.next(new NavigationEnd(2, '/', '/'));
    expect(component.lang).toBe('pt');
  });

  it('should return EN datasets when lang is en', () => {
    component.lang = 'en';
    expect(component.profileView).toBe(component.profileEn);
    expect(component.projectsView).toBe(component.projectsEn);
    expect(component.experiencesView).toBe(component.experiencesEn);
    expect(component.statsView).toBe(component.statsEn);
    expect(component.certificationsView).toBe(component.certificationsEn);
    expect(component.featuredCertificationView).toBe(
      component.featuredCertificationEn,
    );
  });

  it('should return PT datasets when lang is pt', () => {
    component.lang = 'pt';
    expect(component.profileView).toBe(component.profile);
    expect(component.projectsView).toBe(component.projects);
    expect(component.experiencesView).toBe(component.experiences);
    expect(component.statsView).toBe(component.stats);
    expect(component.certificationsView).toBe(component.certifications);
    expect(component.featuredCertificationView).toBe(
      component.featuredCertification,
    );
  });

  it('should control scroll-top button visibility by scrollY', () => {
    Object.defineProperty(window, 'scrollY', { value: 401, configurable: true });
    component.onWindowScroll();
    expect(component.showScrollTop).toBeTrue();

    Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
    component.onWindowScroll();
    expect(component.showScrollTop).toBeFalse();
  });

  it('should call window.scrollTo when scrollToTop is executed', () => {
    const spy = spyOn(window, 'scrollTo');
    component.scrollToTop();
    expect(spy).toHaveBeenCalled();
    const arg = spy.calls.mostRecent().args[0] as ScrollToOptions;
    expect(arg.top).toBe(0);
    expect(arg.behavior).toBe('smooth');
  });

  it('should type role text in PT', fakeAsync(() => {
    component.lang = 'pt';
    (component as any).restartTypingEffect();
    tick(12000);
    expect(component.displayedRole).toBe(component.profile.role);
    expect(component.isTypingDone).toBeTrue();
  }));

  it('should restart typing and render EN role after route switch', fakeAsync(() => {
    routerEvents$.next(new NavigationEnd(10, '/en', '/en'));
    tick(12000);
    expect(component.displayedRole).toBe(component.profileEn.role);
    expect(component.isTypingDone).toBeTrue();
  }));

  it('should toggle skills and scroll to #habilidades when collapsing', fakeAsync(() => {
    const scrollSpy = spyOn<any>(component, 'scrollToSkillsSection');
    component.showAllSkills = true;

    component.toggleSkills(); // collapse
    expect(component.showAllSkills).toBeFalse();

    tick(0);
    expect(scrollSpy).toHaveBeenCalled();
  }));

  it('should only expand skills without scrolling when opening', fakeAsync(() => {
    const scrollSpy = spyOn<any>(component, 'scrollToSkillsSection');
    component.showAllSkills = false;

    component.toggleSkills(); // expand
    expect(component.showAllSkills).toBeTrue();

    tick(0);
    expect(scrollSpy).not.toHaveBeenCalled();
  }));

  it('should keep experience years non-negative', () => {
    const currentYear = new Date().getFullYear();
    const years = component.stats[0].value;
    expect(years).toBe(Math.max(currentYear - 2023, 0));
    expect(years).toBeGreaterThanOrEqual(0);
  });

  it('should animate counters up to stats values', fakeAsync(() => {
    component.animatedStats = component.statsView.map(() => ({ current: 0 }));
    (component as any).animateCounters();

    tick(1500);
    component.statsView.forEach((stat, i) => {
      expect(component.animatedStats[i].current).toBe(stat.value);
    });
  }));
});

describe('LayoutComponent certificationsEn', () => {
  let component: LayoutComponent;

  beforeEach(() => {
    component = new LayoutComponent(
      { nativeElement: document.createElement('div') } as any,
      { url: '/', events: new Subject<unknown>() } as any,
    );
  });

  it('should expose an english certifications list with expected size', () => {
    expect(component.certificationsEn).toBeTruthy();
    expect(Array.isArray(component.certificationsEn)).toBeTrue();
    expect(component.certificationsEn.length).toBe(4);
  });

  it('should contain the expected english certification entries', () => {
    expect(component.certificationsEn[0]).toEqual({
      title: 'Azure Pipelines - CI/CD',
      platform: 'Udemy',
      year: '2025',
    });

    expect(component.certificationsEn[1]).toEqual({
      title: 'GenAI Technical Certification',
      platform: 'Udemy',
      year: '2025',
    });

    expect(component.certificationsEn[2]).toEqual({
      title: 'Tests with Angular',
      platform: 'Udemy',
      year: '2025',
    });

    expect(component.certificationsEn[3]).toEqual({
      title: 'Angular - Best Practices',
      platform: 'Udemy',
      year: '2025',
    });
  });

  it('should keep all certificationsEn items with valid non-empty fields', () => {
    component.certificationsEn.forEach((cert) => {
      expect(typeof cert.title).toBe('string');
      expect(cert.title.trim().length).toBeGreaterThan(0);

      expect(typeof cert.platform).toBe('string');
      expect(cert.platform.trim().length).toBeGreaterThan(0);

      expect(typeof cert.year).toBe('string');
      expect(cert.year.trim().length).toBeGreaterThan(0);
      expect(cert.year).toMatch(/^\d{4}$/);
    });
  });

  it('should return certificationsEn in certificationsView when lang is en', () => {
    component.lang = 'en';
    expect(component.certificationsView).toBe(component.certificationsEn);
  });

  it('should return portuguese certifications in certificationsView when lang is pt', () => {
    component.lang = 'pt';
    expect(component.certificationsView).toBe(component.certifications);
  });

  it('should keep portuguese and english certifications as different datasets', () => {
    expect(component.certificationsEn).not.toBe(component.certifications);

    const differentTitlesCount = component.certificationsEn.filter(
      (enCert, index) =>
        enCert.title !== component.certifications[index]?.title,
    ).length;

    expect(differentTitlesCount).toBeGreaterThan(0);
  });
});
