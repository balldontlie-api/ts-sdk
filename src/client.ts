import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";
import {
  APIError,
  AuthenticationError,
  ClientConfig,
  NotFoundError,
  RateLimitError,
  ServerError,
  ValidationError,
} from "./types";

export class BaseClient {
  private readonly client: AxiosInstance;

  constructor(config: ClientConfig) {
    const baseURL = config.baseUrl || "https://api.balldontlie.io";

    this.client = axios.create({
      baseURL,
      headers: {
        Authorization: config.apiKey,
        "Content-Type": "application/json",
        "x-bdl-client": "js",
      },
      paramsSerializer: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => {
              searchParams.append(`${key}[]`, v.toString());
            });
          } else {
            searchParams.append(key, value.toString());
          }
        });
        return searchParams.toString();
      },
    });

    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (!error.response) {
          throw new APIError("Network error occurred", 500);
        }

        let errorMessage: string;
        try {
          const errorData = error.response.data as any;
          errorMessage = errorData.error || error.message;
        } catch {
          errorMessage = error.message;
        }

        throw new APIError(
          errorMessage,
          error.response.status,
          error.response.data
        );
      }
    );
  }

  private getErrorMessage(error: any): string {
    if (axios.isAxiosError(error)) {
      // Try to get error message from response data
      if (error.response?.data) {
        if (typeof error.response.data === "string") {
          return error.response.data;
        }
        if (error.response.data.error) {
          return error.response.data.error;
        }
        if (error.response.data.message) {
          return error.response.data.message;
        }
      }
      // Fall back to status text
      if (error.response?.statusText) {
        return error.response.statusText;
      }
      // Use error message as last resort
      return error.message;
    }
    return "An unexpected error occurred";
  }

  protected async request<T>(
    path: string,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    try {
      const response = await this.client.request<T>({
        url: path,
        ...options,
      });
      return response.data;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }

      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status || 500;
        const responseData = error.response?.data;
        const message = this.getErrorMessage(error);

        // Map status codes to specific error types
        switch (statusCode) {
          case 401:
            throw new AuthenticationError(message, statusCode, responseData);
          case 400:
            throw new ValidationError(message, statusCode, responseData);
          case 404:
            throw new NotFoundError(message, statusCode, responseData);
          case 429:
            throw new RateLimitError(message, statusCode, responseData);
          case 500:
          case 502:
          case 503:
          case 504:
            throw new ServerError(message, statusCode, responseData);
          default:
            throw new APIError(message, statusCode, responseData);
        }
      }

      // For non-Axios errors (shouldn't typically happen)
      throw new APIError("An unexpected error occurred", 500);
    }
  }

  protected buildQueryParams(
    params?: Record<string, any>
  ): Record<string, any> {
    if (!params) return {};
    const result: Record<string, any> = {};

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        result[key] = value;
      }
    });

    return result;
  }
}
