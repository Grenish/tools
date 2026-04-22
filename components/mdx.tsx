import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { Preview } from "@/components/preview";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import InstagramCard from "@/components/tools/instagram-card";
import TweetCard from "@/components/tools/tweet-card";
import DeleteButton from "./tools/delete-button";
import MainEditor from "./tools/editor/main-editor";
import { GoogleButton } from "./tools/google-button";
import ViewPasswordButton from "./tools/view-password";
import SignupForm from "./tools/blocks/signup-form";
import ResetPassword from "./tools/blocks/reset-password";
import SigninForm from "./tools/blocks/signin-form";
import XButton from "./tools/x-button";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import { TypeTable } from "./type-table";
import { File, Folder, Files } from "fumadocs-ui/components/files";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { CodeViewer } from "./ui/code-viewer";
export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Preview,
    Button,
    InputGroup,
    InputGroupInput,
    InstagramCard,
    TweetCard,
    DeleteButton,
    MainEditor,
    GoogleButton,
    ViewPasswordButton,
    InputGroupAddon,
    SignupForm,
    ResetPassword,
    SigninForm,
    XButton,
    TypeTable,
    File,
    Folder,
    Files,
    CodeViewer,
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    ...TabsComponents,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
