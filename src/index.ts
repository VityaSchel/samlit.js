import fetch from 'node-fetch'
import { parseTLSIssuer, tlsUtil } from './util.js'

export async function testConnectionSecurity(): Promise<{
  /** If certificate exists and it's valid */
  certificate: boolean
  /** If `certificate` property is true, returns if certificate was issued by Let's Encrypt */
  letsencrypt: boolean
  /** If redirects from http to https when connecting with port `80` */
  httpsRedirect: boolean
}> {
  const request = await fetch('http://samlit.net/', { method: 'OPTIONS' })
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

console.log(await testConnectionSecurity())