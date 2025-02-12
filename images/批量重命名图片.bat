@echo off
setlocal enabledelayedexpansion

:: 设置图片文件夹路径
set folder_path=D:\document\project\programmer-jokes\images

:: 进入文件夹
cd /d "%folder_path%"

:: 初始化计数器
set count=1

:: 遍历所有图片文件
for %%f in (*.jpg *.jpeg *.webp *.png *.gif *.bmp) do (
    ren "%%f" "!count!%%~xf"
    set /a count+=1
)

echo Renaming completed.
pause
