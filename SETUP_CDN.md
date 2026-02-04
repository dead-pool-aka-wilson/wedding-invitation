# CDN Setup for Wedding Card Images

## Human Intervention Required

This document lists the manual setup steps needed for CDN configuration.

## Cloudinary Setup

### 1. Create Cloudinary Account
1. Go to https://cloudinary.com
2. Sign up for a free account
3. Note your Cloud Name, API Key, and API Secret

### 2. Environment Variables
Add to `.env.local`:
```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Upload Folder Structure
Create folders in Cloudinary Media Library:
```
wedding-invitation/
  zones/
    z01-sky/
    z02-skyline/
    z03-midlevels/
    z04-street/
    z05-ground/
```

### 4. Image Upload
After generating images with Gemini Image Pro 3:
1. Upload to respective zone folders
2. Enable auto-format (f_auto) and quality (q_auto)
3. Configure responsive breakpoints

### 5. Transformation Presets
Create presets for:
- `mobile_1x`: w_390,c_fill,f_auto,q_auto
- `mobile_2x`: w_780,c_fill,f_auto,q_auto  
- `mobile_3x`: w_1170,c_fill,f_auto,q_auto

## Vercel Environment Setup

### 1. Connect Repository
1. Go to https://vercel.com
2. Import the wedding-invitation repository
3. Set framework preset to Next.js

### 2. Environment Variables in Vercel
Add the same Cloudinary variables to Vercel project settings.

### 3. Domain Setup (Optional)
Configure custom domain if needed.

## Status Checklist

- [ ] Cloudinary account created
- [ ] Environment variables set locally
- [ ] Environment variables set in Vercel
- [ ] Folder structure created in Cloudinary
- [ ] Images uploaded after generation
- [ ] Transformation presets configured
- [ ] Vercel deployment working

## Notes
- Images are generated using Gemini Image Pro 3
- 28 total PNG images across 5 zones
- Retina support: @2x (780px) and @3x (1170px)
