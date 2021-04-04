
cd `dirname $0`
#if [ -d "./bin_mac/" ];then
#mv  bin_mac  bin
#else
#echo "bin folder exist"
#fi
deviceArch=$(arch)
cd  ./demo
if [ -e "./node_modules/electron/dist/Electron.app/Contents/Frameworks/ZoomSDK.framework" ];then
	echo "file exist"
else
	cd ./demo
	echo deviceArch
	if [ "$deviceArch" = "arm64" ];then
		npm install -arch=arm64 
	else 
		npm install
	fi
npm run-script postinstall-mac
fi
npm start
