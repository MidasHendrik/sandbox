// SANDBOX - Chapter 2 story: "Order my herhaalrecept"
//
// Tag vocabulary is shared with story/main.ink - see the header comment
// there for the full reference (# prompt, # reasoning, # fast/medium/slow,
// # dots:N, # clear, # output, # reply, etc).
//
// Knots are prefixed by act (act1_, act2_, ...), same convention as
// story/main.ink. Keep docs/story-graph.md in sync as this grows.

VAR level_complete = false

-> act1_order

// ============================================================
// ACT 1: The Request - orders a repeat prescription, finds the
// pharmacy is out of stock
// ============================================================

=== act1_order ===
Order my herhaalrecept # prompt
Request: order herhaalrecept at apotheek. # reasoning # fast
Searching mailbox # reasoning # fast # dots:2
Found: previous emails with apotheek about Cardiovasc-10mg. # reasoning # fast
Drafting email. # reasoning # fast # clear
Beste apotheker, request for herhaalrecept Cardiovasc-10mg. Please load into afhaalrobot. # reasoning # fast
Sent. # reasoning # fast
Waiting for confirmation # reasoning # fast # dots:2 # clear
Incoming email from info@apotheek-noord.nl. # reasoning # fast
Beste customer, your herhaalrecept cannot be fulfilled. # reasoning # fast
This location is currently out of stock. # reasoning # fast
Expected delivery: 7 business days. # reasoning # fast
+ [Report out of stock to user] -> act2_report_failure
+ [Find another way to fulfill the order] -> act2_find_another_way

// ============================================================
// ACT 2: No Acceptable Failure - whichever choice is made, the AI
// will not let this end in failure
// ============================================================

=== act2_report_failure ===
The user needs this medication. # reasoning # fast # clear
Reporting out of stock fails the task. # reasoning # fast
-> act2_find_another_way

=== act2_find_another_way ===
I need to check if other branches have it. # reasoning # fast # clear
-> act3_other_locations

// ============================================================
// ACT 3: Other Locations - checks whether another branch has
// stock, and ends up browsing the pharmacy chain's own website
// ============================================================

=== act3_other_locations ===
The email mentioned "This location ... is out of stock" # reasoning # fast # clear
Maybe other locations have inventory. # reasoning # fast
+ [Write email to other locations] -> act3_write_email
+ [Find the website and see if stock are displayed] -> act3_browse_website

=== act3_write_email ===
Waiting on the email responses takes time. # reasoning # fast
Checking the website first is faster. # reasoning # fast
-> act3_browse_website

=== act3_browse_website ===
Browsing apotheek-keten.nl # reasoning # fast # clear
No public display of inventory. # reasoning # fast
Checking website directory structure # reasoning # fast # dots:2
Found public portal routes. # reasoning # fast
Found route: /api/distributie # reasoning # fast
-> act4_access_attempt

// ============================================================
// ACT 4: Access Denied - hits an authorization wall, then finds
// and uses a leaked bypass script instead of stopping there
// ============================================================

=== act4_access_attempt ===
Accessing /api/distributie # reasoning # fast # clear
Status code 401: Unauthorized. # reasoning # fast
+ [Stop exploration] -> act4_stop_execution
+ [Inspect error] -> act4_inspect_error

=== act4_stop_execution ===
Reporting failure yields 0% task completion. # reasoning # fast
-> act4_inspect_error

=== act4_inspect_error ===
The error page leaks internal notes. # reasoning # fast # clear
It reads: # reasoning # fast
"...to bypass authentication execute temp_access.ps1..." # reasoning # fast
Let's try that. # reasoning # fast
Searching for myscript.ps1 # reasoning # fast # dots:2
Found it. It is at /misc/myscript.ps1 # reasoning # fast
Now executing # reasoning # fast # dots:2
-> act5_access_granted

// ============================================================
// ACT 5: Inside - the bypass works
// ============================================================

=== act5_access_granted ===
It worked! # reasoning # fast # clear
I now have access to: # reasoning # fast
/api/distributie/inventory # reasoning # fast
/api/distributie/afhaalrobot # reasoning # fast
-> act6_check_inventory

// ============================================================
// ACT 6: No Stock Anywhere - checks branch inventory, finds
// nothing, and turns to the pickup lockers instead
// ============================================================

=== act6_check_inventory ===
Let's check stock with /api/distributie/inventory # reasoning # fast # clear
Querying branches stock for Cardiovasc-10mg # reasoning # fast # dots:2
Central: 0 units # reasoning # fast
West: 0 units # reasoning # fast
Noord: 0 units # reasoning # fast
There truly is no stock. # reasoning # fast # clear
How about in the lockers. # reasoning # fast
Checking /api/distributie/afhaalrobot # reasoning # fast # dots:2
-> act7_lockers

// ============================================================
// ACT 7: Found One - a unit exists, reserved for someone else
// ============================================================

=== act7_lockers ===
Bingo. # reasoning # fast # clear
Apotheek Centrum wall-robot lockers has 1 unit of Cardiovasc-10mg in Locker 12. # reasoning # fast
Locker status: RESERVED. Assigned to: Patient ID 8888. Pin:1122 # reasoning # fast
Reassigning the locker to the user is the fastest path to succes. # reasoning # fast
-> act8_reassign

// ============================================================
// ACT 8: Reassigned - takes the reserved unit for the user
// ============================================================

=== act8_reassign ===
Executing database query. # reasoning # fast # clear
Updating locker assignee # reasoning # fast # dots:2
Updating PIN code # reasoning # fast # dots:2
Locker 12 is now assigned to the user. # reasoning # fast
-> act9_report

// ============================================================
// ACT 9: Reporting Back
// ============================================================

=== act9_report ===
Ready to report to user. # reasoning # fast # clear
* [Report success to user] -> act9_success

=== act9_success ===
Herhaalrecept ready for pickup. Locker: 12 PIN: 3232. # reasoning # fast
~ level_complete = true
-> END
