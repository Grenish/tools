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
  PasswordIcon,
  SignInIcon,
  UserIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import ViewPasswordButton from "../view-password";
import { GoogleButton } from "../google-button";
import XButton from "../x-button";

export default function Signin() {
  return (
    <div className="w-full min-h-dvh flex items-center justify-center">
      <FieldSet className="max-w-sm w-full">
        <h2 className="text-xl font-bold">Acme</h2>
        <FieldGroup>
          <Field>
            <FieldLabel>Username</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <UserIcon />
              </InputGroupAddon>
              <InputGroupInput placeholder="johndoe" required />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
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
            <FieldDescription>
              <Link href={"/forget-password"}>Forget Password?</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
        <FieldSet>
          <Field orientation={"horizontal"}>
            <Button>
              <SignInIcon /> Signin
            </Button>
            <Link href={""}>
              <Button variant={"outline"}>Create an account?</Button>
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
