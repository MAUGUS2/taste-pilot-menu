import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

// Mock simple para o componente Canvas do React Three Fiber
vi.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: { children: React.ReactNode }) =>
    React.createElement("div", { "data-testid": "mock-canvas" }, children),
  useFrame: vi.fn(),
}));

// Mock simples para o componente mesh do Three.js
vi.mock("three", () => ({
  Mesh: class Mesh {},
}));

// Teste básico para verificar se a página carrega
describe("Page Component", () => {
  it("should render without crashing", async () => {
    // Dynamic import for the page component
    const Page = (await import("../app/page")).default;

    // Render the page
    render(<Page />);

    // Verify if the mocked canvas is present
    const canvas = screen.getByTestId("mock-canvas");
    expect(canvas).toBeDefined();
    expect(canvas).not.toBeNull();
  });
});
