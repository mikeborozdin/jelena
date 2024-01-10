import * as amplitude from '@amplitude/analytics-browser';

let hasInit = false;

const initAnalytics = () => {
  amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY as string, {
    defaultTracking: true,
  });
  hasInit = true;
};

const enum AnalyticsEvent {
  LANDING_PAGE_VIEW = 'LANDING_PAGE_VIEW',
  REVIEW_STORY = 'REVIEW_STORY',
  RATE_REVIEW = 'RATE_REVIEW',
  SEND_FEEDBACK = 'SEND_FEEDBACK',
  ERROR = 'ERORR',
}

const logAnalyticsEvent = (
  event: AnalyticsEvent,
  data?: Record<string, string>,
) => {
  if (!hasInit) {
    initAnalytics();
  }

  const queryParams = new URLSearchParams(window.location.search);

  amplitude.logEvent(event, {
    ...data,
    utm_source: queryParams.get('utm_source'),
  });
};

export { logAnalyticsEvent, AnalyticsEvent };
