import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  useSearchParams: jest.fn(() => ({ get: jest.fn(() => null) })),
}));

import Page from "@/app/page";

describe("Root Page", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    const { redirect } = require("next/navigation");
    redirect.mockImplementation(() => {
      throw new Error("REDIRECT");
    });
  });

  it("redirects to login page", () => {
    const { redirect } = require("next/navigation");
    expect(() => Page()).toThrow("REDIRECT");
    expect(redirect).toHaveBeenCalledWith("/login");
  });
});
