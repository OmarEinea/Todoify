out=js/walls.js

echo "// An Array Containing a List of Available Wallpapers" > $out
echo "var walls = [" >> $out

cd img
imgs=($(find \( -iname "*.jpg" -or -iname "*.png" \)))
cd ..

for img in "${imgs[@]}"
do
	echo $'\t'\"${img:2}\", >> $out
done

echo "];" >> $out
sed -i "s/'/\\\\\\\'/g" $out