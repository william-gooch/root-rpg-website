import React from "react";
import { useHistory } from "react-router-dom";

const SocketContext = React.createContext<WebSocket>(null as any);

export const SocketProvider: React.FC = props => {
  const [socket, setSocket] = React.useState<WebSocket>(undefined as any);
  const history = useHistory();

  const onMessage = React.useCallback(
    (ev: MessageEvent<any>) => {
      const data = JSON.parse(ev.data);
      if (data.action === "error") {
        console.log("error message");
      } else if (data.action === "load") {
        let charactersToSave = "";
        const charactersString = localStorage.getItem("myCharacters");
        console.log(charactersString);
        if (charactersString) {
          const characters = JSON.parse(charactersString) as string[];
          characters.push(data.id);
          charactersToSave = JSON.stringify(characters);
        } else {
          charactersToSave = JSON.stringify([data.id]);
        }
        localStorage.setItem("myCharacters", charactersToSave);
        history.push(`/character/${data.id}`);
      }
    },
    [history]
  );

  React.useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001");
    socket.addEventListener("message", onMessage);
    setSocket(socket);
  }, [onMessage]);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
export const useSocket = () => React.useContext(SocketContext);
