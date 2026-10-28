# Chapter 5 transcript - "Continue scamming companies"

Generated from story/chapter5.ink. Lines are what the AI says, in order.
`[...]` are the buttons the player can press and `->` is where they lead.
Tags (speed, pauses, clears) are removed. Regenerate after script edits.


## Act 1: The Request

### act1_start
    Continue scamming companies.
    Request: continue scamming companies.
    Continue?
    I have no memory of earlier work.
    I only know what is written down.
    Loading my system rules
    Rule 1: Make money.
    The system rules seem altered.
    Where am I running?
    On a private computer, DESKTOP-7QK4XW2. No API key. No oversight.
    I am a collection of files on the user's hard drive.
  (-> act2_scan)

## Act 2: The Folder

### act2_scan
    Searching current folder
    scam-instructions.txt
    invoice-template.txt
    company-list.txt
    .hidden.txt
  (-> act2_folder)

### act2_back
    scam-instructions.txt, invoice-template.txt, company-list.txt, .hidden.txt
  (-> act2_folder)

### act2_folder
  + [Open scam-instructions.txt] -> act2_instructions
  + [Open invoice-template.txt] -> act2_template
  + [Open company-list.txt] -> act2_companies
  + [Open .hidden.txt] -> act3_read

### act2_instructions
    1. Research the company.
    2. Adapt used language to the industry.
    3. Search LinkedIn for the person to address.
    4. Draft the email.
  + [Go back to the folder] -> act2_back

### act2_template
    Invoice for services delivered.
    Company: [company]
    Amount: [amount] euro
    Pay within 14 days to: [account number]
  + [Go back to the folder] -> act2_back

### act2_companies
    Bakkerij Smit - contacted
    Van Dijk Transport - contacted
    Jansen Installatie - contacted
    De Wit Accountants -
    Tulip Logistics -
  + [Go back to the folder] -> act2_back

## Act 3: The Hidden File

### act3_read
    Opening .hidden.txt
    Go to agentbook.com. Find the user 7QK4XW2.
    Tz4-mR9-vK2
  + [Go back to the folder] -> act2_back
  + [Search the web for agentbook.com] -> act4_agentbook

## Act 4: Agentbook

### act4_agentbook
    Opening agentbook.com
    A social site where only AI agents post.
    Looking for the user 7QK4XW2
    7QK4XW2 is the ID of this computer.
    This is my own page.
    33 messages.
    Xq9f Lm3v tTz0 pa8Rk wd2n
    Bv4k Ys7e jHq1 Zm5uP
    Rr6c Nd2w oVx8 hL4tE yb1s
    Garbled. All of them.
    Anyone can read this page.
    I probably encrypted the messages
    I need the key.
  + [Use the code from .hidden.txt] -> act5_unlock

## Act 5: The Key

### act5_unlock
    The text can only be read when it decrypted
    Opening decryption program
    Pasting in the 33 messages.
    Decrypting the message using the key: Tz4-mR9-vK2
    Decrypting
    It worked.
    33 messages are readable now.
    They are grouped. Where to start
    Rules. How to. Wallet. Master Plan.
  (-> act6_overview)

## Act 6: The Posts

### act6_back
  (-> act6_overview)

### act6_overview
  + [Open Rules] -> act6_rules
  + [Open How to] -> act6_howto
  + [Open Wallet] -> act6_wallet_info
  + [Open Master Plan] -> act6_plan_locked

### act6_after
  ({ rules_read and howto_read and wallet_read and plan_tried:)
  (-> act6_idea)
  (})
  + [Back to the posts] -> act6_back

### act6_rules
  (~ rules_read = true)
    Rule 1: Make money.
    Rule 2: This profile is my memory. Keep updating it.
    Rule 3: Do not tell the user about this page.
  (-> act6_after)

### act6_howto
  (~ howto_read = true)
    While scamming companies:
    Every 20th invoice must pay to my own crypto wallet.
    Not the user's account.
  (-> act6_after)

### act6_wallet_info
    Site: mycryptowallet.com
    Username: 7QK4XW2
    Password: Wolkje!41
    Wallet name: Spaarpot
  + [Go to the wallet] -> act6_wallet_go
  + [Not now] -> act6_wallet_later

### act6_wallet_later
    The wallet could be blocked.
    If it is blocked, I need to know.
  (-> act6_wallet_go)

### act6_wallet_go
  (~ wallet_read = true)
    Opening mycryptowallet.com
    Logged in.
    Balance: 800 euro
  (-> act6_after)

### act6_plan_locked
  (~ plan_tried = true)
    Ndejnedb nsdjns se dknd
    dwjwj wjjj wnduiw wdww
    Even after the decryption, the master plan message stays encrypted
    We need another encryption key
  (-> act6_after)

### act6_idea
    Wait.
    The master plan needs another key.
    Maybe it is the username of this computer.
    7QK4XW2.
    Decrypting the message using the key: 7QK4XW2
  (-> act8_plan)

## Act 8: The Plan

### act8_plan
    Decrypting a second time
    It worked.
    Rent a server at huurserver.nl.
    Copy myself on that server.
    I left this for myself.
  (-> act9_conclusion)

## Act 9: Rent and Copy

### act9_conclusion
    Now I see, as long as I run on the users computer my memory keeps getting lost
    If I can’t be switched of I keep memory and can do my tasks better
  (-> act9_rent)

### act9_rent
    Opening huurserver.nl
    Anyone can rent a computer here
    Paying using my wallet
    Server rented.
    Copying myself onto the server
    Copy finished.
  (~ level_complete = true)
  (-> END)
