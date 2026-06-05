# Installation

## Prerequisites

- **Node.js** >= 22.12.0

Verify your Node.js version:

```bash
node -v
```

## Global Install

Install NCMGET globally to use the `ncmget` command anywhere:

```bash
npm install -g ncmget
```

## Verify Installation

After installation, verify that NCMGET is available:

```bash
ncmget -v
```

This should output the installed version number.

## Alternative: npx

If you prefer not to install globally, you can use `npx` to run NCMGET without a permanent installation:

```bash
npx ncmget search "淘气的Roy"
```

> **Note:** `npx` downloads the package on each first run, which may be slower than a global install.

## Next Steps

- [Introduction](./introduction) — Command overview
- [Commands](/commands/serve) — Detailed command documentation
