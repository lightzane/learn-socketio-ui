import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fadeIn, popIn, slideIn } from '../../my-animations';
import { MessageDto } from '../shared/dto';
import { SocketService } from '../shared/services/socket.service';
import { SoundService } from '../shared/services/sound.service';
import { StateService } from '../shared/services/state.service';
import { AddRoomDialogComponent } from './components/add-room-dialog/add-room-dialog.component';
import { EnterNameDialogComponent } from './components/enter-name-dialog/enter-name-dialog.component';

const GENERAL = 'General';

interface Rooms {
  [roomName: string]: MessageDto[];
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: [fadeIn, slideIn, popIn]
})
export class ChatsComponent implements OnInit {

  dark = true;

  /** Chat rooms */
  items = [GENERAL];

  rooms: Rooms = { General: [] };

  roomName: string = '';

  @ViewChild('chatContainer') $chatContainer?: ElementRef<HTMLDivElement>;

  private myName;

  constructor(
    private state$: StateService,
    private dialog: MatDialog,
    private sound$: SoundService,
    private socket$: SocketService
  ) {
    this.myName = localStorage.getItem('username') || 'username';
  }

  ngOnInit(): void {
    this.state$.$dark.subscribe(v => this.dark = v);
    this.initListeners();
  }

  private initListeners(): void {
    this.socket$.onMessageReceived().subscribe(
      messageDto => this.displayMessage(messageDto)
    );
  }

  private displayMessage(messageDto: MessageDto): void {
    const current = messageDto.room || GENERAL;
    this.sound$.message?.play();
    this.rooms[current].unshift(messageDto);
    if (this.roomName === current) {
      this.scrollToBottom();
      delete messageDto.unread;
    }
  }

  private scrollToBottom(): void {
    const $chatContainer = this.$chatContainer?.nativeElement;
    // the setTimeout was the solution to make it scroll to the very far edge
    setTimeout(() => {
      if ($chatContainer) {
        $chatContainer.scrollTop = $chatContainer.scrollHeight;
      }
    }, 10);
  }

  profileClick(): void {
    this.dialog.open(EnterNameDialogComponent, { data: this.myName })
      .afterClosed().subscribe(
        name => { if (name) this.myName = name; localStorage.setItem('username', name); }
      );
  }

  openChat(name: string): void {
    this.roomName = name;
    this.rooms[name].forEach(item => delete item.unread);
  }

  closeChat(): void {
    this.roomName = '';
  }

  openAddRoomDialog(): void {
    this.dialog.open(AddRoomDialogComponent)
      .afterClosed().subscribe(
        input => this.createRoom(input)
      );
  }

  getRoomMessages(roomName: string): MessageDto[] {
    if (this.rooms[roomName]) {
      return this.rooms[roomName];
    }
    return [];
  }

  private createRoom(roomName: string): void {
    if (roomName && !this.items.includes(roomName)) {
      this.items.push(roomName);
      this.rooms[roomName] = [];

      // TODO: Emit create-room
      this.socket$.createRoom(roomName);
    }
  }

  leaveRoom(roomName: string): void {
    this.items = this.items.filter(i => i !== roomName);
    delete this.rooms[roomName];

    // TODO: Emit leave-room
    this.socket$.leaveRoom(roomName);
  }

  sendMessage(content: string): void {
    /** Current room */
    const current = this.roomName;
    this.sound$.message?.play();
    this.rooms[current].unshift({ content });
    this.scrollToBottom();

    // TODO: Emit send-message
    this.socket$.sendMessage({
      room: current === GENERAL ? undefined : current,
      content,
      messenger: this.myName,
      unread: true
    });
  }

  unreadCount(roomName: string): number | undefined {
    const count = this.rooms[roomName].filter(msg => msg.unread).length;
    if (count === 0) return undefined;
    return count;
  }

}
