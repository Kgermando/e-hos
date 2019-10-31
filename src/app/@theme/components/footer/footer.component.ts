import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Créé & conçu par ❤️ <b><a href="https://eventdrc.com"
      target="_blank">EVENTDRC SARL</a></b> ❤️ {{today | date:'yyyy'}}</span>
  `,
})
export class FooterComponent implements OnInit {
  today = new Date();

  ngOnInit() {
    this.today = new Date();
  }
}
