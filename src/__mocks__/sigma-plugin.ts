import { vi } from "vitest";

// Mock Sigma Plugin SDK
export const mockClient = {
  config: {
    configureEditorPanel: vi.fn(),
  },
};

export const mockUseConfig = vi.fn();
export const mockUseElementColumns = vi.fn();
export const mockUseElementData = vi.fn();

// Mock the entire @sigmacomputing/plugin module
vi.mock("@sigmacomputing/plugin", () => ({
  client: mockClient,
  useConfig: mockUseConfig,
  useElementColumns: mockUseElementColumns,
  useElementData: mockUseElementData,
}));

// Helper function to reset all mocks
export const resetSigmaMocks = () => {
  mockUseConfig.mockReset();
  mockUseElementColumns.mockReset();
  mockUseElementData.mockReset();
  // Don't reset configureEditorPanel as it's called at module load
};

// Helper to setup typical Sigma data mock
export const setupSigmaDataMock = (
  data: Record<string, unknown>,
  columns: Record<string, unknown> = {},
  config: Record<string, unknown> = {}
) => {
  mockUseConfig.mockReturnValue(config);
  mockUseElementColumns.mockReturnValue(columns);
  mockUseElementData.mockReturnValue(data);
};
