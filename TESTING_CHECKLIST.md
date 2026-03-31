# Twilio Dashboard Testing Checklist

## Overview
This checklist will help you verify that the dashboard correctly displays ALL Twilio numbers with their call and message counts, including numbers with zero activity.

---

## Step 1: Start the Development Server

1. Open a terminal in the project directory: `c:/Users/hash/practice/twilio-dashboard`
2. Run the following command:
   ```bash
   bun dev
   ```
3. Wait for the server to start. You should see output like:
   ```
   ▲ Next.js 16.2.1
   - Local:        http://localhost:3000
   - Network:      http://192.168.x.x:3000
   ✓ Ready in X.Xs
   ```
4. Keep this terminal window open (the server needs to stay running)

---

## Step 2: Verify the Twilio Numbers API Works

1. Open your web browser and navigate to: `http://localhost:3000`
2. Open the **Developer Tools** (F12 or right-click → Inspect)
3. Go to the **Network** tab
4. Refresh the page (F5 or Ctrl+R)
5. Look for a request to `/api/twilio/numbers`
6. Click on that request and check the **Response** tab
7. **Verify:**
   - The response is a JSON array
   - Each item in the array has a `phoneNumber` property
   - The phone numbers are in E.164 format (e.g., "+1234567890")
   - There are no errors in the response

**Expected Response Format:**
```json
[
  {
    "phoneNumber": "+1234567890",
    "friendlyName": "My Twilio Number"
  },
  ...
]
```

---

## Step 3: Verify the Dashboard Displays ALL Twilio Numbers

1. Look at the main dashboard page
2. **Verify:**
   - You can see multiple rows, each representing a Twilio phone number
   - Each row shows:
     - A phone number (formatted nicely, e.g., "+1 (234) 567-8900")
     - A call count (e.g., "15 Calls")
     - A message count (e.g., "42 Messages")
   - Numbers with activity are displayed at the top
   - Numbers with **zero activity** are displayed at the bottom
   - **ALL** your Twilio numbers from your account are shown

**What to look for:**
- If you have 3 Twilio numbers, you should see 3 rows
- If 2 numbers have activity and 1 has none, the inactive one should be at the bottom
- Each number should be clearly visible and readable

---

## Step 4: Verify the Counts are Accurate

1. For each Twilio number displayed, verify the counts:
   - **Numbers with activity:** Check that the call and message counts seem reasonable
   - **Numbers with zero activity:** Should show "0 Calls" and "0 Messages"
2. **Verify sorting:**
   - Numbers are sorted by total activity (calls + messages) in descending order
   - The most active number is at the top
   - Numbers with zero activity are at the very bottom

**Example of expected display:**
```
+1 (555) 123-4567    25 Calls    150 Messages
+1 (555) 987-6543    10 Calls     45 Messages
+1 (555) 000-0000     0 Calls      0 Messages
```

---

## Step 5: Verify Expandable Rows Work

### For Numbers WITH Activity:
1. Click on any row that shows activity (has calls or messages > 0)
2. The row should expand to show detailed log entries
3. **Verify:**
   - Individual log entries are displayed
   - Each log entry shows:
     - Date/time of the call or message
     - **From** field (external phone number that called/sent)
     - **To** field (your Twilio number that received)
     - Direction (should be "inbound")
     - Status (completed, failed, etc.)
   - Calls and messages are grouped separately within the expanded section
4. Click the row again to collapse it

### For Numbers WITH ZERO Activity:
1. Click on a row that shows "0 Calls" and "0 Messages"
2. **Verify:**
   - Either the row does not expand
   - OR it expands but shows an empty state (no logs)
   - No errors should occur

---

## Step 6: Test Date Range Filtering

1. Look for the date range filter at the top of the dashboard
2. **Test 1: Narrow the date range**
   - Set "From" to a recent date (e.g., 7 days ago)
   - Set "To" to today
   - Click "Apply" or wait for auto-refresh
   - **Verify:**
     - The counts update based on the filtered data
     - ALL Twilio numbers are still displayed
     - Some numbers may now show "0 Calls" and "0 Messages" if they had no activity in that range
     - Numbers are still sorted by activity (descending)

3. **Test 2: Expand the date range**
   - Set "From" to a past date (e.g., 30 days ago)
   - Set "To" to today
   - **Verify:**
     - Counts increase (showing more activity)
     - Numbers that had 0 counts in the narrow range may now show activity
     - Sorting updates based on new counts

4. **Test 3: Reset the filter**
   - Clear or reset the date range
   - **Verify:**
     - All counts return to their original values
     - All numbers are displayed correctly

---

## Step 7: Check for Errors

### Browser Console:
1. Keep the Developer Tools open (F12)
2. Go to the **Console** tab
3. **Verify:**
   - No red error messages
   - No warnings about missing data or failed API calls
   - If there are any errors, note them down

### Terminal Output:
1. Look at the terminal where `bun dev` is running
2. **Verify:**
   - No error messages in the terminal
   - Server continues running without crashes
   - API requests appear in the terminal logs (e.g., GET /api/twilio/numbers)

### Network Tab:
1. Go back to the **Network** tab in Developer Tools
2. **Verify:**
   - All API requests return status code 200 (OK)
   - No failed requests (red status codes)
   - Response times are reasonable (< 5 seconds)

---

## Step 8: Test Edge Cases (Optional but Recommended)

1. **Refresh the page multiple times**
   - Verify data loads consistently
   - No flickering or layout shifts

2. **Resize the browser window**
   - Verify the layout is responsive
   - All information remains readable on smaller screens

3. **Click multiple expandable rows**
   - Verify multiple rows can be expanded simultaneously
   - Verify collapsing one doesn't affect others

4. **Wait for auto-refresh (if implemented)**
   - If the dashboard auto-refreshes, verify it works smoothly
   - Check that data updates without page reload

---

## Step 9: Report Your Findings

### If Everything Works:
✅ Dashboard displays ALL Twilio numbers (including those with zero activity)
✅ Each number shows accurate call and message counts
✅ Numbers are sorted by total activity (descending)
✅ Expandable rows work correctly for numbers with activity
✅ Date range filtering works correctly
✅ No errors in browser console or terminal

### If Issues Found:
Please provide details about:
1. Which step failed
2. What you expected to see vs. what you actually saw
3. Any error messages from the browser console or terminal
4. Screenshots (if possible)

---

## Quick Reference: API Endpoints

The dashboard uses these API endpoints:

- `GET /api/twilio/numbers` - Fetches all Twilio phone numbers
- `GET /api/twilio/calls` - Fetches call logs (with date filtering)
- `GET /api/twilio/messages` - Fetches message logs (with date filtering)

You can test these directly in your browser or with a tool like Postman:

```
http://localhost:3000/api/twilio/numbers
http://localhost:3000/api/twilio/calls?startDate=2024-01-01&endDate=2024-12-31
http://localhost:3000/api/twilio/messages?startDate=2024-01-01&endDate=2024-12-31
```

---

## Troubleshooting Common Issues

### Issue: Dashboard shows "No Twilio numbers found"
**Solution:**
- Check your `.env.local` file has valid Twilio credentials
- Verify your Twilio account has phone numbers
- Check the browser console for API errors

### Issue: Counts are all zero
**Solution:**
- Check if you have any calls/messages in your Twilio account
- Verify the date range includes your activity
- Check the API responses in the Network tab

### Issue: Expandable rows don't work
**Solution:**
- Refresh the page
- Check browser console for JavaScript errors
- Verify you're clicking on a row with activity

### Issue: Date range filtering doesn't work
**Solution:**
- Check the date format is correct (YYYY-MM-DD)
- Verify the "From" date is before the "To" date
- Check the Network tab for API requests with correct parameters

---

## Completion

Once you've completed all the verification steps, please report back with:
1. ✅ or ❌ for each major verification step
2. Any issues you encountered
3. Any suggestions for improvements

Good luck with the testing! 🚀
