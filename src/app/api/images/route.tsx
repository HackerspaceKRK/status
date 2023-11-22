import { jwtDecode } from "jwt-decode";
import { ImageResponse } from "next/og";
import { formatDistance } from "date-fns";

import { readFileSync } from "fs";
import { join } from "path";
import { WhoamiProps } from "@/components/whoami";
import getConfig from "next/config";
import { IconUsercircle } from "@/components/icons/IconUserCircle";
import { IconClock } from "@/components/icons/IconClock";
import { JWTContents, getBarData } from "@/app/LoginHeaders";
import { headers } from "next/headers";

function WhoamiImage({
  nickname,
  expiration,
  groups,
  theme,
}: WhoamiProps & {
  theme: "dark" | "light";
}) {
  const styles = {
    dark: {
      bg: "rgb(31, 41, 55)",
      text: "#fff",
      textLabel: "rgb(209, 213, 219)",
    },
    light: {
      bg: "rgb(255, 255, 255)",
      badgeBorder: "rgb(229, 231, 235)",
      text: "#121212",
      textLabel: "rgb(31, 41, 55)",
    },
  };

  const currentTheme = styles[theme];

  return (
    <div
      style={{
        fontFamily: "Inter",
        display: "flex",
        flexDirection: "column",
        backgroundColor: currentTheme.bg,
        padding: "16px",
        color: currentTheme.text,
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        maxWidth: "800px",
        margin: "auto",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <h1
        style={{
          marginTop: "-4px",
        }}
      >
        Current user data:
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontSize: "16px",
          gap: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            paddingBottom: "8px",
            fontSize: "20px",
          }}
        >
          <IconUsercircle className="h-5 w-5 text-gray-500 dark:text-gray-400" />

          <span
            style={{
              fontFamily: "Inter",
              fontWeight: "400",
              display: "block",
              color: currentTheme.textLabel,
            }}
          >
            Preferred Name:{" "}
          </span>
          <span
            style={{
              display: "block",
              fontWeight: "bold",
            }}
          >
            {nickname}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "20px",
          }}
        >
          <IconClock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <span
            style={{
              display: "block",
              color: currentTheme.textLabel,
            }}
          >
            Access Token Expiry:{" "}
          </span>
          <span
            style={{
              display: "block",
              fontWeight: "bold",
            }}
          >
            {expiration}
          </span>
        </div>
        {groups.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              fontSize: "16px",
            }}
          >
            <span
              style={{
                display: "block",
                fontWeight: "bold",
                fontSize: "16px",
                paddingBottom: "8px",
              }}
            >
              Groups:
            </span>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {[...groups].map((group, index) => (
                <span
                  key={group}
                  style={{
                    display: "block",
                    padding: "4px 8px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: currentTheme.text,
                    border: "1px solid rgb(229, 231, 235)",
                  }}
                >
                  {group}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const publicPath = join(process.cwd(), "./public", "fonts", "inter");
const interRegular = readFileSync(join(publicPath, "Inter-Regular.ttf"));
const interBold = readFileSync(join(publicPath, "Inter-Bold.ttf"));

export const dynamic = "force-dynamic"; // defaults to force-static
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const theme =
    searchParams.get("theme")?.toLowerCase() === "dark" ? "dark" : "light";
  const headersList = headers();
  const jwt = headersList.get("X-Authentik-Jwt");

  if (!jwt) {
    return new Response(
      JSON.stringify({
        status: 401,
        message: "Unauthorized",
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const { groups, nickname, expiration } = getBarData(jwt);

  return new ImageResponse(
    (
      <WhoamiImage
        groups={groups}
        nickname={nickname}
        expiration={expiration}
        theme={theme}
      />
    ),
    {
      fonts: [
        {
          name: "Inter",
          weight: 400,
          data: interRegular,
        },
        {
          name: "Inter",
          weight: 800,
          data: interBold,
        },
      ],
      width: 400,
      height: 250,
    }
  );
}
