import { MiddlewareFactory } from "./types";
import { NextMiddleware, NextResponse } from "next/server";
export const TestMiddleware3: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request, event) => {
    //   .......
    return next(request, event);
  };
};
