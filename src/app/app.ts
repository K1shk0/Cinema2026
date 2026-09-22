import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Page1 } from './components/page1/page1';
import { Page2 } from './components/page2/page2';
import { Page3 } from './components/page3/page3';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Page1, Page2, Page3, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Cinema2026');
}
