import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  disabled: boolean = true;

  value1: string;

  value2: string;

  value3: string;

  value4: string;

  value5: string = 'Disabled';
}
