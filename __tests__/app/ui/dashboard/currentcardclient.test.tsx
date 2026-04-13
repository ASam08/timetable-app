import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";

jest.mock("@/lib/actions", () => ({
  fetchCurrentBlock: jest.fn(),
}));

jest.mock("lucide-react", () => ({
  LucidePlay: () => <svg data-testid="play-icon" />,
}));

import CurrentCardClient from "@/app/ui/dashboard/currentcardclient";

describe("CurrentCardClient", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders loading state", () => {
    const { fetchCurrentBlock } = require("@/lib/actions");
    fetchCurrentBlock.mockImplementation(() => new Promise(() => {}));
    render(<CurrentCardClient />);
    expect(screen.getByText("Loading…")).toBeInTheDocument();
  });

  it("renders no user message", async () => {
    const { fetchCurrentBlock } = require("@/lib/actions");
    fetchCurrentBlock.mockResolvedValue({ reason: "no-user" });
    await act(async () => {
      render(<CurrentCardClient />);
    });
    expect(
      screen.getByText("Nothing to see here, add a timetable to get started!"),
    ).toBeInTheDocument();
  });

  it("renders no current block message", async () => {
    const { fetchCurrentBlock } = require("@/lib/actions");
    fetchCurrentBlock.mockResolvedValue(null);
    await act(async () => {
      render(<CurrentCardClient />);
    });
    expect(screen.getByText("Nowhere to be right now!")).toBeInTheDocument();
  });

  it("renders current block info", async () => {
    const { fetchCurrentBlock } = require("@/lib/actions");
    fetchCurrentBlock.mockResolvedValue({
      subject: "Maths",
      location: "Room 314",
      end_time: "14:30:00",
    });
    await act(async () => {
      render(<CurrentCardClient />);
    });
    expect(screen.getByText("Maths")).toBeInTheDocument();
    expect(screen.getByText("Room 314")).toBeInTheDocument();
    expect(screen.getByText("Finishes at 14:30")).toBeInTheDocument();
  });
});
