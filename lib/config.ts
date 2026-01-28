/**
 * Environment Configuration
 * 
 * This file provides type-safe access to environment variables
 * and environment-specific configuration.
 */

type Environment = 'development' | 'uat' | 'production';

interface AppConfig {
  env: Environment;
  apiBaseUrl: string;
  backendUrl: string;
  isDevelopment: boolean;
  isUAT: boolean;
  isProduction: boolean;
}

/**
 * Get the current environment
 */
function getEnvironment(): Environment {
  const env = process.env.NEXT_PUBLIC_ENV || process.env.NODE_ENV || 'development';
  
  if (env === 'production' || env === 'prod') {
    return 'production';
  }
  if (env === 'uat') {
    return 'uat';
  }
  return 'development';
}

/**
 * Get the application configuration based on the current environment
 */
export function getConfig(): AppConfig {
  const env = getEnvironment();
  
  const config: AppConfig = {
    env,
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '',
    backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || '',
    isDevelopment: env === 'development',
    isUAT: env === 'uat',
    isProduction: env === 'production',
  };

  // Validate required environment variables
  if (!config.apiBaseUrl) {
    console.warn('NEXT_PUBLIC_API_BASE_URL is not set');
  }
  if (!config.backendUrl) {
    console.warn('NEXT_PUBLIC_BACKEND_URL is not set');
  }

  return config;
}

/**
 * Export the configuration as a constant
 * This will be evaluated at build time
 */
export const config = getConfig();

/**
 * Helper function to get the full API URL
 */
export function getApiUrl(endpoint: string): string {
  const baseUrl = config.apiBaseUrl.replace(/\/$/, ''); // Remove trailing slash
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${path}`;
}

/**
 * Helper function to get the full backend URL
 */
export function getBackendUrl(endpoint: string): string {
  const baseUrl = config.backendUrl.replace(/\/$/, ''); // Remove trailing slash
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${path}`;
}

