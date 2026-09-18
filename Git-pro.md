# Git Branching, Merging, Revert & Restore
## 3-Hour Hands-On Lab

### Lab Objective

By the end of this 3-hour hands-on lab, students will be able to:

- Create a Git repository from a new project folder
- Create and switch between branches
- Understand `main` and feature branches
- Make commits on different branches
- Merge a feature branch into `main`
- Understand fast-forward and non-fast-forward merges
- Create and resolve a simple merge conflict
- Use `git revert` to safely undo a committed change
- Use `git restore` to discard working-directory changes
- Use `git restore --staged` to unstage files
- Check branch and commit history
- Push the final repository to GitHub

---

# 1. Lab Duration

**Total Duration: 3 Hours**

| Time | Topic |
|---|---|
| 0:00 - 0:20 | Git repository setup and basic workflow |
| 0:20 - 0:55 | Branch creation and branch switching |
| 0:55 - 1:30 | Branch merging |
| 1:30 - 1:55 | Merge conflict hands-on |
| 1:55 - 2:20 | `git revert` |
| 2:20 - 2:45 | `git restore` and `git restore --staged` |
| 2:45 - 3:00 | Final challenge + GitHub push |

---

# 2. Requirements

Install Git before starting.

Check Git installation:

```bash
git --version
```

You should see something similar to:

```text
git version 2.x.x
```

Create a new folder for this lab.

Example:

```bash
mkdir git-branch-lab
cd git-branch-lab
```

Windows users can also create the folder normally and open Git Bash / PowerShell inside the folder.

---

# 3. Important Git Concept

A branch is a separate line of development.

Example:

```text
main
  |
  |---- commit A
  |
  |---- commit B
             \
              feature-login
```

The `main` branch can contain the stable project.

A feature branch can be used to develop a new feature without directly changing `main`.

Typical workflow:

```text
main
  |
  +---- feature-login
  |
  +---- feature-dashboard
```

After the feature is completed:

```text
feature-login
      |
      v
    MERGE
      |
      v
    main
```

---

# PART 1 — CREATE THE PROJECT

## 4. Create the Project Folder

Create a new folder:

```bash
mkdir git-branch-lab
cd git-branch-lab
```

Check the current location:

```bash
pwd
```

Windows PowerShell users can use:

```powershell
Get-Location
```

---

## 5. Initialize Git

Run:

```bash
git init
```

Expected output will be similar to:

```text
Initialized empty Git repository...
```

Git creates a hidden `.git` folder.

Check status:

```bash
git status
```

---

## 6. Configure Git Username and Email

Check current configuration:

```bash
git config --global --list
```

If username/email are not configured:

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

Check again:

```bash
git config --global --list
```

---

# 7. Create the First Project Files

Create these files:

```text
index.html
style.css
app.js
```

Example `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Git Branch Lab</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Git Branching Lab</h1>
    <p>Learning Git branches.</p>
</body>
</html>
```

Example `style.css`:

```css
body {
    font-family: Arial;
    margin: 40px;
}
```

Example `app.js`:

```javascript
console.log("Git Branch Lab");
```

Check files:

```bash
ls
```

Windows PowerShell:

```powershell
dir
```

---

# 8. Check Git Status

Run:

```bash
git status
```

You should see the files as untracked.

Example:

```text
Untracked files:
    index.html
    style.css
    app.js
```

---

# 9. Add Files to Staging Area

Run:

```bash
git add .
```

Check:

```bash
git status
```

The files should now appear under:

```text
Changes to be committed
```

---

# 10. Create the First Commit

Run:

```bash
git commit -m "Initial project setup"
```

Check history:

```bash
git log --oneline
```

Example:

```text
a1b2c3d Initial project setup
```

---

# 11. Check Current Branch

Run:

```bash
git branch
```

Depending on Git configuration, the branch may be called `master` or `main`.

If it is `master`, rename it to `main`:

```bash
git branch -M main
```

Check:

```bash
git branch
```

Expected:

```text
* main
```

---

# PART 2 — BRANCH CREATION

## 12. Why Do We Need Branches?

Suppose the company has a website.

The production code is stored in:

```text
main
```

Now the developer needs to create a login page.

Instead of directly changing `main`, create:

```text
feature-login
```

The developer works on the feature branch.

After testing:

```text
feature-login → main
```

This is the basic branch workflow.

---

# 13. Create a New Branch

Run:

```bash
git branch feature-login
```

Check branches:

```bash
git branch
```

Example:

```text
  feature-login
* main
```

The branch has been created, but you are still on `main`.

---

# 14. Switch to the Feature Branch

Run:

```bash
git switch feature-login
```

Check:

```bash
git branch
```

Expected:

```text
* feature-login
  main
```

The `*` shows the current branch.

---

# 15. Create Login Feature

Create a new file:

```text
login.html
```

Example:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
</head>
<body>
    <h1>Login Page</h1>

    <form>
        <input type="text" placeholder="Username">
        <input type="password" placeholder="Password">
        <button type="submit">Login</button>
    </form>
</body>
</html>
```

Check:

```bash
git status
```

Add the file:

```bash
git add login.html
```

Commit:

```bash
git commit -m "Add login page"
```

Check history:

```bash
git log --oneline --all --graph
```

---

# 16. IMPORTANT PRACTICE

Switch back to `main`:

```bash
git switch main
```

List files:

```bash
ls
```

Notice that `login.html` is not present on `main`.

Now switch back:

```bash
git switch feature-login
```

List files:

```bash
ls
```

`login.html` is now present.

### Key Point

A commit made on a feature branch does not automatically appear on another branch.

It must be merged.

---

# 17. PRACTICE TASK 1 — Branch Creation

Students must perform the following without copying the previous commands exactly.

### Problem

Create a branch called:

```text
feature-contact
```

Switch to it.

Create:

```text
contact.html
```

Add:

```html
<h1>Contact Us</h1>
```

Commit it with:

```text
Add contact page
```

Check the branch and commit history.

### Expected workflow

```bash
git branch feature-contact
git switch feature-contact
git add contact.html
git commit -m "Add contact page"
git log --oneline --all --graph
```

---

# PART 3 — BRANCH MERGING

## 18. What Does Merge Mean?

Merge means combining changes from one branch into another branch.

Example:

```text
main
 |
 A
 |
 B

feature-login
 |
 C
 |
 D
```

After merging:

```text
main
 |
 A
 |
 B
 |
 C
 |
 D
```

The feature becomes part of `main`.

---

# 19. Merge the Login Branch

First switch to `main`:

```bash
git switch main
```

Check:

```bash
git branch
```

You should see:

```text
* main
  feature-login
```

Now merge:

```bash
git merge feature-login
```

Git may display:

```text
Fast-forward
```

This is called a fast-forward merge.

---

# 20. Verify the Merge

Check files:

```bash
ls
```

You should now see:

```text
index.html
style.css
app.js
login.html
```

Check history:

```bash
git log --oneline --all --graph
```

Check status:

```bash
git status
```

---

# 21. Understand Fast-Forward Merge

A fast-forward merge can happen when `main` has not changed after the feature branch was created.

Example:

```text
A---B main
     \
      C---D feature-login
```

After merging:

```text
A---B---C---D main
```

No separate merge commit is required.

---

# 22. PRACTICE TASK 2 — Merge

### Problem

Create a branch:

```text
feature-about
```

Switch to it.

Create:

```text
about.html
```

Add:

```html
<h1>About Our Company</h1>
<p>We build technology solutions.</p>
```

Commit:

```text
Add about page
```

Switch to `main`.

Merge `feature-about`.

Verify that `about.html` exists on `main`.

### Commands

```bash
git branch feature-about
git switch feature-about
git add about.html
git commit -m "Add about page"
git switch main
git merge feature-about
```

---

# PART 4 — CREATE A REAL MERGE COMMIT

## 23. Why Can a Merge Commit Happen?

A merge commit is commonly created when both branches have new commits after they separated.

Example:

```text
       C---D feature
      /
A---B
      \
       E---F main
```

Git cannot simply move the `main` pointer forward.

Git needs to combine the two lines.

---

# 24. Create a Feature Branch

Make sure you are on `main`:

```bash
git switch main
```

Create:

```bash
git branch feature-dashboard
git switch feature-dashboard
```

Create:

```text
dashboard.html
```

Add:

```html
<h1>Dashboard</h1>
<p>Dashboard feature is under development.</p>
```

Commit:

```bash
git add dashboard.html
git commit -m "Add dashboard page"
```

---

# 25. Make Another Change on Main

Switch to main:

```bash
git switch main
```

Edit `index.html`.

Change:

```html
<p>Learning Git branches.</p>
```

to:

```html
<p>Learning Git branches and merging.</p>
```

Commit:

```bash
git add index.html
git commit -m "Update home page"
```

Now both branches have different commits.

---

# 26. Merge Dashboard

Run:

```bash
git merge feature-dashboard
```

Git may create a merge commit.

Check:

```bash
git log --oneline --graph --all
```

This graph helps you understand how branches were combined.

---

# PART 5 — MERGE CONFLICT HANDS-ON

## 27. What Is a Merge Conflict?

A merge conflict occurs when Git cannot automatically decide which version of a change should be kept.

We will intentionally create one.

---

# 28. Create Conflict Branch

Switch to main:

```bash
git switch main
```

Create:

```bash
git switch -c feature-header
```

Open `index.html`.

Change:

```html
<h1>Git Branching Lab</h1>
```

to:

```html
<h1>Welcome to Our Website</h1>
```

Save the file.

Commit:

```bash
git add index.html
git commit -m "Update website heading"
```

---

# 29. Change the Same Line on Main

Switch to main:

```bash
git switch main
```

Open `index.html`.

Change the same heading to:

```html
<h1>Git and GitHub Training</h1>
```

Save.

Commit:

```bash
git add index.html
git commit -m "Update main heading"
```

---

# 30. Attempt the Merge

Run:

```bash
git merge feature-header
```

Git should report a conflict.

You may see:

```text
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.
```

---

# 31. Check Conflict Status

Run:

```bash
git status
```

You should see `index.html` as unmerged.

---

# 32. Open the Conflicted File

You may see:

```text
<<<<<<< HEAD
<h1>Git and GitHub Training</h1>
=======
<h1>Welcome to Our Website</h1>
>>>>>>> feature-header
```

Meaning:

```text
<<<<<<< HEAD
Current branch version
=======
Incoming branch version
>>>>>>> feature-header
```

---

# 33. Resolve the Conflict

Decide which content should remain.

For this exercise, keep:

```html
<h1>Welcome to Our Website</h1>
```

Delete all conflict markers:

```text
<<<<<<< HEAD
=======
>>>>>>> feature-header
```

The final file should contain only valid HTML.

---

# 34. Complete the Merge

Run:

```bash
git add index.html
```

Then:

```bash
git commit -m "Resolve header merge conflict"
```

Check:

```bash
git status
```

Expected:

```text
nothing to commit, working tree clean
```

Check history:

```bash
git log --oneline --graph --all
```

---

# 35. TROUBLESHOOTING — MERGE CONFLICT

### Problem

You started a merge and want to cancel it.

Use:

```bash
git merge --abort
```

This returns the repository to the state before the merge.

Check:

```bash
git status
```

---

### Problem

You do not know which files have conflicts.

Run:

```bash
git status
```

Git will identify the conflicted files.

---

### Problem

You fixed the file but Git still says conflict exists.

Make sure you staged the resolved file:

```bash
git add index.html
```

Then commit:

```bash
git commit -m "Resolve merge conflict"
```

---

# PART 6 — GIT REVERT

## 36. What Is `git revert`?

`git revert` is used to undo the effect of an existing commit.

Important:

`git revert` does NOT delete the old commit.

Instead, Git creates a **new commit** that reverses the changes.

Example:

```text
A → B → C
```

If C is reverted:

```text
A → B → C → D
```

D reverses C.

This is safer for shared branches because the existing history remains.

---

# 37. Create a Change to Revert

On `main`, create:

```text
announcement.html
```

Add:

```html
<h1>Special Announcement</h1>
<p>New website feature released.</p>
```

Check:

```bash
git status
```

Add:

```bash
git add announcement.html
```

Commit:

```bash
git commit -m "Add announcement page"
```

Check:

```bash
git log --oneline
```

---

# 38. Revert the Commit

Find the commit ID:

```bash
git log --oneline
```

Example:

```text
abcd123 Add announcement page
```

Revert it:

```bash
git revert abcd123
```

Git may open an editor for the revert commit message.

Save and close the editor.

Or, depending on your Git setup, you can use:

```bash
git revert --no-edit abcd123
```

Check:

```bash
git log --oneline
```

You should now see both:

```text
Revert "Add announcement page"
Add announcement page
```

The original commit remains in history.

---

# 39. Verify Revert

Check files:

```bash
ls
```

`announcement.html` should no longer be present in the working tree.

Check:

```bash
git status
```

---

# 40. IMPORTANT — Revert vs Delete Commit

Do not confuse:

```bash
git revert
```

with:

```bash
git reset
```

For this lab, use `git revert` when you want to safely undo an already committed change, especially on a shared branch.

---

# PART 7 — GIT RESTORE

## 41. What Is `git restore`?

`git restore` is mainly used to restore files to another Git version.

The most common beginner use is:

> Discard changes made to a tracked file in the working directory.

Example:

```text
Last committed file
        ↓
Modify file
        ↓
Do not want the modification
        ↓
git restore filename
```

---

# 42. Create a Change

Open:

```text
index.html
```

Add:

```html
<p>This line is only for testing restore.</p>
```

Do NOT commit it.

Check:

```bash
git status
```

You should see:

```text
modified: index.html
```

---

# 43. Discard the Change

Run:

```bash
git restore index.html
```

Check:

```bash
git status
```

The modification should disappear.

Open `index.html`.

The test line should be gone.

---

# 44. Restore Multiple Files

Modify:

```text
index.html
style.css
app.js
```

Check:

```bash
git status
```

Discard changes:

```bash
git restore .
```

Check:

```bash
git status
```

The uncommitted modifications should be gone.

### WARNING

`git restore .` discards uncommitted working-directory changes.

Do not use it if you need those changes.

---

# PART 8 — GIT RESTORE --STAGED

## 45. What Does `git restore --staged` Do?

It removes a file from the staging area.

It does NOT normally delete your file or discard its working-directory changes.

Example:

```text
File
 ↓
git add
 ↓
Staged
 ↓
git restore --staged
 ↓
Unstaged
```

---

# 46. Hands-On Staging Exercise

Create:

```text
test.html
```

Add:

```html
<h1>Testing Git Staging</h1>
```

Check:

```bash
git status
```

Stage it:

```bash
git add test.html
```

Check:

```bash
git status
```

It should appear under:

```text
Changes to be committed
```

---

# 47. Unstage the File

Run:

```bash
git restore --staged test.html
```

Check:

```bash
git status
```

Now `test.html` should be unstaged.

The file still exists.

This is the important difference:

```text
git restore filename
```

→ Discard working-directory changes.

```text
git restore --staged filename
```

→ Remove file from staging area.

---

# 48. Comparison

| Command | Purpose |
|---|---|
| `git restore file` | Discard working-directory changes |
| `git restore --staged file` | Unstage a file |
| `git revert COMMIT_ID` | Create a new commit that reverses an old commit |
| `git merge branch` | Combine another branch into current branch |

---

# PART 9 — FINAL HANDS-ON CHALLENGE

## 49. Student Challenge

Complete the following without looking at the previous examples.

### Step 1

Make sure you are on:

```text
main
```

Check:

```bash
git branch
```

---

### Step 2

Create a branch:

```text
feature-profile
```

Switch to it.

---

### Step 3

Create:

```text
profile.html
```

Add:

```html
<h1>Student Profile</h1>
<p>Name: Your Name</p>
<p>Role: DevOps Learner</p>
```

---

### Step 4

Commit:

```text
Add profile page
```

---

### Step 5

Switch to `main`.

Confirm that `profile.html` is not available before merging if the branch has not yet been merged.

---

### Step 6

Merge:

```text
feature-profile
```

---

### Step 7

Create:

```text
services.html
```

Add:

```html
<h1>Our Services</h1>
<ul>
    <li>Cloud</li>
    <li>DevOps</li>
    <li>Data Analytics</li>
</ul>
```

Commit it.

---

### Step 8

Use:

```bash
git log --oneline --graph --all
```

Identify the commit ID for the services page.

---

### Step 9

Revert the services commit.

Confirm that the services page change has been reversed.

---

### Step 10

Modify `index.html`.

Add a temporary line:

```html
<p>Temporary testing change</p>
```

Do not commit.

Use:

```bash
git restore index.html
```

Confirm the temporary change has disappeared.

---

### Step 11

Create:

```text
practice.html
```

Stage it:

```bash
git add practice.html
```

Then unstage it:

```bash
git restore --staged practice.html
```

Confirm using:

```bash
git status
```

---

# PART 10 — FINAL GIT STATUS CHECK

Before finishing the lab:

```bash
git status
```

Ideally:

```text
nothing to commit, working tree clean
```

Check branches:

```bash
git branch
```

Check complete history:

```bash
git log --oneline --graph --all
```

---

# PART 11 — OPTIONAL GITHUB PUSH

## 50. Create a GitHub Repository

Create a new empty repository on GitHub.

Recommended:

```text
Repository name: git-branch-lab
```

For this exercise, create the GitHub repository without adding another README if your local project already has commits.

---

## 51. Connect Local Repository to GitHub

Copy the repository URL from GitHub.

Example:

```bash
git remote add origin https://github.com/YOUR-USERNAME/git-branch-lab.git
```

Check:

```bash
git remote -v
```

---

## 52. Push Main Branch

Make sure you are on main:

```bash
git switch main
```

Push:

```bash
git push -u origin main
```

Refresh GitHub and verify the files.

---

# PART 12 — COMMON TROUBLESHOOTING

## Problem 1 — `fatal: not a git repository`

### Cause

You are not inside the Git project folder.

### Check

```bash
pwd
```

Then:

```bash
ls
```

Look for the `.git` folder.

Move into the correct project folder:

```bash
cd git-branch-lab
```

Then:

```bash
git status
```

---

# Problem 2 — Branch already exists

Error:

```text
fatal: a branch named 'feature-login' already exists
```

Check branches:

```bash
git branch
```

If the branch already exists, simply switch:

```bash
git switch feature-login
```

---

# Problem 3 — Wrong branch

Check:

```bash
git branch
```

The `*` shows the current branch.

Example:

```text
* feature-login
  main
```

Switch to main:

```bash
git switch main
```

---

# Problem 4 — Git says working tree has changes when switching

You may see:

```text
Your local changes would be overwritten by checkout
```

First check:

```bash
git status
```

If you want to keep the changes, commit them:

```bash
git add .
git commit -m "Save current work"
```

If the changes are unwanted:

```bash
git restore .
```

Then switch:

```bash
git switch main
```

---

# Problem 5 — Merge conflict

Check:

```bash
git status
```

Open the conflicted file.

Look for:

```text
<<<<<<<
=======
>>>>>>>
```

Choose the correct content.

Remove the conflict markers.

Then:

```bash
git add .
git commit -m "Resolve merge conflict"
```

---

# Problem 6 — I want to cancel the merge

Use:

```bash
git merge --abort
```

Then:

```bash
git status
```

---

# Problem 7 — Push rejected because GitHub has newer commits

You may see:

```text
rejected
non-fast-forward
```

First get the remote changes:

```bash
git pull origin main
```

If Git reports unrelated histories:

```bash
git pull origin main --allow-unrelated-histories
```

Resolve conflicts if required.

Then:

```bash
git add .
git commit -m "Resolve merge conflict"
git push origin main
```

Avoid using:

```bash
git push --force
```

unless you specifically understand why rewriting the remote history is necessary.

---

# Problem 8 — I committed to the wrong branch

First check:

```bash
git branch
```

Do not immediately delete or reset anything.

If the commit is local and you need to move it to another branch, stop and inspect:

```bash
git log --oneline --all --graph
```

Then decide whether the commit should remain on the current branch or be moved.

---

# PART 13 — COMMAND CHEAT SHEET

## Repository

```bash
git init
git status
git log --oneline
git log --oneline --graph --all
```

## Branch

```bash
git branch
git branch branch-name
git switch branch-name
git switch -c branch-name
git branch -M main
```

## Merge

```bash
git switch main
git merge branch-name
git merge --abort
```

## Stage and Commit

```bash
git add filename
git add .
git commit -m "Commit message"
```

## Revert

```bash
git log --oneline
git revert COMMIT_ID
```

## Restore

```bash
git restore filename
git restore .
git restore --staged filename
```

## Remote / GitHub

```bash
git remote -v
git remote add origin REPOSITORY_URL
git push -u origin main
git pull origin main
```

---

# PART 14 — FINAL CONCEPT CHECK

Students should be able to explain these questions after the lab.

### Question 1

What is a branch?

### Question 2

Why do developers create feature branches?

### Question 3

What is the difference between:

```bash
git branch feature-login
```

and:

```bash
git switch feature-login
```

### Question 4

What does this do?

```bash
git merge feature-login
```

### Question 5

What is a fast-forward merge?

### Question 6

What causes a merge conflict?

### Question 7

How do you cancel an ongoing merge?

```bash
git merge --abort
```

### Question 8

What is the purpose of:

```bash
git revert COMMIT_ID
```

### Question 9

What is the difference between:

```bash
git restore file
```

and:

```bash
git restore --staged file
```

### Question 10

Why should you understand the difference between `revert`, `restore`, and `merge`?

---

# FINAL WORKFLOW TO REMEMBER

```text
CREATE PROJECT
      ↓
git init
      ↓
CREATE FILES
      ↓
git add .
      ↓
git commit
      ↓
CREATE FEATURE BRANCH
      ↓
git switch -c feature-name
      ↓
DEVELOP FEATURE
      ↓
git add .
      ↓
git commit
      ↓
SWITCH TO MAIN
      ↓
git switch main
      ↓
MERGE FEATURE
      ↓
git merge feature-name
      ↓
IF CONFLICT
      ↓
FIX FILE
      ↓
git add .
      ↓
git commit
      ↓
IF COMMITTED CHANGE MUST BE UNDONE
      ↓
git revert COMMIT_ID
      ↓
IF UNCOMMITTED FILE CHANGE MUST BE DISCARDED
      ↓
git restore file
      ↓
IF FILE MUST BE REMOVED FROM STAGING
      ↓
git restore --staged file
      ↓
PUSH TO GITHUB
      ↓
git push -u origin main
```

# END OF 3-HOUR GIT HANDS-ON LAB
