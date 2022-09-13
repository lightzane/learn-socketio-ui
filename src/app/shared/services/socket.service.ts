import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { MessageDto } from '../dto';
import { ClientEmitType, ServerEmitType } from '../types';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: Socket;

  constructor() {
    this.socket = io();
  }

  emit(event: ClientEmitType, dto: any): void {
    this.socket.emit(event, dto);
  }

  sendMessage(dto: MessageDto): void {
    this.emit('send-message', dto);
  }

  onMessageReceived(): Observable<MessageDto> {
    return new Observable<MessageDto>(obs => {
      this.socket.on<ServerEmitType>('message-received', (dto: MessageDto) => {
        obs.next(dto);
      });
    });
  }

  createRoom(roomName: string): void {
    this.emit('create-room', roomName);
  }

  leaveRoom(roomName: string): void {
    this.emit('leave-room', roomName);
  }
}
