import { withAuth } from "@/hooks/withAuth.hook";
import { signOut } from "@/lib/auth/index.auth";

function Dashboard() {
  return (
    <>
      Hello
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </>
  );
}

export default withAuth(Dashboard);
