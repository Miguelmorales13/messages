export interface TwilioResponse {
  account_sid: string;
  api_version: Date;
  body: string;
  date_created: string;
  date_sent: string;
  date_updated: string;
  direction: string;
  error_code: null;
  error_message: null;
  from: string;
  messaging_service_sid: null;
  num_media: string;
  num_segments: string;
  price: null;
  price_unit: null;
  sid: string;
  status: string;
  subresource_uris: SubresourceUris;
  to: string;
  uri: string;
}

export interface SubresourceUris {
  media: string;
}
