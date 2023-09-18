import { SimplePool } from "nostr-tools";
import "websocket-polyfill";
import { readFileSync, appendFileSync } from "fs";
import { DateTime } from "luxon";
import { execSync } from "child_process";

console.log("Launched");

const relays = readFileSync("./config/relays.txt", "utf-8")
  .split(/\n|\r\n|\r/)
  .filter((x) => !x.match(/^#/))
  .filter((x) => !(x === ""));

const kojiraPubkey =
  "b3e43e8cc7e6dff23a33d9213a3e912d895b1c3e4250240e0c99dbefe3068b5f";

const pool = new SimplePool();

const sub = pool.sub(relays, [
  {
    kinds: [1],
    authors: [kojiraPubkey],
    since: Math.floor(Date.now() / 1000) - 1 * 60 * 60,
  },
]);

sub.on("event", (event) => {
  const result = event.content.match(/正解は(\d+)人/);
  if (result === null) return;
  const [_, num] = result;
  console.log(event.created_at, num);
  const createdAt = event.created_at;
  const date = DateTime.fromSeconds(createdAt)
    .setZone("Asia/Tokyo")
    .minus({ days: 1 })
    .toFormat("yyyy-MM-dd");

  const results = readFileSync("./data/results.txt", "utf-8")
    .split(/\n|\r\n|\r/)
    .filter((x) => !(x === ""))
    .map((x) => x.split(/\s+/));
  if (results.find((x) => x[0] === event.id)) {
    console.log(`event.id: ${event.id} already exists.`);
    return;
  }

  console.log(`event.id: ${event.id} is recorded.`);
  appendFileSync(
    "./data/results.txt",
    `${event.id} ${event.created_at} ${date} ${num}\n`
  );
  try {
    const stdout = execSync("bash data/update.sh");
    console.log(stdout.toString());
  } catch (e) {
    console.log(e.toString());
  }
});
