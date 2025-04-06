// Toast POS Sales Data Download Script using Browserbase MCP

// This script logs into Toast POS and downloads weekly sales data
// Note: You'll need to replace the placeholder credentials with your actual Toast login info

// Step 1: Create a Browserbase session
async function downloadToastSalesData() {
  try {
    // Create a new browser session
    await browserbase_create_session();
    console.log("Browser session created successfully");
    
    // Step 2: Navigate to Toast login page
    await browserbase_navigate({ url: "https://web.toasttab.com/login" });
    console.log("Navigated to Toast login page");
    
    // Wait for page to load fully
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Step 3: Enter login credentials
    // Replace 'your_email@example.com' and 'your_password' with your actual credentials
    await browserbase_fill({ selector: "#email-input", value: "your_email@example.com" });
    await browserbase_fill({ selector: "#password-input", value: "your_password" });
    
    // Step 4: Click login button
    await browserbase_click({ selector: ".login-button" });
    console.log("Logged in to Toast POS");
    
    // Wait for dashboard to load
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Step 5: Navigate to reporting section
    await browserbase_click({ selector: "a[href*='reporting']" });
    console.log("Navigated to reporting section");
    
    // Wait for reporting page to load
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Step 6: Go to sales reports
    await browserbase_click({ selector: "a[href*='sales']" });
    console.log("Navigated to sales reports");
    
    // Wait for sales reports to load
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Step 7: Set date range for past week
    // First click on date selector
    await browserbase_click({ selector: ".date-range-selector" });
    
    // Select "Last 7 days" option
    await browserbase_click({ selector: "option[value='last7days']" });
    console.log("Selected date range: Past week");
    
    // Step 8: Click "Run Report" button
    await browserbase_click({ selector: "button.run-report-btn" });
    console.log("Generated sales report");
    
    // Wait for report to load
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Step 9: Download the report
    await browserbase_click({ selector: "button.download-btn" });
    
    // Select CSV format if needed
    await browserbase_click({ selector: "option[value='csv']" });
    
    // Confirm download
    await browserbase_click({ selector: "button.confirm-download-btn" });
    console.log("Downloaded sales report as CSV");
    
    // Step 10: Log out (optional)
    await browserbase_click({ selector: ".user-menu-dropdown" });
    await browserbase_click({ selector: "a.logout-btn" });
    console.log("Logged out successfully");
    
    return "Sales data for the past week has been downloaded successfully.";
  } catch (error) {
    console.error("Error during Toast POS data download:", error);
    return "Error downloading sales data. Please check the error message.";
  }
}

// Execute the function
downloadToastSalesData();