import { formatDistance } from "date-fns";
import { jwtDecode } from "jwt-decode";

export type AKProxy = {
  user_attributes: {
    ldap_uniq: string;
    distinguishedName: string;
    cardId: string;
    membershipExpiration: string;
    membershipExpirationDate: string;
    membershipExpirationTimestamp: number;
  };
  is_superuser: boolean;
};

export type JWTContents = {
  email: string;
  name: string;
  given_name: string;
  preferred_username: string;
  nickname: string;
  groups: string[];
  ak_proxy: AKProxy;
};

export function getBarData(jwt: string) {
  const parsedJwt = jwtDecode<JWTContents>(jwt);

  const { groups, preferred_username, ak_proxy } = parsedJwt;
  const expirationTimestamp =
    ak_proxy.user_attributes.membershipExpirationTimestamp * 1000;

  const relative = formatDistance(new Date(expirationTimestamp), Date.now(), {
    addSuffix: true,
  });
 
  const dateOfExpiry = format(new Date(expirationTimestamp), "MM/dd/yyyy");

  return {
    groups,
    nickname: preferred_username,
    expiration: relative,
    expirationDate: dateOfExpiry,
  };
}
