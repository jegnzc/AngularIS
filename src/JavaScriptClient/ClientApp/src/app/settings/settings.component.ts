import { Component } from '@angular/core';
import { fadeInOut } from '../../services/animations';

@Component({
  selector: 'settings-component',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [fadeInOut]
})

export class SettingsComponent {
  constructor() { }
}
