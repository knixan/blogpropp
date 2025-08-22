"use client";

import { Button } from "@/components/ui/button";

// import { deleteBlog } from "./actions";

function DeleteButton({ onDelete }: { onDelete: () => Promise<void> }) {
  return (
    <Button
      variant="destructive"
      onClick={async () => {
        if (confirm("Are you sure you want to delete this blog?")) {
          await onDelete();
        }
      }}
    >
      Delete Blog
    </Button>
  );
}

export default DeleteButton;
