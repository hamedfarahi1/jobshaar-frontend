import { Component } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  value: string = '';
  events: string[] = [];
  opened: boolean = true;
  tiles: Tile[] = [
    { text: 'One', cols: 1, rows: 2, color: 'unset' },
    { text: 'Two', cols: 1, rows: 2, color: 'unset' },
  ];
}
