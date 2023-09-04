import { SimplePool } from "nostr-tools";
import "websocket-polyfill";
import { readFileSync, appendFileSync } from "fs";
import { DateTime } from "luxon";
import { execSync } from "child_process";

const relays = readFileSync("./relays.txt", "utf-8")
  .split("\n")
  .filter((x) => !x.match(/^#/))
  .filter((x) => !(x === ""));

const kojiraPubkey =
  "b3e43e8cc7e6dff23a33d9213a3e912d895b1c3e4250240e0c99dbefe3068b5f";

const now = Math.floor(Date.now() / 1000);

const pool = new SimplePool();

const sub = pool.sub(relays, [
  {
    kinds: [1],
    authors: [kojiraPubkey],
    since: now - 25 * 60 * 60,
  },
]);

const logs = readFileSync("./results.txt", "utf-8")
  .split("\n")
  .filter((x) => !(x === ""))
  .map((x) => x.split(/\s+/));

sub.on("event", (event) => {
  const result = event.content.match(/正解は(\d+)人/);
  if (result !== null) {
    const [_, num] = result;
    console.log(event.created_at, num);
    const createdAt = event.created_at;
    const date = DateTime.fromSeconds(createdAt)
      .setZone("Asia/Tokyo")
      .minus({ days: 1 })
      .toFormat("yyyy-MM-dd");

    if (logs.find((x) => x[0] === event.id)) {
      console.log(`event.id: ${event.id} already exists.`);
      return;
    }

    console.log(`event.id: ${event.id} is recorded.`);
    appendFileSync(
      "./results.txt",
      `${event.id} ${event.created_at} ${date} ${num}\n`
    );
    let stdout = null;
    stdout = execSync("git add results.txt");
    console.log(stdout.toString());
    stdout = execSync('git commit -m "Update results.txt"');
    console.log(stdout.toString());
    stdout = execSync("git push");
    console.log(stdout.toString());
  }
});
