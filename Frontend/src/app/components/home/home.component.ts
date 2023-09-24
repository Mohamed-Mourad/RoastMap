import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sub!: Subscription;

  bgUrl = 'assets/images/bg8.jpg';
  
  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Roast Map")
  }

}
