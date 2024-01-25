"use client";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

import { useEffect, useState } from "react";

interface User {
  name: string;
  color: string;
  x: string;
  y: string;
}
const yDoc = new Y.Doc();
const provider = new WebrtcProvider("test", yDoc);

export function useYjs(): User[] {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const name = Math.random();
    const color = randomColor();
    provider.awareness.setLocalStateField("user", {
      name,
      color,
      x: undefined,
      y: undefined,
    });

    provider.awareness.on("change", (changes: any) => {
      setUsers(
        Array.from(provider.awareness.getStates().values()).map((a) => a.user)
      );
    });

    window.addEventListener("mousemove", (e) => {
      provider.awareness.setLocalStateField("user", {
        name,
        color,
        x: e.pageX,
        y: e.pageY,
      });
    });
  }, []);

  return users;
}

function randomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
}
