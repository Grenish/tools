"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import ViewPasswordButton from "./tools/view-password";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import {
  PasswordIcon,
  UserIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import { ButtonGroup } from "./ui/button-group";
import DeleteButton from "./tools/delete-button";
import XButton from "./tools/x-button";
import { GoogleButton } from "./tools/google-button";
import MainEditor from "./tools/editor/main-editor";
import InstagramCard from "./tools/instagram-card";
import TweetCard from "./tools/tweet-card";
import { Field, FieldGroup, FieldLabel } from "./ui/field";

export default function Hero() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 flex items-center justify-center">
        <div className="max-w-6xl mx-auto text-center">
          <div className="space-y-4 sm:space-y-5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-heading">
              Components that just work
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Production-ready, beautifully designed components built for
              real-world apps. Copy, paste, and ship.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button size="lg" asChild>
                <Link href="/docs/installation" className="gap-2">
                  Get Started
                  <ArrowRightIcon size={16} weight="bold" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/docs/components">Browse Components</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="w-full flex-1 px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 auto-rows-max">
            {/* ── Row 1: Editor (left) + Instagram (right) ── */}

            {/* Editor */}
            <div className="[&>div]:h-full">
              <MainEditor />
            </div>

            {/* Instagram */}
            <div className="row-span-2">
              <InstagramCard
                profileName="Grenish"
                description="berozgari ki hadd"
                avatarSrc="https://github.com/grenish.png"
                photoLayout={4}
                photos={[
                  "https://images.unsplash.com/photo-1496070242169-b672c576566b?q=80&w=1343&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  "https://images.unsplash.com/photo-1618517047922-d18a5a36c109?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  "https://images.unsplash.com/photo-1613905780946-26b73b6f6e11?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  "https://images.unsplash.com/photo-1635107510862-53886e926b74?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                ]}
                size="md"
                className="max-w-none h-full"
              />
            </div>

            {/* ── Row 2: Buttons (left, full width) ── */}

            {/* Buttons */}
            <div className="col-span-1">
              <Card className="h-full">
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <ButtonGroup className="w-full">
                      <DeleteButton size="sm" />
                      <DeleteButton
                        iconOnly
                        size="icon-sm"
                        title="You sure?"
                        description="Please don't delete it."
                      />
                    </ButtonGroup>
                    <ButtonGroup className="w-full">
                      <XButton size="sm" />
                      <XButton size="icon-sm" />
                    </ButtonGroup>
                    <ButtonGroup className="w-full">
                      <GoogleButton size="sm" />
                      <GoogleButton size="icon-sm" />
                    </ButtonGroup>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ── Row 3: Password Form + Tweet + "and more" ── */}

            {/* Password Form */}
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Card>
                  <CardContent>
                    <div className="space-y-3">
                      <h2 className="text-lg font-bold">Acme</h2>
                      <Field>
                        <FieldGroup>
                          <Field>
                            <FieldLabel>Username</FieldLabel>
                            <InputGroup>
                              <InputGroupAddon>
                                <UserIcon size={16} weight="regular" />
                              </InputGroupAddon>
                              <InputGroupInput
                                placeholder="username"
                                className="text-sm"
                              />
                            </InputGroup>
                          </Field>
                          <Field>
                            <FieldLabel>Password</FieldLabel>
                            <InputGroup>
                              <InputGroupAddon>
                                <PasswordIcon size={16} weight="regular" />
                              </InputGroupAddon>
                              <InputGroupInput
                                type="password"
                                id="pass"
                                placeholder="password"
                                className="text-sm"
                              />
                              <InputGroupButton asChild>
                                <ViewPasswordButton inputId="pass" />
                              </InputGroupButton>
                            </InputGroup>
                          </Field>
                          <div className="flex items-center justify-between">
                            <Link
                              href="#"
                              className="text-xs text-primary hover:underline"
                            >
                              Forgot password?
                            </Link>
                          </div>
                          <Button className="w-full text-sm">Login</Button>
                          <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                              <span className="w-full border-t border-border/40" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                              <span className="bg-card px-2 text-muted-foreground">
                                or
                              </span>
                            </div>
                          </div>
                          <ButtonGroup className="w-full">
                            <XButton className="flex-1" size="sm" />
                            <GoogleButton className="flex-1" size="sm" />
                          </ButtonGroup>
                        </FieldGroup>
                      </Field>
                    </div>
                  </CardContent>
                </Card>

                {/* Tweet */}
                <div>
                  <TweetCard
                    bio="Fuck this and that"
                    avatarSrc="https://github.com/grenish.png"
                    profileName="Grenish"
                    tweet="Apna bhi time aaega kabhi"
                    replies={30000}
                    likes={50000}
                    retweets={20000}
                    timestamp="3:35 PM · Apr 23, 2026"
                    media={[
                      "https://images.unsplash.com/photo-1496070242169-b672c576566b?q=80&w=1343&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      "https://images.unsplash.com/photo-1496070242169-b672c576566b?q=80&w=1343&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    ]}
                    size="sm"
                    className="max-w-none h-full"
                  />
                </div>

                {/* Text "and more" */}
                <Card>
                  <CardContent className="flex items-center justify-center h-full">
                    <p className="text-xl font-semibold text-muted-foreground">
                      and more
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
