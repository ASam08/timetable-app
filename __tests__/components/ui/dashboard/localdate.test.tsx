import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import LocalDateDisplay from "@/components/ui/dashboard/localdate";

describe("LocalDateDisplay", () => {
  beforeEach(() => {
    // Replace real timers with Jest's fake timer system
    jest.useFakeTimers();
    // Fix the date to a known value so tests are predictable
    jest.setSystemTime(new Date("2026-01-15").getTime());
  });

  afterEach(() => {
    // Restore real timers after each test
    jest.useRealTimers();
  });

  it("displays the current date on render", () => {
    render(<LocalDateDisplay />);
    // 15/01/26 is what toLocaleDateString will produce for 2026-01-15
    expect(screen.getByText("15/01/26")).toBeInTheDocument();
  });

  it("updates the date after 60 seconds", () => {
    render(<LocalDateDisplay />);

    // Advance time by 60 seconds and move to the next day
    act(() => {
      jest.setSystemTime(new Date("2026-01-16").getTime());
      jest.advanceTimersByTime(60000);
    });

    expect(screen.getByText("16/01/26")).toBeInTheDocument();
  });

  it("cleans up the interval on unmount", () => {
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");
    const { unmount } = render(<LocalDateDisplay />);
    unmount();
    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });
});
