import * as tls from 'tls'

export const tlsUtil = (host: string, port: number, options?: object): Promise<tls.TLSSocket> => new Promise((resolve, reject) => {
  try {
    const socket: tls.TLSSocket = tls.connect({ port, host, servername: host, ...options }, () => {
      socket.end()
      resolve(socket)
    })
    socket.on('error', e => {
      socket.end()
      reject(e)
    })
  } catch(e) {
    reject(e)
  }
})

export type TLSIssuer = {
  /** Issuer organization's country */
  C: string
  /** Issuer organization's name */
  O: string
  /** Common name */
  CN: string
}
export const parseTLSIssuer = (raw: string): TLSIssuer => {
  const entries = raw.split('\n')
  return Object.fromEntries(entries.map(line => line.split('=', 2))) as TLSIssuer
}