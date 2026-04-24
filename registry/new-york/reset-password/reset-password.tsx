"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { PasswordIcon } from "@phosphor-icons/react/dist/ssr";
import ViewPasswordButton from "@/registry/new-york/reset-password/view-password";

export default function ResetPassword() {
  return (
    <div className="w-full min-h-dvh flex items-center justify-center">
      <FieldSet className="max-w-sm w-full">
        <h2 className="text-xl font-bold">Acme</h2>
        <FieldGroup>
          <Field>
            <FieldLabel>Enter a new password</FieldLabel>
            <FieldDescription>
              Must be at least 8 characters long.
            </FieldDescription>
            <InputGroup>
              <InputGroupAddon>
                <PasswordIcon />
              </InputGroupAddon>
              <InputGroupInput
                id="new-password"
                type="password"
                placeholder="New password"
                required
              />
              <ViewPasswordButton inputId="new-password" />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel>Confirm new password</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <PasswordIcon />
              </InputGroupAddon>
              <InputGroupInput
                id="confirm-password"
                type="password"
                placeholder="Confirm new password"
                required
              />
              <ViewPasswordButton inputId="confirm-password" />
            </InputGroup>
          </Field>
        </FieldGroup>
        <FieldSet>
          <Field orientation={"horizontal"}>
            <Button>Reset password</Button>
          </Field>
        </FieldSet>
      </FieldSet>
    </div>
  );
}
