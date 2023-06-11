**TOC**
- [1. Users Collection (for Authentication)](#1-users-collection-for-authentication)
- [2. Subjects Collection](#2-subjects-collection)
- [3. Exams](#3-exams)

---

i = index
* = required
@ = unique

---

# 1. Users Collection (for Authentication)

**User:**
_(Authentication info)_
- id: ObjectId (i * @)
- realName: string (*)
- displayName: string (* )
- accountType: string _("student" | "teacher" | "admin"*)_
- email: string
- password: string (hashed)

_(Profile info)_
- avatar: string _(img link)_
- age: integer
- dateOfBirth/dob: date
- gender: string
- organization: string

---

# 2. Subjects Collection

**Subject:**
- id: ObjectId
- subjectName: string (unique)

---

# 3. Exams

**Exam:**
_(Metadata)_
- id: ObjectId
- title: string
- createdBy: string _(teacher's username, ref from **Users Collection**)_
- createdAt: date
- subjectName: string | ref from **Subjects Collection**
- isPrivate: boolean
- examType: string _("choice" | "multi-choice" | "essay" | "mixed")_
- link: string _(for inviting students to exam room)_
- duration: number / integer

_(Content)_