# PWA Task Manager - Manual Testing Guide

**Version**: 1.0.0
**Last Updated**: November 18, 2025
**Testing Time**: ~30-45 minutes

---

## Table of Contents

1. [Setup & Prerequisites](#setup--prerequisites)
2. [Feature Overview](#feature-overview)
3. [Testing Checklist](#testing-checklist)
4. [Use Case Scenarios](#use-case-scenarios)
5. [Troubleshooting](#troubleshooting)

---

## Setup & Prerequisites

### Requirements
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+)
- Internet connection (initially)
- HTTPS environment (required for PWA features)

### Installation Steps

1. **Start the Development Server**
   ```bash
   npm install
   npm run dev
   ```
   The app will open at `http://localhost:5173`

2. **Build for Production Testing** (Optional)
   ```bash
   npm run build
   npm run preview
   ```
   Preview will open at `http://localhost:4173`

3. **Deploy to HTTPS** (For full PWA testing)
   - Deploy to Vercel, Netlify, or similar
   - PWA features like installation and notifications require HTTPS

---

## Feature Overview

### Core Features

| Feature | Description | How to Access |
|---------|-------------|---------------|
| **Task Management** | Create, edit, complete, delete tasks | Main interface |
| **Offline Mode** | Full functionality without internet | Go offline in DevTools |
| **Install App** | Add to home screen | Browser install prompt |
| **Push Notifications** | Browser notifications | Permission prompt |
| **Background Sync** | Sync tasks when back online | Automatic |
| **Share Tasks** | Share via native share sheet | Share button on tasks |
| **Service Worker** | Cache assets and data | Automatic |
| **Update Notifications** | Alert when new version available | Automatic |

---

## Testing Checklist

### 1. Basic Functionality Testing

#### 1.1 Create Tasks ✓

**Steps:**
1. Open the app
2. Locate the "Add New Task" form
3. Fill in task title: "Buy groceries"
4. Fill in description: "Milk, eggs, bread, cheese"
5. Click "Add Task" button

**Expected Result:**
- ✓ Task appears immediately in "Active Tasks" section
- ✓ Task shows today's date
- ✓ Task shows "Pending sync" indicator (orange cloud icon)
- ✓ Form clears after submission

**Pass/Fail:** ___________

---

#### 1.2 Complete Tasks ✓

**Steps:**
1. Click the circular checkbox next to a task
2. Observe the changes

**Expected Result:**
- ✓ Task moves to "Completed Tasks" section
- ✓ Task title has strikethrough styling
- ✓ Task appears slightly faded (opacity reduced)
- ✓ Checkbox shows green checkmark

**Pass/Fail:** ___________

---

#### 1.3 Delete Tasks ✓

**Steps:**
1. Click the red trash icon on any task
2. Confirm deletion in the dialog

**Expected Result:**
- ✓ Confirmation dialog appears
- ✓ Task is removed from the list
- ✓ Task disappears immediately

**Pass/Fail:** ___________

---

#### 1.4 Share Tasks ✓

**Steps:**
1. Click the blue share icon on any task
2. On mobile: Choose share target
3. On desktop without share API: Check clipboard

**Expected Result:**
- ✓ **Mobile**: Native share sheet opens
- ✓ **Desktop (with share)**: Share dialog appears
- ✓ **Desktop (no share)**: Alert "Task copied to clipboard"
- ✓ Shared content includes task title and description

**Pass/Fail:** ___________

---

### 2. Offline Functionality Testing

#### 2.1 Initial Offline Test ✓

**Steps:**
1. Create 2-3 tasks while online
2. Open Chrome DevTools (F12)
3. Go to Network tab
4. Check "Offline" checkbox
5. Try to create a new task

**Expected Result:**
- ✓ Header shows "Offline" indicator (yellow icon)
- ✓ Tasks still load and display
- ✓ New tasks can be created
- ✓ All tasks show "Pending sync" (orange cloud icon)
- ✓ No errors or broken UI

**Pass/Fail:** ___________

---

#### 2.2 Offline Operations ✓

**While still offline, test:**

1. **Create Task**: "Offline task 1"
2. **Complete Task**: Toggle any existing task
3. **Delete Task**: Remove any task
4. **Navigate**: Refresh the page (F5)

**Expected Result:**
- ✓ All operations work immediately
- ✓ After refresh, all data persists
- ✓ App loads instantly from cache
- ✓ "Offline" indicator remains visible

**Pass/Fail:** ___________

---

#### 2.3 Background Sync Test ✓

**Steps:**
1. While offline, create task: "Test sync"
2. Note the "Pending sync" indicator
3. In DevTools Network tab, uncheck "Offline"
4. Wait 2-3 seconds
5. Observe the sync indicator

**Expected Result:**
- ✓ Header changes to "Online" (green WiFi icon)
- ✓ Sync icon briefly appears in header
- ✓ Task sync indicator changes to "Synced" (green cloud icon)
- ✓ All pending tasks update to "Synced"

**Pass/Fail:** ___________

---

### 3. PWA Installation Testing

#### 3.1 Install Prompt ✓

**Steps:**
1. Visit the app in Chrome/Edge
2. Look for install prompt (bottom-left corner)
3. If not visible, check browser address bar for install icon

**Expected Result:**
- ✓ Install prompt appears with purple gradient design
- ✓ Shows "Install App" title
- ✓ Displays message about offline use
- ✓ Has "Install" and "Not now" buttons

**Pass/Fail:** ___________

---

#### 3.2 App Installation ✓

**Steps:**
1. Click "Install" button in the prompt
   OR click install icon in browser address bar
2. Confirm installation
3. Wait for installation to complete
4. Find the installed app

**Expected Result:**
- ✓ Installation dialog shows app name and icon
- ✓ App installs within 1-2 seconds
- ✓ Desktop icon/shortcut is created
- ✓ App opens in standalone window (no browser UI)
- ✓ Title bar shows "PWA Task Manager"

**Pass/Fail:** ___________

---

#### 3.3 Standalone Mode Testing ✓

**Steps:**
1. Open the installed app
2. Observe the window chrome
3. Try creating, editing tasks

**Expected Result:**
- ✓ No browser address bar visible
- ✓ No browser tabs or bookmarks bar
- ✓ Looks like native app
- ✓ All features work identically
- ✓ Window can be minimized/maximized

**Pass/Fail:** ___________

---

### 4. Push Notifications Testing

#### 4.1 Notification Permission ✓

**Steps:**
1. Look for notification prompt (blue banner)
2. Click "Enable" button
3. Grant permission in browser dialog

**Expected Result:**
- ✓ Blue banner appears with bell icon
- ✓ Browser permission dialog appears
- ✓ Test notification appears immediately after granting
- ✓ Notification shows app icon
- ✓ Banner dismisses after granting

**Pass/Fail:** ___________

---

#### 4.2 Notification Interaction ✓

**Steps:**
1. Observe the test notification
2. Click the notification
3. Check app behavior

**Expected Result:**
- ✓ Notification displays: "PWA Task Manager"
- ✓ Message: "You will now receive notifications!"
- ✓ Clicking notification focuses app window
- ✓ Notification auto-dismisses after ~5 seconds

**Pass/Fail:** ___________

---

### 5. Update Mechanism Testing

#### 5.1 Update Notification ✓

**Note**: This requires deploying a new version

**Steps:**
1. Deploy app (v1.0.0)
2. Open app and use it
3. Deploy updated version (v1.0.1)
4. Return to already-open app
5. Wait for update check (~30 seconds)

**Expected Result:**
- ✓ Update prompt appears (bottom-right, gradient design)
- ✓ Shows "Update Available" message
- ✓ Animated spinning icon
- ✓ "Reload Now" and "Later" buttons
- ✓ Can dismiss with X button

**Pass/Fail:** ___________

---

#### 5.2 Update Installation ✓

**Steps:**
1. When update prompt appears
2. Click "Reload Now" button
3. Observe page reload

**Expected Result:**
- ✓ Page reloads immediately
- ✓ New version loads
- ✓ All data persists
- ✓ No data loss occurs

**Pass/Fail:** ___________

---

### 6. Performance Testing

#### 6.1 Initial Load ✓

**Steps:**
1. Clear browser cache (Ctrl+Shift+Del)
2. Open DevTools Performance tab
3. Reload page (Ctrl+R)
4. Measure load time

**Expected Result:**
- ✓ Page loads in < 2 seconds
- ✓ UI appears immediately
- ✓ No layout shift
- ✓ Smooth animations

**Pass/Fail:** ___________

**Measured Time:** ___________ seconds

---

#### 6.2 Cached Load ✓

**Steps:**
1. After initial load, close DevTools
2. Refresh page (F5)
3. Observe load speed

**Expected Result:**
- ✓ Page loads in < 0.5 seconds
- ✓ Instant appearance
- ✓ Service worker serves from cache
- ✓ Tasks load from IndexedDB

**Pass/Fail:** ___________

**Measured Time:** ___________ seconds

---

#### 6.3 Offline Load ✓

**Steps:**
1. Go offline (DevTools → Network → Offline)
2. Refresh page (F5)
3. Observe load behavior

**Expected Result:**
- ✓ Page loads instantly
- ✓ No errors or broken images
- ✓ All UI elements present
- ✓ Tasks display correctly
- ✓ "Offline" indicator shows

**Pass/Fail:** ___________

---

### 7. Error Handling Testing

#### 7.1 Error Toast Display ✓

**Steps:**
1. Open DevTools Console
2. Trigger an error (try to access non-existent data)
3. Observe error toast

**Expected Result:**
- ✓ Red error toast appears (top-right)
- ✓ Shows error icon and message
- ✓ Has dismiss (X) button
- ✓ Auto-dismisses after 5 seconds
- ✓ Slide-in animation

**Pass/Fail:** ___________

---

### 8. Responsive Design Testing

#### 8.1 Mobile View (< 640px) ✓

**Steps:**
1. Open DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Select "iPhone 12" or similar
4. Test all features

**Expected Result:**
- ✓ Layout adapts to mobile width
- ✓ Single column layout
- ✓ Touch-friendly button sizes
- ✓ No horizontal scroll
- ✓ All text readable

**Pass/Fail:** ___________

---

#### 8.2 Tablet View (640-1024px) ✓

**Steps:**
1. In device toolbar, select "iPad" or similar
2. Test in both portrait and landscape

**Expected Result:**
- ✓ Comfortable spacing
- ✓ Readable text sizes
- ✓ Features grid shows 2 columns
- ✓ No wasted space

**Pass/Fail:** ___________

---

#### 8.3 Desktop View (> 1024px) ✓

**Steps:**
1. Exit device toolbar
2. Resize window to full width
3. Test features

**Expected Result:**
- ✓ Content centered (max-width: 1024px)
- ✓ Features grid shows 2 columns
- ✓ Comfortable reading width
- ✓ All hover effects work

**Pass/Fail:** ___________

---

### 9. Data Persistence Testing

#### 9.1 Page Refresh ✓

**Steps:**
1. Create 3 tasks with different states (active, completed)
2. Refresh page (F5)
3. Check tasks

**Expected Result:**
- ✓ All tasks remain
- ✓ Task states preserved (completed/active)
- ✓ Sync status preserved
- ✓ Timestamps intact

**Pass/Fail:** ___________

---

#### 9.2 Browser Restart ✓

**Steps:**
1. Create tasks
2. Close browser completely
3. Reopen browser
4. Navigate to app

**Expected Result:**
- ✓ All data persists
- ✓ Tasks load from IndexedDB
- ✓ No data loss

**Pass/Fail:** ___________

---

#### 9.3 Clear Cache (Keep Data) ✓

**Steps:**
1. Create tasks
2. Clear cache: Settings → Privacy → Clear browsing data
3. Select "Cached images and files" ONLY
4. Reload app

**Expected Result:**
- ✓ App redownloads assets
- ✓ Tasks remain intact (IndexedDB not cleared)
- ✓ No data loss

**Pass/Fail:** ___________

---

### 10. Browser Compatibility Testing

Test on multiple browsers:

#### Chrome/Edge ✓
- [ ] All features work
- [ ] Install prompt appears
- [ ] Notifications work
- [ ] Share API works

#### Firefox ✓
- [ ] All features work
- [ ] Install prompt appears
- [ ] Notifications work
- [ ] Share fallback (clipboard)

#### Safari (macOS/iOS) ✓
- [ ] All features work
- [ ] Add to Home Screen works
- [ ] Notifications work (if granted)
- [ ] Share API works

---

## Use Case Scenarios

### Scenario 1: Daily Task Management

**User Story**: As a user, I want to manage my daily tasks even when my internet is unreliable.

**Steps:**
1. Open app in the morning
2. Add tasks for the day:
   - "Morning workout"
   - "Prepare presentation"
   - "Grocery shopping"
   - "Call mom"
3. Throughout the day:
   - Complete tasks as you finish them
   - Add new tasks as they come up
   - Internet may drop occasionally
4. End of day:
   - Review completed tasks
   - Plan tomorrow's tasks

**Expected Experience:**
- ✓ Tasks always available, online or offline
- ✓ Instant task creation and updates
- ✓ Visual feedback on sync status
- ✓ No data loss regardless of connection
- ✓ Smooth, app-like experience

**Success Criteria:**
- [ ] All tasks saved correctly
- [ ] Works seamlessly offline
- [ ] Syncs when connection restored
- [ ] Positive user experience

---

### Scenario 2: Commuter Usage

**User Story**: As a commuter, I want to use the app on the train where connectivity is spotty.

**Steps:**
1. Install app while on WiFi at home
2. Create initial task list:
   - "Review meeting notes"
   - "Draft email to team"
   - "Read article"
3. Board train (intermittent connectivity)
4. Use app throughout journey:
   - Complete tasks
   - Add new tasks
   - Edit task descriptions
5. Arrive at destination (back online)

**Expected Experience:**
- ✓ App loads instantly from cache
- ✓ All features work without internet
- ✓ No "lost connection" errors
- ✓ Data syncs automatically when back online
- ✓ Battery-efficient operation

**Success Criteria:**
- [ ] Zero downtime due to connectivity
- [ ] Fast, responsive interface
- [ ] All changes saved locally
- [ ] Successful sync at destination

---

### Scenario 3: Team Collaboration (Sharing)

**User Story**: As a team member, I want to share task lists with colleagues.

**Steps:**
1. Create project task list:
   - "Design mockups"
   - "Review API documentation"
   - "Write test cases"
2. Share tasks with team members:
   - Click share button on each task
   - Send via Slack/Email/Messages
3. Recipients receive task details

**Expected Experience:**
- ✓ Easy sharing via native share sheet
- ✓ Task details included in share
- ✓ Works on mobile and desktop
- ✓ Fallback to clipboard on unsupported devices

**Success Criteria:**
- [ ] Share button easily accessible
- [ ] Share sheet opens correctly
- [ ] Task content properly formatted
- [ ] Works across platforms

---

### Scenario 4: Airplane Mode Productivity

**User Story**: As a frequent flyer, I want to stay productive on flights with no WiFi.

**Pre-flight:**
1. Open app with WiFi
2. Create task list for flight:
   - "Review Q4 report"
   - "Plan vacation"
   - "Organize photos"
   - "Brainstorm ideas"

**During Flight (6 hours):**
1. Enable airplane mode
2. Complete tasks throughout flight
3. Add new tasks as needed
4. Edit existing tasks

**Post-flight:**
1. Disable airplane mode
2. Wait for sync
3. Verify all changes saved

**Expected Experience:**
- ✓ App fully functional in airplane mode
- ✓ All data persists locally
- ✓ No sync errors or warnings
- ✓ Automatic sync on landing

**Success Criteria:**
- [ ] 100% offline functionality
- [ ] All changes preserved
- [ ] Successful post-flight sync
- [ ] No data conflicts

---

### Scenario 5: First-Time User Onboarding

**User Story**: As a new user, I want to understand and use all PWA features.

**Steps:**
1. First visit to app
2. Observe welcome/feature highlights
3. Create first task: "Test the app"
4. See notification prompt → grant permission
5. See install prompt → install app
6. Explore offline mode
7. Try sharing a task
8. Complete and delete tasks

**Expected Experience:**
- ✓ Clear feature explanations
- ✓ Non-intrusive prompts
- ✓ Easy to understand UI
- ✓ Guided discovery of features
- ✓ Positive first impression

**Success Criteria:**
- [ ] User understands core features
- [ ] User grants permissions
- [ ] User installs app
- [ ] User completes first task successfully

---

## Advanced Testing

### Service Worker Inspection

**Steps:**
1. Open DevTools
2. Go to Application tab
3. Click "Service Workers" in left sidebar

**Verify:**
- [ ] Service worker is registered
- [ ] Status: "activated and running"
- [ ] Update on reload works
- [ ] Unregister/register works

---

### Cache Inspection

**Steps:**
1. In Application tab, click "Cache Storage"
2. Expand cache folders

**Verify:**
- [ ] `workbox-precache` exists
- [ ] `google-fonts-cache` exists
- [ ] `images-cache` exists
- [ ] `static-resources` exists
- [ ] Correct files cached

---

### IndexedDB Inspection

**Steps:**
1. In Application tab, click "IndexedDB"
2. Expand "TaskManagerDB"

**Verify:**
- [ ] `tasks` table exists
- [ ] `syncQueue` table exists
- [ ] Tasks have correct structure
- [ ] Sync queue processes correctly

---

## Troubleshooting

### Issue: Install prompt doesn't appear

**Solutions:**
- Ensure you're on HTTPS (not localhost HTTP)
- App must meet PWA criteria (manifest, service worker)
- Clear browser data and reload
- Try incognito/private window
- Check browser supports PWA (Chrome/Edge)

---

### Issue: Offline mode doesn't work

**Solutions:**
- Check service worker is registered (DevTools → Application)
- Clear cache and reload
- Ensure service worker isn't bypassed in DevTools
- Check Network tab "Disable cache" is OFF

---

### Issue: Tasks don't persist

**Solutions:**
- Check IndexedDB in DevTools → Application
- Ensure browser isn't in private/incognito mode
- Check browser storage quota
- Verify no browser extensions blocking storage

---

### Issue: Notifications don't show

**Solutions:**
- Check browser notification permissions
- Ensure notifications aren't blocked system-wide
- Try on different browser
- Check browser supports Notification API

---

### Issue: Share button doesn't work

**Solutions:**
- Share API only works on HTTPS
- Desktop browsers may not support Share API
- Fallback to clipboard should work
- Check browser console for errors

---

## Test Summary Report

**Tester Name:** ___________________________
**Date:** ___________________________
**Browser:** ___________________________
**OS:** ___________________________

### Results Summary

| Category | Tests Passed | Tests Failed | Pass Rate |
|----------|--------------|--------------|-----------|
| Basic Functionality | ___ / 4 | ___ | ___% |
| Offline Mode | ___ / 3 | ___ | ___% |
| PWA Installation | ___ / 3 | ___ | ___% |
| Notifications | ___ / 2 | ___ | ___% |
| Updates | ___ / 2 | ___ | ___% |
| Performance | ___ / 3 | ___ | ___% |
| Error Handling | ___ / 1 | ___ | ___% |
| Responsive Design | ___ / 3 | ___ | ___% |
| Data Persistence | ___ / 3 | ___ | ___% |
| **TOTAL** | ___ / 24 | ___ | ___% |

### Critical Issues Found

1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

### Minor Issues Found

1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

### Recommendations

1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

### Overall Assessment

**Production Ready?** [ ] Yes [ ] No [ ] With Fixes

**Comments:**
________________________________________________________________
________________________________________________________________
________________________________________________________________

---

## Appendix: Quick Feature Reference

### Keyboard Shortcuts

- `Ctrl/Cmd + R` - Reload page
- `F5` - Refresh
- `F12` - Open DevTools
- `Ctrl/Cmd + Shift + M` - Toggle device toolbar
- `Ctrl/Cmd + Shift + Del` - Clear browsing data

### DevTools Tips

- **Offline Testing**: Network tab → Offline checkbox
- **Slow 3G**: Network tab → Slow 3G preset
- **Mobile Simulation**: Device toolbar (responsive design)
- **Service Worker**: Application → Service Workers
- **Storage**: Application → Storage → IndexedDB

### Feature Locations

- **Tasks**: Main content area
- **Install Prompt**: Bottom-left corner
- **Update Prompt**: Bottom-right corner
- **Error Toast**: Top-right corner
- **Notification Prompt**: Top of content area
- **Sync Indicator**: Header (right side)
- **Online Status**: Header (right side)

---

**End of Manual Testing Guide**

*For questions or issues, refer to README.md or technical documentation.*
