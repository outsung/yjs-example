"use client";

import { useYjs } from "@/hooks";

export function UsersMouse() {
  const users = useYjs();

  return (
    <div style={{ position: "absolute", zIndex: 100 }}>
      {users.map((user, index) => (
        <div
          style={{
            position: "absolute",
            top: user.y,
            left: user.x,
            backgroundColor: user.color,
            width: 10,
            height: 10,
            borderRadius: 10,
          }}
          key={index}
        />
      ))}
    </div>
  );
}
