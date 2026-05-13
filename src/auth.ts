export let tokenClient: google.accounts.oauth2.TokenClient;
let authInitialized = false;

let inFlightRequest: {
  promise: Promise<string>;
  interactive: boolean;
  resolve: (token: string) => void;
  reject: (error: any) => void;
} | null = null;

let cachedAccessToken: string | null = null;
let tokenExpiryTime: number | null = null;

export const initAuth = (clientId: string) => {
  if (authInitialized) return;

  const googleObj = (window as any).google;
  if (!googleObj) {
      console.error("Google API script not loaded");
      return;
  }
  
  tokenClient = googleObj.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: 'https://www.googleapis.com/auth/drive.file',
    callback: (response: any) => {
      if (!inFlightRequest) {
        console.warn('Token response received but no request in flight.');
        return;
      }

      const { resolve, reject } = inFlightRequest;
      inFlightRequest = null;

      if (response.error !== undefined) {
        if (response.error === 'popup_blocked' || response.error === 'interaction_required') {
          reject(new Error(response.error));
        } else {
          reject(response);
        }
      } else {
        const token = response.access_token;
        cachedAccessToken = token;
        const expiresIn = response.expires_in ? parseInt(response.expires_in, 10) : 3600;
        tokenExpiryTime = Date.now() + expiresIn * 1000;

        resolve(token);
      }
    },
  });

  authInitialized = true;
};

// We will inject the script in our component and call initAuth
export const getAccessToken = async (interactive = false): Promise<string> => {
  if (!tokenClient) {
    throw new Error('Auth not initialized. Call initAuth() first.');
  }

  if (cachedAccessToken && tokenExpiryTime && (tokenExpiryTime - Date.now() > 60000)) {
    return cachedAccessToken;
  }

  if (inFlightRequest) {
    const { promise, interactive: inFlightInteractive } = inFlightRequest;
    if (!interactive || inFlightInteractive) {
      return promise;
    }
  }

  let resolveFn: (token: string) => void;
  let rejectFn: (error: any) => void;

  const promise = new Promise<string>((resolve, reject) => {
    resolveFn = resolve;
    rejectFn = reject;
  });

  const timeoutMs = interactive ? 60000 : 3000;

  const timeout = setTimeout(() => {
    if (inFlightRequest?.promise === promise) {
      inFlightRequest = null;
      rejectFn(new Error(interactive ? 'timeout' : 'interaction_required'));
    }
  }, timeoutMs);

  inFlightRequest = {
    promise,
    interactive,
    resolve: (token) => {
      clearTimeout(timeout);
      resolveFn(token);
    },
    reject: (error) => {
      clearTimeout(timeout);
      rejectFn(error);
    }
  };

  tokenClient.requestAccessToken(interactive ? {} : { prompt: 'none' });

  return promise;
};
