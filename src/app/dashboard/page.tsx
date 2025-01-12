import { Navbar } from "@/components/ui/navbar";
import { withAuth } from "@/hooks/withAuth.hook";
import { ReactQueryHydrationBoundary } from "@/lib/query/hydration-boundary.query";
import { Container } from "@chakra-ui/react";
import { dehydrate } from "@tanstack/react-query";
import TodoDashboard from "../../components/todo/todo-dashboard";
import { useDashboardPresenter } from "./dashboard.presenter";

async function Dashboard() {
  const { queryClient } = await useDashboardPresenter();

  return (
    <Container maxW="7xl" pb="12" h="90vh">
      <Navbar />
      <ReactQueryHydrationBoundary state={dehydrate(queryClient)}>
        <TodoDashboard />
      </ReactQueryHydrationBoundary>
    </Container>
  );
}

export default withAuth(Dashboard);
