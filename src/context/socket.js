import { createContext, useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { apiUrl } from "../config/apiUrl";
import { saveNewNotification } from "../store/common/commonSlice";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const { isLogin, access_token } = useSelector((state) => state.authReducer);
  const { newNotificationsCount } = useSelector((state) => state.commonReducer);
  // window.location.pathname is used as it is not wrapper in router component
  const pathname = window.location.pathname;
  const socketRef = useRef(null);
  const dispatch = useDispatch();
  // let socketUrl = "https://j42qd1qd-5002.inc1.devtunnels.ms/";
  // socketUrl = "https://bdn0pm0c-5002.inc1.devtunnels.ms/";

  useEffect(() => {
    if (isLogin) {
      socketRef.current = io(apiUrl, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        randomizationFactor: 0,
        auth: { token: access_token },
      });
    }
    return () => {
      socketRef.current?.disconnect();
    };
  }, [isLogin, access_token]);
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current?.on("new-notification", ({ notification }) => {
        const totalCount = newNotificationsCount + 1;
        dispatch(saveNewNotification(totalCount));
      });
    }

    return () => {
      socketRef.current?.off("new-notification");
      socketRef.current?.off("unread");
    };
  }, [newNotificationsCount, socketRef.current]);
  return (
    <WebSocketContext.Provider value={socketRef}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
