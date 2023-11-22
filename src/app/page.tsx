import { Whoami } from "@/components/whoami";
import { headers } from "next/headers";
import { jwtDecode } from "jwt-decode";

import { formatDistance } from "date-fns";
import { NotAuthorized } from "@/components/not-authorized";
import { JWTContents, getBarData } from "./LoginHeaders";

export default function Home() {
  const headersList = headers();
  const jwt = headersList.get("X-Authentik-Jwt");

  // const jwt =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2F1dGguYXBwcy5oc2tyay5wbC9hcHBsaWNhdGlvbi9vL3dob2FtaS8iLCJzdWIiOiJmNzljZTY4MzhjZjIxMmZjODA0NmFmNTUzZmExOTM2NjkzNzMwYWY3YzFiZTUyODBiZTU4ZWY3ODdiNmQ2Y2RiIiwiYXVkIjoiZlVrWmRYSWdWTjlwbmQ5NnBwMHRQZkNQSU1ZUnBJM1lhUERaTzdVRCIsImV4cCI6MTcwMTY0ODI5MiwiaWF0IjoxNjk5MDU2MjkyLCJhdXRoX3RpbWUiOjE2OTkwNTYyODIsImFjciI6ImdvYXV0aGVudGlrLmlvL3Byb3ZpZGVycy9vYXV0aDIvZGVmYXVsdCIsImF0X2hhc2giOiJKb1dfSkhTUEs2Z25vbHBtYUYxUXFnIiwiYWtfcHJveHkiOnsidXNlcl9hdHRyaWJ1dGVzIjp7ImxkYXBfdW5pcSI6ImI2OTg0MDdjLWYzYzYtMTFlNy04MWIwLTAwMGMyOWJiODNhNyIsImRpc3Rpbmd1aXNoZWROYW1lIjoidWlkPXdpa3Rvcixjbj11c2Vycyxjbj1hY2NvdW50cyxkYz1hdCxkYz1oc2tyayxkYz1wbCIsImNhcmRJZCI6IjNBMDY2NSIsIm1lbWJlcnNoaXBFeHBpcmF0aW9uIjoiMTk1ODYiLCJtZW1iZXJzaGlwRXhwaXJhdGlvbkRhdGUiOiIyMDIzLTExLTE4IiwibWVtYmVyc2hpcEV4cGlyYXRpb25UaW1lc3RhbXAiOjE3MDAyNjU2MDAuMH0sImlzX3N1cGVydXNlciI6dHJ1ZX0sImVtYWlsIjoid2lrdG9yQGhhY2tlcnNwYWNlLWtyay5wbCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiV2lrdG9yIFByenlieWxza2kiLCJnaXZlbl9uYW1lIjoiV2lrdG9yIFByenlieWxza2kiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ3aWt0b3IiLCJuaWNrbmFtZSI6Indpa3RvciIsImdyb3VwcyI6WyJhZG1pbnMiLCJpcGF1c2VycyIsInphcnphZCIsIm5vYyIsInN0YWZmIiwibWVtYmVycyIsIndpa2ktYWRtaW5pc3RyYXRvcnMiXX0._xo0-muhfxMudJvZOyaGti03jUbC8oCWLTBDDrfnrgU";

  if (!jwt) {
    return <NotAuthorized />;
  }

  const { groups, nickname, expiration } = getBarData(jwt);

  return <Whoami groups={groups} nickname={nickname} expiration={expiration} />;
}
