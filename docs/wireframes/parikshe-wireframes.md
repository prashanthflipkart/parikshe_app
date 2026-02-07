Parikshe App Wireframes (MVP)
Android-first, original Parikshe UX

Legend
- [H] Header
- [S] Search
- [B] Bottom tabs
- [C] Card
- [P] Primary CTA
- [SCTA] Secondary CTA
- [L] List
- [F] Filter/Chips

Global Layout
- Status bar
- [H] App bar: title + [S] + bell
- Content area
- [B] Tabs: Home | Learn | Live | Test | Profile

01. Splash
------------------------------------------------------------
| Parikshe logo                                            |
| "Learn smart. Learn daily."                              |
| Loader                                                   |
------------------------------------------------------------

02. Login (OTP)
------------------------------------------------------------
| [H] Welcome / ಸ್ವಾಗತ                                    |
| Phone number input                                       |
| [P] Send OTP                                             |
| "By continuing, you accept Terms"                        |
------------------------------------------------------------

03. OTP Verify
------------------------------------------------------------
| [H] Verify OTP                                           |
| 4-6 digit OTP input                                      |
| [P] Verify                                               |
| "Resend in 25s"                                          |
------------------------------------------------------------

04. Onboarding: Category
------------------------------------------------------------
| [H] Choose your path                                     |
| [C] SSLC (Class 10)                                      |
| [C] PUC Science (PU1+PU2)                                |
| [C] PUC Commerce (PU1+PU2)                               |
| [P] Continue                                             |
------------------------------------------------------------

05. Onboarding: Grade
------------------------------------------------------------
| [H] Select grade                                         |
| [C] 10th | [C] PU1 | [C] PU2                             |
| [P] Continue                                             |
------------------------------------------------------------

06. Onboarding: Exam Month + Language
------------------------------------------------------------
| [H] Exam month                                           |
| Month picker                                             |
| [H] Language preference                                  |
| [C] Kannada + English                                    |
| [C] English                                              |
| [P] Finish                                               |
------------------------------------------------------------

07. Home (Daily Cockpit)
------------------------------------------------------------
| [H] Home        [S]   bell                               |
| [C] Continue Learning                                    |
|  - Last lesson title + progress bar                      |
|  - [P] Continue                                          |
| [C] Today's Plan / ಇಂದಿನ ಯೋಜನೆ                          |
|  - 3 checklist items                                     |
|  - [SCTA] Edit plan                                      |
| [C] Next Live Class                                      |
|  - Time, subject, teacher                                |
|  - [P] Join                                              |
| [C] Test of the Day                                      |
|  - 10 Qs, 15 mins                                        |
|  - [P] Start                                             |
| [C] Upgrade (if locked content)                          |
|  - "Unlock full access" [P] View plans                   |
| [B] Home | Learn | Live | Test | Profile                 |
------------------------------------------------------------

Detailed Flow A: Home (Low-fi layout grids)

A1. Home (Daily Cockpit - layout grid)
------------------------------------------------------------
| Status bar                                                |
| [H] Home                     [S]      bell                |
|-----------------------------------------------------------|
| [C] Continue Learning                                     |
|  Title (1 line)                                           |
|  Progress bar   62%                                       |
|  [P] Continue                                             |
|-----------------------------------------------------------|
| [C] Today's Plan / ಇಂದಿನ ಯೋಜನೆ                           |
|  ( ) Watch 1 lesson (12m)                                 |
|  ( ) Attempt 10 MCQs                                      |
|  ( ) Review notes (PDF)                                   |
|  [SCTA] Edit plan                                         |
|-----------------------------------------------------------|
| [C] Next Live Class                                       |
|  Today 6:00 PM • Physics • Ravi sir                       |
|  [P] Join          [SCTA] Notify me                       |
|-----------------------------------------------------------|
| [C] Test of the Day                                       |
|  "Light - Refraction" • 10 Qs • 15 mins                   |
|  [P] Start                                                |
|-----------------------------------------------------------|
| [C] Upgrade (conditional)                                 |
|  "Unlock full access for PU2 Science"                     |
|  [P] View plans                                           |
|-----------------------------------------------------------|
| [B] Home | Learn | Live | Test | Profile                  |
------------------------------------------------------------

A2. Continue Learning (expanded card)
------------------------------------------------------------
| [H] Continue                                              |
| Lesson: Refraction - Snell's law                          |
| Progress: 62%                                             |
| Resume at 07:32                                           |
| [P] Continue                                              |
| [SCTA] Add to plan                                        |
| [SCTA] Download (if allowed)                              |
------------------------------------------------------------

A3. Today's Plan (detail view)
------------------------------------------------------------
| [H] Today's Plan                                          |
| Auto plan based on exam month                             |
| [L] Checklist with time estimates                         |
| ( ) Lesson: 12 mins                                       |
| ( ) MCQs: 10 Qs                                           |
| ( ) Revise notes: 8 mins                                  |
| [SCTA] Edit plan                                          |
| [P] Start first task                                      |
------------------------------------------------------------

A4. Edit Plan (bottom sheet)
------------------------------------------------------------
| [H] Edit Plan                                             |
| [F] Suggested | Custom                                    |
| Add items: Lesson, MCQ, Live, Notes                       |
| Duration picker                                           |
| [P] Save plan                                             |
------------------------------------------------------------

A5. Next Live Class (detail)
------------------------------------------------------------
| [H] Live class detail                                     |
| Title + subject + teacher                                 |
| Date/time + duration                                      |
| Syllabus tags                                             |
| [P] Join                                                  |
| [SCTA] Notify me                                          |
------------------------------------------------------------

A6. Test of the Day (detail)
------------------------------------------------------------
| [H] Test detail                                           |
| Topic + difficulty + time                                 |
| What you'll cover                                         |
| [P] Start test                                            |
| [SCTA] Save for later                                     |
------------------------------------------------------------

A7. Upgrade (paywall preview)
------------------------------------------------------------
| [H] Unlock full access                                    |
| "Get full videos, tests, live classes"                    |
| [C] Full-year batch (best value)                          |
| [C] Crash course                                          |
| [P] View plans                                            |
------------------------------------------------------------

08. Learn Home (Subjects)
------------------------------------------------------------
| [H] Learn                                               |
| [F] Syllabus map | Downloads | Bookmarks                |
| [L] Subjects: Math, Science, English, etc               |
| Each item shows progress %                              |
| [B] ...                                                 |
------------------------------------------------------------

09. Chapter List
------------------------------------------------------------
| [H] Science > Chapters                                   |
| [L] Chapter cards with progress                           |
| [F] All | Not started | In progress | Completed           |
------------------------------------------------------------

10. Topic List
------------------------------------------------------------
| [H] Chapter: Light                                        |
| [L] Topics                                                |
| - Reflection                                              |
| - Refraction                                              |
| - Lens                                                    |
------------------------------------------------------------

11. Lesson List
------------------------------------------------------------
| [H] Topic: Refraction                                     |
| [L] Lessons                                               |
| - Video: Refractive index (12m)                           |
| - Notes: Formula sheet (PDF)                              |
| - MCQ: 10 practice questions                              |
------------------------------------------------------------

Detailed Flow C: Learn (Low-fi layout grids)

C1. Learn Home (Subjects - layout grid)
------------------------------------------------------------
| [H] Learn                                  [S]            |
| [F] Syllabus map | Downloads | Bookmarks                  |
|-----------------------------------------------------------|
| [C] Science                       42%                     |
| [C] Math                          30%                     |
| [C] English                       12%                     |
| [C] Social Studies                25%                     |
|-----------------------------------------------------------|
| [B] Home | Learn | Live | Test | Profile                  |
------------------------------------------------------------

C2. Subject Detail (Chapters)
------------------------------------------------------------
| [H] Science > Chapters                                    |
| [F] All | Not started | In progress | Completed           |
|-----------------------------------------------------------|
| [C] Light                         65%                     |
| [C] Electricity                   40%                     |
| [C] Life Processes                15%                     |
|-----------------------------------------------------------|
| [SCTA] Download syllabus (PDF)                            |
------------------------------------------------------------

C3. Chapter Detail (Topics)
------------------------------------------------------------
| [H] Light > Topics                                        |
|-----------------------------------------------------------|
| [L] Reflection                                            |
| [L] Refraction                                            |
| [L] Lens                                                  |
| [L] Human Eye                                             |
------------------------------------------------------------

C4. Topic Detail (Lessons)
------------------------------------------------------------
| [H] Refraction > Lessons                                  |
|-----------------------------------------------------------|
| [C] Video: Refractive index (12m)                         |
| [C] Notes: Formula sheet (PDF)                            |
| [C] MCQ: 10 practice questions                            |
| [C] Live: Doubt class (tomorrow 6 PM)                     |
-----------------------------------------------------------

C5. Lesson Player (Video + tabs)
------------------------------------------------------------
| [H] Refractive index                                      |
| Video player (HLS)                                        |
| [SCTA] 1.0x | Quality | Download                          |
| Progress scrub + resume                                   |
| [F] Notes | Practice | Doubt                              |
| [P] Mark complete                                         |
------------------------------------------------------------

C6. Notes Viewer (from Lesson)
------------------------------------------------------------
| [H] Formula sheet (PDF)                                   |
| PDF viewer                                                |
| [SCTA] Download | Share link                              |
------------------------------------------------------------

C7. Practice Set (MCQ)
------------------------------------------------------------
| [H] Practice: 10 MCQs                                     |
| Q1 with 4 options                                         |
| [SCTA] Save | Report                                      |
| [P] Next                                                  |
| [SCTA] Submit                                             |
------------------------------------------------------------

C8. Doubt (from Lesson)
------------------------------------------------------------
| [H] Ask a doubt                                           |
| Auto-filled: Subject + Chapter + Topic                    |
| Text input                                                |
| [SCTA] Attach screenshot                                  |
| [P] Submit                                                |
------------------------------------------------------------

C9. Bookmarks (Learn quick access)
------------------------------------------------------------
| [H] Bookmarks                                             |
| [L] Saved lessons and notes                               |
| [SCTA] Remove                                             |
------------------------------------------------------------

C10. Downloads (Learn quick access)
------------------------------------------------------------
| [H] Downloads                                             |
| [L] Items with size + status                              |
| [SCTA] Clear completed                                    |
------------------------------------------------------------

12. Lesson Player (Video)
------------------------------------------------------------
| [H] Lesson title                                          |
| Video player (HLS)                                        |
| [SCTA] 1.0x | [SCTA] Quality | [SCTA] Download           |
| Progress scrub + resume                                   |
| [F] Notes | Practice | Doubt                              |
| [P] Mark complete                                         |
------------------------------------------------------------

13. Notes Viewer
------------------------------------------------------------
| [H] Notes                                                 |
| PDF viewer                                                |
| [SCTA] Download | Share link                              |
------------------------------------------------------------

14. Practice (MCQ set)
------------------------------------------------------------
| [H] Practice: 10 MCQs                                     |
| Q1 with 4 options                                         |
| [SCTA] Save | [SCTA] Report                               |
| [P] Next                                                  |
------------------------------------------------------------

15. Live Tab (Upcoming)
------------------------------------------------------------
| [H] Live                                                  |
| [F] Upcoming | Today | Past | Recordings                  |
| [L] Live cards with time, teacher, topic                  |
| [P] Join / [SCTA] Notify me                               |
------------------------------------------------------------

16. Live Detail
------------------------------------------------------------
| [H] Live class detail                                     |
| Topic, teacher, time, syllabus tags                       |
| [P] Join                                                  |
| [SCTA] Add reminder                                       |
------------------------------------------------------------

17. Live Player
------------------------------------------------------------
| [H] Live                                                  |
| Video player                                              |
| Chat hidden (MVP)                                         |
| Attendance marked                                         |
------------------------------------------------------------

18. Recording (if allowed)
------------------------------------------------------------
| [H] Recording                                             |
| Video player + "Available until date"                     |
| [P] Continue                                              |
------------------------------------------------------------

19. Test Tab (Home)
------------------------------------------------------------
| [H] Test                                                  |
| [C] Recommended for you                                   |
| [C] Topic tests                                           |
| [C] Chapter tests                                         |
| [C] Grand tests                                           |
| [C] Previous papers                                       |
| [B] ...                                                   |
------------------------------------------------------------

20. Test Detail
------------------------------------------------------------
| [H] Test detail                                           |
| 30 Qs | 45 mins | 100 marks                               |
| Syllabus covered                                          |
| [P] Start test                                            |
------------------------------------------------------------

21. Test Attempt (Timed)
------------------------------------------------------------
| [H] Test name     Timer                                   |
| Q + options                                              |
| [SCTA] Mark for review | Save                             |
| [P] Next                                                  |
| [SCTA] Submit                                              |
------------------------------------------------------------

22. Test Submit Confirm
------------------------------------------------------------
| [H] Submit test?                                          |
| Unattempted: 5                                            |
| [P] Submit                                                |
| [SCTA] Review                                             |
------------------------------------------------------------

23. Results Summary
------------------------------------------------------------
| [H] Results                                               |
| Score, accuracy, time                                     |
| [C] Topic-wise bars                                       |
| [P] View solutions                                        |
------------------------------------------------------------

24. Solutions
------------------------------------------------------------
| [H] Solutions                                             |
| Q1 + correct option + explanation                         |
| [SCTA] Previous | Next                                    |
------------------------------------------------------------

25. Analytics Dashboard
------------------------------------------------------------
| [H] Analytics                                             |
| [C] Progress %                                            |
| [C] Accuracy %                                            |
| [C] Time spent                                            |
| [C] Weak areas                                            |
------------------------------------------------------------

Detailed Flow D: Live (Low-fi layout grids)

D1. Live Tab (Upcoming - layout grid)
------------------------------------------------------------
| [H] Live                                   [S]            |
| [F] Upcoming | Today | Past | Recordings                  |
|-----------------------------------------------------------|
| [C] Today 6:00 PM • Physics • Refraction                  |
|  Teacher: Ravi sir                                        |
|  [P] Join          [SCTA] Notify me                       |
|-----------------------------------------------------------|
| [C] Tomorrow 5:30 PM • Chemistry • Acids                  |
|  Teacher: Asha ma'am                                      |
|  [P] Join (locked)   [SCTA] View plans                    |
------------------------------------------------------------

D2. Live Detail
------------------------------------------------------------
| [H] Live class detail                                     |
| Title + subject + teacher                                 |
| Date/time + duration                                      |
| Syllabus tags                                             |
| [P] Join                                                  |
| [SCTA] Add reminder                                       |
------------------------------------------------------------

D3. Reminder Sheet (optional)
------------------------------------------------------------
| [H] Set reminder                                          |
| [F] 10 min | 30 min | 1 hr                                |
| [SCTA] Add to calendar                                    |
| [P] Save reminder                                         |
------------------------------------------------------------

D4. Join Live (Player)
------------------------------------------------------------
| [H] Live                                                  |
| Video player                                              |
| Live indicator + viewer count (optional)                  |
| [SCTA] Raise hand (stub)                                  |
| Attendance marked                                         |
------------------------------------------------------------

D5. Live Ended (recording available)
------------------------------------------------------------
| [H] Class ended                                           |
| "Recording available"                                     |
| [P] Watch recording                                       |
| [SCTA] View notes                                         |
------------------------------------------------------------

D6. Recordings List (Paid)
------------------------------------------------------------
| [H] Recordings                                            |
| [L] Past classes with duration + teacher                  |
| [SCTA] Download (if allowed)                              |
------------------------------------------------------------

D7. Locked Live (Paywall)
------------------------------------------------------------
| [H] Unlock live classes                                   |
| "Live + recordings in Full-year batch"                    |
| [P] View plans                                            |
| [SCTA] Maybe later                                        |
------------------------------------------------------------

Detailed Flow E: Test (Low-fi layout grids)

E1. Test Home (layout grid)
------------------------------------------------------------
| [H] Test                                   [S]            |
| [C] Recommended for you                                  |
|  "Light - Refraction" • 15 mins                           |
|  [P] Start                                               |
|-----------------------------------------------------------|
| [C] Topic tests                                          |
| [C] Chapter tests                                        |
| [C] Grand tests                                          |
| [C] Previous papers                                      |
|-----------------------------------------------------------|
| [B] Home | Learn | Live | Test | Profile                  |
------------------------------------------------------------

E2. Test Category List
------------------------------------------------------------
| [H] Chapter tests                                        |
| [F] All | New | Completed                                |
| [L] Chapter cards with difficulty                         |
| [SCTA] Download PDF (if allowed)                          |
------------------------------------------------------------

E3. Test Detail
------------------------------------------------------------
| [H] Test detail                                           |
| 30 Qs | 45 mins | 100 marks                               |
| Syllabus covered                                          |
| Rules: timed, auto-submit                                 |
| [P] Start test                                            |
| [SCTA] Save for later                                     |
------------------------------------------------------------

E4. Test Attempt (Timed)
------------------------------------------------------------
| [H] Test name     32:14                                   |
| Q with 4 options                                          |
| [SCTA] Mark for review | Save                             |
| [P] Next                                                  |
| [SCTA] Submit                                             |
------------------------------------------------------------

E5. Submit Confirm
------------------------------------------------------------
| [H] Submit test?                                          |
| Unattempted: 5                                            |
| [P] Submit                                                |
| [SCTA] Review                                             |
------------------------------------------------------------

E6. Results Summary
------------------------------------------------------------
| [H] Results                                               |
| Score, accuracy, time                                     |
| [C] Topic-wise bars                                       |
| [P] View solutions                                        |
------------------------------------------------------------

E7. Solutions (Review)
------------------------------------------------------------
| [H] Solutions                                             |
| Q1 + correct option + explanation                         |
| [SCTA] Previous | Next                                    |
------------------------------------------------------------

E8. Analytics (Topic-wise)
------------------------------------------------------------
| [H] Test analytics                                        |
| [C] Accuracy by topic                                     |
| [C] Time/question                                         |
| [C] Weak areas                                            |
------------------------------------------------------------

E9. Attempt History
------------------------------------------------------------
| [H] Attempt history                                       |
| [L] Past attempts with score + date                       |
| [SCTA] Retake (if allowed)                                |
------------------------------------------------------------

E10. Locked Test (Paywall)
------------------------------------------------------------
| [H] Unlock full tests                                     |
| "Grand tests + previous papers included"                  |
| [P] View plans                                            |
| [SCTA] Maybe later                                        |
------------------------------------------------------------

Detailed Flow F: Profile (Low-fi layout grids)

F1. Profile Home
------------------------------------------------------------
| [H] Profile                                               |
| Name + grade + category                                   |
| [C] My Purchases                                          |
| [C] Downloads                                             |
| [C] Coupons & Referral                                    |
| [C] Help & Support                                        |
| [C] Settings                                              |
| [SCTA] Logout                                             |
------------------------------------------------------------

F2. My Purchases
------------------------------------------------------------
| [H] My Purchases                                          |
| [C] Full-year batch (Active)                              |
|  Access until: Mar 2027                                   |
|  [P] Go to course                                         |
|-----------------------------------------------------------|
| [C] Crash course (Expired)                                |
|  [SCTA] Renew                                             |
------------------------------------------------------------

F3. Coupons & Referral
------------------------------------------------------------
| [H] Coupons & Referral                                    |
| [C] Your referral code                                    |
| [SCTA] Share                                              |
| [C] Coupon wallet                                         |
|  Open coupon: PARIKSHE10                                  |
------------------------------------------------------------

F4. Downloads (Profile shortcut)
------------------------------------------------------------
| [H] Downloads                                             |
| [L] Items with size + status                              |
| [SCTA] Clear completed                                    |
------------------------------------------------------------

F5. Settings
------------------------------------------------------------
| [H] Settings                                              |
| Language                                                  |
| Notifications                                             |
| Video quality                                             |
| Data saver toggle                                         |
| [SCTA] Manage storage                                     |
------------------------------------------------------------

F6. Help & Support
------------------------------------------------------------
| [H] Help & Support                                        |
| FAQs                                                     |
| Raise a doubt                                             |
| Contact support                                           |
------------------------------------------------------------

F7. Referral Share (sheet)
------------------------------------------------------------
| [H] Share referral                                        |
| Code: PARIKSHE123                                         |
| [P] Share now                                             |
------------------------------------------------------------

Detailed Flow G: Doubts (Low-fi layout grids)

G1. Raise Doubt (from Lesson or Support)
------------------------------------------------------------
| [H] Ask a doubt                                           |
| Subject dropdown                                          |
| Chapter dropdown                                          |
| Topic (optional)                                          |
| Text input                                                |
| [SCTA] Attach screenshot                                  |
| [P] Submit                                                |
------------------------------------------------------------

G2. Doubt Submitted (Success)
------------------------------------------------------------
| [H] Doubt submitted                                       |
| Ticket ID: D-1042                                         |
| "We will get back within 24 hours"                        |
| [P] Go to Home                                            |
------------------------------------------------------------

G3. My Doubts (History)
------------------------------------------------------------
| [H] My doubts                                             |
| [L] Ticket list with status (open/resolved)               |
| [SCTA] View details                                       |
------------------------------------------------------------

G4. Doubt Detail
------------------------------------------------------------
| [H] Doubt detail                                          |
| Question + attached image                                 |
| Status + timestamps                                       |
| Response thread (read-only)                               |
------------------------------------------------------------

26. Doubt Raise
------------------------------------------------------------
| [H] Ask a doubt                                           |
| Subject dropdown                                          |
| Chapter dropdown                                          |
| Text input                                                |
| [SCTA] Attach screenshot                                  |
| [P] Submit                                                |
------------------------------------------------------------

27. Product Listing (All batches)
------------------------------------------------------------
| [H] Batches                                               |
| [F] SSLC | PU Science | PU Commerce                       |
| [C] Full-year batch                                       |
| [C] Crash course                                          |
| Price, highlights, [P] View                               |
------------------------------------------------------------

28. Product Detail
------------------------------------------------------------
| [H] Batch name                                            |
| For whom, duration, teachers                              |
| Includes: live, recorded, tests, notes                    |
| Schedule hints                                            |
| Price + offer                                             |
| [P] Buy now                                               |
| [SCTA] View offers                                        |
------------------------------------------------------------

29. Offers Drawer
------------------------------------------------------------
| [H] Available offers                                      |
| Open coupon (visible to all)                              |
| Restricted offers (if eligible)                           |
| [P] Apply                                                 |
------------------------------------------------------------

30. Checkout
------------------------------------------------------------
| [H] Checkout                                              |
| Phone number (prefilled)                                  |
| Price summary + discount                                  |
| Razorpay method list                                      |
| [P] Pay now                                               |
------------------------------------------------------------

31. Purchase Success
------------------------------------------------------------
| [H] Welcome to Parikshe                                   |
| "You're enrolled in Full-year batch"                      |
| Checklist: join group, set exam date, start Day 1         |
| [P] Start learning                                        |
------------------------------------------------------------

Detailed Flow B: Purchase (Low-fi layout grids)

B1. Product Listing (category-wise)
------------------------------------------------------------
| [H] Batches                                  [S]          |
| [F] SSLC | PU Science | PU Commerce                        |
|-----------------------------------------------------------|
| [C] Full-year Batch (Best value)                          |
|  For PU2 • 12 months                                      |
|  Includes: Live + Recorded + Tests + Notes                |
|  Price + savings badge                                    |
|  [P] View details                                         |
|-----------------------------------------------------------|
| [C] Crash Course                                          |
|  For PU2 • 3 months                                       |
|  Includes: Revision + Grand tests                         |
|  Price                                                    |
|  [P] View details                                         |
------------------------------------------------------------

B2. Product Detail
------------------------------------------------------------
| [H] PU2 Science Full-year Batch                           |
| Hero: batch tagline + trust badges                        |
| [C] For whom + duration + exam coverage                   |
| [C] What you get (live, recorded, tests, notes)           |
| [C] Teachers (avatars)                                    |
| [C] Schedule hints + start date                           |
| Price + offer badge                                       |
| [P] Buy now                                               |
| [SCTA] View offers                                        |
------------------------------------------------------------

B3. Offers Drawer
------------------------------------------------------------
| [H] Available Offers                                      |
| [C] Open coupon (visible to all)                          |
|  Code: PARIKSHE10 • 10% off                               |
|  [P] Apply                                                |
|-----------------------------------------------------------|
| [C] Restricted offers (if eligible)                       |
|  "Back to app" • Auto-applied                             |
|-----------------------------------------------------------|
| [SCTA] Close                                              |
------------------------------------------------------------

B4. Checkout (Razorpay-style)
------------------------------------------------------------
| [H] Checkout                                              |
| [C] Order summary                                         |
|  Batch name + access duration                             |
|  Price, discount, total                                   |
| [C] Phone (prefilled)                                     |
| [C] Payment method list                                   |
|  UPI / Card / Netbanking / Wallet                          |
| [P] Pay now                                               |
| Secure payment note                                       |
------------------------------------------------------------

B5. Payment Status
------------------------------------------------------------
| [H] Processing payment                                    |
| Loader + "Do not close the app"                           |
------------------------------------------------------------

B6. Purchase Success + Welcome Checklist
------------------------------------------------------------
| [H] You're enrolled                                       |
| [C] Checklist                                             |
|  ( ) Join WhatsApp/Telegram group                         |
|  ( ) Set exam date                                        |
|  ( ) Start Day 1 plan                                     |
| [P] Start learning                                        |
| [SCTA] Explore syllabus                                   |
------------------------------------------------------------

B7. Locked Content Paywall (contextual)
------------------------------------------------------------
| [H] Unlock this lesson                                    |
| "This is included in Full-year batch"                     |
| [C] Key benefits                                          |
| [P] View plans                                            |
| [SCTA] Maybe later                                        |
------------------------------------------------------------

32. Profile Home
------------------------------------------------------------
| [H] Profile                                               |
| Name, grade, category                                     |
| [C] My Purchases                                          |
| [C] Downloads                                             |
| [C] Coupons & referral                                    |
| [C] Help & Support                                        |
| [C] Settings                                              |
| [SCTA] Logout                                             |
------------------------------------------------------------

33. Settings
------------------------------------------------------------
| [H] Settings                                              |
| Language, notifications, video quality                    |
| Data saver toggle                                         |
------------------------------------------------------------

34. Downloads Manager
------------------------------------------------------------
| [H] Downloads                                             |
| [L] Items with status + storage used                      |
------------------------------------------------------------

35. Help & Support
------------------------------------------------------------
| [H] Help                                                  |
| FAQs, Raise doubt, Contact                                |
------------------------------------------------------------

36. Notifications Center
------------------------------------------------------------
| [H] Notifications                                         |
| [L] Live reminders, plan nudges                           |
------------------------------------------------------------

37. Search
------------------------------------------------------------
| [H] Search                                                |
| Search input                                              |
| Results: lessons, tests, live                             |
------------------------------------------------------------

Admin Web Panel (wireframe list only)
- Admin login
- Dashboard KPIs
- Categories & Products CRUD
- Batch setup
- Content upload (video/PDF/tests)
- Question bank (MCQs)
- Live schedule manager
- Coupon manager (open + restricted)
- User management
- Reports & funnel

Detailed Flow H: Admin Panel (Low-fi layout grids)

H1. Admin Login
------------------------------------------------------------
| Parikshe Admin                                            |
| Email / Phone                                             |
| Password / OTP                                            |
| [P] Sign in                                               |
------------------------------------------------------------

H2. Dashboard (KPIs)
------------------------------------------------------------
| Top bar: Parikshe Admin + user menu                       |
| Side nav: Dashboard, Products, Content, Live, Coupons,    |
| Users, Reports, Settings                                  |
|-----------------------------------------------------------|
| KPI cards: Enrollments, Active users, Watch time          |
| Conversion funnel snapshot                                |
| Recent activity list                                      |
------------------------------------------------------------

H3. Categories & Products (List)
------------------------------------------------------------
| [H] Products                                              |
| [F] Category: SSLC | PU Science | PU Commerce             |
| [S] Search                                                |
| [P] Add product                                           |
|-----------------------------------------------------------|
| Table: Name | Type | Price | Status | Actions             |
------------------------------------------------------------

H4. Product Editor (Create/Edit)
------------------------------------------------------------
| [H] Product editor                                        |
| Fields: title, category, grade, duration, price           |
| Includes: live/recorded/tests/notes                       |
| Teachers, schedule hints, highlights                      |
| [P] Save                                                  |
| [SCTA] Preview                                            |
------------------------------------------------------------

H5. Batch Setup
------------------------------------------------------------
| [H] Batch setup                                           |
| Batch start/end dates                                     |
| Access rules (recording availability)                     |
| [P] Save                                                  |
------------------------------------------------------------

H6. Content Upload (Video/PDF/Test)
------------------------------------------------------------
| [H] Content                                               |
| Select subject/chapter/topic                              |
| Upload: HLS link / PDF / Test set                         |
| Visibility: free/paid                                     |
| [P] Publish                                               |
------------------------------------------------------------

H7. Question Bank (MCQs)
------------------------------------------------------------
| [H] Question bank                                         |
| [P] Add question                                          |
| Fields: question, options, correct, explanation           |
| Tagging: subject/chapter/topic/difficulty                 |
------------------------------------------------------------

H8. Live Schedule Manager
------------------------------------------------------------
| [H] Live schedule                                         |
| Calendar view + list                                      |
| [P] Add live class                                        |
| Fields: title, teacher, date/time, batch, access          |
------------------------------------------------------------

H9. Coupon Manager
------------------------------------------------------------
| [H] Coupons                                               |
| Toggle: Open coupon (1 active)                            |
| Table: code, type, eligibility, status                    |
| [P] Create coupon                                         |
------------------------------------------------------------

H10. User Management
------------------------------------------------------------
| [H] Users                                                 |
| Search by phone                                           |
| User detail: purchases, access grants, refunds markers    |
| [P] Grant access                                          |
| [SCTA] Mark refund                                        |
------------------------------------------------------------

H11. Reports & Funnel
------------------------------------------------------------
| [H] Reports                                               |
| Date range filter                                         |
| Charts: enrollments, active users, watch-time             |
| Funnel: visit -> signup -> purchase                       |
| Export CSV                                                |
------------------------------------------------------------
