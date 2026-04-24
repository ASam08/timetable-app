import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { toast } from "sonner";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

jest.mock("@/lib/actions", () => ({
  signup: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormStatus: jest.fn(() => ({ pending: false })),
}));

const mockFormAction = jest.fn();
let mockState: SignupFormState | undefined = undefined;

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useActionState: jest.fn(() => [mockState, mockFormAction]),
}));

import { SignupForm } from "@/components/ui/signup/signup-form";
import { SignupFormState } from "@/lib/definitions";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

beforeEach(() => {
  jest.clearAllMocks();
  mockState = undefined;
  (useFormStatus as jest.Mock).mockReturnValue({ pending: false });
  (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
});

describe("SignupForm", () => {
  describe("Form fields", () => {
    it("renders the name input", () => {
      render(<SignupForm />);
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    });

    it("renders the email input", () => {
      render(<SignupForm />);
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });

    it("renders the password input", () => {
      render(<SignupForm />);
      expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    });

    it("renders the confirm password input", () => {
      render(<SignupForm />);
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    });

    it("renders the create account button", () => {
      render(<SignupForm />);
      expect(
        screen.getByRole("button", { name: /create account/i }),
      ).toBeInTheDocument();
    });

    it("renders a link to sign in", () => {
      render(<SignupForm />);
      expect(
        screen.getByRole("link", { name: /sign in/i }),
      ).toBeInTheDocument();
    });

    it("applies custom className to the wrapper", () => {
      const { container } = render(<SignupForm className="custom-class" />);
      expect(container.firstChild).toHaveClass("custom-class");
      expect(container.firstChild).toHaveClass("flex");
    });
  });

  describe("Error handling", () => {
    it("shows name error when state contains name errors", () => {
      mockState = { errors: { name: ["Name is required"] } };
      render(<SignupForm />);
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });

    it("shows email error when state contains email errors", () => {
      mockState = { errors: { email: ["Invalid email address"] } };
      render(<SignupForm />);
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });

    it("shows password errors when state contains password errors", () => {
      mockState = { errors: { password: ["at least 8 characters"] } };
      render(<SignupForm />);
      const matches = screen.getAllByText(/at least 8 characters/i);
      // One LI from the dynamic error list, one from the static FieldDescription
      expect(matches).toHaveLength(2);
      expect(matches[0].tagName).toBe("LI");
    });

    it("shows confirmPassword error alongside password errors", () => {
      mockState = {
        errors: {
          password: ["at least 8 characters"],
          confirmPassword: ["Passwords do not match"],
        },
      };
      render(<SignupForm />);
      expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    });

    it("does not show any errors when state is undefined", () => {
      render(<SignupForm />);
      // These strings only appear in dynamic error renders, not in static hints
      expect(screen.queryByText("Name is required")).not.toBeInTheDocument();
      expect(
        screen.queryByText("Invalid email address"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/passwords do not match/i),
      ).not.toBeInTheDocument();
      // The error list wrapper ("Password must:") only renders when there are password errors
      expect(screen.queryByText("Password must:")).not.toBeInTheDocument();
    });
  });

  describe("Pending state", () => {
    it("disables the button and shows loading text while pending", () => {
      (useFormStatus as jest.Mock).mockReturnValue({ pending: true });
      render(<SignupForm />);
      const button = screen.getByRole("button", { name: /creating/i });
      expect(button).toBeDisabled();
    });

    it("shows 'Create Account' and is enabled when not pending", () => {
      render(<SignupForm />);
      const button = screen.getByRole("button", { name: /create account/i });
      expect(button).not.toBeDisabled();
    });
  });

  describe("Success state", () => {
    it("shows success toast and redirects to /login on success", async () => {
      const mockPush = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

      mockState = { message: "success" };
      render(<SignupForm />);

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith(
          "Account created successfully!",
          expect.objectContaining({ position: "top-center" }),
        );
        expect(mockPush).toHaveBeenCalledWith("/login");
      });
    });
  });
});
