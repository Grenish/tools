"use client";

import Comment, { type CommentData } from "@/components/tools/comment";
import DarkModeButton1 from "@/components/tools/darkmode-buttons/darkmode-button-1";

const sampleComments: CommentData[] = [
  {
    id: "1",
    author: {
      name: "Sarah Johnson",
      username: "sarahjohnson",
      initials: "SJ",
    },
    content:
      "This is a great implementation! I especially like how the nested replies are handled with the thread line indicator.",
    createdAt: new Date(Date.now() - 2 * 60000), // 2 minutes ago
    isOwn: false,
    likes: 12,
    dislikes: 1,
    replies: [
      {
        id: "1-1",
        author: {
          name: "Mike Chen",
          username: "mikechen",
          initials: "MC",
        },
        content:
          "Totally agree! The keyboard shortcuts make it feel really polished.",
        createdAt: new Date(Date.now() - 1 * 60000), // 1 minute ago
        isOwn: true,
        likes: 3,
        dislikes: 0,
        replies: [],
      },
      {
        id: "1-2",
        author: {
          name: "Emma Davis",
          username: "emmadavis",
          initials: "ED",
        },
        content: "@mikechen The dark mode support is also seamless!",
        createdAt: new Date(Date.now() - 30000), // 30 seconds ago
        isOwn: false,
        likes: 2,
        dislikes: 0,
        replies: [],
      },
    ],
  },
  {
    id: "2",
    author: {
      name: "Alex Rodriguez",
      username: "alexrodriguez",
      initials: "AR",
    },
    content:
      "How does the edit functionality handle character count validation after editing?",
    createdAt: new Date(Date.now() - 5 * 60000), // 5 minutes ago
    isOwn: false,
    likes: 4,
    dislikes: 0,
    replies: [],
  },
];

export default function Test() {
  return (
    <div className="min-h-svh w-full flex items-center justify-center">
      <div className="w-full flex items-center justify-center">
        <div className="space-y-4">
          {/*{sampleComments.map((comment) => (
            <Comment
              key={comment.id}
              {...comment}
              onLike={(id) => console.log("Liked:", id)}
              onDislike={(id) => console.log("Disliked:", id)}
              onEdit={(id, content) => console.log("Edit:", id, content)}
              onDelete={(id) => console.log("Delete:", id)}
              onReport={(id) => console.log("Report:", id)}
              onReply={(id, content) => console.log("Reply:", id, content)}
            />
          ))}*/}
          <DarkModeButton1 />
        </div>
      </div>
    </div>
  );
}
