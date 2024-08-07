import { MiddlewareFactory } from "./types";
import { NextMiddleware, NextResponse } from "next/server";
export const TestMiddleware: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request, event) => {
    //   .......
    const response = (await next(request, event)) || NextResponse.next();
    return response;
  };
};
