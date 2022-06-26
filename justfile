
aliyun_registry_bestqa:="registry.cn-shanghai.aliyuncs.com/bestqa"
local_registry:="192.168.0.100:5555"
version:="latest"
image_name:="readash_x"

build: 
    docker build -t  {{local_registry}}/{{image_name}}:{{version}} . 
    docker push {{local_registry}}/{{image_name}}:{{version}}
push:
    docker tag  {{local_registry}}/{{image_name}}:{{version}} {{aliyun_registry_bestqa}}/{{image_name}}:{{version}}
    docker push {{aliyun_registry_bestqa}}/{{image_name}}:{{version}}
