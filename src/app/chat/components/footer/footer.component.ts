import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fadeIn } from '../../../../my-animations';
import { StateService } from '../../../shared/services/state.service';

@Component({
  selector: 'chat-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [fadeIn],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {

  @Input() showInput = false;

  @Output() onSendMessage = new EventEmitter<string>();

  @Output() onProfileClick = new EventEmitter();

  dark = true;

  messageForm: FormGroup;

  constructor(
    private state$: StateService,
    private fb: FormBuilder
  ) {
    this.messageForm = this.fb.group({
      message: ['']
    });
  }

  get message() {
    return this.messageForm.get('message');
  }

  ngOnInit(): void {
    this.state$.$dark.subscribe(v => this.dark = v);
  }

  toggleTheme(): void {
    this.state$.toggleTheme();
  }

  sendMessage(): void {
    const input = this.message?.value as string;
    if (input) {
      const trimInput = input.replace(/\s+/g, ' ').trim();
      this.onSendMessage.emit(trimInput);
      this.message?.setValue('');
    }
  }

  profileClick(): void {
    this.onProfileClick.emit();
  }

}
