export const formatToken = (access_token: string, token_type?: string) =>
  `${token_type ? token_type : 'Bearer'} ${access_token}`
