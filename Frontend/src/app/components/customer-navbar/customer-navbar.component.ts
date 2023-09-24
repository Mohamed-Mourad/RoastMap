import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-customer-navbar',
  templateUrl: './customer-navbar.component.html',
  styleUrls: ['./customer-navbar.component.css'],
})
export class CustomerNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() cartClicked = new EventEmitter();

  @Output() notfsClicked = new EventEmitter();

  onCartClick() {
    this.cartClicked.emit();
  }

  onNotfsClick() {
    this.notfsClicked.emit();
  }

}
