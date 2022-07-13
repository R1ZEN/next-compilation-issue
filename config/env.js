const host = process.env.API_HOST || process.env.NEXT_PUBLIC_API_HOST;

const port = process.env.API_PORT || process.env.NEXT_PUBLIC_API_PORT;
const portStr = port ? `:${port}` : '';

const API_HOST = host ? `${host}${portStr}` : 'http://api:8000';

const GRAPHQL_URL = `${API_HOST}/graphql`;

const BASE_PATH = '';

const FILE_PATH = process.env.NEXT_PUBLIC_FILE_HOST || '';

const ENV = process.env.NEXT_PUBLIC_REALT_ENV || process.env.NODE_ENV || 'development';

const LOCAL_HOST_HIDE_PROTOCOL = 'realt.loc';

module.exports = { API_HOST, GRAPHQL_URL, BASE_PATH, FILE_PATH, ENV, LOCAL_HOST_HIDE_PROTOCOL };
