import { Component } from '@angular/core';
import { StateService } from './shared/services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  dark = true;

  constructor(private state$: StateService) {
    this.state$.$dark.subscribe(v => this.dark = v);
  }

}
