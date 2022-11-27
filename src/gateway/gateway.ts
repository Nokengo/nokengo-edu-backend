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
import { StatusEnum } from 'src/components/meeting/meeting.entity';
// import { MeetingService } from 'src/components/meeting/meeting.service';

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

      socket.on('join-room', async (data) => {
        console.log(socket.id);
        socket.join(data.meetingId);
        socket.to(data.meetingId).emit('user-connected', data.userId);

        if (data.role === 1) {
          try {
            const meeting = await this.meetingService.update(data.meetingId, {
              sdp: socket.id,
              status: StatusEnum.AVAILABLE,
            });
          } catch (err) {
            console.log(data.meetingId);
          }
        }
      });

      socket.on('sdp', (data) => {
        console.log(data.meetingId);
        socket.to(data.meetingId).emit('sdp', data);
      });

      socket.on('candidate', (data) => {
        socket.broadcast.emit('candidate', data);
      });

      socket.on('disconnect', async () => {
        console.log(socket.id);
        console.log('disconnected');

        try {
          const meeting = await this.meetingService.updateBySocketId(
            socket.id,
            {
              status: StatusEnum.CLOSED,
            },
          );
        } catch (err) {}
      });

      socket.on('ready', (userId) => {
        socket.broadcast.emit('user-ready', userId);
      });
    });
  }
}
