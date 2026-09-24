import { redirect } from "next/navigation";

// The illustrations gallery is now the home page, so the old
// /illustrations address forwards there.
export default function OldIllustrationsPage() {
  redirect("/");
}
