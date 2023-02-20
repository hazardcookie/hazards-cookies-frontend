// shortens eth address
export function eth_address_shortener(address: string) {
  return address.slice(0, 7) + '...' + address.slice(-3);
}
