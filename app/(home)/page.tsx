import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TweetCard from "@/components/tools/tweet-card";
import { GoogleButton } from "@/components/tools/google-button";
import XButton from "@/components/tools/x-button";
import DeleteButton from "@/components/tools/delete-button";
import ViewPasswordButton from "@/components/tools/view-password";

const components = [
  {
    name: "Tweet Card",
    description:
      "An embeddable tweet card with profile, media, and engagement metrics.",
    href: "/docs/components/tweet-card",
  },
  {
    name: "Instagram Card",
    description:
      "A rich Instagram-style post card with photo grids and profile info.",
    href: "/docs/components/instagram-card",
  },
  {
    name: "Editor",
    description:
      "A feature-rich WYSIWYG text editor with formatting tools and live preview.",
    href: "/docs/components/editor",
  },
  {
    name: "Google Button",
    description:
      "A polished Google sign-in button with brand-accurate styling.",
    href: "/docs/components/google-button",
  },
  {
    name: "X Button",
    description:
      "A styled X (Twitter) sign-in button with the official brand mark.",
    href: "/docs/components/x-button",
  },
  {
    name: "Delete Button",
    description:
      "A destructive action button with a built-in confirmation dialog.",
    href: "/docs/components/delete-button",
  },
  {
    name: "View Password",
    description: "A password input with an inline visibility toggle button.",
    href: "/docs/components/view-password-button",
  },
];

const blocks = [
  {
    name: "Signin Form",
    description:
      "A complete authentication form with social login and password recovery.",
    href: "/docs/blocks/signin-form",
  },
  {
    name: "Signup Form",
    description:
      "A registration form with email, password confirmation, and social auth.",
    href: "/docs/blocks/signup-form",
  },
  {
    name: "Reset Password",
    description:
      "A password reset flow with email verification and new password fields.",
    href: "/docs/blocks/reset-password",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-dvh w-full">
      <div className="max-w-5xl mx-auto">
        <h2>Hello World</h2>
      </div>
    </div>
  );
}
