import { OnModuleInit } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'socket.io';

@WebSocketGateway({
  // namespace: 'webRTCPeers',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class MyGateway implements OnModuleInit {
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

      socket.on('sdp', (data) => {
        console.log(data);
        socket.broadcast.emit('sdp', data);
      });

      socket.on('candidate', (data) => {
        console.log(data);
        socket.broadcast.emit('candidate', data);
      });

      socket.on('disconnect', () => {
        console.log(socket.id);
        console.log('disconnected');
      });
    });
  }
}
