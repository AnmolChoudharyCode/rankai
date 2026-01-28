/**
 * User utility functions
 * 
 * This file provides helper functions for managing user data.
 * In a real application, this would integrate with your authentication system.
 */

/**
 * Get the current user ID
 * This is a placeholder - replace with your actual authentication logic
 */
export function getUserId(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  // Try to get user ID from localStorage
  const userId = localStorage.getItem('userId');
  if (userId) {
    return userId;
  }

  // For development/testing, you can set a default user ID
  // In production, this should come from your auth system
  const defaultUserId = localStorage.getItem('defaultUserId') || 'user-123';
  
  // Store it for future use
  if (!localStorage.getItem('userId')) {
    localStorage.setItem('userId', defaultUserId);
  }

  return defaultUserId;
}

/**
 * Set the user ID (for testing or after login)
 */
export function setUserId(userId: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userId', userId);
  }
}

/**
 * Clear user ID (for logout)
 */
export function clearUserId(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('userId');
  }
}

