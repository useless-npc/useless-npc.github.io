---
layout: post
title: "TryHackMe — Example Web Challenge Writeup"
date: 2026-07-29 10:00:00 +0800
categories: [ctf, web]
tags: [web-exploitation, sqli, walkthrough]
---

## Overview

Short summary of the challenge: what platform it's from, difficulty, and what vulnerability class it covers.

## Recon

What you found during initial enumeration — open ports, technologies in use, interesting endpoints.

```bash
nmap -sC -sV -oN scan.txt TARGET_IP
```

## Exploitation

Walk through the steps you took, with commands and screenshots (screenshots go in `/assets/images/` and are referenced like this):

```markdown
![screenshot description](/assets/images/2026-07-29-example/step1.png)
```

```bash
# example payload / command
sqlmap -u "http://target/login.php" --data="user=*&pass=*" --dbs
```

## Root Cause

Explain *why* the vulnerability existed — the underlying mistake in code/config.

## Remediation

How the issue should be fixed (parameterized queries, input validation, etc).

## Key Takeaways

- Lesson 1
- Lesson 2
