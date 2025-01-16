"use client";
import { Wifi, WifiOff } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { motion } from "framer-motion";

const SocketConnection: React.FC = () => {
  const [isConnectionOn, setIsConnectionOn] = useState<boolean>(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    // Listen for connection success
    socketRef.current.on("connect", () => {
      setIsConnectionOn(true);
    });

    // Listen for disconnection
    socketRef.current.on("disconnect", () => {
      setIsConnectionOn(false);
    });

    // Cleanup on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center bg-white rounded-md mr-[15px] px-2.5 py-1 border border-[hsl(var(--input))] cursor-default">
      <div className="flex items-center gap-3">
        {isConnectionOn ? (
          <div className="flex items-center gap-2 text-green-600">
            <Wifi className="w-6 h-6" />
            <h1 className="text-lg font-semibold">Online</h1>
          </div>
        ) : (
          <motion.div
            className="flex items-center gap-2 text-red-600"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <WifiOff className="w-6 h-6" />
            <h1 className="text-lg font-semibold">Offline</h1>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SocketConnection;
