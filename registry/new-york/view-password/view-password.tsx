"use client";

import { useState } from "react";
import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react/dist/ssr";
import { InputGroupAddon, InputGroupButton } from "@/components/ui/input-group";

interface ViewPasswordButtonProps {
  inputId: string;
}

export default function ViewPasswordButton({
  inputId,
}: ViewPasswordButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    const input = document.getElementById(inputId) as HTMLInputElement;
    if (input) {
      input.type = !isVisible ? "text" : "password";
      setIsVisible(!isVisible);
    }
  };

  return (
    <InputGroupAddon align={"inline-end"}>
      <InputGroupButton
        onClick={handleToggle}
        type="button"
        aria-label="Toggle password visibility"
      >
        {isVisible ? (
          <EyeIcon weight="bold" />
        ) : (
          <EyeClosedIcon weight="bold" />
        )}
      </InputGroupButton>
    </InputGroupAddon>
  );
}
