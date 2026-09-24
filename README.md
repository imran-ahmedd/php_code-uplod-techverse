# Tech Verse — Termux থেকে GitHub Project Upload

<p align="center">
  <img src="assets/platform-logo.png" alt="Tech Verse Logo" width="180">
</p>

<p align="center">
  <strong>Build • Code • Learn • Deploy</strong><br>
  <sub>Build, Code & Deploy Websites and Apps Directly from Termux.</sub>
</p>

<p align="center">
  <a href="https://tvsites.vercel.app">Website</a> •
  <a href="https://youtube.com/@imran.ahmedd">YouTube</a> •
  <a href="https://www.facebook.com/irnahmed360">Facebook</a> •
  <a href="https://github.com/Imran-s-Project">GitHub</a>
</p>

---

## 🚀 Welcome to Tech Verse

Termux থেকে GitHub-এ নিজের project publish করতে চাইলে এই guide-টি আপনার জন্য।

এখানে শুরু থেকে শেষ পর্যন্ত একটি mobile-friendly workflow দেওয়া হয়েছে—Termux প্রস্তুত করা, Git configure করা, project commit করা, GitHub repository-তে connect করা এবং শেষে project push করা পর্যন্ত।

**দুটি upload workflow আছে:**

- **HTTPS + Personal Access Token** — সহজ ও পরিচিত পদ্ধতি
- **SSH Key** — একবার setup করার পর বারবার authentication না দিয়েই কাজ করার জন্য

> **Goal:** কম command, পরিষ্কার workflow এবং copy-paste friendly setup।

---

## 🏷️ Platform Information

| Item | Details |
|---|---|
| **Platform** | Tech Verse |
| **Website** | https://tvsites.vercel.app |
| **Support Email** | tv.support.info@gmail.com |
| **YouTube** | https://youtube.com/@imran.ahmedd |
| **Facebook** | https://www.facebook.com/irnahmed360 |
| **GitHub** | https://github.com/Imran-s-Project |

---

## 🖼️ Brand Assets

Project-এর logo, banner, favicon এবং profile image আলাদা রাখতে `assets/` folder ব্যবহার করুন।

### Recommended Asset Layout

```text
assets/
├── platform-logo.png
├── text-logo.png
├── platform-banner.png
├── favicon.png
└── profile.png
```

### Platform Logo

<p align="center">
  <img src="assets/platform-logo.png" alt="Tech Verse Platform Logo" width="240">
</p>

### Text Logo

<p align="center">
  <img src="assets/text-logo.png" alt="Tech Verse Text Logo" width="420">
</p>

### Platform Banner

<p align="center">
  <img src="assets/platform-banner.png" alt="Tech Verse Platform Banner" width="900">
</p>

> **Image standard:** সম্ভব হলে PNG/WebP format ব্যবহার করুন এবং image-এর original quality ধরে রাখুন। README-তে relative path ব্যবহার করলে GitHub project-এর ভেতর থেকেই image load হবে।

---

## ✅ Before You Start

কাজ শুরু করার আগে নিচের বিষয়গুলো ready রাখুন:

**Termux**  
আপনার Android device-এ Termux install করা থাকতে হবে। Updated version ব্যবহার করুন।

**GitHub Account**  
যে GitHub account-এ project publish করবেন, সেটিতে sign in করা থাকতে হবে।

**Internet Connection**  
GitHub authentication এবং project push করার সময় active internet connection প্রয়োজন।

---

# 🟢 Method 1 — HTTPS + Personal Access Token

এটি GitHub-এ project push করার standard HTTPS workflow।

## Step 1 — GitHub Token তৈরি করুন

GitHub account-এ login করে:

**Settings → Developer settings → Personal access tokens → Tokens (classic)**

তারপর একটি নতুন token তৈরি করুন।

Recommended setup:

- **Note:** `Termux-Access`
- **Expiration:** আপনার প্রয়োজন অনুযায়ী
- **Scope:** project access-এর জন্য প্রয়োজনীয় `repo` permission

Token তৈরি হওয়ার পর সেটি **একবারই নিরাপদ জায়গায় copy করে রাখুন**।

> ⚠️ **Security:** Personal Access Token আপনার password-এর মতোই sensitive credential। এটি README, screenshot, public repository বা কারও সাথে share করবেন না।

---

## Step 2 — Termux Ready করুন

Termux খুলে একে একে চালান:

```bash
pkg update && pkg upgrade -y
pkg install git -y
termux-setup-storage
git config --global --add safe.directory /storage/emulated/0/Acode
```

Storage permission চাইলে **Allow** দিন।

---

## Step 3 — Git Identity সেট করুন

GitHub username ও email configure করুন:

```bash
git config --global user.name "YOUR_GITHUB_USERNAME"
git config --global user.email "YOUR_EMAIL@example.com"
```

### Example

```bash
git config --global user.name "Imran-s-Project"
git config --global user.email "your-email@example.com"
```

> Git identity project author information-এর জন্য ব্যবহার হয়। এটি GitHub login password নয়।

---

## Step 4 — Project Initialize করুন

আপনার project folder-এ যান:

```bash
cd /storage/emulated/0/Acode
```

তারপর:

```bash
git init
git add .
git commit -m "Initial Commit - Smart Upload"
git branch -M main
```

### যদি পুরোনো Git history মুছে নতুন করে শুরু করতে চান

```bash
rm -rf .git
git init
git add .
git commit -m "Initial Commit - Smart Upload"
git branch -M main
```

> ⚠️ `rm -rf .git` ব্যবহার করলে ওই folder-এর পুরোনো local Git history মুছে যাবে। প্রয়োজন না হলে এটি ব্যবহার করবেন না।

---

## Step 5 — GitHub Repository Connect করুন

প্রথমে GitHub-এ একটি repository তৈরি করুন।

তারপর HTTPS remote যোগ করুন:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

এরপর push করুন:

```bash
git push -u origin main
```

প্রয়োজনে GitHub authentication চাইলে আপনার account-এর configured credential/token ব্যবহার করুন।

---

## 🔵 Method 2 — SSH Key

বারবার HTTPS authentication এড়াতে SSH ব্যবহার করতে পারেন।

## Step 1 — OpenSSH Install করুন

```bash
pkg install openssh -y
```

## Step 2 — SSH Key তৈরি করুন

```bash
ssh-keygen -t ed25519 -C "YOUR_EMAIL@example.com"
```

Prompt এলে আপনার প্রয়োজন অনুযায়ী path/password দিন। সহজ setup-এর জন্য default path রাখা যায়।

---

## Step 3 — Public Key দেখুন

```bash
cat ~/.ssh/id_ed25519.pub
```

স্ক্রিনে যে পুরো `ssh-ed25519 ...` line দেখাবে, সেটি copy করুন।

তারপর GitHub-এ:

**Settings → SSH and GPG keys → New SSH key**

Public key paste করে **Add SSH key** নির্বাচন করুন।

---

## Step 4 — SSH Remote দিয়ে Project Push করুন

Project folder-এ ফিরে:

```bash
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

প্রথমবার GitHub host verification চাইলে prompt অনুযায়ী confirm করুন।

---

# 🔄 Future Updates — নতুন পরিবর্তন Push করা

একবার repository connect হয়ে গেলে পরবর্তী update সাধারণত অনেক সহজ:

```bash
cd /storage/emulated/0/Acode
git add .
git commit -m "Update project"
git push
```

এতেই আপনার latest changes GitHub repository-তে চলে যাবে।

---

# ⚠️ Troubleshooting

## `fatal: not a git repository`

**কারণ:** আপনি Git repository initialize করেননি অথবা ভুল folder-এ আছেন।

**সমাধান:**

```bash
cd /storage/emulated/0/Acode
git init
```

তারপর আবার:

```bash
git add .
git commit -m "Initial Commit"
```

---

## `Updates were rejected because the remote contains work`

**কারণ:** GitHub repository-তে এমন commit/file আছে যা আপনার local project-এ নেই।

প্রথমে remote changes দেখতে/merge করতে:

```bash
git pull origin main --allow-unrelated-histories
```

Conflict থাকলে resolve করে আবার:

```bash
git add .
git commit -m "Merge remote changes"
git push
```

> ⚠️ Remote-এর existing content পুরোপুরি replace করার আগে force push-এর ঝুঁকি বুঝে নিন।

---

## `Permission denied (publickey)`

**সম্ভাব্য কারণ:**

- SSH key GitHub account-এ যোগ করা হয়নি
- ভুল public key ব্যবহার হয়েছে
- ভুল GitHub account/repository ব্যবহার হচ্ছে

SSH connection test করুন:

```bash
ssh -T git@github.com
```

তারপর GitHub-এর SSH key configuration আবার যাচাই করুন।

---

## `Authentication failed`

HTTPS ব্যবহারের ক্ষেত্রে:

- GitHub username ঠিক আছে কি না দেখুন
- Repository name ঠিক আছে কি না যাচাই করুন
- Authentication credential/token সঠিক কি না পরীক্ষা করুন
- Repository access permission ঠিক আছে কি না নিশ্চিত করুন

---

# 📁 Recommended Project Structure

একটি clean project সাধারণত এভাবে রাখা যায়:

```text
Your-Project/
├── assets/
│   ├── platform-logo.png
│   ├── text-logo.png
│   ├── platform-banner.png
│   ├── favicon.png
│   └── profile.png
├── index.html
├── style.css
├── script.js
└── README.md
```

### Image Path Standard

README বা HTML file-এ image link করার সময় relative path ব্যবহার করুন:

```text
assets/platform-logo.png
```

এতে project অন্য device বা GitHub repository-তে নিলেও structure consistent থাকে।

---

# 💡 Clean Git Workflow

Project update করার সময় এই flow follow করুন:

```bash
git add .
git commit -m "Describe your update"
git push
```

Commit message ছোট, পরিষ্কার এবং পরিবর্তনের সাথে মিল রেখে লিখুন।

### উদাহরণ

```bash
git commit -m "Update homepage design"
git commit -m "Fix mobile navigation"
git commit -m "Add new project assets"
```

---

# 🌐 Tech Verse

<p align="center">
  <img src="assets/platform-logo.png" alt="Tech Verse Logo" width="200">
</p>

<p align="center">
  <strong>Tech Verse</strong><br>
  Build • Code • Learn • Deploy
</p>

<p align="center">
  <a href="https://tvsites.vercel.app">Official Website</a> •
  <a href="https://youtube.com/@imran.ahmedd">YouTube</a> •
  <a href="https://www.facebook.com/irnahmed360">Facebook</a> •
  <a href="https://github.com/Imran-s-Project">GitHub</a>
</p>

<p align="center">
  <sub>Documentation maintained for the Tech Verse platform.</sub>
</p>

---

### © Tech Verse

> **Build • Code • Learn • Deploy**
