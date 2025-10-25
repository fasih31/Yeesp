import axios from 'axios';
import { zoomOAuth } from './zoom-oauth';

interface ZoomMeetingSettings {
  host_video: boolean;
  participant_video: boolean;
  join_before_host: boolean;
  mute_upon_entry: boolean;
  watermark: boolean;
  use_pmi: boolean;
  approval_type: number;
  audio: string;
  auto_recording: string;
}

interface CreateZoomMeetingParams {
  topic: string;
  type: number;
  start_time: string;
  duration: number;
  timezone: string;
  password?: string;
  agenda?: string;
  settings?: Partial<ZoomMeetingSettings>;
}

interface ZoomMeetingResponse {
  id: number;
  host_id: string;
  topic: string;
  type: number;
  start_time: string;
  duration: number;
  timezone: string;
  created_at: string;
  join_url: string;
  password: string;
  start_url: string;
  settings: ZoomMeetingSettings;
}

export class ZoomMeetingService {
  private readonly apiBaseUrl = 'https://api.zoom.us/v2';

  async createMeeting(params: CreateZoomMeetingParams): Promise<ZoomMeetingResponse> {
    try {
      const accessToken = await zoomOAuth.getAccessToken();
      
      const meetingData = {
        topic: params.topic,
        type: params.type || 2,
        start_time: params.start_time,
        duration: params.duration,
        timezone: params.timezone || 'UTC',
        password: params.password,
        agenda: params.agenda,
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: true,
          mute_upon_entry: false,
          watermark: false,
          use_pmi: false,
          approval_type: 0,
          audio: 'both',
          auto_recording: 'none',
          ...params.settings,
        },
      };

      const response = await axios.post<ZoomMeetingResponse>(
        `${this.apiBaseUrl}/users/me/meetings`,
        meetingData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to create Zoom meeting:', error.response?.data || error.message);
      throw new Error('Failed to create Zoom meeting');
    }
  }

  async getMeeting(meetingId: string): Promise<ZoomMeetingResponse> {
    try {
      const accessToken = await zoomOAuth.getAccessToken();

      const response = await axios.get<ZoomMeetingResponse>(
        `${this.apiBaseUrl}/meetings/${meetingId}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to get Zoom meeting:', error.response?.data || error.message);
      throw new Error('Failed to get Zoom meeting');
    }
  }

  async deleteMeeting(meetingId: string): Promise<void> {
    try {
      const accessToken = await zoomOAuth.getAccessToken();

      await axios.delete(
        `${this.apiBaseUrl}/meetings/${meetingId}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error: any) {
      console.error('Failed to delete Zoom meeting:', error.response?.data || error.message);
      throw new Error('Failed to delete Zoom meeting');
    }
  }

  async updateMeeting(
    meetingId: string,
    updates: Partial<CreateZoomMeetingParams>
  ): Promise<void> {
    try {
      const accessToken = await zoomOAuth.getAccessToken();

      await axios.patch(
        `${this.apiBaseUrl}/meetings/${meetingId}`,
        updates,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error: any) {
      console.error('Failed to update Zoom meeting:', error.response?.data || error.message);
      throw new Error('Failed to update Zoom meeting');
    }
  }
}

export const zoomMeetings = new ZoomMeetingService();
