"use client";

import { createContext, useContext, useState } from "react";

interface CursorCtx {
  color: string;
  setColor: (c: string) => void;
}

const CursorContext = createContext<CursorCtx>({
  color: "#4dd9c0",
  setColor: () => {},
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [color, setColor] = useState("#4dd9c0");
  return (
    <CursorContext.Provider value={{ color, setColor }}>
      {children}
    </CursorContext.Provider>
  );
}

export const useCursor = () => useContext(CursorContext);
