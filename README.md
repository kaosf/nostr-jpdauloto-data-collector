# Nostrquiz (JP DAU Loto) Data Collector

[Raw results.txt Link (Stopped updating)](https://raw.githubusercontent.com/kaosf/nostr-jpdauloto-data-collector/main/results-archive.txt)

Preparation

```sh
nvim config/relays.txt # Input relay URLs
# Example
<<EOF
wss://nostr.example.com
wss://another-relay.example.com
# wss://invalid-relay.example.com
# The line starting with # is ignored.
wss://third-relay.example.com
EOF

cp data/update.sh.example data/update.sh
nvim data/update.sh # Modify the script as you like
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
