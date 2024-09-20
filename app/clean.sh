rm -rf node_modules
rm -rf ios
rm -rf android
rm -rf .expo
watchman watch-del $PWD
watchman watch-del-all
watchman watch-project $PWD
npm cache clean --force
npm install
rm -rf $TMPDIR/haste-map-*
rm -rf $TMPDIR/metro-cache