export const APP_ROUTES = {
  public: {
    signIn: '/' as const,
  },
  private: {
    home: {
      reports: '/home/reports' as const,
      officers: '/home/officers' as const,
    },
  },
}
