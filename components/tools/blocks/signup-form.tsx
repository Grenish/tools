import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  AtIcon,
  PasswordIcon,
  PersonIcon,
  UserIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { GoogleButton } from "../google-button";
import ViewPasswordButton from "../view-password";
import XButton from "../x-button";

export default function Signup() {
  return (
    <div className="w-full min-h-dvh flex items-center justify-center">
      <FieldSet className="max-w-sm w-full">
        <h2 className="text-xl font-bold">Acme</h2>
        <FieldGroup>
          <FieldGroup>
            <FieldLabel>Name</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <PersonIcon />
              </InputGroupAddon>
              <InputGroupInput placeholder="First Name" required />
              <InputGroupInput placeholder="Last Name" required />
            </InputGroup>
          </FieldGroup>
          <Field>
            <FieldLabel>Username</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <UserIcon />
              </InputGroupAddon>
              <InputGroupInput placeholder="username" required />
            </InputGroup>
            <FieldDescription>
              Choose a unique username to identify yourself
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <AtIcon />
              </InputGroupAddon>
              <InputGroupInput type="email" placeholder="email" required />
            </InputGroup>
            <FieldDescription>
              We&apos;ll use this to contact you. We will not share your email
              with anyone else.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
            <FieldDescription>
              Must be at least 8 characters long.
            </FieldDescription>
            <InputGroup>
              <InputGroupAddon>
                <PasswordIcon />
              </InputGroupAddon>
              <InputGroupInput
                type="password"
                placeholder="password"
                id="password"
                required
              />
              <ViewPasswordButton inputId="password" />
            </InputGroup>
          </Field>
        </FieldGroup>
        <FieldSet>
          <Field orientation={"horizontal"}>
            <Button>Create Account</Button>
            <Link href={"/signin"}>
              <Button variant={"outline"}>Already have an account?</Button>
            </Link>
          </Field>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldGroup>
            <Field orientation={"horizontal"}>
              <FieldLabel>Or continue with</FieldLabel>
              <GoogleButton />
              <XButton />
            </Field>
          </FieldGroup>
        </FieldSet>
      </FieldSet>
    </div>
  );
}
