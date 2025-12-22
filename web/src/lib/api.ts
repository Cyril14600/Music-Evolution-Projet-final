import qs from 'qs';

export function getStrapiURL(path = '') {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
        }${path}`;
}

export function getStrapiMedia(url: string | null) {
    if (url == null) {
        return null;
    }

    // Return the full URL if the media is hosted on an external provider
    if (url.startsWith('http') || url.startsWith('//')) {
        return url;
    }

    // Otherwise prepend the Strapi URL
    return `${getStrapiURL()}${url}`;
}

export async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
    try {
        // Merge default and user options
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        if (process.env.STRAPI_API_TOKEN) {
            headers['Authorization'] = `Bearer ${process.env.STRAPI_API_TOKEN}`;
        }

        const mergedOptions = {
            headers,
            next: { revalidate: 60 }, // Default ISR: 60 seconds
            ...options,
        };

        // Resolve conflict: cache: 'no-store' cannot be used with next: { revalidate }
        if ((options as RequestInit).cache === 'no-store') {
            delete (mergedOptions as any).next;
        }

        // Build request URL
        const queryString = qs.stringify(urlParamsObject);
        const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ''}`)}`;

        // Trigger API call
        const response = await fetch(requestUrl, mergedOptions);
        const data = await response.json();

        if (!response.ok) {
            console.error(`API Error ${response.status} for ${path}:`, data.error);
            // Return null to allow fallback data in the UI
            return null;
        }

        return data;

    } catch (error) {
        console.error(`API Fetch Error for ${path}:`, error);
        // During build time, if API is down, we want to fail gracefully or return null
        // rather than breaking the entire build.
        // For development/production runtime, the Error Boundary will handle nulls or rehydration mismatch if handled in UI.
        return null;
    }
}
