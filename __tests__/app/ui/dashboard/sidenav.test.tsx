import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";

jest.mock("@/components/branding/tempuslogo", () => ({
  __esModule: true,
  default: () => <div>TempusLogo</div>,
}));

jest.mock("@/components/branding/tempuslogobrand", () => ({
  __esModule: true,
  default: () => <div>TempusLogoBrand</div>,
}));

jest.mock("lucide-react", () => ({
  LucideGrid: () => <div>LucideGrid</div>,
  LucideHome: () => <div>LucideHome</div>,
  LucideLogOut: () => <div>LucideLogOut</div>,
  LucideSettings: () => <div>LucideSettings</div>,
}));

jest.mock("@/auth", () => ({
  signOut: jest.fn(),
}));

jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

import SideNav from "@/app/ui/dashboard/sidenav";

describe("SideNav Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders navigation links correctly", () => {
    const { getByText } = render(<SideNav />);
    expect(getByText("Home")).toBeInTheDocument();
    expect(getByText("Timetable")).toBeInTheDocument();
    expect(getByText("Settings")).toBeInTheDocument();
  });

  it("renders TempusLogo and TempusLogoBrand", () => {
    const { getByText } = render(<SideNav />);
    expect(getByText("TempusLogo")).toBeInTheDocument();
    expect(getByText("TempusLogoBrand")).toBeInTheDocument();
  });

  it("renders icons correctly", () => {
    const { getByText } = render(<SideNav />);
    expect(getByText("LucideHome")).toBeInTheDocument();
    expect(getByText("LucideGrid")).toBeInTheDocument();
    expect(getByText("LucideSettings")).toBeInTheDocument();
  });

  it("renders logout button when auth is on", () => {
    process.env.AUTH_ON = "true";
    const { getByText } = render(<SideNav />);
    expect(getByText("LucideLogOut")).toBeInTheDocument();
  });

  it("does not render logout button when auth is off", () => {
    process.env.AUTH_ON = "false";
    const { queryByText } = render(<SideNav />);
    expect(queryByText("LucideLogOut")).not.toBeInTheDocument();
  });

  it("does not render logout button when AUTH_ON is undefined", () => {
    delete process.env.AUTH_ON;
    const { queryByText } = render(<SideNav />);
    expect(queryByText("LucideLogOut")).not.toBeInTheDocument();
  });

  it("links point to correct destinations", () => {
    const { getByRole } = render(<SideNav />);
    expect(getByRole("link", { name: /home/i })).toHaveAttribute(
      "href",
      "/dashboard",
    );
    expect(getByRole("link", { name: /timetable/i })).toHaveAttribute(
      "href",
      "/dashboard/timetable",
    );
    expect(getByRole("link", { name: /settings/i })).toHaveAttribute(
      "href",
      "/dashboard/settings",
    );
  });

  it("calls signOut with correct redirect when form is submitted", async () => {
    const { signOut } = require("@/auth");
    process.env.AUTH_ON = "true";
    const { getByRole } = render(<SideNav />);

    await act(async () => {
      getByRole("button").click();
    });

    expect(signOut).toHaveBeenCalledWith({ redirectTo: "/login" });
  });
});
