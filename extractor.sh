
body = $1
tag = $2

tags = [[echo $body | grep -Po "(?<=$tag:\s)(\w+)"]]

echo $tags