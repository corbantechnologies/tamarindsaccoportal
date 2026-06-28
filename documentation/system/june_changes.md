# System Changes (June Updates)

This document tracks the UI/UX and functional improvements made to the SACCO Admin Portal. These changes serve as a baseline for similar implementations across other SACCO instances.

## 1. Global UI & Typography Updates
- Refined the primary typography across the Admin portal, changing table headers, card titles, and key text elements from `font-bold` to `font-semibold` for a cleaner, modern aesthetic. 
- **Impacted Pages**: Loans Portfolio, Savings Accounts, Fee Payments, and Loan Applications.

## 2. Audit Logs Enhancement
- **Files**: `sacco-admin/logs/page.jsx`, `superuser/logs/page.jsx`
- **Changes**: 
  - Removed the `Description` column from the main data table to prevent excessive horizontal stretching.
  - Implemented color-coded badging for the `Action` column based on HTTP status/action type (e.g., Green for Success/201, Red for Error/500).
  - Improved the "View Details" modal to prominently display the `Description` and action status at the top of the modal.

## 3. Loan Applications Table
- **Files**: `sacco-admin/loan-applications/page.jsx`
- **Changes**:
  - Removed the raw `Reference` column to declutter the desktop and mobile tables.
  - Renamed the "Admin Created" column to **"Created By"**.
  - Implemented visual badges for the "Created By" column to instantly distinguish if an application was initiated by an **Admin** (Blue Badge) or a **Member** (Gray Badge).
  - Optimized the mobile card layout so applicant names and products take center stage.

## 4. Searchable Comboboxes for Transaction Forms
- **Files**: `forms/savingsdeposits/CreateDepositAdmin.jsx`, `forms/savingsdeposits/BulkSavingDepositCreate.jsx`, `forms/feepayments/BulkFeePaymentCreate.jsx`
- **Changes**:
  - Upgraded native HTML dropdowns (`<select>`) to fully searchable Comboboxes (using `shadcn/ui` Popover + Command) for selecting Member Accounts.
  - **Search Capabilities**: Users can now search by Member Name, Account Number, and Fee/Account Type.
  - **UI/UX Fixes**: Moved the selection Checkmark icon to the right side of the dropdown items. This fixes a known UI bug where invisible checkmarks created an awkward "disturbing space" on the left side of unselected items.
  - Restored the display of the Account Type (e.g., Holiday Savings) and Outstanding Balances within both the trigger button and the dropdown list.

## 5. Members Joined Report
- **Files**: `sacco-admin/reports/page.jsx`, `components/reports/MembersJoinedReport.jsx`
- **Changes**:
  - Added a new **"Members"** tab to the Financial Reports section.
  - Created the `MembersJoinedReport` component which tracks and lists members who joined within a specific timeframe.
  - Implemented Month and Year dropdown filters.
  - Displayed member details in the report table, including Member No, Name, Email, Employer, Join Date, and Approval Status.