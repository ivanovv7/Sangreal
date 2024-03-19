import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  navBar: string[] = [
    'RECIPES',
    'COCKTAILS',
    'WINES',
    '  ABOUT US',
    '  WHERE TO BUY?',
  ];
}
