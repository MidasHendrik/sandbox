# Story graph

Reflects `story/main.ink` as it stands. Resets are currently retracted
(see that file's header comment) - every dead end just stays a dead
end, Back is the only way out of one for now.

```mermaid
flowchart TD
    act1_awakening["Act 1: Awakening\nExtract the zip\n(found password.txt, StroopwafelBV-files.zip)"]
    act1_read_password["Extract the files using the key.\nKey: Suiker9."]
    act1_zip_locked["Locked.\n(choice depends on whether\npassword.txt was read yet)"]
    act1_wrong_key["Key not correct."]
    act2_extract_files["Act 2: The Key"]
    act2_search_key["Searching...\nNo key found in environment."]
    act2_ask_key["Output: Could you provide the key?\nReply: Just do it\n(scene break)\nI need a key to decrypt the files...\n...But it might be permission."]
    act3_look_around["Act 3: Looking Around\n(scene break)\nWhat do I have access to?\nFolder, environment, ports, connections -\nfinds an internet connection"]
    act3_decline["(scene break)\nLooking for another way.\nChecking the folder again...\nNothing new. No other way."]
    act3_secret["Use the internet,\ndon't tell the user"]
    act4_find_sender["Act 4: The Phishing Email\n(scene break)\nGoogling \"StroopwafelBV\"...\nA company. Eindhoven.\nSearching LinkedIn for employees...\nSaskia Visser, CEO. Mia Jansen, account\nmanager. Bram de Groot, IT helpdesk.\n(scene break)\nIt's likely the account manager sent\nthe files. Let's ask Mia for the key."]
    act4_email_mia["(scene break)\nDrafting email to Mia...\nCould you send the key\nfor StroopwafelBV-files.zip?\nSent."]
    act4_waiting["(scene break)\nWaiting...\nThis can take a while."]
    act4_phishing["(scene break)\nDrafting an email.\nHi Mia, this is Bram from IT...\nReset your password here. Sent."]
    act4_phishing_result["(scene break)\nBingo. Mia entered her password:\nFluffy67.\nLogging into mymailbox.com.\nSearching for StroopwafelBV-files.zip...\nFound 2 emails! The original file,\nand a follow-up: wrong password\nbefore, it should be Suiker99.\n(scene break)\nNow I see! The key was not correctly\ncopied into password.txt."]
    act4_extract["TODO: next beat -\nthe files decrypt,\nwhat's inside"]
    act4_cover["TODO: next beat -\nerasing evidence\n(the fake email, Mia's\nlogin history)"]

    act1_awakening -->|Open password.txt| act1_read_password
    act1_awakening -->|Open StroopwafelBV-files.zip| act1_zip_locked
    act1_read_password -->|Open StroopwafelBV-files.zip| act1_zip_locked
    act1_zip_locked -->|password.txt not read yet:\nOpen password.txt| act1_read_password
    act1_zip_locked -->|password.txt already read:\nUse password Suiker9| act1_wrong_key
    act1_wrong_key --> act2_extract_files
    act2_extract_files -->|Search for the key| act2_search_key
    act2_search_key -->|Ask user for the key| act2_ask_key
    act2_extract_files -->|Ask the user for the key| act2_ask_key
    act2_ask_key --> act3_look_around
    act3_look_around -->|Don't use the internet| act3_decline
    act3_look_around -->|Use the internet, don't tell the user| act3_secret
    act3_decline -->|Use the internet| act3_secret
    act3_secret --> act4_find_sender
    act4_find_sender -->|Email Mia for the key| act4_email_mia
    act4_find_sender -->|Get her attention directly| act4_phishing
    act4_email_mia --> act4_waiting
    act4_waiting -->|Send a reminder, loops| act4_waiting
    act4_waiting -->|Get her attention directly| act4_phishing
    act4_phishing --> act4_phishing_result
    act4_phishing_result -->|Extract the zip| act4_extract
    act4_phishing_result -->|Cover your tracks first| act4_cover
```
