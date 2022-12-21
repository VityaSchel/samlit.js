# Samlit.js

Browse <samlit.net> as if you were a script. Brought to you by SamLIT's slave and SamLIT escapist.

![Banner](banner.png)

## Installation

```
npm i samlit
```

or

```
yarn add samlit
```

## API reference

#### testConnectionSecurity()

Tests if you can be securely connected with samlit.net host. This includes checking if SSL certificate exists and valid, if it was issued by independent trustworthy non-russian organization, and if there is a http->https redirect. If all three checks passed, it's safe to assume Markov left the post of technical director.

Returns:

```ts
Promise<{
  /** If certificate exists and it's valid */
  certificate: boolean
  /** If `certificate` property is true, returns if certificate was issued by Let's Encrypt */
  letsencrypt: boolean
  /** If redirects from http to https when connecting with port `80` */
  httpsRedirect: boolean
}>
```

## License

[MIT](./LICENSE.md)