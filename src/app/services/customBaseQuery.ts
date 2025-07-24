// customBaseQuery.ts
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { RootState } from '../store';
import { AccessTokenAction } from '../features/AccessTokenSlice';


// Add global type for window._isLoggingOut to avoid 'any' usage
// This prevents multiple redirects on 401 errors

declare global {
    interface Window {
    _isLoggingOut?: boolean;
    }
}

interface IRefreshResponse {
    accessToken: string;
    }
    

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://codemap-production.up.railway.app/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.accessToken.accesstoken;
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
    },
});


export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
    async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    // لو الـ token مش صالح
    if (result.error && result.error.status === 401) {
      // جرب تبعت refresh token
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

        if (refreshResult.data) {
        const newAccessToken = (refreshResult.data as IRefreshResponse).accessToken;

        // اعمل dispatch للـ new access token على store
        api.dispatch(AccessTokenAction(newAccessToken));

        // جرب تعمل request تاني بالتوكن الجديد
        result = await baseQuery(args, api, extraOptions);
        } else {
            // Prevent multiple redirects using window._isLoggingOut
            if (!window._isLoggingOut) {
                window._isLoggingOut = true;
                window.location.href = "/login";
                return { error: { status: 401, data: "Unauthorized" } }; // Halt further processing
            }
        }
    }
    return result;
    };