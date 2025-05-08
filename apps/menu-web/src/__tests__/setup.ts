import { vi } from "vitest";
import { ReactNode } from "react";
import React from "react";

// Mock for ResizeObserver that doesn't exist in jsdom
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock for Canvas 3D
vi.mock("@react-three/fiber", async () => {
  const actual = (await vi.importActual("@react-three/fiber")) as Record<string, unknown>;
  return {
    ...actual,
    Canvas: ({ children }: { children: ReactNode }) =>
      React.createElement("div", { "data-testid": "r3f-canvas" }, children),
  };
});
