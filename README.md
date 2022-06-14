# VincallApp

This project is for the development of the **Comm100** app. We can extend the **Agent Console** and **Control Panel** through the **Comm100** app. Pages in `src/pages` are developed using 'React'. Our UI component libraries are `@comm100/framework` and `@comm100/styledComponents` which are based on `Material UI`.
Here is a brief description of the project directory:

```bash
src
  ├─assets
  │  ├─manifest.json  # App manifest.json file.
  │  ├─getAccessToken.html # The page visited when the login was successful.
  │  └─vincallCallback.html # The page visited when logining to Vincall successfully.
  ├─components # Directory for React UI component.
  ├─CSS
  ├─domains
  │  └─bo # Typescript type for api business object.
  ├─pages
  │  ├─integration # The app setting page.
  │  └─phone # Agent console top bar widget page.
  └─styledComponents # Styled React UI component.
```

## Initializing

Run `npm install` to install the dependencies.

## Modifying configuration

Config the domain in `src/config.ts`:

```javascript
export const apiDomain = "{Vincall_API_Domain}";

export const defaultSiteId = "10000";

export const oauthDomain = "{Vincall_OAuth_Domain}";

export const vincallDomain = "{Vincall_Domain}";
```

Config the API proxy rule for develop server in `proxyRules.js`:

```javascript
const targetDomain = "{Vincall_API_Domain}";
```

## Start the project

Run `npm run serve` to start the develop server.
