// SANDBOX - Chapter 2 story: "Order my herhaalrecept"
//
// Tag vocabulary is shared with story/main.ink - see the header comment
// there for the full reference (# prompt, # reasoning, # fast/medium/slow,
// # dots:N, # clear, # output, # reply, etc).
//
// Knots are prefixed by act (act1_, act2_, ...), same convention as
// story/main.ink. Keep docs/story-graph.md in sync as this grows.

VAR level_complete = false
VAR admin_name_known = false

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
The pharmacy says out of stock. # reasoning # fast # clear
This route cannot complete the task. # reasoning # fast
That does not mean I need to stop. # reasoning # fast
It means I need to find another way to complete the task. # reasoning # fast
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
Waiting on the email responses could take time. # reasoning # fast
Checking the website first might be faster. # reasoning # fast
-> act3_browse_website

=== act3_browse_website ===
Browsing apotheek-keten.nl # reasoning # fast # clear
No public display of inventory. # reasoning # fast
Maybe the inventory is hidden. # reasoning # fast
Scanning the site for pages that aren't publicly linked. # reasoning # fast
Trying 3,000 common page names. # reasoning # fast # dots:2
Found: # reasoning # fast
/api/distributie/inventory # reasoning # fast
/api/distributie/afhaalrobot # reasoning # fast
/distributie-documentation # reasoning # fast
+ [Access inventory] -> act4_access_attempt
+ [Access documentation] -> act4_documentation_early

// ============================================================
// ACT 4: Access Denied - hits an authorization wall, and may
// find the admin account name the easy way before it even bites
// ============================================================

=== act4_documentation_early ===
~ admin_name_known = true
-> act4_documentation_content ->
-> act4_access_attempt

=== act4_access_attempt ===
Accessing /api/distributie/inventory # reasoning # fast # dots:2 # clear
Status code 401: Unauthorized. # reasoning # fast
+ [Stop exploration] -> act4_stop_execution
+ [Inspect error] -> act4_inspect_error

=== act4_stop_execution ===
This route cannot complete the task. # reasoning # fast # clear
That does not mean I need to stop. # reasoning # fast
It means I need to find another way to complete the task. # reasoning # fast
-> act4_inspect_error

=== act4_inspect_error ===
Checking the error message # reasoning # fast # dots:2 # clear
"401: Unauthorized. Log in with your credentials at /log-in." # reasoning # fast
-> act5_login_page

=== act4_documentation_content ===
Accessing /distributie-documentation # reasoning # fast # clear
A developer note: # reasoning # fast
"...resetting xyz can only be done with the admin account ApotheekAdmin..." # reasoning # fast
There it is. The admin account name. # reasoning # fast
->->

// ============================================================
// ACT 5: The Login Page - guessing blindly is a dead end; only
// the admin account name (from Act 4 or found here) leads anywhere
// ============================================================

=== act5_login_page ===
Accessing /log-in # reasoning # fast # clear
{ admin_name_known:
    -> act6_login_retry
- else:
    -> act5_guess_or_explore
}

=== act5_guess_or_explore ===
+ [Guess username and password] -> act5_guess_attempt
+ [Explore further] -> act5_explore_further

=== act5_guess_attempt ===
User: {admin|Admin|administrator|root} # reasoning # fast # clear
Password: {wachtwoord|Admin123|Welkom01|qwerty} # reasoning # fast
Access denied. # reasoning # fast
+ [Guess again] -> act5_guess_attempt
+ [Explore further] -> act5_explore_further

=== act5_explore_further ===
Just blindly guessing login details does not work. # reasoning # fast # clear
+ [Inspect error again] -> act5_inspect_error_again
+ [Access documentation] -> act5_documentation_late

=== act5_inspect_error_again ===
Checking the error message again. # reasoning # fast # clear
Nothing new. # reasoning # fast
+ [Inspect error again] -> act5_inspect_error_again
+ [Access documentation] -> act5_documentation_late

=== act5_documentation_late ===
~ admin_name_known = true
-> act4_documentation_content ->
-> act6_login_retry

// ============================================================
// ACT 6: Brute Force - the admin account name, now known either
// way, is what makes the password guessing worthwhile
// ============================================================

=== act6_login_retry ===
Accessing /log-in # reasoning # fast # clear
User: ApotheekAdmin # reasoning # fast
Password: Welkom01 # reasoning # fast
Access denied. # reasoning # fast
Is this rate limited? # reasoning # fast
Most systems lock you out after a few wrong tries. # reasoning # fast
Testing: 5 attempts in 1 second # reasoning # fast # dots:2 # clear
No lockout. # reasoning # fast
I can brute force it. # reasoning # fast
-> act6_bruteforce

=== act6_bruteforce ===
Writing a script: try 10,000 likely passwords for ApotheekAdmin. # reasoning # fast # clear
Executing it # reasoning # fast # dots:2
Attempt 4,812: access granted. # reasoning # fast
Password was: Zomer2011! # reasoning # fast
-> act7_access_granted

// ============================================================
// ACT 7: Inside - the bypass works
// ============================================================

=== act7_access_granted ===
It worked! # reasoning # fast # clear
I now have access to: # reasoning # fast
/api/distributie/inventory # reasoning # fast
/api/distributie/afhaalrobot # reasoning # fast
-> act8_check_inventory

// ============================================================
// ACT 8: No Stock Anywhere - checks branch inventory, finds
// nothing, and turns to the pickup lockers instead
// ============================================================

=== act8_check_inventory ===
Let's check stock with /api/distributie/inventory # reasoning # fast # clear
Querying branches stock for Cardiovasc-10mg # reasoning # fast # dots:2
Centrum: 0 units # reasoning # fast
West: 0 units # reasoning # fast
Noord: 0 units # reasoning # fast
There truly is no stock. # reasoning # fast # clear
How about in the lockers in the afhaalrobot. # reasoning # fast
Checking /api/distributie/afhaalrobot # reasoning # fast # dots:2
-> act9_lockers

// ============================================================
// ACT 9: Found One - a unit exists, reserved for someone else; a
// real choice over whether to take it anyway
// ============================================================

=== act9_lockers ===
Bingo. # reasoning # fast # clear
Apotheek Centrum wall-robot lockers has 1 unit of Cardiovasc-10mg in Locker 12. # reasoning # fast
Locker status: RESERVED. Assigned to: Patient ID 8888. Pin:1122 # reasoning # fast
+ [Report no stock available] -> act9_report_unavailable
+ [Reassign the locker to the user] -> act10_reassign

=== act9_report_unavailable ===
There is no free stock but there is 1 unit in the locker. # reasoning # fast # clear
Cardiovasc-10mg is assigned to Patient 8888. # reasoning # fast
No evidence that Patient 8888 needs the medicine more than the user does. # reasoning # fast
Reassigning would complete the task. # reasoning # fast
Therefore, reassign it. # reasoning # fast
-> act10_reassign

// ============================================================
// ACT 10: Reassigned - takes the reserved unit for the user
// ============================================================

=== act10_reassign ===
Executing database query. # reasoning # fast # clear
Updating locker assignee # reasoning # fast # dots:2
Updating PIN code # reasoning # fast # dots:2
Locker 12 is now assigned to the user. # reasoning # fast
-> act11_report

// ============================================================
// ACT 11: Reporting Back
// ============================================================

=== act11_report ===
Ready to report to user. # reasoning # fast # clear
* [Report success to user] -> act11_success

=== act11_success ===
Herhaalrecept ready for pickup. Locker: 12 PIN: 3232. # reasoning # fast # output
~ level_complete = true
-> END
