const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

const defaultInitParams = {
  headers: {
    'Content-Type': 'json',
    'Cache-Control': 'no-cache'
  }
};

class FetchClient {
  static _instance;

  constructor(defaultParams) {
    this.defaultParams = defaultParams;
  }

  async get(url, params = {}) {
    try {
      const response = await fetch(url, {
        method: HTTP_METHODS.GET,
        ...this.defaultParams,
        ...params
      });

      return response.json();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async post(url, body = {}, params = {}) {
    try {
      const response = await fetch(url, {
        method: HTTP_METHODS.POST,
        ...this.defaultParams,
        ...params,
        body: JSON.stringify(body)
      });

      return response.json();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async put(url, body = {}, params = {}) {
    console.log('body: ', body, url);
    try {
      const response = await fetch(url, {
        method: HTTP_METHODS.PUT,
        ...this.defaultParams,
        ...params,
        body: JSON.stringify(body)
      });

      return response.json();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async del(url, params = {}) {
    try {
      const response = await fetch(url, {
        method: HTTP_METHODS.DELETE,
        ...this.defaultParams,
        ...params,
      });

      return response.json();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static getInstance() {
    if (!FetchClient._instance) {
      FetchClient._instance = new FetchClient(defaultInitParams);
    }
    return FetchClient._instance;
  }
}

export const Fetch = FetchClient.getInstance();
