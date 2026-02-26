import { GalleryVerticalEnd } from "lucide-react";
import { Suspense } from "react";
import { SignupForm } from "@/components/ui/signup/signup-form";
import { redirect } from "next/navigation";

export default function SignUpPage() {
  const authOn = process.env.AUTH_ON?.toLowerCase() === "true";
  if (!authOn) {
    redirect("/dashboard");
  }
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Timetable App
        </a>
        <Suspense>
          <SignupForm />
        </Suspense>
      </div>
    </div>
  );
}
