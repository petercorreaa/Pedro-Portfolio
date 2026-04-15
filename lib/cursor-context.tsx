"use client";

import { createContext, useContext, useState } from "react";

interface CursorCtx {
  color: string;
  setColor: (c: string) => void;
}

const CursorContext = createContext<CursorCtx>({
  color: "#e8e0f5",
  setColor: () => {},
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [color, setColor] = useState("#e8e0f5");
  return (
    <CursorContext.Provider value={{ color, setColor }}>
      {children}
    </CursorContext.Provider>
  );
}

export const useCursor = () => useContext(CursorContext);
