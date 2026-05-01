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
import DarkModeButton from "./tools/darkmode-buttons/darkmode-button-1";
import Comment from "./tools/comment";
import CommentBox from "./tools/comment-box";
import EmojiPicker, { EmojiPickerPanel } from "./tools/emoji-picker";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import { TypeTable } from "./type-table";
import { File, Folder, Files } from "fumadocs-ui/components/files";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { CodeViewer } from "./ui/code-viewer";
import { TrackedCodeBlock } from "./analytics/tracked-code-block";
import HorizontalStripes from "./horizontal-stripes";
import VerticalStripes from "./vertical-stripes";

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
    DarkModeButton,
    Comment,
    CommentBox,
    EmojiPicker,
    EmojiPickerPanel,
    TypeTable,
    File,
    Folder,
    Files,
    CodeViewer,
    HorizontalStripes,
    VerticalStripes,
    pre: ({ ref: _ref, ...props }) => (
      <TrackedCodeBlock>
        <CodeBlock {...props}>
          <Pre>{props.children}</Pre>
        </CodeBlock>
      </TrackedCodeBlock>
    ),
    ...TabsComponents,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
