HIREPRO COLOMBIA / LATAM FRONTEND

Ready replacement based on the working Poland frontend.

Vercel environment variables required:
API_BASE=https://api.devopsbyteflexshift.com
NEXT_PUBLIC_BOT_USERNAME=Asignr_aciondetarea_bot
NEXT_PUBLIC_META_PIXEL_ID=<your pixel id>
NEXT_PUBLIC_TIKTOK_PIXEL_ID=<leave empty until you create one>

Preserved behavior:
- form minimum age 23
- save lead first
- confirmation screen
- Telegram continue event
- Meta Lead on Telegram continue
- Meta CompleteRegistration only when isNew=true
- TikTok SubmitApplication / Lead / CompleteRegistration support
- existing Pixel components and logic unchanged

Country selector order:
1 Colombia +57
2 Venezuela +58
3 Ecuador +593
4 Peru +51
5 Panama +507
then Brazil, Mexico, Argentina, Chile, Bolivia, US/Canada, Spain.
