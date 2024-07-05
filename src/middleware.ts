import { stackMiddlewares } from "@/middlewares/stack-middleware";
import { TestMiddleware } from "./middlewares/test-middleware";
import { TestMiddleware2 } from "./middlewares/test2";
import { TestMiddleware3 } from "./middlewares/test3";
import { NextIntlMiddleware } from "./middlewares/next-intl-middleware";

export const middleware = stackMiddlewares([
  TestMiddleware,
  TestMiddleware2,
  TestMiddleware3,
  NextIntlMiddleware,
]);
// 中间件运行路径
export const config = {
  matcher: ["/"],
};
