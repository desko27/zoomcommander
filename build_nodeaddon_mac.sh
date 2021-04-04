
cd `dirname $0`
deviceArch=$(arch)
if [ -d "./app/node_modules" ];then
	cd ./app
	npm run-script postinstall-mac
else
	cd ./app
	if [ "$deviceArch" = "arm64" ];then
		npm install -arch=arm64
	else
		npm install
	fi
	npm run-script postinstall-mac
fi

version=$(electron --version)
if [ $? -ne  0 ];then
	echo "build fail ,electron not install"
	exit
else
	cd ../
	if [ "$deviceArch" = "arm64" ];then
		npm install -arch=arm64
		# sed -i "" 's/11.0.1/'${version#*v}'/g' ./demo/package.json
		node-gyp rebuild -arch=arm64 --target=${version#*v}  --dist-url=https://atom.io/download/electron
	else
		npm install
		# sed -i "" 's/11.0.1/'${version#*v}'/g' ./demo/package.json
		node-gyp rebuild --target=${version#*v}  --dist-url=https://atom.io/download/electron
	fi
fi
cp -Rf ./build/Release/zoomsdk.node  ./sdk/mac && cp -Rf ./build/Release/zoomsdk_render.node  ./sdk/mac


