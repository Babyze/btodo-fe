import { auth } from "@/lib/auth/index.auth";
import { publicRoutes, ROUTES } from "./routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  if (isLoggedIn && isPublicRoute) {
    return Response.redirect(new URL(ROUTES.HOME, nextUrl));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)", "/"],
};
