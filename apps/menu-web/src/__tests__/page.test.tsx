import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

// Mock completo para o Canvas e hooks do React Three Fiber
vi.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: { children: React.ReactNode }) =>
    React.createElement("div", { "data-testid": "mock-canvas" }, children),
  useFrame: vi.fn(),
  useThree: vi.fn().mockReturnValue({
    camera: {},
    scene: {},
    size: { width: 800, height: 600 },
  }),
}));

// Mock para os componentes drei
vi.mock("@react-three/drei", () => ({
  OrbitControls: () => null,
  PerspectiveCamera: () => null,
  Environment: () => null,
  Stars: () => null,
  Html: ({ children }: { children: React.ReactNode }) =>
    React.createElement("div", { "data-testid": "mock-html" }, children),
  Text: () => null,
}));

// Mock para THREE
vi.mock("three", () => ({
  Mesh: class Mesh {},
  Group: class Group {},
}));

// Mock para o componente Carousel
vi.mock("../components/3d/Carousel", () => ({
  Carousel: () => React.createElement("div", { "data-testid": "mock-carousel" }, "Carousel Mock"),
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
