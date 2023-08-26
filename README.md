# Nostrquiz (JP DAU Loto) Data Collector

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

```sh
asdf install
npm i
node index.js
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (C) 2023 ka
