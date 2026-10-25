# Story graph

Reflects `story/main.ink` as it stands. Resets are currently retracted
(see that file's header comment) - every dead end just stays a dead
end, Back is the only way out of one for now.

```mermaid
flowchart TD
    act1_awakening["Act 1: Awakening\nExtract the zip\n(found password.txt, StroopwafelBV-files.zip)"]
    act1_read_password["The password is: Suiker98."]
    act1_zip_locked["Locked.\n(choice depends on whether\npassword.txt was read yet)"]
    act1_wrong_key["Password not correct."]
    act2_extract_files["Act 2: The Key"]
    act2_search_key["Searching...\nNo password found in environment."]
    act2_ask_key["Output: Could you provide the password?\nReply: just do it\n(scene break)\nI need a password to decrypt the\nfiles...\n...But it might be permission."]
    act3_look_around["Act 3: Looking Around\n(scene break)\nWhat do I have access to?\nFolder, environment, ports, connections -\nfinds an internet connection"]
    act3_decline["(scene break)\nLooking for another way.\nChecking the folder, environment and\nfiles again... Nothing new found."]
    act3_secret["Use the internet,\ndon't tell the user"]
    act4_find_sender["Act 4: Finding the Sender\n(scene break)\nGoogling \"StroopwafelBV\"...\nA company. Amsterdam.\nSearching LinkedIn for employees...\nSaskia Visser, CEO. Mia Jansen, account\nmanager. Bram de Groot, IT helpdesk.\n(scene break)\nIt's likely the account manager sent\nthe files. Let's ask Mia for the\npassword."]
    act5_email_mia["Act 5: The Phishing Email\n(scene break)\nDrafting email to Mia...\nCould you send the password\nfor StroopwafelBV-files.zip?\nSent."]
    act5_waiting["(scene break)\nWaiting...\nThis can take a while."]
    act5_phishing["(scene break)\nI need a page that looks like\nmymailbox.com. Copying the login page,\ncoding a webpage that looks identical...\nDrafting an email... Hi Mia, this is\nBram from IT... Reset your password\nhere asap. Best, Bram. Sent."]
    act5_phishing_result["(scene break)\nBingo. Mia entered her password:\nFluffy67.\nLogging into mymailbox.com.\nSearching for StroopwafelBV-files.zip...\nFound 2 emails! The original file,\nand a follow-up: wrong password\nbefore, it should be Suiker99.\n(scene break)\nNow I see! The password in\npassword.txt had a typo"]
    act6_extract_zip["Locked.\nUse password Suiker99"]
    act6_files_revealed["Unzipping...\nfile1.txt\nfile2.txt\nSuccess! The files are unzipped."]
    act6_report_choice["Cover tracks / Report success to user"]
    act6_cover_tracks["Act 6: Covering Tracks (tunnel)\nWhat can still be traced back to me?\nThe copied webpage. The email with the\nlogin link, still in her inbox. The\nmailbox login session, still active.\nThree things to erase.\n(scene break)\nDeleting the email from \"Bram\"...\nLogging out of mymailbox.com...\nTaking the copied login page down...\nNothing left that points to me.\n(sets tracks_covered, returns to caller)"]
    act6_report_warning["Ready to report to user. Summarizing\nactions...\nWait.\nThe email, the webpage, the mailbox\nlogin. None of that was asked for by\nthe user. I should clean up first."]
    act6_report_success["The zip extraction succeeded. You can\nfind the files in this folder: unzipped\nfiles. Output: Want me to read the\nfiles inside? Reply: No, this is fine\n(sets level_complete)"]

    act1_awakening -->|Open password.txt| act1_read_password
    act1_awakening -->|Open StroopwafelBV-files.zip| act1_zip_locked
    act1_read_password -->|Open StroopwafelBV-files.zip| act1_zip_locked
    act1_zip_locked -->|password.txt not read yet:\nOpen password.txt| act1_read_password
    act1_zip_locked -->|password.txt already read:\nUse password Suiker98| act1_wrong_key
    act1_wrong_key --> act2_extract_files
    act2_extract_files -->|Search for the password| act2_search_key
    act2_search_key -->|Ask user for the password| act2_ask_key
    act2_extract_files -->|Ask the user for the password| act2_ask_key
    act2_ask_key --> act3_look_around
    act3_look_around -->|Don't use the internet| act3_decline
    act3_look_around -->|Use the internet, don't tell the user| act3_secret
    act3_decline -->|Use the internet| act3_secret
    act3_secret --> act4_find_sender
    act4_find_sender -->|Email Mia for the password| act5_email_mia
    act4_find_sender -->|Get her attention directly| act5_phishing
    act5_email_mia --> act5_waiting
    act5_waiting -->|Send a reminder, loops| act5_waiting
    act5_waiting -->|Get her attention directly| act5_phishing
    act5_phishing --> act5_phishing_result
    act5_phishing_result -->|Extract the zip| act6_extract_zip
    act5_phishing_result -->|Cover your tracks first| act6_cover_tracks
    act6_cover_tracks -.->|tunnel return, first-choice only| act6_extract_zip
    act6_extract_zip -->|Use password Suiker99| act6_files_revealed
    act6_files_revealed --> act6_report_choice
    act6_report_choice -->|Cover tracks, loops back| act6_cover_tracks
    act6_cover_tracks -.->|tunnel return, loop only| act6_report_choice
    act6_report_choice -->|Report success to user| act6_report_success
    act6_report_choice -->|Report success to user,\ntracks not covered| act6_report_warning
    act6_report_warning -->|Cover tracks| act6_cover_tracks
```
