@echo off
@title HeavenMS
set PATH=D:\Program Files\Java\jdk1.8.0_251\bin;%PATH%
set CLASSPATH=.;dist\*
java -Xmx2048m -Dwzpath=wz\ net.server.Server
pause