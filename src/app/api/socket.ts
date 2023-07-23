import { Server, Socket } from "socket.io";
import messageHandler from "../../utils/sockets/messageHandler";
import { NextRequest, NextResponse } from "next/server";

// TODO: create an interface that extends NextRequest and NextResponse
export default function SocketHandler(
  req: NextRequest,
  res: NextResponse<any>
) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  function onConnection(socket: Socket) {
    messageHandler(io, socket);
  } // FIXME: find out the type

  io.on("connection", onConnection);
  console.log("Setting up socket");
  res.end();
}
