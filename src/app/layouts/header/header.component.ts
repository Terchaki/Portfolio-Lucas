import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent {
  menuAtivo = false;

  alternarMenu(event?: Event) {
    if (event && event.type === 'touchstart') {
      event.preventDefault();
    }
    this.menuAtivo = !this.menuAtivo;
  }
}
