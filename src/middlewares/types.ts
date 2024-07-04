import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

// export type NextMiddlewareResult =
//   | NextResponse
//   | Response
//   | null
//   | undefined
//   | void;

// export type NextMiddleware = (
//   request: NextRequest,
//   event: NextFetchEvent
// ) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

export interface ExtendedNextReq extends NextRequest {
  key?: string;
}
