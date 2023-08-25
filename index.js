import {
  SimplePool,
  nip19,
  getEventHash,
  getPublicKey,
  getSignature,
} from "nostr-tools";
import "websocket-polyfill";
import { readFileSync } from "fs";

const relays = readFileSync("./relays.txt", "utf-8")
  .split("\n")
  .filter((x) => !x.match(/^#/))
  .filter((x) => !(x === ""));
const privkey = nip19.decode(readFileSync("./nsec.txt", "utf-8").trim()).data;
const pubkey = getPublicKey(privkey);

const kojiraPubkey =
  "b3e43e8cc7e6dff23a33d9213a3e912d895b1c3e4250240e0c99dbefe3068b5f";

const now = Math.floor(Date.now() / 1000);

const pool = new SimplePool();

const sub = pool.sub(relays, [
  {
    kinds: [1],
    authors: [kojiraPubkey],
    since: now - 1 * 60 * 60,
    "#t": "nostrquiz",
  },
]);

const predictDau = () => {
  return 271;
};

sub.on("event", (event) => {
  console.log(event);
  const replyId = event.id;
  const content = `${predictDau()}`;
  const ev = {
    kind: 1,
    created_at: Math.floor(Date.now() / 1000),
    tags: [
      ["e", replyId, "", "root"],
      ["p", kojiraPubkey],
    ],
    content,
    pubkey,
  };
  ev.id = getEventHash(ev);
  ev.sig = getSignature(ev, privkey);

  try {
    // pool.publish(relays, ev); // Comment out for safety now.
  } catch {
    // Do nothing
  }
});
