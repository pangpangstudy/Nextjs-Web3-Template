import { SiweMessage } from "siwe";
import { Address } from "viem";

export default async function createSiweMessage({
  address,
  statement,
  nonce,
  chainId,
}: {
  address: string;
  statement: string;
  nonce: string;
  chainId: number;
}) {
  const message = new SiweMessage({
    domain: window.location.host,
    address,
    statement,
    uri: window.location.origin,
    version: "1",
    chainId,
    nonce,
  });
  return message.prepareMessage();
}
