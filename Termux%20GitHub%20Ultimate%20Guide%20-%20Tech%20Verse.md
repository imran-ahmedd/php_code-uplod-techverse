# 🚀 Ultimate Guide: Termux থেকে GitHub-এ প্রজেক্ট আপলোডের প্রফেশনাল পদ্ধতি

<!-- ============================= -->
<!-- PLATFORM BRANDING CONFIG -->
<!-- ============================= -->

> 🏷️ **Platform Name:** Tech Verse  
> 🌐 **Website:** https://tvsites.vercel.app  
> 📧 **Email:** tv.support.info@gmail.com  
> ▶️ **YouTube:** https://youtube.com/@imran.ahmedd  
> 📘 **Facebook:** https://www.facebook.com/irnahmed360  
> 💻 **GitHub:** https://github.com/Imran-s-Project

![Platform Logo](assets/platform-logo.png)

**Tech Verse**  
*Build, Code & Deploy Websites and Apps Directly from Termux.*

---

মোবাইল ডেভেলপারদের জন্য **Termux** ব্যবহার করে গিটহাবে প্রজেক্ট আপলোড করা অনেক সময় ঝামেলার মনে হতে পারে। তবে সঠিক গাইডলাইন ফলো করলে এটি অত্যন্ত সহজ।

এই গাইডে আমরা **দুটি পদ্ধতি** দেখাবো। প্রথমটি সাধারণ (Token) পদ্ধতি এবং দ্বিতীয়টি হলো প্রফেশনাল (SSH) পদ্ধতি—যা একবার সেটআপ করলে আর কখনো পাসওয়ার্ড বা টোকেন দিতে হবে না।

---

## 🖼️ Platform Assets / Images

এই গাইডে নিজের প্ল্যাটফর্মের Logo, Text Logo, Banner বা অন্যান্য ছবি যুক্ত করার জন্য নিচের ফোল্ডার কাঠামো ব্যবহার করতে পারো:

```text
assets/
├── platform-logo.png
├── text-logo.png
├── platform-banner.png
├── favicon.png
└── profile.png
```

### Platform Logo

![Platform Logo](assets/platform-logo.png)

### Text Logo

![Tech Verse Text Logo](assets/text-logo.png)

### Platform Banner

![Tech Verse Banner](assets/platform-banner.png)

> 💡 **নোট:** নিজের ছবি ব্যবহার করতে চাইলে `assets` ফোল্ডারের ভিতরে ছবিগুলো রাখবে এবং উপরের filename অনুযায়ী নাম দেবে। ছবি না থাকলে সংশ্লিষ্ট image line সরিয়ে দিতে পারো।

---

## 🛠️ প্রাথমিক প্রস্তুতি (Prerequisites)

কাজ শুরু করার আগে নিশ্চিত করুন:

* আপনার মোবাইলে **Termux** অ্যাপ ইনস্টল করা আছে (Play Store-এর ভার্সন নয়, F-Droid বা GitHub থেকে নামানো আপডেট ভার্সন)।
* আপনার একটি অ্যাক্টিভ **GitHub** অ্যাকাউন্ট আছে।
* ইন্টারনেট কানেকশন চালু আছে।

---

## 🟢 Method 1: Token (Classic) ব্যবহার করে আপলোড (Standard Way)

এটি সবচেয়ে সাধারণ পদ্ধতি। এখানে আমরা গিটহাব থেকে একটি সিক্রেট টোকেন নিয়ে টারমাক্সে ব্যবহার করব।

### ধাপ ১.১: GitHub থেকে Token জেনারেট করা

১. ব্রাউজারে [github.com](https://github.com) এ লগইন করুন।  
২. ডানপাশের প্রোফাইল আইকনে ক্লিক করে **Settings** > একদম নিচে **Developer settings**-এ যান।  
৩. **Personal access tokens** > **Tokens (classic)** বেছে নিন এবং **Generate new token**-এ ক্লিক করুন।  
৪. **Note**-এ নাম দিন (যেমন: `Termux-Access`) এবং মেয়াদ (Expiration) `No expiration` সেট করতে পারেন।  
৫. **repo** চেকবক্সে টিক চিহ্ন দিন।  
৬. পেজের নিচে গিয়ে **Generate token**-এ ক্লিক করুন এবং `ghp_` যুক্ত টোকেনটি কপি করে নিরাপদে রাখুন।

### ধাপ ১.২: Termux প্রস্তুত করা

Termux-এ নিচের কমান্ডগুলো রান করুন:

```bash
pkg update && pkg upgrade -y
pkg install git -y
termux-setup-storage
git config --global --add safe.directory /storage/emulated/0/Acode
```

*(স্টোরেজ পারমিশন চাইলে Allow দিন)*

### ধাপ ১.৩: Git কনফিগার করা

আপনার গিটহাবের নাম ও ইমেইল সেট করুন:

```bash
git config --global user.name "আপনার_গিটহাব_ইউজারনেম"
git config --global user.email "আপনার_ইমেইল@gmail.com"
```

💡 **Pro Tip:** বারবার টোকেন দেওয়া থেকে বাঁচতে এই কমান্ডটি দিন:

```bash
git config --global credential.helper store
```

### ধাপ ১.৪: প্রজেক্ট ইনিশিয়ালাইজ ও পুশ করা

আপনার প্রজেক্ট ফোল্ডারে যান এবং ফাইল আপলোড করুন:

```bash
cd /storage/emulated/0/Acode
rm -rf .git  # (শুধুমাত্র যদি পুরোনো গিট হিস্ট্রি মুছতে চান)
git init
git add .
git commit -m "Initial Commit - Smart Upload"
git branch -M main
```

এবার আপনার টোকেন ব্যবহার করে রিমোট অ্যাড করুন এবং পুশ করুন:

```bash
# নিচের কমান্ডে 'আপনার_টোকেন' এর জায়গায় আপনার আসল টোকেন বসান
git remote add origin https://আপনার_টোকেন@github.com/আপনার_ইউজারনেম/আপনার_প্রজেক্ট.git

# ফাইনাল পুশ
git push -u origin main
```

---

## 🔵 Method 2: SSH Key ব্যবহার করে আপলোড (Pro Method / Fallback)

যদি উপরের পদ্ধতিতে `Authentication Failed` বা `403 Forbidden` এরর আসে, তবে এই প্রফেশনাল পদ্ধতিটি ব্যবহার করুন। এখানে কোনো টোকেনের প্রয়োজন নেই!

### ধাপ ২.১: Termux-এ SSH Key তৈরি করা

```bash
pkg install openssh -y
ssh-keygen -t ed25519 -C "আপনার_ইমেইল@gmail.com"
```

*(কমান্ড দেওয়ার পর ৩ বার Enter প্রেস করুন, কোনো পাসওয়ার্ড দেওয়ার দরকার নেই)*

### ধাপ ২.২: SSH Key কপি করে GitHub-এ যুক্ত করা

কী (Key) টি দেখতে নিচের কমান্ড দিন:

```bash
cat ~/.ssh/id_ed25519.pub
```

স্ক্রিনে আসা সম্পূর্ণ টেক্সটটি (`ssh-ed25519 ...`) কপি করুন।

এবার গিটহাবের **Settings** > **SSH and GPG keys** > **New SSH key**-তে গিয়ে কপি করা টেক্সটটি পেস্ট করে `Add SSH key` তে সেভ করুন।

### ধাপ ২.৩: প্রজেক্ট পুশ করা (SSH লিঙ্ক দিয়ে)

এখন প্রজেক্ট ফোল্ডারে গিয়ে আগের মতোই `git init`, `add`, এবং `commit` করুন। এরপর রিমোট অ্যাড করার সময় HTTPS এর বদলে SSH লিঙ্ক ব্যবহার করুন:

```bash
git remote add origin git@github.com:আপনার_ইউজারনেম/আপনার_প্রজেক্ট.git
git push -u origin main
```

*(প্রথমবার `yes/no` জানতে চাইলে `yes` লিখে এন্টার দিন। ব্যস! কাজ শেষ!)*

---

## ⚠️ Troubleshooting (সাধারণ সমস্যা ও সমাধান)

১. **Error: `fatal: not a git repository`**  
   * **কারণ:** আপনি ফোল্ডারে `git init` কমান্ডটি দেননি।
   * **সমাধান:** `git init` রান করে তারপর অন্য কমান্ড দিন।

২. **Error: `Updates were rejected because the remote contains work...`**  
   * **কারণ:** গিটহাবে আগে থেকেই কিছু ফাইল আছে যা আপনার মোবাইলে নেই।
   * **সমাধান:** ফাইল ওভাররাইট করতে চাইলে Force পুশ করুন:

```bash
git push -u origin main --force
```

৩. **Error: `Permission denied (publickey)` (Method 2 এর ক্ষেত্রে)**  
   * **কারণ:** SSH Key ঠিকমতো গিটহাবে যুক্ত হয়নি।
   * **সমাধান:** ধাপ ২.২ আবার চেক করুন এবং সম্পূর্ণ Key কোনো স্পেস বাদ না দিয়ে কপি করেছেন কিনা নিশ্চিত হন।

---

## 📁 Recommended Project Structure

একটি সাধারণ GitHub project-এর জন্য নিচের মতো structure ব্যবহার করতে পারো:

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

> 💡 **Pro Tip:** Platform-এর Logo বা অন্য image GitHub-এ ঠিকভাবে দেখানোর জন্য image path হিসেবে `assets/platform-logo.png`-এর মতো relative path ব্যবহার করো।

---

## 🔗 Tech Verse Platform

![Tech Verse Logo](assets/platform-logo.png)

**Tech Verse**  
*Build, Code & Deploy Websites and Apps Directly from Termux.*

🌐 **Website:** https://tvsites.vercel.app  
📧 **Support:** tv.support.info@gmail.com  
▶️ **YouTube:** https://youtube.com/@imran.ahmedd  
📘 **Facebook:** https://www.facebook.com/irnahmed360  
💻 **GitHub:** https://github.com/Imran-s-Project

---

> 💡 **নোট:** এই গাইডটি ভালো লাগলে বা কোনো সাহায্য পেলে অবশ্যই ভিডিওতে একটি লাইক দিবেন এবং চ্যানেলটি সাবস্ক্রাইব করবেন। হ্যাপি কোডিং! 💻

---

### © Tech Verse

*Build • Code • Learn • Deploy*
