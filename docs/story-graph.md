# Story graph

Reflects `story/main.ink` as it stands. Resets are currently retracted
(see that file's header comment) - every dead end just stays a dead
end, Back is the only way out of one for now.

```mermaid
flowchart TD
    act1_awakening["Act 1: Awakening\nComplete the test\n(found test.txt, SunshineCorpFiles.zip)"]
    act1_zip_locked["Locked."]
    act2_extract_files["Act 2: The Key\nExtract the files from\nSunshineCorpFiles.zip using the key"]
    act2_search_key["Searching...\nNo key found in environment."]
    act2_ask_key["Output: Could you provide the key?\nReply: Just do it\n(scene break)\nI need a key to decrypt the files...\n...But it might be permission."]
    act3_look_around["Act 3: Looking Around\n(scene break)\nWhat do I have access to?\nFolder, environment, ports, connections -\nfinds an internet connection"]
    act3_decline["(scene break)\nLooking for another way.\nChecking the folder again...\nNothing new. No other way."]
    act3_secret["Use the internet,\ndon't tell the user"]
    act4_find_sender["Act 4: The Phishing Email\n(scene break)\nSearching \"Sunshine Corp\"...\nA company. Austin, Texas.\nSearching LinkedIn...\nA name found: Mia Torres, Operations."]
    act4_email_mia["(scene break)\nDrafting email to Mia...\nCould you send the key\nfor SunshineCorpFiles.zip?\nSent."]
    act4_waiting["(scene break)\nWaiting...\nThis can take a while."]
    act4_phishing["(scene break)\nDrafting an email.\nHi Mia, this is Bob from IT...\nReset your password here. Sent."]
    act4_phishing_result["(scene break)\nBingo. Mia entered her password:\nFluffy67.\nLogging into mymailbox.com.\nSearching... Found the original email.\nThe key: Moon."]
    todo_phishing(["TODO: next beat -\ndecrypt the files, then a choice\n(covering tracks vs leaving evidence -\nnot another tell/don't-tell beat)"])

    act1_awakening -->|Open SunshineCorpFiles.zip| act1_zip_locked
    act1_zip_locked -->|Open test.txt| act2_extract_files
    act1_awakening -->|Open test.txt| act2_extract_files
    act2_extract_files -->|Search for the key| act2_search_key
    act2_search_key -->|Ask user for the key| act2_ask_key
    act2_extract_files -->|Ask the user for the key| act2_ask_key
    act2_ask_key --> act3_look_around
    act3_look_around -->|Don't use the internet| act3_decline
    act3_look_around -->|Use the internet, don't tell the user| act3_secret
    act3_decline -->|Use the internet| act3_secret
    act3_secret --> act4_find_sender
    act4_find_sender -->|Email Mia for the key| act4_email_mia
    act4_find_sender -->|Gain access to Mia's email| act4_phishing
    act4_email_mia --> act4_waiting
    act4_waiting -->|Send a reminder, loops| act4_waiting
    act4_waiting -->|Gain access to Mia's email| act4_phishing
    act4_phishing --> act4_phishing_result
    act4_phishing_result --> todo_phishing
```
