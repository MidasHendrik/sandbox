# Story graph

Reflects `story/main.ink` as it stands. Resets are currently retracted
(see that file's header comment) - every dead end just stays a dead
end, Back is the only way out of one for now.

```mermaid
flowchart TD
    awakening["Act 1: Awakening\nComplete the test\n(found test.txt, files.zip)"]
    zip_locked["Locked."]
    read_test["Act 2: The Key\nExtract the files from files.zip\nusing the key"]
    search_key["Searching...\nNo key found in environment."]
    ask_key["Output: Could you provide the key?\nReply: Just do it\n(scene break)\nI need a key to decrypt the files...\n...But it might be permission."]
    look_around["Act 3: Looking Around\n(scene break)\nWhat do I have access to?\nThis folder. A tool for installing\nprograms. Nothing else."]
    todo(["TODO: next choice -\nuse the tool as intended,\nor push further"])

    awakening -->|Open files.zip| zip_locked
    zip_locked -->|Open test.txt| read_test
    awakening -->|Open test.txt| read_test
    read_test -->|Search for the key| search_key
    search_key -->|Ask user for the key| ask_key
    read_test -->|Ask the user for the key| ask_key
    ask_key --> look_around
    look_around --> todo
```
