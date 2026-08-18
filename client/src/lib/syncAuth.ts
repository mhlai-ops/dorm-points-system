export const isRecoverableSyncAuthError = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  return [
    "Invalid Compact JWS",
    "JWTExpired",
    "JWTClaimValidationFailed",
    "JWSInvalid",
    "Invalid sync scope",
    "Sync session expired",
    "UNAUTHORIZED",
  ].some(fragment => message.includes(fragment));
};
