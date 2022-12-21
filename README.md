# Samlit.js

Browse [samlit.net](http://samlit.net) as if you were a script. Brought to you by SamLIT's slave and SamLIT escapist.

![Banner](https://raw.githubusercontent.com/VityaSchel/samlit.js/master/banner.png)

Warning! The text below is saturated with with bile and hatred. This whole package is a joke as SamLIT itself. Do not take it seriously and never contact me about it.

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

#### getAntiDDOSStatus()

Returns true if samlit.net uses Cloudflare proxy. Uses DNS lookup and official [IP ranges](https://www.cloudflare.com/ips/) to determine that.

Returns:

```ts
Promise<boolean>
```


#### pingMarkovPasswords()

Makes a request to [markov.utidteam.com](https://markov.utidteam.com) — my investigation and public article about how I hacked all Samlit students and how Markov accidentally leaked all users passwords and then threatened me with police. Returns time in milliseconds (1/1000 of second) if request was successfull.

Returns:

```ts
Promise<{ ok: true, time: number } | { ok: false }>
```

#### ping100ReasonsSamlitHasAwfulWebsite()

Makes a request to [awfulsamlitwebsite.utidteam.com](https://awfulsamlitwebsite.utidteam.com) — my public article where I described in detail exactly 100 reasons why SamLIT school has an awful designed website. Returns time in milliseconds (1/1000 of second) if request was successfull.

Returns:

```ts
Promise<{ ok: true, time: number } | { ok: false }>
```
#### pingSamlitNet()

Makes a request to [samlit.net](http://samlit.net) itself. Do not use too often — may cause servers to crash, flicker lights in school's campus or even earn a salary bonus to Markov for dodging DDOS attack this month. Returns time in milliseconds (1/1000 of second) if request was successfull.

Returns:

```ts
Promise<{ ok: true, time: number } | { ok: false }>
```

#### getHomework()

Not enough homework to study физика вопроса? Get more by using this method which scraps links to Google Drive folders with homework.

Returns:

```ts
Promise<{ bank: string, zadanie: string }>
```

## License

[MIT](./LICENSE.md)