# Toast POS Automation with Browserbase MCP

This repository contains automation scripts for Toast POS specifically designed to work with Browserbase MCP (Multi Context Protocol). Browserbase MCP provides a protocol for automated browser control, making it ideal for web automation tasks like those needed for Toast POS.

## Scripts

### Toast POS Sales Data Downloader

The `toast-pos-sales-downloader.js` script automates the process of logging into your Toast POS account and downloading sales data for the past week using Browserbase MCP functions. This can be particularly useful for regular reporting and data analysis tasks.

#### Browserbase MCP Functions Used

This script uses the following Browserbase functions:
- `browserbase_create_session()` - Creates a new browser session
- `browserbase_navigate()` - Navigates to a URL
- `browserbase_fill()` - Fills in form fields
- `browserbase_click()` - Clicks on elements on the page

#### Prerequisites

- Browserbase MCP server set up and running
- Valid Toast POS account credentials

#### How to Use

1. Clone this repository to your local machine
2. Update the script with your actual Toast POS credentials
3. Run the script through your Browserbase MCP server

```javascript
// Example credentials update (replace with your actual credentials)
await browserbase_fill({ selector: "#email-input", value: "your_actual_email@example.com" });
await browserbase_fill({ selector: "#password-input", value: "your_actual_password" });
```

#### Important Notes

- Make sure to secure your credentials and avoid committing them directly to the repository
- The selectors in the script may need adjustment based on changes to the Toast POS interface
- The script includes appropriate wait times between actions, but these may need adjustment depending on your network speed

## Setting Up with Browserbase MCP

To run these scripts with Browserbase MCP:

1. Set up the Browserbase MCP server by following the instructions at [browserbase/mcp-server-browserbase](https://github.com/browserbase/mcp-server-browserbase)
2. Add these scripts to your MCP server environment
3. Configure the server to run the scripts as needed

Detailed setup instructions can be found in the [browserbase-mcp-setup.md](browserbase-mcp-setup.md) file.

## Contributing

Feel free to contribute to this repository by submitting pull requests or opening issues for any bugs or feature requests.

## License

MIT License