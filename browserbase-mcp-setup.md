# Setting Up Toast POS Automation with Browserbase MCP

This guide explains how to set up and run the Toast POS automation scripts with the Browserbase MCP (Multi Context Protocol) server.

## Prerequisites

1. Node.js installed on your system
2. Git installed on your system
3. A clone of the Browserbase MCP server repository
4. Valid Toast POS account credentials

## Installation Steps

### 1. Set Up Browserbase MCP Server

If you already have the Browserbase MCP server set up, you can skip to the next section. Otherwise:

1. Clone the Browserbase MCP server repository:
   ```bash
   git clone https://github.com/browserbase/mcp-server-browserbase.git
   cd mcp-server-browserbase
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the server according to the repository's documentation.

### 2. Add Toast POS Automation Scripts

1. Clone this repository or download the script files:
   ```bash
   git clone https://github.com/lucasbarber78/toast-pos-automation.git
   ```

2. Copy the `toast-pos-sales-downloader.js` file to your Browserbase MCP server's scripts directory (the exact location may vary based on the server's structure).

### 3. Configure the Script

1. Open the `toast-pos-sales-downloader.js` file in a text editor.

2. Update the Toast POS login credentials with your actual credentials:
   ```javascript
   // Replace with your actual credentials
   await browserbase_fill({ selector: "#email-input", value: "your_actual_email@example.com" });
   await browserbase_fill({ selector: "#password-input", value: "your_actual_password" });
   ```

3. Save the file.

## Running the Script

### Using the Browserbase MCP Server

1. Start the Browserbase MCP server:
   ```bash
   npm start
   ```

2. Connect to the server using your preferred MCP client.

3. Run the Toast POS sales data download script.

## Automating Script Execution

To automate the script execution on a regular schedule, you can use:

### 1. Task Scheduler (Windows) or Cron Jobs (Linux/macOS)

Set up a recurring task to execute the script at your desired frequency (e.g., daily, weekly).

### 2. Node.js with a Scheduling Library

You can create a simple Node.js script using a library like `node-schedule` to run the automation script on a schedule:

```javascript
const schedule = require('node-schedule');
const { execFile } = require('child_process');

// Schedule the script to run every Monday at 9 AM
schedule.scheduleJob('0 9 * * 1', function(){
  console.log('Running Toast POS sales data download...');
  
  // Path to your MCP client executor that will run the script
  execFile('path/to/your/mcp-client', ['toast-pos-sales-downloader.js'], (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
});
```

## Troubleshooting

If you encounter issues with the script:

1. **Selector Errors**: The CSS selectors in the script are based on the current Toast POS web interface. If the interface changes, you may need to update the selectors.

2. **Timing Issues**: If operations fail because pages don't load fast enough, try increasing the wait times in the script.

3. **Authentication Issues**: Ensure your Toast POS credentials are correct and that your account has the necessary permissions.

4. **Browserbase MCP Issues**: Refer to the Browserbase MCP server documentation for troubleshooting server-specific issues.

## Security Considerations

- Never commit files containing actual credentials to a public repository
- Consider using environment variables or a secure configuration file for storing credentials
- Implement proper access controls for any files containing sensitive information