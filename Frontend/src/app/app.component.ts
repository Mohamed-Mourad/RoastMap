import { Component, OnInit } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const title = document.querySelector('.title');
        if (event.url !== '/home' && event.url !== '/signin' && event.url !== '/signup') {
          title?.classList.add('alt-background');
        } else {
          title?.classList.remove('alt-background');
        }
      }
    });
  }
}







