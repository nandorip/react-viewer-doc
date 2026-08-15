# Security Policy

## Supported versions

The latest 0.4.x release on npm (`react-viewer-doc`) is the supported line.

`fileUri` is limited to `http:`, `https:`, and `blob:` (relative URLs resolve against the host origin). `data:` input is limited to PDF and supported image MIME types.

Images and SVG opened in a new tab are shown as `<img>` inside a generated HTML document, so inline SVG scripts do not run. PDFs still open as the original file. New tabs clear `window.opener`.

## Reporting a Vulnerability

Please report security issues privately by opening a GitHub security advisory or contacting the maintainer listed in `package.json`.

Include:

- Affected versions
- Reproduction steps
- Impact
- Suggested fix, if known

Do not disclose security issues publicly until a fix is available.
