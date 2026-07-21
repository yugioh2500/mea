# MEA Cost Compare — วิธี Deploy ขึ้น Netlify

เว็บนี้ต้องเรียก Claude API (มี web search) จึงต้องมี **Netlify Function** เป็นตัวกลางเก็บ API key
ห้ามนำ API key ไปใส่ในไฟล์ HTML โดยตรง เพราะทุกคนที่เปิดเว็บจะเห็น key

## สิ่งที่ต้องมี
1. บัญชี Netlify (ฟรี)
2. Anthropic API key — สมัครที่ https://console.anthropic.com (มีค่าใช้จ่ายตามการใช้งานจริง ครั้งละไม่กี่บาท)

## ขั้นตอน
1. อัปโหลดโฟลเดอร์นี้ทั้งโฟลเดอร์ขึ้น Netlify
   - วิธีแนะนำ: push ขึ้น GitHub แล้วกด "Import from Git" ใน Netlify
   - หรือใช้ Netlify CLI: `netlify deploy --prod`
   - (การลากไฟล์วางแบบ Drop อาจไม่ build Function ให้ — ถ้าเว็บขึ้นแต่กดแล้ว error ให้เปลี่ยนมาใช้ 2 วิธีข้างบน)
2. ใน Netlify ไปที่ **Site configuration → Environment variables** เพิ่มตัวแปร
   - Key: `ANTHROPIC_API_KEY`
   - Value: API key ของคุณ (ขึ้นต้นด้วย `sk-ant-...`)
3. กด **Deploy** ใหม่อีกครั้งหลังตั้งค่าตัวแปร แล้วเปิดเว็บใช้งานได้เลย

## โครงสร้างไฟล์
```
index.html                     ← หน้าเว็บ
netlify.toml                   ← ตั้งค่า Netlify
netlify/functions/claude.js    ← ตัวกลางเรียก Anthropic API (เก็บ key ฝั่งเซิร์ฟเวอร์)
```

## หมายเหตุ
- Netlify Function แผนฟรีจำกัดเวลาทำงาน ~10 วินาทีต่อคำขอ ระบบจึงแบ่งการค้นราคาเป็น 6 คำขอเล็กแบบขนาน และลองซ้ำอัตโนมัติรายการที่พลาด
- ถ้าบางรายการขึ้น "ไม่พบข้อมูล" ให้กดเปรียบเทียบซ้ำอีกครั้ง
