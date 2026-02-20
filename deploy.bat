@echo off
echo Initializing Git repository...
git init
git add .
git commit -m "Festival 2026 site - ready for deployment"
echo.
echo Next steps:
echo 1. Create GitHub repo at github.com/new
echo 2. Run: git remote add origin YOUR_REPO_URL
echo 3. Run: git push -u origin main
echo 4. Import to Vercel at vercel.com/new
pause
