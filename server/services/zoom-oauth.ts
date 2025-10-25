import axios from 'axios';

interface ZoomTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

class ZoomOAuthService {
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  private get accountId(): string {
    const id = process.env.ZOOM_ACCOUNT_ID;
    if (!id) throw new Error('ZOOM_ACCOUNT_ID not configured');
    return id;
  }

  private get clientId(): string {
    const id = process.env.ZOOM_CLIENT_ID;
    if (!id) throw new Error('ZOOM_CLIENT_ID not configured');
    return id;
  }

  private get clientSecret(): string {
    const secret = process.env.ZOOM_CLIENT_SECRET;
    if (!secret) throw new Error('ZOOM_CLIENT_SECRET not configured');
    return secret;
  }

  async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
      
      const response = await axios.post<ZoomTokenResponse>(
        `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${this.accountId}`,
        {},
        {
          headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in - 300) * 1000;

      return this.accessToken;
    } catch (error) {
      console.error('Failed to get Zoom access token:', error);
      throw new Error('Failed to authenticate with Zoom');
    }
  }

  clearToken(): void {
    this.accessToken = null;
    this.tokenExpiry = 0;
  }
}

export const zoomOAuth = new ZoomOAuthService();
