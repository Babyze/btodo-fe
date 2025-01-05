import { withAuth } from "@/hooks/withAuth.hook";
import { Container } from "@chakra-ui/react";
import Dashboard from "./dashboard/page";

function Home() {
  return (
    <Container minHeight="100vh" minWidth="100vw">
      <Dashboard />
    </Container>
  );
}

export default withAuth(Home);
