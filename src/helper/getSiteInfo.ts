import Query from 'query-string';

export const getQueryParams = (): { [key: string]: string } =>
  Query.parse(location.search.toLowerCase());

export const getSiteId = (): string => getQueryParams()['siteid'];

export const getDomain = (): string => getQueryParams()['domain'];

export const getAgentId = (): string => getQueryParams()['agentid'];
