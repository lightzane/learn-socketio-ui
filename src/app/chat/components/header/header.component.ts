import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { fadeIn } from '../../../../my-animations';

@Component({
  selector: 'chat-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [fadeIn],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnChanges {

  @Input() showEdit = true;

  @Input() get headerText() { return this._headerText; }

  @Output() onNewClick = new EventEmitter();

  @Output() onArrowClick = new EventEmitter();

  @Output() onLeaveClick = new EventEmitter<string>();

  edit = false;

  private _headerText = '';

  set headerText(text: string) {
    this._headerText = text || 'Chats';
  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeOnHeaderText(changes['headerText']?.currentValue);
  }

  changeOnHeaderText(headerText: string): void {
    if (headerText) {
      this.edit = false;
      this.showEdit = false;
    } else {
      this.showEdit = true;
    }
  }

  newClick(): void {
    this.onNewClick.emit();
  }
  /** Go back to homepage */
  arrowClick(): void {
    this.onArrowClick.emit();
  }

  editClick(): void {
    this.edit = !this.edit;
  }

  leave(roomName: string): void {
    this.onLeaveClick.emit(roomName);
    this.arrowClick();
  }

}
