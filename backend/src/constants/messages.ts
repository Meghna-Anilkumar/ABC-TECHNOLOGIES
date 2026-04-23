export const MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: 'Login successful',
    INVALID_CREDENTIALS: 'Invalid email or password',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Access denied. Admin only.',
  },
  SERVICE: {
    CREATED: 'Service created successfully',
    UPDATED: 'Service updated successfully',
    DELETED: 'Service deleted successfully',
    NOT_FOUND: 'Service not found',
    FETCHED: 'Services fetched successfully',
  },
  COMMON: {
    SERVER_ERROR: 'Internal server error',
    VALIDATION_ERROR: 'Validation error',
  }
} as const;