import { createContext, useState, useEffect } from "react";
import { Socket, io } from "socket.io-client";

type SocketIOContextProps = {
  socket: Socket | null;
  connect: (() => void) | null;
  disconnect: (() => void) | null;
  isConnected: boolean;
  keepAlive: boolean;
  setKeepAlive: ((keepAlive: boolean) => void) | null;
};

export const SocketContext = createContext<SocketIOContextProps>({
  socket: null,
  connect: null,
  disconnect: null,
  isConnected: false,
  keepAlive: false,
  setKeepAlive: null,
});

export const SocketIOProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const socket = io(__BACKEND_URL__, { autoConnect: false });
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [keepAlive, setKeepAlive] = useState(false);

  const connect = () => {
    socket.connect();
  };

  const disconnect = () => {
    socket.disconnect();
  };

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
      if (keepAlive) {
        setTimeout(() => {
          keepAlive && connect();
        }, 1000);
      }
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        connect,
        disconnect,
        isConnected,
        keepAlive,
        setKeepAlive,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketIOProvider;
