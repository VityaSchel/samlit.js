import fetch from 'node-fetch'
import { parseTLSIssuer, tlsUtil } from './util.js'
import ipRangeCheck from 'ip-range-check'
import dns from 'dns'
import cloudflareIPs from './cloudflareIPs.js'
import { parse, HTMLElement } from 'node-html-parser'

export async function testConnectionSecurity(): Promise<{
  /** If certificate exists and it's valid */
  certificate: boolean
  /** If `certificate` property is true, returns if certificate was issued by Let's Encrypt */
  letsencrypt: boolean
  /** If redirects from http to https when connecting with port `80` */
  httpsRedirect: boolean
}> {
  const request = await fetch('http://samlit.net/', { method: 'GET' })
  const httpsRedirect = request.redirected
    && request.headers.get('Location')?.startsWith('https://') 
    && request.headers.get('Location')?.includes('samlit.net')
    || false

  try {
    const socket = await tlsUtil('samlit.net', 443)
    const x509Certificate = socket.getPeerX509Certificate()
    if(!x509Certificate) {
      return {
        certificate: false,
        letsencrypt: false,
        httpsRedirect
      }
    } else {
      const set = parseTLSIssuer(x509Certificate.issuer)
      return {
        certificate: true,
        letsencrypt: set.O === 'Let\'s Encrypt',
        httpsRedirect
      }
    }
  } catch(e) {
    if(e.code?.startsWith?.('ERR_TLS_CERT')) {
      return {
        certificate: false,
        letsencrypt: false,
        httpsRedirect
      }
    } else {
      throw e
    }
  }
}

/** Returns true if samlit.net uses Cloudflare proxy */
export async function getAntiDDOSStatus(): Promise<boolean> {
  const ip = await new Promise<string>(resolve => dns.lookup('samlit.net', (_, address) => resolve(address))) 
  return ipRangeCheck(ip, cloudflareIPs)
}

export function pingMarkovPasswords(): PingResult {
  return ping('https://markov.utidteam.com/')
}

export function ping100ReasonsSamlitHasAwfulWebsite(): PingResult {
  return ping('https://awfulsamlitwebsite.utidteam.com/')
}

export function pingSamlitNet(): PingResult {
  return ping('http://samlit.net/', true)
}

type PingResult = Promise<{ ok: true, time: number } | { ok: false }>
async function ping(host, allowRedirect = false): PingResult {
  const timer = Date.now()
  try {
    const request = await fetch(host)
    const time = Date.now() - timer
    if(request.status === 200 || (allowRedirect && request.status)) return { ok: true, time }
    else return { ok: false }
  } catch(e) {
    console.error(e)
    return { ok: false }
  }
}

export async function getHomework(): Promise<{ bank: string, zadanie: string }> {
  const request = await fetch('https://samlit.net/component/sppagebuilder/?view=page&id=214')
  const response = await request.text()
  const root = parse(response)
  const bankLink = (root.querySelector('a:contains(Bank)') as HTMLElement).getAttribute('href')
  if(!bankLink) throw new Error('Couldn\'t find Bank link')
  const zadanieLink = (root.querySelector('a:contains(Zadanie)') as HTMLElement).getAttribute('href')
  if(!zadanieLink) throw new Error('Couldn\'t find Zadanie link')
  return { bank: bankLink, zadanie: zadanieLink }
}

console.log(await getHomework())