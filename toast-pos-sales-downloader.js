// Toast POS Sales Data Download Script using Browserbase MCP

// This script logs into Toast POS and downloads sales data with customizable report types and date ranges
// Note: You'll need to replace the placeholder credentials with your actual Toast login info

// Configuration Object - Customize these settings
const config = {
  // Toast credentials
  credentials: {
    email: "your_email@example.com",
    password: "your_password"
  },
  
  // Reports to download - set to true to enable download
  reports: {
    salesSummary: true,
    menuPerformance: true,
    laborSummary: false,
    guestCounts: true,
    paymentSummary: false,
    discountSummary: false,
    orderDestinations: false
  },
  
  // Date range options
  dateRange: {
    // Preset options - set only one to true, or set custom dates below
    today: false,
    yesterday: false,
    currentWeek: false,
    previousWeek: true,
    currentMonth: false,
    previousMonth: false,
    last7Days: false,
    last30Days: false,
    
    // Custom date range - used if all preset options are false
    custom: {
      startDate: "01/01/2025",  // MM/DD/YYYY format
      endDate: "01/31/2025"     // MM/DD/YYYY format
    }
  },
  
  // Export format - 'csv', 'excel', or 'pdf'
  exportFormat: "csv",
  
  // Wait times (in milliseconds) - increase these values on slower connections
  waitTimes: {
    afterPageLoad: 3000,
    afterLogin: 5000,
    afterMenuNav: 3000,
    afterReportGeneration: 5000
  }
};

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
    await new Promise(resolve => setTimeout(resolve, config.waitTimes.afterPageLoad));
    
    // Step 3: Enter login credentials
    await browserbase_fill({ selector: "#email-input", value: config.credentials.email });
    await browserbase_fill({ selector: "#password-input", value: config.credentials.password });
    
    // Step 4: Click login button
    await browserbase_click({ selector: ".login-button" });
    console.log("Logged in to Toast POS");
    
    // Wait for dashboard to load
    await new Promise(resolve => setTimeout(resolve, config.waitTimes.afterLogin));
    
    // Step 5: Navigate to reporting section
    await browserbase_click({ selector: "a[href*='reporting']" });
    console.log("Navigated to reporting section");
    
    // Wait for reporting page to load
    await new Promise(resolve => setTimeout(resolve, config.waitTimes.afterMenuNav));
    
    // Process each enabled report
    const enabledReports = Object.entries(config.reports)
      .filter(([_, enabled]) => enabled)
      .map(([reportType, _]) => reportType);
      
    console.log(`Preparing to download ${enabledReports.length} reports: ${enabledReports.join(', ')}`);
    
    for (const reportType of enabledReports) {
      await downloadReport(reportType);
    }
    
    // Log out (optional)
    await browserbase_click({ selector: ".user-menu-dropdown" });
    await browserbase_click({ selector: "a.logout-btn" });
    console.log("Logged out successfully");
    
    return `Successfully downloaded ${enabledReports.length} reports from Toast POS.`;
  } catch (error) {
    console.error("Error during Toast POS data download:", error);
    return "Error downloading sales data. Please check the error message.";
  }
}

// Helper function to download a specific report
async function downloadReport(reportType) {
  try {
    console.log(`Starting download for report: ${reportType}`);
    
    // Navigate to the specific report page based on report type
    const reportSelector = getReportSelector(reportType);
    await browserbase_click({ selector: reportSelector });
    console.log(`Navigated to ${reportType} report`);
    
    // Wait for report page to load
    await new Promise(resolve => setTimeout(resolve, config.waitTimes.afterMenuNav));
    
    // Set date range
    await setDateRange();
    console.log(`Set date range for ${reportType} report`);
    
    // Click "Run Report" button
    await browserbase_click({ selector: "button.run-report-btn" });
    console.log(`Generated ${reportType} report`);
    
    // Wait for report to load
    await new Promise(resolve => setTimeout(resolve, config.waitTimes.afterReportGeneration));
    
    // Download the report
    await browserbase_click({ selector: "button.download-btn" });
    
    // Select format
    await browserbase_click({ selector: `option[value='${config.exportFormat}']` });
    
    // Confirm download
    await browserbase_click({ selector: "button.confirm-download-btn" });
    console.log(`Downloaded ${reportType} report as ${config.exportFormat}`);
    
    // Return to reports main page to prepare for next report
    await browserbase_click({ selector: "a.back-to-reports" });
    await new Promise(resolve => setTimeout(resolve, config.waitTimes.afterMenuNav));
    
    return true;
  } catch (error) {
    console.error(`Error downloading ${reportType} report:`, error);
    return false;
  }
}

// Helper function to get the selector for a specific report type
function getReportSelector(reportType) {
  const reportSelectors = {
    salesSummary: "a[href*='sales-summary']",
    menuPerformance: "a[href*='menu-performance']",
    laborSummary: "a[href*='labor-summary']",
    guestCounts: "a[href*='guest-counts']",
    paymentSummary: "a[href*='payment-summary']",
    discountSummary: "a[href*='discount-summary']",
    orderDestinations: "a[href*='order-destinations']"
  };
  
  return reportSelectors[reportType] || reportSelectors.salesSummary;
}

// Helper function to set the date range based on config
async function setDateRange() {
  // Click on date selector
  await browserbase_click({ selector: ".date-range-selector" });
  
  // Determine which date option to select
  if (config.dateRange.today) {
    await browserbase_click({ selector: "option[value='today']" });
  } else if (config.dateRange.yesterday) {
    await browserbase_click({ selector: "option[value='yesterday']" });
  } else if (config.dateRange.currentWeek) {
    await browserbase_click({ selector: "option[value='current-week']" });
  } else if (config.dateRange.previousWeek) {
    await browserbase_click({ selector: "option[value='previous-week']" });
  } else if (config.dateRange.currentMonth) {
    await browserbase_click({ selector: "option[value='current-month']" });
  } else if (config.dateRange.previousMonth) {
    await browserbase_click({ selector: "option[value='previous-month']" });
  } else if (config.dateRange.last7Days) {
    await browserbase_click({ selector: "option[value='last7days']" });
  } else if (config.dateRange.last30Days) {
    await browserbase_click({ selector: "option[value='last30days']" });
  } else {
    // Custom date range
    await browserbase_click({ selector: "option[value='custom']" });
    
    // Set start date
    await browserbase_fill({ selector: "input.start-date", value: config.dateRange.custom.startDate });
    
    // Set end date
    await browserbase_fill({ selector: "input.end-date", value: config.dateRange.custom.endDate });
    
    // Apply custom range
    await browserbase_click({ selector: "button.apply-custom-range" });
  }
}

// Execute the function
downloadToastSalesData();