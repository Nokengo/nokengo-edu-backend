import { OnModuleInit } from '@nestjs/common';
import { PeerServer } from 'peer';

import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'socket.io';
import { MeetingService } from 'src/components/meeting/meeting.service';

@WebSocketGateway({
  // namespace: 'webRTCPeers',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class MyGateway implements OnModuleInit {
  constructor(private readonly meetingService: MeetingService) {}
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');

      this.server.emit('connection-success', {
        status: 'success',
        socketId: socket.id,
      });

      socket.on('join-room', (data) => {
        socket.join(data.meetingId);
        socket.to(data.meetingId).emit('user-connected', data.userId);
      });

      socket.on('sdp', (data) => {
        console.log(data.meetingId);
        socket.to(data.meetingId).emit('sdp', data);
      });

      socket.on('candidate', (data) => {
        socket.broadcast.emit('candidate', data);
      });

      socket.on('disconnect', () => {
        console.log(socket.id);
        console.log('disconnected');
      });
    });
  }
}
