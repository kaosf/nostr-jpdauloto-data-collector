# Nostrquiz (JP DAU Loto) Data Collector

[Raw results.txt Link](https://raw.githubusercontent.com/kaosf/nostr-jpdauloto-data-collector/main/results.txt)

You can get data like that:

```sh
curl https://raw.githubusercontent.com/kaosf/nostr-jpdauloto-data-collector/main/results.txt
```

Preparation

```sh
nvim relays.txt # Input relay URLs
# Example
<<EOF
wss://nostr.example.com
wss://another-relay.example.com
# wss://invalid-relay.example.com
# The line starting with # is ignored.
wss://third-relay.example.com
EOF
```

Run

```sh
asdf install
npm i
node index.js
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (C) 2023 ka
