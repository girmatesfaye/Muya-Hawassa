## Stitch MCP setup

This workspace config expects a Windows environment variable named `STITCH_API_KEY`.

Set it in PowerShell for your current session:

```powershell
$env:STITCH_API_KEY="your-google-api-key"
```

Set it persistently on Windows:

```powershell
[System.Environment]::SetEnvironmentVariable("STITCH_API_KEY", "your-google-api-key", "User")
```

After setting or changing the key, fully reload VS Code so the editor picks up the new environment.

The Stitch MCP server is configured in `.vscode/mcp.json` and uses:

- URL: `https://stitch.googleapis.com/mcp`
- Header: `X-Goog-Api-Key: ${env:STITCH_API_KEY}`

## Verify in VS Code

1. Reload the VS Code window after updating the environment variable.
2. Open your MCP or agent tooling UI in VS Code and confirm `stitch` appears as an available server.
3. Run a simple Stitch MCP action such as listing resources or tools.

If `stitch` does not appear, check:

1. VS Code inherited the `STITCH_API_KEY` environment variable.
2. The installed MCP client supports the `.vscode/mcp.json` schema used here.
3. The Google API key is valid and allowed to access the Stitch MCP endpoint.
