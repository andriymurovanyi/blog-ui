import config from '../../../public/config/application.json';

export function getApiUrl() {
  return config.apiUrl;
}
