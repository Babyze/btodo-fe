import { Navbar } from "@/components/ui/navbar";
import { withAuth } from "@/hooks/withAuth.hook";
import { Container } from "@chakra-ui/react";

function Dashboard() {
  return (
    <Container maxW="7xl" pb="12" h="100vh">
      <Navbar />
    </Container>
  );
}

export default withAuth(Dashboard);
