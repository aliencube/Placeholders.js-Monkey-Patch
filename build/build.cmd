@echo off

REM	----------------------------------------------------------
REM
REM	This builds both javascript and CSS files get minified.
REM
REM	----------------------------------------------------------

REM	Sets the AjaxMin.exe path.

set service_installer_path=%ProgramFiles(x86)%\Microsoft\Microsoft Ajax Minifier 4\
if not exist %service_installer_path% (goto :minifier_not_found)

set service_installer_path=%service_installer_path%AjaxMin.exe

"%service_installer_path%" -clobber:true jquery.Placeholders.monkey.patch.js -o jquery.Placeholders.monkey.patch.min.js
"%service_installer_path%" -clobber:true jquery.Placeholders.monkey.patch.css -o jquery.Placeholders.monkey.patch.min.css

xcopy *.min.* ..\ /y

goto :end



:minifier_not_found
echo Microsoft AJAX Minifier must be installed for this build.
echo You can download it from: http://aspnet.codeplex.com/releases/view/40584

goto :end



:end
set service_installer_path=
